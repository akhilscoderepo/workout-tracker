import { configureStore } from '@reduxjs/toolkit'
import exerciseSlice from '../features/exerciseSlice'
import workoutSlice from '../features/workoutSlice';

const store =  configureStore({
    reducer: {
        exerciseSlice,
        workoutSlice
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>;


