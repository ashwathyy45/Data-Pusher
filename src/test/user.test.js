const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const User = require('../models/userModel');

chai.should();
chai.use(chaiHttp);

describe('User API', () => {
    before(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', (done) => {
        chai.request(server)
            .post('/api/users/register')
            .send({ email: 'test@example.com', password: 'Password123' })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.success.should.be.true;
                done();
            });
    });

    it('should login the user', (done) => {
        chai.request(server)
            .post('/api/users/login')
            .send({ email: 'test@example.com', password: 'Password123' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                done();
            });
    });
});
