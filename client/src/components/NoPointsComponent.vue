<template>
<transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      appear
    >
  <div class="live-game-wrapper">
    <!-- <h2>Scrum Poker</h2> -->
    <div class="icon">
      <BIconSuitClubFill
        :style="{ width: '100%', height: '100%' }"
      />
    </div>
  </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { BIconSuitClubFill } from "bootstrap-icons-vue";
import gsap from 'gsap';

export default defineComponent({
  components: {
    BIconSuitClubFill,
  },
  setup() {

    const beforeEnter = (el: HTMLElement) => {
      el.style.opacity = "0";
    };

     const enter = (el: HTMLElement, done: () => void) => {
      gsap.to(el, {
        opacity: 0.1,
        onComplete: done,
        ease: "Elastic.easeOut",
      });
    };

    const leave = (el: HTMLElement) => {
      gsap.from(el, {
        delay: 1.2,
        opacity: 0,
      });
    };
    return { enter, leave, beforeEnter};
  },
});
</script>

<style scoped>
.live-game-wrapper {
  display: grid;
  place-items: center;
  opacity: 0.1;
  width: calc(50% - 150px);
  position: relative;
}

.live-game-wrapper h2 {
  position: absolute;
  top: -35px;
}

.icon {
  border: 2px solid var(--input);
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: transparent;
}

small {
  font-size: 12px;
}

@media screen and (max-width: 925px) {
  .live-game-wrapper {
    margin: 200px auto;
  }
}

@media screen and (max-width: 725px) {
  .live-game-wrapper {
    width: 50%;
  }
}

@media screen and (max-width: 325px) {
  .live-game-wrapper h2 {
    font-size: 12px;
  }
}
</style>
