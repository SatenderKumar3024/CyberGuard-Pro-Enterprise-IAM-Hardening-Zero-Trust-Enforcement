/**
 * Utility functions for performance optimization
 */

// Detect if the device is low-end based on memory and CPU cores
export function isLowEndDevice() {
  if (typeof navigator === "undefined") return false

  // Check for device memory (available in Chrome)
  const memory = (navigator as any).deviceMemory
  if (memory && memory <= 4) return true

  // Check for hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency
  if (cores && cores <= 4) return true

  // Check for mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  return isMobile
}

// Get appropriate level of detail based on device capability
export function getAppropriateDetailLevel() {
  const isLowEnd = isLowEndDevice()

  return {
    particleCount: isLowEnd ? 50 : 200,
    sphereDetail: isLowEnd ? 8 : 32,
    enableShadows: !isLowEnd,
    enablePostProcessing: !isLowEnd,
    dpr: isLowEnd ? 1 : [1, 2],
  }
}

// Throttle function for performance-heavy operations
export function throttle(func: Function, limit: number) {
  let inThrottle: boolean

  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
