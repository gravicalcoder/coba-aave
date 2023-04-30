
const Web3 = require('web3');
const contractAbi = [ /* ABI of your smart contract */ ];
const contractAddress = '/* address of your smart contract on the blockchain */';

const web3 = new Web3(new Web3.providers.HttpProvider('/* URL of your Ethereum node */'));
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Storing user information
async function setUser(name, age, sex, phoneNumber, city) {
  await contract.methods.setUser(name, age, sex, phoneNumber, city).send({ from: /* sender's Ethereum address */ });
  console.log('User information stored successfully');
}

// Retrieving user information
async function getUser() {
  const [name, age, sex, phoneNumber, city] = await contract.methods.getUser().call({ from: /* sender's Ethereum address */ });
  console.log('Name:', name);
  console.log('Age:', age);
  console.log('Sex:', sex);
  console.log('Phone Number:', phoneNumber);
  console.log('City:', city);
}

// Example usage
setUser('Alice', 30, 'Female', 1234567890, 'New York');
getUser();