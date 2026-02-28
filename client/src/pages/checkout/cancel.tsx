import { useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";
import { XCircle, ShoppingCart01 } from "@untitledui/icons";

export const CheckoutCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-error-primary">
        <XCircle className="size-8 text-white" />
      </div>
      <h1 className="text-display-xs font-semibold text-primary">
        Checkout Cancelled
      </h1>
      <p className="mt-3 text-md text-tertiary">
        Your payment was cancelled. Your cart items are still saved.
      </p>
      <div className="mt-8 flex gap-3">
        <Button
          color="primary"
          size="md"
          onClick={() => navigate("/cart")}
          iconLeading={ShoppingCart01}
        >
          Return to Cart
        </Button>
        <Button
          color="secondary-gray"
          size="md"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};
