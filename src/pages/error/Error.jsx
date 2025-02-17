import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';

function ErrorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-400">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-lg text-stone-700 mb-8">
            We&apos;re sorry, but an unexpected error occurred. Please try again later or contact support.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-stone-500 text-white rounded-md hover:bg-stone-600 transition-colors"
          >
            Go back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ErrorPage;