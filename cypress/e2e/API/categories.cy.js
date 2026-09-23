describe('Platzi Fake Store API - Categories', () => {

    const baseUrl = 'https://api.escuelajs.co/api/v1/categories'

    it('API-001 - GET all categories', () => {
        cy.request('GET', baseUrl).then((response) => {

            expect(response.status).to.eq(200)

            expect(response.body).to.be.an('array')
            expect(response.body.length).to.be.greaterThan(0)

            expect(response.body[0]).to.have.property('id')
            expect(response.body[0]).to.have.property('name')
            expect(response.body[0]).to.have.property('slug')
            expect(response.body[0]).to.have.property('image')
        })
    })

    it('API-002 - GET category ID 1', () => {
        cy.request('GET', `${baseUrl}/1`).then((response) => {

            expect(response.status).to.eq(200)

            expect(response.body).to.have.property('id', 1)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('slug')
            expect(response.body).to.have.property('image')
        })
    })

    it('API-003 - GET category ID 2', () => {
        cy.request('GET', `${baseUrl}/2`).then((response) => {

            expect(response.status).to.eq(200)

            expect(response.body).to.have.property('id', 2)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('slug')
            expect(response.body).to.have.property('image')
        })
    })

    it('API-004 - GET category ID 3', () => {
        cy.request('GET', `${baseUrl}/3`).then((response) => {

            expect(response.status).to.eq(200)

            expect(response.body).to.have.property('id', 3)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('slug')
            expect(response.body).to.have.property('image')
        })
    })


    it('API-005 - GET products by category ID 1', () => {
        cy.request('GET', `${baseUrl}/1/products`).then((response) => {

            expect(response.status).to.eq(200)

            expect(response.body).to.be.an('array')

            if (response.body.length > 0) {
                expect(response.body[0]).to.have.property('id')
                expect(response.body[0]).to.have.property('title')
                expect(response.body[0]).to.have.property('price')
            }
        })
    })

    it('API-006 - GET products by category ID 2', () => {
        cy.request('GET', `${baseUrl}/2/products`).then((response) => {

            expect(response.status).to.eq(200)

            expect(response.body).to.be.an('array')

            if (response.body.length > 0) {
                expect(response.body[0]).to.have.property('id')
                expect(response.body[0]).to.have.property('title')
                expect(response.body[0]).to.have.property('price')
            }
        })
    })

    // create unique category
    it('API-007 - POST create category', () => {

        const uniqueName = `Cypress Category ${Date.now()}`

        cy.request({
            method: 'POST',
            url: baseUrl,
            body: {
                name: uniqueName,
                image: 'https://i.imgur.com/8wP9ZQj.jpeg'
            }
        }).then((response) => {

            expect(response.status).to.eq(201)

            expect(response.body).to.have.property('id')

            expect(response.body).to.have.property(
                'name',
                uniqueName
            )

            expect(response.body).to.have.property('slug')

            expect(response.body).to.have.property('image')
        })
    })


    // create unique category
    it('API-008 - POST create second category', () => {

        const uniqueName = `Automation Category ${Date.now()}`

        cy.request({
            method: 'POST',
            url: baseUrl,
            body: {
                name: uniqueName,
                image: 'https://i.imgur.com/8wP9ZQj.jpeg'
            }
        }).then((response) => {

            expect(response.status).to.eq(201)

            expect(response.body).to.have.property('id')

            expect(response.body).to.have.property(
                'name',
                uniqueName
            )

            expect(response.body).to.have.property('slug')

            expect(response.body).to.have.property('image')
        })
    })

    // create unique category
    it('API-009 - POST create third category', () => {

        const uniqueName = `Sanber Code Category ${Date.now()}`

        cy.request({
            method: 'POST',
            url: baseUrl,
            body: {
                name: uniqueName,
                image: 'https://i.imgur.com/8wP9ZQj.jpeg'
            }
        }).then((response) => {

            expect(response.status).to.eq(201)

            expect(response.body).to.have.property('id')

            expect(response.body).to.have.property(
                'name',
                uniqueName
            )

            expect(response.body).to.have.property('slug')

            expect(response.body).to.have.property('image')
        })
    })

    it('API-010 - PUT update category ID 1', () => {

        cy.request({
            method: 'PUT',
            url: `${baseUrl}/1`,
            body: {
                name: 'Updated Clothes',
                image: 'https://placehold.co/600x400'
            }
        }).then((response) => {

            expect(response.status).to.eq(200)

            expect(response.body).to.have.property('id', 1)

            expect(response.body).to.have.property(
                'name',
                'Updated Clothes'
            )

            expect(response.body).to.have.property('image')
        })
    })

    it('API-011 - GET category ID 4', () => {

        cy.request('GET', `${baseUrl}/4`).then((response) => {

            expect(response.status).to.eq(200)

            expect(response.body).to.have.property('id', 4)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('slug')
            expect(response.body).to.have.property('image')
        })
    })

    it('API-012 - GET category ID 5', () => {

        cy.request('GET', `${baseUrl}/5`).then((response) => {

            expect(response.status).to.eq(200)

            expect(response.body).to.have.property('id', 5)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('slug')
            expect(response.body).to.have.property('image')
        })
    })

})