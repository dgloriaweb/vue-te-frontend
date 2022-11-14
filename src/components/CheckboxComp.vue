<template>
    <input
        class="form-check-input"
        v-bind="$attrs"
        :name="name"
        type="checkbox"
        :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)"
        />
    <label :for="id">{{ label }}</label>
  <br>
</template>
<script setup>

import { defineProps } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  value: Boolean,
  caseValue: String,
  id: String,
  label: String,
  modelValue: Boolean,
  name: String,
})
</script>
