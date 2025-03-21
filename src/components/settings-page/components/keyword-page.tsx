import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import KeywordFilters from "./keyword-filters";

const API_KEY = process.env.VITE_API_URL;

const KeywordsPage: React.FC = () => {
  const { token } = useSelector((store: any) => store?.reducers?.profile);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedKeyword, setSelectedKeyword] = useState<any | null>(null);


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
  

  // Fetch Data on Load
  useEffect(() => {
    fetchKeywords();
  }, []);

  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-semibold">Filter keywords</h2>
      <p className="text-sm text-gray-600">
        When you filter a keyword, you won’t see posts in your selected feeds that contain that word.
      </p>

      {/* Add Keyword Button */}
      <button
        className="bg-[#FE2C55] text-white font-semibold px-4 py-2 mt-4 rounded-sm"
        onClick={() => setShowAddKeyword(true)}
      >
        + Add keyword
      </button>

      {/* Show Add Keyword Form */}
      {showAddKeyword && (
        <KeywordFilters
          keywordData={selectedKeyword}
          onClose={() => setShowAddKeyword(false)}
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
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-md mt-2"
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
                    🗑
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
