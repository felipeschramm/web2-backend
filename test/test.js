const supertest = require('supertest')
const chai = require('chai')
const app = require('../src/index')
const joi = require('joi')
const joiAssert = require('joi-assert')
const should = chai.should();
const User = require('../src/models/UsuarioSchema')

describe('testes', function () {

    it('criar atividade corretamente', function (done) {
        this.timeout(20000);

        const jeison = joi.object({
            _id: joi.any(),
            nome: joi.string(),
            data: joi.date(),
            descricao: joi.string(),
            __v: 0
        });

        let exemplo = {
            nome: "Doação de roupas",
            data: "2019-12-09T17:00:00.000+00:00",
            descricao: "Doar agasalhos"
        }

        supertest(app)
            .post('/api/ativ/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .send(exemplo)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                joiAssert(res.body, jeison)
                done();
            })
    })

    it('não retornar rota não criada', function (done) {
        this.timeout(20000)
        supertest(app)
            .get('/api/atividade')
            .expect(404, done)
    });

    it('criar usuario', function (done) {
        this.timeout(20000);

        const jeison = joi.object({
            _id: joi.any(),
            login: joi.string(),
            senha: joi.string(),
            __v: 0
        });

        let exemplo = {
            login: "testando",
            senha: "testando"
        }

        supertest(app)
            .post('/api/user/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .send(exemplo)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                joiAssert(res.body, jeison)
                done();
            })
    })

    it('logar com usuario cadastrado', function (done) {
        this.timeout(20000);

        const jeison = joi.object({
            _id: joi.any(),
            login: joi.string(),
            senha: joi.string()
        });

        let exemplo = {
            login: "felipe",
            senha: "felipe"
        }

        supertest(app)
            .post('/api/user/felipe')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .send(exemplo)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                joiAssert(res.body, jeison)
                done();
            })
    })

    it('não logar com usuario nao cadastrado', function (done) {
        this.timeout(20000);

        let exemplo = {
            login: "paulo",
            senha: "paulo"
        }

        supertest(app)
            .post('/api/user/paulo')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .send(exemplo)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                joiAssert(res.body, null)
                done();
            })
    })

})
