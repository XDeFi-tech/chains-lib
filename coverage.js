const path = require('path');
const fs = require('fs');
const process = require('process');

function getAllPathsForPackagesSummaries() {
  const getDirectories = (source) =>
    fs
      .readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

  const packagesPath = path.join(process.cwd(), 'packages');
  const packageNames = getDirectories(packagesPath);

  const packagesSummaries = packageNames.reduce((summary, packageName) => {
    return {
      ...summary,
      [packageName]: path.join(
        packagesPath,
        packageName,
        'coverage',
        'coverage-summary.json'
      ),
    };
  }, {});

  return { ...packagesSummaries };
}

function readSummaryPerPackageAndCreateJoinedSummaryReportWithTotal(
  packagesSummaryPaths
) {
  return Object.keys(packagesSummaryPaths).reduce(
    (summary, packageName) => {
      const reportPath = packagesSummaryPaths[packageName];
      if (fs.existsSync(reportPath)) {
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

        const { total } = summary;

        Object.keys(report.total).forEach((key) => {
          if (total[key]) {
            total[key].total += report.total[key].total;
            total[key].covered += report.total[key].covered;
            total[key].skipped += report.total[key].skipped;
            total[key].pct = Number(
              ((total[key].covered / total[key].total) * 100).toFixed(2)
            );
          } else {
            total[key] = { ...report.total[key] };
          }
        });
        return { ...summary, [packageName]: report.total, total };
      }

      return summary;
    },
    { total: {} }
  );
}

function createCoverageReportForVisualRepresentation(coverageReport) {
  return Object.keys(coverageReport).reduce((report, packageName) => {
    const { lines, statements, functions, branches } =
      coverageReport[packageName];
      if (!lines) {
      }
    return {
      ...report,
      [packageName]: {
        lines: lines?.pct,
        statements: statements?.pct,
        functions: functions?.pct,
        branches: branches?.pct,
      },
    };
  }, {});
}

// Execution Stages
// 1. Read all coverage-total.json files
const packagesSummaryPaths = getAllPathsForPackagesSummaries();
// 2. Generate consolidated report
const currCoverageReport =
  readSummaryPerPackageAndCreateJoinedSummaryReportWithTotal(
    packagesSummaryPaths
  );
// 3. Reformat the report for visual representation
const coverageReportForVisualRepresentation =
  createCoverageReportForVisualRepresentation(currCoverageReport);
// 4. Print the report
console.table(coverageReportForVisualRepresentation);
