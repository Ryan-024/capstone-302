<script setup lang="ts">
import { Line } from 'vue-chartjs'
import '../../plugins/chart'
import type { ChartData, ChartOptions } from 'chart.js'

const props = defineProps<{
  labels: string[]
  values: number[]
  label?: string
  color?: string
}>()

const color = props.color ?? '#845EC2'

const chartData: ChartData<'line'> = {
  labels: props.labels,
  datasets: [
    {
      label: props.label ?? 'Series',
      data: props.values,
      borderColor: color,
      backgroundColor: color + '22',
      tension: 0.4,
      fill: true,
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: color,
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }
  ]
}

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#231942',
      padding: 10,
      cornerRadius: 12
    }
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      grid: { color: 'rgba(35, 25, 66, 0.06)' },
      ticks: {
        callback: (v) => {
          const n = Number(v)
          if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
          return n
        }
      }
    }
  }
}
</script>

<template>
  <div class="chart-wrap">
    <Line :data="chartData" :options="options" />
  </div>
</template>

<style scoped>
.chart-wrap {
  position: relative;
  height: 260px;
  width: 100%;
}
</style>
