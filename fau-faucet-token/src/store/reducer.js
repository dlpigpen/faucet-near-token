
import * as constants from './constants'

const initState = {
   pending: false,
   error: null,
   nearBalance: 0,
   wNearBalance: 0,
}

function reducer(state, action) {
    switch(action.type) {
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

        default:
            return state;
    }
}

export { initState }
export default reducer

