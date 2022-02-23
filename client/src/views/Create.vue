<template>
  <Create />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Create from "../components/CreateComponent.vue";

export default defineComponent({
  components: {
    Create,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
