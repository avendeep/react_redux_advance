import { UIActions } from "./UI-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-423f4-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch cart data.");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        UIActions.showNotification({
          status: "error",
          title: "Error!!",
          message: "Fetching cart data failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      UIActions.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending tofirebase",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-423f4-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response) {
        throw new Error("Sending to firebase failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        UIActions.showNotification({
          status: "success",
          title: "Success!!",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        UIActions.showNotification({
          status: "error",
          title: "Error!!",
          message: "Somehting went wrong",
        })
      );
    }
  };
};
