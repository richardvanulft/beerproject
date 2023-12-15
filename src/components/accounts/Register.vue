<template>
  <form @submit.prevent="registerUser">
    <input type="text" v-model="userData.firstname" placeholder="Voornaam" required>
    <input type="text" v-model="userData.lastname" placeholder="Achternaam" required>
    <input type="email" v-model="userData.email" placeholder="E-mail" required>
    <input type="password" v-model="userData.password" placeholder="Wachtwoord" required>
    <button type="submit" :disabled="isLoading">Registreren</button>
    <div v-if="isLoading">Registreren...</div>
  </form>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      userData: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        permissionLevel: '1',
      },
      isLoading: false,
    };
  },
  methods: {
    async registerUser() {
      try {
        this.isLoading = true;
        const response = await axios.post('http://localhost:3000/registeruser', this.userData);

        // Log the entire response for debugging
        console.log('Server Response:', response);

        if (response.data.isLoggedIn) {
          console.log('User registered and logged in successfully');
          console.log('User data:', response.data);
          const userData = {
            firstname: response.data.user.firstname,
            lastname: response.data.user.lastname,
            email: response.data.user.email,
            permissionLevel: response.data.user.permissionLevel,
          };
          this.$store.commit('setAuthentication', true);
          this.$store.commit('setUser', userData);
          this.$store.commit('user/setUser', userData);
          const expires = new Date();
          expires.setDate(expires.getDate() + 365); // Stel de vervaldatum in (bijv. 7 dagen)
          document.cookie = `user=${JSON.stringify(userData)}; expires=${expires.toUTCString()}; path=/; SameSite=None; Secure`;

          // Redirect to another page if needed
          this.$router.push('/');
        } else {
          console.error('Registration failed:', response.data.message);
          // Handle other cases as needed
        }
      } catch (error) {
        console.error('Registration failed:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>