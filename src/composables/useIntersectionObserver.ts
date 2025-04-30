export function useIntersectionObserver(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
  // Create the observer with default options if not provided
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  }
  
  const observer = new IntersectionObserver(callback, defaultOptions)
  
  // Helper functions
  const observe = (element: Element) => {
    if (element) {
      observer.observe(element)
    }
  }
  
  const unobserve = (element: Element) => {
    if (element) {
      observer.unobserve(element)
    }
  }
  
  const disconnect = () => {
    observer.disconnect()
  }
  
  return {
    observe,
    unobserve,
    disconnect
  }
}