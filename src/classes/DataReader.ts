import fs from "fs";

export class DataReader {
  static async readJson<T>(filePath: string): Promise<T> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, fileData) => {
        if (err) {
          return reject(
            new Error(`Failed to read file: ${filePath}. ${err.message}`),
          );
        }
        try {
          const data = JSON.parse(fileData) as T;
          resolve(data);
        } catch (parseError) {
          reject(
            new Error(
              `Failed to parse JSON data from file: ${filePath}. ${
                parseError instanceof Error
                  ? parseError.message
                  : String(parseError)
              }`,
            ),
          );
        }
      });
    });
  }
}
