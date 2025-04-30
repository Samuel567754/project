<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '../../composables/useIntersectionObserver'

const props = defineProps<{
  isVisible: boolean
}>()

const sectionRef = ref<HTMLElement | null>(null)
const isInView = ref(false)

// Setup intersection observer
const { observe, unobserve } = useIntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      isInView.value = true
      unobserve(entry.target)
    }
  })
})

watch(() => sectionRef.value, (el) => {
  if (el) observe(el)
}, { immediate: true })

const features = [
  {
    id: 1,
    title: 'Cutting-Edge Performance',
    description: 'Experience blazing-fast performance with our advanced processing technology.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    id: 2,
    title: 'Seamless Integration',
    description: 'Connects flawlessly with all your existing devices and smart home systems.',
    icon: 'M21 16.42v3.536a1 1 0 01-.93.998c-.437.03-.794.046-1.07.046-8.837 0-16-7.163-16-16 0-.276.015-.633.046-1.07A1 1 0 014.044 3H7.58a.5.5 0 01.498.45c.023.23.044.413.064.552A13.901 13.901 0 0919.834 15.29c.139.02.322.041.552.064a.5.5 0 01.45.498z',
  },
  {
    id: 3,
    title: 'Enhanced Security',
    description: 'Industry-leading security features keep your data safe and private.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    id: 4,
    title: 'Intuitive Interface',
    description: 'Simple, elegant design makes using our products a joy, not a chore.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    id: 5,
    title: 'Smart Adaptability',
    description: 'AI-powered features that learn from your habits to better serve your needs.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    id: 6,
    title: 'Extended Battery Life',
    description: 'Go longer between charges with our energy-efficient design.',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
]

// Rename unused param to _index to satisfy TypeScript
const shouldAnimate = (_index: number) => {
  return props.isVisible && isInView.value
}
</script>

<template>
  <section ref="sectionRef" class="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 md:mb-20">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Revolutionary Features
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Every ProductX device comes loaded with innovative features designed to enhance your life.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="feature.id" 
          :class="[
            'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl',
            { 'animate-slide-up': shouldAnimate(index) },
            { 'stagger-1': index % 3 === 0 },
            { 'stagger-2': index % 3 === 1 },
            { 'stagger-3': index % 3 === 2 },
          ]"
          :style="{ 
            opacity: shouldAnimate(index) ? 1 : 0,
            transform: shouldAnimate(index) ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.5s ease ${index * 0.1}s`
          }"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div class="bg-primary-100 dark:bg-primary-900 rounded-lg p-3 text-primary-600 dark:text-primary-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
