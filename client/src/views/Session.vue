<template>
  <div class="home">
    <CoreComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import { defineComponent, onMounted } from "vue";
import CoreComponent from "@/components/CoreComponent.vue";

export default defineComponent({
  components: {
    CoreComponent,
  },
  setup() {
    onMounted(() => {
      //
    });
    return {};
  },
});
</script>
