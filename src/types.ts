export interface PlatformStats {
  views: number
  comments: number
  shares: number
  adRevenue: number
}

export interface TopPost {
  title: string
  platform: 'instagram' | 'tiktok' | 'youtube'
  views: number
  revenue: number
  month?: string
}

export interface TopSong {
  title: string
  artist: string
  uses: number
  month?: string
}

export interface MonthData {
  month: string
  monthIndex: number
  subscribers: {
    total: number
    gained: number
    lost: number
    net: number
  }
  platforms: {
    instagram: PlatformStats
    tiktok: PlatformStats
    youtube: PlatformStats
  }
  topPost: TopPost
  engagement: {
    topCommenter: string
    topSong: TopSong
  }
}

export interface YearSummary {
  totalViews: { instagram: number; tiktok: number; youtube: number; combined: number }
  totalComments: { instagram: number; tiktok: number; youtube: number; combined: number }
  totalShares: { instagram: number; tiktok: number; youtube: number; combined: number }
  totalAdRevenue: { instagram: number; tiktok: number; youtube: number; combined: number }
  subscriberGrowth: { start: number; end: number; net: number; percent: number }
  topPlatform: 'instagram' | 'tiktok' | 'youtube'
  topPostOfYear: TopPost
  topSongOfYear: TopSong
  topCommenterOfYear: { handle: string; totalComments: number; totalLikes: number }
  topCommentOfYear: {
    handle: string
    text: string
    postTitle: string
    platform: string
    likes: number
    replies: number
  }
}

export interface DataMetrics {
  creator: {
    name: string
    handle: string
    startingSubscribers: number
    endingSubscribers: number
  }
  months: MonthData[]
  yearSummary: YearSummary
}

export type PlatformKey = 'instagram' | 'tiktok' | 'youtube'
export type MonthSelection = 'all' | string
