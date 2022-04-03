import * as constants from '../constants'

export function FETCH_NFT_TOKENS_FOR_OWNER_ACTION(payload) {
    return {
        type: constants.FETCH_NFT_TOKENS_FOR_OWNER,
        payload: payload
    }
}


export function FETCH_TOTAL_NFT_SUPPLY_ACTION(payload) {
    return {
        type: constants.FETCH_TOTAL_NFT_SUPPLY,
        payload: payload
    }
}
