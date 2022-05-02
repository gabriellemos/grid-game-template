import React, {
  ComponentType,
  useState,
  useMemo,
  useCallback,
  createContext,
} from 'react'

import Board from 'domain/Board'

type ContextType = {
  createBoard: (width: number, height: number) => Board
  board?: Board
}

export const BoardContext = createContext<ContextType>({
  createBoard: (width: number, height: number) => new Board(width, height),
})

const withBoardContext = <P extends object>(Component: ComponentType<P>) => {
  return function WithBoardContext(props: P) {
    const [board, setBoard] = useState<Board | undefined>()

    const createBoard = useCallback(
      (width: number, height: number) => {
        const nBoard = new Board(width, height)
        setBoard(nBoard)
        return nBoard
      },
      [setBoard]
    )

    const value = useMemo(() => {
      return { board, createBoard }
    }, [board, createBoard])

    return (
      <BoardContext.Provider value={value}>
        {React.createElement(Component, props)}
      </BoardContext.Provider>
    )
  }
}

export default withBoardContext
