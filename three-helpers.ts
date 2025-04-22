import * as THREE from "three"

// Helper function to create a line geometry between two points
export function createLine(pointA: THREE.Vector3, pointB: THREE.Vector3, color = "#ffffff", lineWidth = 1) {
  const points = [pointA, pointB]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color, linewidth: lineWidth })
  return new THREE.Line(geometry, material)
}

// Helper function to create a smooth curve between points
export function createCurve(points: THREE.Vector3[], segments = 50, color = "#ffffff", lineWidth = 1) {
  const curve = new THREE.CatmullRomCurve3(points)
  const curvePoints = curve.getPoints(segments)
  const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints)
  const material = new THREE.LineBasicMaterial({ color, linewidth: lineWidth })
  return new THREE.Line(geometry, material)
}

// Create a gradient material for meshes
export function createGradientMaterial(colorA: string, colorB: string, direction: "x" | "y" | "z" = "y") {
  // Create canvas for gradient texture
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext("2d")

  // Create gradient
  const gradient = context.createLinearGradient(
    direction === "x" ? 0 : 0,
    direction === "y" ? 0 : 0,
    direction === "x" ? canvas.width : 0,
    direction === "y" ? canvas.height : 0,
  )

  gradient.addColorStop(0, colorA)
  gradient.addColorStop(1, colorB)

  // Fill with gradient
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  // Create texture
  const texture = new THREE.CanvasTexture(canvas)

  // Create material
  return new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.5,
    roughness: 0.2,
  })
}
