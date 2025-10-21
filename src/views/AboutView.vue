<script setup lang="ts">
import TabContainer from '@/components/TabContainer.vue'
import TabItem from '@/components/TabItem.vue'
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <TabContainer>
      <TabItem title="Tab 1">From Tab 1</TabItem>
      <TabItem title="Tab 2">From Tab 2</TabItem>
    </TabContainer>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
