import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  ArcElement,
  Filler
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  ArcElement,
  Filler
)

ChartJS.defaults.font.family = "'Inter', -apple-system, sans-serif"
ChartJS.defaults.color = '#0a0a0a'
ChartJS.defaults.borderColor = 'rgba(10, 10, 10, 0.08)'
