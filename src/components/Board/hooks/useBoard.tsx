import { useState, useEffect } from 'react'
import Board from 'domain/Board'

const useBoard = (width: number, height: number) => {
  const [board, setBoard] = useState<Board | undefined>()

  useEffect(() => {
    setBoard(new Board(width, height))
  }, [])

  return board
}

export default useBoard
