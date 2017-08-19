import React from 'react'
import PropTypes from 'prop-types'

export const MoveSelector = ({
                               onMoveChange, onDescriptionChange, pendingDescription,
                               pendingMove, submitMove, moveTypes
                             }) => {
  let handleChange = (e) => {
    let move = moveTypes.find((move) => move.id === e.target.value)
    onMoveChange(move)
  }
  let moves = moveTypes.map((move) => {
    return (
      <option key={move.id} value={move.id}>
        {move.name} - {move.cost}
      </option>
    )
  })
  return (
    <div className='move-selector'>
      <select onChange={handleChange}>
        {moves}
      </select>
      <input onChange={(e) => onDescriptionChange(e.target.value)} value={pendingDescription}/>
      <button onClick={submitMove}>Submit Move</button>
    </div>
  )
}

MoveSelector.propTypes = {
  pendingDescription: PropTypes.string.isRequired,
  submitMove: PropTypes.func.isRequired,
  moveTypes: PropTypes.array.isRequired,
  pendingMove: PropTypes.object.isRequired,
  onMoveChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
}

export default MoveSelector
