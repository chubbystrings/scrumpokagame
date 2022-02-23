<template>
  <div :class="classes">
    <div class="avatars-wrapper">
      <Avatar v-for="(user, i) in users" :key="i" :user="user"></Avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from "vue";
import Avatar from "./Avatar.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    Avatar,
  },
  props: ["users"],
  setup() {
    const example = {
      username: "martins",
    };
    const store = useStore();
    const classes = ref("left-side-bar");
    const isOpen = computed(() => store.getSideBarStatus);

    watch(isOpen, () => {
      if (isOpen.value) {
        classes.value = "showSideBar";
      } else {
        classes.value = "left-side-bar";
      }
    });

    return { example, classes };
  },
});
</script>

<style scoped>
.left-side-bar {
  height: 100vh;
  /* border-right: 0.2px solid var(--button); */
  transition: transform 250ms ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  border-width: 1px;
  box-sizing: border-box;
  padding-left: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background: var(--input);
  
}

.avatars-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: absolute;
  /* right: -25px; */
  top: 60px;
  width: 100%;
  padding-bottom: 20px;
  box-sizing: border-box;
}



@media screen and (max-width: 925px) {
  .left-side-bar {
    position: fixed;
    left: 0;
    width: 150px;
    transform: translateX(-250px);
    transition: transform 250ms ease-in-out;
  }

  .showSideBar {
    position: fixed;
    left: 0;
    width: 150px;
    transition: transform 250ms ease-in-out;
    background: var(--input);
    transform: translateX(0);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    perspective: 100px;
    transition: transform 250ms ease-in-out;
    height: 100vh;
    padding: 5px;
    z-index: 100;
  }
}
</style>
