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
  background: linear-gradient(90deg, #ff6f91, #845ec2);
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(132, 94, 194, 0.28);
  transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;
}
.month-trigger:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(132, 94, 194, 0.36);
  filter: brightness(1.03);
}
.month-trigger.is-open {
  transform: translateY(0);
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
  background: rgba(255, 248, 241, 0.96) !important;
  backdrop-filter: blur(14px) saturate(1.4);
  -webkit-backdrop-filter: blur(14px) saturate(1.4);
  border-radius: 14px !important;
  border: 1px solid rgba(35, 25, 66, 0.08);
  box-shadow: 0 18px 40px rgba(35, 25, 66, 0.14) !important;
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
  font-weight: 600;
  color: #231942;
  font-size: 0.9rem;
}
.menu-item-active {
  background: linear-gradient(90deg, rgba(255, 111, 145, 0.16), rgba(132, 94, 194, 0.16)) !important;
}
.menu-item-active :deep(.menu-title) {
  color: #845ec2;
  font-weight: 800;
}
</style>
