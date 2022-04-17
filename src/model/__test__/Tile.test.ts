import Compass from 'model/enum/Compass'
import Visibility from 'model/enum/Visibility'
import Tile from 'model/Tile'

describe('Tile tests', () => {
  it('has default values as expected', () => {
    const tile = new Tile()

    expect(tile.id).not.toBeNull()
    expect(tile.neighbors).not.toBeNull()
    expect(tile.visibility).toBe(Visibility.Invisible)
  })

  it('setNeighbor update both tiles neighbors attribute', () => {
    const tileA = new Tile()
    const tileB = new Tile()
    tileA.setNeighbor(Compass.NORTH, tileB)

    expect(tileA.neighbors[Compass.NORTH]).toBe(tileB)
    expect(tileB.neighbors[Compass.SOUTH]).toBe(tileA)
  })

  it('setNeighbor clear past relationships if overwritten', () => {
    const tileA = new Tile()
    const tileB = new Tile()
    const tileC = new Tile()
    tileA.setNeighbor(Compass.NORTH, tileB)
    tileA.setNeighbor(Compass.NORTH, tileC)

    expect(tileA.neighbors[Compass.NORTH]).toBe(tileC)
    expect(tileC.neighbors[Compass.SOUTH]).toBe(tileA)
    expect(tileB.neighbors[Compass.SOUTH]).toBeUndefined()
  })

  it('removeNeighbor update both tiles neighbors attribute', () => {
    const tileA = new Tile()
    const tileB = new Tile()
    tileA.setNeighbor(Compass.NORTH, tileB)
    tileA.removeNeighbor(Compass.NORTH)

    expect(tileA.neighbors[Compass.NORTH]).toBeUndefined()
    expect(tileB.neighbors[Compass.SOUTH]).toBeUndefined()
  })
})
