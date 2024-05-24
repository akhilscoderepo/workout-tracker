import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import ExerciseListTable from "./ExerciseListTable";
import Exercise from "../../types/exercise";

const fetchExercises = async (exercise: string): Promise<Exercise[]> => {
  const apiUrl = `${process.env.REACT_APP_API_URL}?name=${exercise}`;
  const apiKey = process.env.REACT_APP_SECRET_KEY;
  if (!apiKey) {
    throw new Error("API key is missing");
  }
  const headers = {
    "Content-Type": "application/json",
    "X-Api-Key": apiKey,
  };
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Failed to fetch exercise list: ${errorDetails.message}`);
    }

    const data: Exercise[] = await response.json();
    return addExerciseTracking(data);
  } catch (error) {
    console.error("Error fetching exercise list:", error);
    throw error;
  }
};

const addExerciseTracking = (data: Exercise[]): Exercise[] => {
  return data.map((exercise) => ({ ...exercise, trackExercise: false }));
};

const ExerciseListPage = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [exercise, setExercise] = useState<string>("");
  const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => fetchExercises(exercise),
    enabled: isQueryEnabled,
  });

  const searchExercise = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const exerciseInput = (
      e.currentTarget.elements.namedItem("searchBar") as HTMLInputElement
    ).value;
    setExercise(exerciseInput);
    setIsQueryEnabled(true);
    refetch();
  };

  return (
    <div>
      <div id="search">
        <form
          onSubmit={(e) => searchExercise(e)}
          className="flex items-center justify-center"
        >
          <input
            id="search-bar"
            type="text"
            className="p-1 m-1 rounded-md focus:outline-none w-96 h-8 focus:placeholder-transparent placeholder:text-zinc-600"
            placeholder="enter search term"
            name="searchBar"
            onChange={(e) => setIsDisabled(e.target.value === "")}
          ></input>
          <button
            type="submit"
            className="flex items-center bg-orange-50 px-1 py-1 m-1 rounded-md text-zinc-800 text-base w-20 h-8 font-semibold"
            disabled={isDisabled}
          >
            Search
            <MagnifyingGlassIcon className="size-4 fill-zinc-950 m-1 " />
          </button>
        </form>
      </div>
      <div>
        <hr className="my-4 border-t border-zinc-800 shadow-zinc-800" />
        <span id="results-alt" className="text-zinc-800 text-lg p-1 m-1">
          {!isLoading
            ? !data && `Your results will appear here.`
            : `Fetching exercises`}
        </span>
        <span className="text-red-400">{isError && error.message}</span>
        {data && <ExerciseListTable tableData={data}></ExerciseListTable>}
      </div>
    </div>
  );
};

export default ExerciseListPage;
