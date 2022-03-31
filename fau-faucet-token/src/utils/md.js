import {
    actions
} from '../store'

import {
    formatNumber,
    parseTokenAmount,
    parseTokenWithDecimals,
    wallet,
} from "~utils/near"

import {
    mdFaucetContract,
    faucet
} from "~utils/md-faucet-contract"

import {
    getTokenMetadata
} from "~utils/token"


import mdContract from "./md-contract"

export async function getTotalMdBalance(dispatch) {
    if (wallet.isSignedIn()) {
        try {
            const decimals = getTokenMetadata().decimals
            const balance = await mdContract.ft_balance_of( { account_id: wallet.getAccountId() })
            const balanceInNear = parseTokenWithDecimals(balance, decimals)

            // set balance action to dispatch
            dispatch(actions.FETCH_TOTAL_MD_BALANCE_SUCESS_ACTION(balanceInNear))
            
        } catch (err) {
            // TODO: Should trigger an error action here
            console.log("getTotalMdBalance:: " + String(err.message))
        }
    } else {
        console.log("getTotalMdBalance:: The user has not authorized yet");
    }
}

export const getAccountMDBalancedShared = async (dispatch) => {
    if (wallet.isSignedIn()) {
        try {
            const decimals = getTokenMetadata().decimals
            const balance = await mdFaucetContract.get_shared_balance_of( { account_id: wallet.getAccountId() })
            const balanceInNear = parseTokenWithDecimals(balance, decimals)

            // set balance action to dispatch
            dispatch(actions.FETCH_TOTAL_ACCOUNT_MD_BALANCE_SUCESS_ACTION(balanceInNear))
            
        } catch (err) {
            // TODO: Should trigger an error action here
            console.log("getAccountMDBalancedShared:: " + String(err.message))
        }
    } else {
        console.log("getTotalMdBalance:: The user has not authorized yet");
    }
}

export const getMDTokenInfo = async (dispatch) => {
    if (wallet.isSignedIn()) {
        try {
            const faucetInfo = await mdFaucetContract.get_faucet_info();
            const decimals = getTokenMetadata().decimals
            
            const faucetInfoProcess = {
                is_paused: faucetInfo.is_paused,
                max_shared_per_account: formatNumber(parseTokenWithDecimals(faucetInfo.max_share_per_account, decimals)),
                total_account_shared: faucetInfo.total_account_shared,
                total_balance_share: formatNumber(parseTokenWithDecimals(faucetInfo.total_balance_share, decimals)),
                total_shared: formatNumber(parseTokenWithDecimals(faucetInfo.total_shared, decimals)),
                decimals: decimals
            }
            dispatch(actions.FETCH_MD_FAUCET_INFO_SUCCESS_ACTION(faucetInfoProcess))
        } catch (err) {
            console.log("getMDTokenInfo:: " + String(err.message)) 
        }
    } else {
        console.log("getMDTokenInfo:: The user has not authorized yet");
    }
}