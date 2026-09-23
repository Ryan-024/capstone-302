# Interactive Data Story - Content Analytics Story

## What is this?
A single-page parallax website. Displaying data and the story of that data as we scroll down the website.
Think Spotify Wrapped year end review but for a content creator

## Data
Generate a fake dataset as a JSON file (src/datametrics.json).
12 months of data (Jan-Dec 2025), each month containing:

(Make all of these numbers realistic for a Medium size account with around 150,000 followers)
- Subscribers
    - (Have realistic up and downs each month)
- Content performance by format
    - Instagram (Views, Comments, Shares)
    - TikTok (Views, Comments, Shares)
    - Youtube (Views, Comments, Shares)
- Ad revenue trends
    - Show Top post and the revenue it brought in (make this number realist)
- Engagement Summary
    - (Top commenting account)
    - (Top Songs used in content)

## Layout (Vuetify)
- V-app-bar at the top with Content Buddy 
- First section
    - (2025 end of year is here lets see how great it went)
    - (Small fun section about the end of the year and having fun looking back)
- Second section Most Obsessed (3 cards next to each other)
    - Top content overall
    - Top Music used
    - Top Comment (the comment that has the most likes and comments on it)
- Third Section Top Platform (3 cards next to each other)
    - Instagram (Views, Comments, Shares, ad revenue)
    - TikTok (Views, Comments, Shares, ad revenue)
    - Youtube (Views, Comments, Shares, ad revenue)
- Forth Section Revenue 
    - Top Post
    - Top Music used
    - Top Platform (Instagram, TikTok or Youtube)
- Fifth Section
    - You did it what an amazing year you had.
- Use v-container, v-row, v-col for responsive grid layout

## Interactions
- A toggle at the top to switch between the different months. Defaults to All to show end of the year over all data
- Typical Parallax website movement
    - As you scroll down the content moves into view
    - Make some of the text larger then normal
    - Ad emojis to help add a fun graphic element

## Style
- Clean, minimal, lots of whitespace
- Charts should use a cohesive color palette - not rainbow
- Use colors to separate the different content sections
- The Website should feel fun and happy

## Tech
- Vue 3 + TypeScript + Vuetify 3
- Chart.js via vue-chartjs for all charts
- Fake data from a local JSON file (no API calls)
- Single page - no routing needed for this app