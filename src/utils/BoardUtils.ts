import Compass from 'model/enum/Compass'
import Tile from 'model/Tile'

class BoardUtils {
  /**
   * It takes the 'solo' center piece of the board and generate all tiles
   * around it. Complete with all relationship between tiles.
   *
   * @param origin center piece of the board
   * @param width number of tiles on horizontal axis
   * @param height number of tiles on vertical axis
   */
  static generateBoard(origin: Tile, width: number, height: number) {
    let previous: Tile | undefined
    let firstOfLine: Tile | undefined
    const halfX = Math.floor(width / 2)
    const halfY = Math.floor(height / 2)
    const startX = width % 2 === 0 ? 1 - halfX : -halfX
    const finishY = height % 2 === 0 ? 1 - halfY : -halfY
    for (let y = halfY; y >= finishY; y -= 1) {
      for (let x = startX; x <= halfX; x += 1) {
        // Creating new Tile or using center tile
        const current = x === y && x === 0 ? origin : new Tile(x, y)
        if (x === startX) {
          // At the start of each 'line'
          if (firstOfLine) {
            current.setNeighbor(Compass.NORTH, firstOfLine)
          }
          firstOfLine = current
        } else if (previous) {
          // At each iteration
          current.setNeighbor(Compass.WEST, previous)
        }
        previous = current
      }
    }
  }
}

export default BoardUtils
