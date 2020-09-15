<template>
  <section class="section">
    <section class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Yellow Bus Route
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-one-third" v-for="bus in busYellow" v-bind:key="bus.id">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img v-bind:src="`${bus.url}`" v-bind:alt="`${bus.name}`">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-6">{{bus.name}}</p>
              </div>
              <b-button class="is-primary is-fullwidth is-warning" @click="imHere(bus)">ฉันอยู่ที่นี่!</b-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
const firebaseApp = require('../firebase.js')

export default {
    name: "bus-yellow",
    data() {
      return {
        busYellow: [],
      }
    },
    mounted() {
      firebaseApp.busYellowCollection.get().then(snapshot => {
        this.busYellow = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    })
  },
  methods: {
    imHere(bus) {
      const liff = this.$liff
      liff.sendMessages([{
        "type": "text",
        "text": `${bus.compute}`
      }]).then(function() {
        liff.closeWindow()
      }).catch(function(error) {
        console.log("error sending: " + error);
      })
    }
  }
}
</script>

<style scoped>

</style>