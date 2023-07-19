Feature: Trello UI create Board

    Scenario: Create board on trello
        Given I logged in to Trello with mymanlextest@gmail.com
        When I click Create new board
        And I name the board MyBoard
        And I click create
        Then A new board should be created named MyBoard