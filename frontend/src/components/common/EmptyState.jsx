import { Link } from "react-router-dom";

const EmptyState = ({ title, description, actionLabel, actionTo }) => {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center">
      <h3 className="text-xl font-semibold text-stone-900">{title}</h3>
      <p className="mt-2 text-stone-600">{description}</p>
      {actionLabel && actionTo ? (
        <Link
          to={actionTo}
          className="mt-5 inline-flex rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
};

export default EmptyState;
