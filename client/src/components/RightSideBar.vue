<template>
  <div class="right-side-bar">
    <Pills />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import gsap from "gsap";
import socket from "../services/socket.service";
import { useStore } from "@/store";
import Pills from "./Pills.vue";


export default defineComponent({
  components: {
    Pills,
  },
  setup() {
   //

   return {}
  },
});
</script>

<style scoped>
.right-side-bar {
  height: 100vh;
  /* border-left: 0.2px solid var(--button); */
  width: 7rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  right: 0px;
  top: 0px;
  align-items: center;
}

/* .pills-wrapper {
  display: grid;
  place-items: center;
  margin-top: 60px;
  row-gap: 1rem;
} */

@media  screen and (max-width: 925px) {
  .right-side-bar {
    display: none;
  }
}
</style>
