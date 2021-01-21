import axios from "axios";

export const SEND_CONTACT_FORM = "SEND_CONTACT_FORM";

export const sendContactForm = contactItems => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await axios
      .post(`https://alp-music.firebaseio.com/contact.json?auth=${token}`, {
        contactItems,
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("error", error.message);
        }
        throw error;
      });
  };
};
