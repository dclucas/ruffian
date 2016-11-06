Feature: cli
    As a developer
    I want ruffian to allow me the creation of fake endpoints through the command-line interface
    So that I can stub my external dependencies

Scenario: ruffian startup
    Given a set of fakes
    When I start the CLI and pass it as an argument
    Then ruffian starts up successfully
    And it returns the expected response for each fake