<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

// Dark mode handling
const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value ? 'dark' : 'light')
  updateTheme()
}

const updateTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  // Check for user preferences
  const savedTheme = localStorage.getItem('darkMode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDarkMode.value = savedTheme 
    ? savedTheme === 'dark'
    : prefersDark
  
  updateTheme()
})

// Watch for system theme changes
watch(isDarkMode, () => {
  updateTheme()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar :is-dark-mode="isDarkMode" @toggle-theme="toggleDarkMode" />
    
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <Footer />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>