import React from 'react'
import PropTypes from 'prop-types'

export const PlayerDisplay = ({ player, activePlayerId }) => (
  <div className={'player' + (player.id === activePlayerId ? ' active-player' : ' inactive-player')}>
    <div className='player-name'>{player.name}</div>
    <div className='player-points'>{player.points}</div>
  </div>
)
PlayerDisplay.propTypes = {
  player: PropTypes.object,
  activePlayerId: PropTypes.number,
}

export default PlayerDisplay
