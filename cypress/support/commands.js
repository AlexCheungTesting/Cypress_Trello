// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
Cypress.Commands.add("createBoard",
    (urlHost, boardPath, authKey, authToken, randomNumber) => {
        cy.request({
            method: "Post",
            url:
                urlHost + boardPath,
            qs: {
                key: authKey,
                token: authToken,
                name: "My board name " + randomNumber,
                defaultLists: "false"
            }
        })
    })

Cypress.Commands.add("createDoneList",
    (urlHost, boardPath, authKey, authToken, boardId, listPath) => {
        cy.request({
            method: "Post",
            url:
                urlHost + boardPath + boardId + listPath,
            qs: {
                key: authKey,
                token: authToken,
                name: "Done"
            }
        })
    })

Cypress.Commands.add("createToDoList",
    (urlHost, boardPath, authKey, authToken, boardId, listPath) => {
        cy.request({
            method: "Post",
            url:
                urlHost + boardPath + boardId + listPath,
            qs: {
                key: authKey,
                token: authToken,
                name: "To Do"
            }
        })
    })
Cypress.Commands.add("createCardOnToDoList",
    (urlHost, cardPath, authKey, authToken, randomNumber, toDoListId) => {
        cy.request({
            method: "Post",
            url:
                urlHost + cardPath,
            qs: {
                key: authKey,
                token: authToken,
                name: "My card Nr " + randomNumber,
                idList: toDoListId
            }
        })
    })

Cypress.Commands.add("deleteBoard",
    (urlHost, boardPath, boardId, authKey, authToken) => {
        cy.request({
            method: "Delete",
            url:
                urlHost + boardPath + boardId,
            qs: {
                key: authKey,
                token: authToken
            }
        })
    })


//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
})
require('@cypress/skip-test/support')