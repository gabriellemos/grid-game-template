class Position {
  x: number

  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  distance(other: Position) {
    const localX = (other.x - this.x) ** 2
    const localY = (other.y - this.y) ** 2
    return Math.sqrt(localX + localY)
  }
}

export default Position
