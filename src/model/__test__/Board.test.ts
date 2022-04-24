import Board from 'model/Board'
import Position from 'model/Position'

describe('Board tests', () => {
  it('Board generation', () => {
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
