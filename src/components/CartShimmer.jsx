import React from "react";

function CartShimmer() {
  return (
    <div className="cart-box">
      <h1>Cart</h1>

      <div className="products-list">
        {Array(5)
          .fill("")
          .map(() => {
            return(
            <div className="product-row-shimmer">

            </div>
            )
          })}
      </div>
    </div>
  );
}

export default CartShimmer;
