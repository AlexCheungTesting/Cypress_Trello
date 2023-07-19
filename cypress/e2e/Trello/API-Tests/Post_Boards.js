/// <reference types="cypress" />
let authKey = "cb2730b521f0d954c7c89de64ce57f20"
let authToken = "ATTA28b16d3d0df95e7256601b9f3da8bd7e92174fc2ff5cba9b8bfac6957490477402555BCF"
let baseURL = "https://api.trello.com"
let getPath = "/1/members/me/boards"
let postBoardPath = "/1/boards/"
let randomNumber = Math.floor(Math.random()*100)+1;
let boardId = []
describe('Create new Trello board', () => {
    it('Create a new board', () => {
        cy.request({
            method: "Post",
            url:
            baseURL + postBoardPath,
            qs:{
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
});


