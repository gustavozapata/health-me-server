//EL ESPANIOL
//https://www.youtube.com/watch?v=I4BZQr-5mBY&t=845s

const chai = require('chai')
const chaiHttp = require('chai-http')
const dotenv = require('dotenv')

dotenv.config()

const server = `http://${process.env.LOCAL_HOST}:4000`

//assertion style
chai.should()

//use chai-http middleware
chai.use(chaiHttp)

describe('Users API', () => {
    //Test Login
    describe("POST /api/v1/users/login", () => {
        it('it should login the user', (done) => {
            chai.request(server)
                .post("/api/v1/users/login")
                .set('content-type', 'application/json')
                .send({email: 'tavo', password: '1'})
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                done()
                })
        })
    })

    describe("GET /api/v1/stations", () => {
        it('it should get all stations', (done) => {
            chai.request(server)
                .get("/api/v1/stations")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.data.should.be.a('array')
                done()
                })
        })
    })

    //Test Signup
})