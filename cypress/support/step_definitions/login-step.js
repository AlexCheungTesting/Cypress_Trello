import {Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps"

Given('I access the Trello login portal page', () => {
    cy.visit("https://trello.com/");
    cy.get('.Buttonsstyles__ButtonGroup-sc-1jwidxo-3 > [href="/login"]').click()
})

When("I enter a username {word}", (userName) => {
    cy.get('#user').type(userName);
})

And("I click continue", () => {
    cy.get('#login').click()
})

And("I enter a valid password Test123!", () => {
    cy.origin('https://id.atlassian.com/', () => {
        cy.get('#password').type("Test123!");
    })
})

And("I enter a invalid password {word}", (password) => {
        cy.get('#password').type(password);
        cy.get('#login').click()
})

And("I click on the login button", () => {
    cy.origin('https://id.atlassian.com/', () => {
            cy.get('#login-submit').click()
        })
})

Then("I should be logged in as {word} {word}", (message, message2) => {
    cy.get('.DweEFaF5owOe02').click()
    cy.get('.tS3UagTaVXEivA').should('have.text', message + " " + message2)
})

Then("I should see the following error message There isn't an account for this email", () => {
    cy.get('#error > .error-message').should('have.text', "Er is geen account voor dit e-mailadres" )
})