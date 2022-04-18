import Tile from 'model/Tile'
import Compass from 'model/enum/Compass'

type DirectionMap = {
  [key in Compass]?: Tile
}

class Neighborhood {
  direction: DirectionMap

  constructor() {
    this.direction = {}
  }
}

export default Neighborhood
