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
}
