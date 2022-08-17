# JsonHelper

Easy to convert JSON string to object with various case-sensitive resolver

## Usage

Prerequisite

```cmd
 npm i --save json-case-sensitive-resolver
```

- Parse a camelCase JSON to PascalCase object

```ts
import JsonHelper from 'json-case-sensitive-resolver'

let jsonString = '{"camelCaseToPascalCase": "thanks for reading me"}';
const parsedPascalCaseObj = JsonHelper.parseToPascalCase(jsonString); 
//>>> { CamelCaseToPascalCase: "thanks for reading me" }
```

- Parse a PascalCase JSON to camelCase object

```ts
import JsonHelper from 'json-case-sensitive-resolver'

let jsonString = '{"PascalCaseToCamelCase": "thanks for reading me"}';
const parsedCamelCaseObj = JsonHelper.parseToCamelCase(jsonString); 
//>>> { pascalCaseToCamelCase: "thanks for reading me" }
```

## Advanced options

- `parseFromKebapCase`: parse snake_case to PascalCase|camelCase
Example:

    ```ts
    import JsonHelper from 'json-case-sensitive-resolver'

    let jsonString = '{"this-is-kebap-case": "thanks for reading me"}';
    const parsedPascalCaseObj = JsonHelper.parseToPascalCase(jsonString, { parseFromKebapCase: true }); 
    //>>> { ThisIsKebapCase: "thanks for reading me" }
    ```

- `parseFromSnakeCase`: parse kebap-case to PascalCase|camelCase
Example:

    ```ts
    import JsonHelper from 'json-case-sensitive-resolver'

    let jsonString = '{"this_is_snake_case": "thanks for reading me"}';
    const parsedPascalCaseObj = JsonHelper.parseToCamelCase(jsonString, { parseFromSnakeCase: true }); 
    //>>> { thisIsSnakeCase: "thanks for reading me" }
    ```

And yes, you can completely combine two option together

```ts
import JsonHelper from 'json-case-sensitive-resolver'

let jsonString = '{"this_is_snake_case": "snake", "this-is-kebap-case": "kebap"}';
const obj = JsonHelper.parseToCamelCase(jsonString, { parseFromSnakeCase: true, parseFromKebapCase: true }); 
//>>> { thisIsSnakeCase: "snake", thisIsKebapCase: "kebap" }
```
