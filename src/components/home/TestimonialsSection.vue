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

const testimonials = [
  {
    id: 1,
    name: 'Sophia Chen',
    position: 'Creative Director',
    quote: "The ProductX Pro has completely transformed my workflow. The speed and reliability are unmatched by any other device I've used.",
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    position: 'Software Engineer',
    quote: 'As a developer, I need powerful tools that can keep up with my demanding workload. The ProductX Air exceeds all my expectations.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Johnson',
    position: 'Digital Marketer',
    quote: "I was skeptical at first, but now I can't imagine my life without my ProductX. It's intuitive, fast, and reliable.",
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4,
  },
]

const shouldAnimate = () => {
  return props.isVisible && isInView.value
}
</script>

<template>
  <section ref="sectionRef" class="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 md:mb-20">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          What Our Customers Say
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Join thousands of satisfied ProductX users worldwide.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in testimonials" :key="testimonial.id" 
          class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          :style="{ 
            opacity: shouldAnimate() ? 1 : 0,
            transform: shouldAnimate() ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.5s ease ${index * 0.2}s`
          }"
        >
          <div class="flex items-start mb-4">
            <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover mr-4" />
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">{{ testimonial.position }}</p>
            </div>
          </div>
          
          <div class="mb-4">
            <div class="flex text-accent-500">
              <svg v-for="i in testimonial.rating" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg v-for="i in 5 - testimonial.rating" :key="i + testimonial.rating" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300 dark:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          
          <blockquote class="text-gray-600 dark:text-gray-300 italic">
            "{{ testimonial.quote }}"
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>