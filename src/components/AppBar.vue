<script setup lang="ts">
import MonthToggle from './MonthToggle.vue'
import type { MonthSelection } from '../types'

defineProps<{
  modelValue: MonthSelection
  months: string[]
  handle: string
  highContrast: boolean
}>()
defineEmits<{
  (e: 'update:modelValue', v: MonthSelection): void
  (e: 'update:highContrast', v: boolean): void
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

    <div class="toggle-wrap">
      <MonthToggle
        :model-value="modelValue"
        :months="months"
        @update:model-value="$emit('update:modelValue', $event)"
      />
      <button
        type="button"
        class="contrast-toggle"
        :class="{ 'is-active': highContrast }"
        :aria-pressed="highContrast"
        :aria-label="highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'"
        :title="highContrast ? 'High contrast: on' : 'High contrast: off'"
        @click="$emit('update:highContrast', !highContrast)"
      >
        <v-icon :icon="highContrast ? 'mdi-eye' : 'mdi-eye-outline'" size="20" />
      </button>
    </div>
  </v-app-bar>
</template>

<style scoped>
.app-bar-glass {
  backdrop-filter: saturate(1.4) blur(14px);
  -webkit-backdrop-filter: saturate(1.4) blur(14px);
  background: rgba(244, 236, 220, 0.78) !important;
  border-bottom: 2px solid #0a0a0a;
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
  color: #0a0a0a;
}
.brand-sub {
  font-size: 0.72rem;
  opacity: 0.65;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.toggle-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 20px;
}
.contrast-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: #ffffff;
  color: #0a0a0a;
  border: 2px solid #0a0a0a;
  cursor: pointer;
  box-shadow: 4px 4px 0 #0a0a0a;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
}
.contrast-toggle:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #0a0a0a;
}
.contrast-toggle:active,
.contrast-toggle.is-active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #0a0a0a;
  background: #0a0a0a;
  color: #ffffff;
}
</style>
