<template>
  <div class="pill">
    <div>
      {{ props.number }}
    </div>

    <div>
      <component :is="props.icon" :style="{ color: props.color }"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  BIconSuitSpadeFill,
  BIconSuitHeartFill,
  BIconSuitDiamondFill,
  BIconSuitClubFill,
} from "bootstrap-icons-vue";

export default defineComponent({
  props: ["props"],
  components: {
    BIconSuitClubFill,
    BIconSuitDiamondFill,
    BIconSuitHeartFill,
    BIconSuitSpadeFill,
  },

  setup() {
    return {};
  },
});
</script>

<style scoped>
.pill {
  border-radius: 25px;
  width: 80px;
  height: 30px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  justify-content: space-around;
  /* padding: 10px; */
  background: var(--input);
  cursor: pointer;
  transition: all 0.3s;
  align-items: center;
}
.pill:hover,
.btn:focus {
  filter: brightness(70%);
}

.pill img {
  width: 15px;
  height: 15px;
}
</style>
