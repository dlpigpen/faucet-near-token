import React, { useEffect } from 'react'
import NFTSvg from "~/assets/imgs/nft.svg";
import { Image } from 'antd';
import { useStore, actions } from '../store'
import {
    getNftByOwner,
    getTotalNFTMinted,

} from "../utils/fetchnft"


import {
    mint_nft,
} from "../utils/nftcontract"


function NFT() {
    const [state, dispatch] = useStore()
    const { nft_tokens_for_owner, total_nft_supply } = state


    const handleMintAction = async () => {
        try {
            await mint_nft(total_nft_supply + 1)
        } catch (e) {
            console.log("Handle submit claim button with error: ", e.message);
        }
    }

    useEffect(() => {
        getNftByOwner(dispatch)
        getTotalNFTMinted(dispatch)
    }, []) // listen one time

    return (
        <div className="w3-display-topmiddle w3-container w3-card-2 w3-theme-l5 w3-round-large w3-padding" style={{ marginTop: '160px', minWidth: '420px', maxWidth: '500px' }}>
            <div className="w3-row">
                <h2 className="w3-center">NFT Minting</h2>
            </div>
            <div className="w3-row">
                <h6 className="w3-theme-light">MD NFT is the top collection on Near. The owner whose the ownership of MD NFT is the richest in the world.</h6>
            </div>


            <div className="w3-row">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <NFTSvg height={380} width={280} />
                </div>
            </div>

            <p>
            You already minted: { nft_tokens_for_owner.length } / { total_nft_supply } NFTs
            </p>

            <p className="w3-center">
                <button
                    className="w3-button w3-section w3-block w3-ripple w3-theme-d4 w3-round w3-large"
                    style={{ height: '50px' }}
                    onClick={ handleMintAction }
                >
                    Mint
                </button>
            </p>

            <p>
                You can view your NFT collections at the link: <a href="https://wallet.testnet.near.org/?tab=collectibles" target="_blank">View MD NFT</a>
            </p>
        </div>
    )
}

export default NFT
