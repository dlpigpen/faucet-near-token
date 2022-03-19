export const FETCH_NEAR_BALANCE_PENDING = 'FETCH_NEAR_BALANCE_PENDING'
export const FETCH_NEAR_BALANCE_SUCCESS = 'FETCH_NEAR_BALANCE_SUCCESS'
export const FETCH_NEAR_BALANCE_ERROR = 'FETCH_NEAR_BALANCE_ERROR'

export const FETCH_WNEAR_BALANCE_PENDING = 'FETCH_WNEAR_BALANCE_PENDING'
export const FETCH_WNEAR_BALANCE_SUCCESS = 'FETCH_WNEAR_BALANCE_SUCCESS'
export const FETCH_WNEAR_BALANCE_ERROR = 'FETCH_WNEAR_BALANCE_ERROR'


function fetchNearBalancePending() {
    return {
        type: FETCH_NEAR_BALANCE_PENDING
    }
}

function fetchNearBalanceSuccess(balance) {
    return {
        type: FETCH_NEAR_BALANCE_SUCCESS,
        nearBalance: balance
    }
}

function fetchNearBalanceError(error) {
    return {
        type: FETCH_NEAR_BALANCE_ERROR,
        error: error
    }
}