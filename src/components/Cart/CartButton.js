import { useDispatch, useSelector } from "react-redux";
import { UIActions } from "../../store/UI-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalCartItems = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(UIActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalCartItems}</span>
    </button>
  );
};

export default CartButton;
