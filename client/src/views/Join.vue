<template>
  <join-session></join-session>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JoinSession from "@/components/JoinSession.vue";

export default defineComponent({
  components: {
    JoinSession,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
