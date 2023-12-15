<template>
  <nav>
    <ul>
    <li v-if="isLoggedIn" class="Login" @click="toggleDropdown">
      <span class="ClickableSpan">{{ currentUser.firstname }}</span>
      <ul v-if="showDropdown" class="DropdownMenu">
        <li><router-link to="/profile">Profile</router-link></li>
        <li @click="logout">Logout</li>
      </ul>
    </li>
    <li v-else class="Login"><router-link to="/login">Login</router-link></li>
    </ul>
    <ul class="center">
      <h1 style="text-align: center; color: white; border-width: 3px; border-color: white;">Unknown Beer Company</h1>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/beers">Beers</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li><router-link to="/SEO">SEO</router-link></li>
    </ul>
  </nav>

  <div class="hamburger">
    <button @click="toggleMenu()" class="hamburger">&#9776;</button>
    <div v-if="isMenuOpen" class="menu">
      <ul>
        <button @click="closeMenu" class="close-button">X</button>
      <li v-if="isLoggedIn" class="Login2" @click="toggleDropdown">
        <span class="ClickableSpan">{{ currentUser.firstname }}</span>
        <ul v-if="showDropdown" class="DropdownMenu">
          <li><router-link to="/profile">Profile</router-link></li>
          <li @click="logout">Logout</li>
        </ul>
      </li>
      <router-link to="/">Home</router-link>
      <router-link to="/beers">Beers</router-link>
     <router-link to="/about">About</router-link>
     <router-link to="/contact">Contact</router-link>
        <router-link to="/SEO">SEO</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
      isMenuOpen: false,
    };
  },
  methods: {
    closeMenu() {
      this.isMenuOpen = false;
    },
    async logout() {
      try {
        console.log('Uitloggen...');
        await axios.post('http://localhost:3000/logout');

        this.$store.commit('user/logoutUser');

        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        this.$router.push('/');


        console.log('U bent uitgelogd');
      } catch (error) {
        console.error('Fout tijdens uitloggen', error);

      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

  <style lang="scss">
  @import '../assets/css/style.scss';
  </style>
  