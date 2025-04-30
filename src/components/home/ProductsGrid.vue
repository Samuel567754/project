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

const products = [
  {
    id: 'flagship',
    name: 'ProductX Pro',
    description: 'Our flagship device, featuring the most advanced technology we have to offer.',
    price: '$999',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: ['12" Super Retina Display', 'A15 Processor', '128GB Storage', 'All-day Battery'],
    isNew: true,
  },
  {
    id: 'midrange',
    name: 'ProductX Air',
    description: 'Lightweight and portable without compromising on performance.',
    price: '$699',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: ['10" Retina Display', 'A14 Processor', '64GB Storage', '18-hour Battery'],
    isNew: false,
  },
  {
    id: 'lite',
    name: 'ProductX Mini',
    description: 'Compact and affordable, perfect for everyday use.',
    price: '$399',
    image: 'https://images.pexels.com/photos/792345/pexels-photo-792345.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: ['8" Display', 'A13 Processor', '32GB Storage', '12-hour Battery'],
    isNew: true,
  }
]

const shouldAnimate = (index: number) => {
  return props.isVisible && isInView.value
}
</script>

<template>
  <section ref="sectionRef" class="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 md:mb-20">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Our Product Line
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Discover the perfect ProductX device for your needs.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(product, index) in products" :key="product.id" 
          :class="[
            'bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1',
          ]"
          :style="{ 
            opacity: shouldAnimate(index) ? 1 : 0,
            transform: shouldAnimate(index) ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.5s ease ${index * 0.2}s`
          }"
        >
          <div class="relative">
            <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover" />
            <div v-if="product.isNew" class="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              NEW
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ product.description }}</p>
            
            <div class="mb-4">
              <span class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
                {{ product.price }}
              </span>
            </div>
            
            <ul class="mb-6 space-y-2">
              <li v-for="(feature, i) in product.features" :key="i" class="flex items-center">
                <svg class="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-600 dark:text-gray-300">{{ feature }}</span>
              </li>
            </ul>
            
            <router-link :to="`/product/${product.id}`" class="w-full btn btn-primary text-center block">
              Learn More
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>