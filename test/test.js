const supertest = require('supertest')
const chai = require('chai')
const app = require('../src/index')
const should = chai.should();
const User = require('../src/models/UsuarioSchema')

describe('testes', function () {

    it('retornar atividades', function (done) {
        this.timeout(10000);
        supertest(app)
            .get('/api/home')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }

                done();
            })
    })

    it('não retornar rota não criada', function (done) {
        this.timeout(10000)
        supertest(app)
            .get('/api/atividade')
            .expect(404,done)
    });

    it('retornar atividade cadastrada', function (done) {
        this.timeout(10000);
        supertest(app)
            .get('/api/ativ/feijoada')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }

                done();
            })
    })
})
