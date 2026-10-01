import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Robust DOM protection against Google Translate Virtual DOM mutations (NotFoundError: insertBefore / removeChild)
if (typeof window !== 'undefined' && typeof Node !== 'undefined') {
  if (Node.prototype) {
    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
      if (referenceNode && referenceNode.parentNode !== this) {
        if (this) {
          return this.appendChild(newNode);
        }
        return newNode;
      }
      try {
        return originalInsertBefore.call(this, newNode, referenceNode) as T;
      } catch (err: any) {
        if (err && (err.name === 'NotFoundError' || String(err).includes('insertBefore'))) {
          try {
            return this.appendChild(newNode);
          } catch {
            return newNode;
          }
        }
        throw err;
      }
    };

    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      if (child && child.parentNode !== this) {
        if (child.parentNode) {
          try {
            return child.parentNode.removeChild(child) as T;
          } catch {
            return child;
          }
        }
        return child;
      }
      try {
        return originalRemoveChild.call(this, child) as T;
      } catch (err: any) {
        if (err && (err.name === 'NotFoundError' || String(err).includes('removeChild'))) {
          return child;
        }
        throw err;
      }
    };
  }
}

// Catch any unhandled error and display it on screen instead of blank white page
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    // If it's a transient Google Translate DOM mutation error, suppress overlay and let UI stay interactive
    const errText = String(event.message || event.error?.message || '');
    if (errText.includes('insertBefore') || errText.includes('removeChild') || errText.includes('NotFoundError')) {
      console.warn('Suppressed Google Translate DOM reconciliation artifact:', errText);
      event.preventDefault();
      return;
    }
    console.error('Captured window error:', event.error || event.message);
    const existing = document.getElementById('runtime-error-overlay');
    if (!existing) {
      const div = document.createElement('div');
      div.id = 'runtime-error-overlay';
      div.style.cssText = 'position:fixed;inset:0;z-index:999999;background:#fff;color:#b91c1c;padding:32px;font-family:monospace;overflow:auto;';
      div.innerHTML = `<h2 style="font-size:20px;font-weight:bold;margin-bottom:12px;">App Runtime Error:</h2><p style="font-size:15px;margin-bottom:16px;">${event.message || event.error?.message}</p><pre style="background:#fee2e2;padding:16px;border-radius:8px;font-size:13px;line-height:1.5;">${event.error?.stack || 'No stack trace'}</pre>`;
      document.body.appendChild(div);
    }
  });
}

class RootErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("RootErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      const errStr = String(this.state.error?.message || this.state.error || '');
      if (errStr.includes('insertBefore') || errStr.includes('removeChild') || errStr.includes('NotFoundError')) {
        // Translation DOM artifact: do not show crash screen, gracefully render children
        return this.props.children;
      }
      return (
        <div style={{ padding: 32, background: '#fff', color: '#b91c1c', fontFamily: 'monospace' }}>
          <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>React Component Render Error:</h2>
          <p style={{ fontSize: 15, marginBottom: 16 }}>{String(this.state.error?.message || this.state.error)}</p>
          <pre style={{ background: '#fee2e2', padding: 16, borderRadius: 8, fontSize: 13, lineHeight: 1.5 }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>,
)

