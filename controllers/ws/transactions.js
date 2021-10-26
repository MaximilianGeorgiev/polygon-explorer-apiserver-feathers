const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.returnLatestTransaction = async (WSClient) => {
    let latestBlock;

    await web3.eth.getBlock('latest', true, () => { })
        .then(value => {
            latestBlock = JSON.parse(JSON.stringify(value));
        });

    const transactionsCount = latestBlock.transactions.length - 1; // last TX
    const blockNumber = latestBlock.number;

    await web3.eth.getTransactionFromBlock(blockNumber, transactionsCount).then(value => {
        WSClient.sendUTF(JSON.stringify(value));
    });

};

exports.returnPendingTransactions = async (WSClient) => {
    await web3.eth.getPendingTransactions().then((value) => {
        WSClient.sendUTF(JSON.stringify(value));
    });
};

exports.returnTransactionsCountByAddress = async (WSClient, address) => {
    if (address === null || !address.startsWith("0x")) {
        WSClient.sendUTF("Invalid address.");
        return;
    }

    await web3.eth.getTransactionCount(address).then((value) => {
        WSClient.sendUTF(JSON.stringify(value));
    });
};

exports.returnTransactionByHash = async (WSClient, hash) => {
    if (hash === null || !hash.startsWith('0x')) {
        WSClient.sendUTF("Invalid hash.");
        return;
    }

    await web3.eth.getTransaction(hash).then((value) => {
        WSClient.sendUTF(JSON.stringify(value));
    });
}