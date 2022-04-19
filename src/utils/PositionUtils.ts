import Compass from 'model/enum/Compass'
import Position from 'model/Position'

class PositionUtils {
  static toDirection(vector: Position) {
    // Crude normalization to fetch general direction
    const x = vector.x === 0 ? 0 : vector.x / Math.abs(vector.x)
    const y = vector.y === 0 ? 0 : vector.y / Math.abs(vector.y)

    switch (`[${x}, ${y}]`) {
      case '[0, 1]':
        return Compass.NORTH
      case '[1, 1]':
        return Compass.NORTHEAST
      case '[1, 0]':
        return Compass.EAST
      case '[1, -1]':
        return Compass.SOUTHEAST
      case '[0, -1]':
        return Compass.SOUTH
      case '[-1, -1]':
        return Compass.SOUTHWEST
      case '[-1, 0]':
        return Compass.WEST
      case '[-1, 1]':
      default:
        return Compass.NORTHWEST
    }
  }
}

export default PositionUtils
