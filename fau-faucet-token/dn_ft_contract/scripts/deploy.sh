set -e
NETWORK=testnet
OWNER=mitsori1.$NETWORK
MASTER_ACC=mitsori1.$NETWORK
CONTRACT_ACC=dnft.$MASTER_ACC

export NEAR_ENV=$NETWORK

## create acc
#near create-account $CONTRACT_ACC --masterAccount $MASTER_ACC

## delete acc
#near delete $CONTRACT_ACC $MASTER_ACC

#
## ## redeploy code only
near deploy $CONTRACT_ACC --wasmFile ../../out/md-ft.wasm \
 --accountId $MASTER_ACC \
 --networkId $NETWORK \
 --initFunction "new" \
 --initArgs '{"owner_id": "'$OWNER'", "total_supply": "1000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "Mitsori", "symbol": "MD", "decimals": 8 }}' \
 --accountId $OWNER

#near view $CONTRACT_ACC get_next_task_id
#near view $CONTRACT_ACC increase_post_id "{}"
#near view $CONTRACT_ACC get_user_tasks '{"account_id":"mitsori1.testnet"}'

#near view $CONTRACT_ACC get_tasks '{"account_id":"bWl0c29yaTEudGVzdG5ldA=="}' --accountId $MASTER_ACC
#near view $CONTRACT_ACC generate_id "{\"account_id\":\"mitsori1.testnet\"}" --accountId $MASTER_ACC

#save this deployment  (to be able to recover state/tokens)
#set -ex
#cp ./res/tasktracker.wasm ./res/testnet/tasktracker.$CONTRACT_ACC.`date +%F.%T`.wasm
#date +%F.%T

