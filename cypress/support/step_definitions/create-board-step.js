import {Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps"

let authKey = "cb2730b521f0d954c7c89de64ce57f20"
let authToken = "ATTA28b16d3d0df95e7256601b9f3da8bd7e92174fc2ff5cba9b8bfac6957490477402555BCF"
let randomNumber = Math.floor(Math.random()*100)+1;
let postBoardurl = "https://api.trello.com/1/boards/"
let baseURL = "https://api.trello.com"
let postBoardPath = "/1/boards/"
let boardId= []
let respStatus= []

Given('I logged in to Trello with {word}', (userName) => {
    cy.visit("https://trello.com/");
    cy.get('.Buttonsstyles__ButtonGroup-sc-1jwidxo-3 > [href="/login"]').click()
    cy.get('#user').type(userName)
    cy.get('#login').click()
    cy.origin('https://id.atlassian.com/', () => {
        cy.get('#password').type("Test123!");
    })
    cy.origin('https://id.atlassian.com/', () => {
            cy.get('#login-submit').click()
        })
})

When('I click Create new board', () => {
    cy.get('[data-testid="create-board-tile"] > .board-tile').click()
    })

And('I name the board {word}', (boardName) => {
    cy.get('[data-testid="create-board-title-input"]').type(boardName)
})

And('I click create', () => {
    cy.get('[data-testid="create-board-submit-button"]').click()
})

Then('A new board should be created named {word}', (boardName) =>{
    cy.get('[data-testid="board-name-display"]').should('have.text', boardName)
})

Given('I set the API endpoint to {word}', () => {
    postBoardurl = postBoardurl
})

When('I send a Post request to the endpoint to create a new board named {word} and defaultlist {word}', (boardName, toggle) => {
    cy.request({
        method: "Post",
        url:
        baseURL + postBoardPath,
        qs:{
            key: authKey,
            token: authToken,
            name: boardName + randomNumber,
            defaultLists: toggle
        },
        failOnStatusCode: false,
    }).then((resp) => {

        //Variabelen uit respons exporteren
        const value = resp.status
        respStatus.push(value)
        }); 
})

Then('Response status should be {int}', (statuscode) =>{
    expect(respStatus).to.contain(statuscode)
 //respStatus =[]
})

