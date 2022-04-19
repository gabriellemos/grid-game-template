import Tile from 'model/Tile'
import BoardUtils from 'utils/BoardUtils'

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
}

export default Board
