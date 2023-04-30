const Web3 = require('web3');
const hdkey = require('hdkey');
const bip39 = require('bip39');
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));
const newWallet = web3.eth.accounts.create();
console.log(newWallet);

//console.log('private key doang ='+newWallet.privateKey);

console.log(" " )
/*
console.log(" " )
const privateKey = "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709";
//const privateKey = toString(newWallet.privateKey);
const hdkeyObject = hdkey.fromMasterSeed(Buffer.from(privateKey, 'hex'));
const seedMnemonic = hdkeyObject.mnemonic;
console.log(seedMnemonic);
*/

/*
const privateKey = "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709";
const seed = bip39.entropyToMnemonic(privateKey);
console.log(seed);
*/

