import React from 'react'

function Footer() {
    return (
        <footer className="w3-bottom w3-container w3-center w3-margin-top w3-xlarge w3-hide-small w3-hide-medium">
            <p className="w3-large">Find me on social media.</p>
            <div className="w3-row">
            <a href="https://t.me/mitsori" target="_blank">
                <i className="fa fa-telegram w3-hover-opacity w3-text-theme">
                </i>
            </a>

            <a href="https://github.com/dlpigpen" target="_blank" className='w3-padding'>
                <i className="fa fa-twitter w3-hover-opacity w3-text-theme"></i>
            </a>

            <a href="https://github.com/dlpigpen" target="_blank">
                <i className="fa fa-github w3-hover-opacity w3-text-theme"></i>
            </a>

            </div>
            <p className="w3-small">Powered by <a href="https://github.com/dlpigpen" target="_blank">MD</a></p>
            
        </footer>
    )
}

export default Footer
