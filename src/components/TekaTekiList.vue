<template>
  <div>
    <h4>{{ statusName }}</h4>
    <p v-show="!status.length">No {{ statusName }} item</p>
    <div v-for="(teka, index) in status" :key="index" class="teka">
      <div>
        <label>Soalan</label>
        <textarea
          v-model="teka.soalan"
          type="text"
          style="min-height: 5rem"
        ></textarea>
      </div>
      <div>
        <label>Jawapan</label>
        <textarea
          v-model="teka.jawapan"
          type="text"
          style="min-height: 5rem"
        ></textarea>
      </div>
      <div class="myFlex">
        <div>
          <label for="creator">Creator</label>
          <input id="creator" v-model="teka.creator" type="text" />
        </div>
        <div>
          <button
            type="button"
            v-if="statusName != 'approved'"
            @click="approveTeka(status, index)"
            class="btn blue"
            style="margin-right: 1rem"
          >
            Approve
          </button>
          <button
            type="button"
            v-if="statusName != 'rejected'"
            @click="rejectTeka(status, index)"
            class="btn red"
          >
            X
          </button>
        </div>
      </div>
    </div>
    <!-- Add New Button -->
    <button
      v-if="statusName === 'approved'"
      type="button"
      :class="`btn`"
      @click="teka.push({ creator: '', jawapan: '', soalan: '' })"
    >
      Add New
    </button>
  </div>
</template>

<script>
export default {
  name: "TekaTekiList",
  props: {
    status: {
      type: Array,
    },
    statusName: {
      type: String,
    },
  },
  methods: {
    approveTeka(arr, index) {
      this.$emit("approved", { arr, index });
    },
    rejectTeka(arr, index) {
      this.$emit("rejected", { arr, index });
    },
  },
};
</script>

<style scoped>
.myFlex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.teka {
  margin-top: 3rem;
  border: 1px solid lightblue;
  padding: 2rem;
  border-radius: 1rem;
}
</style>