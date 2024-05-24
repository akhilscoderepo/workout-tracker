import {ExerciseStatus} from "../enums/ExerciseStatus"

export interface ExerciseDetails{
    id: string,
    reps : number,
    weight : number,
    isDone : boolean
}

export interface ExerciseTracker {
    [exerciseName: string]: ExerciseDetails[]
}

export interface ExerciseUpdate{
    [exerciseName: string]: ExerciseDetails
}