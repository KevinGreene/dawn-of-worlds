import React from 'react'
import PropTypes from 'prop-types'
import PlayerDisplay from './PlayerDisplay'

export const PlayerList = ({ players, activePlayerId }) => {
  let playerList = players.map((player) => (
    <PlayerDisplay key={player.id} player={player} activePlayerId={activePlayerId}/>)
  )
  return (
    <div className='player-list'>
      <div>Count: {players.length}</div>
      {playerList}
    </div>
  )
}

PlayerList.propTypes = {
  players: PropTypes.array,
  activePlayerId: PropTypes.number,
}

export default PlayerList
