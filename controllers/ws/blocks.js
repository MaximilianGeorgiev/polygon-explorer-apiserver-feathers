const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.returnLatestBlock = async (WSClient) => {
    await web3.eth.getBlock('latest', true, (error, result) => { // TO DO: handle error
    }).then(value => {
        console.log(JSON.parse(JSON.stringify(value)));
        WSClient.sendUTF(JSON.stringify(value));
    });
};

exports.returnPendingBlocks = async (WSClient) => {
    await web3.eth.getBlock('pending', true, (error, result) => { // TO DO: handle error
    }).then(value => {
        WSClient.sendUTF(JSON.stringify(value));
    });
};

exports.returnBlockByNumberOrHash = async (WSClient, searchArgument) => {

    // block hash starts with 0x; block number is digits only
    if (searchArgument === null ||
        (!searchArgument.startsWith('0x') && !/^\+?(0|[1-9]\d*)$/.test(searchArgument))) {
        WSClient.sendUTF("Invalid path.");
        return;

    }

    await web3.eth.getBlock(searchArgument, true, (error, result) => {
    }).then(value => {
        WSClient.sendUTF(JSON.stringify(value));
    });
};

exports.returnMultipleBlocksAfterThreshold = async (WSClient, from, count) => {
    let latestBlock;

    if (count <= 0) {
        WSClient.sendUTF("Count cannot be negative.");
    } else if (isNaN(parseInt(from))) {
        WSClient.sendUTF("Invalid block number.");
    }

    await web3.eth.getBlock('latest', false, (error, result) => { }).then(value => {
        latestBlock = JSON.stringify(value);
    });

    const startBlockNumber = latestBlock.number - from; // get latest block number for calculations
    const blockCount = count;

    let fetchedBlocks = [];

    for (let i = startBlockNumber; i >= startBlockNumber - blockCount; i--) {
        await web3.eth.getBlock(i, false, (error, result) => { }).then((value) => {
            fetchedBlocks.push(value);

            if (i == startBlockNumber - blockCount) {
                WSClient.sendUTF(JSON.stringify(fetchedBlocks));
            }
        });
    }
};