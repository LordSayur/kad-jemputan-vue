<template>
  <div>
    <p v-if="!makluman">Fetching data...</p>
    <form v-else @submit.prevent="updateDb">
      <h1>Makluman</h1>
      <!-- buttons -->
      <div class="row">
        <button type="submit" :class="`btn`">Update to Database</button>
        <UpdateDb
          v-if="states.isShow"
          docName="makluman"
          :payload="{ makluman }"
          @updateDone="states.isShow = false"
        />
      </div>
      <div class="row">
        <label for="title">Title</label>
        <input id="title" v-model="Makluman.title" type="text" />
        <label for="content">Content</label>
        <textarea
          id="content"
          v-model="Makluman.content"
          style="min-height: 10rem"
        ></textarea>
      </div>
    </form>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");
import UpdateDb from "@/components/UpdateDb";
export default {
  name: "AdminMakluman",
  props: {
    isOmar: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    UpdateDb,
  },
  data() {
    return {
      makluman: null,
      states: {
        isShow: false,
      },
    };
  },
  created() {
    this.getDataFromFB();
  },
  methods: {
    getDataFromFB() {
      fb.omaramirah.doc("makluman").onSnapshot((document) => {
        this.makluman = document.data().makluman;
      });
    },
    updateDb() {
      this.states.isShow = true;
    },
  },
  computed: {
    Makluman() {
      return this.isOmar ? this.makluman.omar : this.makluman.amirah;
    },
  },
};
</script>

<style>
</style>