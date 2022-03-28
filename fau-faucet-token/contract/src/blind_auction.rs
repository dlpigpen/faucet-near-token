
/**
* Blind Auction Contract Deisgn Contract:
Variables:
- Bidding end time
- Reveal end time
- State of Auction
- Highest Bidder
- Highest Bid
- List address bids made by users
- List address deposits and pending returns

 Functions
- doBid : Allows user to register a bid and deposit ether for their bids
- doReveal : Allows user to reveal their bids
- setAuctionEnd :Set auction end of auction and winner determined and also refund all loser's ether

Contract:
**/
use near_contract_standards::non_fungible_token::TokenId;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::{
    env, ext_contract, near_bindgen, AccountId, Balance, BorshStorageKey, Gas, PanicOnDefault,
    Promise,
};
use sha3::{Digest, Keccak256};

pub type Timestamp = u64;
const GAS_FOR_RESOLVE_TRANSFER: Gas = 10_000_000_000_000;
const GAS_FOR_NFT_TRANSFER_CALL: Gas = 25_000_000_000_000;

#[ext_contract(ext_nft_contract)]
pub trait FungibleTokenCore {
    fn nft_transfer(&mut self, receiver_id: AccountId, token_id: TokenId, memo: Option<String>);
}

#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
#[near_bindgen]
struct BlindAuction {
    // nft contract id, transfer to winner after auction ends
    pub nft_contract_id: AccountId,

    // token id
    pub token_id: TokenId,

    // Keep track of ending time of bidding phase
    pub bidding_end: Timestamp,

    // Keep track of ending time of reveal phase
    pub reveal_end: Timestamp,

    // Keep track of if auction has ended or not
    pub ended: bool,

    // keep track of all bids every user has made
    pub bids: LookupMap<AccountId, Vec<String>>,

    // keep track of all deposits every user had deposits
    pub deposits: LookupMap<AccountId, Balance>,

    // current winner addresses
    pub highest_bidder: AccountId,

    // current winner's bid value
    pub highest_bid: Balance,

    // keep track of how much near to be returned to each user
    pub pending_returns: LookupMap<AccountId, Balance>,

    // keep track of which user has already reveal their bids
    reveal_list: Vec<AccountId>,
}

#[derive(BorshDeserialize, BorshSerialize, BorshStorageKey)]
pub enum StorageKey {
    BidKey,
    DepositKey,
    PendingKey,
}

#[near_bindgen]
impl BlindAuction {
    #[init]
    pub fn new(
        _bidding_time: u64,
        _reveal_time: u64,
        _nft_contract_id: AccountId,
        _token_id: TokenId,
        _auction_starter: AccountId,
    ) -> Self {
        BlindAuction {
            nft_contract_id: _nft_contract_id,
            token_id: _token_id,
            bidding_end: env::block_timestamp() + _bidding_time,
            reveal_end: env::block_timestamp() + _reveal_time,
            ended: false,
            bids: LookupMap::new(StorageKey::BidKey),
            deposits: LookupMap::new(StorageKey::DepositKey),
            highest_bidder: _auction_starter,
            highest_bid: 0,
            pending_returns: LookupMap::new(StorageKey::PendingKey),
            reveal_list: vec![],
        }
    }

    // Place a blinded bid with `_blindedBid` =
    // keccak256(value, hyphen, real, hyphen, secret)).
    // The sent near is only refunded if the bid is correctly
    // revealed in the revealing phase. The bid is valid if the
    // near deposited in all bids sent by that user
    // is at least "value" of non-fake bids which are when
    // "real" is true.
    // Setting "real" to false and sending
    // not the exact amount are ways to hide the real bid but
    // still make the required deposit. The same address can
    // place multiple bids.
    #[payable]
    pub fn doBid(&mut self, _blindedBid: String) {
        assert!(
            env::block_timestamp() < self.bidding_end,
            "Only allow bid if bi bidding end"
        );
        assert!(
            env::attached_deposit() > 1,
            "Error deposit greater than one yoctor"
        );
        assert!(
            _blindedBid.len() > 0,
            "Blinded bid should be greater than zero"
        );

        // add bid into the bids list
        let _bidder = env::predecessor_account_id();
        let mut user_bids = self.bids.get(&_bidder).unwrap_or_else(|| vec![]);
        user_bids.push(_blindedBid);
        self.bids.insert(&_bidder, &user_bids);

        // increase current deposit
        let mut current_deposit = self.deposits.get(&_bidder).unwrap_or_else(|| 0);
        current_deposit = current_deposit + env::attached_deposit();
        self.deposits.insert(&_bidder, &current_deposit);
    }

    // This is an "internal" function which means that it
    // can only be called from the contract itself (or from
    // derived contracts).
    // Used to place bid internally to check if bid
    // will become highest bid
    pub fn placeBid(&mut self, bidder: AccountId, value: u128) -> bool {
        // if value not higher just return false
        if value <= self.highest_bid {
            return false;
        }
        if self.highest_bidder.len() > 0 {
            // Refund the previously highest bidder to pending return for withdrawal.
            let mut current_bid_pending_value =
                self.pending_returns.get(&bidder).unwrap_or_else(|| 0);
            current_bid_pending_value = current_bid_pending_value + self.highest_bid;

            self.pending_returns
                .insert(&self.highest_bidder, &current_bid_pending_value);
        }

        self.highest_bid = value;
        self.highest_bidder = bidder;
        return true;
    }

    // Reveal bids to verify bids that were sent by the user,
    // this will effectively allow the user to test if he/she has
    // the highest bid by verifying he actually sent it.
    // Bids has to be sent in order of bidding for reveal
    pub fn doReveal(&mut self, _values: Vec<u128>, _real: Vec<bool>, _secret: Vec<String>) {
        assert!(
            env::block_timestamp() > self.bidding_end,
            "Only allow reveal after bidding end"
        );
        assert!(
            env::block_timestamp() < self.reveal_end,
            "Only allow reveal in reveal end time"
        );

        // every user can only reaval once
        for x in 0..self.reveal_list.len() {
            let reveal_address = &self.reveal_list[x];
            if reveal_address == &env::predecessor_account_id() {
                panic!("User have already reveal bids - each user can only reaval once!");
            }
        }

        let mut bids = self
            .bids
            .get(&env::predecessor_account_id())
            .unwrap_or_else(|| vec![]);
        let length = bids.len();

        assert_eq!(
            length,
            _values.len(),
            "Number of _values passed into be equa to total number of bids made by user"
        );
        assert_eq!(
            length,
            _real.len(),
            "Number of _real passed into be equa to total number of bids made by user"
        );
        assert_eq!(
            length,
            _secret.len(),
            "Number of _secret passed into be equa to total number of bids made by user"
        );

        for i in 0..length {
            let bidToCheck = &bids[i];
            let (value, real, secret) = (_values[i], _real[i], _secret[i].clone());

            let mut bid_hash: Vec<u8> = vec![];
            let mut hyphen_vec = "-".as_bytes().to_vec();
            bid_hash.append(&mut hyphen_vec);
            bid_hash.append(&mut format!("{}", value).as_bytes().to_vec());
            bid_hash.append(&mut hyphen_vec);
            bid_hash.append(&mut format!("{}", real).as_bytes().to_vec());
            bid_hash.append(&mut hyphen_vec);
            bid_hash.append(&mut format!("{}", secret).as_bytes().to_vec());

            let bid_hash_bytes: &[u8] = &bid_hash;
            let mut hasher = Keccak256::new();
            hasher.update(&bid_hash_bytes);
            let result = hasher.finalize();
            let commit = format!("{:x}", result);

            // Bid was not actually revealed.
            // skip as the bid is invalid
            // note user can only reveal once
            // so invalid reveal will invalidate the particular bid
            if commit.as_bytes().to_vec() != bidToCheck.as_bytes().to_vec() {
                continue;
            }

            let value_deposit = self
                .deposits
                .get(&env::predecessor_account_id())
                .unwrap_or_else(|| 0);
            if real && value_deposit >= value {
                // if place bid function successful means bid is current highest bid
                // minus value off deposits as the value will be kept for current highest bid
                if self.placeBid(env::predecessor_account_id(), value) {
                    let newDeposit = value_deposit - value;
                    self.deposits
                        .insert(&env::predecessor_account_id(), &newDeposit);
                }
            }

            // Make it impossible for the sender to re-claim
            // the same deposit.
            bids[i] = String::from("0");
            self.bids.insert(&env::predecessor_account_id(), &bids);
        }

        // return all deposits to user except deposit used for highest bid
        let total_deposit = self
            .deposits
            .get(&env::predecessor_account_id())
            .unwrap_or_else(|| 0);
        let mut current_pending = self
            .pending_returns
            .get(&env::predecessor_account_id())
            .unwrap_or_else(|| 0);
        current_pending = current_pending + total_deposit;
        self.pending_returns
            .insert(&env::predecessor_account_id(), &current_pending);

        // reset deposit so sender cannot double claim
        self.deposits.insert(&env::predecessor_account_id(), &0);

        // save sender as revealed already
        self.reveal_list.push(env::predecessor_account_id());
    }

    // End the auction and send the highest bid
    // refund everyone's deposit using withdraw call
    pub fn setAuctionEnd(&mut self) -> String {
        assert!(
            env::block_timestamp() > self.reveal_end,
            "Only set auction end if now is greater than reveal end time"
        );
        assert!(
            self.ended == false,
            "Only widthdraw after blind auction not ended"
        );

        // Call DNS contract to transfer the funds back and register the winner of auction
        let account_id = env::predecessor_account_id();
        let token_id_send = String::from(&self.token_id);
        ext_nft_contract::nft_transfer(
            account_id.clone(),
            token_id_send,
            Some(String::from("Sender NFT")),
            &self.nft_contract_id,
            1,
            GAS_FOR_NFT_TRANSFER_CALL,
        );

        // refund all excess Ether that the loser deposited
        for x in 0..self.reveal_list.len() {
            let bidder = self.reveal_list[x].clone();
            self.withdraw(bidder);
        }

        let winnner = &self.highest_bidder;
        return winnner.to_string();
    }

    // Withdraw a bid that was overbid.
    // called when auction ends
    pub fn withdraw(&mut self, bidder: AccountId) -> u128 {
        assert!(
            self.ended == true,
            "Only widthdraw after blind auction ended"
        );

        let account_id = bidder;
        let amount = self.pending_returns.get(&account_id).unwrap_or_else(|| 0);
        if amount > 0 {
            // It is important to set this to zero because the recipient
            // can call this function again as part of the receiving call
            // before `transfer` returns
            self.pending_returns.insert(&account_id, &0);

            // send to account id
            Promise::new(account_id).transfer(amount);
        }
        return amount;
    }
}
