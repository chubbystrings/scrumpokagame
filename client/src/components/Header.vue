<template>
  <header class="header">
    <h1 class="team--name">{{ team }}</h1>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../store";

export default defineComponent({
  setup() {
    const store = useStore();

    const team = computed(() => store.getTeamName);

    return { team };
  },
});
</script>

<style scoped>
.header {
  position: absolute;
  top: 0px;
  width: 100%;
  display: grid;
  place-items: center;
  z-index: 5;
  /* padding-left: 70px; */
}

.team--name {
  font-size: 45px;
  opacity: 0.2;
}

.header img {
  width: 300px;
  height: 100px;
}
</style>
