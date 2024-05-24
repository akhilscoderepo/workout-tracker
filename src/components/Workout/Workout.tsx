import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  ExerciseDetails,
  ExerciseTracker,
  ExerciseUpdate,
} from "../../types/exerciseTracker";
import { CheckBadgeIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import { nanoid } from "nanoid";
import { trackWorkout, updateStatus } from "../../features/workoutSlice";

const Workout = () => {
  const exerciseTracker = useSelector<RootState, ExerciseTracker>(
    (state) => state.workoutSlice
  );
  const dispatch = useDispatch();
  const exerciseDafualtData: ExerciseDetails = {
    id: nanoid(),
    reps: 0,
    weight: 0,
    isDone: false,
  };

  return (
    <div>
      <div className="flex justify-center pt-1">
        <table className="border border-b-zinc-800 ">
          <thead className="border border-b-zinc-800  bg-red-50">
            <tr className="border border-b-zinc-800">
              <th className="border border-b-zinc-800 p-2 m-2 border-r-red-50 font-medium text-left">
                Name
              </th>
              <th className="border border-b-zinc-800  p-2 m-2 border-r-red-50 font-medium text-left">
                Reps
              </th>
              <th className="border border-b-zinc-800  p-2 m-2 border-r-red-50 font-medium text-left">
                Weight(Kgs)
              </th>
              <th className="border border-b-zinc-800  p-2 m-2 border-r-red-50 font-medium text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(exerciseTracker).map((exerciseName) => (
              <div>
                <tr
                  className="border border-b-zinc-800 p-2 m-2 "
                  key={exerciseName}
                >
                  {exerciseTracker[exerciseName].map((data) => (
                    <div key={data.id}>
                      <td className="border border-b-zinc-800 p-2 m-2 text-left">
                        {exerciseName}
                      </td>
                      <td>
                        <input
                          type="number"
                          min={"1"}
                          max={"100"}
                          placeholder="12"
                          value={data.reps}
                          required
                        ></input>
                      </td>
                      <td>
                        <input
                          type="number"
                          min={"1"}
                          max={"1000"}
                          placeholder="10"
                          step="0.01"
                          required
                          value={data.weight}
                        ></input>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            const exerciseUpdate: ExerciseUpdate = {
                              [exerciseName]: { ...data, isDone: !data.isDone },
                            };
                            dispatch(updateStatus(exerciseUpdate));
                          }}
                        >
                          {!data.isDone ? (
                            <PlayCircleIcon className="size-6 fill-zinc-950 m-1" />
                          ) : (
                            <CheckBadgeIcon className="size-6 fill-orange-400 m-1" />
                          )}
                        </button>
                      </td>
                    </div>
                  ))}
                </tr>
                <div>
                  <button
                    onClick={() => {
                      const exerciseData: ExerciseTracker = {
                        [exerciseName]: [exerciseDafualtData],
                      };
                      dispatch(trackWorkout(exerciseData));
                    }}
                    className="flex items-center bg-orange-50 px-1 py-1 m-1 rounded-md text-zinc-800 text-base w-full h-8 font-semibold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add New Set
                  </button>
                </div>
              </div>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className="flex justify-center pt-1">Finish workout</button>
      </div>
    </div>
  );
};

export default Workout;
