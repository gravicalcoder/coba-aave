const Web3 = require('web3');
const Aave = require('aave-js');

const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));
const aave = new Aave(web3);

const contractAddress = "0xeE781cB9BE8d7284a55CfB9ab99CC3aB08aFFb1B";
const privateKey = "0x94bf4693d19e8fc7e80fbd66731591bb6fc70f55c5827d18a9097d6a6749d7e2";

async function deposit() {
  // Get the contract instance
  const contract = new web3.eth.Contract(aave.options.address.LendingPool, contractAddress);

  // Get the current account
  const accounts = await web3.eth.getAccounts();
  const depositor = accounts[0];

  // Calculate the amount to deposit (1 Matic)
  const depositAmount = web3.utils.toWei("1", "matic");

  // Get the address of the Matic token
  const maticAddress = "0x7d1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";

  // Approve the Aave contract to transfer the Matic tokens
  const approveTx = await contract.methods.approve(contractAddress, depositAmount)
    .send({ from: depositor, gas: 500000 });

  // Deposit the Matic tokens to the Aave protocol
  const depositTx = await contract.methods.deposit(maticAddress, depositAmount)
    .send({ from: depositor, gas: 500000 });

  console.log(approveTx, depositTx);
}

deposit();
