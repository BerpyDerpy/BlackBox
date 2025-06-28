# API Endpoint Documentation
## /time
- Method: GET

- Description: Returns a countdown timer in seconds to a fixed future date.

- Success Response (200 OK): A JSON object containing the remaining seconds.
```json
{
  "result": 8155916
}
```

### Behavior Notes: The countdown target is Wednesday, October 1, 2025, at 00:00:00 GMT.

## /fizzbuzz
- Method: POST

- Description: Acts as an "echo service". It validates that the request body is a syntactically correct, two element JSON array and returns it. The name is a red herring.

- Request Body: A two element JSON array.

``[ "any string", 12345 ],[ 1234, 15435 ], etc``


- Success Response (200 OK):
```json
{
  "result": [ "any string", 12345 ]
}
```


## /data
- Method: POST

- Description: Encodes a given input string into Base64 format.

- Request Body:
```json
{
  "input": "any string here"
}
```

- Success Response (200 OK): The Base64 encoded string.
```json
{
  "result": "YW55IHN0cmluZyBoZXJl"
}
```

Error Response (400 Bad Request): "error": "Invalid input"

## /zap
- Method: POST

- Description: Removes all numerical digits (0-9) from an input string.

- Request Body:
```json
{
  "input": "abc123def456"
}
```

- Success Response (200 OK):
```json
{
  "result": "abcdef"
}
```


## /alpha
- Method: POST

- Description: Checks if an input string contains only alphabetic characters (a-z, A-Z).

- Request Body:
```json
{
  "input": "HelloWorld"
}
```

- Success Response (200 OK):
```json
{
  "result": true
}
```

### Behavior Notes: Returns false for strings containing numbers, symbols, or spaces.


## /glitch
- Method: POST

- Description: Manipulates a string based on its length.

Odd Length: Reverses the string.

Even Length: Randomizes the order of characters in the string.

- Request Body:
```json
{
  "input": "abcdef"
}
```

- Success Response (200 OK):

For odd-length "abcde": ```{"result": "edcba"}```

For even-length "abcdef": ```{"result": "dacbfe"}``` (the order will be random)
