import {
  changeLocation,
  setSelectedTemp,
  setSelectedDate,
  setTemps,
  setData,
  setDates
} from "../Store/actions";

describe("actions", function() {
  describe("changeLocation", function() {
    it('should have a type of "CHANGE_LOCATION"', function() {
      expect(changeLocation().type).toEqual("CHANGE_LOCATION");
    });

    it("should pass the location we pass in ", function() {
      var location = "Gurgaon, India";
      expect(changeLocation(location).location).toEqual(location);
    });
  });

  describe("setSelectedDate", function() {
    it("should have a type of SET_SELECTED_DATE", function() {
      expect(setSelectedDate().type).toEqual("SET_SELECTED_DATE");
    });

    it("should pass on the date we pass in", function() {
      var date = "2016-01-01";
      expect(setSelectedDate(date).date).toEqual(date);
    });
  });

  describe("setSelectedTemp", function() {
    it("should have a type of SET_SELECTED_TEMP", function() {
      expect(setSelectedTemp().type).toEqual("SET_SELECTED_TEMP");
    });

    it("should pass on the temp we pass in", function() {
      var temp = "31";
      expect(setSelectedTemp(temp).temp).toEqual(temp);
    });
  });

  describe("setTemps", function() {
    it("should have a type of SET_TEMPS", function() {
      expect(setTemps().type).toEqual("SET_TEMPS");
    });

    it("should pass on the temps we pass in", function() {
      var temp = [1, 2, 3];
      expect(setTemps(temp).temps).toEqual(temp);
    });
  });

  describe("setData", function() {
    it("should have a type of SET_DATA", function() {
      expect(setData().type).toEqual("SET_DATA");
    });

    it("should pass on the temps we pass in", function() {
      var data = { whatever: "itis" };
      expect(setData(data).data).toEqual(data);
    });
  });

  describe("setDates", function() {
    it("should have a type of SET_DATES", function() {
      expect(setDates().type).toEqual("SET_DATES");
    });

    it("should pass on the temps we pass in", function() {
      var dates = ["2016-01-01", "2016-01-02"];
      expect(setDates(dates).dates).toEqual(dates);
    });
  });
});
