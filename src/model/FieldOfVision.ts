import Tile from 'model/Tile'
import Position from 'model/Position'
import CompassUtils from 'utils/CompassUtils'
import Visibility from './enum/Visibility'

class FieldOfVision {
  // TODO: Check to unify 'onSight' and 'seenTiles' to knownTiles where key is
  // position's hash and value is Visibility (Visible | Seen).
  private onSight: Map<string, Tile>

  private seenTiles: Map<string, Tile>

  private sightRange: number

  constructor(sightRange: number) {
    this.onSight = new Map()
    this.seenTiles = new Map()
    this.sightRange = sightRange
  }

  getTileVisibility(position: Position) {
    const hashValue = position.hash()
    if (this.onSight.has(hashValue)) return Visibility.Visible
    if (this.seenTiles.has(hashValue)) return Visibility.Seen
    return Visibility.Invisible
  }

  recalculateFrom(tile: Tile) {
    const onSight = new Map<string, Tile>()
    const visitMap: Map<number, Set<Tile>> = new Map()
    visitMap.set(this.sightRange, new Set([tile]))

    let currentSight = this.sightRange
    while (currentSight >= 0) {
      // Iterating list of current sight
      // eslint-disable-next-line no-loop-func
      visitMap.get(currentSight)?.forEach((currentTile) => {
        // TODO: Check if currentTile is on sight first
        onSight.set(currentTile.position.hash(), currentTile)
        currentTile.neighbors.forEach((neighbor, direction) => {
          const remainingSight = currentSight - CompassUtils.getCost(direction)
          if (remainingSight >= 0) {
            // Initialize list if it haven't already
            if (!visitMap.has(remainingSight)) {
              visitMap.set(remainingSight, new Set())
            }
            // Add neighbor to peding visit list
            visitMap.get(remainingSight)?.add(neighbor)
          }
        })
      })
      currentSight -= 0.5
    }

    // Updating onSight to seen
    this.updateVisibility(onSight)
  }

  private updateVisibility(onSight: Map<string, Tile>) {
    const notOnSight: string[] = []
    this.onSight.forEach((tile, key) => {
      if (!onSight.has(key)) {
        notOnSight.push(key)
        this.seenTiles.set(key, tile)
      }
    })
    notOnSight.forEach((key) => {
      this.onSight.delete(key)
    })
    onSight.forEach((tileOnSight) => {
      this.onSight.set(tileOnSight.position.hash(), tileOnSight)
    })
  }
}

export default FieldOfVision
