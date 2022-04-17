import { uniqueId } from 'lodash'
import Neighborhood from 'model/Neighborhood'
import Visibility from 'model/enum/Visibility'
import Compass, { oppositeOf } from 'model/enum/Compass'

class Tile {
  id: string

  neighbors: Neighborhood

  visibility: Visibility

  constructor() {
    this.id = uniqueId()
    this.visibility = Visibility.Invisible
    this.neighbors = {}
  }

  setNeighbor(direction: Compass, neighbor: Tile) {
    // Check if relationship is already set.
    if (this.neighbors[direction]?.id === this.id) {
      return
    }

    this.removeNeighbor(direction)
    // Updating neighborhood relationship
    this.neighbors[direction] = neighbor
    const oppositeDirection = oppositeOf(direction)
    if (neighbor.neighbors[oppositeDirection]?.id !== this.id) {
      neighbor.setNeighbor(oppositeDirection, this)
    }
  }

  removeNeighbor(direction: Compass) {
    const neighbor = this.neighbors[direction]

    this.neighbors[direction] = undefined
    // Removing link with previous neighbor to avoid loose ends
    neighbor?.removeNeighbor(oppositeOf(direction))
  }
}

export default Tile
