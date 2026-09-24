<script setup lang="ts">
import { computed } from 'vue'
import type { MonthSelection } from '../types'

const props = defineProps<{
  modelValue: MonthSelection
  months: string[]
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: MonthSelection): void
}>()

const options = computed<{ value: MonthSelection; label: string; emoji: string }[]>(() => [
  { value: 'all', label: 'All Year', emoji: '✨' },
  ...props.months.map((m) => ({ value: m as MonthSelection, label: m, emoji: '' }))
])

const currentLabel = computed(() => {
  const found = options.value.find((o) => o.value === props.modelValue)
  if (!found) return '✨ All Year'
  return found.emoji ? `${found.emoji} ${found.label}` : found.label
})

function select(v: MonthSelection) {
  emit('update:modelValue', v)
}
</script>

<template>
  <v-menu offset="8" location="bottom end">
    <template #activator="{ props: activatorProps, isActive }">
      <button
        v-bind="activatorProps"
        class="month-trigger"
        :class="{ 'is-open': isActive }"
        type="button"
      >
        <span class="trigger-label">{{ currentLabel }}</span>
        <span class="trigger-caret" :class="{ 'is-open': isActive }">▾</span>
      </button>
    </template>

    <v-list class="month-menu" density="compact" nav>
      <v-list-item
        v-for="opt in options"
        :key="String(opt.value)"
        :active="opt.value === modelValue"
        active-class="menu-item-active"
        @click="select(opt.value)"
      >
        <template #prepend>
          <span v-if="opt.emoji" class="menu-emoji">{{ opt.emoji }}</span>
        </template>
        <v-list-item-title class="menu-title">{{ opt.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.month-trigger {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 999px;
  background: linear-gradient(90deg, #ff2d87, #b026ff);
  color: white;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  border: 2px solid #0a0a0a;
  cursor: pointer;
  box-shadow: 4px 4px 0 #0a0a0a;
  transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;
}
.month-trigger:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #0a0a0a;
  filter: brightness(1.05);
}
.month-trigger.is-open {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #0a0a0a;
  filter: brightness(0.98);
}
.trigger-label {
  white-space: nowrap;
}
.trigger-caret {
  font-size: 0.7rem;
  transition: transform 200ms ease;
  opacity: 0.9;
}
.trigger-caret.is-open {
  transform: rotate(180deg);
}

.month-menu {
  background: rgba(244, 236, 220, 0.98) !important;
  backdrop-filter: blur(14px) saturate(1.4);
  -webkit-backdrop-filter: blur(14px) saturate(1.4);
  border-radius: 14px !important;
  border: 2px solid #0a0a0a;
  box-shadow: 6px 6px 0 #0a0a0a !important;
  padding: 6px !important;
  min-width: 180px;
  max-height: 60vh;
  overflow-y: auto;
}
.menu-emoji {
  display: inline-block;
  width: 22px;
  text-align: center;
  margin-right: 4px;
}
.menu-title {
  font-weight: 700;
  color: #0a0a0a;
  font-size: 0.9rem;
}
.menu-item-active {
  background: linear-gradient(90deg, rgba(255, 45, 135, 0.2), rgba(176, 38, 255, 0.2)) !important;
}
.menu-item-active :deep(.menu-title) {
  color: #b026ff;
  font-weight: 900;
}
</style>
