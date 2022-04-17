// eslint-disable-next-line no-shadow
enum Compass {
  NORTH = 'N',
  NORTHEAST = 'NE',
  EAST = 'E',
  SOUTHEAST = 'SE',
  SOUTH = 'S',
  SOUTHWEST = 'SW',
  WEST = 'W',
  NORTHWEST = 'NW',
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

export const oppositeOf = (direction: Compass) => {
  return oppositeMap[direction]
}

export default Compass
