import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {ExerciseDetails, ExerciseTracker, ExerciseUpdate} from "../types/exerciseTracker";
import { WritableDraft } from "immer";

const initialState: ExerciseTracker = {};

const workoutSlice = createSlice({
    name: "exerciseTracker",
    initialState,
    reducers:{
        trackWorkout: (state, action: PayloadAction<ExerciseTracker>) => {
            const exerciseNames = Object.keys(action.payload);

            // If there is only one exercise name in the payload
            if (exerciseNames.length === 1) {
              const exerciseName = exerciseNames[0];
              const exerciseDetails: ExerciseDetails[] = action.payload[exerciseName];
                return{
                    ...state,
                    [exerciseName]: Array.isArray(state[exerciseName])
                                    ? [...state[exerciseName], ...exerciseDetails]
                                    : exerciseDetails
                    
                }
            }
            return {
                ...state,
                ...action.payload
              };
        },
        updateStatus : (state, action: PayloadAction<ExerciseUpdate>) => {
            const exerciseNames = Object.keys(action.payload);

            if (exerciseNames.length === 1) {
                const exerciseName = exerciseNames[0]
                const exerciseDetail: ExerciseDetails = action.payload[exerciseName];
                const updatedState: WritableDraft<ExerciseTracker> = {
                    ...state,
                    [exerciseName]: Array.isArray(state[exerciseName])
                      ? state[exerciseName].map((exercise) =>
                          exercise.id === exerciseDetail.id ? exerciseDetail : exercise
                        )
                      : [exerciseDetail],
                  };
                
                  return updatedState;
            }
        }
    }
})

export const {trackWorkout,updateStatus } = workoutSlice.actions

export default workoutSlice.reducer;