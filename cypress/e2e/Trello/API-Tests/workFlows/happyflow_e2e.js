/// <reference types="cypress" />
import { onlyOn, skipOn } from '@cypress/skip-test'
let authKey = Cypress.env("authKey")
let authToken = Cypress.env("authToken")
let urlHost = Cypress.env("urlHost")
let boardPath = Cypress.env("boardPath")
let listPath = Cypress.env("listPath")
let cardPath = "/1/cards"

let randomNumber = Math.floor(Math.random() * 100) + 1;
let boardId = []
let doneListId = []
let toDoListId = []
let cardId = []


describe('Create new board, toDoList, doneList,card on toDoList, upload file to card & move card to doneList & delete card & board', () => {
    it('Create a new board', () => {
        cy.createBoard(urlHost, boardPath, authKey, authToken, randomNumber)
        .then((resp) => {
            //Variabelen uit respons exporteren
            const value = resp.body.id
            boardId.push(value)
            //Assertions
            expect(resp.status).to.eq(200)
            return value
        });
    });

    it('create doneList on new board', () => {
        cy.createDoneList(urlHost, boardPath, authKey, authToken, boardId, listPath)
        .then((resp) => {
            //Variabelen uit response exporteren
            const value = resp.body.id
            doneListId.push(value)
            //Assertions
            expect(resp.status).to.eq(200)
            return value
        });
    });

    it('create toDoList on new board', () => {
        cy.createToDoList(urlHost, boardPath, authKey, authToken, boardId, listPath)
        .then((resp) => {
            //Variabelen uit response exporteren
            const value = resp.body.id
            toDoListId.push(value)
            //Assertions
            expect(resp.status).to.eq(200)
            return value
        });
    });


    it('create card on toDoList ', () => {
        onlyOn('local', () => {
            cy.createCardOnToDoList(urlHost, cardPath, authKey, authToken, randomNumber, toDoListId)
                .then((resp) => {
                    //Variabelen uit response exporteren
                    const value = resp.body.id
                    cardId.push(value)
                    //Assertions
                    expect(resp.status).to.eq(200)
                    return value
                });
            cy.log(cardId)
        });
    })
    it.skip('upload attachment to card', () => {
        //file location
        const filePath = "documents/note.xml"
        //set file as binary
        cy.fixture(filePath, "binary")
            .then((fileBin) =>
                Cypress.Blob.binaryStringToBlob(fileBin, "application/xml")
            )
            .then((blob) => {

                cy.request({
                    method: "Post",
                    url:
                        urlHost + cardPath,
                    qs: {
                        key: authKey,
                        token: authToken,
                        setCover: true,
                        mimeType: "application/xml",
                        id: cardId
                    },
                    body: blob,
                    failOnStatusCode: false,
                }).then((resp) => {
                    //Assertions
                    expect(resp.status).to.eq(200)
                    return value
                });
            })
    });


    it("Delete board ", () => {
        cy.deleteBoard(urlHost, boardPath, boardId, authKey, authToken)
    })
});


