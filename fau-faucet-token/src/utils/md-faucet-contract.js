import {
    Contract,
} from 'near-api-js'

import {
    wallet,
    config,
    Transaction,
    execTransactions,

    FT_STORAGE_AMOUNT,
    ONE_YOCTO_NEAR,

    parseTokenWithDecimals,
} from './near'

import mdContract from "./md-contract"


const mdFaucetContract = new Contract(
    wallet.account(),
    config.MD_FAUCET_FT_CONTRACT,
    {
        viewMethods: ["get_faucet_info", "get_shared_balance_of"],
        changeMethods: ["faucet_token"]
    }
)

const faucet = async (amount) => {
    let faucetCall = {
        receiverId: config.MD_FAUCET_FT_CONTRACT,
        functionCalls: [
            {
                methodName: 'faucet_token',
                args: { amount },
                gas: "60000000000000",
                amount: FT_STORAGE_AMOUNT,
            }
        ]
    }


    let transactions = [faucetCall]

    let storageBalance = await mdContract.storage_balance_of({ account_id: wallet.getAccountId() });
    if (!storageBalance) {
        let stakingDepositStorage = {
            receiverId: config.MD_FT_CONTRACT,
            functionCalls: [
                {
                    methodName: "storage_deposit",
                    args: { account_id: wallet.getAccountId() },
                    gas: 10_000_000_000_000,
                    amount: FT_STORAGE_AMOUNT
                }
            ]
        };
        transactions.unshift(stakingDepositStorage);
        console.log(transactions);
        await execTransactions(transactions)
    }
}

export {
    mdFaucetContract,
    faucet
}
