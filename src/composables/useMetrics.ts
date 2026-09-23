import { computed, ref } from 'vue'
import raw from '../datametrics.json'
import type { DataMetrics, MonthData, MonthSelection, PlatformKey, TopPost, TopSong } from '../types'

const data = raw as DataMetrics

export function useMetrics() {
  const selection = ref<MonthSelection>('all')

  const months = data.months
  const creator = data.creator
  const year = data.yearSummary

  const selectedMonth = computed<MonthData | null>(() => {
    if (selection.value === 'all') return null
    return months.find((m) => m.month === selection.value) ?? null
  })

  // Aggregated stats respecting the toggle
  const platformStats = computed(() => {
    if (selection.value === 'all') {
      return {
        instagram: {
          views: year.totalViews.instagram,
          comments: year.totalComments.instagram,
          shares: year.totalShares.instagram,
          adRevenue: year.totalAdRevenue.instagram
        },
        tiktok: {
          views: year.totalViews.tiktok,
          comments: year.totalComments.tiktok,
          shares: year.totalShares.tiktok,
          adRevenue: year.totalAdRevenue.tiktok
        },
        youtube: {
          views: year.totalViews.youtube,
          comments: year.totalComments.youtube,
          shares: year.totalShares.youtube,
          adRevenue: year.totalAdRevenue.youtube
        }
      }
    }
    const m = selectedMonth.value!
    return m.platforms
  })

  const combinedViews = computed(() => {
    const p = platformStats.value
    return p.instagram.views + p.tiktok.views + p.youtube.views
  })
  const combinedRevenue = computed(() => {
    const p = platformStats.value
    return p.instagram.adRevenue + p.tiktok.adRevenue + p.youtube.adRevenue
  })
  const combinedComments = computed(() => {
    const p = platformStats.value
    return p.instagram.comments + p.tiktok.comments + p.youtube.comments
  })
  const combinedShares = computed(() => {
    const p = platformStats.value
    return p.instagram.shares + p.tiktok.shares + p.youtube.shares
  })

  const topPlatform = computed<PlatformKey>(() => {
    const p = platformStats.value
    const entries: [PlatformKey, number][] = [
      ['instagram', p.instagram.views],
      ['tiktok', p.tiktok.views],
      ['youtube', p.youtube.views]
    ]
    entries.sort((a, b) => b[1] - a[1])
    return entries[0][0]
  })

  const topPost = computed<TopPost>(() => {
    if (selection.value === 'all') return year.topPostOfYear
    return selectedMonth.value!.topPost
  })

  const topSong = computed<TopSong>(() => {
    if (selection.value === 'all') return year.topSongOfYear
    return selectedMonth.value!.engagement.topSong
  })

  const topCommenter = computed(() => {
    if (selection.value === 'all') return year.topCommenterOfYear.handle
    return selectedMonth.value!.engagement.topCommenter
  })

  const topComment = computed(() => year.topCommentOfYear)

  const subscribers = computed(() => {
    if (selection.value === 'all') {
      return {
        total: year.subscriberGrowth.end,
        gained: months.reduce((s, m) => s + m.subscribers.gained, 0),
        lost: months.reduce((s, m) => s + m.subscribers.lost, 0),
        net: year.subscriberGrowth.net,
        percent: year.subscriberGrowth.percent
      }
    }
    const m = selectedMonth.value!
    return { ...m.subscribers, percent: 0 }
  })

  const monthLabels = months.map((m) => m.month.slice(0, 3))

  return {
    selection,
    months,
    monthLabels,
    creator,
    year,
    selectedMonth,
    platformStats,
    combinedViews,
    combinedRevenue,
    combinedComments,
    combinedShares,
    topPlatform,
    topPost,
    topSong,
    topCommenter,
    topComment,
    subscribers
  }
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return Math.round(n).toLocaleString()
}

export function formatCurrency(n: number): string {
  return '$' + n.toLocaleString(undefined, { maximumFractionDigits: 0 })
}

export const PLATFORM_META: Record<PlatformKey, { name: string; icon: string; color: string; emoji: string }> = {
  instagram: { name: 'Instagram', icon: 'mdi-instagram', color: '#FF6F91', emoji: '📸' },
  tiktok:    { name: 'TikTok',    icon: 'mdi-music-note', color: '#231942', emoji: '🎵' },
  youtube:   { name: 'YouTube',   icon: 'mdi-youtube',    color: '#D65DB1', emoji: '📺' }
}
