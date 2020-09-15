<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <bus-list />
    <bus-red />
    <bus-yellow />
    <bus-blue />
  </div>
</template>

<script>
import BusList from "./components/BusList.vue";
import BusRed from "./components/BusRed.vue";
import BusYellow from "./components/BusYellow.vue";
import BusBlue from "./components/BusBlue.vue";

export default {
  name: "App",
  components: {
    BusList,
    BusRed,
    BusYellow,
    BusBlue
  },
  data() {
    return {
      wordtoreturn: ""
    };
  },
  created() {
    const liff = this.$liff;
    liff
      .init({
        liffId: "1654131908-42Bk11yJ"
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        console.log("LIFF Init Complete");
      })
      .catch(err => {
        console.log("Error init LIFF: " + err);
      });
  },
  methods: {
    ctop: function(receivedWord) {
      alert("we got" + receivedWord);
    }
  }
};
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  background-color: #fff;
}
</style>
