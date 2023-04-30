import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
//import { USDC_TOKEN, WETH_TOKEN } from './libs/constants'
import { USDC_TOKEN, WETH_TOKEN } from './config'  ///settingan untuk polygon

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  PRODUCTION,
}

// Inputs that configure this example to run
export interface ExampleConfig {
  env: Environment
  rpc: {
    local: string
    mainnet: string
  }
  tokens: {
    in: Token
    amountIn: number
    out: Token
    fee: number
  }
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  env: Environment.LOCAL,
  rpc: {
    //local: 'http://localhost:8545',
    local: 'https://polygon-rpc.com/',  ///  lokalnya di polygon
    mainnet: '',
  },
  tokens: {
    in: USDC_TOKEN,
    amountIn: 1000,
    out: WETH_TOKEN,
    fee: FeeAmount.MEDIUM,
  },
}