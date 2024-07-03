<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <h1 class="text-4xl font-bold text-center mb-4">Customer Management</h1>
        <customer-list></customer-list>
      </div>
    </div>
  </div>
</template>


<script>
import CustomerList from './CustomerList.vue';

export default {
  components: {
    CustomerList,
  },
  // rest of your component definition
}
</script>
