import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import {
  ShoppingCart01,
  Shield01,
  ArrowRight,
  Star01,
  Truck01,
  Headphones01,
  ShoppingBag01,
} from "@untitledui/icons";
import { animate, stagger, createTimeline } from "animejs";
import { useAppSelector } from "@/store/hooks";

const MUSIC_NOTES = ["♪", "♫", "♬", "♩", "🎵", "🎶"];

export const LandingPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const shapes = pageRef.current.querySelectorAll(".floating-shape");
    shapes.forEach((shape, i) => {
      animate(shape, {
        translateY: [0, -20, 0],
        translateX: [0, i % 2 === 0 ? 10 : -10, 0],
        rotate: [0, i % 2 === 0 ? 15 : -15, 0],
        duration: 3000 + i * 500,
        loop: true,
        ease: "inOutSine",
      });
    });
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(heroRef.current.querySelectorAll(".hero-badge"), {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 600,
    })
      .add(
        heroRef.current.querySelectorAll(".hero-title-word"),
        {
          opacity: [0, 1],
          translateY: [50, 0],
          delay: stagger(120),
          duration: 900,
        },
        "-=300"
      )
      .add(
        heroRef.current.querySelectorAll(".hero-subtitle"),
        {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
        },
        "-=500"
      )
      .add(
        heroRef.current.querySelectorAll(".hero-cta"),
        {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: stagger(100),
          duration: 700,
        },
        "-=400"
      );
  }, []);

  useEffect(() => {
    if (!categoriesRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = createTimeline({ defaults: { ease: "outExpo" } });
            tl.add(
              categoriesRef.current!.querySelectorAll(".section-heading"),
              {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 700,
              }
            ).add(
              categoriesRef.current!.querySelectorAll(".cat-card"),
              {
                opacity: [0, 1],
                translateY: [40, 0],
                scale: [0.9, 1],
                delay: stagger(80),
                duration: 700,
              },
              "-=400"
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(categoriesRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!featuresRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = createTimeline({ defaults: { ease: "outExpo" } });
            tl.add(
              featuresRef.current!.querySelectorAll(".section-heading"),
              {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 700,
              }
            ).add(
              featuresRef.current!.querySelectorAll(".feature-card"),
              {
                opacity: [0, 1],
                translateY: [50, 0],
                delay: stagger(120),
                duration: 800,
              },
              "-=400"
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(featuresRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ctaRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = createTimeline({ defaults: { ease: "outExpo" } });
            tl.add(ctaRef.current!.querySelectorAll(".cta-content"), {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: stagger(100),
              duration: 900,
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: ShoppingCart01,
      title: "Curated Selection",
      description:
        "Every record in our collection is hand-picked for quality sound, pressing integrity, and artistic value.",
    },
    {
      icon: Truck01,
      title: "Safe Shipping",
      description:
        "Records shipped in custom mailers designed to protect your vinyl from edge warps and split seams.",
    },
    {
      icon: Headphones01,
      title: "Listen Before You Buy",
      description:
        "Preview tracks and read detailed liner notes so you know exactly what you're adding to your shelf.",
    },
    {
      icon: Shield01,
      title: "Secure Checkout",
      description:
        "Stripe-powered payments with full encryption. Check out with confidence every time.",
    },
  ];

  const categories = [
    { name: "Vinyl Records", slug: "vinyl", emoji: "🎵" },
    { name: "CDs", slug: "cd", emoji: "💿" },
    { name: "Cassettes", slug: "cassette", emoji: "📼" },
    { name: "Merchandise", slug: "merchandise", emoji: "👕" },
    { name: "Equipment", slug: "equipment", emoji: "🎧" },
    { name: "Accessories", slug: "accessories", emoji: "🎸" },
  ];

  return (
    <div className="flex min-h-dvh flex-col noise-overlay relative" ref={pageRef}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-shape absolute rounded-full opacity-10"
            style={{
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              background: `linear-gradient(135deg, #7c3aed, #6366f1)`,
              top: `${5 + i * 12}%`,
              left: `${3 + i * 12}%`,
            }}
          />
        ))}
      </div>

      <div className="fixed top-6 right-6 z-50">
        <Button
          color="primary"
          size="md"
          iconLeading={ShoppingBag01}
          onClick={() => navigate(user ? "/products" : "/login")}
          className="glow-border shadow-lg"
        >
          To Store
        </Button>
      </div>

      <div className="fixed top-6 left-6 z-50 px-4 py-2 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10">
        <span className="text-2xl font-bold text-brand-tertiary brand-underline text-shimmer">
          blnK.
        </span>
      </div>

      <section className="relative overflow-hidden bg-primary" ref={heroRef}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {MUSIC_NOTES.map((note, i) => (
            <span
              key={i}
              className="music-note"
              style={{
                left: `${10 + i * 15}%`,
                animationDuration: `${8 + i * 3}s`,
                animationDelay: `${i * 2}s`,
                fontSize: `${1 + Math.random()}rem`,
              }}
            >
              {note}
            </span>
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 sm:py-40 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-3xl text-center">
            <div className="hero-badge flex justify-center" style={{ opacity: 0 }}>
              <Badge
                size="lg"
                color="brand"
                type="pill-color"
                className="mb-6"
              >
                <Star01 className="size-3.5 mr-2" data-icon />
                New drops every week
              </Badge>
            </div>

            <h1 className="text-display-lg font-bold tracking-tight text-primary sm:text-display-xl lg:text-display-2xl">
              <span className="hero-title-word inline-block" style={{ opacity: 0 }}>
                The record shop{" "}
              </span>
              <span
                className="hero-title-word inline-block text-shimmer"
                style={{ opacity: 0 }}
              >
                you&apos;ve been looking for.
              </span>
            </h1>

            <p
              className="hero-subtitle mx-auto mt-6 max-w-2xl text-lg text-tertiary sm:text-xl"
              style={{ opacity: 0 }}
            >
              Vinyl, CDs, cassettes, and gear — curated for music lovers
              who care about the sound, the art, and the ritual of listening.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="hero-cta" style={{ opacity: 0 }}>
                <Button
                  color="primary"
                  size="xl"
                  iconTrailing={ArrowRight}
                  onClick={() => navigate("/products")}
                  className="glow-border"
                >
                  Browse the Collection
                </Button>
              </div>
              <div className="hero-cta" style={{ opacity: 0 }}>
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
        </div>
      </section>

      <section className="bg-primary py-24 border-t border-secondary" ref={categoriesRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2
              className="section-heading text-display-sm font-semibold text-primary"
              style={{ opacity: 0 }}
            >
              Browse by Format
            </h2>
            <p
              className="section-heading mt-3 text-lg text-tertiary"
              style={{ opacity: 0 }}
            >
              Find exactly what you&apos;re looking for
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="cat-card card-hover group flex flex-col items-center gap-4 rounded-2xl border border-secondary bg-primary p-8 shadow-xs cursor-pointer"
                style={{ opacity: 0 }}
                onClick={() =>
                  navigate(`/products?category=${cat.slug}`)
                }
              >
                <span className="text-5xl transition-transform duration-300 group-hover:scale-125">
                  {cat.emoji}
                </span>
                <span className="text-sm font-semibold text-primary">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 border-t border-secondary" ref={featuresRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2
              className="section-heading text-display-sm font-semibold text-primary"
              style={{ opacity: 0 }}
            >
              Why shop with <span className="brand-underline">blnK.</span>?
            </h2>
            <p
              className="section-heading mt-3 text-lg text-tertiary"
              style={{ opacity: 0 }}
            >
              Built for the people who still care about how music sounds
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="feature-card card-hover group rounded-2xl border border-secondary bg-primary p-8 shadow-xs"
                style={{ opacity: 0 }}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary transition-transform duration-300 group-hover:scale-110">
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

      <section className="bg-primary py-24 border-t border-secondary" ref={ctaRef}>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="cta-content text-display-sm font-semibold text-primary"
            style={{ opacity: 0 }}
          >
            Start building your collection
          </h2>
          <p
            className="cta-content mt-4 text-lg text-tertiary"
            style={{ opacity: 0 }}
          >
            Join thousands of collectors and music fans. Sign up today and
            get first access to new arrivals, limited pressings, and exclusive drops.
          </p>
          <div
            className="cta-content mt-8 flex items-center justify-center gap-4"
            style={{ opacity: 0 }}
          >
            <Button
              color="primary"
              size="lg"
              onClick={() => navigate("/register")}
              className="glow-border"
            >
              Create Free Account
            </Button>
            <Button
              color="link-gray"
              size="lg"
              iconTrailing={ArrowRight}
              onClick={() => navigate("/products")}
            >
              Browse Collection
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-secondary bg-primary px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-lg font-bold text-brand-tertiary text-shimmer brand-underline">
              blnK.
            </span>
            <p className="text-sm text-tertiary">
              &copy; {new Date().getFullYear()} <span className="brand-underline">blnK.</span> All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
