<template>
  <nav>
    <li v-if="isLoggedIn" class="Login" @click="toggleDropdown">
      <span class="ClickableSpan">{{ currentUser.firstname }}</span>
      <ul v-if="showDropdown" class="DropdownMenu">
        <li><router-link to="/profile">Profile</router-link></li>
        <li @click="logout">Logout</li>
      </ul>
    </li>
    <li v-else class="Login"><router-link to="/login">Login</router-link></li>
    <ul class="center">
      <h1 style="text-align: center; color: white; border-width: 3px; border-color: white;">Unknown Beer Company</h1>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/beers">Beers</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
    name: 'Navbar',
    computed: {
      ...mapState('user', ['user']),
      isLoggedIn() {
        return this.$store.state.user.user !== null;
      },
      currentUser() {
        console.log(this.$store.state.user.user);
        return this.$store.state.user.user;
      },
    },
  data() {
      return {
        showDropdown: false,
      };
    },
  methods: {
    async logout() {
      try {
        console.log('Uitloggen...');
        await axios.post('http://localhost:3000/logout');
        // Roep de Vuex mutatie aan om de gebruiker uit te loggen.
        this.$store.commit('user/logoutUser');
        // Verwijder de cookie.
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // Optioneel: Navigeer naar de uitlogpagina of een andere bestemming.
        this.$router.push('/'); // Bijvoorbeeld naar de startpagina.

        // Optioneel: Toon een succesbericht aan de gebruiker.
        console.log('U bent uitgelogd');
      } catch (error) {
        console.error('Fout tijdens uitloggen', error);
        // Toon een foutbericht aan de gebruiker als er een probleem is.
      }
    },
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  },
  },
};
</script>

  <style>
  nav {
    margin-left: 20px;
    margin-right: 20px;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    align-items: center;
  }
  center {
    text-align: center;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  li {
    color: white;
    display: inline-block;
    margin-right: 10px;
    font-size: 200%;
  }
  
  a {
    text-decoration: none;
    color: white;
    padding: 5px;
  }
  
  a:hover {
    color: #000;
  }
  .Login {
    float: right;
    position: absolute;
    top: 8px;
    right: 16px;
    margin-right: 100px;
    margin-top: 50px;
  }

  .DropdownMenu {
    list-style: none;
    font-size: medium;
    margin: 0;
    position: absolute;
    background-color: #D89000;
    border: 1px solid #ccc;
    z-index: 1000;
  }

  .DropdownMenu li {
    cursor: pointer;
  }

  .DropdownMenu li:hover {
    background-color: #f5f5f5;
  }

  .ClickableSpan {
    cursor: pointer;
  }
  </style>
  