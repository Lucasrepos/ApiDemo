// npx install cypress / npx cypress open
// Demo de Automatizacion de API


describe('API Demo', function () {


    it('List Users', () => {

        cy.request('GET', `${EndPoint}${ListUsers}`).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.data[5].first_name).equal(UserList.first_name)
            expect(response.body.data[5].email).equal(UserList.email)
            expect(response.body.data[5].last_name).equal(UserList.last_name)
            expect(response.body.total).equal(UserList.id)
        })
    })

    it('List<Resource>', () => {

        cy.request('GET', `${EndPoint}${ListResource}`).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.total).equal(Resources.total)
            expect(response.body.data[0].id).equal(Resources.id)
            expect(response.body.data[0].name).equal(Resources.name)
            expect(response.body.data[0].year).equal(Resources.year)
            expect(response.body.data[0].color).equal(Resources.color)
            expect(response.body.data[0].pantone_value).equal(Resources.pantone_value)
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

const EndPoint = 'https://reqres.in'
    const ListUsers = '/api/users?page=2'
    const ListResource = '/api/unknown'
    const Create = '/api/users'
    const Update = '/api/users/2'
    const Delete = '/api/users/2'
    const Register = '/api/register'
    const ApiLoguin = '/api/login'


    var CreateBody = {
        name: "Lucas",
        job: "QA Automation"
    }
    var UpdateBody = {
        name: "Damian",
        job: "Developer"
    }

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
    var LoguinBody = {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
    }
    var BadLoguin = { email: "peter@klaven" }

    var UserList = {
        id: 12,
        email: "rachel.howell@reqres.in",
        first_name: "Rachel",
        last_name: "Howell",
    }

    var Resources = {
        total:12,
        id:1,
        name:'cerulean',
        year:2000,
        pantone_value:'15-4020',
        color: '#98B2D1'
    }

})
