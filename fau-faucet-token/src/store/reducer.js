
import * as constants from './constants'

const initState = {
    pending: false,
    error: null,

    nearBalance: '0',
    wNearBalance: '0',
    inputNearBalance: '0',
    isWrap: true,
}

function reducer(state, action) {
    switch (action.type) {
        // near
        case constants.FETCH_NEAR_BALANCE_PENDING:
            return {
                ...state,
                pending: true
            }

        case constants.FETCH_NEAR_BALANCE_SUCCESS:
            return {
                ...state,
                pending: false,
                nearBalance: action.payload
            }

        case constants.FETCH_NEAR_BALANCE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
            

        // wNearBalance
        case constants.FETCH_WNEAR_BALANCE_PENDING:
            return {
                ...state,
                pending: true
            }

        case constants.FETCH_WNEAR_BALANCE_SUCCESS:
            return {
                ...state,
                pending: false,
                wNearBalance: action.payload
            }

        case constants.FETCH_WNEAR_BALANCE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            }

        // set input wrap near
        case constants.SET_NEAR_BALANCE_INTO_INPUT:
            let number = String(Number(action.payload));
            return {
                ...state,
                inputNearBalance: number
            }

        // set option wrap
        case constants.SET_IS_WRAP:
            return {
                ...state,
                isWrap: action.payload,
                inputNearBalance: '0'
            }

        default:
            return state;
    }
}

export { initState }
export default reducer

