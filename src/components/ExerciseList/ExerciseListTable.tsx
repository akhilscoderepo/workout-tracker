import Exercise from "../../types/exercise";
import ExerciseManagement from "./ExerciseManagement";
import { CheckBadgeIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateWorkout } from "../../features/exerciseSlice";
import { nanoid } from "nanoid";

const ExerciseListTable = (props: { tableData: Exercise[] }) => {
  const exerciseSelection = useSelector<RootState, Exercise[]>(
    (state) => state.exerciseSlice
  );
  const dispatch = useDispatch();

  const renderActionButton = (exercise: Exercise) => {
    return (
      <button onClick={() => toggleActionButton(exercise)}>
        {!exerciseSelection.find(
          (currentExercise) => currentExercise.name === exercise.name
        )?.trackExercise ? (
          <PlusCircleIcon className="size-6 fill-zinc-950 m-1" />
        ) : (
          <CheckBadgeIcon className="size-6 fill-orange-400 m-1" />
        )}
      </button>
    );
  };

  const toggleActionButton = (exercise: Exercise) => {
    dispatch(updateWorkout(exercise));
  };

  return (
    <div>
      <ExerciseManagement />
      <div className="flex justify-center pt-1">
        <table className="border border-b-zinc-800 ">
          <thead className="border border-b-zinc-800  bg-red-50">
            <tr className="border border-b-zinc-800">
              <th className="border border-b-zinc-800 p-2 m-2 border-r-red-50 font-medium text-left">
                Name
              </th>
              <th className="border border-b-zinc-800  p-2 m-2 border-r-red-50 font-medium text-left">
                Difficulty
              </th>
              <th className="border border-b-zinc-800  p-2 m-2 border-r-red-50 font-medium text-left">
                Equipment
              </th>
              <th className="border border-b-zinc-800  p-2 m-2 border-r-red-50 font-medium text-left">
                Target Muscle
              </th>
              <th className="border border-b-zinc-800 p-2 m-2 border-r-red-50 font-medium text-left">
                Type
              </th>
              <th className="border border-b-zinc-800 p-2 m-2 border-r-red-50 font-medium text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props.tableData.map((exercise) => (
              <tr className="border border-b-zinc-800 p-2 m-2 " key={nanoid()}>
                <td className="border border-b-zinc-800 p-2 m-2 text-left">
                  {exercise.name}
                </td>
                <td className="border border-b-zinc-800 p-2 m-2 text-left">
                  {exercise.difficulty}
                </td>
                <td className="border border-b-zinc-800 p-2 m-2 text-left">
                  {exercise.equipment}
                </td>
                <td className="border border-b-zinc-800 p-2 m-2 text-left">
                  {exercise.muscle}
                </td>
                <td className="border border-b-zinc-800 p-2 m-2 text-left">
                  {exercise.type}
                </td>
                <td className="border border-b-zinc-800 p-2 m-2 text-left">
                  {renderActionButton(exercise)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExerciseListTable;
