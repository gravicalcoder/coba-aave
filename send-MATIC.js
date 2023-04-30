const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));
require('dotenv').config()

const account = process.env.WALLET_ADDRESS;
const privateKey = process.env.WALLET_SECRET;

async function sendMATIC(jumlahnya){

    const recipient = '0x82dF0F428325B889a3f4Aa993485A262dc51f05d';  //reserve
    const amount = await web3.utils.toWei(jumlahnya.toString(), 'ether');
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 4880000;
    const tx = {
        from: account,
        to: recipient,
        value: amount,
        gas: 30000, // gas limit
        gasPrice: gasPrice, // gas price in wei (10 gwei)
        gasLimit: gasLimit,
        nonce: await web3.eth.getTransactionCount(account), // nonce
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(`Transaction sent: ${receipt.transactionHash}`);

}

sendMATIC(0.35)
