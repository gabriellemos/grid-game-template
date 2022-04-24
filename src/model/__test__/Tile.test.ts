import Compass from 'model/enum/Compass'
import Tile from 'model/Tile'

describe('Tile tests', () => {
  it('has default values as expected', () => {
    const tile = new Tile()

    expect(tile.id).not.toBeNull()
    expect(tile.neighbors).not.toBeNull()
  })

  it('setNeighbor update both tiles neighbors attribute', () => {
    const tileA = new Tile()
    const tileB = new Tile()
    tileA.setNeighbor(Compass.NORTH, tileB)

    expect(tileA.neighbors.get(Compass.NORTH)).toBe(tileB)
    expect(tileB.neighbors.get(Compass.SOUTH)).toBe(tileA)
  })

  it('setNeighbor add context to new neighbor [1]', () => {
    const tileN = new Tile()
    const tileNE = new Tile()
    const tileE = new Tile()

    tileN.setNeighbor(Compass.EAST, tileNE)
    tileNE.setNeighbor(Compass.SOUTH, tileE)

    expect(tileN.neighbors.get(Compass.EAST)).toBe(tileNE)
    expect(tileN.neighbors.get(Compass.SOUTHEAST)).toBe(tileE)
  })

  it('setNeighbor add context to new neighbor [2]', () => {
    const tileN = new Tile()
    const tileNE = new Tile()
    const tileE = new Tile()
    const tileSE = new Tile()
    const tileS = new Tile()
    const tileSW = new Tile()
    const tileW = new Tile()
    const tileNW = new Tile()

    tileN.setNeighbor(Compass.EAST, tileNE)
    tileNE.setNeighbor(Compass.SOUTH, tileE)
    tileE.setNeighbor(Compass.SOUTH, tileSE)
    tileSE.setNeighbor(Compass.WEST, tileS)
    tileS.setNeighbor(Compass.WEST, tileSW)
    tileSW.setNeighbor(Compass.NORTH, tileW)
    tileW.setNeighbor(Compass.NORTH, tileNW)
    tileNW.setNeighbor(Compass.EAST, tileN)

    // Relationships of North tile
    expect(tileN.neighbors.get(Compass.EAST)).toBe(tileNE)
    expect(tileN.neighbors.get(Compass.SOUTHEAST)).toBe(tileE)
    expect(tileN.neighbors.get(Compass.SOUTHWEST)).toBe(tileW)
    expect(tileN.neighbors.get(Compass.WEST)).toBe(tileNW)

    // Relationships of Northeast tile
    expect(tileNE.neighbors.get(Compass.SOUTH)).toBe(tileE)
    expect(tileNE.neighbors.get(Compass.WEST)).toBe(tileN)

    // Relationships of East tile
    expect(tileE.neighbors.get(Compass.SOUTH)).toBe(tileSE)
    expect(tileE.neighbors.get(Compass.SOUTHWEST)).toBe(tileS)
    expect(tileE.neighbors.get(Compass.NORTHWEST)).toBe(tileN)
    expect(tileE.neighbors.get(Compass.NORTH)).toBe(tileNE)

    // Relationships of Southeast tile
    expect(tileSE.neighbors.get(Compass.WEST)).toBe(tileS)
    expect(tileSE.neighbors.get(Compass.NORTH)).toBe(tileE)

    // Relationships of South tile
    expect(tileS.neighbors.get(Compass.WEST)).toBe(tileSW)
    expect(tileS.neighbors.get(Compass.NORTHWEST)).toBe(tileW)
    expect(tileS.neighbors.get(Compass.NORTHEAST)).toBe(tileE)
    expect(tileS.neighbors.get(Compass.EAST)).toBe(tileSE)

    // Relationships of Southeast tile
    expect(tileSW.neighbors.get(Compass.NORTH)).toBe(tileW)
    expect(tileSW.neighbors.get(Compass.EAST)).toBe(tileS)

    // Relationships of West tile
    expect(tileW.neighbors.get(Compass.NORTH)).toBe(tileNW)
    expect(tileW.neighbors.get(Compass.NORTHEAST)).toBe(tileN)
    expect(tileW.neighbors.get(Compass.SOUTHEAST)).toBe(tileS)
    expect(tileW.neighbors.get(Compass.SOUTH)).toBe(tileSW)

    // Relationships of Northwest tile
    expect(tileNW.neighbors.get(Compass.EAST)).toBe(tileN)
    expect(tileNW.neighbors.get(Compass.SOUTH)).toBe(tileW)
  })

  it('setNeighbor add context to new neighbor [3]', () => {
    const tileN = new Tile()
    const tileNE = new Tile()
    const tileE = new Tile()
    const tileSE = new Tile()
    const tileS = new Tile()
    const tileSW = new Tile()
    const tileW = new Tile()
    const tileNW = new Tile()

    tileN.setNeighbor(Compass.EAST, tileNE)
    tileNE.setNeighbor(Compass.SOUTH, tileE)
    tileE.setNeighbor(Compass.SOUTH, tileSE)
    tileSE.setNeighbor(Compass.WEST, tileS)
    tileS.setNeighbor(Compass.WEST, tileSW)
    tileSW.setNeighbor(Compass.NORTH, tileW)
    tileW.setNeighbor(Compass.NORTH, tileNW)
    tileNW.setNeighbor(Compass.EAST, tileN)

    const centerTile = new Tile()
    centerTile.setNeighbor(Compass.EAST, tileE)

    expect(centerTile.neighbors.get(Compass.NORTH)).toBe(tileN)
    expect(centerTile.neighbors.get(Compass.NORTHEAST)).toBe(tileNE)
    expect(centerTile.neighbors.get(Compass.EAST)).toBe(tileE)
    expect(centerTile.neighbors.get(Compass.SOUTHEAST)).toBe(tileSE)
    expect(centerTile.neighbors.get(Compass.SOUTH)).toBe(tileS)
    expect(centerTile.neighbors.get(Compass.SOUTHWEST)).toBe(tileSW)
    expect(centerTile.neighbors.get(Compass.WEST)).toBe(tileW)
    expect(centerTile.neighbors.get(Compass.NORTHWEST)).toBe(tileNW)
  })

  it('setNeighbor clear past relationships if overwritten', () => {
    const tileA = new Tile()
    const tileB = new Tile()
    const tileC = new Tile()
    tileA.setNeighbor(Compass.NORTH, tileB)
    tileA.setNeighbor(Compass.NORTH, tileC)

    expect(tileA.neighbors.get(Compass.NORTH)).toBe(tileC)
    expect(tileC.neighbors.get(Compass.SOUTH)).toBe(tileA)
    expect(tileB.neighbors.get(Compass.SOUTH)).toBeUndefined()
  })

  it('removeNeighbor update both tiles neighbors attribute', () => {
    const tileA = new Tile()
    const tileB = new Tile()
    tileA.setNeighbor(Compass.NORTH, tileB)
    tileA.removeNeighbor(Compass.NORTH)

    expect(tileA.neighbors.get(Compass.NORTH)).toBeUndefined()
    expect(tileB.neighbors.get(Compass.SOUTH)).toBeUndefined()
  })
})
