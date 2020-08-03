import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    $('.modal-backdrop').remove();

    console.log(error);
    console.log(errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <h2>System has encountered problem. Sorry for inconvience, Please Refresh your page</h2>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;