<template>
  <teleport to="body">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      appear
    >
      <Notify v-if="showNotification" :message="notificationMessage" />
    </transition>
  </teleport>
  <transition name="fade">
    <div class="overlay" v-if="isOpen"></div>
  </transition>
  <transition name="pop">
    <component :is="currentComp" v-if="isOpen"></component>
  </transition>
  <router-view v-slot="slotProps">
    <transition mode="out-in" name="route">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  watch,
  watchEffect,
} from "vue";
import socket from "./services/socket.service";
import { useStore } from "./store";
import StartModal from "@/components/StartModal.vue";
import EndModal from "@/components/EndModal.vue";
import SessionEndModal from "@/components/SessionEndModal.vue";
import TimeoutModal from "@/components/TimeoutModal.vue";
import Notify from "@/components/ui/Notify.vue";
import gsap from "gsap";

export default defineComponent({
  components: {
    StartModal,
    EndModal,
    Notify,
    SessionEndModal,
    TimeoutModal,
  },
  setup() {
    const store = useStore();
    const currentComp = computed(() => store.getCurrentModalComponent);
    const isOpen = computed(() => store.getModalStatus);
    const showNotification = computed(() => store.getNotificationStatus.show);
    const notificationMessage = computed(
      () => store.getNotificationStatus.message
    );
    const handleClick = () => store.closeModal();
    const isShow = ref(false);
    const notify = ref(false);
    const ticket = computed(() => store.getCurrentTicketName);

    const beforeEnter = (el: HTMLElement) => {
      el.style.opacity = "0";
    };

    const enter = (el: HTMLElement, done: () => void) => {
      gsap.to(el, {
        opacity: 1,
        onComplete: done,
        ease: "Elastic.easeOut",
      });
    };

    const leave = (el: HTMLElement) => {
      gsap.from(el, {
        delay: 1.2,
        opacity: 0,
        duration: 0.5,
      });
    };

    onMounted(() => {
      socket.setupSocketConnection();
    });

    watchEffect(() => {
      if (notificationMessage.value && showNotification.value) {
        notify.value = true;
      } else {
        notify.value = false;
      }
    });

    watch(ticket, (value, oldValue) => {
      if (value !== oldValue) {
        if (store.currentUser.type === "user") {
          store.closeModal();
        }
      }
    });

    return {
      currentComp,
      isOpen,
      handleClick,
      isShow,
      beforeEnter,
      enter,
      leave,
      showNotification,
      notificationMessage,
    };
  },
});
</script>
<style>
.overlay {
  content: "";
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #fff;
  opacity: 0.3;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3);
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}
</style>
