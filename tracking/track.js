const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));

const address = '0xD065833450C9AB16C35BEe9377593800628fC29A';

async function getTransactions() {
    const txCount = await web3.eth.getTransactionCount(address);
    console.log('Number of transactions:', txCount);

    const promises = [];

    for (let i = 0; i < txCount; i++) {
      const blockNumber = await web3.eth.getTransactionReceipt(i).then(receipt => receipt.blockNumber);
      promises.push(web3.eth.getTransactionFromBlock(blockNumber, i));
    }
  
    const transactions = await Promise.all(promises);
  
    transactions.forEach(tx => {
      if (tx && tx.to === address) {
        console.log('Transaction:', tx);
      }
    });
  }
  
  getTransactions();

