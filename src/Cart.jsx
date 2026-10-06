function Cart({ cart, setCart }) {
  // Calculate total using quantity
  const total = cart.reduce(
    (sum, product) =>
      sum +
      Number(product.price) *
        Number(product.quantity),
    0
  );

  // Increase quantity
  const increaseQuantity = (product) => {
    if (
      Number(product.quantity) >=
      Number(product.stock)
    ) {
      return;
    }

    setCart(
      cart.map((item) =>
        item.product_id === product.product_id
          ? {
              ...item,
              quantity:
                Number(item.quantity) + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (product) => {
    if (Number(product.quantity) > 1) {
      setCart(
        cart.map((item) =>
          item.product_id === product.product_id
            ? {
                ...item,
                quantity:
                  Number(item.quantity) - 1,
              }
            : item
        )
      );
    } else {
      removeFromCart(product.product_id);
    }
  };

  // Remove product
  const removeFromCart = (productId) => {
    setCart(
      cart.filter(
        (item) => item.product_id !== productId
      )
    );
  };

  return (
    <div className="cart-page">

      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (

        <div className="empty-cart">
          <h2>🛒 Your cart is empty</h2>
          <p>Add some products to your cart.</p>
        </div>

      ) : (

        <>

          {/* CART PRODUCTS */}

          <div className="cart-container">

            {cart.map((product) => (

              <div
                className="cart-item"
                key={product.product_id}
              >

                {/* IMAGE */}

                <img
                  src={product.image_url}
                  alt={product.name}
                  className="cart-image"
                />

                {/* DETAILS */}

                <div className="cart-details">

                  <h2>{product.name}</h2>

                  <p>
                    {product.description}
                  </p>

                  <p>
                    Price: ₹
                    {Number(
                      product.price
                    ).toFixed(2)}
                  </p>

                  {/* QUANTITY */}

                  <div className="cart-quantity">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          product
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          product
                        )
                      }
                      disabled={
                        Number(
                          product.quantity
                        ) >=
                        Number(product.stock)
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* SUBTOTAL */}

                  <p className="cart-subtotal">
                    Subtotal: ₹
                    {(
                      Number(product.price) *
                      Number(product.quantity)
                    ).toFixed(2)}
                  </p>

                  {/* REMOVE */}

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(
                        product.product_id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* CART SUMMARY */}

          <div className="cart-summary">

            <h2>
              Total: ₹{total.toFixed(2)}
            </h2>

            <button className="checkout-button">
              Checkout
            </button>

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;