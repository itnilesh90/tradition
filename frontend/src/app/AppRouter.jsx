import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrdersPage from "../pages/OrdersPage";
import ProfilePage from "../pages/ProfilePage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import AdminCategoriesPage from "../pages/admin/AdminCategoriesPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminPromoVideosPage from "../pages/admin/AdminPromoVideosPage";
import NotFoundPage from "../pages/NotFoundPage";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminLayout from "../components/admin/AdminLayout";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-amber-50/40 text-neutral-800">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/products"
        element={
          <MainLayout>
            <ProductsPage />
          </MainLayout>
        }
      />
      <Route
        path="/products/:id"
        element={
          <MainLayout>
            <ProductDetailsPage />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <RegisterPage />
          </MainLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <MainLayout>
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/wishlist"
        element={
          <MainLayout>
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/checkout"
        element={
          <MainLayout>
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/orders"
        element={
          <MainLayout>
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <MainLayout>
              <AdminLayout />
            </MainLayout>
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="promo-videos" element={<AdminPromoVideosPage />} />
      </Route>
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}
