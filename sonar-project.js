const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    token: "5f204a40350ffb98e9b836ec65679afd1f4176a9",
    options: {
      "sonar.language":"js",
      "sonar.sources": "src/views",
     // "sonar.inclusions":"src/views/**/**/*.js",
      //"sonar.exclusions": "src/views/**.js",
      "sonar.tests": "src/__tests__",
     // "sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "reports/test-report.xml",
    },
  },
  () => {},
);