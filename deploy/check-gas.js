const Web3 = require('web3');

const web3 = new Web3('https://polygon-rpc.com/');

async function checkGasPrice() {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    const currentDate = new Date();
    
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

   // console.log(`Current Date: ${day}-${month}-${year}`);
    //console.log(`Current Time: ${hours}:${minutes}`);
    //console.log('tanggal :', currentDate);
    console.log('Current Gas Price:', web3.utils.fromWei(gasPrice, 'gwei'), 'GWEI' , `||tanggal: ${day}-${month}-${year}` , `||jam: ${hours}:${minutes}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

checkGasPrice();

//  Current Gas Price: 138.846259623 GWEI ||tanggal: 21-5-2023 ||jam: 2:0
//  Current Gas Price: 150.70916342 GWEI ||tanggal: 21-5-2023 ||jam: 2:43
//  Current Gas Price: 109.499104551 GWEI ||tanggal: 21-5-2023 ||jam: 23:23
//  Current Gas Price: 136.459377476 GWEI ||tanggal: 23-5-2023 ||jam: 5:54
//  Current Gas Price: 147.748845949 GWEI ||tanggal: 24-5-2023 ||jam: 5:41
//  Current Gas Price: 143.957351645 GWEI ||tanggal: 25-5-2023 ||jam: 10:7
//  Current Gas Price: 175.225038145 GWEI ||tanggal: 27-5-2023 ||jam: 6:0