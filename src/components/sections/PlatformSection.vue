<script setup lang="ts">
import { computed } from 'vue'
import FloatyEmojis from '../FloatyEmojis.vue'
import BarChart from '../charts/BarChart.vue'
import { formatNumber, formatCurrency, PLATFORM_META } from '../../composables/useMetrics'
import type { PlatformStats, PlatformKey } from '../../types'

const props = defineProps<{
  platformStats: { instagram: PlatformStats; tiktok: PlatformStats; youtube: PlatformStats }
  topPlatform: PlatformKey
  monthLabels: string[]
  monthlyViews: { instagram: number[]; tiktok: number[]; youtube: number[] }
  scopeLabel: string
  isYear: boolean
}>()

const platformOrder: PlatformKey[] = ['instagram', 'tiktok', 'youtube']

const emojis = [
  { char: '📸', top: '14%', left: '5%', speed: 0.22, rot: -8 },
  { char: '🎬', top: '20%', left: '86%', speed: 0.18, rot: 10 },
  { char: '📱', top: '72%', left: '10%', speed: 0.16, rot: 4 },
  { char: '💫', top: '80%', left: '82%', speed: 0.24, rot: -14 },
  { char: '📺', top: '46%', left: '3%', speed: 0.2, rot: 6 },
  { char: '🎵', top: '52%', left: '92%', speed: 0.26, rot: -6 }
]

// Year: monthly views per platform. Month: single-column grouped bars of that month's views per platform.
const barLabels = computed(() => (props.isYear ? props.monthLabels : [props.scopeLabel]))
const barDatasets = computed(() =>
  props.isYear
    ? [
        { label: 'Instagram', values: props.monthlyViews.instagram, color: '#00D1FF' },
        { label: 'TikTok',    values: props.monthlyViews.tiktok,    color: '#0A0A0A' },
        { label: 'YouTube',   values: props.monthlyViews.youtube,   color: '#FF3D3D' }
      ]
    : [
        { label: 'Instagram', values: [props.platformStats.instagram.views], color: '#00D1FF' },
        { label: 'TikTok',    values: [props.platformStats.tiktok.views],    color: '#0A0A0A' },
        { label: 'YouTube',   values: [props.platformStats.youtube.views],   color: '#FF3D3D' }
      ]
)
const barChartTitle = computed(() =>
  props.isYear ? 'Monthly views across platforms' : `Views by platform in ${props.scopeLabel}`
)
</script>

<template>
  <section class="section section--platform">
    <FloatyEmojis :emojis="emojis" />

    <v-container class="section-inner" style="max-width: 1200px;">
      <div class="reveal">
        <div class="eyebrow" style="color: #0a0a0a;">Chapter 02 · {{ scopeLabel }}</div>
      </div>

      <div class="reveal" style="transition-delay: 100ms;">
        <h2 class="display-large">
          Your <span class="gradient-text-blue">main stage</span> was
          <span class="gradient-text-pink">
            {{ PLATFORM_META[topPlatform].emoji }} {{ PLATFORM_META[topPlatform].name }}
          </span>
        </h2>
        <p class="section-lede">
          You showed up everywhere, but this platform truly hit different.
          Here's how each channel showed up for you.
        </p>
      </div>

      <div class="card-grid mt-8">
        <div
          v-for="platform in platformOrder"
          :key="platform"
          class="reveal"
          :style="`transition-delay: ${150 + platformOrder.indexOf(platform) * 150}ms;`"
        >
          <v-card
            class="platform-card card-lift"
            elevation="4"
            :class="{ 'is-top': platform === topPlatform }"
          >
            <div class="platform-header">
              <div class="platform-emoji">{{ PLATFORM_META[platform].emoji }}</div>
              <div>
                <div class="platform-name">{{ PLATFORM_META[platform].name }}</div>
              </div>
            </div>

            <div class="metric-grid">
              <div class="metric">
                <div class="metric-val">{{ formatNumber(platformStats[platform].views) }}</div>
                <div class="metric-lbl">views</div>
              </div>
              <div class="metric">
                <div class="metric-val">{{ formatNumber(platformStats[platform].comments) }}</div>
                <div class="metric-lbl">comments</div>
              </div>
              <div class="metric">
                <div class="metric-val">{{ formatNumber(platformStats[platform].shares) }}</div>
                <div class="metric-lbl">shares</div>
              </div>
              <div class="metric">
                <div class="metric-val">{{ formatCurrency(platformStats[platform].adRevenue) }}</div>
                <div class="metric-lbl">ad revenue</div>
              </div>
            </div>

            <div v-if="platform === topPlatform" class="platform-crown">👑 top platform</div>
          </v-card>
        </div>
      </div>

      <div class="reveal mt-10" style="transition-delay: 700ms;">
        <v-card class="chart-card" elevation="2">
          <div class="chart-title">{{ barChartTitle }}</div>
          <BarChart
            :labels="barLabels"
            :datasets="barDatasets"
          />
        </v-card>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
.section-lede {
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 640px;
  opacity: 0.8;
}
.platform-card {
  padding: 2rem;
  border-radius: 24px !important;
  background: #ffffff !important;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 2px solid #0a0a0a;
  box-shadow: 6px 6px 0 #0a0a0a !important;
}
.platform-card.is-top {
  background: linear-gradient(135deg, #fff, #fff0f7) !important;
  border-color: #ff2d87;
  box-shadow: 6px 6px 0 #0a0a0a !important;
}
.platform-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.platform-emoji {
  font-size: 2.6rem;
  line-height: 1;
}
.platform-name {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 1.6rem;
}
.platform-crown {
  margin-top: auto;
  align-self: center;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #b026ff;
  font-weight: 700;
  padding: 6px 12px;
  border: 2px solid #0a0a0a;
  border-radius: 999px;
  background: #fff0f7;
  box-shadow: 3px 3px 0 #0a0a0a;
}
.metric-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
}
.metric-val {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1;
  color: #0a0a0a;
}
.metric-lbl {
  margin-top: 0.25rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  opacity: 0.6;
  font-weight: 600;
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
  font-size: 1.6rem;
}
.chart-sub {
  opacity: 0.65;
  margin-bottom: 1rem;
}
</style>
