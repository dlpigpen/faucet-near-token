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
        
        MD_STAKING_CONTRACT: "staking.mitsori1.near",
        MD_FT_CONTRACT: "ft.mitsori1.near",
        MD_FAUCET_FT_CONTRACT: "faucet-vbic.mitsori1.near",
        WRAP_NEAR_CONTRACT: "wrap.near"
      }
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',

        MD_STAKING_CONTRACT: "staking.mitsori1.testnet",
        MD_FT_CONTRACT: "ft.mitsori1.testnet",
        MD_FAUCET_FT_CONTRACT: "faucet.mitsori1.testnet",
        WRAP_NEAR_CONTRACT: "wrap.testnet"
      }
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`)
    }
  }

export default getConfig
