import {
    actions,
} from '../store'

import {
    parseTokenWithDecimals,
    wallet
} from "~utils/near"


import {
    nftContract,
} from './nftcontract'


export const getNftByOwner = async (dispatch) => {
    if (wallet.isSignedIn()) {
        try {

            const tokens = await nftContract.nft_tokens_for_owner({ account_id: wallet.getAccountId(), limit: 100 })

            // set balance action to dispatch
            dispatch(actions.FETCH_NFT_TOKENS_FOR_OWNER_ACTION(tokens))

        } catch (err) {
            // TODO: Should trigger an error action here
            console.log("getNftByOwner:: " + String(err.message))
        }
    } else {
        console.log("getNftByOwner:: The user has not authorized yet");
    }
}


export const getTotalNFTMinted = async (dispatch) => {
    if (wallet.isSignedIn()) {
        try {

            const totalNumber = await nftContract.nft_total_supply()
        console.log("total number", totalNumber);
        
            // set balance action to dispatch
            dispatch(actions.FETCH_TOTAL_NFT_SUPPLY_ACTION(totalNumber))

        } catch (err) {
            // TODO: Should trigger an error action here
            console.log("getNftByOwner:: " + String(err.message))
        }
    } else {
        console.log("getNftByOwner:: The user has not authorized yet");
    }
}
