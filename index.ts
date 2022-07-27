export const parseToPascalCase = function (
  jsonString: string,
  parseOptions: Partial<ParseOptions> = {}
): any {
  function pascalCaseReviver(_key: string, value: any) {
    if (value && typeof value === "object") {
      for (var k in value) {

        if (Object.hasOwnProperty.call(value, k)){
          let newKey = k;
          let hasChange = false;
          
          if (/^[a-z]/.test(k)) {
            newKey = k.charAt(0).toUpperCase() + k.substring(1);
            hasChange = true;
          }

          if (parseOptions?.parseFromSnakeCase && /[_]/.test(newKey)) {
            newKey = snakeToPascal(newKey);
            hasChange = true;
          }

          if (parseOptions?.parseFromKebapCase && /[-]/.test(newKey)) {
            newKey = kebapToPascal(newKey);
            hasChange = true;
          }

          if (hasChange){
            value[newKey] = value[k];
            delete value[k];
          }
        }
      }
    }
    return value;
  }

  return JSON.parse(jsonString, pascalCaseReviver);
};

export const parseToCamelCase = function (
  jsonString: string,
  parseOptions: Partial<ParseOptions> = {}
): any {
  function toCamelCaseReviver(_key: string, value: any) {
    if (value && typeof value === "object") {
      for (var k in value) {
        if (Object.hasOwnProperty.call(value, k)){
          let newKey = k;
          let hasChange = false;
          
          if (/^[A-Z]/.test(k)) {
            newKey = k.charAt(0).toLowerCase() + k.substring(1);
            hasChange = true;
          }

          if (parseOptions?.parseFromSnakeCase && /[_]/.test(newKey)) {
            newKey = snakeToCamel(newKey);
            hasChange = true;
          }

          if (parseOptions?.parseFromKebapCase && /[-]/.test(newKey)) {
            newKey = kebapToCamel(newKey);
            hasChange = true;
          }

          if (hasChange){
            value[newKey] = value[k];
            delete value[k];
          }
        }
      }
    }
    return value;
  }

  return JSON.parse(jsonString, toCamelCaseReviver);
};

export const snakeToCamel = (str: string) =>
  str.replace(/([_]\w)/g, (g) => g[1].toUpperCase());
export const kebapToCamel = (str: string) =>
  str.replace(/([-]\w)/g, (g) => g[1].toUpperCase());
export const snakeToPascal = (str: string) => {
  let camelCase = snakeToCamel(str);
  let pascalCase = camelCase[0].toUpperCase() + camelCase.substr(1);
  return pascalCase;
};

export const kebapToPascal = (str: string) => {
  let camelCase = kebapToCamel(str);
  let pascalCase = camelCase[0].toUpperCase() + camelCase.substr(1);
  return pascalCase;
};

export type ParseOptions = {
  parseFromSnakeCase: boolean;
  parseFromKebapCase: boolean;
};
