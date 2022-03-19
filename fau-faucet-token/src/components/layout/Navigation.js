import React from 'react'

function Navigation() {

    const callOpenNav = (e) => {
        e.preventDefault();
        window.openNav();
    }

    return (
        <>
            <div className="w3-top">
                <div className="w3-bar w3-theme-d5 w3-left-align w3-large">
                    <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" onClick={callOpenNav}>
                        <i className="fa fa-bars"></i>
                    </a>
                    <a href="/" className="w3-bar-item w3-button w3-padding-large w3-theme-d4">
                        <i className="fa fa-home w3-margin-right"></i>Nearile
                    </a>
                    <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" tile="Swap">
                        Swap
                    </a>
                    <a href="#" className="w3-bar-item w3-button w3-button w3-hide-small w3-padding-large w3-hover-white">
                        Pools
                    </a>
                    <a href="#" className="w3-bar-item w3-button w3-button w3-hide-small w3-padding-large w3-hover-white">
                        Staking
                    </a>
                    <a href="#" className="w3-bar-item w3-button w3-button w3-hide-small w3-padding-large w3-hover-white">
                        Faucet
                    </a>
                    <a href="#" className="w3-bar-item w3-button w3-button w3-hide-small w3-padding-large w3-hover-white">
                        NFTs
                    </a>
                    <a href="/wrapper" className="w3-bar-item w3-button w3-button w3-hide-small w3-padding-large w3-hover-white">
                        Wrap NEAR
                    </a>
                    <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
                        <i className="fa fa-connectdevelop"></i>
                    </a>
                </div>
            </div>

            <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Swap</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Pools</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Staking</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Faucet</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">NFTs</a>
                <a href="#" className="w3-bar-item w3-button w3-padding-large">Wrap NEAR</a>
            </div>
        </>

    )
}

export default Navigation
