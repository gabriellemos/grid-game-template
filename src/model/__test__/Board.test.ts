import Board from 'model/Board'
import Position from 'model/Position'

describe('Board tests', () => {
  it('Board generation 2x2', () => {
    const board = new Board(2, 2)
    expect(board.get(new Position(0, 0))).not.toBeUndefined()
    expect(board.get(new Position(1, 0))).not.toBeUndefined()
    expect(board.get(new Position(0, 1))).not.toBeUndefined()
    expect(board.get(new Position(1, 1))).not.toBeUndefined()
    expect(board.get(new Position(0, 2))).toBeUndefined()
    expect(board.get(new Position(0, -2))).toBeUndefined()
    expect(board.get(new Position(2, 0))).toBeUndefined()
    expect(board.get(new Position(-2, 0))).toBeUndefined()
  })

  it('Board generation 2x5', () => {
    const board = new Board(2, 5)
    expect(board.get(new Position(0, 2))).not.toBeUndefined()
    expect(board.get(new Position(1, 2))).not.toBeUndefined()
    expect(board.get(new Position(0, -2))).not.toBeUndefined()
    expect(board.get(new Position(1, -2))).not.toBeUndefined()
    expect(board.get(new Position(-1, 0))).toBeUndefined()
    expect(board.get(new Position(2, 0))).toBeUndefined()
    expect(board.get(new Position(0, 3))).toBeUndefined()
    expect(board.get(new Position(0, -3))).toBeUndefined()
  })

  it('Board generation 5x5', () => {
    const board = new Board(5, 5)
    expect(board.get(new Position(2, 2))).not.toBeUndefined()
    expect(board.get(new Position(2, -2))).not.toBeUndefined()
    expect(board.get(new Position(-2, -2))).not.toBeUndefined()
    expect(board.get(new Position(-2, 2))).not.toBeUndefined()
    expect(board.get(new Position(0, 3))).toBeUndefined()
    expect(board.get(new Position(0, -3))).toBeUndefined()
    expect(board.get(new Position(3, 0))).toBeUndefined()
    expect(board.get(new Position(-3, 0))).toBeUndefined()
  })
})
