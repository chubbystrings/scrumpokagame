<template>
  <div class="generate-container">
        <p class="generate-text">generate, copy & share link</p>
    <div class="generate-wrapper">
      <button class="generate-btn" @click="handleGenerate">Generate</button>
      <button :disabled="isEmpty" @click="handleClick" class="copy-btn">
        <BIconClipboard />
      </button>
      <input
        type="text"
        id="inputRef"
        ref="inputRef"
        @focus="handleSelect"
        v-model="link"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { BIconClipboard } from "bootstrap-icons-vue";
import { useStore } from "@/store";
import axiosInstance from '@/services/axios'

export default defineComponent({
  components: {
    BIconClipboard,
  },
  setup() {
    const link = ref("");
    // const inputRef = ref();
    const store = useStore();

    interface HTMLInputEvent extends Event {
      target: HTMLInputElement & EventTarget;
    }

    onMounted(() => {
        console.log(window.location.href)
    })

    const isEmpty = computed(() => link.value.trim() === '')

    console.log(isEmpty.value)

    const handleClick = (e: HTMLInputEvent) => {
      document.getElementById("inputRef")?.focus();
      document.execCommand("copy");
      store.setNotification("copied to clipboard");
    };

    const handleSelect = (e: HTMLInputEvent) => {
      e.target.select();
    };

    const handleGenerate = async () => {
        const href = window.location.href
        const url = href.includes('localhost') ? href.replace('localhost', '127.0.0.1') : href
        console.log(url)
        try {
           const res =  await axiosInstance.post('/link', { url })
           console.log(res.data)
           link.value = res.data.url
        } catch (error) {
            console.log(error)
        }
    }

    return { link, handleClick, handleSelect, handleGenerate, isEmpty };
  },
});
</script>

<style scoped>
.generate-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.generate-wrapper {
  display: flex;
  align-items: center;
  position: relative
}

.generate-wrapper .generate-btn {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background: var(--input);
  width: 100px;
  height: 30px;
  outline: none;
  border: none;
  cursor: pointer;
}

.generate-wrapper .copy-btn {
  background: #fff;
  width: 50px;
  height: 30px;
  color: black;
  outline: none;
  border: none;
  background: var(--line);
  cursor: pointer;
}

.generate-wrapper input {
  width: 150px;
  height: 30px;
  background-color: #fff;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  outline: none;
  border: none;
  padding: 5px;
  box-sizing: border-box;
  color: var(--primary) !important;
  font-weight: bolder;
  font-size: 12px;
}
.generate-wrapper .copy-btn:disabled {
    cursor: not-allowed;
    background: var(--disabled);
    opacity: 0.7
}

.generate-text {
    text-align: center;
    font-size: 12px;
}
</style>
