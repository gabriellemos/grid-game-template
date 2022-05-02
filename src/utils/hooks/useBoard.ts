import { useContext } from 'react'

import { BoardContext } from 'utils/context/BoardContext'

const useBoard = () => {
  const context = useContext(BoardContext)

  if (context === undefined) {
    throw new Error('useBoard was used outside of its Provider')
  }

  return context
}

export default useBoard
