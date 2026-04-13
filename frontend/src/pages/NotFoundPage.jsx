import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="mx-auto max-w-xl px-4 py-16 text-center">
    <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
    <p className="mt-3 text-slate-600">
      The page you are looking for does not exist.
    </p>
    <Link
      to="/"
      className="mt-6 inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
    >
      Back home
    </Link>
  </div>
);

export default NotFoundPage;
