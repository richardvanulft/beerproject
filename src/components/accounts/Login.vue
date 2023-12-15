<template>
  <div class="login">
    <h1>Login</h1>
  <form @submit.prevent="login">
    <input type="email" v-model="userData.email" placeholder="Email" required>
    <input type="password" v-model="userData.password" placeholder="Wachtwoord" required>
    <button type="submit">Inloggen</button>
    nog geen account? <router-link to="/register">registreer</router-link>
  </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userData: {
        email: '',
        password: ''
      },
    };
  },
  methods: {
    async login() {
      try {
        console.log(this.userData)
        const response = await axios.post('http://localhost:3000/loginuser',this.userData);

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
          console.log('Er is iets misgegaan bij het inloggen');
        }
      } catch (error) {
        console.error('Fout tijdens inloggen:', error);

        if (error.response) {
          // De server heeft gereageerd met een statuscode buiten het bereik van 2xx
          console.error('Foutstatus:', error.response.status);
          console.error('Foutgegevens:', error.response.data);
        } else if (error.request) {
          // Het verzoek is gemaakt, maar er is geen respons ontvangen
          console.error('Geen respons ontvangen');
        } else {
          // Er is iets anders misgegaan
          console.error('Onverwachte fout:', error.message);
        }
      }
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #373737;
  height: 500px;
  width: 500px;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

input {
  height: 35px;
  width: 100%;
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 20px;
  font-size: 16px;
}

button {
  height: 35px;
  width: 100%;
  border-radius: 10px;
  background-color: grey;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}
</style>