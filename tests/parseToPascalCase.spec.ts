import { parseToPascalCase } from "../index";

import { expect } from "chai";
describe("parseToPascalCase cases", function () {
  it("Should parse correctly", async () => {
    const json = '{"Prop1InPascalCase":1,"prop2InCamelCase":"2","_prop3StartWithLowerCase":true}';
    const parsedObj = parseToPascalCase(json);

    console.debug(parsedObj);

    expect(parsedObj).to.not.be.null.and.to.not.be.undefined;
    expect(parsedObj.Prop1InPascalCase).to.be.equals(1, 'Property 1 with PascalCase in json should be retained the same');
    expect(parsedObj.Prop2InCamelCase).to.be.equals("2", 'Property 2 with camelCase in json should be parsed to PascalCase');
    expect(parsedObj._prop3StartWithLowerCase).to.be.equals(true, 'Property 3 start with underscore in json should be retained the same');
  });


  it("Should parse snake_case correctly", async () => {
    const json = '{"snake_case_here":"ok"}';
    const parsedObj = parseToPascalCase(json, { parseFromSnakeCase: true });

    console.debug(parsedObj);

    expect(parsedObj).to.not.be.null.and.to.not.be.undefined;
    expect(parsedObj["snake_case_here"]).to.be.undefined
    expect(parsedObj.SnakeCaseHere).to.be.equals("ok");
  });

  it("Should parse kebap-case correctly", async () => {
    const json = '{"kebap-case-here":"ok"}';
    const parsedObj = parseToPascalCase(json, { parseFromKebapCase: true });

    console.debug(parsedObj);

    expect(parsedObj).to.not.be.null.and.to.not.be.undefined;
    expect(parsedObj["kebap-case-here"]).to.be.undefined
    expect(parsedObj.KebapCaseHere).to.be.equals("ok");
  });

  it("Should parse mixed case correctly", async () => {
    const json = '{"kebap-case-Here":"ok", "propInCamelCase":"2", "snake_case_here":"ok"}';
    const parsedObj = parseToPascalCase(json, { parseFromKebapCase: true, parseFromSnakeCase: true });

    console.debug(parsedObj);

    expect(parsedObj).to.not.be.null.and.to.not.be.undefined;
    expect(parsedObj.SnakeCaseHere).to.be.equals("ok");
    expect(parsedObj.KebapCaseHere).to.be.equals("ok");
    expect(parsedObj["kebap-case-Here"]).to.be.undefined
    expect(parsedObj["snake_case_here"]).to.be.undefined
    expect(parsedObj.PropInCamelCase).to.be.equals("2", 'Property with camelCase in json should be parsed to PascalCase');
  });
});
