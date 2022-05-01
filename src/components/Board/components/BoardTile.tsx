import { useMemo } from 'react'

import Tile from 'domain/Tile'

import { BoardTileContainer } from './styled'

type Props = {
  tile: Tile
  width: number
  height: number
}

function BoardTile({ tile, width, height }: Props) {
  const [x, y] = useMemo(() => {
    const startY = Math.floor(height / 2)
    const startX = (width % 2 === 0 ? 1 : 0) - Math.floor(width / 2)
    return [tile.position.x - startX, startY - tile.position.y]
  }, [tile, width, height])

  return (
    <BoardTileContainer x={x} y={y} className='isometric'>
      <span>{`[${tile.position.x}, ${tile.position.y}]`}</span>
    </BoardTileContainer>
  )
}

export default BoardTile
