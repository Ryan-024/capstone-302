import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

const wrappedTheme = {
  dark: false,
  colors: {
    background: '#FFF8F1',
    surface: '#FFFFFF',
    primary: '#FF6F91',      // pink
    secondary: '#845EC2',    // purple
    accent: '#FFC75F',       // gold
    info: '#4D96FF',         // blue
    success: '#3DBE95',      // green
    warning: '#FF9671',      // coral
    error: '#D65DB1',
    // custom section tokens
    'section-hero': '#FFE8EC',
    'section-obsessed': '#F3E8FF',
    'section-platform': '#E8F1FF',
    'section-revenue': '#FFF3D6',
    'section-finale': '#E8FBF3',
    'ink': '#231942'
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
