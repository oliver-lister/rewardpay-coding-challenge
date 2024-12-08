import { promises } from "fs";

export class DataReader {
  /**
   * Reads a JSON file asynchronously and parses it to a specific type.
   * @param filePath - The path to the JSON file.
   * @returns A promise resolving to the parsed data.
   */
  async readAndParseJson<T>(filePath: string): Promise<T> {
    try {
      const content = await promises.readFile(filePath, "utf8");
      return JSON.parse(content) as T;
    } catch (error) {
      throw new Error(
        `Failed to read file: ${filePath}. ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  /**
   * Converts an object's keys to camelCase recursively.
   * Handles nested objects and arrays.
   * @param object - The object to be converted.
   * @returns A new object with camelCase keys.
   */
  convertToCamelCase<T>(object: any): T {
    if (Array.isArray(object)) {
      return object.map((item) => this.convertToCamelCase(item)) as T;
    } else if (object !== null && object.constructor === Object) {
      return Object.entries(object).reduce(
        (acc, [key, value]) => {
          const camelKey = key.replace(/([-_][a-z])/g, (match) =>
            match.toUpperCase().replace("-", "").replace("_", ""),
          );
          acc[camelKey] = this.convertToCamelCase(value);
          return acc;
        },
        {} as Record<string, any>,
      ) as T;
    }
    return object;
  }
}
