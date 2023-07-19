Feature: Trello API create Board

    # Scenario: Use API to create new board on trello
    #     Given I set the API endpoint to https://api.trello.com/1/boards/
    #     When I send a Post request to the endpoint to create a new board named BoardNr.
    #     Then Response status should be 200

    Scenario Outline: Use API to create new board on trello
        Given I set the API endpoint to https://api.trello.com/1/boards/
        When I send a Post request to the endpoint to create a new board named <boardname> and defaultlist <toggle>
        Then Response status should be <statuscode>

        Examples:
            | boardname | toggle | statuscode |
            | BoardNr   | false  | 200        |
            | MyNr      | true   | 200        |
            | board#    | 2      | 400        |