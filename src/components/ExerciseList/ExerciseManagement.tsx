import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Exercise from "../../types/exercise";
import { Link } from "react-router-dom";
import { ExerciseDetails, ExerciseTracker } from "../../types/exerciseTracker";
import { trackWorkout } from "../../features/workoutSlice";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const ExerciseManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exerciseSelection = useSelector<RootState, Exercise[]>(
    (state) => state.exerciseSlice
  );
  const isExerciseSelected = () => {
    if (exerciseSelection.length < 1) {
      return false;
    }
    var exerciseSelected = false;
    exerciseSelection.forEach((exercise) => {
      if (exercise.trackExercise) {
        exerciseSelected = true;
      }
    });
    return exerciseSelected;
  };

  const handleWorkout = () => {
    const exerciseDafualtData: ExerciseDetails = {
      id: nanoid(),
      reps: 0,
      weight: 0,
      isDone: false,
    };

    exerciseSelection.forEach((exercise) => {
      const exerciseName: string = exercise.name || "";
      const exerciseData: ExerciseTracker = {
        [exerciseName]: [exerciseDafualtData],
      };
      dispatch(trackWorkout(exerciseData));
    });
    navigate("/workout");
  };

  return (
    <div className="flex justify-center items-center">
      <button
        disabled={!isExerciseSelected()}
        onClick={() => handleWorkout()}
        className="flex items-center bg-orange-50 px-1 py-1 m-1 rounded-md text-zinc-800 text-base w-28 h-12 font-semibold"
      >
        Start Workout
      </button>

      <Link to="/createTemplate">
        <button
          disabled={!isExerciseSelected()}
          className="flex items-center bg-orange-50 px-1 py-1 m-1 rounded-md text-zinc-800 text-base w-30 h-12 font-semibold"
        >
          Create Template
        </button>
      </Link>
    </div>
  );
};

export default ExerciseManagement;
