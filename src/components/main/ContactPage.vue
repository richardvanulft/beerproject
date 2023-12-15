<template>
    <div class="container">
      <h1>Contact us!</h1>
      <p>fill out this form and we will contact you A.S.A.P!</p>
      <form>
        <div class="boven">
            <label for="fname">Full name</label>
            <input type="text" id="fname" name="firstname" placeholder="Your name..">
            <label for="email">E-mail</label>
        </div>
          <div class="onder">
            <input type="text" id="lname" name="lastname" placeholder="Your last name..">
            <label for="subject">Subject</label>
            <textarea id="subject" name="subject" placeholder="Write something.." style="height:100px"></textarea>
          <input type="submit" value="Submit">
        </div>
      </form>
    </div>
</template>
<script>
export default {
  name: 'ContactPage',
  metaInfo: {
    title: 'Contact - unknownbeercompany',
    meta: [
      {
        name: 'description',
        content: 'ask your question/plan to visit us at Unknown Beer Company.'
      },
      {
        property: 'og:title',
        content: 'Contact - unknownbeercompany.com'
      },
      {
        property: 'og:description',
        content: 'ask your question/plan to visit us at Unknown Beer Company.'
      }
    ]
  },

}
</script>
<style lang="scss">

form {
  width: 200px;
}

input[type=text], select, textarea{
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
  width: 200px;
}

/* Style the label to display next to the inputs */
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

@media screen and (max-width: 1074px) {

}
</style>