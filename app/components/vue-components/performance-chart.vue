<template>
  <div class="c-chart__container">
    <p v-if="noData" class="text-warning">Out of Range</p>
    <v-chart ref="chart" :option="chartOptions" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from "moment";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  props:["chartDataArr"],
  name: "PerformanceChartComponent",

  components: {
    VChart,
  },

  data() {
    return {
      min:"",
      max:"",
      noData: false,
    };
  },

  computed: {
    ...mapState(["chartData"]),
    initOptions() {
      return {
        width: "auto",
        height: "300px",
      };
    },

    chartOptions() {
      return {
        title: {
          text: "Team Performance Index",
          left: "center",
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "2px",
          top: "6px",
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#16253f',
          textStyle: {
           color: '#fff',
          },
        formatter: (params) => {
          return (
            '<div style="text-align: center;">' +
            params[0].name +
            '</div>' +
            params[0].marker +
            " Team Performance Index:  " +
            parseInt(params[0].data) + '%'
          );
         },
        },
        visualMap: {
          show: true,
          dimension: 1,
          right: 10,
          top: 20,
          bottom: 20,
          pieces: [
            {
              gt: 0,
              lt: 50,
              color: '#f4674c'
            },
            {
              gte: 50,
              lte: 80,
              color: '#fbdc39'
            },
            {
              gte: 80,
              lte:100,
              color: '#46994f'
            }
          ]
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          min: this.min,
          max: this.max,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2,
            },
          },
        ],
      };
    },

    xAxisData() {
      return this.chartData.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.chartData.map((item) => +item.performance * 100);
    },
  },
  watch:{
    chartDataArr(value){
      this.min = value[0];
      this.max = value[value.length - 1];
      if(new Date(this.chartData[0].date_ms) > this.min && new Date(this.chartData[0].date_ms) > this.max) {
        this.noData = true;

      }else if (new Date(this.chartData[0].date_ms) < this.min && new Date(this.chartData[this.chartData.length - 1].date_ms) < this.max){
        this.noData = true;
      }
      else{
         this.noData = false;
         this.min = this.formatDate(value[0]);
         this.max = this.formatDate(value[value.length - 1]);
      }
    }
  },
  mounted() {
    this.$store.dispatch('fetchChartData');
  },
  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
  },
};
</script>
