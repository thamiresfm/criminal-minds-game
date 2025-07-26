import '@testing-library/jest-dom'

// Garantir que os tipos estão disponíveis
/// <reference types="@testing-library/jest-dom" />

// Mock do Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock do sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock

// Mock de notifications (react-hot-toast) - usando __mocks__/react-hot-toast.js

// Mock do Zustand
jest.mock('zustand', () => ({
  create: jest.fn(() => (set, get) => ({})),
}))

// Mock do useNotify (usado no código real)
jest.mock('@/lib/stores/notificationStore', () => ({
  useNotify: jest.fn(() => ({
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  })),
}))

// Mock para Request (necessário para APIs Next.js)
global.Request = jest.fn().mockImplementation((url, options) => ({
  url,
  method: options?.method || 'GET',
  headers: new Headers(options?.headers),
  json: jest.fn(),
  text: jest.fn(),
  ...options
}))

// Mock para Response (necessário para APIs Next.js)
global.Response = jest.fn().mockImplementation((body, init) => ({
  ok: true,
  status: init?.status || 200,
  statusText: 'OK',
  headers: new Headers(init?.headers),
  json: jest.fn().mockResolvedValue(JSON.parse(body || '{}')),
  text: jest.fn().mockResolvedValue(body || ''),
  ...init
}))

// Mock para NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      ok: true,
      status: init?.status || 200,
      statusText: 'OK',
      headers: new Headers(init?.headers),
      json: jest.fn().mockResolvedValue(data),
      ...init
    }))
  }
}))

// Configurações globais de timeout para testes
jest.setTimeout(10000) 