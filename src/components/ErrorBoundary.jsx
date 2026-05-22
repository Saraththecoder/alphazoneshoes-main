import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '48px 24px', textAlign: 'center' }}>
          <h2 className="display-text mb-4">Something went wrong.</h2>
          <p className="text-muted mb-4">We're sorry, but an unexpected error occurred.</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
