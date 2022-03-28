import React, { useEffect } from 'react'
import wrapnearIcon from "~/assets/imgs/w-NEAR-no-border.png";
import nearIcon from "~/assets/imgs/brand-icon-near.png";

import { useStore, actions } from '../store'
import { getNearBalance, getwNearBalance } from '../utils/fetchnear';

import { SwapOutlined } from "@ant-design/icons";
import { Divider } from "antd";

import {depositNear, withdrawNear, wrapNearContract} from "~utils/wrapper-contract";
import {formatNumber, parseTokenAmount, parseTokenWithDecimals, wallet} from "~utils/near";

function Wrapper() {
    const [state, dispatch] = useStore()
    const { nearBalance, wNearBalance, inputNearBalance, isWrap } = state


    const handleSubmitWrap =() => {
        
        // validate
        if (inputNearBalance === '0')  {
            console.log("input zero")
            return 
        }

        // check th
        const inputInNear = parseTokenAmount(inputNearBalance, 24)
        const currentAmount = isWrap ? parseTokenAmount(nearBalance, 24) : parseTokenAmount(wNearBalance, 24)

        if (inputInNear > currentAmount) {
            console.log("The number wrapper over available funds")
            return
        }

        if (isWrap === true) {
            depositNear(inputInNear)
        } else {
            withdrawNear(inputInNear)
        }

    }

    useEffect(() => {
        getNearBalance(dispatch)
        getwNearBalance(dispatch)

    }, []) // listen one time

    return (
        <div className="w3-display-topmiddle w3-container w3-card-2 w3-theme-l5 w3-round-large w3-padding" style={{ marginTop: '160px', minWidth: '420px', maxWidth: '500px' }}>
            <div className="w3-row">
                <h2 className="w3-center">Wrapper Near</h2>
            </div>
            <div className="w3-row">
                <h6 className="w3-theme-light">Wrapping NEAR allows you to trade on Swap/Pools. Make sure to leave 1 NEAR for gas fees to unwrap your NEAR.</h6>
            </div>

            <div className="w3-row w3-section">
                <div className="w3-content">
                    {isWrap ?
                        <img src={nearIcon} alt="Avatar" className="w3-circle" style={{ width: '20px', marginRight: '10px' }} />
                        :
                        <img src={wrapnearIcon} alt="Avatar" className="w3-circle" style={{ width: '20px', marginRight: '10px' }} />
                    }
                    <span>Balance:
                        <button className="w3-btn w3-hover-off"
                            style={{ textDecoration: 'underline', paddingLeft: '4px', paddingRight: '4px', marginBottom: '4px' }}
                            onClick={() => dispatch(actions.SET_NEAR_BALANCE_INTO_INPUT_ACTION(isWrap ? nearBalance : wNearBalance))}>
                            {isWrap ? nearBalance : wNearBalance}
                        </button>
                        {isWrap ? <span className="w3-text-theme"><b>NEAR</b></span> : <span className="w3-text-theme"><b>wNEAR</b></span>}
                    </span>
                </div>
                <div className="w3-col" style={{ width: '75%' }}>
                    <input
                        className="w3-input w3-border w3-round"
                        name='input'
                        type='number'
                        value={inputNearBalance}
                        onChange={(e) => dispatch(actions.SET_NEAR_BALANCE_INTO_INPUT_ACTION(e.target.value))}
                    />
                </div>

                <div className="w3-rest w3-center">
                    {isWrap ?
                        <>
                            <img src={nearIcon} alt="Avatar" className="w3-circle" style={{ width: '40px' }} />
                            <span className="w3-theme-light"> Near</span>
                        </>
                        :
                        <>
                            <img src={wrapnearIcon} alt="Avatar" className="w3-circle" style={{ width: '34px' }} />
                            <span className="w3-theme-light"> wNear</span>
                        </>
                    }
                </div>
            </div>

            <div className="w3-content w3-center">
                <Divider dashed={true}>
                    <SwapOutlined style={{ transform: "rotate(90deg)" }}
                        onClick={() => dispatch(actions.SET_IS_WRAP_ACTION(!isWrap))}
                    />
                </Divider>
            </div>

            <div className="w3-row w3-section">
                <div className="w3-content">
                    {isWrap ?
                        <>
                            <img src={wrapnearIcon} alt="Avatar" className="w3-circle" style={{ width: '20px', marginRight: '10px' }} />
                            <span>Balance: {wNearBalance} <span className="w3-text-theme"><b>wNEAR</b></span></span>
                        </>
                        :
                        <>
                            <img src={nearIcon} alt="Avatar" className="w3-circle" style={{ width: '20px', marginRight: '10px' }} />
                            <span>Balance: {nearBalance} <span className="w3-text-theme"><b>NEAR</b></span></span>
                        </>
                    }

                </div>

                
                <p></p>

                <div className="w3-col" style={{ width: '75%' }}>
                    <input key={inputNearBalance}
                        className="w3-input w3-border w3-disabled w3-round"
                        name='input'
                        type='readonly'
                        defaultValue={inputNearBalance}
                    />
                </div>

                <div className="w3-rest w3-center">
                    {isWrap ?
                        <>
                            <img src={wrapnearIcon} alt="Avatar" className="w3-circle" style={{ width: '34px' }} />
                            <span className="w3-theme-light"> wNear</span>

                        </>
                        :
                        <>
                            <img src={nearIcon} alt="Avatar" className="w3-circle" style={{ width: '40px' }} />
                            <span className="w3-theme-light"> Near</span>
                        </>
                    }
                </div>

            </div>

            <p className="w3-center">
                <button
                    className="w3-button w3-section w3-block w3-ripple w3-theme-d4 w3-round w3-large"
                    style={{ height: '50px' }}
                    onClick={handleSubmitWrap}
                    >
                    Submit
                </button>
            </p>
        </div>
    )
}

export default Wrapper
