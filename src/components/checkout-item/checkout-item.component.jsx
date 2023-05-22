import { useDispatch, useSelector } from "react-redux";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles.jsx";

import { selectCartItems } from "../../store/cart/cart.selector.js";
import {
  addItemToCart,
  removeItemFromCart,
  deleteProductFromCart,
} from "../../store/cart/cart.action.js";

const CheckOutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);

  const removeItemFromCartHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));
  const addItemToCartHandler = () =>
    dispatch(addItemToCart(cartItems, cartItem));
  const deleteProductFromCartHandler = () =>
    dispatch(deleteProductFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemFromCartHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemToCartHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>

      <RemoveButton onClick={deleteProductFromCartHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckOutItem;
