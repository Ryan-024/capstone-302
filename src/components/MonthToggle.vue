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

const value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>

<template>
  <div class="month-toggle">
    <v-chip-group
      v-model="value"
      mandatory
      selected-class="chip-selected"
      class="chip-scroll"
    >
      <v-chip value="all" variant="elevated" size="small">
        ✨ All Year
      </v-chip>
      <v-chip
        v-for="m in months"
        :key="m"
        :value="m"
        variant="tonal"
        size="small"
      >
        {{ m.slice(0, 3) }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<style scoped>
.month-toggle {
  max-width: 100%;
}
.chip-scroll :deep(.v-slide-group__content) {
  gap: 6px;
}
.chip-selected {
  background: linear-gradient(90deg, #ff6f91, #845ec2) !important;
  color: white !important;
  font-weight: 700;
}
</style>
