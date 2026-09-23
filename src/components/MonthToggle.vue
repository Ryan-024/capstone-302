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

const items = computed(() => [
  { title: '✨ All Year', value: 'all' as MonthSelection },
  ...props.months.map((m) => ({ title: m, value: m as MonthSelection }))
])

const selectedLabel = computed(() => {
  const found = items.value.find((i) => i.value === props.modelValue)
  return found ? found.title : '✨ All Year'
})

function pick(value: MonthSelection) {
  emit('update:modelValue', value)
}
</script>

<template>
  <v-menu offset="8" location="bottom end">
    <template #activator="{ props: activator, isActive }">
      <v-btn
        v-bind="activator"
        variant="flat"
        class="toggle-btn"
        :append-icon="isActive ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      >
        {{ selectedLabel }}
      </v-btn>
    </template>

    <v-list
      class="toggle-menu"
      density="compact"
      rounded="lg"
      min-width="200"
    >
      <v-list-item
        v-for="item in items"
        :key="String(item.value)"
        :active="item.value === modelValue"
        rounded="lg"
        @click="pick(item.value)"
      >
        <v-list-item-title class="menu-item">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.toggle-btn {
  background: linear-gradient(90deg, #ff467a, #5003c0) !important;
  color: white !important;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: none;
  padding-inline: 18px;
  box-shadow: 0 8px 20px -10px rgba(80, 3, 192, 0.55) !important;
}
.toggle-menu {
  background: white !important;
  padding: 6px !important;
  box-shadow: 0 20px 40px -12px rgba(27, 1, 64, 0.25) !important;
}
.menu-item {
  font-weight: 500;
  font-size: 0.95rem;
}
</style>
