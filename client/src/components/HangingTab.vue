<template>
  <div class="tab">
    <Tab />
    <toggle-points></toggle-points>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tab from "./ui/Hamburger.vue";
import TogglePoints from "./ui/PointsToggle.vue";

export default defineComponent({
  components: {
    Tab,
    TogglePoints,
  },

  setup() {
    return {};
  },
});
</script>

<style scoped>
.tab {
  position: fixed;
  left: calc(50% - 120px);
  right: 0px;
  bottom: 10px;
  width: 250px;
  box-sizing: border-box;
  height: 70px;
  border-radius: 5px;
  background-color: var(--input);
  display: none;
  z-index: 1000;
}

@media screen and (max-width: 925px) {
  .tab {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    /* align-items: center; */
    /* padding: 5px; */
  }
}
</style>
