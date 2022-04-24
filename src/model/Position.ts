import hash from 'object-hash'
import PositionUtils from 'utils/PositionUtils'

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

  directionTo(other: Position) {
    const vector = new Position(other.x - this.x, other.y - this.y)
    return PositionUtils.generalDirection(vector)
  }

  hash() {
    return hash(this)
  }
}

export default Position
