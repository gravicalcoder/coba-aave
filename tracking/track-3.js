const Web3 = require('web3');

class TransactionChecker {
    web3;
    account;

    //constructor(projectId, account) {
    constructor(account) {
        //this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + projectId));
        this.web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));
        this.account = account.toLowerCase();
    }

    async checkBlock() {
        let block = await this.web3.eth.getBlock('latest');
        let number = block.number;
        console.log('Searching block ' + number);

        if (block != null && block.transactions != null) {
            for (let txHash of block.transactions) {
                let tx = await this.web3.eth.getTransaction(txHash);
                if (this.account == tx.to.toLowerCase()) {
                    console.log('Transaction found on block: ' + number);
                    console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
                }
            }
        }
    }
}

//let txChecker = new TransactionChecker(process.env.INFURA_ID, '0xD065833450C9AB16C35BEe9377593800628fC29A');
let txChecker = new TransactionChecker('0xD065833450C9AB16C35BEe9377593800628fC29A');
setInterval(() => {
    txChecker.checkBlock();
}, 15 * 1000);