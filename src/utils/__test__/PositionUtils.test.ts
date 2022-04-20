import Compass from 'model/enum/Compass'
import Position from 'model/Position'
import PositionUtils from 'utils/PositionUtils'

describe('PositionUtils test', () => {
  it('check toDirection results (++)', () => {
    const scenarioList: [Position, Compass][] = [
      [new Position(4, 7), Compass.NORTHEAST],
      [new Position(3, 6), Compass.NORTH],
      [new Position(3, 5), Compass.NORTHEAST],
      [new Position(2, 4), Compass.NORTH],
      [new Position(2, 3), Compass.NORTHEAST],
      [new Position(1, 2), Compass.NORTH],
      [new Position(1, 1), Compass.NORTHEAST],
    ]

    scenarioList.forEach((scenario) => {
      const [vector, result] = scenario
      expect(PositionUtils.generalDirection(vector)).toBe(result)
    })
  })

  it('check toDirection results (+-)', () => {
    const scenarioList: [Position, Compass][] = [
      [new Position(2, -9), Compass.SOUTH],
      [new Position(2, -8), Compass.SOUTH],
      [new Position(2, -7), Compass.SOUTH],
      [new Position(2, -6), Compass.SOUTH],
      [new Position(2, -5), Compass.SOUTH],
      [new Position(2, -4), Compass.SOUTH],
      [new Position(2, -3), Compass.SOUTHEAST],
      [new Position(1, -2), Compass.SOUTH],
      [new Position(1, -1), Compass.SOUTHEAST],
    ]

    scenarioList.forEach((scenario) => {
      const [vector, result] = scenario
      expect(PositionUtils.generalDirection(vector)).toBe(result)
    })
  })
})
