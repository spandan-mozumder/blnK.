import { useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import {
  ShoppingCart01,
  CreditCard01,
  Shield01,
  Zap,
  ArrowRight,
  Package,
  Star01,
  Lock01,
} from "@untitledui/icons";

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingCart01,
      title: "Curated Collection",
      description:
        "Hand-picked vinyl records, CDs, cassettes and gear from artists across every genre.",
    },
    {
      icon: CreditCard01,
      title: "Secure Payments",
      description:
        "Shop with confidence using Stripe-powered checkout with full encryption and fraud protection.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built with modern technology for instant page loads, real-time search, and seamless browsing.",
    },
    {
      icon: Shield01,
      title: "Data Protection",
      description:
        "Your data is protected with enterprise-grade security including JWT auth and rate limiting.",
    },
  ];

  const categories = [
    { name: "Vinyl Records", slug: "vinyl", emoji: "🎵", count: "50+" },
    { name: "CDs", slug: "cd", emoji: "💿", count: "120+" },
    { name: "Cassettes", slug: "cassette", emoji: "📼", count: "30+" },
    { name: "Merchandise", slug: "merchandise", emoji: "👕", count: "80+" },
    { name: "Equipment", slug: "equipment", emoji: "🎧", count: "40+" },
    { name: "Accessories", slug: "accessories", emoji: "🎸", count: "60+" },
  ];

  return (
    <div className="flex min-h-dvh flex-col bg-primary">
      {}
      <header className="sticky top-0 z-50 border-b border-secondary bg-primary/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-xl font-bold tracking-tight text-brand-tertiary">
            blnK
          </span>
          <div className="flex items-center gap-3">
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
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 to-transparent dark-mode:from-brand-950/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge size="lg" color="brand" type="pill-color" className="mb-6">
              <Star01 className="size-3.5" data-icon />
              New drops every week
            </Badge>

            <h1 className="text-display-lg font-bold tracking-tight text-primary sm:text-display-xl lg:text-display-2xl">
              Your{" "}
              <span className="text-brand-secondary">sound</span>. Your
              collection.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-tertiary sm:text-xl">
              Discover premium vinyl records, CDs, cassettes, and music gear.
              From underground gems to chart-toppers — all in one place.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Button
                color="primary"
                size="xl"
                iconTrailing={ArrowRight}
                onClick={() => navigate("/products")}
              >
                Browse Collection
              </Button>
              <Button
                color="secondary-gray"
                size="xl"
                onClick={() => navigate("/register")}
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-display-sm font-semibold text-primary">
              Shop by Category
            </h2>
            <p className="mt-3 text-lg text-tertiary">
              Find exactly what you&apos;re looking for
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-secondary bg-primary p-6 shadow-xs transition-all duration-200 hover:shadow-lg hover:border-brand cursor-pointer"
                onClick={() =>
                  navigate(
                    `/products?category=${cat.slug}`
                  )
                }
              >
                <span className="text-4xl">{cat.emoji}</span>
                <span className="text-sm font-semibold text-primary">
                  {cat.name}
                </span>
                <Badge size="sm" color="gray" type="pill-color">
                  {cat.count} items
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-display-sm font-semibold text-primary">
              Why choose blnK?
            </h2>
            <p className="mt-3 text-lg text-tertiary">
              Built for music lovers, by music lovers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-secondary bg-primary p-6 shadow-xs"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary">
                  <feature.icon className="size-6 text-brand-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm text-tertiary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="bg-brand-section py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-display-sm font-semibold text-primary_on-brand">
            Ready to start your collection?
          </h2>
          <p className="mt-4 text-lg text-secondary_on-brand">
            Join thousands of music enthusiasts. Create your account today
            and discover rare finds and new releases.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              color="secondary-gray"
              size="lg"
              onClick={() => navigate("/register")}
            >
              Create Free Account
            </Button>
            <Button
              color="link-color"
              size="lg"
              iconTrailing={ArrowRight}
              onClick={() => navigate("/products")}
            >
              Browse Collection
            </Button>
          </div>
        </div>
      </section>

      {}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-tertiary">
              Built with modern technology
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-quaternary">
              <Badge size="lg" color="gray" type="pill-color">
                React 19
              </Badge>
              <Badge size="lg" color="gray" type="pill-color">
                TypeScript
              </Badge>
              <Badge size="lg" color="gray" type="pill-color">
                Tailwind CSS 4
              </Badge>
              <Badge size="lg" color="gray" type="pill-color">
                Redux Toolkit
              </Badge>
              <Badge size="lg" color="gray" type="pill-color">
                Node.js + Express
              </Badge>
              <Badge size="lg" color="gray" type="pill-color">
                MongoDB
              </Badge>
              <Badge size="lg" color="gray" type="pill-color">
                Stripe
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer className="border-t border-secondary bg-secondary px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-lg font-bold text-brand-tertiary">blnK</span>
            <p className="text-sm text-tertiary">
              &copy; {new Date().getFullYear()} blnK. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
