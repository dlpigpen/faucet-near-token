set -e
NETWORK=testnet
OWNER=mitsori1.$NETWORK
MASTER_ACC=mitsori1.$NETWORK
MASTER_ACC2=mitsori2.$NETWORK

CONTRACT_ACC=mdnft.$MASTER_ACC

export NEAR_ENV=$NETWORK

# near call $CONTRACT_ACC new_default_meta '{"owner_id": "'$MASTER_ACC'"}' --accountId $MASTER_ACC
# near view $CONTRACT_ACC nft_metadata

# near call $CONTRACT_ACC nft_mint '{"token_id": "token-1", "metadata": {"title": "MD NFT", "description": "The Team Most Certainly Goes :)", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$MASTER_ACC'"}' --accountId $MASTER_ACC --amount 0.1

# near view $CONTRACT_ACC nft_token '{"token_id": "token-1"}'
# near view $CONTRACT_ACC nft_tokens_for_owner '{"account_id": "'$MASTER_ACC'", "limit": 5}'
# near view $CONTRACT_ACC nft_tokens_for_owner '{"account_id": "'$MASTER_ACC2'", "limit": 5}'

# near call $CONTRACT_ACC nft_transfer '{"receiver_id": "'$MASTER_ACC2'", "token_id": "token-1", "memo": "Go Team :)"}' --accountId $MASTER_ACC --depositYocto 1


# near call $CONTRACT_ACC nft_mint '{"token_id": "token-2", "metadata": {"title": "NFT Tutorial Token", "description": "Testing the transfer call function", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$MASTER_ACC'"}' --accountId $MASTER_ACC --amount 0.1

# near call $CONTRACT_ACC nft_transfer_call '{"receiver_id": "'$MASTER_ACC2'", "token_id": "token-2", "msg": "foo"}' --accountId $MASTER_ACC --depositYocto 1 --gas 200000000000000

near view $CONTRACT_ACC nft_tokens_for_owner '{"account_id": "'$MASTER_ACC'", "limit": 5}'
# near view $CONTRACT_ACC nft_tokens_for_owner '{"account_id": "'$MASTER_ACC2'", "limit": 5}'