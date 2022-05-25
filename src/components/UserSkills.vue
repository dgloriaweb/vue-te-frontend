<template>
  <div>
    <h1>User Skills</h1>
    <div v-for="skill in skillStore.skills" :key="skill.id" id="myGridRow">
      {{ skill }}
    </div>
  </div>
</template>

<script setup>
import { useSkillStore } from '../store/skillstore'

function getSkills(){
  return ["one","two","three"]
}




</script>

<style lang="scss" scoped>
</style>