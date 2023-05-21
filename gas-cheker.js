const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR-PROJECT-ID');

const account1 = '0x1234567891011121314151617181920212223242'; // alamat wallet Anda
const privateKey1 = Buffer.from('PRIVATE-KEY-STRING', 'hex');

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Create a transaction object
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', // alamat wallet tujuan
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  };

  // Sign the transaction with the private key
  const tx = new Tx(txObject, { chain: 'mainnet', hardfork: 'petersburg' });
  tx.sign(privateKey1);

  // Serialize the transaction and convert to hex string
  const serializedTx = tx.serialize();
  const raw = '0x' + serializedTx.toString('hex');

  // Wait until the gas price is acceptable
  const checkGasPrice = setInterval(() => {
    web3.eth.getGasPrice()
      .then((gasPrice) => {
        console.log(Current gas price: ${gasPrice});
        if (gasPrice <= web3.utils.toWei('20', 'gwei')) {
          clearInterval(checkGasPrice);
          console.log('Sending transaction...');
          // Broadcast the transaction to the network
          web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log(Transaction hash: ${txHash});
          });
        }
      });
  }, 60000); // Check gas price every 60 seconds
});