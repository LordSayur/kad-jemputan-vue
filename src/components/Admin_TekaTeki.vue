<template>
  <form @submit.prevent="updateDb">
    <h1>Teka Teki</h1>
    <p v-if="!tekateki">Fetching data...</p>
    <div v-else>
      <div class="row">
        <button type="submit" :class="`btn`">Update to Database</button>
        <UpdateDb
          v-if="states.isShow"
          docName="teka-teki"
          :payload="{ tekateki }"
          @updateDone="states.isShow = false"
        />
      </div>
      <div class="row">
        <div v-for="(teka, key) in tekateki" :key="key">
          <h4>{{ key }}</h4>
          <div class="myFlex" v-for="(teka, index) in teka" :key="index">
            <div>
              <label>Soalan</label>
              <textarea v-model="teka.soalan" type="text"></textarea>
            </div>
            <div>
              <label>Jawapan</label>
              <textarea v-model="teka.jawapan" type="text"></textarea>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <div>
                <label for="creator">Creator</label>
                <input id="creator" v-model="teka.creator" type="text" />
              </div>
              <button
                v-if="key != 'rejected'"
                @click="rejectTeka(key, index)"
                class="btn red"
              >
                X
              </button>
            </div>
          </div>
          <button
            v-if="key === 'approved'"
            type="button"
            :class="`btn`"
            @click="teka.push({ creator: '', jawapan: '', soalan: '' })"
          >
            Add New
          </button>
          <div style="height:2px; background-color: green;"></div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
const fb = require("@/firebaseConfig.js");
import UpdateDb from "@/components/UpdateDb";
export default {
  name: "TekaTeki",
  components: {
    UpdateDb,
  },
  data() {
    return {
      tekateki: null,
      states: {
        isShow: false,
      },
    };
  },
  created() {
    this.tekateki = this.getDataFromFB();
  },
  methods: {
    getDataFromFB() {
      fb.omaramirah.doc("teka-teki").onSnapshot((document) => {
        this.tekateki = document.data().tekateki;
      });
    },
    updateDb() {
      this.states.isShow = true;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/main.scss";
.myFlex {
  display: flex;
  flex-direction: column;
}
</style>