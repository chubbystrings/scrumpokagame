<template>
  <Modal>
    <template v-slot:header>
      <h2>Oops Session Ended</h2>
    </template>
    <template v-slot:body>
      <div class="content-text">
        <h3 class="session-end-text">This session has ended abruptly...</h3>
        <small class="session-end-text small-text"
          >Click ok to create a new session</small
        >
      </div>
    </template>
    <template v-slot:actions>
      <div class="action-btn-wrapper">
        <button class="btn" @click="handleOk">Ok</button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Modal from "./ui/Modal.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const handleOk = () => {
      store.closeModal();
      router.replace("/");
    };
    return { handleOk };
  },
});
</script>

<style scoped>
.session-end-text {
  text-align: center;
}
.small-text {
  font-size: 12px;
  text-align: center;
}

.content-text {
  display: grid;
  place-items: center;
}
</style>
