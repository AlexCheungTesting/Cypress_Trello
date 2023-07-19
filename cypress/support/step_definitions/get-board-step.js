import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps"

let authKey = "cb2730b521f0d954c7c89de64ce57f20"
let authToken = "ATTA28b16d3d0df95e7256601b9f3da8bd7e92174fc2ff5cba9b8bfac6957490477402555BCF"
let randomNumber = Math.floor(Math.random() * 100) + 1;
let postBoardurl = "https://api.trello.com/1/boards/"
let getBoardurl = "https://api.trello.com/1/members/me/boards"
let baseURL = "https://api.trello.com"
let postBoardPath = "/1/boards/"
let boardId = []
let statusCode = []
let respbody = []
let boardnamesave = []
let boardIdSave = []
let respBodySave = []

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

Then('A new board should be created named {word}', (boardName) => {
    cy.get('[data-testid="board-name-display"]').should('have.text', boardName)
})

Given('I set the API endpoint to https://api.trello.com/1/members/me/boards', () => {
    getBoardurl = getBoardurl
})

When('I send a Get request to the endpoint to retrieve all boards', () => {
    cy.request({
        method: "Get",
        url:
            getBoardurl,
        qs: {
            key: authKey,
            token: authToken
        },
        failOnStatusCode: false,
    }).then((resp) => {

        //Variabelen uit respons exporteren
        const value = resp.status
        statusCode.push(value)
        const value2 = resp.body[6].name
        boardnamesave.push(value2)
        const value3 = resp.body[6].id
        boardIdSave.push(value3)
        const value4 = resp.body
        respBodySave.push(value4)
        cy.log(boardnamesave)
        cy.log(boardIdSave)
        cy.log(respBodySave[0])
    });
})

Then('Responsestatus should be {int}', (statuscode) => {
    expect(statusCode).to.contain(statuscode)
    //respStatus =[]
})

And('the responsebody should contain a board with the boardname {word} and boardId {word}', (boardName, boardId) => {
    expect(boardnamesave[0]).to.eq(boardName)
    expect(boardIdSave[0]).to.eq(boardId)
    boardnamesave = []
    boardIdSave = []
})

//And the responsebody should contain a board with the boardname <boardname> and boardId <boardId>
And('the responsebody should contain a board with the boardname {word} and boardId {int}', (boardname, boardId) => {
    expect(resp.body.name).to.eq(boardname)
    expect(resp.body.id).to.eq(boardId)
    respbody = []
})

And('the responsebody should contain a board with a boardname and boardId', () => {
    // expect(respBodySave[0]).to.contain(name)
    //const name = {name};
    respBodySave[0].forEach((object) => {
        expect(object).to.have.property('name')
        expect(object).to.have.property('id')
        expect(object.limits).to.have.property('cards')
    })
})

And('the closeddate should be a string if present', () => {
    // expect(respBodySave[0]).to.contain(name)
    //const name = {name};
    respBodySave[0].forEach((object) => {
        if (object.dateClosed) {
            expect(object.dateClosed).to.be.a('string')
        }
        if (object.descData) {
            expect(object.descData).to.be.a('object')
        }
    })
    respBodySave = []
})