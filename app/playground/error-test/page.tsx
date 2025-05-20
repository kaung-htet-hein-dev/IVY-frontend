import { ErrorBoundaryTest } from './error-boundary';

// This simulates a server error when loading the page
async function getData() {
  throw new Error('This is a simulated server-side error!');
}

export default async function ErrorTestPage() {
  // Uncomment the next line to test server-side errors
  // await getData();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Error Testing Page</h1>

      <div className="grid gap-8">
        {/* Client-side error test */}
        <div className="border rounded-lg">
          <ErrorBoundaryTest />
        </div>

        {/* Server-side error test */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Server Error Test</h2>
          <p className="text-gray-600 mb-4">
            To test server-side errors, uncomment the getData() call in the page component.
          </p>
          {/* <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">{await getData()}</pre> */}
        </div>
      </div>
    </div>
  );
}
