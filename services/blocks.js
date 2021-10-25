const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

const blocksController = require('../controllers/blocks.js');

class BlockService {
    constructor() {
        this.messages = [];
    }

    async find() {
        // Just return all our messages
        return this.messages;
    }

    async create(data) {
        // The new message is the data merged with a unique identifier
        // using the messages length since it changes whenever we add one
        const message = {
            id: this.messages.length,
            text: data.text
        }

        // Add new message to the list
        this.messages.push(message);

        return message;
    }
}


module.exports = BlockService;