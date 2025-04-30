<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroSection from '../components/home/HeroSection.vue'
import FeaturesSection from '../components/home/FeaturesSection.vue'
import ProductsGrid from '../components/home/ProductsGrid.vue'
import TestimonialsSection from '../components/home/TestimonialsSection.vue'
import CtaSection from '../components/home/CtaSection.vue'

const isLoaded = ref(false)

onMounted(() => {
  isLoaded.value = true
})
</script>

<template>
  <div>
    <HeroSection />
    <FeaturesSection :is-visible="isLoaded" />
    <ProductsGrid :is-visible="isLoaded" />
    <TestimonialsSection :is-visible="isLoaded" />
    <CtaSection :is-visible="isLoaded" />
  </div>
</template>