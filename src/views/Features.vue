<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '../composables/useIntersectionObserver'

const featureSections = ref<HTMLElement[]>([])

// Setup intersection observer for animations
const { observe, unobserve } = useIntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      unobserve(entry.target)
    }
  })
})

onMounted(() => {
  // Observe all feature sections
  const sections = document.querySelectorAll('.feature-section')
  sections.forEach(section => {
    featureSections.value.push(section as HTMLElement)
    observe(section)
  })
})

const features = [
  {
    id: 'performance',
    title: 'Unmatched Performance',
    description: 'Powered by our custom processor, ProductX devices deliver lightning-fast performance for even the most demanding tasks.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
    details: [
      'Custom A15 processor with dedicated neural engine',
      'Up to 16GB unified memory for seamless multitasking',
      'Advanced thermal design for sustained performance',
      'Optimized software and hardware integration'
    ]
  },
  {
    id: 'display',
    title: 'Stunning Display',
    description: 'Experience true-to-life colors and incredible detail on our custom-designed Retina displays.',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200',
    details: [
      'Super Retina XDR display with ProMotion technology',
      'True Tone display adjusts to your environment',
      'P3 wide color gamut for vibrant, accurate colors',
      'Industry-leading brightness and contrast ratio'
    ]
  },
  {
    id: 'battery',
    title: 'All-Day Battery Life',
    description: 'Go longer between charges with our energy-efficient design and adaptive power management.',
    image: 'https://images.pexels.com/photos/306763/pexels-photo-306763.jpeg?auto=compress&cs=tinysrgb&w=1200',
    details: [
      'Up to 20 hours of continuous use',
      'Intelligent power management',
      'Fast-charging capability (50% in 30 minutes)',
      'Optimized standby time with minimal battery drain'
    ]
  },
  {
    id: 'security',
    title: 'Advanced Security',
    description: 'Your privacy and security are our top priorities, with multiple layers of protection built into every device.',
    image: 'https://images.pexels.com/photos/5240543/pexels-photo-5240543.jpeg?auto=compress&cs=tinysrgb&w=1200',
    details: [
      'Secure enclave for biometric data',
      'End-to-end encryption for all communications',
      'Advanced facial recognition technology',
      'Regular security updates and patches'
    ]
  }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 fade-in">
          Features & Technology
        </h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto mb-8 slide-up text-white/90">
          Discover the innovative technologies that make ProductX devices extraordinary.
        </p>
      </div>
    </section>
    
    <!-- Feature Sections -->
    <section v-for="(feature, index) in features" :key="feature.id"
      :class="[
        'py-16 md:py-24 feature-section transition-all duration-700',
        index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
      ]"
    >
      <div class="container mx-auto px-4">
        <div :class="[
          'flex flex-col items-center', 
          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        ]">
          <!-- Image -->
          <div class="md:w-1/2 mb-8 md:mb-0">
            <img :src="feature.image" :alt="feature.title" class="rounded-lg shadow-xl w-full h-auto object-cover" />
          </div>
          
          <!-- Content -->
          <div :class="['md:w-1/2', index % 2 === 0 ? 'md:pl-12' : 'md:pr-12']">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{{ feature.title }}</h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">{{ feature.description }}</p>
            
            <ul class="space-y-3">
              <li v-for="(detail, i) in feature.details" :key="i" class="flex items-start">
                <svg class="h-6 w-6 text-primary-600 dark:text-primary-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">{{ detail }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-16 md:py-24 bg-gradient-to-br from-accent-500 to-primary-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Experience the Difference</h2>
        <p class="text-xl max-w-3xl mx-auto mb-8 text-white/90">
          Ready to experience these features for yourself? Explore our product lineup and find the perfect ProductX for your needs.
        </p>
        <router-link to="/product/flagship" class="px-8 py-4 bg-white text-primary-600 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-colors duration-200">
          View Products
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.feature-section {
  opacity: 0;
  transform: translateY(30px);
}

.feature-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>