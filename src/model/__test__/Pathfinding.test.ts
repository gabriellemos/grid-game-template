/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Board from 'model/Board'
import Position from 'model/Position'
import IContent from 'model/interface/IContent'
import Pathfinding from 'model/Pathfinding'

describe('Pathfinding test', () => {
  const obstacle: IContent = {
    isSightBlocker: () => true,
    isMovementBlocker: () => true,
  }

  describe('direct path until target', () => {
    const board = new Board(3, 3)

    it('straight line', () => {
      const origin = board.get(new Position(-1, 1))
      const target = board.get(new Position(1, 1))
      const path = Pathfinding.calculate(origin!, target!)

      expect(path![0]).toBe(origin)
      expect(path![1]).toBe(board.get(new Position(0, 1)))
      expect(path![2]).toBe(target)
    })

    it('running diagonals', () => {
      const origin = board.get(new Position(-1, 1))
      const target = board.get(new Position(1, -1))
      const path = Pathfinding.calculate(origin!, target!)

      expect(path![0]).toBe(origin)
      expect(path![1]).toBe(board.get(new Position(0, 0)))
      expect(path![2]).toBe(target)
    })
  })

  describe('with obstacles', () => {
    it('reachable target', () => {
      const board = new Board(3, 3)
      board.get(new Position(0, 0))!.content.push(obstacle)
      board.get(new Position(1, 0))!.content.push(obstacle)
      const origin = board.get(new Position(-1, 1))
      const target = board.get(new Position(1, -1))
      const path = Pathfinding.calculate(origin!, target!)

      expect(path![0]).toBe(origin)
      expect(path![1]).toBe(board.get(new Position(-1, 0)))
      expect(path![2]).toBe(board.get(new Position(0, -1)))
      expect(path![3]).toBe(target)
    })

    it('unreachable target', () => {
      const board = new Board(3, 3)
      board.get(new Position(-1, 0))!.content.push(obstacle)
      board.get(new Position(0, 0))!.content.push(obstacle)
      board.get(new Position(1, 0))!.content.push(obstacle)

      const origin = board.get(new Position(-1, 1))
      const target = board.get(new Position(1, -1))
      const path = Pathfinding.calculate(origin!, target!)

      expect(path).toBeUndefined()
    })
  })
})
