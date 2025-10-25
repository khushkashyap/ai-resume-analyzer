import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { usePuterStore } from '~/lib/puter';

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir('./')) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate('/auth?next=/wipe');
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error: {error}</p>
        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={clearError}
        >
          Clear Error
        </button>
      </div>
    );
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <nav className="resume-nav !pt-0">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 text-center">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Wipe App Data</h1>

      <p className="mb-6 text-gray-700">
        Logged in as: <span className="font-medium">{auth.user?.username}</span>
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Existing Files</h2>
        {files.length === 0 ? (
          <p className="text-gray-500">No files found.</p>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded"
              >
                <span className="text-gray-800">{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
        onClick={handleDelete}
      >
        Wipe All Data
      </button>
    </div>
  </main>
  );
};

export default WipeApp;
