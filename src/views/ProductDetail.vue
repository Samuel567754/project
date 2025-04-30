<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'

// Define types
type StorageOption = '128GB' | '256GB' | '512GB' | '1TB'
type Tab = 'overview' | 'specs'
type ProductID = 'flagship' | 'midrange' | 'lite'

interface Product {
  name: string
  tagline: string
  description: string
  price: Record<StorageOption, number | null>
  images: string[]
  features: string[]
  specs: Record<string, string>
}

interface ColorOption {
  id: string
  name: string
  hex: string
}

// Routing and state
const route = useRoute<RouteLocationNormalizedLoaded<{ id: ProductID }>>()
const productId = computed<ProductID>(() => route.params.id)

// Data definitions
const colors: ColorOption[] = [
  { id: 'silver', name: 'Silver', hex: '#e2e2e2' },
  { id: 'space-gray', name: 'Space Gray', hex: '#303234' },
  { id: 'gold', name: 'Gold', hex: '#f3e5cd' }
]

const storageOptions: StorageOption[] = ['128GB', '256GB', '512GB', '1TB']

const products: Record<ProductID, Product> = {
  flagship: {
    name: 'ProductX Pro',
    tagline: 'Our most powerful device ever.',
    description: 'Experience unprecedented performance with the ProductX Pro. Designed for professionals and power users who demand the very best technology has to offer.',
    price: { '128GB': 999, '256GB': 1199, '512GB': 1399, '1TB': 1799 },
    images: [
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3772585/pexels-photo-3772585.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: [
      'A15 Pro chip with 10-core CPU and 16-core GPU',
      '12" Super Retina XDR display with ProMotion technology',
      'Up to 1TB of storage',
      'All-day battery life (up to 20 hours)',
      'Professional-grade camera system',
      'Improved thermal design for sustained performance',
      'Enhanced security features'
    ],
    specs: {
      dimensions: '11.3" x 8.7" x 0.24"',
      weight: '1.5 pounds',
      display: '12" Super Retina XDR',
      resolution: '2732 x 2048 pixels at 264 ppi',
      chip: 'A15 Pro with 10-core CPU, 16-core GPU',
      camera: '12MP wide, 12MP ultra-wide, LiDAR Scanner',
      battery: 'Up to 20 hours video playback',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.2, 5G cellular'
    }
  },
  midrange: {
    name: 'ProductX Air',
    tagline: 'Thin. Light. Powerful.',
    description: 'The perfect balance of portability and performance, the ProductX Air is designed for the on-the-go professional who needs reliability and power in a lightweight package.',
    price: { '128GB': 699, '256GB': 899, '512GB': 1099, '1TB': 1399 },
    images: [
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: [
      'A14 chip with 8-core CPU and 10-core GPU',
      '10" Retina display',
      'Up to 1TB of storage',
      '18-hour battery life',
      'Advanced camera system',
      'Ultra-thin design at just 0.18" thick',
      'Touch ID for secure authentication'
    ],
    specs: {
      dimensions: '9.7" x 7.3" x 0.18"',
      weight: '1.0 pounds',
      display: '10" Retina Display',
      resolution: '2360 x 1640 pixels at 264 ppi',
      chip: 'A14 with 8-core CPU, 10-core GPU',
      camera: '10MP wide camera',
      battery: 'Up to 18 hours video playback',
      connectivity: 'Wi-Fi 6, Bluetooth 5.0, 5G cellular'
    }
  },
  lite: {
    name: 'ProductX Mini',
    tagline: 'Small but mighty.',
    description: 'Don\'t let its size fool you. The ProductX Mini packs serious performance into a compact design that fits anywhere and goes everywhere.',
    price: { '128GB': 399, '256GB': 549, '512GB': 749, '1TB': null },
    images: [
      'https://images.pexels.com/photos/792345/pexels-photo-792345.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/191157/pexels-photo-191157.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: [
      'A13 chip with 6-core CPU and 8-core GPU',
      '8" display',
      'Up to 512GB of storage',
      '12-hour battery life',
      'Compact and lightweight design',
      'Perfectly balanced for one-handed use',
      'Affordable pricing without compromising quality'
    ],
    specs: {
      dimensions: '8.0" x 5.3" x 0.22"',
      weight: '0.7 pounds',
      display: '8" Liquid Retina Display',
      resolution: '1960 x 1460 pixels at 264 ppi',
      chip: 'A13 with 6-core CPU, 8-core GPU',
      camera: '8MP wide camera',
      battery: 'Up to 12 hours video playback',
      connectivity: 'Wi-Fi 6, Bluetooth 5.0, 4G cellular'
    }
  }
}

// Reactive state
const product = computed(() => products[productId.value])
const activeTab = ref<Tab>('overview')
const selectedColor = ref<ColorOption['id']>('silver')
const selectedStorage = ref<StorageOption>('128GB')
const activeImage = ref(0)

// Computed price display
const price = computed<string>(() => {
  const basePrice = product.value.price[selectedStorage.value]
  return basePrice === null ? 'Not Available' : `$${basePrice}`
})

// Handlers
const setTab = (tab: Tab) => { activeTab.value = tab }
const setImage = (index: number) => { activeImage.value = index }

// Animation refs
const imagesRef = ref<HTMLElement | null>(null)
const detailsRef = ref<HTMLElement | null>(null)

onMounted(() => {
  imagesRef.value?.classList.add('fade-in')
  detailsRef.value?.classList.add('slide-up')
})
</script>

<template>
  <div v-if="product">
    <!-- Hero section -->
    <section class="pt-20 pb-16 md:pt-28 md:pb-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-12">
          <!-- Images section -->
          <div ref="imagesRef" class="lg:w-1/2 opacity-0 transition-opacity duration-500">
            <div class="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
              <img :src="product.images[activeImage]" :alt="product.name" class="w-full h-auto object-cover" />
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="(img, idx) in product.images"
                :key="idx"
                @click="setImage(idx)"
                :class="[
                  'cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200',
                  activeImage === idx
                    ? 'border-primary-600 dark:border-primary-400 shadow-md'
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                ]"
              >
                <img :src="img" :alt="`${product.name} view ${idx + 1}`" class="w-full h-auto object-cover" />
              </div>
            </div>
          </div>

          <!-- Product details -->
          <div ref="detailsRef" class="lg:w-1/2 opacity-0 transform translate-y-4 transition-all duration-500 delay-200">
            <span class="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">NEW</span>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-2">{{ product.name }}</h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">{{ product.tagline }}</p>
            <p class="text-gray-700 dark:text-gray-300 mb-8">{{ product.description }}</p>

            <!-- Price -->
            <div class="mb-8">
              <span class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
                {{ price }}
              </span>
            </div>

            <!-- Color selection -->
            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Color</h3>
              <div class="flex space-x-3">
                <button
                  v-for="color in colors"
                  :key="color.id"
                  @click="() => (selectedColor = color.id)"
                  :style="{ backgroundColor: color.hex }"
                  :class="[
                    'w-10 h-10 rounded-full border-2 transition-all duration-200 focus:outline-none',
                    selectedColor === color.id
                      ? 'border-primary-600 dark:border-primary-400 ring-2 ring-primary-200 dark:ring-primary-900'
                      : 'border-gray-300 dark:border-gray-600'
                  ]"
                >
                  <span class="sr-only">{{ color.name }}</span>
                </button>
              </div>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Selected: {{ colors.find(c => c.id === selectedColor)?.name }}
              </p>
            </div>

            <!-- Storage selection -->
            <div class="mb-8">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Storage</h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  v-for="size in storageOptions"
                  :key="size"
                  :disabled="product.price[size] === null"
                  @click="() => product.price[size] !== null && (selectedStorage = size)"
                  :class="[
                    'py-3 px-4 rounded-lg border transition-all duration-200 focus:outline-none',
                    product.price[size] === null
                      ? 'opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600'
                      : selectedStorage === size
                        ? 'border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-700 text-gray-700 dark:text-gray-300'
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Add to cart -->
            <button class="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 mb-6">
              Add to Cart
            </button>

            <!-- Delivery info -->
            <div class="flex items-center text-gray-600 dark:text-gray-400 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Free delivery within 2-3 business days</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700 mb-8">
          <button
            @click="() => setTab('overview')"
            :class="[
              'py-3 px-6 text-lg font-medium border-b-2 focus:outline-none transition-colors duration-200',
              activeTab === 'overview'
                ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >Overview</button>
          <button
            @click="() => setTab('specs')"
            :class="[
              'py-3 px-6 text-lg font-medium border-b-2 focus:outline-none transition-colors duration-200',
              activeTab === 'specs'
                ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >Specifications</button>
        </div>

        <div v-if="activeTab === 'overview'" class="fade-in">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-12">
            <div v-for="(feat, i) in product.features" :key="i" class="flex items-start">
              <svg class="h-6 w-6 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-700 dark:text-gray-300">{{ feat }}</span>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transition-colors duration-300">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Choose {{ product.name }}?</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              The {{ product.name }} represents the pinnacle of our technology and design philosophy.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Whether you're a creative professional, a business user, or someone who values premium technology, the {{ product.name }} delivers performance and reliability you can count on, all in a beautiful package that's a joy to use.
            </p>
          </div>
        </div>

        <div v-if="activeTab === 'specs'" class="fade-in">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technical Specifications</h3>
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div v-for="(val, key) in product.specs" :key="key" class="border-b border-gray-200 dark:border-gray-700 last:border-b-0 md:even:border-l">
                <div class="p-4 md:p-6">
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">{{ key }}</h4>
                  <p class="text-gray-900 dark:text-white">{{ val }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related products -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">You May Also Like</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(rel, id) in products"
            :key="id"
            v-if="id !== productId"
            class="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            <img :src="rel.images[0]" :alt="rel.name" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ rel.name }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ rel.tagline }}</p>
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
                  From ${{ rel.price['128GB'] }}
                </span>
                <router-link :to="`/product/${id}`" class="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200">
                  View Details →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="container mx-auto px-4 py-32 text-center">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
    <router-link to="/" class="btn btn-primary">Back to Home</router-link>
  </div>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in-out forwards;
}

.slide-up {
  animation: slideUp 0.5s ease-out 0.2s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
