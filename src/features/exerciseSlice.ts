import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Exercise from "../types/exercise";

const initialState: Exercise[] = [];

const exerciseSlice = createSlice({
    name: "exercise",
    initialState,
    reducers:{
        updateWorkout: (state, action: PayloadAction<Exercise>) => {
            const exerciseIndex = state.findIndex(
                (exercise) => exercise.name === action.payload.name
              );
            
              if (exerciseIndex === -1) {
                return [...state, { ...action.payload, trackExercise: true }];
              } else {
                return state.map((exercise, index) =>
                  index === exerciseIndex
                    ? { ...exercise, trackExercise: !exercise.trackExercise }
                    : exercise
                );
              }

        }
    }
})

export const {updateWorkout} = exerciseSlice.actions

export default exerciseSlice.reducer;