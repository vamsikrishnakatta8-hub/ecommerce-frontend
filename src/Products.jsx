import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedSubcategory, setSelectedSubcategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("default");

  // Temporary quantity before Update
  const [pendingQuantities, setPendingQuantities] =
    useState({});

  // Get products
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Products received:", data);

        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Product loading error:",
          error
        );

        setLoading(false);
      });
  }, []);

  // Categories
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // Subcategories
  const subcategories = [
    "All",
    ...new Set(
      products
        .filter(
          (product) =>
            selectedCategory === "All" ||
            product.category === selectedCategory
        )
        .map(
          (product) => product.subcategory
        )
        .filter(Boolean)
    ),
  ];

  // Add to cart
  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct =
        previousCart.find(
          (item) =>
            item.product_id ===
            product.product_id
        );

      if (existingProduct) {
        if (
          Number(existingProduct.quantity) >=
          Number(product.stock)
        ) {
          return previousCart;
        }

        return previousCart.map((item) =>
          item.product_id ===
          product.product_id
            ? {
                ...item,
                quantity:
                  Number(item.quantity) + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Decrease quantity
  const decreaseQuantity = (product) => {
    setCart((previousCart) => {
      const existingProduct =
        previousCart.find(
          (item) =>
            item.product_id ===
            product.product_id
        );

      if (!existingProduct) {
        return previousCart;
      }

      if (
        Number(existingProduct.quantity) > 1
      ) {
        return previousCart.map((item) =>
          item.product_id ===
          product.product_id
            ? {
                ...item,
                quantity:
                  Number(item.quantity) - 1,
              }
            : item
        );
      }

      return previousCart.filter(
        (item) =>
          item.product_id !==
          product.product_id
      );
    });

    setPendingQuantities((previous) => {
      const updated = { ...previous };

      delete updated[product.product_id];

      return updated;
    });
  };

  // Select quantity
  const selectQuantity = (
    product,
    value
  ) => {
    setPendingQuantities((previous) => ({
      ...previous,
      [product.product_id]:
        Number(value),
    }));
  };

  // Update quantity
  const updateQuantity = (product) => {
    const selectedQuantity =
      pendingQuantities[
        product.product_id
      ];

    if (
      selectedQuantity === undefined
    ) {
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.product_id ===
        product.product_id
          ? {
              ...item,
              quantity:
                selectedQuantity,
            }
          : item
      )
    );

    setPendingQuantities((previous) => {
      const updated = { ...previous };

      delete updated[product.product_id];

      return updated;
    });
  };

  // Change category
  const changeCategory = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory("All");
  };

  // Filter products
  let filteredProducts = products
    .filter((product) => {
      if (
        selectedCategory === "All"
      ) {
        return true;
      }

      return (
        product.category ===
        selectedCategory
      );
    })
    .filter((product) => {
      if (
        selectedSubcategory === "All"
      ) {
        return true;
      }

      return (
        product.subcategory ===
        selectedSubcategory
      );
    })
    .filter((product) =>
      String(product.name)
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // Sort
  if (sort === "low") {
    filteredProducts =
      [...filteredProducts].sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
  }

  if (sort === "high") {
    filteredProducts =
      [...filteredProducts].sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
  }

  // Loading
  if (loading) {
    return (
      <div className="products-page">
        <h1>🛍️ ShopEasy Store</h1>

        <div className="no-products">
          <h2>
            Loading products...
          </h2>

          <p>
            Please wait while we load
            the products.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">

      <h1>🛍️ ShopEasy Store</h1>

      <p className="store-description">
        Explore our wide range of products.
      </p>

      {/* FILTERS */}

      <div className="product-controls">

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={selectedCategory}
          onChange={(e) =>
            changeCategory(
              e.target.value
            )
          }
        >
          {categories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}
        </select>

        {subcategories.length > 1 && (
          <select
            value={selectedSubcategory}
            onChange={(e) =>
              setSelectedSubcategory(
                e.target.value
              )
            }
          >
            {subcategories.map(
              (subcategory) => (
                <option
                  key={subcategory}
                  value={subcategory}
                >
                  {subcategory}
                </option>
              )
            )}
          </select>
        )}

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="default">
            Sort Products
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>
        </select>

      </div>

      {/* CATEGORY BUTTONS */}

      <div className="category-buttons">

        {categories.map(
          (category) => (
            <button
              key={category}
              className={
                selectedCategory ===
                category
                  ? "category-active"
                  : ""
              }
              onClick={() =>
                changeCategory(
                  category
                )
              }
            >
              {category}
            </button>
          )
        )}

      </div>

      {/* PRODUCT COUNT */}

      <p className="product-count">
        Showing{" "}
        <strong>
          {filteredProducts.length}
        </strong>{" "}
        products
      </p>

      {/* PRODUCTS */}

      <div className="product-container">

        {filteredProducts.map(
          (product) => {

            const cartProduct =
              cart.find(
                (item) =>
                  item.product_id ===
                  product.product_id
              );

            const currentQuantity =
              cartProduct
                ? Number(
                    cartProduct.quantity
                  )
                : 0;

            const pendingQuantity =
              pendingQuantities[
                product.product_id
              ];

            const displayedQuantity =
              pendingQuantity !==
              undefined
                ? pendingQuantity
                : currentQuantity;

            return (
              <div
                className="product-card"
                key={
                  product.product_id
                }
              >

                {/* CLICKABLE PRODUCT IMAGE */}

                <Link
                  to={`/products/${product.product_id}`}
                  className="product-details-link"
                >

                  <div className="image-container">

                    <img
                      src={
                        product.image_url
                      }
                      alt={product.name}
                      className="product-image"
                    />

                  </div>

                </Link>

                {/* CATEGORY */}

                <span className="category">
                  {product.category}
                </span>

                {/* SUBCATEGORY */}

                {product.subcategory && (
                  <span className="subcategory">
                    {
                      product.subcategory
                    }
                  </span>
                )}

                {/* CLICKABLE PRODUCT NAME */}

                <Link
                  to={`/products/${product.product_id}`}
                  className="product-details-link"
                >
                  <h2>
                    {product.name}
                  </h2>
                </Link>

                {/* DESCRIPTION */}

                <p>
                  {product.description}
                </p>

                {/* RATING */}

                <div className="rating">
                  ⭐⭐⭐⭐⭐
                </div>

                {/* PRICE */}

                <h3>
                  ₹
                  {Number(
                    product.price
                  ).toFixed(2)}
                </h3>

                {/* STOCK */}

                <p className="stock">
                  {Number(
                    product.stock
                  ) > 0
                    ? `${product.stock} available`
                    : "Out of Stock"}
                </p>

                {/* CART CONTROLS */}

                {currentQuantity > 0 ? (

                  <>

                    <div className="quantity-control">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            product
                          )
                        }
                      >
                        −
                      </button>

                      <select
                        value={
                          displayedQuantity
                        }
                        onChange={(e) =>
                          selectQuantity(
                            product,
                            e.target.value
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
                        ).map(
                          (number) => (
                            <option
                              key={number}
                              value={
                                number
                              }
                            >
                              {number}
                            </option>
                          )
                        )}

                      </select>

                      <button
                        onClick={() =>
                          addToCart(
                            product
                          )
                        }
                        disabled={
                          currentQuantity >=
                          Number(
                            product.stock
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    {/* UPDATE QUANTITY */}

                    {pendingQuantity !==
                      undefined &&
                      pendingQuantity !==
                        currentQuantity && (

                        <button
                          className="update-quantity-button"
                          onClick={() =>
                            updateQuantity(
                              product
                            )
                          }
                        >
                          Update
                        </button>

                      )}

                  </>

                ) : (

                  /* ADD TO CART */

                  <button
                    className="add-button"
                    onClick={() =>
                      addToCart(
                        product
                      )
                    }
                    disabled={
                      Number(
                        product.stock
                      ) <= 0
                    }
                  >
                    🛒 Add to Cart
                  </button>

                )}

              </div>
            );
          }
        )}

      </div>

      {/* NO PRODUCTS */}

      {filteredProducts.length ===
        0 && (

        <div className="no-products">

          <h2>
            😕 No products found
          </h2>

          <p>
            Try another category or
            search term.
          </p>

        </div>

      )}

    </div>
  );
}

export default Products;