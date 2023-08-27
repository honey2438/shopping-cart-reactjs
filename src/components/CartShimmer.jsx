import React from "react";

function CartShimmer() {
  return (
    <div className="cart-box">
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
