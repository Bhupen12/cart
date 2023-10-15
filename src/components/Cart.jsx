import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const img1 =
  "https://www.reliancedigital.in/medias/Apple-MGN63HNA-Laptops-491946461-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxNzczNDJ8aW1hZ2UvanBlZ3xpbWFnZXMvaDVhL2gyZC85NDQzMDgzNTgzNTE4LmpwZ3xhYzRiNWIxZGQ2NjNiNWIyYjI0Y2ZkYTZlZWQ3MTFjZTMxYzVmNDBiNmM5Mzk5OTM2OGVkZmExMjMyYjIxNDQ4";

const Cart = () => {
  const { cartItems, subTotal, shipping, tax, total } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch({
      type: "addToCart",
      payload: { id },
    });
    dispatch({ type: "calculateTotalPrice" });
  };
  const handleDecrement = (id) => {
    dispatch({
      type: "handleDecrement",
      payload: id,
    });
    dispatch({ type: "calculateTotalPrice" });
  };
  const handleDelete = (id) => {
    dispatch({
      type: "handleDelete",
      payload: id,
    });
    dispatch({ type: "calculateTotalPrice" });
  };

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => {
            return (
              <CartItem
                imgSrc={i.imgSrc}
                name={i.name}
                price={i.price}
                qty={i.quantity}
                decrement={handleDecrement}
                increment={handleIncrement}
                deleteHandler={handleDelete}
                id={i.id}
                key={i.id}
              />
            );
          })
        ) : (
          <h1>Not Items Yet</h1>
        )}
      </main>
      <aside>
        <h2>Subtotal: {subTotal}</h2>
        <h2>Shipping: {shipping}</h2>
        <h2>Tax: {tax}</h2>
        <h2>Total: {total}</h2>
      </aside>
    </div>
  );
};

const CartItem = ({
  imgSrc,
  name,
  price,
  qty,
  decrement,
  increment,
  deleteHandler,
  id,
}) => {
  return (
    <div className="cartItem">
      <img src={imgSrc} alt="item" />
      <article>
        <h3>{name}</h3>
        <p>${price}</p>
      </article>

      <div>
        <button onClick={() => decrement(id)}>-</button>
        <p>{qty}</p>
        <button onClick={() => increment(id)}>+</button>
      </div>

      <AiFillDelete
        onClick={() => {
          deleteHandler(id);
        }}
      />
    </div>
  );
};

export default Cart;
