<script lang="ts">
  import { getContext } from "svelte";
  import {
    TimerStore,
    type ExerciseAction,
    type ExerciseActionWithPayload,
  } from "../store/timerStore";

  const dispatch =
    getContext<(action: ExerciseAction | ExerciseActionWithPayload) => void>(
      "timer"
    );

  const updateSeries = (e) => {
    const { value } = e.target;
    if (parseInt(value)) {
      dispatch({ type: "setSeries", payload: parseInt(value) });
    }
  };

  const updateTime = (e) => {
    const { value } = e.target;

    if (parseInt(value)) {
      dispatch({ type: "setTime", payload: parseInt(value) });
    }
  };
</script>

<div class="container">
  <div class="formGroup">
    <label for="series">Series</label>
    <input
      type="number"
      id="series"
      value={$TimerStore?.series}
      on:change={updateSeries}
      min={1}
    />
  </div>
  <div class="formGroup">
    <label for="time">Time per serie</label>
    <input
      id="time"
      type="number"
      value={$TimerStore?.time}
      on:change={updateTime}
      min={1}
    />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    margin-top: 36px;
  }

  .container > * {
    margin-bottom: 16px;
  }

  .formGroup {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .formGroup label {
    font-size: 12px;
  }

  .formGroup input {
    width: 100%;
    box-sizing: border-box;
  }
</style>
