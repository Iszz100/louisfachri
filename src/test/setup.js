import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
  document.body.style.overflow = ''
  document.head.querySelector('#portfolio-structured-data')?.remove()
})

Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }

  observe(target) {
    this.callback([{ isIntersecting: true, target }])
  }

  unobserve() {}

  disconnect() {}
}

class MockResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
vi.stubGlobal('ResizeObserver', MockResizeObserver)

Object.defineProperty(window, 'requestIdleCallback', {
  configurable: true,
  value: (callback) => window.setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 50 }), 0),
})

Object.defineProperty(window, 'cancelIdleCallback', {
  configurable: true,
  value: (id) => window.clearTimeout(id),
})

Object.defineProperty(window, 'requestAnimationFrame', {
  configurable: true,
  value: (callback) => window.setTimeout(callback, 0),
})

Object.defineProperty(window, 'scrollTo', { configurable: true, value: vi.fn() })
Object.defineProperty(Element.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() })
