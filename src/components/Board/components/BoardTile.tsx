import Tile from 'domain/Tile'

import { BoardTileContainer } from './styled'

type Props = {
  tile: Tile
}

function BoardTile({ tile }: Props) {
  return (
    <BoardTileContainer>
      [{tile.position.x}, {tile.position.y}]
    </BoardTileContainer>
  )
}

export default BoardTile
