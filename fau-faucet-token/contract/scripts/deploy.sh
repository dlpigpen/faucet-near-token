set -e
NETWORK=testnet
OWNER=mitsori1.$NETWORK
MASTER_ACC=mitsori1.$NETWORK
SUB_MASTER_ACC=mitsori2.$NETWORK
CONTRACT_ACC=faucet.$MASTER_ACC
TOKEN_ACC=dnft.$MASTER_ACC

export NEAR_ENV=$NETWORK

## delete acc
# near delete $CONTRACT_ACC $MASTER_ACC

# ## create acc
# near create-account $CONTRACT_ACC --masterAccount $MASTER_ACC --initialBalance 20

# #
# ## ## redeploy code only
# near deploy $CONTRACT_ACC --wasmFile ../../out/faucet-md-ft.wasm \
#  --accountId $MASTER_ACC \
#  --networkId $NETWORK \
#  --initFunction "new" \
#  --initArgs '{"owner_id": "'$OWNER'", "ft_contract_id": "dnft.mitsori1.testnet", "max_share":"1000000000"}' \
#  --accountId $OWNER

# near deploy $CONTRACT_ACC --wasmFile ../../out/faucet-md-ft.wasm \
#  --networkId $NETWORK \
#  --initFunction "migrate_state" \
#  --initArgs '{}' \
#  --accountId $OWNER

# near state $MASTER_ACC

# near view $CONTRACT_ACC get_faucet_info --accountId $SUB_MASTER_ACC


# near call $CONTRACT_ACC update_max_share '{"max_share": "1100000000"}' --accountId $MASTER_ACC


# near view $CONTRACT_ACC get_shared_balance_of '{"account_id":"mitsori1.testnet"}'
# near view $CONTRACT_ACC get_shared_balance_of '{"account_id":"mitsori2.testnet"}'
# near state $SUB_MASTER_ACC

# near view $TOKEN_ACC storage_balance_of '{"account_id": "mitsori2.testnet"}' 
# near view $TOKEN_ACC storage_balance_bounds
# near call $TOKEN_ACC storage_deposit '' --accountId $SUB_MASTER_ACC --depositYocto 1250000000000000000000
# near view $TOKEN_ACC storage_balance_of '{"account_id": "mitsori2.testnet"}' 

# near call $CONTRACT_ACC faucet_token '{"amount":"1000000000"}' --accountId $SUB_MASTER_ACC --depositYocto 2  --gas=100000000000000

# near view dnft.mitsori1.testnet storage_balance_of '{"account_id": "mitsori2.testnet"}'
# near view dnft.mitsori1.testnet storage_balance_bounds
# near call dnft.mitsori1.testnet storage_deposit '' --accountId mitsori2.testnet --amount 0.00125
# near call $CONTRACT_ACC faucet_token '{"amount":"1000000000"}' --accountId $SUB_MASTER_ACC --gas=75000000000000

# near call faucet.mitsori1.testnet storage_deposit '' --accountId mitsori2.testnet --amount 0.00125


# near view $CONTRACT_ACC get_shared_balance_of '{"account_id":"mitsori2.testnet"}'
# near state $SUB_MASTER_ACC

#near view $CONTRACT_ACC generate_id "{\"account_id\":\"mitsori1.testnet\"}" --accountId $MASTER_ACC

#save this deployment  (to be able to recover state/tokens)
#set -ex
#cp ./res/tasktracker.wasm ./res/testnet/tasktracker.$CONTRACT_ACC.`date +%F.%T`.wasm
#date +%F.%T

