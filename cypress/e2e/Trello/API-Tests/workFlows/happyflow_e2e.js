/// <reference types="cypress" />
let authKey = "cb2730b521f0d954c7c89de64ce57f20"
let authToken = "ATTA28b16d3d0df95e7256601b9f3da8bd7e92174fc2ff5cba9b8bfac6957490477402555BCF"
let baseURL = "https://api.trello.com"
let getPath = "/1/members/me/boards"
let boardPath = "/1/boards/"
let cardPath = "/1/cards"
let randomNumber = Math.floor(Math.random() * 100) + 1;
let boardId = []
let doneListId = []
let toDoListId = []
let cardId = []

describe('Create new board, toDoList, doneList,card on toDoList, upload file to card & move card to doneList & delete card & board', () => {
    it('Create a new board', () => {
        cy.request({
            method: "Post",
            url:
                baseURL + boardPath,
            qs: {
                key: authKey,
                token: authToken,
                name: "My board name " + randomNumber,
                defaultLists: "false"
            }
        }).then((resp) => {

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

    it('create doneList on new board', () => {
        cy.request({
            method: "Post",
            url:
                baseURL + boardPath + boardId + "/lists",
            qs: {
                key: authKey,
                token: authToken,
                name: "Done"
            }
        }).then((resp) => {
            //Variabelen uit response exporteren
            const value = resp.body.id
            doneListId.push(value)
            //Assertions
            expect(resp.status).to.eq(200)
            return value
        });
        cy.log(doneListId)
    });

    it('create toDoList on new board', () => {
        cy.request({
            method: "Post",
            url:
                baseURL + boardPath + boardId + "/lists",
            qs: {
                key: authKey,
                token: authToken,
                name: "To Do"
            }
        }).then((resp) => {
            //Variabelen uit response exporteren
            const value = resp.body.id
            toDoListId.push(value)
            //Assertions
            expect(resp.status).to.eq(200)
            return value
        });
        cy.log(toDoListId)
    });

    it('create card on toDoList ', () => {
        cy.request({
            method: "Post",
            url:
                baseURL + cardPath,
            qs: {
                key: authKey,
                token: authToken,
                name: "My card Nr " + randomNumber,
                idList: toDoListId
            }
        }).then((resp) => {
            //Variabelen uit response exporteren
            const value = resp.body.id
            cardId.push(value)
            //Assertions
            expect(resp.status).to.eq(200)
            return value
        });
        cy.log(cardId)
    });

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
                        baseURL + cardPath,
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
        cy.request({
            method: "Delete",
            url:
                baseURL + boardPath + boardId,
            qs: {
                key: authKey,
                token: authToken
            }
        })
    })
});


