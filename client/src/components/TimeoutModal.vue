<template>
  <Modal>
    <template v-slot:header>
      <h2>Session Timeout</h2>
    </template>
    <template v-slot:body>
      <div class="content-text">
        <h3 class="session-end-text">
          We have noticed inactivity, click continue or end to end this session.
        </h3>
        <small class="counter-text">{{ counter }}</small>
      </div>
    </template>
    <template v-slot:actions>
      <div class="action-btn-wrapper">
        <button class="btn" @click="handleEnd">End</button>
        <button class="btn" @click="handleContinue">Continue</button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, computed } from "vue";
import { useRouter } from "vue-router";
import Modal from "./ui/Modal.vue";
import { useStore } from "@/store";
import socket from "../services/socket.service";
import { TIME_OUT } from "@/utils/ModalNames";

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let timer: number;
    const counter = ref(10);

    const isMounted = computed(
      () => store.getCurrentModalComponent === TIME_OUT
    );

    const handleEnd = () => {
      socket.timeoutResponse(store.getCurrentUser.room, false, () => {
        clearInterval(timer);
        store.closeModal();
        store.$reset();
        router.replace("/");
      });
    };
    const handleContinue = () => {
      socket.timeoutResponse(store.getCurrentUser.room, true, () => {
        clearInterval(timer);
        store.closeModal();
      });
    };

    watchEffect(() => {
      if (isMounted.value) {
        timer = setInterval(() => {
          if (counter.value === 0) {
            clearInterval(timer);
            handleEnd();
          } else {
            counter.value -= 1;
          }
        }, 1000);
      }
    });

    return { handleEnd, handleContinue, counter };
  },
});
</script>

<style scoped>
.session-end-text {
  text-align: center;
}
.counter-text {
  font-size: 25px;
  text-align: center;
  font-weight: 900;
}

.content-text {
  display: grid;
  place-items: center;
}

.action-btn-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
