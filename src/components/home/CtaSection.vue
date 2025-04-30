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

const shouldAnimate = () => {
  return props.isVisible && isInView.value
}
</script>

<template>
  <section ref="sectionRef" class="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center"
        :style="{ 
          opacity: shouldAnimate() ? 1 : 0,
          transform: shouldAnimate() ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease'
        }"
      >
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Future?</h2>
        <p class="text-xl mb-8 text-white/90">
          Join thousands of satisfied customers who have made the switch to ProductX.
          Take advantage of our limited-time promotion and get a free accessory with your purchase.
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <router-link to="/contact" class="px-8 py-4 bg-white text-primary-600 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-colors duration-200">
            Get Started Today
          </router-link>
          <router-link to="/product/flagship" class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-200">
            Explore Products
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>