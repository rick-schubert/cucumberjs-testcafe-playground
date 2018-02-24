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
# And I enter my "US" delivery address using the "manual entry" functionality
# And I choose my billing address to match my delivery address
# And I enter my "amex" payment details
# And I place the order as a "new" user
# Then I see the confirmation for my order
