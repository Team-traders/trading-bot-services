Feature: Get courses
  As a user with permissions
  I want to get courses

  Scenario: All existing courses
    Given the following event is received:
      """
      {
        "data": {
          "id": "674459c5daef348eb593fde1",
          "type": "course.created",
          "occurred_on": "2019-08-08T08:37:32+00:00",
          "aggregateId": "674459c5daef348eb593fde1",
          "attributes": {
            "name": "DDD en PHP!",
            "duration": "25 hours"
          },
          "meta" : {
            "host": "111.26.06.93"
          }
        }
      }
      """
    And the following event is received:
      """
          {
        "data": {
          "id": "674459c5daef348eb593fde2",
          "type": "course.created",
          "occurred_on": "2019-08-08T08:37:32+00:00",
          "aggregateId": "674459c5daef348eb593fde2",
          "attributes": {
              "name": "DDD en Java!",
              "duration": "24 hours"
          },
          "meta" : {
            "host": "111.26.06.93"
          }
        }
      }
      """
    And I send a GET request to "/courses"
    Then the response status code should be 200
    And the response should be:
      """
      [
        {
            "id": "674459c5daef348eb593fde1",
            "name": "DDD en PHP!",
            "duration": "25 hours"
        },
        {
            "id": "674459c5daef348eb593fde2",
            "name": "DDD en Java!",
            "duration": "24 hours"
        }
      ]
      """
