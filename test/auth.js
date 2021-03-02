// const expect = require('chai').expect

// const app = require('../app')

// describe('GET /api/v1/users/login', () => {
//     before((done) => {
//         conn.connect()
//             .then(() => done())
//             .catch(err => done(err))
//     })

//     after(done => {
//         conn.close()
//             .then(() => done())
//             .catch(err => done(err))
//     })

//     it('OK, login works', done => {
//         request(app).get('/api/v1/login')
//             .send({email: 'tavo', password: '1'})
//             .then((res) => {
//                 const body = res.body
//                 expect(body).to.contain.property('_id')
//                 expect(body).to.contain.property('email')
//                 expect(body).to.contain.property('fullname')
//                 done()
//             })
//             .catch(err => done(err))
//     })
// })

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});