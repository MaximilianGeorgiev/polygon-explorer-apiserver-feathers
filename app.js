const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const AddressService = require('./services/addresses.js');
const addressController = require('./controllers/addresses');

const BlockService = require('./services/blocks.js');
const blockController = require('./controllers/blocks');

// A messages service that allows to create new
// and return all existing messages
class MessageService {
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

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Host static files from the current folder
app.use(express.static(__dirname));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// Register an in-memory messages service
app.use('/messages', new MessageService());
// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

// Add any new real-time connection to the `everybody` channel
app.on('connection', connection =>
    app.channel('everybody').join(connection)
);
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'));

// Start the server
app.listen(3030).on('listening', () =>
    console.log('Feathers server listening on localhost:3030')
);

// For good measure let's create a message
// So our API doesn't look so empty
app.service('messages').create({
    text: 'Hello world from the server'
});

app.use('/address/:address', async (req, res) => {
    app.use('/address/:address', new AddressService());

    const message = await addressController.getAccountBalance(req.params.address);

    app.service('address/:address').create({
        text: message
    });

    res.json({
        message: message
    });
});

app.use('/blocks/latest', async (req, res) => {
    app.use('/blocks/latest', new BlockService());

    const message = await blockController.getLatestBlock();

    app.service('blocks/latest').create({
        text: message
    });

    res.json({
        message: message
    });
});

app.use('/blocks/pending', async (req, res) => {
    app.use('/blocks/pending', new BlockService());

    const message = await blockController.getPendingBlocks();

    app.service('blocks/pending').create({
        text: message
    });

    res.json({
        message: message
    });
});

app.use('/blocks/identifier/:identifier', async (req, res) => {
    app.use('/blocks/identifier/:identifier', new BlockService());

    const message = await blockController.getBlockByIdentifier(req.params.identifier);

    app.service('/blocks/identifier/:identifier').create({
        text: message
    });

    res.json({
        message: message
    });
});

app.use('/blocks/:from/:count', async (req, res) => {
    app.use('/blocks/:from/:count', new BlockService());

    const message = await blockController.getMultipleBlocksAfterThreshold(req.params.from, req.params.count);

    app.service('/blocks/:from/:count').create({
        text: message
    });

    res.json({
        message: message
    });
});



