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
    const halfX = Math.ceil(width / 2)
    const halfY = Math.ceil(height / 2)
    for (let y = halfY - 1; y >= -halfY; y -= 1) {
      for (let x = -halfX; x < halfX; x += 1) {
        // Creating new Tile or using center tile
        const current = x === y && x === 0 ? origin : new Tile(x, y)
        if (x === -halfX) {
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
