import { DataReader } from "../../src/classes/DataReader";
import mock from "mock-fs";
import {
  camelCaseMockGeneralLedger,
  mockGeneralLedger,
} from "../__mocks__/mockGeneralLedger";
import { RootObject } from "../../src/types/types";

const dataReader = new DataReader();

describe("DataReader class", () => {
  describe("readJson method", () => {
    const mockFileData = JSON.stringify(mockGeneralLedger);

    beforeEach(() => {
      mock({
        data: {
          "data.json": mockFileData,
          "invalid.json": "# I'm not JSON",
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
        dataReader.readAndParseJson("./i_dont_exist.json"),
      ).rejects.toThrow(/Failed to read file/);
    });

    it("should throw an error when the file is not valid JSON", async () => {
      await expect(
        dataReader.readAndParseJson(`${process.cwd()}/data/invalid.json`),
      ).rejects.toThrow(/Failed to read file/);
    });
  });
  describe("convertToCamelCase method", () => {
    it("should convert a valid object's keys to camelcase", () => {
      const result =
        dataReader.convertToCamelCase<RootObject>(mockGeneralLedger);
      expect(result).toEqual(camelCaseMockGeneralLedger);
    });

    it("should handle deeply nested objects", () => {
      const input = {
        first_key: {
          nested_key_one: {
            deep_nested_key_two: "value",
          },
        },
      };

      const expected = {
        firstKey: {
          nestedKeyOne: {
            deepNestedKeyTwo: "value",
          },
        },
      };

      const result = dataReader.convertToCamelCase(input);
      expect(result).toEqual(expected);
    });

    it("should handle nested arrays", () => {
      const input = {
        array_key: [{ nested_key_one: "value1" }, { nested_key_two: "value2" }],
      };

      const expected = {
        arrayKey: [{ nestedKeyOne: "value1" }, { nestedKeyTwo: "value2" }],
      };

      const result = dataReader.convertToCamelCase(input);
      expect(result).toEqual(expected);
    });

    it("ensures arrays containing primitive values (e.g., numbers, strings) remain unchanged", () => {
      const input = {
        array_key: ["string", 123, true],
      };

      const expected = {
        arrayKey: ["string", 123, true],
      };

      const result = dataReader.convertToCamelCase(input);
      expect(result).toEqual(expected);
    });

    it("should leave already camelCase keys unchanged", () => {
      const input = {
        camelCaseKey: "value",
        simpleKey: "value",
      };

      const expected = {
        camelCaseKey: "value",
        simpleKey: "value",
      };

      const result = dataReader.convertToCamelCase(input);
      expect(result).toEqual(expected);
    });
  });
});
