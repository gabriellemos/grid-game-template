import Compass from 'domain/enum/Compass'

type ContextNeighbors = {
  [key in Compass]: {
    position2Self: Compass
    position2relative: Compass
  }[]
}

const contextNeighbors: ContextNeighbors = {
  [Compass.NORTH]: [
    { position2Self: Compass.EAST, position2relative: Compass.NORTHEAST },
    { position2Self: Compass.SOUTHEAST, position2relative: Compass.EAST },
    { position2Self: Compass.SOUTHWEST, position2relative: Compass.WEST },
    { position2Self: Compass.WEST, position2relative: Compass.NORTHWEST },
  ],
  [Compass.NORTHEAST]: [
    { position2Self: Compass.SOUTH, position2relative: Compass.EAST },
    { position2Self: Compass.WEST, position2relative: Compass.NORTH },
  ],
  [Compass.EAST]: [
    { position2Self: Compass.NORTH, position2relative: Compass.NORTHEAST },
    { position2Self: Compass.SOUTHWEST, position2relative: Compass.SOUTH },
    { position2Self: Compass.SOUTH, position2relative: Compass.SOUTHEAST },
    { position2Self: Compass.NORTHWEST, position2relative: Compass.NORTH },
  ],
  [Compass.SOUTHEAST]: [
    { position2Self: Compass.NORTH, position2relative: Compass.EAST },
    { position2Self: Compass.WEST, position2relative: Compass.SOUTH },
  ],
  [Compass.SOUTH]: [
    { position2Self: Compass.NORTHEAST, position2relative: Compass.EAST },
    { position2Self: Compass.EAST, position2relative: Compass.SOUTHEAST },
    { position2Self: Compass.WEST, position2relative: Compass.SOUTHWEST },
    { position2Self: Compass.NORTHWEST, position2relative: Compass.WEST },
  ],
  [Compass.SOUTHWEST]: [
    { position2Self: Compass.EAST, position2relative: Compass.SOUTH },
    { position2Self: Compass.NORTH, position2relative: Compass.WEST },
  ],
  [Compass.WEST]: [
    { position2Self: Compass.NORTH, position2relative: Compass.NORTHWEST },
    { position2Self: Compass.NORTHEAST, position2relative: Compass.NORTH },
    { position2Self: Compass.SOUTH, position2relative: Compass.SOUTHWEST },
    { position2Self: Compass.SOUTHEAST, position2relative: Compass.SOUTH },
  ],
  [Compass.NORTHWEST]: [
    { position2Self: Compass.EAST, position2relative: Compass.NORTH },
    { position2Self: Compass.SOUTH, position2relative: Compass.WEST },
  ],
}

const oppositeMap = {
  [Compass.NORTH]: Compass.SOUTH,
  [Compass.NORTHEAST]: Compass.SOUTHWEST,
  [Compass.EAST]: Compass.WEST,
  [Compass.SOUTHEAST]: Compass.NORTHWEST,
  [Compass.SOUTH]: Compass.NORTH,
  [Compass.SOUTHWEST]: Compass.NORTHEAST,
  [Compass.WEST]: Compass.EAST,
  [Compass.NORTHWEST]: Compass.SOUTHEAST,
}

const mainAxis = new Set([
  Compass.NORTH,
  Compass.EAST,
  Compass.SOUTH,
  Compass.WEST,
])

class CompassUtils {
  static getContextNeighbors(position: Compass) {
    return contextNeighbors[position]
  }

  static getOpposite(position: Compass) {
    return oppositeMap[position]
  }

  static isMainAxis(direction: Compass) {
    return mainAxis.has(direction)
  }

  static getCost(direction: Compass) {
    return this.isMainAxis(direction) ? 1 : 1.5
  }
}

export default CompassUtils
