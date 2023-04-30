const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));
require('dotenv').config()

class MaticSender {
  constructor(jumlahnya) {
    this.jumlahnya = jumlahnya;
    this.account = process.env.WALLET_ADDRESS;
    this.privateKey = process.env.WALLET_SECRET;
  }

  async sendMATIC() {
    const recipient = '0x82dF0F428325B889a3f4Aa993485A262dc51f05d'; // reserve
    const amount = await web3.utils.toWei(this.jumlahnya.toString(), 'ether');
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 4880000;
    const tx = {
      from: this.account,
      to: recipient,
      value: amount,
      gas: 30000, // gas limit
      gasPrice: gasPrice, // gas price in wei (10 gwei)
      gasLimit: gasLimit,
      nonce: await web3.eth.getTransactionCount(this.account), // nonce
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, this.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction sent: ${receipt.transactionHash}`);
  }
}

module.exports = MaticSender;