<script setup lang="ts">
import MonthToggle from './MonthToggle.vue'
import type { MonthSelection } from '../types'

defineProps<{
  modelValue: MonthSelection
  months: string[]
  handle: string
}>()
defineEmits<{
  (e: 'update:modelValue', v: MonthSelection): void
}>()
</script>

<template>
  <v-app-bar
    flat
    color="transparent"
    class="app-bar-glass"
    height="72"
  >
    <div class="brand">
      <span class="brand-emoji">🎉</span>
      <div class="brand-text">
        <div class="brand-name serif">Content Buddy</div>
        <div class="brand-sub">{{ handle }} · 2025 Wrapped</div>
      </div>
    </div>

    <v-spacer />

    <MonthToggle
      :model-value="modelValue"
      :months="months"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </v-app-bar>
</template>

<style scoped>
.app-bar-glass {
  backdrop-filter: saturate(1.4) blur(14px);
  -webkit-backdrop-filter: saturate(1.4) blur(14px);
  background: rgba(255, 251, 242, 0.72) !important;
  border-bottom: 1px solid rgba(27, 1, 64, 0.06);
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 20px;
}
.brand-emoji {
  font-size: 1.8rem;
}
.brand-name {
  font-weight: 800;
  font-size: 1.15rem;
  line-height: 1;
  color: #1b0140;
}
.brand-sub {
  font-size: 0.72rem;
  opacity: 0.65;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
