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
ChartJS.defaults.color = '#1B0140'
ChartJS.defaults.borderColor = 'rgba(27, 1, 64, 0.08)'
