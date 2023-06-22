<script lang="ts">
  import TimerButton from "./lib/TimerButton.svelte";
  import TimerScreen from "./lib/TimerScreen.svelte";
  import TimerContext from "./timerContext";
  import TimerSettings from "./lib/TimerSettings.svelte";

  TimerContext();
</script>

<main>
  <TimerScreen />
  <TimerButton />
  <TimerSettings />
</main>

<style>
</style>
