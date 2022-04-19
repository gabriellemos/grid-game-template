import { uniqueId } from 'lodash'
import Neighborhood from 'model/Neighborhood'
import Visibility from 'model/enum/Visibility'
import Compass from 'model/enum/Compass'
import Position from 'model/Position'

import TileUtils from 'utils/TileUtils'
import CompassUtils from 'utils/CompassUtils'

type Options = {
  depth?: number
}

class Tile {
  id: string

  position: Position

  neighbors: Neighborhood

  visibility: Visibility

  constructor(x = 0, y = 0) {
    this.id = uniqueId()
    this.position = new Position(x, y)
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

  // TODO: removeNeighbor [Check me out!]
  // Does it make sense to keep this code? With TileUtils.addContext implementation
  // removing a neighbor should probably remove it self from all other neighbor. If
  // all traces are not removed, any neighbor updated will restored the deleted
  // relationship.
  removeNeighbor(direction: Compass) {
    const neighbor = this.neighbors.direction[direction]

    this.neighbors.direction[direction] = undefined
    // Removing link with previous neighbor to avoid loose ends
    neighbor?.removeNeighbor(CompassUtils.getOpposite(direction))
  }
}

export default Tile
