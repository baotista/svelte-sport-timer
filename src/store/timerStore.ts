import { writable, type Writable } from "svelte/store";
import type { Exercise } from "../models/Exercise";

export type ExerciseAction = {
  type: "start" | "next_series" | "reset" | "pause_timer";
};

type ExerciseActionWithPayloadType =
  | "setSeries"
  | "setTime"
  | "setCurrentSeries"
  | "set_time_elapsed"
  | "set_interval_id";

export type ExerciseActionWithPayload = {
  type: ExerciseActionWithPayloadType;
  payload: number;
};

export const InitialExercise: Exercise = {
  series: 1,
  time: 0,
  currentSeries: 1,
  timeElapsed: 0,
};

let TimerValue: Exercise = InitialExercise;

const exerciseReducer: (
  state: Exercise,
  action: ExerciseAction | ExerciseActionWithPayload
) => Exercise = (state, action) => {
  const { type } = action;

  switch (type) {
    case "start":
      return {
        ...state,
        currentSeries: state.currentSeries === 0 ? 1 : state.currentSeries,
      };
    case "setSeries":
      return {
        ...state,
        series: action.payload,
      };
    case "setTime":
      return {
        ...state,
        time: action.payload,
      };
    case "setCurrentSeries":
      return {
        ...state,
        currentSeries: action.payload,
      };
    case "set_time_elapsed":
      return {
        ...state,
        timeElapsed: action.payload,
      };
    case "next_series":
      return {
        ...state,
        currentSeries:
          state.currentSeries < state.series
            ? state.currentSeries + 1
            : state.currentSeries,
        timeElapsed: state.currentSeries < state.series ? 0 : state.timeElapsed,
      };
    case "reset":
      return {
        ...state,
        timeElapsed: 0,
        currentSeries: 1,
      };
    case "set_interval_id":
      return {
        ...state,
        intervalId: action.payload,
      };
    case "pause_timer":
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      return {
        ...state,
        intervalId: undefined,
      };
    default:
      return { ...state };
  }
};

export default exerciseReducer;

export const TimerStore: Writable<Exercise> = writable(TimerValue);

TimerStore.subscribe((value) => (TimerValue = value));

export const dispatch: (
  action: ExerciseAction | ExerciseActionWithPayload
) => void = (action) => {
  TimerStore.set(exerciseReducer(TimerValue, action));
};
