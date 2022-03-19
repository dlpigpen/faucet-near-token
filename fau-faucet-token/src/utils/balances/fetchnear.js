import {
    fetchNearBalancePending,
    fetchNearBalanceSuccess,
    fetchNearBalanceError,

} from '../../store/actions'

import {
    formatmatNumber,
    parseTokenAmount,
    parseTokenWithDecimals,
    wallet
} from "~utils/near"

async function getNearBalance(dispatch) {
    if (wallet.isSignedIn()) {
        // pending get near balance
        try {
        dispatch(fetchNearBalancePending())

        let balance = await wallet.account().getAccountBalance();
        console.log("balance", balance)

        // set near balance
        dispatch(fetchNearBalanceSuccess(balance))

        } catch (err) {
            // set error balance
            dispatch(fetnearBalanceError(String(err)))
        }
    } else {
        console.log("getNearBalance:: The user has not authorized Near wallet yet")
    }
}

export default getNearBalance;
