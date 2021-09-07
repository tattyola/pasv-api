import supertest from 'supertest';
import { expect } from 'chai';



describe('successful login', function() {
    const request = supertest(process.env.BASE_URL);

    it('successful log in', function() {
        request
            .post('/auth')
            .send({login:process.env.LOGIN, password:process.env.PASSWORD})

            .expect(200)
            .end(function(err, res) {
                //console.log(res);
                expect(res.statusCode).to.eq(200);
                expect(res.body.token).not.to.be.undefined;
            });
    });

    it('login with wrong credentials should return error', function () {
        request
            .post('/auth')
            .send({login:'wrong', password:'wrong'})
            .end(function (err, res) {
                expect(res.statusCode).to.eq(404);
                expect(res.body.message).to.eq('Wrong login or password.');
            });
    });
})