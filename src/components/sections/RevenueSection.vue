<script setup lang="ts">
import FloatyEmojis from '../FloatyEmojis.vue'
import DoughnutChart from '../charts/DoughnutChart.vue'
import LineChart from '../charts/LineChart.vue'
import { formatCurrency, formatNumber, PLATFORM_META } from '../../composables/useMetrics'
import type { PlatformKey, TopPost, TopSong, PlatformStats } from '../../types'

const props = defineProps<{
  totalRevenue: number
  platformStats: { instagram: PlatformStats; tiktok: PlatformStats; youtube: PlatformStats }
  topPost: TopPost
  topSong: TopSong
  topPlatform: PlatformKey
  monthLabels: string[]
  monthlyRevenue: number[]
  scopeLabel: string
  isYear: boolean
}>()

const emojis = [
  { char: '💰', top: '16%', left: '7%', speed: 0.18, rot: -6 },
  { char: '💸', top: '22%', left: '84%', speed: 0.24, rot: 8 },
  { char: '🪙', top: '74%', left: '9%', speed: 0.14, rot: 4 },
  { char: '📈', top: '82%', left: '80%', speed: 0.2, rot: -10 },
  { char: '💵', top: '46%', left: '92%', speed: 0.22, rot: 12 },
  { char: '🔥', top: '50%', left: '2%', speed: 0.26, rot: -8 }
]

const doughnutLabels = ['Instagram', 'TikTok', 'YouTube']
const doughnutValues = [
  props.platformStats.instagram.adRevenue,
  props.platformStats.tiktok.adRevenue,
  props.platformStats.youtube.adRevenue
]
const doughnutColors = ['#FF2D87', '#0A0A0A', '#FF3D3D']
</script>

<template>
  <section class="section section--revenue">
    <FloatyEmojis :emojis="emojis" />

    <v-container class="section-inner" style="max-width: 1200px;">
      <div class="reveal">
        <div class="eyebrow" style="color: #0a0a0a;">Chapter 03 · {{ scopeLabel }}</div>
      </div>

      <div class="reveal" style="transition-delay: 100ms;">
        <h2 class="display-large">
          The bag? <span class="gradient-text-gold">Absolutely secured.</span> 💰
        </h2>
        <p class="section-lede">
          Every view, every share, every algorithm hug turned into something real.
          Here's the money trail.
        </p>
      </div>

      <div class="reveal revenue-hero mt-8" style="transition-delay: 200ms;">
        <div class="stat-huge gradient-text-gold">
          {{ formatCurrency(totalRevenue) }}
        </div>
        <div class="stat-label">
          Total ad revenue {{ isYear ? 'in 2025' : 'this month' }}
        </div>
      </div>

      <div class="card-grid mt-8">
        <div class="reveal" style="transition-delay: 250ms;">
          <v-card class="rev-card card-lift" elevation="4">
            <div class="rev-badge">💎 Top post</div>
            <div class="rev-title">{{ topPost.title }}</div>
            <v-chip
              :color="PLATFORM_META[topPost.platform].color"
              variant="flat"
              size="small"
              class="text-white mt-2"
            >
              {{ PLATFORM_META[topPost.platform].emoji }} {{ PLATFORM_META[topPost.platform].name }}
            </v-chip>
            <div class="rev-money gradient-text-gold">
              {{ formatCurrency(topPost.revenue) }}
            </div>
            <div class="rev-sub">{{ formatNumber(topPost.views) }} views</div>
          </v-card>
        </div>

        <div class="reveal" style="transition-delay: 400ms;">
          <v-card class="rev-card card-lift" elevation="4">
            <div class="rev-badge">🎵 Top song</div>
            <div class="rev-title">{{ topSong.title }}</div>
            <div class="rev-artist">{{ topSong.artist }}</div>
            <div class="rev-money gradient-text-pink">{{ topSong.uses }}×</div>
            <div class="rev-sub">the audio that carried the vibes</div>
          </v-card>
        </div>

        <div class="reveal" style="transition-delay: 550ms;">
          <v-card class="rev-card card-lift" elevation="4">
            <div class="rev-badge">👑 Top platform</div>
            <div class="rev-title">
              {{ PLATFORM_META[topPlatform].emoji }} {{ PLATFORM_META[topPlatform].name }}
            </div>
            <div class="rev-artist">Highest earner this {{ isYear ? 'year' : 'month' }}</div>
            <div class="rev-money gradient-text-blue">
              {{ formatCurrency(platformStats[topPlatform].adRevenue) }}
            </div>
            <div class="rev-sub">in ad revenue</div>
          </v-card>
        </div>
      </div>

      <div class="chart-grid mt-8">
        <div class="reveal" style="transition-delay: 700ms;">
          <v-card class="chart-card" elevation="2">
            <div class="chart-title">Revenue mix</div>
            <div class="chart-sub">Where your income came from</div>
            <DoughnutChart
              :labels="doughnutLabels"
              :values="doughnutValues"
              :colors="doughnutColors"
            />
          </v-card>
        </div>

        <div v-if="isYear" class="reveal chart-wide" style="transition-delay: 800ms;">
          <v-card class="chart-card" elevation="2">
            <div class="chart-title">Revenue over the year</div>
            <div class="chart-sub">You closed strong 💪</div>
            <LineChart
              :labels="monthLabels"
              :values="monthlyRevenue"
              label="Revenue"
              color="#FF6B1A"
            />
          </v-card>
        </div>
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
.chart-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: stretch;
}
.chart-grid > div {
  display: flex;
}
.chart-grid > div > .chart-card {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.chart-grid > div > .chart-card :deep(.chart-wrap) {
  flex: 1;
  min-height: 300px;
}
@media (min-width: 960px) {
  .chart-grid {
    grid-template-columns: 5fr 7fr;
  }
}
.chart-wide {
  min-width: 0;
}
.section-lede {
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 640px;
  opacity: 0.8;
}
.revenue-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: #ffffff;
  border: 2px solid #0a0a0a;
  border-radius: 24px;
  box-shadow: 6px 6px 0 #0a0a0a;
}
.stat-label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.65;
  font-weight: 600;
}
.rev-card {
  padding: 2rem;
  border-radius: 24px !important;
  background: #ffffff !important;
  border: 2px solid #0a0a0a;
  box-shadow: 6px 6px 0 #0a0a0a !important;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.rev-badge {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  opacity: 0.6;
  font-weight: 700;
}
.rev-title {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.2;
  margin-top: 0.5rem;
}
.rev-artist {
  opacity: 0.7;
  font-size: 0.95rem;
}
.rev-money {
  font-family: 'Fraunces', serif;
  font-weight: 800;
  font-size: 2.4rem;
  line-height: 1;
  margin-top: auto;
}
.rev-sub {
  font-size: 0.85rem;
  opacity: 0.65;
  margin-top: 0.25rem;
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
}
.chart-sub {
  opacity: 0.65;
  margin-bottom: 1rem;
}
</style>
