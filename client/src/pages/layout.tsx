import { Link, Outlet, useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { ShoppingCart01, LogOut01, User01, BarChartSquare02, Home01, Package } from "@untitledui/icons";
import toast from "react-hot-toast";

export const AppLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { totalItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="flex min-h-dvh flex-col bg-primary">
      {}
      <header className="sticky top-0 z-50 border-b border-secondary bg-primary/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-brand-tertiary"
            >
              blnK
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              <Button
                href="/products"
                color="link-gray"
                size="md"
                iconLeading={Package}
                onClick={(e: any) => {
                  e.preventDefault();
                  navigate("/products");
                }}
              >
                Products
              </Button>
              {user && (
                <Button
                  href="/orders"
                  color="link-gray"
                  size="md"
                  onClick={(e: any) => {
                    e.preventDefault();
                    navigate("/orders");
                  }}
                >
                  My Orders
                </Button>
              )}
              {user?.role === "admin" && (
                <Button
                  href="/admin"
                  color="link-gray"
                  size="md"
                  iconLeading={BarChartSquare02}
                  onClick={(e: any) => {
                    e.preventDefault();
                    navigate("/admin");
                  }}
                >
                  Dashboard
                </Button>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button
              color="secondary-gray"
              size="sm"
              iconLeading={ShoppingCart01}
              onClick={() => navigate("/cart")}
              className="relative"
            >
              Cart
              {totalItems > 0 && (
                <Badge size="sm" color="brand" type="pill-color">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  color="secondary-gray"
                  size="sm"
                  iconLeading={User01}
                  onClick={() =>
                    navigate(user.role === "admin" ? "/admin" : "/orders")
                  }
                >
                  {user.name}
                </Button>
                <Button
                  color="tertiary-gray"
                  size="sm"
                  iconLeading={LogOut01}
                  onClick={handleLogout}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  color="secondary-gray"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {}
      <main className="flex-1"><Outlet /></main>

      {}
      <footer className="border-t border-secondary bg-secondary px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              to="/"
              className="text-lg font-bold text-brand-tertiary"
            >
              blnK
            </Link>
            <p className="text-sm text-tertiary">
              &copy; {new Date().getFullYear()} blnK. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
