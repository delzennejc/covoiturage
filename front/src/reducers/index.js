import {
  getGiftsService,
  addGiftService,
  removeGiftService,
  sendGiftsService
} from '../services'

// ACTIONS
export const GET_GIFTS_SUCCESS = "GET_GIFTS_SUCCESS"
export const ADD_GIFT_SUCCESS = "ADD_GIFT_SUCCESS"
export const REMOVE_GIFT_SUCCESS = "REMOVE_GIFT_SUCCESS"
export const SEND_GIFTS_SUCCESS = "SEND_GIFTS_SUCCESS"
export const CHANGE_GIFT_NAME = "CHANGE_GIFT_NAME"
export const CLEAR_FORM = "CLEAR_FORM"
export const LOADING = "LOADING"

const initialState = {
  loading: false,
  gifts: [],
  message: '',
  form: {
    giftName: ''
  }
}
 // REDUCERS
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GIFTS_SUCCESS:
      return {
        ...state,
        gifts: [...action.payload]
      }
    case ADD_GIFT_SUCCESS:
      return {
        ...state,
        gifts: [action.gift, ...state.gifts]
      }
    case REMOVE_GIFT_SUCCESS:
      return {
        ...state,
        gifts: state.gifts.filter(g => g._id !== action.deletedGift._id)
      }
    case SEND_GIFTS_SUCCESS:
      return {
        ...state,
        message: action.message
      }
    case CHANGE_GIFT_NAME:
      return {
        ...state,
        form: {
          ...state.form,
          giftName: action.giftName
        }
      }
    case LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case CLEAR_FORM:
      return {
        ...state,
        form: initialState.form
      }
    default:
      return state
  }
}

// ACTION CREATORS
export const changeGiftName = (giftName) => ({
  type: CHANGE_GIFT_NAME,
  giftName
})

// THUNK ACTION CREATORS
export const getGifts = () => {
  return async (dispatch) => {
    const gifts = await getGiftsService()
    dispatch({
      type: GET_GIFTS_SUCCESS,
      payload: gifts.reverse()
    })
  }
}

export const addGift = () => {
  return async (dispatch, getState) => {
    const newGift = getState().form
    dispatch({ type: CLEAR_FORM })
    if (!newGift.giftName) return
    dispatch({ type: LOADING })
    const gift = await addGiftService(newGift)
    dispatch({ type: LOADING })
    dispatch({
      type: ADD_GIFT_SUCCESS,
      gift
    })
  }
}

export const removeGift = (id) => {
  return async (dispatch) => {
    dispatch({ type: LOADING })
    const deletedGift = await removeGiftService(id)
    dispatch({
      type: REMOVE_GIFT_SUCCESS,
      deletedGift
    })
    dispatch({ type: LOADING })
  }
}

export const sendGifts = () => {
  return async (dispatch) => {
    const { message } = await sendGiftsService()
    dispatch({
      type: SEND_GIFTS_SUCCESS,
      message
    })
  }
}