import { onMounted, onBeforeUnmount, ref } from 'vue'

export function useScrollY() {
  const scrollY = ref(0)
  let raf = 0
  const onScroll = () => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      scrollY.value = window.scrollY
    })
  }
  onMounted(() => {
    scrollY.value = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    cancelAnimationFrame(raf)
  })
  return scrollY
}

export function useReveal() {
  onMounted(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
  })
}
