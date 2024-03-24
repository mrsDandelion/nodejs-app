import { shortenPublicHoliday, validateInput } from "./helpers";

describe("helpers", () => {
  describe("validateInput", () => {
    test("should return true", () => {
      const data = { year: new Date().getFullYear(), country: "GB" };
      const result = validateInput(data);
      expect(result).toBe(true);
    });

    test("should return error with invalid year", () => {
      const data = { year: 2022, country: "GB" };
      try {
        validateInput(data);
      } catch (error) {
        expect(error).toEqual(
          new Error("Year provided not the current, received: 2022")
        );
      }
    });

    test("should return error with invalid country", () => {
      const data = { year: new Date().getFullYear(), country: "BEL" };
      try {
        validateInput(data);
      } catch (error) {
        expect(error).toEqual(
          new Error("Country provided is not supported, received: BEL")
        );
      }
    });
  });

  describe("shortenPublicHoliday", () => {
    test("should return short information", () => {
      const data = {
        date: "2021-12-25",
        localName: "Bob",
        name: "Christmas Day",
        countryCode: "FR",
        fixed: true,
        global: true,
        counties: null,
        launchYear: 336,
        types: ["Religious", "Federal"],
      };
      const result = shortenPublicHoliday(data);
      expect(result).toEqual({
        name: "Christmas Day",
        localName: "Bob",
        date: "2021-12-25",
      });
    });
  });
});
