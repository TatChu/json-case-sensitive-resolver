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

let jsonString = '{"camelCaseObject": "thanks for reading me"}';
const parsedPascalCaseObj = JsonHelper.parseToPascalCase(jsonString); // { camelCaseObject: "thanks for reading me" }
```

- Parse a PascalCase JSON to camelCase object

```ts
import JsonHelper from 'json-helper'

let jsonString = '{"PascalCaseObject": "thanks for reading me"}';
const parsedPascalCaseObj = JsonHelper.parseToPascalCase(jsonString); // { pascalCaseObject: "thanks for reading me" }
```

## Advanced options

- parseFromSnakeCase: parse snake_case to PascalCase|camelCase
- parseFromKebapCase: parse kebap-case to PascalCase|camelCase

Example:

```ts
import JsonHelper from 'json-helper'

let jsonString = '{"this-is-kebap-case": "thanks for reading me"}';
const parsedPascalCaseObj = JsonHelper.parseToPascalCase(jsonString, {parseFromKebapCase: true}); // { ThisIsKebapCase: "thanks for reading me" }
```
