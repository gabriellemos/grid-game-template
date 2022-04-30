import { isEqual } from 'lodash'

import Tile from 'domain/Tile'
import BoardUtils from 'domain/utils/BoardUtils'
import Position from 'domain/Position'

class Board {
  width: number

  height: number

  origin: Tile

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.origin = new Tile()

    BoardUtils.generateBoard(this.origin, width, height)
  }

  get(target: Position) {
    let current: Tile | undefined = this.origin
    while (current && !isEqual(current.position, target)) {
      const direction = current.position.directionTo(target)
      current = direction ? current.neighbors.get(direction) : undefined
    }
    return current
  }
}

export default Board
