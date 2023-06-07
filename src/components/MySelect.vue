<template>
    <div class="select">
      <label>{{ label }}</label>
      <select :value="selectedValue" @change="handleChange($event.target.value)">
        <option v-for="option in options" :value="option.value" :key="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        selectedValue: this.value
      };
    },
    methods: {
      handleChange(value) {
        this.selectedValue = value;
        this.$emit('input', value);
      }
    }
  };
  </script>
  
  <style scoped>
  .select {
    display: flex;
    flex-direction: column;
    border:  1px solid gray;
    border-radius: 8px;
    padding: 5px;
    justify-content: space-between;
  }

  </style>
  