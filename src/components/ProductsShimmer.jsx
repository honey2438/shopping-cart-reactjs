import React from "react";

function ProductsShimmer() {
  return (
    <>
      <div className="search-box-shimmer"></div>

      <div className="products-box">
        {Array(20)
          .fill("")
          .map(() => {
            return <div className="product-card-shimmer"></div>;
          })}
      </div>
    </>
  );
}

export default ProductsShimmer;
