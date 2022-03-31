set -e
NETWORK=testnet
OWNER=mitsori1.$NETWORK
MASTER_ACC=mitsori1.$NETWORK
CONTRACT_ACC=dnft.$MASTER_ACC

export NEAR_ENV=$NETWORK

## create acc
# near create-account $CONTRACT_ACC --masterAccount $MASTER_ACC

## delete acc
# near delete $CONTRACT_ACC $MASTER_ACC

#
## ## redeploy code only
# near deploy $CONTRACT_ACC --wasmFile ../../out/md-ft.wasm \
#  --accountId $MASTER_ACC \
#  --networkId $NETWORK \
#  --initFunction "new" \
#  --initArgs '{"owner_id": "'$OWNER'", "total_supply": "100000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "Mitsori Token", "symbol": "MD", "decimals": 8 }}' \
#  --accountId $OWNER

# near view $CONTRACT_ACC ft_balance_of '{"account_id": "mitsori2.testnet"}'
near call $CONTRACT_ACC ft_transfer '{"receiver_id": "mitsori2.testnet", "amount": "10000000000000"}' --accountId $MASTER_ACC --amount 0.000000000000000000000001
# near view $CONTRACT_ACC ft_balance_of '{"account_id": "mitsori2.testnet"}'
# near view dnft.mitsori1.testnet ft_balance_of '{"account_id": "mitsori2.testnet"}