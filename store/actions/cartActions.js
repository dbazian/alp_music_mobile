export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = (song) => {
  return { type: ADD_TO_CART, song: song };
};

export const removeFromCart = (song) => {
  return { type: REMOVE_FROM_CART, sid: song.id };
};
