import { DataReader } from "../../src/classes/DataReader";
import mock from "mock-fs";
import { mockGeneralLedger } from "../__mocks__/mockGeneralLedger";

const dataReader = new DataReader();

describe("DataReader class", () => {
  describe("readJson method", () => {
    const mockFileData = JSON.stringify(mockGeneralLedger);

    beforeEach(() => {
      mock({
        data: {
          "data.json": mockFileData,
        },
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it("should read and parse a valid JSON file", async () => {
      const file = `${process.cwd()}/data/data.json`;
      const data = await dataReader.readAndParseJson(file);

      const expectedResult = mockGeneralLedger;

      expect(data).toEqual(expectedResult);
    });

    it("should throw an error when the file does not exist", async () => {
      await expect(
        dataReader.readAndParseJson("./invalid.json"),
      ).rejects.toThrow(/Failed to read file/);
    });
  });
});
