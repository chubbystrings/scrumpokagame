<template>
    <div class="wrapper" v-if="isLive">
        <div class="icon" @click="handleClick">
            <BIconSuitClubFill :style="{ width: '100%', height: '100%', color: '#5692e8' }" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore} from '@/store';
import {
  
  BIconSuitClubFill,
} from "bootstrap-icons-vue";

export default defineComponent({
    components: {
        BIconSuitClubFill,
    },
    setup () {
        const store = useStore()
        const handleClick = () => {
            store.toggleHangingPoints()
        }

        const isLive = computed(() => !!store.getCurrentTicketName)

        return { handleClick, isLive}
    }
})
</script>

<style scoped>
.wrapper {
  background-color: var(--input);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primary)
}

.icon {
   
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    background-color: transparent;
    cursor: pointer;
}
</style>