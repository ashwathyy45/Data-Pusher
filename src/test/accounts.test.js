const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/userModel');
const Account = require('../models/AccountModel');

chai.should();
chai.use(chaiHttp);

let token = '';

describe('Account API', () => {
    before(async () => {
        await User.deleteMany({});
        await Account.deleteMany({});

        await chai.request(server)
            .post('/api/users/register')
            .send({ email: 'acc@example.com', password: 'Pass1234' });

        const res = await chai.request(server)
            .post('/api/users/login')
            .send({ email: 'acc@example.com', password: 'Pass1234' });

        token = res.body.token;
    });

    it('should create a new account', (done) => {
        chai.request(server)
            .post('/api/accounts')
            .set('Authorization', token)
            .send({ account_name: 'Test Account' })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.success.should.be.true;
                done();
            });
    });

    it('should get all accounts', (done) => {
        chai.request(server)
            .get('/api/accounts')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.success.should.be.true;
                res.body.data.should.be.an('array');
                done();
            });
    });
});
