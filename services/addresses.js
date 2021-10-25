const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

const addressController = require('../controllers/addresses.js');

class AddressService {
    constructor() {
        this.messages = [];
    }

    async find() {
        // Just return all our messages
        return this.messages;
    }

    async create(data) {
        console.log("in addressservice create");
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


module.exports = AddressService;