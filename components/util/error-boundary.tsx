import {
  AppInsightsContext,
  ReactPlugin,
} from "@microsoft/applicationinsights-react-js";
import React, { ErrorInfo } from "react";
import { ErrorPage } from "./error-page";

class ErrorBoundary extends React.Component<
  { children?: React.ReactNode },
  { hasError: boolean },
  ReactPlugin
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
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
        <ErrorPage
          tipText={
            <div>
              CLIENT-SIDE ERROR!
              <br />
              We&apos;re sorry, something has gone wrong here. For help, please
              submit a bug report issue on our GitHub at{" "}
              <a href="https://github.com/SSWConsulting/SSW.Website/issues/new/choose">
                github.com/SSWConsulting/SSW.Website/issues/new/choose
              </a>
              or send us an email at{" "}
              <a href="mailto:info@ssw.com.au">info@ssw.com.au</a>.
            </div>
          }
        />
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
