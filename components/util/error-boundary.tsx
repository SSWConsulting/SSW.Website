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
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
