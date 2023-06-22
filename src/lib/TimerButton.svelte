<script lang="ts">
  import { getContext } from "svelte";
  import type {
    ExerciseAction,
    ExerciseActionWithPayload,
  } from "../store/timerStore";
  import { TimerStore } from "../store/timerStore";
  import { onDestroy } from "svelte";

  const dispatch =
    getContext<(action: ExerciseAction | ExerciseActionWithPayload) => void>(
      "timer"
    );

  let timeElapsed, time;

  const timerUnsub = TimerStore.subscribe((exercise) => {
    timeElapsed = exercise.timeElapsed;
    time = exercise.time;
  });

  const runTimer = () => {
    let elapsedTime = timeElapsed;
    let lastUpdate = Date.now();

    dispatch({
      type: "set_interval_id",
      payload: setInterval(() => {
        if (elapsedTime < time) {
          const now = Date.now();
          const dt = now - lastUpdate;

          elapsedTime = elapsedTime + dt / 1000;
          lastUpdate = now;
          dispatch({
            type: "set_time_elapsed",
            payload: Math.round(elapsedTime * 100) / 100,
          });
        } else {
          dispatch({ type: "set_interval_id", payload: undefined });
          return;
        }
      }),
    });
  };

  const handleStart = () => {
    dispatch({ type: "start" });
    runTimer();
  };

  onDestroy(() => timerUnsub());
</script>

<div class="btnBar">
  <button class="btn" on:click={handleStart}> ▶ </button>
  <button class="btn" on:click={() => dispatch({ type: "pause_timer" })}>
    ⏯
  </button>
  <button class="btn" on:click={() => dispatch({ type: "next_series" })}>
    ⏭
  </button>
  <button class="btn" on:click={() => dispatch({ type: "reset" })}> ⌫ </button>
</div>

<style>
  .btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    appearance: none;
    border: none;
    color: white;
    background: rgb(48, 62, 116);
    border: 1px solid rgb(70, 89, 168);
    font-size: 24px;
    padding: 0;
  }

  .btnBar {
    display: flex;
    gap: 8px;
  }
</style>
