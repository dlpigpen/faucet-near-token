import {
    Near,
    keyStores,
    utils
} from 'near-api-js'

import { functionCall } from 'near-api-js/lib/transaction'
import BN from 'bn.js'
import getConfig from './config'
import MDWallet from "./mdwallet"

const env = process.env.NEAR_ENV || "development"
export const config = getConfig(env)

export const near = new Near({
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    ...config
})

export const STAKING_STORAGE_AMOUNT = "0.01";
export const FT_STORAGE_AMOUNT = "0.01";
export const ONE_YOCTO_NEAR = "0.000000000000000000000001"

export const wallet = new MDWallet(near, config.MD_STAKING_CONTRACT)

export const getGas = (gas: string) => gas ? new BN(gas) : new BN('100_000_000_000_000')
export const getAmount = (amount: string) => amount ? new BN(utils.format.parseNearAmount(amount)) : new BN('0')

export interface ViewFunctionOptions {
    methodName: string,
    args?: object
}

export interface FunctionCallOptions extends ViewFunctionOptions {
    gas?: string;
    amount?: string;
}

export interface Transaction {
    receiverId: string;
    functionCalls: FunctionCallOptions[];
}

export const execTransactions = async (
    transactions: Transaction[],
    callbackUrl?: string
) => {
    const nearTransactions = await Promise.all(
        transactions.map((trans, index) => {
            return wallet.createTransaction({
                receiverId: trans.receiverId,
                nonceOffset: index + 1,
                actions: trans.functionCalls.map(fc => functionCall(
                    fc.methodName,
                    fc.args,
                    getGas(fc.gas),
                    getAmount(fc.amount)
                )
                )
            })
        })
    )

    return await wallet.requestSignTransactions(nearTransactions, callbackUrl)
}

export const login = async () => {
    await wallet.requestSignIn(config.MD_STAKING_CONTRACT);
}

export const logout = () => {
    wallet.signOut()
    window.location.replace(window.location.origin + window.location.pathname)
}

export function parseTokenWithDecimals(amount: number, decimals: number) {
    let amountD = amount / Math.pow(10, decimals);
    return Math.floor(amountD * 100) / 100;
}

export function parseTokenAmount(amount: number, decimals: number) {
    let parsedNumber: { dec: number, num: number } = parseFloatToInt(amount);
    let decBN = new BN(decimals - parsedNumber.dec);
    let ten = new BN(10);
    let amountBN = new BN(parsedNumber.num);
    return amountBN.mul(ten.pow(decBN));
}

/**
 * Return int number and decimals
 * @param num float number
 */
function parseFloatToInt(num: number) {
    let numString: string[] = num.toString().split(".");

    if (numString.length == 1) {
        return {
            num: parseInt(numString[0]),
            dec: 0
        };
    }

    if (numString.length == 2) {
        return {
            num: parseInt(numString.join("")),
            dec: numString[1].length
        }
    }
}

export function formatNumber(num: number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}