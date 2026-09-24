<script setup lang="ts">
import FloatyEmojis from '../FloatyEmojis.vue'
import { formatNumber, PLATFORM_META } from '../../composables/useMetrics'
import type { TopPost, TopSong } from '../../types'

defineProps<{
  topPost: TopPost
  topSong: TopSong
  topCommenter: string
  topComment: {
    handle: string
    text: string
    postTitle: string
    platform: string
    likes: number
    replies: number
  }
  scopeLabel: string
}>()

const emojis = [
  { char: '💜', top: '12%', left: '6%', speed: 0.2, rot: -12 },
  { char: '🎧', top: '18%', left: '85%', speed: 0.16, rot: 10 },
  { char: '📸', top: '70%', left: '4%', speed: 0.24, rot: 4 },
  { char: '💬', top: '78%', left: '88%', speed: 0.18, rot: -6 },
  { char: '🎶', top: '44%', left: '92%', speed: 0.22, rot: 8 },
  { char: '✨', top: '52%', left: '2%', speed: 0.26, rot: -4 }
]
</script>

<template>
  <section class="section section--obsessed">
    <FloatyEmojis :emojis="emojis" />

    <v-container class="section-inner" style="max-width: 1200px;">
      <div class="reveal">
        <div class="eyebrow" style="color: #b026ff;">Chapter 01 · {{ scopeLabel }}</div>
      </div>

      <div class="reveal" style="transition-delay: 100ms;">
        <h2 class="display-large">
          You were <span class="gradient-text-pink">a little bit obsessed</span> 💜
        </h2>
        <p class="section-lede">
          Three things absolutely lived rent-free in your camera roll this year.
          Here's what made your feed feel unmistakably <em>you</em>.
        </p>
      </div>

      <div class="card-grid mt-8">
        <div class="reveal" style="transition-delay: 150ms;">
          <v-card class="obsession-card card-lift" elevation="4">
            <div class="card-heading">
              <span class="card-emoji">🏆</span>
              <span class="card-badge">Top Content</span>
            </div>
            <div class="card-title">{{ topPost.title }}</div>
            <div class="card-stat">
              <div class="stat-huge gradient-text-pink">{{ formatNumber(topPost.views) }}</div>
              <div class="stat-label">
                views on {{ PLATFORM_META[topPost.platform].emoji }} {{ PLATFORM_META[topPost.platform].name }}
              </div>
            </div>
          </v-card>
        </div>

        <div class="reveal" style="transition-delay: 300ms;">
          <v-card class="obsession-card card-lift" elevation="4">
            <div class="card-heading">
              <span class="card-emoji">🎵</span>
              <span class="card-badge">Top Song</span>
            </div>
            <div class="card-title">{{ topSong.title }}</div>
            <div class="card-stat">
              <div class="stat-huge gradient-text-blue">{{ topSong.uses }}×</div>
              <div class="stat-label">used in posts by {{ topSong.artist }}</div>
            </div>
          </v-card>
        </div>

        <div class="reveal" style="transition-delay: 450ms;">
          <v-card class="obsession-card card-lift" elevation="4">
            <div class="card-heading">
              <span class="card-emoji">💬</span>
              <span class="card-badge">Top Comment</span>
            </div>
            <div class="comment-quote">"{{ topComment.text }}"</div>
            <div class="card-stat">
              <div class="stat-huge gradient-text-gold">{{ formatNumber(topComment.likes) }}</div>
              <div class="stat-label">likes — from {{ topComment.handle }}</div>
            </div>
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
  align-items: stretch;
}
.card-grid > .reveal {
  display: flex;
}
.card-grid > .reveal > .obsession-card {
  width: 100%;
  height: 100%;
}
.section-lede {
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 640px;
  opacity: 0.8;
}
.obsession-card {
  padding: 1.75rem;
  border-radius: 24px !important;
  background: #ffffff !important;
  border: 2px solid #0a0a0a;
  box-shadow: 6px 6px 0 #0a0a0a !important;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}
.card-badge {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  opacity: 0.6;
  font-weight: 700;
}
.card-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.card-emoji {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
}
.card-title {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 1.35rem;
  line-height: 1.25;
}
.comment-quote {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.4;
}
.card-meta {
  display: flex;
  gap: 0.5rem;
}
.artist {
  opacity: 0.7;
  font-size: 0.95rem;
}
.card-stat {
  margin-top: 0.25rem;
}
.stat-label {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.6;
  font-weight: 600;
}
</style>
