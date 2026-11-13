import React, { Component, ReactNode, ErrorInfo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled UI exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '32px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '40px auto', background: '#FFF5F5', border: '1px solid #FEB2B2', borderRadius: '12px', color: '#9B2C2C' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Something went wrong loading Nexus Vault</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', background: '#FFF', padding: '12px', borderRadius: '6px', border: '1px solid #FEB2B2' }}>
            {(this.state.error && this.state.error.message) ? this.state.error.message : 'Unknown runtime error'}
          </pre>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            style={{ marginTop: '16px', padding: '8px 16px', background: '#E53E3E', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Clear Local Storage & Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function mountApp() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    try {
      ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
          <RootErrorBoundary>
            <App />
          </RootErrorBoundary>
        </React.StrictMode>
      );
    } catch (err: any) {
      console.error('Failed to createRoot:', err);
      rootElement.innerHTML = `
        <div style="padding: 32px; font-family: sans-serif; color: #9B2C2C; background: #FFF5F5;">
          <h2>Rendering Exception</h2>
          <pre>${(err && err.message) ? err.message : String(err)}</pre>
        </div>
      `;
    }
  } else {
    console.error('Critical: Root element #root not found');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
