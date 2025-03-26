import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import KeywordFilters from "./keyword-filters";

const API_KEY = process.env.VITE_API_URL;

interface KeywordsPageProps {
  isAddKeywordPage: (data: any) => void;
}

const KeywordsPage: React.FC<KeywordsPageProps> = ({ isAddKeywordPage }) => {
  const { token } = useSelector((store: any) => store?.reducers?.profile);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedKeyword, setSelectedKeyword] = useState<any | null>(null);
  const [showAddButton, setShowAddButton] = useState(true);
  var themeColor = window.localStorage.getItem('theme');


  // Fetch Keywords List
  const fetchKeywords = async () => {
    try {
      const response = await fetch(`${API_KEY}/profile/v2/keywords`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to load keywords");

      const data = await response.json();
      setKeywords(data.data || []);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Keyword
  const handleDelete = async (keyword: string) => {
    try {
      const response = await fetch(`${API_KEY}/profile/v2/keywords`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ keyword }), // Sending keyword in the request body
      });
  
      if (!response.ok) throw new Error("Failed to delete keyword");
  
      setKeywords((prev) => prev.filter((item) => item.keyword !== keyword));
    } catch (error) {
      console.error("Error deleting keyword:", error);
    }
  };
  
  useEffect(() => {
    // This effect runs when the component is unmounted or destroyed
    return () => {
      // Reset the states when component is destroyed or reset
      isAddKeywordPage(false);
      setShowAddButton(true);
      setShowAddKeyword(true);
    };
  }, []); // Empty dependency array ensures this runs only when unmounted
  
  // For example, this function resets the states when called
  const resetStates = () => {
    isAddKeywordPage(false);
    setShowAddButton(true);
    setShowAddKeyword(true);
  };
  

  // Fetch Data on Load
  useEffect(() => {
    fetchKeywords();
  }, []);

  return (
    <div className="w-full p-6 text-left">
      {showAddButton && <button
        className="bg-[#FE2C55] text-white font-medium text-base px-4 py-2 mt-4 rounded-md"
        onClick={() => {setShowAddKeyword(true); isAddKeywordPage(true); setShowAddButton(false);}}
      >
        + Add keyword
      </button>}

      {/* Show Add Keyword Form */}
      {showAddKeyword && (
        <KeywordFilters
          keywordData={selectedKeyword}
          onClose={() => {setShowAddKeyword(false); isAddKeywordPage(false); setShowAddButton(true);}}
          onKeywordAdded={fetchKeywords} // Refresh List on Add
        />
      )}

      {/* Keyword List */}
      <h3 className="mt-6 text-lg font-semibold">Filtered keywords</h3>

      {!showAddKeyword && (  // Hide this section when showAddKeyword is true
        loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {keywords.length === 0 ? (
              <p className="text-gray-500">No keywords added yet.</p>
            ) : (
              keywords.map((item) => (
                <div
                  onClick={() => {
                    setSelectedKeyword(item);
                    setShowAddKeyword(true);
                  }}
                  key={item._id}
                  className={`${themeColor === 'dark' ? 'bg-slate-500' : 'bg-gray-100'} flex justify-between items-center p-3 rounded-md mt-2`}

                 >
                  <div>
                    <p className="font-medium">{item.keyword}</p>
                    <p className="text-sm text-gray-500">
                      Filter from:{" "}
                      <span className="font-semibold">{item.filters.join(", ")}</span>
                    </p>
                  </div>
                  <button onClick={(e) => {
      e.stopPropagation(); // Prevents triggering the row click event
      handleDelete(item.keyword);
    }} className="text-red-500">
    <svg fill="#6B6B6B" color="inherit" font-size="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M18 20a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V20ZM27 19a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V20a1 1 0 0 0-1-1h-2Z"></path><path d="M32 8V6a5 5 0 0 0-5-5h-6a5 5 0 0 0-5 5v2H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2.74l1.49 24.97c.19 3.18.28 4.77.96 5.98a6 6 0 0 0 2.6 2.44c1.25.61 2.84.61 6.02.61H29.2c3.18 0 4.77 0 6.02-.6a6 6 0 0 0 2.6-2.45c.68-1.21.77-2.8.96-5.98L40.27 12H43a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H32Zm-5-3a1 1 0 0 1 1 1v2h-8V6a1 1 0 0 1 1-1h6Zm-15.25 7h24.5l-1.47 24.73c-.1 1.66-.16 2.66-.27 3.41a5 5 0 0 1-.18.83v.01a2 2 0 0 1-.9.83l-.13.04c-.13.02-.34.06-.7.09-.75.06-1.76.06-3.41.06H18.8c-1.65 0-2.66 0-3.42-.06a4.99 4.99 0 0 1-.84-.14 2 2 0 0 1-.87-.82l-.02-.03-.04-.12a5 5 0 0 1-.13-.69c-.1-.75-.17-1.75-.27-3.4L11.75 12Z"></path></svg>

                  </button>
                </div>
              ))
            )}
          </div>
        )
      )}
    </div>
  );
};

export default KeywordsPage;
