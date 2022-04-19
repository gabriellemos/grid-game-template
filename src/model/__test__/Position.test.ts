import Compass from 'model/enum/Compass'
import Position from '../Position'

describe('Position tests', () => {
  it('distance between two points', () => {
    expect(new Position(0, 0).distance(new Position(0, 0))).toBe(0)
    expect(new Position(10, 0).distance(new Position(20, 0))).toBe(10)
    expect(new Position(-10, 0).distance(new Position(10, 0))).toBe(20)
    expect(new Position(0, 10).distance(new Position(0, 20))).toBe(10)
    expect(new Position(0, -10).distance(new Position(0, 10))).toBe(20)
    expect(new Position(3, 5).distance(new Position(6, 1))).toBe(5)
    expect(new Position(-3, 2).distance(new Position(3, -2))).toBe(
      2 * Math.sqrt(13)
    )
  })

  it('direction from pointA to pointB', () => {
    const pointA = new Position(0, 0)
    expect(pointA.directionTo(new Position(0, 5))).toBe(Compass.NORTH)
    expect(pointA.directionTo(new Position(5, 5))).toBe(Compass.NORTHEAST)
    expect(pointA.directionTo(new Position(5, 0))).toBe(Compass.EAST)
    expect(pointA.directionTo(new Position(5, -5))).toBe(Compass.SOUTHEAST)
    expect(pointA.directionTo(new Position(0, -5))).toBe(Compass.SOUTH)
    expect(pointA.directionTo(new Position(-5, -5))).toBe(Compass.SOUTHWEST)
    expect(pointA.directionTo(new Position(-5, 0))).toBe(Compass.WEST)
    expect(pointA.directionTo(new Position(-5, 5))).toBe(Compass.NORTHWEST)
  })
})
