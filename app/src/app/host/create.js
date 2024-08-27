"use client";
import React, { useState } from "react";

const AddItem = () => {
  const [formData, setFormData] = useState({
    mode: "",
    otherMode: "",
    farmers: "",
    strat: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const modes = [
    "Easy Mode",
    "Molten Mode",
    "Intermediate Mode",
    "Fallen Mode",
    "Hardcore Mode",
    "Badlands II",
    "Pizza Party",
    "Polluted Wasteland II",
    "Hidden Wave",
    "Weekly Challenge",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.mode) {
      setError("Please select a mode");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit game setup");
      }

      alert(data.message);
      setFormData({ mode: "", otherMode: "", farmers: "", strat: "" });
    } catch (error) {
      console.error("Error submitting game setup: ", error);
      setError(
        error.message || "Error submitting game setup. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Game Setup
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="mode" className="sr-only">
                Mode
              </label>
              <select
                id="mode"
                name="mode"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.mode}
                onChange={handleChange}
              >
                <option value="">Select Mode</option>
                {modes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
            {formData.mode && (
              <>
                <div>
                  <label htmlFor="farmers" className="sr-only">
                    Number of Farmers
                  </label>
                  <select
                    id="farmers"
                    name="farmers"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formData.farmers}
                    onChange={handleChange}
                  >
                    <option value="">Select Number of Farmers</option>
                    {(formData.mode === "Hardcore Mode"
                      ? [1, 2, 3]
                      : [1, 2, 3, 4]
                    ).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="strat" className="sr-only">
                    Following a Strategy?
                  </label>
                  <select
                    id="strat"
                    name="strat"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formData.strat}
                    onChange={handleChange}
                  >
                    <option value="">Are you following any strat?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </>
            )}
            {formData.mode === "Other" && (
              <div>
                <label htmlFor="otherMode" className="sr-only">
                  Specify Other Mode
                </label>
                <input
                  id="otherMode"
                  name="otherMode"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Specify Other Mode (max 20 chars)"
                  maxLength="20"
                  value={formData.otherMode}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {error && <div className="text-red-500 text-center">{error}</div>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
