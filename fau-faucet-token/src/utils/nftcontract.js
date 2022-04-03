import {
    Contract
} from "near-api-js"
import { parseNearAmount } from "near-api-js/lib/utils/format"

import {
    wallet,
    config,
    Transaction,
    execTransactions,

    FT_STORAGE_AMOUNT,
    ONE_YOCTO_NEAR,

    parseTokenWithDecimals,
} from './near'


const nftContract = new Contract (
    wallet.account(),
    config.MD_NFT_CONTRACT,
    {
        viewMethods: [ "nft_supply_for_owner", "nft_tokens_for_owner", "nft_tokens", "nft_total_supply"],
        changeMethods: ["nft_mint"]
    }
)

const mint_nft = async (next_nft_id) => {
    let mintNFTCall = {
        receiverId: config.MD_NFT_CONTRACT,
        functionCalls: [
            {
                methodName: 'nft_mint',
                args: { account_id: wallet.getAccountId() },
                args: { 
                    token_id: "token" + next_nft_id.toString(), 
                    metadata: {
                        title: "MD NFT", 
                        description: "The top collection on Near", 
                        media: "https://bafkreigk3u2r7cm3jq7xjmy7yezn4cqzrfsgrmujadh33mqxonkhyfjor4.ipfs.nftstorage.link"
                    }, 
                    receiver_id: wallet.getAccountId() 
                },
                gas: 6_000_000_000_000,
                amount: FT_STORAGE_AMOUNT,
            }
        ]
    }

    let transactions = [mintNFTCall]
    await execTransactions(transactions)
}


export {
    nftContract,
    mint_nft
}