import { promises } from "fs";

export class DataReader {
  static async readAndParseJson<T>(filePath: string): Promise<T> {
    const content = await promises.readFile(filePath, "utf8");
    try {
      return JSON.parse(content) as T;
    } catch (error) {
      throw new Error(
        `Failed to parse JSON data from file: ${filePath}. ${error}`,
      );
    }
  }
}
