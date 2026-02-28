import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, clearError } from "@/store/authSlice";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Mail01, Lock01 } from "@untitledui/icons";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Welcome back!");
      const user = result.payload.user;
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } else {
      toast.error(result.payload as string);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-primary px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="mb-6 inline-block text-display-xs font-bold text-brand-tertiary">
            blnK
          </Link>
          <h1 className="text-display-xs font-semibold text-primary">
            Welcome back
          </h1>
          <p className="mt-2 text-md text-tertiary">
            Log in to your account to continue shopping
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(v) => setEmail(v)}
            iconLeading={Mail01}
            isRequired
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(v) => setPassword(v)}
            iconLeading={Lock01}
            isRequired
          />

          {error && (
            <p className="text-sm text-error-primary">{error}</p>
          )}

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full"
            isDisabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-tertiary">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-brand-secondary hover:text-brand-secondary_hover"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
