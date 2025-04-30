<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

const loading = ref(false)
const success = ref(false)
const error = ref(false)

const submitForm = async () => {
  loading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Simulate success (in real app, this would be based on actual API response)
  success.value = true
  loading.value = false
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  }
  
  // Reset success message after 5 seconds
  setTimeout(() => {
    success.value = false
  }, 5000)
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 fade-in">
          Get in Touch
        </h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto mb-8 slide-up text-white/90">
          Have questions about our products? Ready to place an order? We're here to help.
        </p>
      </div>
    </section>
    
    <!-- Contact Form & Info -->
    <section class="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-12">
          <!-- Contact Form -->
          <div class="lg:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
            
            <div v-if="success" class="mb-6 bg-success-50 dark:bg-success-700/20 text-success-700 dark:text-success-500 p-4 rounded-lg">
              Thank you for your message! Our team will get back to you shortly.
            </div>
            
            <div v-if="error" class="mb-6 bg-error-50 dark:bg-error-700/20 text-error-700 dark:text-error-500 p-4 rounded-lg">
              There was an error sending your message. Please try again.
            </div>
            
            <form @submit.prevent="submitForm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    required
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    required
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone (Optional)</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="form.phone"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <select 
                    id="subject" 
                    v-model="form.subject" 
                    required
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales Question</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Product Feedback</option>
                  </select>
                </div>
              </div>
              
              <div class="mb-6">
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required
                  rows="5"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <div class="mb-6">
                <label class="flex items-center">
                  <input 
                    type="checkbox" 
                    v-model="form.newsletter"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors duration-200"
                  />
                  <span class="ml-2 text-gray-700 dark:text-gray-300">Subscribe to our newsletter for updates and promotions</span>
                </label>
              </div>
              
              <button 
                type="submit" 
                :disabled="loading"
                class="w-full sm:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span v-if="loading">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
                <span v-else>Send Message</span>
              </button>
            </form>
          </div>
          
          <!-- Contact Info -->
          <div class="lg:w-1/3">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6 transition-colors duration-300">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h3>
              
              <ul class="space-y-4">
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-primary-600 dark:text-primary-400 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Address</p>
                    <p class="text-gray-600 dark:text-gray-400">
                      123 Innovation Way<br>
                      Techville, CA 94103<br>
                      United States
                    </p>
                  </div>
                </li>
                
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-primary-600 dark:text-primary-400 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Email</p>
                    <a href="mailto:support@productx.com" class="text-primary-600 dark:text-primary-400 hover:underline">support@productx.com</a>
                  </div>
                </li>
                
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-primary-600 dark:text-primary-400 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Phone</p>
                    <p class="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </li>
                
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-primary-600 dark:text-primary-400 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">Business Hours</p>
                    <p class="text-gray-600 dark:text-gray-400">
                      Monday - Friday: 9AM - 6PM<br>
                      Saturday: 10AM - 4PM<br>
                      Sunday: Closed
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Connect With Us</h3>
              
              <div class="flex space-x-4">
                <a href="#" class="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200">
                  <span class="sr-only">Twitter</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" class="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200">
                  <span class="sr-only">Facebook</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200">
                  <span class="sr-only">Instagram</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200">
                  <span class="sr-only">YouTube</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          <div class="space-y-6">
            <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
              <button class="w-full flex justify-between items-center p-6 text-left focus:outline-none">
                <span class="text-lg font-semibold text-gray-900 dark:text-white">When will my order ship?</span>
                <svg class="h-5 w-5 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div class="px-6 pb-6">
                <p class="text-gray-600 dark:text-gray-400">
                  Orders typically ship within 1-2 business days. Once shipped, you'll receive a tracking number via email. 
                  Standard shipping takes 2-5 business days, while expedited shipping usually arrives within 1-2 business days.
                </p>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
              <button class="w-full flex justify-between items-center p-6 text-left focus:outline-none">
                <span class="text-lg font-semibold text-gray-900 dark:text-white">What is your return policy?</span>
                <svg class="h-5 w-5 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div class="px-6 pb-6">
                <p class="text-gray-600 dark:text-gray-400">
                  We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, 
                  you can return it within 30 days for a full refund or exchange. The product must be in its original 
                  condition and packaging. Shipping costs for returns are the responsibility of the customer unless 
                  the return is due to our error.
                </p>
              </div>
            </div>
            
            <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
              <button class="w-full flex justify-between items-center p-6 text-left focus:outline-none">
                <span class="text-lg font-semibold text-gray-900 dark:text-white">Do you offer international shipping?</span>
                <svg class="h-5 w-5 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div class="px-6 pb-6">
                <p class="text-gray-600 dark:text-gray-400">
                  Yes, we ship to most countries worldwide. International shipping rates and delivery times vary 
                  depending on the destination. Please note that customers are responsible for any customs fees, 
                  taxes, or duties that may be applied by their country's customs officials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>