<template>
  <div class="c-chart__container">
    <button @click="test">Click ME </button>
  </div>
</template>

<script>
export default {
  name: "filter-component",



  data() {
    return {
       poula: "Hiii"
    }
    },
    methods:{
      test(){
          this.$emit("hii", this.poula)
      }
    }
}

</script>