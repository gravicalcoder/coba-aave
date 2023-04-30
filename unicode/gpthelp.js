

const { ChainId, Fetcher, Route, Trade, TokenAmount, TradeType } = require('@uniswap/sdk');

const USDCToken = await Fetcher.fetchTokenData(ChainId.MAINNET, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
const ETHToken = await Fetcher.fetchTokenData(ChainId.MAINNET, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');

const pair = await Fetcher.fetchPairData(USDCToken, ETHToken);
const route = new Route([pair], USDCToken);


const trade = new Trade(route, new TokenAmount(USDCToken, '100'), TradeType.EXACT_INPUT);


console.log(`Expected output amount: ${trade.outputAmount.toSignificant(6)} ${ETHToken.symbol}`);


const slippageTolerance = new Percent('50', '10000'); // 0.5%
const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
const path = [USDCToken.address, ETHToken.address];
const to = 'YOUR_ADDRESS';
const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const signer = provider.getSigner();
const uniswap = new ethers.Contract('0x7a250d5630b4cf539739df2c5dacb4c659f2488d', ['function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'], signer);

const tx = await uniswap.swapExactTokensForETH(trade.inputAmount.raw, amountOutMin, path, to, deadline, {
  gasPrice: ethers.utils.parseUnits('5', 'gwei'),
  gasLimit: 300000,
  value: 0
});
console.log(`Transaction hash: ${tx.hash}`);
