import Tile from 'domain/Tile'
import Position from 'domain/Position'
import CompassUtils from 'domain/utils/CompassUtils'
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
    const added = new Set<Tile>()
    const onSight = new Map<string, Tile>()
    const visitMap: Map<number, Set<Tile>> = new Map()
    visitMap.set(this.sightRange, new Set([tile]))
    added.add(tile)

    let currentSight = this.sightRange
    while (currentSight >= 0) {
      // Iterating list of current sight
      // eslint-disable-next-line no-loop-func
      visitMap.get(currentSight)?.forEach((currentTile) => {
        if (!FieldOfVision.hasSightVisibility(tile, currentTile, onSight)) {
          return
        }
        onSight.set(currentTile.position.hash(), currentTile)
        currentTile.neighbors.forEach((neighbor, direction) => {
          const remainingSight = currentSight - CompassUtils.getCost(direction)
          if (remainingSight >= 0 && !added.has(neighbor)) {
            // Initialize list if it haven't already
            if (!visitMap.has(remainingSight)) {
              visitMap.set(remainingSight, new Set())
            }
            // Add neighbor to peding visit list
            visitMap.get(remainingSight)?.add(neighbor)
            added.add(neighbor)
          }
        })
      })
      currentSight -= 0.5
    }

    // Updating onSight to seen
    this.updateVisibility(onSight)
  }

  private static hasSightVisibility(
    target: Tile,
    current: Tile,
    partialSight: Map<string, Tile>
  ) {
    const directionToTarget = current.position.directionTo(target.position)
    // directionTo returns undefined if already at poition
    if (directionToTarget) {
      const neighbor = current.neighbors.get(directionToTarget)
      if (
        !neighbor ||
        neighbor.hasSightObstacle() ||
        !partialSight.has(neighbor.position.hash())
      ) {
        return false
      }
    }
    return true
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
