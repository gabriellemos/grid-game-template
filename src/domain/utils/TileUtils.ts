import Compass from 'domain/enum/Compass'
import Tile from 'domain/Tile'
import CompassUtils from './CompassUtils'

class TileUtils {
  static addContext(original: Tile, { depth = 0 }) {
    if (depth > 1) {
      return
    }

    const ignoreID: { [key: string]: boolean } = {}
    const visitList: { direction: Compass; tile: Tile }[] = []
    // Populating visit list with existing neighbors
    Object.values(Compass).forEach((direction) => {
      const tile = original.neighbors.get(direction)
      if (tile) {
        visitList.push({ direction, tile })
        ignoreID[tile.id] = true
      }
    })

    while (visitList.length > 0) {
      const current = visitList.pop()
      if (!current) break

      // Searching non-null relative neighbors to visit
      CompassUtils.getContextNeighbors(current.direction).forEach((context) => {
        const tile = current.tile.neighbors.get(context.position2Self)
        // Ignore if already added to visit list
        if (tile && !ignoreID[tile.id]) {
          ignoreID[tile.id] = true
          visitList.push({
            direction: context.position2relative,
            tile,
          })
        }
      })
      // Adding neighbor relationship
      original.setNeighbor(current.direction, current.tile, {
        depth: depth + 1,
      })
    }
  }
}

export default TileUtils
