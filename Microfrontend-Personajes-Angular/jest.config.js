module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    coverageReporters: ["html", "json", "lcov", "text", "clover"],

    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    testPathIgnorePatterns: [
        "<rooyDir>/node_modules/",
        "<rootDir>/dist/",
    ],

    verbose: true,
    testEnvironment: "jsdom",
    collectCoverage: true,
    collectCoverageFrom: [
        "src/app/**/*.{ts,html}",
        "src/environments/**/*.ts",
        "!src/**/*.spec.ts",
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    clearMocks: true,
    testMatch: ["**/*.spec.ts"],
    rootDir: './',
};