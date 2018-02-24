Feature: Checkout Smoke Tests - New User Purchase Journeys

    Scenario: User registers and makes a purchase
        Given I am on a page
            | Brand   | Country | Page |
            | Topshop | US      | Home |
        When I search for a product code
        And I add the product to the bag
        And I dismiss the add to bag confirmation modal
        And I view the bag
        And I proceed to checkout from the "minibag"
        And I register "during checkout"
        And I choose "Home Express" as the delivery option
        And I enter my delivery address
            | Country        | Entry Method |
            | United States  | manual       |
        And I proceed to payment
        And I enter my credit card details
            | Card Number     | CVV  | Expiry Month | Expiry Year |
            | 378282246310005 | 1234 | 12           | 2021        |
        And I accept the terms and conditions
        And I place the order
        Then I see the confirmation for my order
