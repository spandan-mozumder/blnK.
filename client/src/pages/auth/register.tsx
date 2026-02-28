import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser, clearError } from "@/store/authSlice";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { User01, Mail01, Lock01 } from "@untitledui/icons";
import toast from "react-hot-toast";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await dispatch(registerUser({ name, email, password }));
    if (registerUser.fulfilled.match(result)) {
      toast.success("Account created successfully!");
      navigate("/products");
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
            Create an account
          </h1>
          <p className="mt-2 text-md text-tertiary">
            Join blnK and start shopping today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(v) => setName(v)}
            iconLeading={User01}
            isRequired
          />
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
            placeholder="Create a password"
            value={password}
            onChange={(v) => setPassword(v)}
            iconLeading={Lock01}
            isRequired
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(v) => setConfirmPassword(v)}
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
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-tertiary">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-brand-secondary hover:text-brand-secondary_hover"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
