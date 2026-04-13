import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStripeIntent } from "../services/paymentService";
import { clearCart } from "../store/slices/cartSlice";
import { createOrder } from "../store/slices/orderSlice";
import { formatCurrency } from "../utils/currency";

const initialShipping = {
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
};

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState(initialShipping);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const { items } = useSelector((state) => state.cart);

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [items],
  );

  const shipping = subtotal > 2000 ? 0 : 79;
  const total = subtotal + shipping;

  const onChange = (e) => {
    setShippingAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!items.length) return;

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const order = await dispatch(
        createOrder({
          shippingAddress,
          paymentProvider: paymentMethod,
        }),
      ).unwrap();

      if (paymentMethod === "stripe") {
        await createStripeIntent({ orderId: order._id });
      }

      await dispatch(clearCart()).unwrap();
      setStatusMessage("Order placed successfully.");
      navigate("/orders");
    } catch (error) {
      setStatusMessage(
        error?.message || "Failed to place order. Please check your inputs and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-900">Checkout</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[2fr_1fr]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">Shipping address</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              required
              name="fullName"
              placeholder="Full name"
              value={shippingAddress.fullName}
              onChange={onChange}
              className="rounded-lg border border-gray-200 px-3 py-2"
            />
            <input
              required
              name="phone"
              placeholder="Phone"
              value={shippingAddress.phone}
              onChange={onChange}
              className="rounded-lg border border-gray-200 px-3 py-2"
            />
            <input
              required
              name="line1"
              placeholder="Address line 1"
              value={shippingAddress.line1}
              onChange={onChange}
              className="rounded-lg border border-gray-200 px-3 py-2 md:col-span-2"
            />
            <input
              name="line2"
              placeholder="Address line 2"
              value={shippingAddress.line2}
              onChange={onChange}
              className="rounded-lg border border-gray-200 px-3 py-2 md:col-span-2"
            />
            <input
              required
              name="city"
              placeholder="City"
              value={shippingAddress.city}
              onChange={onChange}
              className="rounded-lg border border-gray-200 px-3 py-2"
            />
            <input
              required
              name="state"
              placeholder="State"
              value={shippingAddress.state}
              onChange={onChange}
              className="rounded-lg border border-gray-200 px-3 py-2"
            />
            <input
              required
              name="postalCode"
              placeholder="Postal code"
              value={shippingAddress.postalCode}
              onChange={onChange}
              className="rounded-lg border border-gray-200 px-3 py-2"
            />
            <input
              required
              name="country"
              placeholder="Country"
              value={shippingAddress.country}
              onChange={onChange}
              className="rounded-lg border border-gray-200 px-3 py-2"
            />
          </div>

          <div className="space-y-2 pt-4">
            <h3 className="text-base font-semibold text-gray-900">Payment method</h3>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
              />
              Stripe
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
              />
              Razorpay
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on delivery
            </label>
          </div>

          {statusMessage && (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
              {statusMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={!items.length || isSubmitting}
            className="rounded-lg bg-gray-900 px-5 py-3 text-white disabled:opacity-60"
          >
            {isSubmitting ? "Placing order..." : "Place order"}
          </button>
        </form>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 text-base font-semibold text-gray-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
