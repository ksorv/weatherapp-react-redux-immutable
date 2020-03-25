import React from "react";
import renderer from "react-test-renderer";
import { App } from "../App";

describe("components", function() {
  describe("<App />", function() {
    window.URL.createObjectURL = function() {};

    afterEach(() => {
      window.URL.createObjectURL.mockReset();
    });
    it("renders correctly", function() {
      var tree = renderer.create(<App />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

// ! Mocking problem => idek what tht is>>>
