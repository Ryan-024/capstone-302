import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

const wrappedTheme = {
  dark: false,
  colors: {
    background: '#FFFBF2',
    surface: '#FFFFFF',
    primary: '#FF467A',      // pink
    secondary: '#5003C0',    // deep purple
    accent: '#FFD51E',       // yellow
    info: '#AB03A9',         // magenta
    success: '#AB03A9',
    warning: '#FFD51E',
    error: '#FF467A',
    // custom section tokens
    'section-hero': '#FFE8EE',
    'section-obsessed': '#EFDDFF',
    'section-platform': '#FFE0F0',
    'section-revenue': '#FFF3B8',
    'section-finale': '#F5E4FF',
    'ink': '#1B0140'
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
