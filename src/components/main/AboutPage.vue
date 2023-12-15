<template>
  <div class="container">
    <h1>About us</h1>
        <p style="text-align: center; margin-left: 10%; margin-right: 10%;">About Unknown Beer Company
At Unknown Beer Company, we are passionate about beer and driven by a relentless pursuit of excellence. Established in 1969, we have quickly emerged as a prominent player in the craft beer industry, earning a reputation for our commitment to quality, innovation, and outstanding flavors.
Our journey began with a vision to create beers that break the mold and challenge conventions. We believe that beer should be an experience that excites the senses and sparks curiosity. Guided by this philosophy, we have assembled a team of talented brewers who share our passion and dedication to pushing the boundaries of brewing.
What sets Unknown Beer Company apart is our relentless pursuit of perfection. We obsess over every detail, from the selection of the finest ingredients to the precise brewing processes and meticulous quality control. Our commitment to excellence is reflected in every bottle we produce, ensuring that each sip delivers a memorable and satisfying experience.
But our dedication goes beyond the beer itself. We are deeply committed to sustainability and actively work towards minimizing our environmental impact. From sourcing local ingredients to implementing energy-efficient practices in our brewery, we strive to make a positive difference in the world while creating exceptional beers.
At Unknown Beer Company, we also recognize the importance of community. We believe that beer brings people together, forging connections and fostering camaraderie. That's why we actively engage with our customers, local communities, and fellow beer enthusiasts. From hosting events and tastings to collaborating with local businesses and artisans, we aim to create a vibrant and inclusive beer culture.
We invite you to join us on this incredible beer journey. Explore our diverse range of beers, discover new flavors, and embark on a voyage of taste and discovery. Whether you're a beer connoisseur or simply curious, Unknown Beer Company welcomes you to experience the passion, craftsmanship, and artistry that define our brews.
Raise a glass with us and celebrate the unknown. Cheers to great beer and memorable moments!</p>
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