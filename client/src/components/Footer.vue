<template>
  <div class="footer">
    <p class="ticket--name">{{ ticket }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore();
    const ticket = computed(() => store.getCurrentTicketName);
    return { ticket };
  },
});
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 80px;
  display: grid;
  place-items: center;
  right: 5px;
  bottom: 2px;
}

p {
  font-size: 55px;
  opacity: 0.09;
}

@media screen and (max-width: 925px) {
  .footer {
    left: 0;
    bottom: 70px;
    right: 0;
  }
}
</style>
