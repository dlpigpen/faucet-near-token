function getConfig(env: string) {
    switch (env) {
  
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org',
        
        MD_STAKING_CONTRACT: "faucet.mitsori.near",
        MD_FT_CONTRACT: "ft.mitsori1.near",
        MD_FAUCET_FT_CONTRACT: "faucet.mitsori.near",
        WRAP_NEAR_CONTRACT: "wrap.near",
        MD_NFT_CONTRACT: "mdnft.mitsori.near"
      }
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',

        MD_STAKING_CONTRACT: "faucet.mitsori1.testnet",
        MD_FT_CONTRACT: "dnft.mitsori1.testnet",
        MD_FAUCET_FT_CONTRACT: "faucet.mitsori1.testnet",
        WRAP_NEAR_CONTRACT: "wrap.testnet",
        MD_NFT_CONTRACT: "mdnft.mitsori1.testnet"
      }
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`)
    }
  }

export default getConfig
