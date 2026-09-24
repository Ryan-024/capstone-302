<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import AppBar from './components/AppBar.vue'
import HeroSection from './components/sections/HeroSection.vue'
import ObsessedSection from './components/sections/ObsessedSection.vue'
import PlatformSection from './components/sections/PlatformSection.vue'
import RevenueSection from './components/sections/RevenueSection.vue'
import FinaleSection from './components/sections/FinaleSection.vue'
import { useMetrics } from './composables/useMetrics'
import { useReveal } from './composables/useParallax'

const {
  selection,
  months,
  monthLabels,
  creator,
  platformStats,
  combinedViews,
  combinedRevenue,
  topPlatform,
  topPost,
  topSong,
  topCommenter,
  topComment,
  subscribers
} = useMetrics()

const monthNames = months.map((m) => m.month)

const isYear = computed(() => selection.value === 'all')
const scopeLabel = computed(() => (isYear.value ? '2025' : `${selection.value} 2025`))

// Chart series (only used when isYear)
const monthlyViews = {
  instagram: months.map((m) => m.platforms.instagram.views),
  tiktok:    months.map((m) => m.platforms.tiktok.views),
  youtube:   months.map((m) => m.platforms.youtube.views)
}
const monthlyRevenue = months.map(
  (m) => m.platforms.instagram.adRevenue + m.platforms.tiktok.adRevenue + m.platforms.youtube.adRevenue
)
const monthlyFollowers = months.map((m) => m.subscribers.total)

// Force reveal re-init after selection swaps
useReveal()

const highContrast = ref(false)
watch(selection, async () => {
  await nextTick()
  // Reset .reveal state so new content animates back in
  document.querySelectorAll('.reveal').forEach((el) => el.classList.remove('is-visible'))
  requestAnimationFrame(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
  })
})
</script>

<template>
  <v-app :class="{ 'high-contrast': highContrast }">
    <AppBar
      v-model="selection"
      v-model:high-contrast="highContrast"
      :months="monthNames"
      :handle="creator.handle"
    />

    <v-main>
      <!-- Keyed wrapper forces charts/sections to remount when the month toggle changes -->
      <div :key="selection">
        <HeroSection
          :creator-name="creator.name"
          :handle="creator.handle"
          :total-views="combinedViews"
          :subscribers="subscribers.total"
          :net-growth="subscribers.net"
          :is-year="isYear"
          :scope-label="scopeLabel"
        />

        <ObsessedSection
          :top-post="topPost"
          :top-song="topSong"
          :top-commenter="topCommenter"
          :top-comment="topComment"
          :scope-label="scopeLabel"
        />

        <PlatformSection
          :platform-stats="platformStats"
          :top-platform="topPlatform"
          :month-labels="monthLabels"
          :monthly-views="monthlyViews"
          :scope-label="scopeLabel"
          :is-year="isYear"
        />

        <RevenueSection
          :total-revenue="combinedRevenue"
          :platform-stats="platformStats"
          :top-post="topPost"
          :top-song="topSong"
          :top-platform="topPlatform"
          :month-labels="monthLabels"
          :monthly-revenue="monthlyRevenue"
          :scope-label="scopeLabel"
          :is-year="isYear"
        />

        <FinaleSection
          :creator-name="creator.name"
          :handle="creator.handle"
          :net-growth="subscribers.net"
          :percent="subscribers.percent"
          :month-labels="monthLabels"
          :monthly-followers="monthlyFollowers"
          :is-year="isYear"
        />
      </div>
    </v-main>
  </v-app>
</template>
