export const parseToPascalCase = function (
  jsonString: string,
  parseOptions: Partial<ParseOptions> = {}
): any {
  function pascalCaseReviver(_key: string, value: any) {
    if (value && typeof value === "object") {
      for (var k in value) {
        if (Object.hasOwnProperty.call(value, k)) {
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

          if (hasChange) {
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
        if (Object.hasOwnProperty.call(value, k)) {
          let newKey = toCamelCase(k);
          let hasChange = newKey != k;

          if (parseOptions?.parseFromSnakeCase && /[_]/.test(newKey)) {
            newKey = snakeToCamel(newKey);
            hasChange = true;
          }

          if (parseOptions?.parseFromKebapCase && /[-]/.test(newKey)) {
            newKey = kebapToCamel(newKey);
            hasChange = true;
          }

          if (hasChange) {
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

export function toCamelCase(s: string): string {
  if (!s || !isUpper(s[0])) {
    return s;
  }

  const chars: string[] = s.split("");

  for (let i = 0; i < chars.length; i++) {
    if (i == 1 && !isUpper(chars[i])) {
      break;
    }

    const hasNext: boolean = i + 1 < chars.length;
    if (i > 0 && hasNext && !isUpper(chars[i + 1])) {
      // if the next character is a space, which is not considered uppercase
      // (otherwise we wouldn't be here...)
      // we want to ensure that the following:
      // 'FOO bar' is rewritten as 'foo bar', and not as 'foO bar'
      // The code was written in such a way that the first word in uppercase
      // ends when if finds an uppercase letter followed by a lowercase letter.
      // now a ' ' (space, (char)32) is considered not upper
      // but in that case we still want our current character to become lowercase
      if (isSeparator(chars[i + 1])) {
        chars[i] = chars[i].toLowerCase();
      }

      break;
    }

    chars[i] = chars[i].toLowerCase();
  }

  return chars.join("");
}

function isUpper(char: string) {
  return char[0].toUpperCase() == char[0];
}

function isSeparator(c: string): boolean {
  switch (c) {
    case "}":
    case "]":
    case ",":
    case " ":
    case "\t":
      return true;
  }

  return false;
}
