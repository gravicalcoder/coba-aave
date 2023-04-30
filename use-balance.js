const MyWeb3 = require('./balance-class');

const myWeb3 = new MyWeb3();


/*
myWeb3.getBalance().then(balance => {
  console.log(`USDC Balance: ${balance}`);
});

myWeb3.getEthBalance().then(balance => {
  console.log(`matic Balance: ${balance}`);
});

myWeb3.getReserveBalance().then(balance => {
  console.log(`Matic Reserve Balance: ${balance}`);
});
*/

async function balance(){
  let usdc = await myWeb3.getBalance()
  console.log('USDC Balance: '+ usdc)

}

balance()
