const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

exports.returnAccountBalance = async (WSClient, address) => {
    if (address === null || !address.startsWith('0x')){
        WSClient.sendUTF("Invalid address.");
        return;
    }

    await web3.eth.getBalance(address).then(value => {
        WSClient.sendUTF(JSON.parse(JSON.stringify(web3.utils.fromWei(value))));
    });
}