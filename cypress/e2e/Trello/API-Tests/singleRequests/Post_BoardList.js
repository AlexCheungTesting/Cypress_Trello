/// <reference types="cypress" />
let authKey = Cypress.env("authKey")
let authToken = Cypress.env("authToken")
let urlHost = Cypress.env("urlHost")
let boardPath = Cypress.env("boardPath")
let listPath = Cypress.env("listPath")
let randomNumber = Math.floor(Math.random()*100)+1;
let boardId = []
let doneListId= []
describe('Create new Trello board', () => {
    it('Create a new board', () => {
      cy.createBoard(urlHost, boardPath, authKey, authToken, randomNumber)
      .then((resp) => {

            //Variabelen uit respons exporteren
            const value = resp.body.id
            boardId.push(value)
            //Assertions
            expect(resp.status).to.eq(200)
          console.log(randomNumber)
          return value
        });
        cy.log(boardId)

    });
});

describe('create list on board', () => {
  it('create doneList on previous board', () => {
    cy.createDoneList(urlHost, boardPath, authKey, authToken, boardId, listPath)
    .then((resp) => {
      //Variabelen uit response exporteren
      const value = resp.body.id
      doneListId.push(value)
      //Assertions
      expect(resp.status).to.eq(200)
      return value
    });
    cy.log(doneListId)
  });
});


