<script setup lang="ts">
import { computed } from 'vue'
import FloatyEmojis from '../FloatyEmojis.vue'
import BarChart from '../charts/BarChart.vue'
import LineChart from '../charts/LineChart.vue'
import { formatNumber } from '../../composables/useMetrics'

const props = defineProps<{
  creatorName: string
  handle: string
  totalFollowers: number
  netGrowth: number
  gained: number
  lost: number
  percent: number
  scopeLabel: string
  monthLabels: string[]
  monthlyFollowers: number[]
  isYear: boolean
}>()

const emojis = [
  { char: '🎉', top: '10%', left: '8%', speed: 0.2, rot: -10 },
  { char: '🥂', top: '18%', left: '84%', speed: 0.15, rot: 8 },
  { char: '💚', top: '68%', left: '10%', speed: 0.22, rot: -6 },
  { char: '🌈', top: '76%', left: '82%', speed: 0.18, rot: 14 },
  { char: '🎊', top: '42%', left: '92%', speed: 0.28, rot: 0 },
  { char: '⭐', top: '48%', left: '3%', speed: 0.24, rot: -12 }
]

const monthBarLabels = computed(() => [props.scopeLabel])
const monthBarDatasets = computed(() => [
  { label: 'Gained', values: [props.gained], color: '#39FF14' },
  { label: 'Lost',   values: [props.lost],   color: '#FF3D3D' }
])
</script>

<template>
  <section class="section section--finale">
    <FloatyEmojis :emojis="emojis" />

    <v-container class="section-inner" style="max-width: 1200px;">
      <div class="reveal">
        <div class="eyebrow" style="color: #0a0a0a;">Chapter 04 · The Finale</div>
      </div>

      <div class="reveal" style="transition-delay: 100ms;">
        <h2 class="display-huge">
          You did <span class="gradient-text-green">that.</span>
        </h2>
      </div>

      <div class="reveal" style="transition-delay: 250ms; margin-top: 2rem;">
        <p style="font-size: clamp(1.15rem, 1.6vw, 1.4rem); line-height: 1.6; opacity: 0.85; max-width: 700px;">
          What a ride, <b>{{ creatorName }}</b>. Every post, every late-night edit,
          every "just one more take" — it all added up to something really special.
        </p>
      </div>

      <div class="reveal finale-stats" style="transition-delay: 400ms;">
        <div class="fs">
          <div class="stat-huge gradient-text-green">+{{ formatNumber(netGrowth) }}</div>
          <div class="stat-label">new followers in {{ scopeLabel }}</div>
        </div>
        <div class="fs">
          <div class="stat-huge gradient-text-blue">{{ percent.toFixed(1) }}%</div>
          <div class="stat-label">audience growth in {{ scopeLabel }}</div>
        </div>
      </div>

      <div class="reveal chart-block" style="transition-delay: 550ms;">
        <v-card class="chart-card" elevation="2">
          <div class="chart-title">
            {{ isYear ? 'Follower journey · Jan → Dec' : `Follower flow in ${scopeLabel}` }}
          </div>
          <LineChart
            v-if="isYear"
            :labels="monthLabels"
            :values="monthlyFollowers"
            label="Followers"
            color="#39FF14"
          />
          <BarChart
            v-else
            :labels="monthBarLabels"
            :datasets="monthBarDatasets"
          />
        </v-card>
      </div>

      <div class="reveal signature" style="transition-delay: 700ms;">
        <div class="sig-line">Here's to next year. 🥂</div>
        <div class="sig-sub">— Content Buddy · {{ handle }}</div>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.finale-stats {
  margin-top: 3rem;
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}
.fs {
  background: #ffffff;
  border: 2px solid #0a0a0a;
  border-radius: 24px;
  box-shadow: 6px 6px 0 #0a0a0a;
  padding: 1.75rem 2.5rem;
  min-width: 220px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.fs:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #0a0a0a;
}
.stat-label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  opacity: 0.6;
  font-weight: 600;
}
.chart-block {
  margin-top: 3rem;
}
.chart-card {
  padding: 2rem;
  border-radius: 24px !important;
  background: #ffffff !important;
  border: 2px solid #0a0a0a;
  box-shadow: 6px 6px 0 #0a0a0a !important;
}
.chart-title {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 1.25rem;
}
.signature {
  margin-top: 5rem;
}
.sig-line {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: clamp(1.6rem, 3vw, 2.6rem);
}
.sig-sub {
  margin-top: 0.5rem;
  opacity: 0.6;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.85rem;
}
</style>
