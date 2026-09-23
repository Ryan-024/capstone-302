<script setup lang="ts">
import { computed } from 'vue'
import { useScrollY } from '../composables/useParallax'

interface Emoji {
  char: string
  top: string
  left: string
  speed: number
  rot: number
}
const props = defineProps<{ emojis: Emoji[] }>()

const scrollY = useScrollY()
const items = computed(() =>
  props.emojis.map((e) => ({
    ...e,
    style: {
      top: e.top,
      left: e.left,
      '--parallax-y': `${scrollY.value * e.speed * -1}px`,
      '--rot': `${e.rot + scrollY.value * e.speed * 0.05}deg`
    } as Record<string, string>
  }))
)
</script>

<template>
  <span
    v-for="(e, i) in items"
    :key="i"
    class="floaty"
    :style="e.style"
  >
    {{ e.char }}
  </span>
</template>
