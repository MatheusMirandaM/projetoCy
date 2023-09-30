describe('API - Profile', () => {

    let urlPerfis = '/api/profile'
    
    // DRY - Don't Repeat Yourself
    context('todos os perfis', () => {
        
        it('valida a API de perfis', () => {
            
            cy.log('Teste de texto')
            cy.request({

                method: 'GET',
                url: urlPerfis

            // Resposta da api
            }).then(({ status, duration, body, headers }) => {
                // Verificar o retorno da API
                expect(status).to.eq(200)

                // Verificar o tempo de carregamento da pagina
                expect(duration).to.be.lessThan(10000)

                // Pegando elementos da pagina
                expect(body[0].status).to.eq('Gerente de Testes')

                expect(body[0].user.name).to.eq('Pedro Guerra')
                
                // Pegar elementos dentro de um array
                expect(body[0].skills[0]).to.eq('Cypress')

                // Verificar tamanho de um array
                expect(body[0].skills).to.have.lengthOf(1)

                // Validar not null
                expect(body[0].date).to.not.be.null

                // Validar not null
                // expect(body[0].date).to.be.null

                // Pegar onjeto com ifen ou espaçoes em seu nome
                expect(headers['x-powered-by']).to.eq('Express')

            })
        })
    })

    context('perfil expecífico', () => {

        let urlPerfil = '/api/profile/user'

        
        it('seleciona um usuário inválido', () => {
            
            cy.request({

                method: 'GET',
                url: `${urlPerfil}/1`,

                // Informar para não exibir falhas nos retornos de API diferente de 200 e 300
                failOnStatusCode: false

            }).then(({ status }) => {

                expect(status).to.eq(404)

            })
        })

        // Declarando um usuario em variável
        it('valida um usuário válido', () => {

            let usuarioId = '637d72b11fb5cb0015a02258'

            cy.request({

                method: 'GET',
                url: `${urlPerfil}/${usuarioId}`

            }).then(({ status, body }) => {

                expect(status).to.eq(200)
                expect(body.user.name).to.eq('Pedro Guerra')

            })
        })

        // Não declarando um usuario em variável
        it('valida um usário válido buscando na base', () => {

            cy.request({

                method: 'GET',
                url: urlPerfis

            }).then(({ body }) => {

                cy.request({

                    method: 'GET',
                    url: `${urlPerfil}/${body[1].user._id}`

                }).then(({ status, body }) => {

                    expect(status).to.eq(200)
                    expect(body.status).to.eq('Outro')
                })
            })
        })
    })
})