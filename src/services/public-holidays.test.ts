import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "./public-holidays.service";

describe("public-holidays", () => {
  describe("getListOfPublicHolidays", () => {
    test("should return result", async () => {
        const result = await getListOfPublicHolidays(new Date().getFullYear(), 'GB');
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });
  
  describe("checkIfTodayIsPublicHoliday", () => {
    test("should return result", async () => {
        const result = await checkIfTodayIsPublicHoliday('GB');
        expect(result).toBe(false);
    });
  });

  describe("getNextPublicHolidays", () => {
    test("should return result", async () => {
        const result = await getNextPublicHolidays('GB');
        expect(result).toBeTruthy();
    });
  });
});
