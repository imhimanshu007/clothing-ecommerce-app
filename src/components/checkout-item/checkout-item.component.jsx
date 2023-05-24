import { useDispatch } from "react-redux";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles.jsx";

import {
  addItemToCart,
  removeItemFromCart,
  deleteProductFromCart,
} from "../../store/cart/cart.reducer";

const CheckOutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;

  const removeItemFromCartHandler = () =>
    dispatch(removeItemFromCart(cartItem));

  const addItemToCartHandler = () => dispatch(addItemToCart(cartItem));

  const deleteProductFromCartHandler = () =>
    dispatch(deleteProductFromCart(cartItem));

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
