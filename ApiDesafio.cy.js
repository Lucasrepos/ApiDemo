// npx install cypress para instalar el proyecto
//








const EndPoint = 'https://reqres.in'
const ListUsers = '/api/users?page=2'
const ListResource = '/api/unknown'
const Create = '/api/users'
var CreateBody = {
    name: "Lucas",
    job: "QA Automation"
}
const Update = '/api/users/2'
var UpdateBody = {
    name: "Damian",
    job: "Developer"
}
const Delete = '/api/users/2'
const Register = '/api/register'
var RegRequest = {
    email: "eve.holt@reqres.in",
    password: "pistol"
}
var RegResponse = {
    id: 4,
    token: "QpwL5tke4Pnpja7X4"
}
var BadRequest = {
    email: "sydney@fife.com"
}
var ErrorMessage = {
    error: "Missing password"
}
const ApiLoguin = '/api/login'
var LoguinBody = {
    email:"eve.holt@reqres.in",
    password: "cityslicka"
}
var BadLoguin = {email:"peter@klaven"}



describe('API Demo', function () {


    it('List Users', () => {

        cy.request('GET', `${EndPoint}${ListUsers}`).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.data[0].first_name).equal('Michael')
            expect(response.body.data[5].first_name).equal('Rachel')
            expect(response.body.data[5].email).equal('rachel.howell@reqres.in')
            expect(response.body.data[5].last_name).equal('Howell')
            expect(response.body.total).equal(12)
        })
    })

    it('List<Resource>', () => {

        cy.request('GET', `${EndPoint}${ListResource}`).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.total).equal(12)
            expect(response.body.data[0].id).equal(1)
            expect(response.body.data[0].name).equal('cerulean')
            expect(response.body.data[0].year).equal(2000)
            expect(response.body.data[0].color).equal('#98B2D1')
            expect(response.body.data[0].pantone_value).equal('15-4020')
        })
    })

    it('Create', () => {

        cy.request('POST', `${EndPoint}${Create}`, CreateBody).then((response) => {
            expect(response.status).equal(201)
            expect(response.body.name).equal(CreateBody.name)
            expect(response.body.job).equal(CreateBody.job)
        })
    })

    it('Update', () => {

        cy.request('PUT', `${EndPoint}${Update}`, UpdateBody).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.name).equal(UpdateBody.name)
            expect(response.body.job).equal(UpdateBody.job)

        })
    })

    it('Update Patch', () => {

        cy.request('PATCH', `${EndPoint}${Update}`, CreateBody).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.name).equal(CreateBody.name)
            expect(response.body.job).equal(CreateBody.job)

        })
    })

    it('Delete', () => {

        cy.request('DELETE', `${EndPoint}${Delete}`).then((response) => {
            expect(response.status).equal(204)
        })
    })

    it('Register Successful', () => {

        cy.request('POST', `${EndPoint}${Register}`, RegRequest).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.id).equal(RegResponse.id)
            expect(response.body.token).equal(RegResponse.token)
        })
    })

    it('Register Unsuccessful', () => {

        cy.request({
            method: 'POST',
            url: `${EndPoint}${Register}`,
            failOnStatusCode: false,
            body: BadRequest

        }).then((response) => {
            expect(response.status).equal(400)
            expect(response.body.error).equal(ErrorMessage.error)
        })
    })

    it('Loguin Successful', () => {

        cy.request('POST', `${EndPoint}${ApiLoguin}`, LoguinBody).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.token).equal(RegResponse.token)
        })
    })
    it('Register Unsuccessful', () => {

        cy.request({
            method: 'POST',
            url: `${EndPoint}${ApiLoguin}`,
            failOnStatusCode: false,
            body: BadLoguin

        }).then((response) => {
            expect(response.status).equal(400)
            expect(response.body.error).equal(ErrorMessage.error)
        })
    })

})






