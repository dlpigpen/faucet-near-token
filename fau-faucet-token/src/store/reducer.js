
import * as constants from './constants'

const initState = {
    pending: false,
    error: null,

    nearBalance: '0',
    wNearBalance: '0',
    inputNearBalance: '0',
    isWrap: true,

    faucetMDInfo: {},
    totalMDBalance: '0',
    totalMDInAccount: '0',
    inputRequestClaimMD: '0'
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


        // get total md balance 
        case constants.FETCH_TOTAL_MD_BALANCE_SUCESS:
            return {
                ...state,
                totalMDBalance: action.payload,
            }

        // fetch faucet md info info
        case constants.FETCH_MD_FAUCET_INFO_SUCCESS:
            return {
                ...state,
                faucetMDInfo: action.payload,
            }

        // fetch md token in an account
        case constants.FETCH_TOTAL_ACCOUNT_MD_BALANCE_SUCESS:
            return {
                ...state,
                totalMDInAccount: action.payload,
            }

        // update request claim input 
        case constants.SET_INPUT_REQUEST_CLAIM_MD:
            let nMDRequest = String(Number(action.payload));
            return {
                ...state,
                inputRequestClaimMD: nMDRequest,
            }

        default:
            return state;
    }
}

export { initState }
export default reducer

