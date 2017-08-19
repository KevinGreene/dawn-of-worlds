import React from 'react'
import PropTypes from 'prop-types'

function getDiceRollMessage (diceRoll, keyModifier) {
  let total = diceRoll.die1 + diceRoll.die2
  let punctuation = total < 5 ? '... :(' : '!'
  let message = diceRoll.playerName + ' rolled a ' + total + punctuation +
    ' (' + diceRoll.die1 + ' + ' + diceRoll.die2 + ')'
  return (<li key={'dice-roll-' + keyModifier}>{message}</li>)
}

export const DiceList = ({ diceRolls }) => {
  let diceList = diceRolls.map((diceRoll, i) => getDiceRollMessage(diceRoll, i))
  return (
    <div className='dice-container'>
      Dice Rolls: {diceRolls.length}
      <ul className='dice-list'>
        {diceList}
      </ul>
    </div>
  )
}

DiceList.propTypes = {
  diceRolls: PropTypes.array,
}

export default DiceList
