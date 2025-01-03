import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error);
    console.error("Error Info:", errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // Log the error to an external error reporting service if needed
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Optionally reload the app or navigate to a safe route
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <h1 className="text-4xl font-bold text-red-600">
            Oops! Something went wrong.
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            We're sorry for the inconvenience. Please try refreshing the page or
            contact support.
          </p>
          {this.state.error && (
            <p className="text-sm text-gray-500 mt-2">
              Error: {this.state.error.message}
            </p>
          )}
          <button
            onClick={this.handleRetry}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Reload
          </button>
          {this.state.errorInfo && (
            <details className="mt-4 text-sm text-gray-600">
              <summary className="cursor-pointer text-gray-800 font-medium">
                View error details
              </summary>
              <pre className="bg-gray-200 p-2 rounded-lg mt-2">
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
