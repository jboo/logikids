import { ApiError, ApiErrorCode, isApiError } from "../api/types"

// Custom error classes
export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'APP_ERROR',
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network error occurred') {
    super(message, 'NETWORK_ERROR')
    this.name = 'NetworkError'
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public validationErrors: Record<string, string[]>
  ) {
    super(message, 'VALIDATION_ERROR', { validationErrors })
    this.name = 'ValidationError'
  }
}

// Error handling utilities
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unknown error occurred'
}

export function getApiErrorMessage(error: ApiError): string {
  switch (error.code) {
    case ApiErrorCode.BAD_REQUEST:
      return 'Invalid request'
    case ApiErrorCode.VALIDATION_ERROR:
      return 'Please check your input and try again'
    case ApiErrorCode.INTERNAL_ERROR:
      return 'An internal server error occurred'
    default:
      return 'An unknown error occurred'
  }
}

// Error handling hooks
export function handleError(error: unknown): void {
  if (isApiError(error)) {
    console.error('API Error:', {
      code: error.code,
      message: error.message,
      details: error.details
    })
  } else if (error instanceof AppError) {
    console.error('App Error:', {
      code: error.code,
      message: error.message,
      details: error.details
    })
  } else if (error instanceof Error) {
    console.error('Error:', error.message)
  } else {
    console.error('Unknown error:', error)
  }
}

// Type guards
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError
} 