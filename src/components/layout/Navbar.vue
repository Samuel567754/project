<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isDarkMode: boolean
}>()

const emit = defineEmits(['toggle-theme'])
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center" @click="closeMenu">
            <span class="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">ProductX</span>
          </router-link>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link to="/" 
            class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 py-2 text-sm font-medium transition-colors duration-200">
            Home
          </router-link>
          <router-link to="/features" 
            class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 py-2 text-sm font-medium transition-colors duration-200">
            Features
          </router-link>
          <router-link to="/product/flagship" 
            class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 py-2 text-sm font-medium transition-colors duration-200">
            Products
          </router-link>
          <router-link to="/contact" 
            class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 py-2 text-sm font-medium transition-colors duration-200">
            Contact
          </router-link>
        </nav>
        
        <!-- Right buttons (theme toggle + call to action) -->
        <div class="hidden md:flex items-center space-x-4">
          <button @click="emit('toggle-theme')" 
            class="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200">
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <router-link to="/contact" class="btn btn-primary text-sm">Get Started</router-link>
        </div>
        
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200">
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 transition-colors duration-300">
        <router-link to="/" @click="closeMenu" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200">
          Home
        </router-link>
        <router-link to="/features" @click="closeMenu" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200">
          Features
        </router-link>
        <router-link to="/product/flagship" @click="closeMenu" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200">
          Products
        </router-link>
        <router-link to="/contact" @click="closeMenu" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200">
          Contact
        </router-link>
        <div class="flex items-center justify-between px-3 py-2">
          <button @click="emit('toggle-theme')" 
            class="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200">
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <router-link to="/contact" @click="closeMenu" class="btn btn-primary text-sm">Get Started</router-link>
        </div>
      </div>
    </div>
  </header>
</template>