<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import '../../plugins/chart'
import type { ChartData, ChartOptions } from 'chart.js'

const props = defineProps<{
  labels: string[]
  datasets: { label: string; values: number[]; color: string }[]
  stacked?: boolean
}>()

const chartData: ChartData<'bar'> = {
  labels: props.labels,
  datasets: props.datasets.map((d) => ({
    label: d.label,
    data: d.values,
    backgroundColor: d.color,
    borderRadius: 8,
    borderSkipped: false,
    barPercentage: 0.75,
    categoryPercentage: 0.75
  }))
}

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        padding: 16
      }
    },
    tooltip: {
      backgroundColor: '#1B0140',
      padding: 10,
      cornerRadius: 12
    }
  },
  scales: {
    x: {
      stacked: props.stacked ?? false,
      grid: { display: false }
    },
    y: {
      stacked: props.stacked ?? false,
      grid: { color: 'rgba(27, 1, 64, 0.06)' },
      ticks: {
        callback: (v) => {
          const n = Number(v)
          if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
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
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<style scoped>
.chart-wrap {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>
