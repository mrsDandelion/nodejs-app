import axios from 'axios';

const API = "https://date.nager.at/api/v3";

describe("e2e", () => {
  describe("AvailableCountries", () => {
    test("should return result", async () => {
      const { status, data } = await axios.get(`${API}/AvailableCountries`);

      expect(status).toEqual(200);
      expect(data).toBeTruthy();
      expect(data.length).toBeGreaterThanOrEqual(1);
    });
  });
  
  describe("NextPublicHolidaysWorldwide", () => {
    test("should return result", async () => {
      const { status, data } = await axios.get(`${API}/NextPublicHolidaysWorldwide`);

      expect(status).toEqual(200);
      expect(data).toBeTruthy();
      expect(data.length).toBeGreaterThanOrEqual(1);
    });
  });
});
