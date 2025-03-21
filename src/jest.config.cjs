export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true 
      }
    ]
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"], 
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
  bail: 1,
  verbose: true,
};
