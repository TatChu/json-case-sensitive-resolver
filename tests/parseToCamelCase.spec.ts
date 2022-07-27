import { parseToCamelCase } from "../index";

import { expect } from "chai";
describe("parseToCamelCase cases", function () {
  it("Should parse correctly", async () => {
    const json = '{"Prop1InPascalCase":1,"prop2InCamelCase":"2","_prop3StartWithLowerCase":true}';
    const parsedObj = parseToCamelCase(json);

    console.debug(parsedObj);

    expect(parsedObj).to.not.be.null.and.to.not.be.undefined;
    expect(parsedObj.prop1InPascalCase).to.be.equals(1, 'Property 1 with Pascal case in json should be parsed to camel case');
    expect(parsedObj.prop2InCamelCase).to.be.equals("2", 'Property 2 with camel case in json should be retained the same');
    expect(parsedObj._prop3StartWithLowerCase).to.be.equals(true, 'Property 3 start with underscore in json should be retained the same');
  });

  
  it("Should parse snake_case correctly", async () => {
    const json = '{"snake_case_here":"ok"}';
    const parsedObj = parseToCamelCase(json, { parseFromSnakeCase: true });

    console.debug(parsedObj);

    expect(parsedObj).to.not.be.null.and.to.not.be.undefined;
    expect(parsedObj.snakeCaseHere).to.be.equals("ok");
  });

  it("Should parse kebap-case correctly", async () => {
    const json = '{"kebap-case-here":"ok"}';
    const parsedObj = parseToCamelCase(json, { parseFromKebapCase: true });

    console.debug(parsedObj);

    expect(parsedObj).to.not.be.null.and.to.not.be.undefined;
    expect(parsedObj.kebapCaseHere).to.be.equals("ok");
  });

  it("Should parse mixed case correctly", async () => {
    const json = '{"kebap-case-here":"ok", "propInCamelCase":"2", "snake_case_here":"ok"}';
    const parsedObj = parseToCamelCase(json, { parseFromKebapCase: true, parseFromSnakeCase: true });

    console.debug(parsedObj);

    expect(parsedObj).to.not.be.null.and.to.not.be.undefined;
    expect(parsedObj.snakeCaseHere).to.be.equals("ok");
    expect(parsedObj.kebapCaseHere).to.be.equals("ok");
    expect(parsedObj.propInCamelCase).to.be.equals("2", 'Property with camel case in json should be retained the same');
  });
});
