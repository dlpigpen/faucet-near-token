import {
    useStore,
    actions,
} from '../../store'

import {
    formatmatNumber,
    parseTokenAmount,
    parseTokenWithDecimals,
    wallet
} from "~utils/near"


import {
    depositNear,
    withdrawNear,
    wrapNearContract
} from '../wrapper-contract'

export async function getNearBalance(dispatch) {
    if (wallet.isSignedIn()) {
        // pending get near balance
        try {
            dispatch(actions.FETCH_NEAR_BALANCE_PENDING_ACTION())

            // get near balance
            const balance = await wallet.account().getAccountBalance();
            const availableBalance = parseTokenWithDecimals(balance.available, 24)

            // set near balance
            dispatch(actions.FETCH_NEAR_BALANCE_SUCCESS_ACTION(availableBalance))

        } catch (err) {
            // set error balance
            dispatch(actions.FETCH_NEAR_BALANCE_ERROR_ACTION(String(err)))
        }
    } else {
        console.log("getNearBalance:: The user has not authorized Near wallet yet")
    }
}

export const getwNearBalance = async (dispatch) => {
    if (wallet.isSignedIn) {
        try {
            dispatch(actions.FETCH_WNEAR_BALANCE_PENDING_ACTION())

            let balance = await wrapNearContract.ft_balance_of({ account_id: wallet.getAccountId() })
            const availableBalance = parseTokenWithDecimals(balance, 24)

            // set near balance
            dispatch(actions.FETCH_WNEAR_BALANCE_SUCCESS_ACTION(availableBalance))
        } catch (err) {
            // set error balance
            dispatch(actions.FETCH_WNEAR_BALANCE_ERROR_ACTION(String(err)))
        }
    }
}
