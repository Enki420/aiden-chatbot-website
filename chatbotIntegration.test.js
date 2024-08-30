const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../backend/server');

chai.should();
chai.use(chaiHttp);

describe('Chatbot API', () => {
    it('should return a response from the chatbot', (done) => {
        chai.request(server)
            .post('/api/chatbot')
            .send({ prompt: 'Hello' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                done();
            });
    });
});
