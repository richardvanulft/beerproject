<template>
    <div class="container">
    </div>
</template>
<script>
import axios from 'axios';
  
  axios.get('http://localhost:3000/api/check-login')
  .then(response => {
    if (response.data.isLoggedIn) {

    } else {

    }
  })
  .catch(error => {
    console.log(error);
  });
</script>