interface TokenMetadata {
    spec: string;
    name: string;
    symbol: string;
    icon: string;
    reference: string;
    referenceHash: string;
    decimals: number;
}

const mdTokenInfo: TokenMetadata = 
    {
        spec: 'ft-1.0.0',
        name: 'Mitsori',
        symbol: 'MD',
        icon: '',
        reference: null,
        referenceHash: null,
        decimals: 8
    }


const getTokenMetadata = (): TokenMetadata => {
    return mdTokenInfo
}

export {
    getTokenMetadata
}