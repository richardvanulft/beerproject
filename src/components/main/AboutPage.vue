<template>
  <div class="container">
    <h1>About us</h1>
    <p style="text-align: center; margin-left: 10%; margin-right: 10%;">About Unknown Beer Company</p>
    <p style="text-align: center; margin-left: 10%; margin-right: 10%;">Established in 1969, The Unknown Beer Company is a testament to the enduring passion for beer exploration. Born from the vision of a group of friends, our journey began in a local garage, evolving into a vibrant beer-tasting hub where enthusiasts gathered to discover diverse flavors.</p>
    <p style="text-align: center; margin-left: 10%; margin-right: 10%;">Our Journey</p>
    <p style="text-align: center; margin-left: 10%; margin-right: 10%;">From those humble beginnings, we've upheld a commitment to pushing the boundaries of traditional brewing. The Unknown Beer Company has become synonymous with innovation, inviting both seasoned enthusiasts and newcomers to embark on a flavorful odyssey through the world of beer.</p>
  </div>
</template>
<script>
export default {
  name: 'AboutPage',
  metaInfo: {
    title: 'About - unknownbeercompany',
    meta: [
      {
        name: 'description',
        content: 'Learn more about Unknown Beer Company and our journey.'
      },
      {
        property: 'og:title',
        content: 'About - unknownbeercompany.com'
      },
      {
        property: 'og:description',
        content: 'Learn more about Unknown Beer Company and our journey.'
      }
    ]
  },
}
</script>
<style lang="scss">
.container {
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 10%;
}
</style>