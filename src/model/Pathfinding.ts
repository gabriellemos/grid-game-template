import Tile from 'model/Tile'

class Pathfinding {
  /**
   * Calculate minimal path between origin and target Tile.
   *
   * @param origin starting point.
   * @param target target point.
   * @returns calculated path or undefined if not reachable.
   */
  static calculate(origin: Tile, target: Tile) {
    const nodeCost = new Map<string, number>()
    const cameFrom = new Map<string, Tile>()
    const open = new Set<Tile>([origin])
    const closed = new Set<Tile>()

    // helper
    const getWithLowerCost = () => {
      let currentNode: Tile | undefined
      open.forEach((node) => {
        if (currentNode) {
          const currentCost = nodeCost.get(currentNode.position.hash()) || 0
          const tileCost = nodeCost.get(node.position.hash()) || 0
          if (tileCost < currentCost) {
            currentNode = node
          }
        } else {
          currentNode = node
        }
      })
      return currentNode
    }

    while (open.size > 0) {
      const current = getWithLowerCost()
      if (!current || current === target) {
        break
      }

      closed.add(current)
      open.delete(current)
      const currentCost =
        nodeCost.get(current.position.hash()) ||
        current.position.distance(target.position)

      // Checking neighboring tiles
      current.neighbors.forEach((neighbor) => {
        // Not visited and not blocked
        if (!closed.has(neighbor) && !neighbor.hasMovementBlocker()) {
          const oldCost =
            nodeCost.get(neighbor.position.hash()) || Number.MAX_VALUE
          const newCost =
            currentCost + neighbor.position.distance(target.position)
          // Not added yet to checklist or has lower cost than previous path
          if (!open.has(neighbor) || newCost < oldCost) {
            cameFrom.set(neighbor.position.hash(), current)
            nodeCost.set(neighbor.position.hash(), newCost)
            if (!open.has(neighbor)) open.add(neighbor)
          }
        }
      })
    }

    const path: Tile[] = []
    let current: Tile | undefined = target
    do {
      path.unshift(current)
      current = cameFrom.get(current.position.hash())
    } while (current)

    if (path[0] !== origin) {
      // target is unreachable
      return undefined
    }
    return path
  }
}

export default Pathfinding
