declare global {
  interface Window {
    $apis: typeof import('@/apis')['default']
  }
}

export { }
