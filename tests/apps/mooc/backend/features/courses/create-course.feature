Feature: Create a new course
  In order to have courses in the platform
  As a user with admin permissions
  I want to create a new course

  Scenario: A valid non existing course
    Given I send a PUT request to "/courses/674459c5daef348eb593fde8" with body:
      """
      {
        "id": "674459c5daef348eb593fde8",
        "name": "The best course",
        "duration": "5 hours"
      }
      """
    Then the response status code should be 201
    And the response should be empty

  Scenario: An invalid non existing course
    Given I send a PUT request to "/courses/674459c5daef348eb593fde8" with body:
      """
      {
        "id": "674459c5daef348eb593fde8",
        "name": 5,
        "duration": "5 hours"
      }
      """
    Then the response status code should be 422
