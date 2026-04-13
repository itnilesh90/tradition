import { Trash2 } from "lucide-react";
import { formatCurrency } from "../../utils/currency";

const CartItem = ({ item, onUpdateQty, onRemove }) => {
  const maxQty = Math.min(item.product?.stock || 10, 10);

  return (
    <article className="grid gap-4 rounded-xl border border-stone-200 bg-white p-4 md:grid-cols-[96px_1fr_auto]">
      <img
        src={item.product?.images?.[0] || "https://images.unsplash.com/photo-1544441893-675973e31985"}
        alt={item.product?.title}
        className="h-24 w-24 rounded-md object-cover"
      />
      <div>
        <h3 className="font-semibold text-stone-900">{item.product?.title}</h3>
        <p className="text-sm text-stone-600">{item.product?.category?.name}</p>
        <p className="mt-2 text-amber-700">{formatCurrency(item.product?.price || 0)}</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <select
          value={item.quantity}
          onChange={(e) => onUpdateQty(item.product?._id, Number(e.target.value))}
          className="rounded-md border border-stone-300 px-3 py-1 text-sm"
        >
          {[...Array(maxQty).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              Qty: {x + 1}
            </option>
          ))}
        </select>
        <button
          onClick={() => onRemove(item.product?._id)}
          className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-3 py-1 text-xs text-stone-700 hover:bg-stone-100"
        >
          <Trash2 size={14} />
          Remove
        </button>
      </div>
    </article>
  );
};

export default CartItem;
