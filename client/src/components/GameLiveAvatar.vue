<template>
  <div class="live-game-wrapper">
    <div :class="`icon ${addBorder}`" ref="wrapper">
      <BIconSuitClubFill
        :style="{ width: '100%', height: '100%', color: color }"
      />
    </div>
    <div>
      <small>{{ text }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import { BIconSuitClubFill } from "bootstrap-icons-vue";
import gsap from "gsap";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    BIconSuitClubFill,
  },
  setup() {
    const wrapper = ref(null);
    let animation: gsap.core.Timeline;

    const store = useStore();
    const color = computed(() =>
      store.getCurrentTicketName ? "#c1d1e8" : "grey"
    );
    const addBorder = computed(() =>
      store.getCurrentTicketName ? "add-border" : ""
    );
    const text = computed(() =>
      store.getCurrentTicketName ? "Game is Live" : " Game is Offline"
    );

    const isLive = computed(() => store.getCurrentTicketName);

    onMounted(() => {
      animation = gsap.timeline().to(wrapper.value, {
        scale: 1.2,
        repeat: -1,
        ease: "Elastic.easeOut",
        // ease: Elastic.easeOut,
        // ease: Elastic.easeOut.config(1.75, 1),
        yoyo: true,
        duration: 1,
      });
      if (isLive.value) {
        animation.play();
      } else {
        animation.pause();
      }
    });

    watch(isLive, () => {
      if (isLive.value) {
        animation.play();
      } else {
        animation.pause();
      }
    });

    return { color, addBorder, text, wrapper };
  },
});
</script>

<style scoped>
.live-game-wrapper {
  display: flex;
  align-items: center;
  gap: 9px;
  position: absolute;
  top: 15px;
  left: 10px;
}

.icon {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  background-color: transparent;
}

.add-border {
  border: 2px solid var(--button);
}

small {
  font-size: 9px;
}

@media screen and (max-width: 325px) {
  .live-game-wrapper small {
    display: none;
  }
}
</style>
