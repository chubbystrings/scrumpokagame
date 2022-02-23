<template>
    <div class="side-tab" v-if="isOpen">
        <Pills />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Pills from "./Pills.vue";
import { useStore } from '@/store'

export default defineComponent({
    components: {
        Pills
    },
    setup () {
        const store = useStore()
        const isOpen = computed(() => store.getHangingPointsStatus)

        return {isOpen}
    }
})
</script>

<style scoped>
.side-tab {
    position: fixed;
    top: -40px;
    right: 5px;
    width: 100px;
    height: 150px;
    z-index: 10000;
}

</style>