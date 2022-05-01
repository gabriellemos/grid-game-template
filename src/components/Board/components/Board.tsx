import React, { useMemo } from 'react'

import Tile from 'domain/Tile'
import Position from 'domain/Position'
import Compass from 'domain/enum/Compass'

import BoardTile from './BoardTile'
import { BoardContainer } from './styled'
import useBoard from '../hooks/useBoard'

type Props = {
  width: number
  height: number
}

function Board({ width, height }: Props) {
  const board = useBoard(width, height)

  const tileList = useMemo(() => {
    // Finding top-left most tile
    const startY = Math.floor(height / 2)
    const startX = (width % 2 === 0 ? 1 : 0) - Math.floor(width / 2)
    let currentY = board?.get(new Position(startX, startY))

    const localList: Tile[] = []
    while (currentY) {
      localList.push(currentY)
      // Adding all tiles with same Y value
      let currentX = currentY.neighbors.get(Compass.EAST)
      while (currentX) {
        localList.push(currentX)
        currentX = currentX.neighbors.get(Compass.EAST)
      }
      // Adding all tiles with same X value
      currentY = currentY.neighbors.get(Compass.SOUTH)
    }
    return localList
  }, [board])

  return (
    <BoardContainer width={width} height={height} className='isometric'>
      {tileList.map((tile, index) => {
        return (
          <React.Fragment key={tile.position.hash()}>
            <BoardTile tile={tile} width={width} height={height} />
            {(index + 1) % width === 0 && <div className='break' />}
          </React.Fragment>
        )
      })}
    </BoardContainer>
  )
}

export default Board
