Feature: Trello UI Login Page

    Scenario: Login using valid credentials
        Given I access the Trello login portal page
        When I enter a username mymanlextest@gmail.com
        And I click continue
        And I enter a valid password Test123!
        And I click on the login button
        Then I should be logged in as Alex Cheung

    Scenario: Login using invalid credentials
        Given I access the Trello login portal page
        When I enter a username mymanlextest2@gmail.com
        And I click continue
        And I enter a invalid password Test123!
        Then I should see the following error message There isn't an account for this email