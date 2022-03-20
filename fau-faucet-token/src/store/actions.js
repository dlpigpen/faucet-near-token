
import * as constants from './constants'


export function FETCH_NEAR_BALANCE_PENDING_ACTION() {
    return {
        type: constants.FETCH_NEAR_BALANCE_PENDING
    }
}

export function FETCH_NEAR_BALANCE_SUCCESS_ACTION(payload) {
    return {
        type: constants.FETCH_NEAR_BALANCE_SUCCESS,
        payload
    }
}

export function FETCH_NEAR_BALANCE_ERROR_ACTION(payload) {
    return {
        type: constants.FETCH_NEAR_BALANCE_ERROR,
        payload
    }
}


// WNear
export function FETCH_WNEAR_BALANCE_PENDING_ACTION() {
    return {
        type: constants.FETCH_WNEAR_BALANCE_PENDING
    }
}

export function FETCH_WNEAR_BALANCE_SUCCESS_ACTION(payload) {
    return {
        type: constants.FETCH_WNEAR_BALANCE_SUCCESS,
        payload
    }
}

export function FETCH_WNEAR_BALANCE_ERROR_ACTION(payload) {
    return {
        type: constants.FETCH_WNEAR_BALANCE_ERROR,
        payload
    }
}

// set near input
export function SET_NEAR_BALANCE_INTO_INPUT_ACTION(payload) {
    return {
        type: constants.SET_NEAR_BALANCE_INTO_INPUT,
        payload
    }
}


// set wrap near input
export function SET_IS_WRAP_ACTION(payload) {
    return {
        type: constants.SET_IS_WRAP,
        payload
    }
}

// 
export function DO_WRAP_NEAR_ACTION(payload) {
    return {
        type: constants.SET_IS_WRAP,
        payload
    }
}

