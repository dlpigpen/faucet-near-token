import React, { useEffect } from 'react'
import nearIcon from "~/assets/imgs/brand-icon-near.png";

import { useStore, actions } from '../store'
import {
    getTotalMdBalance,
    getMDTokenInfo,
    getAccountMDBalancedShared,

} from "../utils/md"

import {
    formatNumber, 
    parseTokenAmount, 
    parseTokenWithDecimals, 
    wallet
} from "~utils/near";

import {faucet, mdFaucetContract} from "~utils/md-faucet-contract";


function Faucet() {
    const [state, dispatch] = useStore()
    const { totalMDBalance, faucetMDInfo, totalMDInAccount, inputRequestClaimMD } = state
    
    const handleClaimSubmit = async () => {
        
        // validate
        if (inputRequestClaimMD === '0')  {
            console.log("input zero")
            return 
        }

        // check th
        const requestMDNumber = parseTokenAmount(inputRequestClaimMD, faucetMDInfo.decimals).toString()
        console.log(requestMDNumber)
        // try {
            await faucet(requestMDNumber)
        // } catch (e) {
        //     console.log("Handle submit claim button with error: ", e.message);
        // }

    }

    const refreshData = (dispatch) => {
        getTotalMdBalance(dispatch)
        getMDTokenInfo(dispatch)
        getAccountMDBalancedShared(dispatch)
    }

    useEffect(() => {
        refreshData(dispatch)
    }, [])

    return (
        <div className="w3-display-topmiddle w3-container w3-card-2 w3-theme-l5 w3-round-large w3-padding" style={{ marginTop: '160px', minWidth: '420px', maxWidth: '500px' }}>
            <div className="w3-row">
                <h2 className="w3-center">Faucet Token</h2>
                <p>MD is a Near test-net token which you can deposit, transfer and withdraw in any Near dApps.</p>
            </div>

            <div className="w3-panel w3-card-4 w3-round-large">
                <div className="w3-row w3-padding">
                    <div className="w3-content">
                        <span>Balance:
                            <button className="w3-btn w3-hover-off"
                                style={{ textDecoration: 'underline', paddingLeft: '4px', paddingRight: '4px', marginBottom: '4px' }}
                            >
                                { totalMDBalance }
                            </button>
                            <span className="w3-text-theme"><b>MD</b></span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="w3-panel w3-card-4 w3-round-large">
                <div className="w3-content">
                    <p>
                        Shared balance: { totalMDInAccount } MD
                    </p>
               
                </div>

                <div className="w3-content">
                    <input
                        className="w3-input w3-border w3-round"
                        name='input'
                        type='number'
                        value={inputRequestClaimMD}
                        onChange={(e) => dispatch(actions.SET_INPUT_REQUEST_CLAIM_MD_ACTION(e.target.value))}
                    />
                </div>
                <div className="w3-content">
                    <p>One account can get max { faucetMDInfo.max_shared_per_account } MD each time. </p>
                </div>

                <div className="w3-content">
                    <button
                        className="w3-button w3-section w3-block w3-ripple w3-theme-d4 w3-round w3-large"
                        style={{ height: '50px' }}
                        onClick={handleClaimSubmit}
                    >
                        Claim
                    </button>
                </div>

            </div>
            <div className="w3-row-padding" style={{ marginTop: '24px', marginBottom: '8px' }}>
                <div className="w3-half" style={{ marginBottom: '8px' }}>
                    <div className="w3-round w3-theme-l5">
                        <div className="w3-container w3-center">
                            <span className="w3-opacity w3-col"> Fauceters </span>
                            <span className="w3-text-black w3-medium w3-col"> { faucetMDInfo.total_account_shared }  <span> Accounts</span></span>
                        </div>
                    </div>
                </div>

                <div className="w3-half" >
                    <div className="w3-round w3-theme-l5">
                        <div className="w3-container w3-center">
                            <span className="w3-opacity w3-col"> Total MD Shared</span>
                            <span className="w3-text-black w3-medium w3-col"> { faucetMDInfo.total_shared }  <span> MD</span></span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Faucet
