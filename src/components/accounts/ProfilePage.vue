<template>
  <div>
    <Navbar />
    <router-view />
  </div>
  <div class="container">
    <h1>Profile</h1>
    <p>Here you can see your profile information.</p>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'ProfilePage',
  data() {
    return {
      user: null,
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/profile');
      this.user = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
<style>
@import '../../assets/css/style.scss';
</style>