import React from 'react';
import {Link, Redirect} from '@reach/router';

export class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        redirect: false,
    };

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught an error', error, info);
    }

    componentDidUpdate() {
        if (this.state.hasError) {
            setTimeout(() => this.setState({redirect: true}), 5000);
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to=''/>
        }
        if (this.state.hasError) {
            return (
                <h1>
                    There was an error <Link to="/">Click here</Link>
                    {' '}
                    to go back, or wait 5 seconds
                </h1>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
