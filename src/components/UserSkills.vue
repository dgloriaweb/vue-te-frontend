<template>
  <div>
    <h1>User Skills</h1>
    <div v-for="skill in skills" :key="skill.id">
      {{skill.skill}}
  </div>
  </div>
</template>

<script setup>
import personService from '@/services/person.service';

const skills = personService.getPersonSkills()

</script>

<style lang="scss" scoped>
</style>