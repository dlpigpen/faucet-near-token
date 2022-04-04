use near_sdk::collections::LookupMap;
use near_sdk::{AccountId, env, near_bindgen, Balance, BorshStorageKey, Gas, PromiseOrValue, ext_contract, Promise, PanicOnDefault, log};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::json_types::{U128};

pub const FT_TRANSFER_GAS: Gas = 10_000_000_000_000;
pub const WITHDRAW_CALLBACK_GAS: Gas = 10_000_000_000_000;
pub const FAUCET_CALLBACK_GAS: Gas = 10_000_000_000_000;

pub trait FungibleTokenReceiver {
    fn ft_on_transfer(&mut self, sender_id: AccountId, amount: U128, msg: String) -> PromiseOrValue<U128>;
}

#[ext_contract(ext_ft_contract)]
pub trait FungibleTokenCore {
    fn ft_transfer(
        &mut self,
        receiver_id: AccountId,
        amount: U128,
        memo: Option<String>
    );
}
#[ext_contract(ext_self)]
pub trait ExtStakingContract {
    fn ft_transfer_callback(&mut self, amount: U128, account_id: AccountId);
}

#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
#[near_bindgen]
struct FaucetContract {
    pub owner_id: AccountId,
    pub ft_contract_id: AccountId,
    pub total_balance_share: Balance,
    pub total_shared: Balance,
    pub total_account_shared: Balance,
    pub accounts: LookupMap<AccountId, Balance>,
    pub max_share_per_account: Balance,
    pub is_paused: bool
}

#[derive(BorshDeserialize, BorshSerialize, BorshStorageKey)]
pub enum StorageKey {
    AccountKey
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct FaucetInfo {
    pub total_balance_share: U128,
    pub total_shared: U128,
    pub total_account_shared: U128,
    pub max_share_per_account: U128,
    pub is_paused: bool
}

#[near_bindgen]
impl FaucetContract {

    #[init]
    pub fn new(owner_id: AccountId, ft_contract_id: AccountId, max_share: U128) -> Self {
        FaucetContract { 
            owner_id, 
            ft_contract_id, 
            total_balance_share: 0, 
            total_shared: 0, 
            total_account_shared: 0, 
            accounts: LookupMap::new(StorageKey::AccountKey),
            max_share_per_account: max_share.0,
            is_paused: false
         }
    }

    #[init(ignore_state)]
    pub fn migrate_state() -> Self {
        // Deserialize the state using the old contract structure.
        let old_contract: FaucetContract = env::state_read().expect("Old state doesn't exist");
        // Verify that the migration can only be done by the owner.
        // This is not necessary, if the upgrade is done internally.
        log!("predecessor_account_id: {}", &env::predecessor_account_id());
        log!("&old_contract.owner_id: {}",  &old_contract.owner_id);
        assert_eq!(
            &env::predecessor_account_id(),
            &old_contract.owner_id,
            "Can only be called by the owner"
        );

        // Create the new contract using the data from the old contract.
        Self { 
            owner_id: old_contract.owner_id, 
            ft_contract_id: old_contract.ft_contract_id, 
            total_balance_share: old_contract.total_balance_share, 
            total_shared: old_contract.total_shared, 
            total_account_shared: old_contract.total_shared, 
            accounts: old_contract.accounts,
            max_share_per_account: old_contract.max_share_per_account,
            is_paused: old_contract.is_paused,
         }
    }


    #[payable]
    pub fn faucet_token(&mut self, amount: U128) -> Promise {
        assert!(env::attached_deposit() > 1, "ERR_DEPOSIT_GREATER_THAN_ONE_YOCTO");
        let account_id: AccountId = env::predecessor_account_id();
        let account_balance: Balance = self.accounts.get(&account_id).unwrap_or_else(|| 0);
        assert!(amount.0 <= self.max_share_per_account, "ERR_INVALID_AMOUNT");

        ext_ft_contract::ft_transfer(
            account_id.clone(), 
            amount, 
            Some(String::from("Faucet by MD")), 
            &self.ft_contract_id, 
            1, 
            FT_TRANSFER_GAS
        ).then(ext_self::ft_transfer_callback(
            amount, 
            account_id.clone(), 
            &env::current_account_id(), 
            0, 
            FAUCET_CALLBACK_GAS
        ))
    }

    #[private]
    pub fn ft_transfer_callback(&mut self, amount: U128, account_id: AccountId) {
        log!("ft_transfer_callback amount: {}, account_id: {}", &amount.0, &account_id);

        let mut account_balance: Balance = self.accounts.get(&account_id).unwrap_or_else(|| 0);
        if account_balance == 0 {
            self.total_account_shared += 1;
        }

        account_balance += amount.0;

        self.accounts.insert(&account_id,&account_balance);
        self.total_shared += amount.0;
        // self.total_balance_share -= amount.0;
    }

    pub fn update_max_share(&mut self, max_share: U128) {
        assert_eq!(env::predecessor_account_id(), self.owner_id, "ERR_MUST_BE_OWNER");
        self.max_share_per_account = max_share.0;
    }

    pub fn get_faucet_info(&self) -> FaucetInfo {
        log!("get_faucet_info: {}", &"Duc");

        FaucetInfo { 
            total_balance_share: U128(self.total_balance_share), 
            total_shared: U128(self.total_shared), 
            total_account_shared: U128(self.total_account_shared),
            max_share_per_account: U128(self.max_share_per_account), 
            is_paused: self.is_paused
        }
    }

    pub fn get_shared_balance_of(&self, account_id: AccountId) -> U128 {
        let balance: Balance = self.accounts.get(&account_id).unwrap_or_else(|| 0);
        U128(balance)
    }
}

#[near_bindgen]
impl FungibleTokenReceiver for FaucetContract {
    fn ft_on_transfer(&mut self, sender_id: AccountId, amount: U128, msg: String) -> PromiseOrValue<U128> {
        assert_eq!(sender_id, self.owner_id, "ERR_SENDER_MUST_BE_OWNER");
        assert_eq!(env::predecessor_account_id(), self.ft_contract_id, "ERR_INVALID_FT_CONTRACT_ID");
        log!("Received ft_on_transfer: {}", &amount.0);

        self.total_balance_share += amount.0;

        PromiseOrValue::Value(U128(0))
    }
}