<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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
const rootEl = ref<HTMLElement | null>(null)
const sectionTop = ref(0)
const viewportH = ref(typeof window !== 'undefined' ? window.innerHeight : 800)

function measure() {
  if (!rootEl.value) return
  // Find nearest .section ancestor (fallback to parent)
  let node: HTMLElement | null = rootEl.value.parentElement
  while (node && !node.classList.contains('section')) {
    node = node.parentElement
  }
  const target = node ?? rootEl.value.parentElement
  if (!target) return
  const rect = target.getBoundingClientRect()
  sectionTop.value = rect.top + window.scrollY
  viewportH.value = window.innerHeight
}

onMounted(() => {
  measure()
  window.addEventListener('resize', measure, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', measure)
})

// scroll offset local to the section: 0 when section top hits viewport bottom
const localOffset = computed(() => {
  return scrollY.value + viewportH.value - sectionTop.value
})

const items = computed(() =>
  props.emojis.map((e) => ({
    ...e,
    style: {
      top: e.top,
      left: e.left,
      '--parallax-y': `${localOffset.value * e.speed * -1}px`,
      '--rot': `${e.rot + localOffset.value * e.speed * 0.05}deg`
    } as Record<string, string>
  }))
)
</script>

<template>
  <span ref="rootEl" style="display: contents;">
    <span
      v-for="(e, i) in items"
      :key="i"
      class="floaty"
      :style="e.style"
    >
      {{ e.char }}
    </span>
  </span>
</template>
