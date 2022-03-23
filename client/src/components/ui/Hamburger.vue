<template>
  <div :class="`${classes} hamburger-wrapper`">
    <button class="hamburger" @click="handleClick"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore();
    const classes = computed(() =>
      store.getSideBarStatus ? "rotate" : "normal"
    );

    const handleClick = () => {
      store.toggleSideBar();
    };

    return { classes, handleClick };
  },
});
</script>

<style scoped>
.hamburger {
  background-color: var(--input);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primary);
}

.normal .hamburger::before {
  content: "";
  background-color: var(--button);
  height: 2px;
  width: 10px;
  position: absolute;
  transition: all 0.5s ease;
  top: 1rem;
  transform: rotate(0);
}

.normal .hamburger::after {
  content: "";
  background-color: var(--button);
  height: 2px;
  width: 10px;
  position: absolute;
  transition: all 0.5s ease;
  top: 1.5rem;
  transform: rotate(0);
}

.rotate .hamburger::before {
  content: "";
  background-color: var(--button);
  height: 2px;
  width: 10px;
  position: absolute;
  transition: all 0.5s ease;
  top: 1.5;
  transform: rotate(135deg);
}

.rotate .hamburger::after {
  content: "";
  background-color: var(--button);
  height: 2px;
  width: 10px;
  position: absolute;
  transition: all 0.5s ease;
  top: 1.2;
  transform: rotate(-135deg);
}
</style>
