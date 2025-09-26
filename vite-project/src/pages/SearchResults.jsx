import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Card from '../components/Card'; // ✅ Adjust path if needed

function SearchResults() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [seniors, setSeniors] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('query');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // ✅ Start loading at the beginning
      try {
        if (location.state?.results) {
          setSeniors(location.state.results);
        } else if (query) {
          const res = await fetch(`https://senior-connect-backend.onrender.com/api/auth/search?collegeName=${encodeURIComponent(query)}`, {
            credentials: 'include',
          });

          // ✅ Check if response is JSON
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

          const data = await res.json();
          setSeniors(data);
        } else {
          setSeniors([]);
        }
      } catch (err) {
        console.error('Search failed:', err);
        setSeniors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state, query]);

  return (
    <div className="min-h-screen bg-[#EEEEEE] px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#222831]">
        Search Results for: <span className="text-[#76ABAE]">{query}</span>
      </h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : seniors.length === 0 ? (
        <div className="text-center text-red-500 font-medium">No seniors found for this college.</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {seniors.map((senior) => (
            <Card
              key={senior._id}
              id={senior._id}
              name={senior.name}
              collegeName={senior.collegeName}
              currentYear={senior.currentYear}
              branch={senior.branch}
              profilePicture={senior.profilePicture || '/profile.svg'} // ✅ Corrected path
              isVerified={senior.isVerified}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
