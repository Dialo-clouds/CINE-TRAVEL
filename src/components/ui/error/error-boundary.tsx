"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center p-8">
            <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl font-light mb-2">Something went wrong</h2>
            <p className="text-gray-500 text-sm mb-4">{this.state.error?.message || "An unexpected error occurred"}</p>
            <button onClick={() => this.setState({ hasError: false })} className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 flex items-center gap-2 mx-auto">
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}