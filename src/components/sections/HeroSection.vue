<script setup lang="ts">
import FloatyEmojis from '../FloatyEmojis.vue'
import { formatNumber } from '../../composables/useMetrics'

defineProps<{
  creatorName: string
  handle: string
  totalViews: number
  subscribers: number
  netGrowth: number
  isYear: boolean
  scopeLabel: string
}>()

const emojis = [
  { char: '🎉', top: '12%', left: '5%',  speed: 0.15, rot: -8 },
  { char: '✨', top: '18%', left: '88%', speed: 0.22, rot: 12 },
  { char: '💖', top: '42%', left: '2%',  speed: 0.28, rot: 0 },
  { char: '🌟', top: '48%', left: '92%', speed: 0.2,  rot: 20 },
  { char: '🎊', top: '78%', left: '6%',  speed: 0.18, rot: 6 },
  { char: '🥳', top: '84%', left: '86%', speed: 0.12, rot: -14 }
]
</script>

<template>
  <section class="section section--hero">
    <div class="hero-blob" style="width: 500px; height: 500px; background: #ff2d87; top: -100px; left: -100px;" />
    <div class="hero-blob" style="width: 400px; height: 400px; background: #ffe600; bottom: -80px; right: -80px;" />
    <FloatyEmojis :emojis="emojis" />

    <v-container class="section-inner" style="max-width: 1200px;">
      <div class="reveal">
        <div class="eyebrow" style="color: #0a0a0a;">{{ scopeLabel }} · Content Buddy Wrapped</div>
      </div>

      <div class="reveal" style="transition-delay: 100ms; margin-top: 1rem;">
        <h1 class="display-huge">
          <span>Your year was </span>
          <span class="gradient-text-pink">unreal.</span>
        </h1>
      </div>

      <div class="reveal" style="transition-delay: 250ms; margin-top: 2rem; max-width: 720px;">
        <p style="font-size: clamp(1.1rem, 1.6vw, 1.4rem); line-height: 1.6; opacity: 0.85;">
          Grab a cozy drink ☕, put on your favorite playlist, and scroll gently.
          We rounded up the moments, the metrics, and the milestones that made
          <b>{{ creatorName }}</b> {{ handle }} shine this year.
        </p>
      </div>

      <div class="reveal stats-row" style="transition-delay: 400ms;">
        <div class="stat-card">
          <div class="stat-huge gradient-text-pink">{{ formatNumber(totalViews) }}</div>
          <div class="stat-label">Total views {{ isYear ? 'in 2025' : 'this month' }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-huge gradient-text-gold">{{ formatNumber(subscribers) }}</div>
          <div class="stat-label">Followers by year end</div>
        </div>
        <div class="stat-card">
          <div class="stat-huge gradient-text-blue">+{{ formatNumber(netGrowth) }}</div>
          <div class="stat-label">Net new followers</div>
        </div>
      </div>

      <div class="reveal scroll-cue" style="transition-delay: 700ms;">
        <span>scroll to unwrap</span>
        <span class="arrow">↓</span>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.section--hero {
  min-height: 100vh;
  padding-top: 10rem;
  padding-bottom: 6rem;
}
.stats-row {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}
.stat-card {
  background: #ffffff;
  border: 2px solid #0a0a0a;
  border-radius: 24px;
  padding: 1.75rem 1.5rem;
  box-shadow: 6px 6px 0 #0a0a0a;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.stat-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #0a0a0a;
}
.stat-label {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.65;
  font-weight: 600;
}
.scroll-cue {
  margin-top: 5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  opacity: 0.6;
}
.arrow {
  font-size: 1.2rem;
  animation: bounce 1.6s ease-in-out infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}
</style>
