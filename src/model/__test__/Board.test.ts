import Board from 'model/Board'
import Position from 'model/Position'

describe('Board tests', () => {
  it('Board generation', () => {
    const board = new Board(10, 10)
    expect(board.get(new Position(10, 4))).toBeUndefined()
    expect(board.get(new Position(-5, 4))).not.toBeUndefined()
    expect(board.get(new Position(4, 4))).not.toBeUndefined()
    expect(board.get(new Position(4, -5))).not.toBeUndefined()
    expect(board.get(new Position(-5, -5))).not.toBeUndefined()
  })
})
