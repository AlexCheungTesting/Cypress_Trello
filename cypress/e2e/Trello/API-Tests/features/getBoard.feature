Feature: Trello API create Board

    # Scenario: Use API to create new board on trello
    #     Given I set the API endpoint to https://api.trello.com/1/boards/
    #     When I send a Post request to the endpoint to create a new board named BoardNr.
    #     Then Response status should be 200

    Scenario Outline: Use API to create new board on trello
        Given I set the API endpoint to https://api.trello.com/1/members/me/boards
        When I send a Get request to the endpoint to retrieve all boards
        Then Responsestatus should be <statuscode>
        And the responsebody should contain a board with the boardname <boardname> and boardId <boardId>
        And the responsebody should contain a board with a boardname and boardId
        And the closeddate should be a string if present
        Examples:
            | boardname | boardId                  | statuscode |
            | MyNr5     | 6464bc6c83c4cc64b601f6e6 | 200        |