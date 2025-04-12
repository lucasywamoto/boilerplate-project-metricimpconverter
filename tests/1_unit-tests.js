const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Whole number input", function () {
    assert.equal(convertHandler.getNum("5kg"), 5);
  });

  test("Decimal input", function () {
    assert.equal(convertHandler.getNum("3.5kg"), 3.5);
  });

  test("Fractional input", function () {
    assert.equal(convertHandler.getNum("1/2kg"), 0.5);
  });

  test("Fractional input with decimal", function () {
    assert.equal(convertHandler.getNum("1.5/2kg"), 0.75);
  });

  test("Invalid input (double fraction)", function () {
    assert.equal(convertHandler.getNum("1/2/3kg"), "invalid number");
  });

  test("Default to a numerical input of 1 when no numerical input is provided", function () {
    assert.equal(convertHandler.getNum("kg"), 1);
  });

  test("Valid unit inputs", function () {
    assert.equal(convertHandler.getUnit("5kg"), "kg");
    assert.equal(convertHandler.getUnit("5L"), "L");
    assert.equal(convertHandler.getUnit("5mi"), "mi");
    assert.equal(convertHandler.getUnit("5km"), "km");
    assert.equal(convertHandler.getUnit("5gal"), "gal");
    assert.equal(convertHandler.getUnit("5lbs"), "lbs");
  });

  test("Invalid unit inputs", function () {
    assert.equal(convertHandler.getUnit("5xyz"), "invalid unit");
  });

  test("Return unit for valid inputs", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("l"), "gal");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
  });

  test("String output for valid inputs", function () {
    const result = convertHandler.getString(
      5,
      "gal",
      convertHandler.convert(5, "gal"),
      "l"
    );

    const expected = "5 gallons converts to 18.92705 liters";
    assert.equal(result, expected);
  });
});
