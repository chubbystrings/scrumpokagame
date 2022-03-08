<template>
  <Modal>
    <template v-slot:header>
      <h2>The Winning Card is {{ winning }}</h2>
    </template>
    <template v-slot:body>
      <div class="winning-body">
        <div class="wining--card flip-card">
          <div class="flip-card-back">
            <div class="grid-item">
              <div class="top-left">
                <p>{{ winning }}</p>
                <div>
                  <component :is="icon" :style="{ color: color }"></component>
                </div>
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div>
                <component :is="icon" :style="{ color: color }"></component>
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div class="bottom-right">
                <p>{{ winning }}</p>
                <div>
                  <component :is="icon" :style="{ color: color }"></component>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <div class="action-btn-wrapper" >
        <button class="btn" @click="handleBack">Back</button>
        <button v-if="userType" class="btn" @click="handleRestart">Restart</button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import socket from "../services/socket.service";
import { useStore } from "@/store";
import Modal from "./ui/Modal.vue";
import { START_MODAL } from "@/utils/ModalNames";
import {
  BIconSuitSpadeFill,
  BIconSuitHeartFill,
  BIconSuitDiamondFill,
  BIconSuitClubFill,
} from "bootstrap-icons-vue";

export default defineComponent({
  components: {
    Modal,
    BIconSuitClubFill,
    BIconSuitDiamondFill,
    BIconSuitHeartFill,
    BIconSuitSpadeFill,
  },

  setup() {
    const store = useStore();
    const winning = computed(() => store.getReveal.totalPoints);
    const icon = computed(() => store.getReveal.icon);
    const color = computed(() => store.getReveal.color);
    const currentUser = computed(() => store.getCurrentUser);
    const userType = computed(() => store.getCurrentUser.type === "author");

    const handleRestart = () => {
      socket.restart(currentUser.value.room);
      store.openModal(START_MODAL);
    };

    const handleBack = () => {
      store.closeModal();
    };

    return { winning, handleRestart, handleBack, icon, color, userType };
  },
});
</script>

<style scoped>
.winning-body {
  display: grid;
  place-items: center;
}

.flip-card {
  background-color: transparent;
  width: 150px;
  height: 220px;
  border-radius: 10px;
  position: relative;

  /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
}
.flip-card p {
  text-align: center;
}

.flip-card-back {
  background-color: #fff;
  color: black;
  font-weight: 900;
  border-radius: 10px;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.flip-card-back p {
  font-size: 25px;
  font-weight: 600;
  color: black !important;
}

.top-left {
  /* padding: 0.1em; */
  position: absolute;
  top: 1px;
  left: 0px;
}

.bottom-right {
  align-self: end;
  transform: rotate(180deg);
  position: absolute;
  bottom: 5px;
  right: 2px;
}

.heart {
  text-align: center;
  align-self: center;
  font-size: 2em;
  color: red;
}

.action-btn-wrapper {
  display: flex;
  gap: 5px;
}
</style>
