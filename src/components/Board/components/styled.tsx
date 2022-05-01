import styled from 'styled-components'

const tileSize = 50

type BoardProps = {
  width: number
  height: number
}

export const BoardContainer = styled.div<BoardProps>`
  width: ${({ width }) => width * tileSize}px;
  height: ${({ height }) => height * tileSize}px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const BoardTileContainer = styled.div`
  width: ${tileSize}px;
  height: ${tileSize}px;

  display: flex;
  align-items: center;
  justify-content: center;
`
