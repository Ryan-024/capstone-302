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
  { char: '💬', top: '78%', left: '88%', speed: 0.18, rot: -6 }
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

      <v-row class="mt-8" dense>
        <v-col cols="12" md="4">
          <div class="reveal" style="transition-delay: 150ms;">
            <v-card class="obsession-card card-lift" elevation="4">
              <div class="card-badge">Top content</div>
              <div class="card-emoji">🏆</div>
              <div class="card-title">{{ topPost.title }}</div>
              <div class="card-meta">
                <v-chip
                  :color="PLATFORM_META[topPost.platform].color"
                  variant="flat"
                  size="small"
                  class="text-white"
                >
                  {{ PLATFORM_META[topPost.platform].emoji }}
                  {{ PLATFORM_META[topPost.platform].name }}
                </v-chip>
              </div>
              <div class="card-stat">
                <div class="stat-huge gradient-text-pink">{{ formatNumber(topPost.views) }}</div>
                <div class="stat-label">views</div>
              </div>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div class="reveal" style="transition-delay: 300ms;">
            <v-card class="obsession-card card-lift" elevation="4">
              <div class="card-badge">Top song</div>
              <div class="card-emoji">🎵</div>
              <div class="card-title">{{ topSong.title }}</div>
              <div class="card-meta">
                <span class="artist">by {{ topSong.artist }}</span>
              </div>
              <div class="card-stat">
                <div class="stat-huge gradient-text-blue">{{ topSong.uses }}×</div>
                <div class="stat-label">used in posts</div>
              </div>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div class="reveal" style="transition-delay: 450ms;">
            <v-card class="obsession-card card-lift" elevation="4">
              <div class="card-badge">Top comment</div>
              <div class="card-emoji">💬</div>
              <div class="comment-quote">"{{ topComment.text }}"</div>
              <div class="card-meta">
                <span class="artist">— {{ topComment.handle }}</span>
              </div>
              <div class="card-stat">
                <div class="stat-huge gradient-text-gold">{{ formatNumber(topComment.likes) }}</div>
                <div class="stat-label">likes on that comment</div>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <div class="reveal chip-row mt-8" style="transition-delay: 600ms;">
        <v-chip variant="tonal" color="secondary" size="large">
          👑 MVP commenter: <b class="ml-1">{{ topCommenter }}</b>
        </v-chip>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.section-lede {
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 640px;
  opacity: 0.8;
}
.obsession-card {
  padding: 2rem;
  border-radius: 24px !important;
  background: white;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}
.card-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  opacity: 0.5;
  font-weight: 600;
}
.card-emoji {
  font-size: 2.4rem;
  line-height: 1;
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
  margin-top: auto;
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
