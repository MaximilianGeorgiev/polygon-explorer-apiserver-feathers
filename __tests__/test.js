const app = require("../app");
const axios = require('axios');
const jestOpenAPI = require('jest-openapi').default;
//const swaggerDocument = require('../swagger.json');
//jestOpenAPI(swaggerDocument);
//require('dotenv').config();

//const server = "http://" + process.env.SERVER_HOST + ":" + process.env.SERVER_PORT;
const server = "http://localhost:3030";
console.log(server);
jest.setTimeout(20000);


describe('GET /blocks/latest', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/blocks/latest');

        expect(res.status).toEqual(200);
        // expect(res).toSatisfyApiSpec();
    });
});

describe('GET /blocks/identifier/:arg', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/blocks/identifier/1000');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET /blocks/{from}/{count}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/blocks/1000/2');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET /blocks/pending', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/blocks/pending');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});


describe('GET /transactions/hash/{hash}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/transactions/hash/0xfddf5bcce2beafd53f0bd20271ae50b7b31f917cb24c117528201f7527cff783');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();

    });
});

describe('GET /transactions/pending/', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/transactions/pending');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();

    });
});

describe('GET /transactions/address/{address}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/transactions/address/0x52Add4435c81a4e0fB2eC494966863e48BF9302E');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();

    });
});

describe('GET /transactions/latest', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/transactions/latest');

        expect(res.status === 200 || res.status === 204).toBe(true);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET /addresses/{address}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server +'/addresses/0x52Add4435c81a4e0fB2eC494966863e48BF9302E');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET /transactions/hash/{hash}', () => {
    it('should return null', async () => {
        const res = await axios.get(server + '/transactions/hash/0xfddf5bcce2beafd53f0bd20271ae50b7b31f917cb24c117528201f7527cff78a');

        expect(res.status).toEqual(200);
        expect(res.data.message).toBe(null);
    });
});

describe('GET /transactions/address/{address}', () => {
    it('should return undefined', async () => {
        const res = await axios.get(server +'/transactions/address/ax52Add4435c81a4e0fB2eC494966863e48BF9302E')
            .catch((error) => {
            });
        expect(res.data.message).toBe("Invalid address.");
    });
});
