// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { SupportedChainId, Token } from '@uniswap/sdk-core'

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984'
export const QUOTER_CONTRACT_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'

// Currencies and Tokens

export const WETH_TOKEN = new Token(
  SupportedChainId.MAINNET,
  //'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',  //WETH on Polygon
  18,
  'WETH',
  'Wrapped Ether'
)

export const USDC_TOKEN = new Token(
  SupportedChainId.MAINNET,
  //'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',  //USDC on Polygon
  6,
  'USDC',
  'USD//C'
)