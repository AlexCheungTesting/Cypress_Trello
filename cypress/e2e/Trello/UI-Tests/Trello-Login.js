/// <reference types="cypress" />

describe('Test login page via Trello', () => {
    it('Should be able to login successfully via login page', () => {
        cy.visit('https://trello.com/')
        cy.get('.Buttonsstyles__ButtonGroup-sc-1jwidxo-3 > [href="/login"]').click()
        cy.get('#user').type('mymanlextest@gmail.com')
        cy.get('#login').click()
        cy.origin('https://id.atlassian.com/', () => {
            cy.get('#password').type('Test123!')
        })
        cy.origin('https://id.atlassian.com/', () => {
            cy.get('#login-submit').click()
        })
        cy.get('.DweEFaF5owOe02').click()
        cy.get('.tS3UagTaVXEivA').should('have.text', 'Alex Cheung')
        

        //cy.origin('https://id.atlassian.com/login'), () =>{
            //cy.get('#login').click()
            //cy.get('#password').type('Test123!')
            //cy.get('#login-submit').click()
        })
    //});
});
