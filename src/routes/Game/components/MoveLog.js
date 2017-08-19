import React from 'react'
import PropTypes from 'prop-types'

export const MoveLog = ({ moves, nameMap }) => {
  let moveLog = moves.map((move, index) => {
    return (
      <li key={'move-' + index}>
        <div>
          {nameMap.get(move.playerId)} did {move.moveType.name} - {move.description}
        </div>
      </li>
    )
  })
  return (
    <div className='move-logs'>
      <ul>
        {moveLog}
      </ul>
    </div>
  )
}

MoveLog.propTypes = {
  moves: PropTypes.array.isRequired,
  nameMap: PropTypes.object.isRequired,
}

export default MoveLog
