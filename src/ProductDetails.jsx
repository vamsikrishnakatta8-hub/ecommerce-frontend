import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails({ cart, setCart }) {
  const { productId } = useParams();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);

        const selectedProduct = data.find(
          (item) =>
            String(item.product_id) ===
            String(productId)
        );

        setProduct(selectedProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Product details error:",
          error
        );
        setLoading(false);
      });
  }, [productId]);

  const addToCart = () => {
    if (!product) {
      return;
    }

    setCart((previousCart) => {
      const existingProduct =
        previousCart.find(
          (item) =>
            item.product_id ===
            product.product_id
        );

      if (existingProduct) {
        const newQuantity =
          Number(existingProduct.quantity) +
          Number(quantity);

        if (
          newQuantity >
          Number(product.stock)
        ) {
          return previousCart;
        }

        return previousCart.map((item) =>
          item.product_id ===
          product.product_id
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: Number(quantity),
        },
      ];
    });
  };

  if (loading) {
    return (
      <div className="details-loading">
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found</h1>

        <Link to="/products">
          ← Back to Products
        </Link>
      </div>
    );
  }

  // Related products from the same category
  const relatedProducts = products.filter(
    (item) =>
      item.category === product.category &&
      item.product_id !== product.product_id
  );

  const cartProduct = cart.find(
    (item) =>
      item.product_id === product.product_id
  );

  const cartQuantity = cartProduct
    ? Number(cartProduct.quantity)
    : 0;

  return (
    <div className="product-details-page">

      {/* BACK */}

      <Link
        to="/products"
        className="back-products"
      >
        ← Back to Products
      </Link>

      {/* MAIN PRODUCT */}

      <section className="product-details">

        {/* IMAGE */}

        <div className="details-image-section">

          <div className="details-image-box">

            <img
              src={product.image_url}
              alt={product.name}
              className="details-image"
            />

          </div>

          <div className="details-badges">

            <span>
              {product.category}
            </span>

            {product.subcategory && (
              <span>
                {product.subcategory}
              </span>
            )}

          </div>

        </div>

        {/* INFORMATION */}

        <div className="details-content">

          <p className="details-category">
            {product.category}
          </p>

          <h1>
            {product.name}
          </h1>

          <div className="details-rating">

            ⭐⭐⭐⭐⭐

            <span>
              4.8 (124 Reviews)
            </span>

          </div>

          <p className="details-price">
            ₹
            {Number(
              product.price
            ).toFixed(2)}
          </p>

          <p className="details-description">
            {product.description}
          </p>

          {/* PRODUCT INFORMATION */}

          <div className="details-info">

            <div>
              <strong>
                Availability
              </strong>

              <span
                className={
                  Number(product.stock) > 0
                    ? "in-stock"
                    : "out-stock"
                }
              >
                {Number(product.stock) > 0
                  ? `✓ ${product.stock} in stock`
                  : "✕ Out of stock"}
              </span>
            </div>

            <div>
              <strong>
                Category
              </strong>

              <span>
                {product.category}
              </span>
            </div>

          </div>

          {/* QUANTITY */}

          {Number(product.stock) > 0 && (
            <>

              <div className="details-quantity">

                <label>
                  Quantity
                </label>

                <select
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Number(e.target.value)
                    )
                  }
                >

                  {Array.from(
                    {
                      length:
                        Number(
                          product.stock
                        ),
                    },
                    (_, index) =>
                      index + 1
                  ).map((number) => (

                    <option
                      key={number}
                      value={number}
                    >
                      {number}
                    </option>

                  ))}

                </select>

              </div>

              <button
                className="details-cart-button"
                onClick={addToCart}
              >
                🛒 Add {quantity} to Cart
              </button>

              {cartQuantity > 0 && (
                <p className="already-cart">
                  ✓ {cartQuantity} already
                  in your cart
                </p>
              )}

            </>
          )}

          {/* BENEFITS */}

          <div className="details-benefits">

            <div>
              🚚
              <span>
                Free Delivery
              </span>
            </div>

            <div>
              🔒
              <span>
                Secure Payment
              </span>
            </div>

            <div>
              ↩️
              <span>
                Easy Returns
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* RELATED PRODUCTS */}

      <section className="related-section">

        <div className="related-heading">

          <div>

            <span>
              YOU MAY ALSO LIKE
            </span>

            <h2>
              Related Products
            </h2>

          </div>

          <Link to="/products">
            View All →
          </Link>

        </div>

        {relatedProducts.length > 0 ? (

          <div className="related-grid">

            {relatedProducts
              .slice(0, 8)
              .map((related) => (

                <Link
                  to={`/products/${related.product_id}`}
                  className="related-card"
                  key={
                    related.product_id
                  }
                >

                  <div className="related-image">

                    <img
                      src={
                        related.image_url
                      }
                      alt={related.name}
                    />

                  </div>

                  <span className="related-category">
                    {related.category}
                  </span>

                  <h3>
                    {related.name}
                  </h3>

                  <div className="related-bottom">

                    <strong>
                      ₹
                      {Number(
                        related.price
                      ).toFixed(2)}
                    </strong>

                    <span>
                      View →
                    </span>

                  </div>

                </Link>

              ))}

          </div>

        ) : (

          <div className="no-related">

            <p>
              No related products available.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default ProductDetails;