import {
  AppInsightsContext,
  ReactPlugin,
} from "@microsoft/applicationinsights-react-js";
import React, { ErrorInfo } from "react";
import { ErrorPage, ErrorText } from "./error-page";

class ErrorBoundary extends React.Component<
  { children?: React.ReactNode },
  { hasError: boolean; error: Error }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  static contextType?: React.Context<ReactPlugin> = AppInsightsContext;
  context!: React.ContextType<typeof AppInsightsContext>;

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught an error", error, errorInfo);

    const appInsights: ReactPlugin = this.context;
    if (appInsights) {
      appInsights.trackException({
        exception: error,
        properties: {
          errorInfo: JSON.stringify(errorInfo),
        },
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorText
          tipText={
            <div>
              <p className="pt-4 text-xl">
                For help, please submit a bug report issue on our GitHub at{" "}
                <a href="https://github.com/SSWConsulting/SSW.Website/issues/new/choose">
                  github.com/SSWConsulting/SSW.Website
                </a>{" "}
                or send us an email at{" "}
                <a href="mailto:info@ssw.com.au">info@ssw.com.au</a>.
              </p>
            </div>
          }
          details={
            this.state.error &&
            JSON.stringify(this.state.error.message, null, 2)
          }
          exitButtonCallback={() =>
            this.setState({ ...this.state, hasError: false })
          }
        />
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
