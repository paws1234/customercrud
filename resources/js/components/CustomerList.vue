<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Customers</h2>
    <form @submit.prevent="editingCustomer ? updateCustomer() : addCustomer()" class="mb-6 bg-white p-4 shadow-md rounded-lg">
      <h2 class="text-xl font-semibold mb-4 text-gray-800" v-if="editingCustomer">Edit Customer</h2>
      <h2 class="text-xl font-semibold mb-4 text-gray-800" v-else>Add Customer</h2>
      <div class="flex flex-wrap gap-2 mb-4">
        <input v-model="customerForm.first_name" placeholder="First Name" required class="w-full px-3 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        <input v-model="customerForm.last_name" placeholder="Last Name" required class="w-full px-3 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        <input v-model="customerForm.email" placeholder="Email" type="email" required class="w-full px-3 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        <input v-model="customerForm.contact_number" placeholder="Contact Number" required class="w-full px-3 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" v-if="!editingCustomer">Add Customer</button>
      <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" v-else>Update Customer</button>
      <button type="button" @click="cancelEdit" class="w-full mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" v-if="editingCustomer">Cancel</button>
    </form>
    <ul class="space-y-4">
      <li v-for="customer in customers" :key="customer.id" class="border rounded-lg p-4 bg-white shadow-md flex justify-between items-center">
        <div>
          <p class="text-lg font-semibold text-gray-800">{{ customer.first_name }} {{ customer.last_name }}</p>
          <p class="text-gray-600">{{ customer.email }}</p>
          <p class="text-gray-600">{{ customer.contact_number }}</p>
        </div>
        <div class="flex space-x-2">
          <button @click="editCustomer(customer)" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded">Edit</button>
          <button @click="deleteCustomer(customer.id)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      customers: [],
      customerForm: {
        first_name: '',
        last_name: '',
        email: '',
        contact_number: ''
      },
      editingCustomer: null
    };
  },
  methods: {
    fetchCustomers() {
      axios.get('/customers')
        .then(response => {
          this.customers = response.data;
        });
    },
    addCustomer() {
      axios.post('/customers', this.customerForm)
        .then(response => {
          this.customers.push(response.data);
          this.resetForm();
        });
    },
    deleteCustomer(id) {
      axios.delete(`/customers/${id}`)
        .then(() => {
          this.customers = this.customers.filter(customer => customer.id !== id);
        });
    },
    editCustomer(customer) {
      this.editingCustomer = customer;
      this.customerForm = { ...customer };
    },
    updateCustomer() {
      axios.put(`/customers/${this.editingCustomer.id}`, this.customerForm)
        .then(response => {
          const index = this.customers.findIndex(customer => customer.id === response.data.id);
          this.$set(this.customers, index, response.data);
          this.resetForm();
        });
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.customerForm = {
        first_name: '',
        last_name: '',
        email: '',
        contact_number: ''
      };
      this.editingCustomer = null;
    }
  },
  mounted() {
    this.fetchCustomers();
  }
};
</script>
