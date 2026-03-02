import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "@/store";
import { LandingPage } from "@/pages/landing";
import { LoginPage } from "@/pages/auth/login";
import { RegisterPage } from "@/pages/auth/register";
import { AppLayout } from "@/pages/layout";
import { ProductListPage } from "@/pages/products/product-list";
import { ProductDetailPage } from "@/pages/products/product-detail";
import { CartPage } from "@/pages/checkout/cart";
import { CheckoutSuccessPage } from "@/pages/checkout/success";
import { CheckoutCancelPage } from "@/pages/checkout/cancel";
import { OrderHistoryPage } from "@/pages/orders/order-history";
import { AdminDashboard } from "@/pages/admin/dashboard";
import { BecomeSellerPage } from "@/pages/become-seller/become-seller";
import { ProfilePage } from "@/pages/profile/profile";
import { ProtectedRoute, AdminRoute } from "@/components/route-guards";
import { NotFound } from "@/pages/not-found";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <BrowserRouter>
                    <RouteProvider>
                        <Routes>
                            {}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />

                            {}
                            <Route element={<AppLayout />}>
                                <Route path="/products" element={<ProductListPage />} />
                                <Route path="/products/:id" element={<ProductDetailPage />} />
                                <Route
                                    path="/cart"
                                    element={
                                        <ProtectedRoute>
                                            <CartPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/checkout/success"
                                    element={
                                        <ProtectedRoute>
                                            <CheckoutSuccessPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/checkout/cancel"
                                    element={
                                        <ProtectedRoute>
                                            <CheckoutCancelPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/orders"
                                    element={
                                        <ProtectedRoute>
                                            <OrderHistoryPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute>
                                            <ProfilePage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/become-seller"
                                    element={
                                        <ProtectedRoute>
                                            <BecomeSellerPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin"
                                    element={
                                        <AdminRoute>
                                            <AdminDashboard />
                                        </AdminRoute>
                                    }
                                />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </RouteProvider>
                </BrowserRouter>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            borderRadius: "12px",
                            background: "var(--color-bg-primary)",
                            color: "var(--color-text-primary)",
                            border: "1px solid var(--color-border-secondary)",
                        },
                    }}
                />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
