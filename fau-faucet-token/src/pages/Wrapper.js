import React, { useEffect } from 'react'
import wrapnearIcon from "~/assets/imgs/w-NEAR-no-border.png";
import nearIcon from "~/assets/imgs/brand-icon-near.png";
import { useStore, actions } from '../store'
import  getNearBalance  from '~utils/balances/fetchnear';

function Wrapper() {
    const [state, dispatch] = useStore()
    const { nearBalance, wNearBalance } = state

    useEffect(() => {
        getNearBalance(dispatch)
    }, []) // listen one time

    return (
        <div className="w3-container w3-content w3-card-2 w3-theme-l5 w3-round-medium" style={{ marginTop: '160px', maxWidth: '500px' }}>
            <div className="w3-row">
                <h2 className="w3-center">Wrapper Near</h2>
            </div>
            <div className="w3-row">
                <h6 className="w3-theme-light">Wrapping NEAR allows you to trade on Swap/Pools. Make sure to leave 1 NEAR for gas fees to unwrap your NEAR.</h6>
            </div>


            <div className="w3-row w3-section">
                <div className="w3-content w3-margin-bottom">
                <img src={nearIcon} alt="Avatar" className="w3-circle" style={{ width: '20px', marginRight: '10px' }} />
                    <span>Balance: { nearBalance } <span className="w3-text-theme"><b>NEAR</b></span></span>
                </div>
                <div className="w3-col" style={{ width: '75%' }}>
                    <input className="w3-input w3-border w3-round" name='input' type='number'/>
                </div>

                <div className="w3-rest w3-center">
                    <img src={nearIcon} alt="Avatar" className="w3-circle" style={{ width: '40px' }} />
                    <span className="w3-theme-light"> Near</span>
                </div>
            </div>

            <div className="w3-row w3-section">
                <div className="w3-content w3-margin-bottom">
                    <img src={wrapnearIcon} alt="Avatar" className="w3-circle" style={{ width: '20px', marginRight: '10px' }} />
                    <span>Balance: { wNearBalance } <span className="w3-text-theme"><b>wNEAR</b></span></span>
                </div>

                <div className="w3-col" style={{ width: '75%' }}>
                    <input className="w3-input w3-border w3-disabled w3-round" name='input' type='number' />
                </div>

                <div className="w3-rest w3-center">
                    <img src={wrapnearIcon} alt="Avatar" className="w3-circle" style={{ width: '40px' }} />
                    <span className="w3-theme-light"> wNear</span>
                </div>

            </div>

            <p className="w3-center">
                <button className="w3-button w3-section w3-block w3-ripple w3-theme-d4 w3-round w3-large" style={{ height: '50px' }}>Submit</button>
            </p>

        </div>
    )
}

export default Wrapper
 