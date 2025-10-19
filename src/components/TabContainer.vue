<script setup>
import { useSlots, ref, provide } from 'vue'

const slots = useSlots()
const tabTitles = ref(slots.default().map((tab) => tab.props.title))
const selectedTab = ref(tabTitles.value[0])

const tabs = ref([])
const addTab = (tab) => tabs.value.push(tab)

provide('tabContainer', { addTab, selectedTab })
</script>
<template>
  <div>
    <ul>
      <li v-for="tab in tabs" :key="tab.title" @click="selectedTab = tab.title">
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>
