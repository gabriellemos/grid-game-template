import Compass from 'model/enum/Compass'
import Visibility from 'model/enum/Visibility'
import Tile from 'model/Tile'

describe('Tile tests', () => {
  it('has default values as expected', () => {
    const tile = new Tile()

    expect(tile.id).not.toBeNull()
    expect(tile.neighbors.direction).not.toBeNull()
    expect(tile.visibility).toBe(Visibility.Invisible)
  })

  it('setNeighbor update both tiles neighbors attribute', () => {
    const tileA = new Tile()
    const tileB = new Tile()
    tileA.setNeighbor(Compass.NORTH, tileB)

    expect(tileA.neighbors.direction[Compass.NORTH]).toBe(tileB)
    expect(tileB.neighbors.direction[Compass.SOUTH]).toBe(tileA)
  })

  it('setNeighbor add context to new neighbor [1]', () => {
    const tileN = new Tile()
    const tileNE = new Tile()
    const tileE = new Tile()

    tileN.setNeighbor(Compass.EAST, tileNE)
    tileNE.setNeighbor(Compass.SOUTH, tileE)

    expect(tileN.neighbors.direction[Compass.EAST]).toBe(tileNE)
    expect(tileN.neighbors.direction[Compass.SOUTHEAST]).toBe(tileE)
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
    expect(tileN.neighbors.direction[Compass.EAST]).toBe(tileNE)
    expect(tileN.neighbors.direction[Compass.SOUTHEAST]).toBe(tileE)
    expect(tileN.neighbors.direction[Compass.SOUTHWEST]).toBe(tileW)
    expect(tileN.neighbors.direction[Compass.WEST]).toBe(tileNW)

    // Relationships of Northeast tile
    expect(tileNE.neighbors.direction[Compass.SOUTH]).toBe(tileE)
    expect(tileNE.neighbors.direction[Compass.WEST]).toBe(tileN)

    // Relationships of East tile
    expect(tileE.neighbors.direction[Compass.SOUTH]).toBe(tileSE)
    expect(tileE.neighbors.direction[Compass.SOUTHWEST]).toBe(tileS)
    expect(tileE.neighbors.direction[Compass.NORTHWEST]).toBe(tileN)
    expect(tileE.neighbors.direction[Compass.NORTH]).toBe(tileNE)

    // Relationships of Southeast tile
    expect(tileSE.neighbors.direction[Compass.WEST]).toBe(tileS)
    expect(tileSE.neighbors.direction[Compass.NORTH]).toBe(tileE)

    // Relationships of South tile
    expect(tileS.neighbors.direction[Compass.WEST]).toBe(tileSW)
    expect(tileS.neighbors.direction[Compass.NORTHWEST]).toBe(tileW)
    expect(tileS.neighbors.direction[Compass.NORTHEAST]).toBe(tileE)
    expect(tileS.neighbors.direction[Compass.EAST]).toBe(tileSE)

    // Relationships of Southeast tile
    expect(tileSW.neighbors.direction[Compass.NORTH]).toBe(tileW)
    expect(tileSW.neighbors.direction[Compass.EAST]).toBe(tileS)

    // Relationships of West tile
    expect(tileW.neighbors.direction[Compass.NORTH]).toBe(tileNW)
    expect(tileW.neighbors.direction[Compass.NORTHEAST]).toBe(tileN)
    expect(tileW.neighbors.direction[Compass.SOUTHEAST]).toBe(tileS)
    expect(tileW.neighbors.direction[Compass.SOUTH]).toBe(tileSW)

    // Relationships of Northwest tile
    expect(tileNW.neighbors.direction[Compass.EAST]).toBe(tileN)
    expect(tileNW.neighbors.direction[Compass.SOUTH]).toBe(tileW)
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

    expect(centerTile.neighbors.direction[Compass.NORTH]).toBe(tileN)
    expect(centerTile.neighbors.direction[Compass.NORTHEAST]).toBe(tileNE)
    expect(centerTile.neighbors.direction[Compass.EAST]).toBe(tileE)
    expect(centerTile.neighbors.direction[Compass.SOUTHEAST]).toBe(tileSE)
    expect(centerTile.neighbors.direction[Compass.SOUTH]).toBe(tileS)
    expect(centerTile.neighbors.direction[Compass.SOUTHWEST]).toBe(tileSW)
    expect(centerTile.neighbors.direction[Compass.WEST]).toBe(tileW)
    expect(centerTile.neighbors.direction[Compass.NORTHWEST]).toBe(tileNW)
  })

  it('setNeighbor clear past relationships if overwritten', () => {
    const tileA = new Tile()
    const tileB = new Tile()
    const tileC = new Tile()
    tileA.setNeighbor(Compass.NORTH, tileB)
    tileA.setNeighbor(Compass.NORTH, tileC)

    expect(tileA.neighbors.direction[Compass.NORTH]).toBe(tileC)
    expect(tileC.neighbors.direction[Compass.SOUTH]).toBe(tileA)
    expect(tileB.neighbors.direction[Compass.SOUTH]).toBeUndefined()
  })

  it('removeNeighbor update both tiles neighbors attribute', () => {
    const tileA = new Tile()
    const tileB = new Tile()
    tileA.setNeighbor(Compass.NORTH, tileB)
    tileA.removeNeighbor(Compass.NORTH)

    expect(tileA.neighbors.direction[Compass.NORTH]).toBeUndefined()
    expect(tileB.neighbors.direction[Compass.SOUTH]).toBeUndefined()
  })
})
