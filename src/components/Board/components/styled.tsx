import styled from 'styled-components'
import Color from 'color'

const tileSize = 60
const isometricSize = Math.sqrt(tileSize ** 2 * 2)
const tileBaseColor = '#e9e9e9'

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

  .break {
    flex-basis: 100%;
    height: 0px;
  }

  &.isometric {
    width: ${({ width }) => (width + 0.5) * isometricSize}px;
    height: ${({ height }) => (height / 2 + 0.5) * isometricSize}px;
  }
`

type TileProps = {
  x: number
  y: number
}

export const BoardTileContainer = styled.div<TileProps>`
  width: ${tileSize}px;
  height: ${tileSize}px;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  box-sizing: border-box;

  background-color: ${({ x, y }) => {
    let tileColor = new Color(tileBaseColor)
    if (x % 2 === y % 2) {
      tileColor = tileColor.lighten(0.05)
    } else {
      tileColor = tileColor.darken(0.05)
    }
    return tileColor.string()
  }};

  &.isometric {
    background-color: ${({ y }) => {
      let tileColor = new Color(tileBaseColor)
      tileColor = y % 2 === 0 ? tileColor.lighten(0.05) : tileColor.darken(0.05)
      return tileColor.string()
    }};
    transform: translate(
        ${({ x, y }) => `${(y % 2 === 0 ? 25 : 95) + 40 * x}%`},
        ${({ y }) => `${25 - 30 * y}%`}
      )
      rotate(45deg);
  }
`
