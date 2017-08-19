import React from 'react'
import PropTypes from 'prop-types'
import PlayerList from './PlayerList'
import DiceList from './DiceList'
import MoveSelector from './MoveSelector'
import MoveLog from './MoveLog'

export const Game = ({
                       players, activePlayerId, diceRolls, nextPlayer, rollDice, moveTypes, moves,
                       onDescriptionChange, pendingDescription, submitMove, onMoveChange, pendingMove
                     }) => {
  let config = { onDescriptionChange, pendingDescription, onMoveChange, pendingMove, moveTypes }
  return (
    <div style={{ margin: '0 auto' }}>
      <button className='btn btn-primary' onClick={() => rollDice(activePlayerId)}>
        Roll Dice
      </button>
      {' '}
      <button className='btn btn-secondary' onClick={nextPlayer}>
        Next Player
      </button>`
      <div className='row'>
        <div className='col-md-8'>
          <PlayerList players={players} activePlayerId={activePlayerId} />
          <MoveSelector
            {...config}
            submitMove={() => submitMove(activePlayerId, pendingMove, pendingDescription)} />
          <MoveLog moves={moves} nameMap={new Map(players.map((player) => [player.id, player.name]))} />
        </div>
        <div className='col-md-4'>
          <DiceList diceRolls={diceRolls} />
        </div>

      </div>
    </div>
  )
}
Game.propTypes = {
  players: PropTypes.array.isRequired,
  activePlayerId: PropTypes.number.isRequired,
  diceRolls: PropTypes.array.isRequired,
  moveTypes: PropTypes.array.isRequired,
  moves: PropTypes.array.isRequired,
  pendingDescription: PropTypes.string.isRequired,
  pendingMove: PropTypes.object.isRequired,
  submitMove: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onMoveChange: PropTypes.func.isRequired,
  rollDice: PropTypes.func.isRequired,
  nextPlayer: PropTypes.func.isRequired,
}

export default Game
