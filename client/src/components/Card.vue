<template>
  <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" appear>
    <div class="flip-card">
      <p>{{ username }}</p>
      <div :class="`flip-card-inner ${isReveal ? 'flip-it' : ''}`">
        <div class="flip-card-front">
          <!-- <img src="/images/question.jpeg" alt="Avatar" /> -->
        </div>
        <div class="flip-card-back">
          <div class="grid-item">
            <div class="top-left">
              <p>{{ number }}</p>
              <div>
                <component :is="icon" :style="{ color: color }"></component>
              </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div class="middle">
              <component :is="icon" :style="{ color: color }"></component>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div class="bottom-right">
              <p>{{ number }}</p>
              <div>
                <component :is="icon" :style="{ color: color }"></component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
import gsap from "gsap";
import {
  BIconSuitSpadeFill,
  BIconSuitHeartFill,
  BIconSuitDiamondFill,
  BIconSuitClubFill,
} from "bootstrap-icons-vue";

export default defineComponent({
  props: ["color", "icon", "number", "username"],
  components: {
    BIconSuitClubFill,
    BIconSuitDiamondFill,
    BIconSuitHeartFill,
    BIconSuitSpadeFill,
  },
  setup() {
    const store = useStore();
    const { reveal } = storeToRefs(store);

    const beforeEnter = (el: HTMLElement) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(-40px)";
    };

    const enter = (el: HTMLElement) => {
      gsap.to(el, {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "bounce.out",
        delay: 0.2
      });
    };

    const leave = (el: HTMLElement) => {
      gsap.from(el, {
        duration: 1,
        y: -40,
        opacity: 0,
      });
    };

    const isReveal = computed(() => reveal.value.reveal);

    return { isReveal, beforeEnter, enter, leave };
  },
});
</script>

<style scoped>
.grid-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
  grid-gap: 2px;
  background-color: white;
  color: var(--primary);
  font-size: 1.5em;
  height: 220px;
  /* padding: 10px; */
  border-radius: 5%;
  /* box-shadow: 0px 5px 15px grey; */
}

.heart {
  text-align: center;
  align-self: center;
  font-size: 2em;
  color: red;
}

.top-left {
  /* padding: 0.1em; */
  position: absolute;
  top: 1px;
  left: 0px;
}

.bottom-right {
  align-self: end;
  transform: rotate(180deg);
  position: absolute;
  bottom: 5px;
  right: 2px;
}
.middle {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 100px;
}
.flip-card {
  background-color: transparent;
  width: 150px;
  height: 220px;
  border-radius: 10px;
  /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}
.flip-card p {
  text-align: center;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  border-radius: 10px;
}

.flip-it {
  transform: rotateY(180deg);
}
/* Do an horizontal flip when you move the mouse over the flip box container */
/* .flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
} */

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border: 2px solid var(--line);
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: rgb(218, 222, 226);
  color: black;
  border-radius: 10px;
  background-image: url("/images/question.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  filter: brightness(70%);
  background-position: center;
}

.flip-card-front img {
  width: 150px;
  height: 220px;
  border-radius: 10px;
}

/* Style the back side */
.flip-card-back {
  background-color: #fff;
  color: black;
  font-weight: 900;
  transform: rotateY(180deg);
  border-radius: 10px;
  display: grid;
  place-items: center;
}

.flip-card-back p {
  font-size: 25px;
  font-weight: 600;
  color: black !important;
}
</style>
