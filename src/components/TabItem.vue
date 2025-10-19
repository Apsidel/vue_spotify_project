<script setup>
import { inject } from 'vue'
const tab = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const { addTab, selectedTab } = inject('tabContainer')
addTab(tab)
</script>
<template>
  <div v-show="tab.title === selectedTab">
    <slot></slot>
  </div>
</template>
