<template>
  <div>
    <label>Select Avatar</label>
    <div class="select--avatar">
      <img
        @click="handleSelect()"
        :src="avatar"
        :class="selectedAvatar ? 'selectedAvatar' : ''"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: ["avatar"],
  setup(props) {
    const selectedAvatar = ref("");
    const handleSelect = () => {
      selectedAvatar.value = props.avatar;
    };
    return { handleSelect, selectedAvatar };
  },
});
</script>

<style scoped>
.select--avatar {
  display: flex;
  gap: 10px;
}

.select--avatar img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.select--avatar img:hover {
  filter: blur(2px);
  cursor: pointer;
}

.selectedAvatar {
  filter: blur(1px);
}
</style>
