const mockToast = jest.fn()
mockToast.success = jest.fn()
mockToast.error = jest.fn()
mockToast.warning = jest.fn()
mockToast.loading = jest.fn()
mockToast.dismiss = jest.fn()

module.exports = {
  __esModule: true,
  default: mockToast,
  toast: mockToast,
} 