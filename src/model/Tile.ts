import { uniqueId } from 'lodash'
import Neighborhood from 'model/Neighborhood'
import Visibility from 'model/enum/Visibility'
import Compass from 'model/enum/Compass'

import TileUtils from 'utils/TileUtils'
import CompassUtils from 'utils/CompassUtils'

type Options = {
  depth?: number
}

class Tile {
  id: string

  neighbors: Neighborhood

  visibility: Visibility

  constructor() {
    this.id = uniqueId()
    this.visibility = Visibility.Invisible
    this.neighbors = new Neighborhood()
  }

  setNeighbor(direction: Compass, neighbor: Tile, options?: Options) {
    // Check if relationship is already set
    if (this.neighbors.direction[direction]?.id === neighbor.id) {
      return
    }

    this.removeNeighbor(direction)
    // Updating neighborhood relationship
    this.neighbors.direction[direction] = neighbor
    const oppositeDirection = CompassUtils.getOpposite(direction)
    if (neighbor.neighbors.direction[oppositeDirection]?.id !== this.id) {
      neighbor.setNeighbor(oppositeDirection, this, {
        depth: options?.depth || 0 + 1,
      })
    }
    TileUtils.addContext(this, { depth: options?.depth })
  }

  removeNeighbor(direction: Compass) {
    const neighbor = this.neighbors.direction[direction]

    this.neighbors.direction[direction] = undefined
    // Removing link with previous neighbor to avoid loose ends
    neighbor?.removeNeighbor(CompassUtils.getOpposite(direction))
  }
}

export default Tile
