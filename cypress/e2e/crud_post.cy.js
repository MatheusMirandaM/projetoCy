describe('CUD - Posts', () => {

    before(() => {
        
        cy.request({

            method: 'POST',
            url: '/api/auth',
            body: {
                email: 'testeIterasys@iterasys.com',
                password: '123456'
            }
        })
    })

    it('teste', () => {

        cy.request('teste')
        
    })
    
})