set -e
NETWORK=testnet
OWNER=mitsori1.$NETWORK
MASTER_ACC=mitsori1.$NETWORK
CONTRACT_ACC=mdnft.$MASTER_ACC

export NEAR_ENV=$NETWORK

## delete acc
near delete $CONTRACT_ACC $MASTER_ACC

## create acc
near create-account $CONTRACT_ACC --masterAccount $MASTER_ACC

#
## ## redeploy code only
near deploy $CONTRACT_ACC --wasmFile ../out/main.wasm \
 --accountId $MASTER_ACC \
 --networkId $NETWORK \
  --accountId $OWNER
#  --initFunction "new" \
#  --initArgs '{"owner_id": "'$OWNER'", "total_supply": "100000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "Mitsori Token", "symbol": "MD", "decimals": 8 }}' \

near call $CONTRACT_ACC new_default_meta '{"owner_id": "'$MASTER_ACC'"}' --accountId $MASTER_ACC
