<template>
  <div>
    <input type="date" id="start" v-model="date.startDate" />
    <input type="date" id="end" v-model="date.endDate" />
    <button
      @click="dateFilter(date.startDate, date.endDate)" :disabled="isValid"
    >
      Filter
    </button>
  </div>
</template>

<script>
import filter from "../../mixins/filter"

export default {
  data() {
    return {
      date: {
        startDate: "",
        endDate: "",
      },
      isValid: true,
    };
  },

  methods: {
    dateFilter(fromDate, toDate) {
      var pointsArr = filter.filterByDate(fromDate, toDate);
      this.$emit("pointsArr", pointsArr);
    },
  },
  watch: {
    date: {
      handler: function (newValue) {
        if (
          newValue.startDate != "" &&
          newValue.endDate != "" &&
          newValue.endDate > newValue.startDate
        )
          this.isValid = false;
        else this.isValid = true;
      },
      deep: true,
    },
  },
};
</script>
