import React from 'react'
import nearIcon from "~/assets/imgs/brand-icon-near.png";

function Faucet() {
    return (
        <div className="w3-display-topmiddle w3-container w3-card-2 w3-theme-l5 w3-round-large w3-padding" style={{ marginTop: '160px', minWidth: '420px', maxWidth: '500px' }}>
            <div className="w3-row">
                <h2 className="w3-center">Faucet Token</h2>
                <p>FAU is a Near testnet token which you can deposit, transfer and withdraw any Near dApps.</p>
            </div>

            <div className="w3-panel w3-card-4 w3-round-large">
                <div className="w3-row w3-padding">
                    <div className="w3-content">
                        <img src={nearIcon} alt="Avatar" className="w3-circle" style={{ width: '20px', marginRight: '10px' }} />
                        <span>Balance:
                            <button className="w3-btn w3-hover-off"
                                style={{ textDecoration: 'underline', paddingLeft: '4px', paddingRight: '4px', marginBottom: '4px' }}
                            >
                                0
                            </button>
                            <span className="w3-text-theme"><b>NEAR</b></span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="w3-panel w3-card-4 w3-round-large">
                <div className="w3-content">
                    <p>
                        Shared balance:0 VBIC
                    </p>
                </div>

                <div className="w3-content">
                    <input
                        className="w3-input w3-border w3-round"
                        name='input'
                        type='number'


                    />
                </div>
                <div className="w3-content">
                    <p>One account can get max 50,000 VBIC. You can get more!</p>
                </div>

                <div className="w3-content">
                    <button
                        className="w3-button w3-section w3-block w3-ripple w3-theme-d4 w3-round w3-large"
                        style={{ height: '50px' }}

                    >
                        Claim
                    </button>
                </div>



            </div>
            <div className="w3-row-padding" style={{ marginTop: '24px', marginBottom: '8px' }}>
                <div className="w3-half" style={{ marginBottom: '8px' }}>
                    <div className="w3-round w3-theme-l5">
                        <div class="w3-container w3-center">
                            <span className="w3-opacity w3-col"> Total VBIC Shared</span>
                            <span className="w3-text-black w3-medium w3-col"> 275000  <span> MD</span></span>
                        </div>
                    </div>
                </div>

                <div className="w3-half" >
                    <div className="w3-round w3-theme-l5">
                        <div class="w3-container w3-center">
                            <span className="w3-opacity w3-col"> Total VBIC Shared</span>
                            <span className="w3-text-black w3-medium w3-col"> 275000  <span> MD</span></span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Faucet
