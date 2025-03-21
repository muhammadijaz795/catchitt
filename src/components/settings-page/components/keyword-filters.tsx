import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


interface KeywordFiltersProps {
  keywordData: { keyword: string; filters: string[] };
  onClose: () => void;
  onKeywordAdded: () => Promise<void>;
}

const KeywordFilters: React.FC<KeywordFiltersProps> = ({ keywordData, onClose, onKeywordAdded }) => {

  const API_KEY = process.env.VITE_API_URL;
  const { token } = useSelector((store: any) => store?.reducers?.profile);
  

  const [keyword, setKeyword] = useState(keywordData?.keyword || ""); 
  const [selectedFilters, setSelectedFilters] = useState<string[]>(keywordData?.filters || []);

  const filters = [
    { id: "for_you", label: "For You" },
    { id: "live", label: "LIVE" },
    { id: "following", label: "Following" },
    { id: "friends", label: "Friends" },
  ];

  useEffect(() => {
    if (keywordData) {
      setKeyword(keywordData.keyword);
      setSelectedFilters(keywordData.filters);
    } else {
      setKeyword(""); // Reset for adding a new keyword
      setSelectedFilters([]);
    }
  }, [keywordData]);

  const handleCheckboxChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId) // Remove if already selected
        : [...prev, filterId] // Add if not selected
    );
  };

  const handleSelectAll = () => {
    if (selectedFilters.length === filters.length) {
      setSelectedFilters([]); // Unselect all
    } else {
      setSelectedFilters(filters.map((filter) => filter.id)); // Select all
    }
  };

  const handleSubmit = async () => {
    if (!keyword.trim()) {
      alert("Please enter a keyword!");
      return;
    }
    if (selectedFilters.length === 0) {
      alert("Please select at least one filter!");
      return;
    }

    const requestData = { keyword, filters: selectedFilters };

    try {
      const response = await fetch(`${API_KEY}/profile/v2/keywords`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Failed to save keyword and filters");

      const responseData = await response.json();
      console.log("Response:", responseData);
      onKeywordAdded();
      onClose();
      // alert("Keyword and filters saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      // alert("Failed to save keyword and filters.");
    }
  };

  return (
    <div className="w-full p-4 text-left">
        <p className="h5">Add Keyword</p>
        <p className="text-sm text-[#000000A6] mb-3">
            Enter a single word or hashtag to filter from selected feeds. Spelling isn't case-sensitive.
        </p>
      {/* Keyword Input Field */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter a word or hashtag"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-[#F5F5F5] rounded-md p-3  w-full"
        />
      </div>

      {/* Filter Selection */}
      <div className="mb-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Filter from</p>
          <button
            className="text-red-500 font-semibold text-sm"
            onClick={handleSelectAll}
          >
            {selectedFilters.length === filters.length ? "Unselect all" : "Select all"}
          </button>
        </div>
        <div className="bg-[#F5F5F5] rounded-md p-3 w-full mt-2">
        {filters.map((filter) => (
            <label key={filter.id} className="flex items-center justify-between text-base py-1 cursor-pointer">
                <span>{filter.label}</span>
                <input
                type="checkbox"
                checked={selectedFilters.includes(filter.id)}
                onChange={() => handleCheckboxChange(filter.id)}
                className="hidden peer"
                />
                <div className="w-5 h-5 border-2 border-gray-500 rounded-md peer-checked:bg-red-500 peer-checked:border-red-500 flex items-center justify-center">
                {/* White Check Mark */}
                <svg
                    className="w-4 h-4 text-white  peer-checked:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4 4 9-9"></path>
                </svg>
                </div>
            </label>
            ))}

        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex justify-start gap-2 mt-3">
            <button
            className={` font-medium border w-[8rem] py-2 rounded-md text-sm `}
              >
                Cancel
            </button>
        <button
          onClick={handleSubmit}
          className={`bg-[#FE2C55] text-white font-medium w-[8rem] py-2 rounded-md text-sm ${
            !keyword || selectedFilters.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!keyword || selectedFilters.length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default KeywordFilters;
