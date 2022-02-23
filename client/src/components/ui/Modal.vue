<template>
  <div class="modal">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";

import { useStore } from "@/store";

export default defineComponent({
  props: ["image", "location", "name"],

  setup() {
    const store = useStore();

    const handleClick = () => store.closeModal();

    const isOpen = computed(() => store.getModalStatus);

    return { handleClick, isOpen };
  },
});
</script>
<style scoped>
.modal {
  /* position: absolute; */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  max-width: 30rem;
  max-height: 400px;
  z-index: 999;
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
  padding: 20px;
  box-sizing: border-box;
  place-items: center;
  border: 1px solid red;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;
  max-height: 400px;
  background: var(--card);
  border: 1px solid var(--line);
}

.body {
  width: 100%;
}

.info--wrapper {
  display: grid;
  grid-template-rows: 4fr 0.5fr;
  width: 100%;
}

.img {
  /* width: 100%; */
  /* height: 70vh; */
  /* object-fit: cover;
      object-position: 100% 30%; */
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-position: center center;
}

.info {
  padding: 25px;
}


@media screen and (max-width: 325px) {
  .header h2 {
    font-size: 15px;
  }
  small {
    font-size: 12px;
  }
}

@media screen and (max-width: 875px) {
  .modal {
    width: calc(100% - 100px);
  }
}

@media screen and (max-width: 375px) {
  .modal {
    width: calc(100% - 30px);
  }
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
</style>
