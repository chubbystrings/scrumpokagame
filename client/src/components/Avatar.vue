<template>
  <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" appear>
    <div class="wrapper">
      <div class="img-circle">
        <img :src="user?.avatar ? user.avatar : '/images/default-avatar.png'" />
      </div>
      <div>
        <small class="user--name">{{ user.username }}</small>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import gsap from "gsap";

export default defineComponent({
  props: ["user"],
  setup() {
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
      });
    };

    const leave = (el: HTMLElement) => {
      gsap.from(el, {
        duration: 1,
        y: -40,
        opacity: 0,
      });
    };
    return { leave, enter, beforeEnter };
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}

.user--name {
  text-align: center;
}

.img-circle {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 3px solid var(--line);
  padding: 5px;
  text-align: center;
}

.img-circle img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
