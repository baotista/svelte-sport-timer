<script lang="ts">
  import { TimerStore } from "../store/timerStore";
</script>

<div class="container">
  <div class="time">
    <div>⏱</div>
    <div class="timeValue">{$TimerStore.timeElapsed.toFixed(2)}</div>
  </div>
  <div>
    series : {$TimerStore.currentSeries} / {$TimerStore.series}
  </div>
</div>

<style>
  .time {
    font-size: 64px;
    display: flex;
  }

  .time .timeValue {
    flex: 1;
  }

  .container {
    margin-bottom: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
</style>
