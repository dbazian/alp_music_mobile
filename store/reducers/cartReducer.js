import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";
import { ADD_ORDER } from "../actions/orderActions";
import CartModel from "../../models/CartModel";

const initialState = {
  items: [],
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedSong = action.song;
      const songId = addedSong.id;
      const songName = addedSong.name;
      const songGenre = addedSong.genre;
      const songMood = addedSong.mood;
      const songAudio = addedSong.audio;
      const songPrice = addedSong.price;
      const songLicense = addedSong.licenseType;

      let newCartItem;

      newCartItem = new CartModel(songId, songName, songGenre, songMood, songAudio, songPrice, songLicense);
      return {
        ...state,
        items: { ...state.items, [addedSong.id]: newCartItem },
        totalAmount: state.totalAmount + songPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.sid];
      let updatedCartItems;
      updatedCartItems = { ...state.items };
      delete updatedCartItems[action.sid];
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.price,
      };

    case ADD_ORDER:
      return initialState;

    default:
      return state;
  }
};
