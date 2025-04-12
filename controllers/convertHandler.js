function ConvertHandler() {
  this.getNum = function (input) {
    if (/^[^\d\s\w]/.test(input)) {
      return undefined;
    }

    const slashCount = (input.match(/\//g) || []).length;
    if (slashCount > 1) {
      return undefined;
    }

    const regex = /(\d*\.?\d+\/\d*\.?\d+|\d*\.?\d+)/;
    let result = input.match(regex);

    if (result === null) {
      if (/^[a-zA-Z]+$/.test(input.trim())) {
        return 1;
      }
      return undefined;
    }

    let numStr = result[0];
    if (numStr.includes("/")) {
      const [numerator, denominator] = numStr.split("/").map(Number);
      return numerator / denominator;
    }

    return parseFloat(numStr);
  };

  this.getUnit = function (input) {
    const regex = /[a-zA-Z]+$/;
    let result = input.match(regex);
    if (!result) {
      return undefined;
    }

    result = result[0].toLowerCase();

    switch (result) {
      case "gal":
        return "gal";
      case "l":
        return "L";
      case "lbs":
        return "lbs";
      case "kg":
        return "kg";
      case "mi":
        return "mi";
      case "km":
        return "km";
      default:
        return undefined;
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit?.toLowerCase()) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = undefined;
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit?.toLowerCase()) {
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      default:
        result = undefined;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit?.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        return undefined;
    }

    return result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    const initUnitSpelled = this.spellOutUnit(initUnit);
    const returnUnitSpelled = this.spellOutUnit(returnUnit);
    if (initNum === undefined && initUnit === undefined) {
      result = "invalid number and unit";
    } else if (initNum === undefined) {
      result = "invalid number";
    } else if (returnUnit === undefined) {
      result = "invalid unit";
    } else {
      result = `${initNum} ${initUnitSpelled} converts to ${returnNum} ${returnUnitSpelled}`;
    }

    return result;
  };
}

module.exports = ConvertHandler;
