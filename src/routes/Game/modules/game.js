// ------------------------------------
// Constants
// ------------------------------------
export const NEXT_PLAYER = 'NEXT_PLAYER'
export const ROLL_DICE = 'ROLL_DICE'
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
export const SUBMIT_MOVE = 'SUBMIT_MOVE'
export const UPDATE_MOVE = 'UPDATE_MOVE'

// ------------------------------------
// Actions
// ------------------------------------

export function nextPlayer () {
  return {
    type: NEXT_PLAYER,
  }
}

export function rollDice (playerId) {
  return {
    type: ROLL_DICE,
    payload: playerId
  }
}

export function updateDescription (newDescription) {
  return {
    type: UPDATE_DESCRIPTION,
    payload: newDescription
  }
}

export function updateMove (newMove) {
  return {
    type: UPDATE_MOVE,
    payload: newMove
  }
}

export function submitMove (playerId, moveType, description) {
  return {
    type: SUBMIT_MOVE,
    payload: {
      playerId: playerId,
      moveType: moveType,
      description: description,
    }
  }
}

export const actions = {
  nextPlayer,
  rollDice,
  updateDescription,
  submitMove,
  updateMove,
}

function fairDiceRoll () {
  return Math.floor(Math.random() * 6) + 1
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NEXT_PLAYER]: (state, action) => {
    let currentActiveId = state.activePlayerId
    let currentIndex = state.players.findIndex((player) => player.id === currentActiveId)
    let newIndex = (currentIndex + 1) % state.players.length
    let newActiveId = state.players[newIndex].id
    return Object.assign({}, state, { activePlayerId: newActiveId })
  },
  [ROLL_DICE]: (state, action) => {
    let playerId = action.payload
    let die1 = fairDiceRoll()
    let die2 = fairDiceRoll()
    let playerName = state.players.find((player) => player.id === playerId).name
    let diceRolls = [{ playerName: playerName, die1: die1, die2: die2 }, ...state.diceRolls]
    console.log(playerName)
    let players = state.players.map((player) => {
      if (player.id !== playerId) {
        return player
      } else {
        let newPoints = player.points + die1 + die2
        return Object.assign({}, player, { points: newPoints })
      }
    })

    return { ...state, players: players, diceRolls: diceRolls }
  },
  [UPDATE_DESCRIPTION]: (state, action) => {
    return { ...state, pendingDescription: action.payload }
  },
  [UPDATE_MOVE]: (state, action) => {
    return { ...state, pendingMove: action.payload }
  },
  [SUBMIT_MOVE]: (state, action) => {
    let move = action.payload
    let playerIndex = state.players.findIndex((player) => move.playerId === player.id)
    let player = state.players[playerIndex]
    let newPlayer = Object.assign({}, player, { points: player.points - move.moveType.cost })
    let players = [...state.players.slice(0, playerIndex), newPlayer, ...state.players.slice(playerIndex + 1)]
    return Object.assign({}, state, { moves: [move, ...state.moves], players: players })
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  players: [
    {
      id: 1,
      name: 'Kevin',
      points: 12,
    },
    {
      id: 2,
      name: 'Dan',
      points: 2,
    },
    {
      id: 3,
      name: '???',
      points: 4,
    },
  ],
  moveTypes: [
    { id: 'shape-land', name: 'Shape Land', cost: 3, },
    { id: 'shape-climate', name: 'Shape Climate', cost: 2, },
  ],
  activePlayerId: 1,
  diceRolls: [],
  moves: [],
  pendingMove: { id: 'shape-land', name: 'Shape Land', cost: 3, },
  pendingDescription: '',
}
export default function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
