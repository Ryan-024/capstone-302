import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

const wrappedTheme = {
  dark: false,
  colors: {
    background: '#F4ECDC',
    surface: '#FFFFFF',
    primary: '#FF2D87',      // hot punk pink
    secondary: '#B026FF',    // electric violet
    accent: '#FFE600',       // acid yellow
    info: '#00D1FF',         // electric cyan
    success: '#39FF14',      // neon lime
    warning: '#FF3D3D',      // blood red
    error: '#FF267F',
    // custom section tokens
    'section-hero': '#FFD0E2',
    'section-obsessed': '#ECD7FF',
    'section-platform': '#D1F5FF',
    'section-revenue': '#FFF394',
    'section-finale': '#D6FFCA',
    'ink': '#0A0A0A'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'wrappedTheme',
    themes: { wrappedTheme }
  },
  defaults: {
    VCard: { rounded: 'xl' },
    VBtn: { rounded: 'pill' },
    VChip: { rounded: 'pill' }
  }
})
