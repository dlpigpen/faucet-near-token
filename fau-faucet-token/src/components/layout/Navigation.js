import React from 'react'
import { Link } from 'react-router-dom'
import { login, logout, wallet } from '~utils/near'

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
                    <Link to="/" className="w3-bar-item w3-button w3-padding-large w3-theme-d4">
                        <i className="fa fa-home w3-margin-right"></i>Nearile
                    </Link>
                    <Link to="/" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" tile="Swap">
                        Swap
                    </Link>
                    <Link to="/" className="w3-bar-item w3-button w3-button w3-hide-small w3-padding-large w3-hover-white">
                        Pools
                    </Link>
                    <Link to="/" className="w3-bar-item w3-button w3-button w3-hide-small w3-padding-large w3-hover-white">
                        Staking
                    </Link>
                    <Link to="/faucet" className="w3-bar-item w3-button w3-button w3-hide-small w3-padding-large w3-hover-white">
                        Faucet
                    </Link>
                    <Link to="/nft" className="w3-bar-item w3-button w3-button w3-hide-small w3-padding-large w3-hover-white">
                        NFTs
                    </Link>
                    <Link to="/wrapper" className="w3-bar-item w3-button w3-button w3-hide-small w3-padding-large w3-hover-white">
                        Wrap NEAR
                    </Link>
                    {
                        // if logged in
                        wallet.isSignedIn() ?
                            <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-green" title="My Account" onClick={logout}>
                                {wallet.getAccountId()}
                            </a>
                            :
                            // if not login
                            <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-green" title="My Account" onClick={login}>
                                Login with NEAR
                            </a>

                    }
                </div>

                <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
                    <Link to="#" className="w3-bar-item w3-button w3-padding-large">Swap</Link>
                    <Link to="#" className="w3-bar-item w3-button w3-padding-large">Pools</Link>
                    <Link to="#" className="w3-bar-item w3-button w3-padding-large">Staking</Link>
                    <Link to="/faucet" className="w3-bar-item w3-button w3-padding-large">Faucet</Link>
                    <Link to="/nft" className="w3-bar-item w3-button w3-padding-large">NFTs</Link>
                    <Link to="/wrapper" className="w3-bar-item w3-button w3-padding-large">Wrap NEAR</Link>
                </div>

            </div>


        </>

    )
}

export default Navigation
