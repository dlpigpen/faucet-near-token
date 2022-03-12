use near_contract_standards::fungible_token::metadata::{
    FungibleTokenMetadata, FungibleTokenMetadataProvider, FT_METADATA_SPEC,
};
use near_contract_standards::fungible_token::FungibleToken;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LazyOption;
use near_sdk::json_types::U128;
use near_sdk::{env, log, near_bindgen, AccountId, Balance, PanicOnDefault, PromiseOrValue};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct MDContract {
    token: FungibleToken,
    metadata: LazyOption<FungibleTokenMetadata>,
}

const DATA_ICON: &str = "data:image/jpeg;base64,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";

#[near_bindgen]
impl MDContract {

     #[init]
    pub fn new_default_meta(owner_id: AccountId, total_supply: U128) -> Self {
        Self::new(
            owner_id,
            total_supply,
            FungibleTokenMetadata {
                spec: FT_METADATA_SPEC.to_string(),
                name: "Mitsori".to_string(),
                symbol: "MD".to_string(),
                icon: Some(DATA_ICON.to_string()),
                reference: None,
                reference_hash: None,
                decimals: 24,
            },
        )
    }

    #[init]
    pub fn new(owner_id: AccountId, total_supply: U128, metadata: FungibleTokenMetadata) -> Self {
        assert!(!env::state_exists(), "Already initialized");
        metadata.assert_valid();

        let mut this = Self {
            token: FungibleToken::new(b"a".to_vec()),
            metadata: LazyOption::new(b"m".to_vec(), Some(&metadata)),
        };

        this.token.internal_register_account(&owner_id);
        this.token.internal_deposit(&owner_id, total_supply.into());
        near_contract_standards::fungible_token::events::FtMint {
            owner_id: &owner_id,
            amount: &total_supply,
            memo: Some("Initial tokens supply is minted"),
        }
        .emit();

        this
    }

    fn on_account_closed(&mut self, account_id: AccountId, balance: Balance) {
        log!("Closed @{} with {}", account_id, balance);
    }

    fn on_tokens_burned(&mut self, account_id: AccountId, amount: Balance) {
        log!("Account @{} burned {}", account_id, amount);
    }
}

near_contract_standards::impl_fungible_token_core!(MDContract, token, on_tokens_burned);
near_contract_standards::impl_fungible_token_storage!(MDContract, token, on_account_closed);

#[near_bindgen]
impl FungibleTokenMetadataProvider for MDContract {
    fn ft_metadata(&self) -> FungibleTokenMetadata {
        self.metadata.get().unwrap()
    }
}

#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, Balance};

    use super::*;
    use std::io::empty;

    const TOTAL_SUPPLY: Balance = 1_000_000_000_000_000;

    fn get_context(predecessor_account_id: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(accounts(0))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id);
        builder
    }

    #[test]
    #[should_panic(expected = "The contract is not initialized")]
    fn test_default() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let _contract = MDContract::default();
    }

    #[test]
    fn test_new() {
        let mut context = get_context(accounts(1));
        testing_env!(context.build());
        let contract = MDContract::new_default_meta(accounts(1).into(), TOTAL_SUPPLY.into());
        testing_env!(context.is_view(true).build());
        assert_eq!(contract.ft_total_supply().0, TOTAL_SUPPLY);
    }

    #[test]
    fn test_transfer() {
        let mut context = get_context(accounts(2));
        testing_env!(context.build());
        let mut contract = MDContract::new_default_meta(accounts(2).into(), TOTAL_SUPPLY.into());
        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(contract.storage_balance_bounds().min.into())
            .predecessor_account_id(accounts(1))
            .build()
        );

        contract.storage_deposit(None, None);

        testing_env!(context
        .storage_usage(env::storage_usage())
        .attached_deposit(1)
        .predecessor_account_id(accounts(2))
        .build()
        );

        let transfer_amount = TOTAL_SUPPLY / 3;
        contract.ft_transfer(accounts(1), transfer_amount.into(), None);

        testing_env!(
            context
            .storage_usage(env::storage_usage())
            .account_balance(env::account_balance())
            .is_view(true)
            .attached_deposit(0)
            .build()
        );

        assert_eq!(contract.ft_balance_of(accounts(2)).0, TOTAL_SUPPLY - transfer_amount);
        assert_eq!(contract.ft_balance_of(accounts(1)).0, transfer_amount);

    }
}
