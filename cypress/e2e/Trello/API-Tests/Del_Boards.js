/// <reference types="cypress" />
let authKey = "cb2730b521f0d954c7c89de64ce57f20"
let authToken = "ATTA28b16d3d0df95e7256601b9f3da8bd7e92174fc2ff5cba9b8bfac6957490477402555BCF"
let baseURL = "https://api.trello.com"
let getPath = "/1/members/me/boards"
let delPath = "/1/boards/"
let boardId = [];

describe('Get Trello boards', () => {
    it('Get boards', () => {
        cy.request({
            method: "GET",
            url:
            baseURL + getPath,
            qs:{
                key: authKey,
                token: authToken
            } 
          }).then((resp) => {
            //Variabelen uit respons exporteren
            const value = resp.body[0].id    
            boardId.push(value)
            //Assertions
            expect(resp.status).to.eq(200)

                      
            return value
          });
          cy.log(boardId)
    });

    it("Delete boards from get request", () =>{
        cy.request({
            method: "Delete",
            url:
            baseURL + delPath + boardId,
            qs:{
                key: authKey,
                token: authToken
            }
        })
    })
});
