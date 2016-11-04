Feature: fake setup
    As a developer
    I want ruffian to allow me the creation of fake endpoints on the fly
    So that I can stub my external dependencies

Scenario Outline: Creating fakes
Given a running ruffian server
When I send it a payload for a fake <endpoint> endpoint
Then it accepts my fake
And it returns the expected response upon fake execution
Examples:
| endpoint                      |
| /hello                        |
| /hello/1                      |
| /world/                       |
| /hello/world/                 |
| /hello/world/1                |
| /hello/world/{id}             |

Scenario: Loading fakes on startup
Given a set of fakes
When I start a server and pass them as an argument
Then the server configures all endpoints
And it returns the expected response for each fake