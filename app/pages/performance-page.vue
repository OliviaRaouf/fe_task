<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      <date-filter @pointsArr="pointsArr"/>
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component :chartDataArr="chartDataArr"/>
    </div>
  </div>
</template>

<script>
import DateFilter from '../components/vue-components/date-filter.vue'
import PerformanceChartComponent from "../components/vue-components/performance-chart.vue";
export default {
  name: "AboutPageComponent",
  components: {
    PerformanceChartComponent,
    DateFilter,
  },
  data() {
    return {
      chartDataArr:[],
    }
  },
  methods: {
    pointsArr(arr){
      this.chartDataArr = arr;
    }
  },

};
</script>
