import { Component, ErrorInfo } from 'react'
import { ErrorDisplay } from '../ErrorDisplay'
import { ErrorBoundaryProps, ErrorBoundaryState } from './types'
import { cn } from '../../../../utils/cn'
import { styles } from './styles'

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error reporting service
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  public render() {
    const { 
      showErrorDetails = process.env.NODE_ENV === 'development',
      fallbackMessage = 'The application encountered an unexpected error.',
      showHomeButton = true,
      className
    } = this.props

    if (this.state.hasError) {
      return (
        <div className={cn(styles.base, className)}>
          <ErrorDisplay 
            message={fallbackMessage}
            details={showErrorDetails ? this.state.error?.stack : undefined}
            onRetry={this.handleRetry}
            severity="fatal"
            standalone
            showHomeButton={showHomeButton}
            className={styles.display}
          />
        </div>
      )
    }

    return this.props.children
  }
} 