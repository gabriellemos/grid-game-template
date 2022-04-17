import Tile from 'model/Tile'
import Compass from 'model/enum/Compass'

type Neighborhood = {
  [key in Compass]?: Tile
}

export default Neighborhood
