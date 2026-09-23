<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import '../../plugins/chart'
import type { ChartData, ChartOptions } from 'chart.js'

const props = defineProps<{
  labels: string[]
  values: number[]
  colors: string[]
}>()

const chartData: ChartData<'doughnut'> = {
  labels: props.labels,
  datasets: [
    {
      data: props.values,
      backgroundColor: props.colors,
      borderColor: '#FFF8F1',
      borderWidth: 4,
      hoverOffset: 8
    }
  ]
}

const options: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '68%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        padding: 14
      }
    },
    tooltip: {
      backgroundColor: '#231942',
      padding: 10,
      cornerRadius: 12,
      callbacks: {
        label: (ctx) => {
          const total = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const val = ctx.parsed as number
          const pct = ((val / total) * 100).toFixed(1)
          return ` ${ctx.label}: ${pct}%`
        }
      }
    }
  }
}
</script>

<template>
  <div class="chart-wrap">
    <Doughnut :data="chartData" :options="options" />
  </div>
</template>

<style scoped>
.chart-wrap {
  position: relative;
  height: 280px;
  width: 100%;
}
</style>
