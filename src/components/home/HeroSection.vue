<script setup lang="ts">
</script>

<template>
  <section class="pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <!-- Text content -->
        <div class="md:w-1/2 mb-10 md:mb-0 md:pr-12 fade-in">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            <span class="bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">Reimagine</span>
            what technology can do
          </h1>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Experience the next generation of innovation with ProductX. Seamlessly blending cutting-edge technology with elegant design.
          </p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <router-link to="/product/flagship" class="btn btn-primary text-center">
              Explore Products
            </router-link>
            <router-link to="/features" class="btn btn-outline text-center">
              Learn More
            </router-link>
          </div>
        </div>
        
        <!-- Hero image -->
        <div class="md:w-1/2 slide-in-right">
          <div class="relative">
            <img 
              src="https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="ProductX Pro showcase" 
              class="rounded-lg shadow-2xl"
            />
            <div class="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg animate-pulse">
              <div class="flex items-center justify-center h-16 w-16">
                <span class="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 text-transparent bg-clip-text">New</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>