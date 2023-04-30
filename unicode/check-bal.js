const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.matic.today"));

// Address to check the balance for
const address = "0x48C6079A8D9DF863eC98a65199Ae8224CadabA70";
const LinkMumbai ="0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
// Get the balance in wei
const balanceInWei =  web3.eth.getBalance(address).then(balance =>{
    
    //balance => {console.log(balance)

    const balanceInEther = web3.utils.fromWei(balance, 'ether')
    console.log("saldo matic = "+balanceInEther)
    
    
    }) ;

    const abi = [{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]


    const contract = new web3.eth.Contract(abi, LinkMumbai);

    const getBalance = async () => {
        const res = await contract.methods.balanceOf(address).call();
        const format = web3.utils.fromWei(res);
        console.log("saldo LINK ="+format);
    }
    
    getBalance();