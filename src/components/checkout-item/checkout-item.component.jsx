import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckOutItem = ({ cartItem }) => {
  const { addItemToCart, removeItemFromCart, deleteProductFromCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  const removeItemFromCartHandler = () => removeItemFromCart(cartItem);
  const addItemToCartHandler = () => addItemToCart(cartItem);
  const deleteProductFromCartHandler = () => deleteProductFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemFromCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>

      <span className="remove-button" onClick={deleteProductFromCartHandler}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckOutItem;
