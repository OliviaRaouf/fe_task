<template>
  <div class="c-hello__header">
    <input type="text" @keyup="filter" v-model="input" />
    <button @click="resetFilter">Clear</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    filter() {
      this.$emit("filter-key", this.input);
    },
    resetFilter() {
      this.input = null;
      this.$emit("filter-key", this.input);
    },
  },
  mounted() {},
  created: function () {
    var currentUrl = window.location.search;
    var filterInput = currentUrl.split("=");
    this.input = filterInput[1];
  },
};
</script>
