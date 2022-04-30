import { isEqual } from 'lodash'

import Compass from 'domain/enum/Compass'
import Position from 'domain/Position'

class PositionUtils {
  /**
   * General direction of vector.
   *
   * @param vector representation of destination.
   * @returns direction to follow or undefined if at origin (0, 0).
   */
  static generalDirection(vector: Position) {
    const result = new Position(Math.sign(vector.x), Math.sign(vector.y))
    if (Math.abs(vector.x) > Math.abs(vector.y)) {
      if (Math.abs(vector.y / vector.x) <= 0.5) {
        result.y = 0
      }
    } else if (Math.abs(vector.y) > Math.abs(vector.x)) {
      if (Math.abs(vector.x / vector.y) <= 0.5) {
        result.x = 0
      }
    }

    if (isEqual(result, new Position(0, 1))) return Compass.NORTH
    if (isEqual(result, new Position(1, 1))) return Compass.NORTHEAST
    if (isEqual(result, new Position(1, 0))) return Compass.EAST
    if (isEqual(result, new Position(1, -1))) return Compass.SOUTHEAST
    if (isEqual(result, new Position(0, -1))) return Compass.SOUTH
    if (isEqual(result, new Position(-1, -1))) return Compass.SOUTHWEST
    if (isEqual(result, new Position(-1, 0))) return Compass.WEST
    if (isEqual(result, new Position(-1, 1))) return Compass.NORTHWEST
    return undefined
  }
}

export default PositionUtils
