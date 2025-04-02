import { CustomUpperCasePipe } from "../customUpperCase.pipe";

describe("CustomUpperCasePipe", () => {

  const customUpperCasePipe = new CustomUpperCasePipe();

  it("should transform 'hello' to 'HELLO'", () => {
    const result = customUpperCasePipe.transform("hello");
    expect(result).toEqual("HELLO");
  });

  it("shloud stay words in upper case", () => {
    expect(customUpperCasePipe.transform("HELLO WORLD")).toEqual("HELLO WORLD");
  })

});
