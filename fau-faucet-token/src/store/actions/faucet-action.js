import * as constants from '../constants'


export function FETCH_TOTAL_MD_BALANCE_SUCESS_ACTION(payload) {
    return {
        type: constants.FETCH_TOTAL_MD_BALANCE_SUCESS,
        payload
    }
}

export function FETCH_MD_FAUCET_INFO_SUCCESS_ACTION(payload) {
    return {
        type: constants.FETCH_MD_FAUCET_INFO_SUCCESS,
        payload
    }
}

export function FETCH_TOTAL_ACCOUNT_MD_BALANCE_SUCESS_ACTION(payload) {
    return {
        type: constants.FETCH_TOTAL_ACCOUNT_MD_BALANCE_SUCESS,
        payload
    }
}

export function SET_INPUT_REQUEST_CLAIM_MD_ACTION(payload) {
    return {
        type: constants.SET_INPUT_REQUEST_CLAIM_MD,
        payload
    }
}

export function DO_CLAIM_MD_ACTION(payload) {
    return {
        type: constants.DO_CLAIM_MD,
        payload
    }
}
