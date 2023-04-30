const ethers = require('ethers');
const uniswap = require('@uniswap/sdk');

const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
//const signer = new ethers.Signer(provider, '0x94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2');
//const signer = new ethers.Signer(provider, '0xec726be660698d6d06fda1b8ad2229886881c5fcc5a36109213b3c63d1cf5560');
const signer = new ethers.Wallet('0xec726be660698d6d06fda1b8ad2229886881c5fcc5a36109213b3c63d1cf5560', provider);

async function swapMaticForUsdc() {
  // Get the latest exchange rate for Matic to USDC
  const maticUsdcRate = await uniswap.uniswap.getTokenToTokenInputPrice(
    uniswap.token.getAddress('MATIC'),
    uniswap.token.getAddress('USDC'),
    1
  );

  // Calculate the amount of USDC you will receive for 1 Matic
  const usdcAmount = await maticUsdcRate.times(1);

  // Create the transaction
  const swap = await uniswap.uniswap.createExactTokenToTokenSwapInput(
    uniswap.token.getAddress('MATIC'),
    1,
    uniswap.token.getAddress('USDC'),
    usdcAmount,
    signer,
    '0xec726be660698d6d06fda1b8ad2229886881c5fcc5a36109213b3c63d1cf5560'
  );

  // Send the transaction
  await swap.send();
}

swapMaticForUsdc();
