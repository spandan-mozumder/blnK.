import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductById, clearCurrentProduct } from "@/store/productSlice";
import { addToCart } from "@/store/cartSlice";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { ShoppingCart01, ArrowLeft, Package, Clock } from "@untitledui/icons";
import toast from "react-hot-toast";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentProduct: product, loading } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.stockQuantity === 0) {
      toast.error("This product is out of stock");
      return;
    }
    dispatch(
      addToCart({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
        stockQuantity: product.stockQuantity,
      })
    );
    toast.success(`${product.title} added to cart`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-display-xs font-semibold text-primary">
          Product not found
        </h2>
        <Button
          color="primary"
          size="md"
          className="mt-4"
          onClick={() => navigate("/products")}
          iconLeading={ArrowLeft}
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {}
      <Button
        color="link-gray"
        size="sm"
        iconLeading={ArrowLeft}
        className="mb-6"
        onClick={() => navigate("/products")}
      >
        Back to Products
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {}
        <div className="overflow-hidden rounded-2xl border border-secondary bg-secondary">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
              style={{ minHeight: "400px" }}
            />
          ) : (
            <div className="flex items-center justify-center" style={{ minHeight: "400px" }}>
              <span className="text-8xl">🎵</span>
            </div>
          )}
        </div>

        {}
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <Badge size="md" color="brand" type="pill-color">
              {product.category}
            </Badge>
            {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
              <Badge size="md" color="warning" type="pill-color">
                Only {product.stockQuantity} left
              </Badge>
            )}
            {product.stockQuantity === 0 && (
              <Badge size="md" color="error" type="pill-color">
                Out of Stock
              </Badge>
            )}
          </div>

          <h1 className="text-display-sm font-semibold text-primary">
            {product.title}
          </h1>

          <p className="mt-4 text-display-xs font-bold text-brand-tertiary">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-6 text-md leading-relaxed text-secondary">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-4 text-sm text-tertiary">
            <div className="flex items-center gap-1.5">
              <Package className="size-4" data-icon />
              <span>
                {product.stockQuantity > 0
                  ? `${product.stockQuantity} in stock`
                  : "Out of stock"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" data-icon />
              <span>
                Added {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <Button
              color="primary"
              size="xl"
              className="w-full sm:w-auto"
              iconLeading={ShoppingCart01}
              isDisabled={product.stockQuantity === 0}
              onClick={handleAddToCart}
            >
              {product.stockQuantity === 0
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
