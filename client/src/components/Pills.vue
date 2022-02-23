<template>
  <div>
    <transition-group
      v-if="ticketName"
      class="pills-wrapper"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      tag="pill"
      appear
    >
      <pill
        :props="fibo"
        v-for="(fibo, i) in fibonacciBtn"
        :key="i"
        :data-index="i"
        @click="handlePoints(fibo)"
      ></pill>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import gsap from "gsap";
import socket from "../services/socket.service";
import { useStore } from "@/store";
import Pill from "./Pill.vue";

export default defineComponent({
  components: {
    Pill,
  },
  setup() {
    const store = useStore();
    const color = ref("");
    const colors = ["red", "black"];

    const pokerNames = [
      "BIconSuitClubFill",
      "BIconSuitDiamondFill",
      "BIconSuitHeartFill",
      "BIconSuitSpadeFill",
    ];

    const ticketName = computed(() => store.getCurrentTicketName);

    const fibonacciBtn = computed(() => store.getFibonacci);

    const beforeEnter = (el: HTMLElement) => {
      (el.style.opacity = "0"), (el.style.transform = "translateX(100px)");
    };

    const enter = (el: HTMLElement, done: () => void) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.2,
        delay: Number(el.dataset.index) * 0.2,
        onComplete: done,
      });
    };

    const leave = (el: HTMLElement) => {
      gsap.from(el, {
        opacity: 0,
        x: 100,
        duration: 0.2,
        delay: Number(el.dataset.index) * 0.2,
        ease: "Elastic.easeOut",
      });
    };

    const handlePoints = ({
      number,
      icon,
      color,
    }: {
      number: number;
      icon: string;
      color: string;
    }) => {
      const userPointData = {
        point: number,
        icon,
        color,
      };
      socket.AddPoint(userPointData);
    };

    return {
      handlePoints,
      fibonacciBtn,
      beforeEnter,
      enter,
      ticketName,
      color,
      leave,
    };
  },
});
</script>

<style scoped>
.pills-wrapper {
  display: grid;
  place-items: center;
  margin-top: 60px;
  row-gap: 1rem;
}
</style>
