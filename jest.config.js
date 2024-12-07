/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};
