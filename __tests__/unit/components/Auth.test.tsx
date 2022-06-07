import React from "react";
import Chance from "chance";

describe.skip("Auth", () => {
  let email: string = "";
  let password: string = "";
  beforeEach(() => {
    const chance = new Chance();
    email = chance.email();
    password = chance.string({ length: 5 }); // https://chancejs.com/basics/string.html
  });
  it("", () => {
    expect(true).tobe(true);
  });
});
