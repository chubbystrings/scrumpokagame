<template>
  <div class="notification">
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  props: ["message"],
  setup() {
    return {};
  },
});
</script>

<style scoped>
.notification {
  background-color: var(--input);
  border-left: 5px solid var(--lighter);
  border-radius: 2px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 300px;
  position: absolute;
  right: 10px;
  perspective: 1000px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  top: 15px;
}
.notification:before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 12px solid transparent;
  border-left: 12px solid var(--input);
  right: -23px;
  bottom: 10px;
}

.notification p {
  color: #fff !important;
  font-size: 12px !important;
}
</style>
