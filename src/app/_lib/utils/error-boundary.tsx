// ErrorBoundary.js
import React, { FC, ReactElement } from 'react';
import InitializationErrorCard from '../components/errors/initialization-error-card';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);
    this.setState({ error });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return <InitializationErrorCard message={this.state.error?.message} />;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;

export const withErrorBoundary = (WrappedComponent: FC<any>) => {
    return (props: any) => (
      <ErrorBoundary>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };