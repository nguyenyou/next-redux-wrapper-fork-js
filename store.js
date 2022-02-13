import { createStore } from 'redux'

const initialState = {
  value: 0,
}

// counter reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, value: state.value + 1 }
    case 'DECREMENT':
      return { ...state, value: state.value - 1 }
    case 'SPECIAL_CASE':
      console.log('SPECIAL_CASE', action.payload)
      return { ...state, value: action.payload.value }
    default:
      return state
  }
}

export const store = createStore(reducer)

export const makeStore = () => {
  return createStore(reducer)
}
