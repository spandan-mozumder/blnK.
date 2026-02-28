import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useAppDispatch } from "@/store/hooks";
import { verifyPayment } from "@/store/orderSlice";
import { clearCart } from "@/store/cartSlice";
import { Button } from "@/components/base/buttons/button";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { CheckCircle, ShoppingBag01 } from "@untitledui/icons";

export const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      dispatch(verifyPayment(sessionId)).then((result) => {
        if (verifyPayment.fulfilled.match(result)) {
          setVerified(true);
          dispatch(clearCart());
        }
        setVerifying(false);
      });
    } else {
      setVerifying(false);
    }
  }, [searchParams, dispatch]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
      {verifying ? (
        <>
          <LoadingIndicator size="lg" />
          <p className="mt-4 text-md text-tertiary">
            Verifying your payment...
          </p>
        </>
      ) : verified ? (
        <>
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-primary">
            <CheckCircle className="size-8 text-white" />
          </div>
          <h1 className="text-display-xs font-semibold text-primary">
            Payment Successful!
          </h1>
          <p className="mt-3 text-md text-tertiary">
            Thank you for your purchase. Your order has been confirmed and
            will be processed shortly.
          </p>
          <div className="mt-8 flex gap-3">
            <Button
              color="primary"
              size="md"
              onClick={() => navigate("/orders")}
              iconLeading={ShoppingBag01}
            >
              View Orders
            </Button>
            <Button
              color="secondary-gray"
              size="md"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-display-xs font-semibold text-primary">
            Payment Verification Failed
          </h1>
          <p className="mt-3 text-md text-tertiary">
            We could not verify your payment. If you were charged, please
            contact support.
          </p>
          <Button
            color="primary"
            size="md"
            className="mt-8"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </Button>
        </>
      )}
    </div>
  );
};
