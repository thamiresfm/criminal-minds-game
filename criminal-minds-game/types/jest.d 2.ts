import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveTextContent(text: string | RegExp): R
      toBeEnabled(): R
      toBeDisabled(): R
      toHaveClass(className: string): R
      toHaveValue(value: string | number): R
      toBeVisible(): R
      toBeEmptyDOMElement(): R
      toHaveFocus(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveStyle(style: Record<string, any> | string): R
    }
  }
} 