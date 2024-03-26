import type { FullResult, Reporter } from "@playwright/test/reporter";

class MyReporter implements Reporter {
  onEnd(result: FullResult) {
    console.log(`${result.status}`);
  }
}
export default MyReporter;
