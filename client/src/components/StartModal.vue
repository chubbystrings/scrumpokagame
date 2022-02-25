<template>
  <Modal>
    <template v-slot:header>
      <h2>Enter Ticket Number To start</h2>
    </template>
    <template v-slot:body>
      <input class="ticket-input" type="text" v-model="ticket" />
    </template>
    <template v-slot:actions>
      <div class="action-btn-wrapper">
        <button class="btn" @click="handleCancel">Cancel</button>
        <button  class="btn" :disabled="isEmptyTicketName" @click="handleStart">Start</button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Modal from "./ui/Modal.vue";
import { useStore } from "../store";
import socket from "../services/socket.service";

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const ticket = ref("");
    const store = useStore();

    const isEmptyTicketName = computed(() => ticket.value.trim() === '')

    const handleCancel = () => {
      store.closeModal();
    };

    const handleStart = () => {
        const details = {
            name: ticket.value,
            room: store.getCurrentUser.room,
            team: store.getCurrentUser.team,
            author: store.getCurrentUser.username
        }
      socket.addTicket(details);
      store.closeModal();
    };

    return { ticket, handleCancel, handleStart, isEmptyTicketName };
  },
});
</script>

<style scoped>
.action-btn-wrapper {
  display: flex;
  gap: 5px;
}
.ticket-input {
  background: var(--input);
  display: block;
  width: 100%;
  border: none;
  outline: none;
  margin: 5px 0px;
  color: #ffffff;
  border-radius: 5px;
  height: 40px;
}

@media screen and (max-width: 475px) {
     h2 {
    font-size: 17px !important;
  }
}

@media screen and (max-width: 375px) {
     h2 {
    font-size: 11px !important;
  }
}
</style>
