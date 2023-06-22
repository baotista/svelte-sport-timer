import { setContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import {
  dispatch,
  type ExerciseAction,
  type ExerciseActionWithPayload,
} from "./store/timerStore";

const TimerContext = () => {
  setContext<(action: ExerciseAction | ExerciseActionWithPayload) => void>(
    "timer",
    dispatch
  );
};

export default TimerContext;
