module.exports = {
  preset: "jest-preset-angular",
  roots: ['src'],
  setupFilesAfterEnv: ["<rootDir>/src/setupJest.ts"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/jestGlobalMocks.ts"
  ]
};
