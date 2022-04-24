/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Board from 'model/Board'
import Position from 'model/Position'
import FieldOfVision from 'model/FieldOfVision'
import Visibility from 'model/enum/Visibility'
import IContent from 'model/interface/IContent'

describe('FieldOfVision test', () => {
  describe('moving diagonaly has a higher cost', () => {
    it('FOV range of 1', () => {
      const board = new Board(3, 3)
      const fov = new FieldOfVision(1)
      fov.recalculateFrom(board.origin)

      const visible = [
        new Position(0, 0),
        new Position(1, 0),
        new Position(0, 1),
        new Position(-1, 0),
        new Position(0, -1),
      ]

      visible.forEach((position) => {
        expect(fov.getTileVisibility(position)).toBe(Visibility.Visible)
      })

      const invisible = [
        new Position(-1, -1),
        new Position(-1, 1),
        new Position(1, -1),
        new Position(1, 1),
      ]
      invisible.forEach((position) => {
        expect(fov.getTileVisibility(position)).toBe(Visibility.Invisible)
      })
    })

    it('FOV range of 3', () => {
      const board = new Board(5, 5)
      const fov = new FieldOfVision(3)
      fov.recalculateFrom(board.origin)

      const expected = [
        // Only diagonal positions here
        new Position(-1, -1),
        new Position(-1, 1),
        new Position(-2, -2),
        new Position(-2, 2),
        new Position(1, -1),
        new Position(1, 1),
        new Position(2, -2),
        new Position(2, 2),
      ]

      expected.forEach((position) => {
        expect(fov.getTileVisibility(position)).toBe(Visibility.Visible)
      })
    })
  })

  describe('on sight tiles can become seen tiles', () => {
    it('all tiles converted', () => {
      const board = new Board(3, 3)
      const fov = new FieldOfVision(1)
      fov.recalculateFrom(board.get(new Position(-1, -1))!)
      fov.recalculateFrom(board.get(new Position(1, 1))!)

      const visible = [
        new Position(0, 1),
        new Position(1, 1),
        new Position(1, 0),
      ]
      visible.forEach((position) => {
        expect(fov.getTileVisibility(position)).toBe(Visibility.Visible)
      })

      const seen = [
        new Position(-1, 0),
        new Position(-1, -1),
        new Position(0, -1),
      ]
      seen.forEach((position) => {
        expect(fov.getTileVisibility(position)).toBe(Visibility.Seen)
      })
    })

    it('some tiles converted', () => {
      const board = new Board(3, 3)
      const fov = new FieldOfVision(1)
      fov.recalculateFrom(board.get(new Position(-1, 1))!)
      fov.recalculateFrom(board.get(new Position(1, 1))!)

      const visible = [
        new Position(0, 1),
        new Position(1, 1),
        new Position(1, 0),
      ]
      visible.forEach((position) => {
        expect(fov.getTileVisibility(position)).toBe(Visibility.Visible)
      })

      const seen = [new Position(-1, 1), new Position(-1, 0)]
      seen.forEach((position) => {
        expect(fov.getTileVisibility(position)).toBe(Visibility.Seen)
      })
    })
  })

  describe('tile with obstacle can limit FOV', () => {
    const obstacle: IContent = {
      isSightBlocker: () => true,
      isMovementBlocker: () => true,
    }
    it('tile with obstacle are marked as on sight', () => {
      const board = new Board(3, 3)
      const fov = new FieldOfVision(3)
      board.origin.content.push(obstacle)
      fov.recalculateFrom(board.get(new Position(1, 1))!)

      const visible = [
        new Position(-1, 1),
        new Position(0, 1),
        new Position(1, 1),
        new Position(0, 0),
        new Position(1, 0),
        new Position(1, -1),
      ]
      visible.forEach((position) => {
        expect(fov.getTileVisibility(position)).toBe(Visibility.Visible)
      })

      const invisible = [
        new Position(-1, 0),
        new Position(-1, -1),
        new Position(0, -1),
      ]
      invisible.forEach((position) => {
        expect(fov.getTileVisibility(position)).toBe(Visibility.Invisible)
      })
    })

    it('tile with obstacle provide cover to other tiles', () => {
      const board = new Board(2, 5)
      const fov = new FieldOfVision(5)
      board.get(new Position(0, -1))?.content.push(obstacle)
      fov.recalculateFrom(board.get(new Position(-1, -2))!)

      const visible = [
        new Position(-1, -2),
        new Position(-1, -1),
        new Position(-1, 0),
        new Position(-1, 1),
        new Position(-1, 2),
        new Position(0, -2),
        new Position(0, -1),
      ]
      visible.forEach((position) => {
        expect(fov.getTileVisibility(position)).toBe(Visibility.Visible)
      })

      const invisible = [
        new Position(0, 0),
        new Position(0, 1),
        new Position(0, 2),
      ]
      invisible.forEach((position) => {
        expect(fov.getTileVisibility(position)).toBe(Visibility.Invisible)
      })
    })
  })
})
