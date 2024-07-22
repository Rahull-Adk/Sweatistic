import React from "react";
import { useState } from "react";
const Home = () => {
  const [query, setQuery] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [equipment, setEquipment] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exercises, setExercises] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/exercises/search", {
        params: { query, muscleGroup, equipment, difficulty },
      });
      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label
            htmlFor="query"
            className="block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <input
            type="text"
            name="query"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="muscleGroup"
            className="block text-sm font-medium text-gray-700"
          >
            Muscle Group
          </label>
          <select
            name="muscleGroup"
            id="muscleGroup"
            value={muscleGroup}
            onChange={(e) => setMuscleGroup(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="shoulders">Shoulders</option>
            <option value="arms">Arms</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="equipment"
            className="block text-sm font-medium text-gray-700"
          >
            Equipment
          </label>
          <select
            name="equipment"
            id="equipment"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="bodyweight">Bodyweight</option>
            <option value="dumbbell">Dumbbell</option>
            <option value="barbell">Barbell</option>
            <option value="machine">Machine</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="difficulty"
            className="block text-sm font-medium text-gray-700"
          >
            Difficulty
          </label>
          <select
            name="difficulty"
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>

      <div className="mt-8">
        {exercises.length > 0 ? (
          <ul className="space-y-4">
            {exercises.map((exercise) => (
              <li
                key={exercise._id}
                className="p-4 border border-gray-200 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold">{exercise.name}</h3>
                <p>{exercise.description}</p>
                <p>
                  <strong>Muscle Group:</strong> {exercise.muscleGroup}
                </p>
                <p>
                  <strong>Equipment:</strong> {exercise.equipment}
                </p>
                <p>
                  <strong>Difficulty:</strong> {exercise.difficulty}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No exercises found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
