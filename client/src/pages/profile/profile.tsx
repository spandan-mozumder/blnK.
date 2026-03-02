import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getProfile } from "@/store/authSlice";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import {
  User01,
  Mail01,
  ShoppingBag01,
  Building07,
  ArrowLeft,
  Edit01,
} from "@untitledui/icons";
import { stagger, createTimeline } from "animejs";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!containerRef.current || !user) return;
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(containerRef.current.querySelectorAll(".profile-avatar"), {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 700,
    })
      .add(
        containerRef.current.querySelectorAll(".profile-info"),
        {
          opacity: [0, 1],
          translateY: [25, 0],
          delay: stagger(80),
          duration: 600,
        },
        "-=400"
      )
      .add(
        containerRef.current.querySelectorAll(".profile-card"),
        {
          opacity: [0, 1],
          translateY: [30, 0],
          delay: stagger(100),
          duration: 700,
        },
        "-=300"
      );
  }, [user]);

  if (!user) return null;

  const roleLabel =
    user.role === "admin"
      ? "Administrator"
      : user.role === "seller"
        ? "Seller"
        : "Customer";

  const roleColor: "brand" | "success" | "gray" =
    user.role === "admin"
      ? "brand"
      : user.role === "seller"
        ? "success"
        : "gray";

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8"
      ref={containerRef}
    >
      <Button
        color="link-gray"
        size="sm"
        iconLeading={ArrowLeft}
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <div className="overflow-hidden rounded-2xl border border-secondary bg-primary shadow-xs">
        <div className="relative h-32 bg-gradient-to-r from-brand-600 to-brand-400">
          <div className="absolute -bottom-12 left-6">
            <div
              className="profile-avatar flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-primary bg-brand-primary text-display-xs font-bold text-brand-700 shadow-lg"
              style={{ opacity: 0 }}
            >
              {initials}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1
                className="profile-info text-display-xs font-semibold text-primary"
                style={{ opacity: 0 }}
              >
                {user.name}
              </h1>
              <div
                className="profile-info mt-1 flex items-center gap-2"
                style={{ opacity: 0 }}
              >
                <Badge size="sm" color={roleColor} type="pill-color">
                  {roleLabel}
                </Badge>
              </div>
            </div>
            {user.role === "user" && (
              <div className="profile-info" style={{ opacity: 0 }}>
                <Button
                  color="secondary-gray"
                  size="sm"
                  iconLeading={ShoppingBag01}
                  onClick={() => navigate("/become-seller")}
                >
                  Become a Seller
                </Button>
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div
              className="profile-card flex items-start gap-3 rounded-xl border border-secondary bg-secondary/50 p-4"
              style={{ opacity: 0 }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary">
                <User01 className="size-5 text-brand-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-tertiary uppercase tracking-wider">
                  Full Name
                </p>
                <p className="mt-0.5 text-sm font-semibold text-primary">
                  {user.name}
                </p>
              </div>
            </div>

            <div
              className="profile-card flex items-start gap-3 rounded-xl border border-secondary bg-secondary/50 p-4"
              style={{ opacity: 0 }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary">
                <Mail01 className="size-5 text-brand-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-tertiary uppercase tracking-wider">
                  Email Address
                </p>
                <p className="mt-0.5 text-sm font-semibold text-primary">
                  {user.email}
                </p>
              </div>
            </div>

            <div
              className="profile-card flex items-start gap-3 rounded-xl border border-secondary bg-secondary/50 p-4"
              style={{ opacity: 0 }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary">
                <ShoppingBag01 className="size-5 text-brand-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-tertiary uppercase tracking-wider">
                  Account Type
                </p>
                <p className="mt-0.5 text-sm font-semibold text-primary">
                  {roleLabel}
                </p>
              </div>
            </div>

            {(user.role === "admin" || user.role === "seller") && (
              <div
                className="profile-card flex items-start gap-3 rounded-xl border border-secondary bg-secondary/50 p-4"
                style={{ opacity: 0 }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary">
                  <Edit01 className="size-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-tertiary uppercase tracking-wider">
                    Access
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-primary">
                    Dashboard & Product Management
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {user.role === "seller" && user.sellerDetails && (
        <div
          className="profile-card mt-6 overflow-hidden rounded-2xl border border-secondary bg-primary shadow-xs"
          style={{ opacity: 0 }}
        >
          <div className="border-b border-secondary px-6 py-4">
            <div className="flex items-center gap-2">
              <Building07 className="size-5 text-brand-600" />
              <h2 className="text-lg font-semibold text-primary">
                Store Information
              </h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-tertiary uppercase tracking-wider">
                  Store Name
                </p>
                <p className="mt-1 text-md font-semibold text-primary">
                  {user.sellerDetails.storeName}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-tertiary uppercase tracking-wider">
                  Description
                </p>
                <p className="mt-1 text-sm text-secondary leading-relaxed">
                  {user.sellerDetails.description}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button
                color="primary"
                size="sm"
                onClick={() => navigate("/admin")}
                iconLeading={ShoppingBag01}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
