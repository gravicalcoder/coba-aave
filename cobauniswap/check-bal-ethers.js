const ethers = require('ethers');

const privateKey = '0xec726be660698d6d06fda1b8ad2229886881c5fcc5a36109213b3c63d1cf5560';


//checkBalance();

var url = 'https://polygon-rpc.com/';


async function checkBalance() {

    var customHttpProvider = await new ethers.providers.JsonRpcProvider(url);
    customHttpProvider.getBlockNumber().then((result) => {
    console.log("Current block number: " + result);
        });

const wallet = new ethers.Wallet(privateKey,customHttpProvider );
  const balance = await wallet.getBalance();
  console.log('Balance:', ethers.utils.formatEther(balance));
}

checkBalance();
