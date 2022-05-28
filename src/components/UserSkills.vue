<template>
  <div>
    <h1>User Skills</h1>
   
  </div>
</template>

<script setup>
import {onMounted}from 'vue'
// import { useSkillStore } from '../store/skillstore'

// const skillStore = useSkillStore()

import personService from '@/services/person.service'
function setSkill() {
  personService.getPersonSkills().then((response) => {
    console.log(response.data);
  })
}
onMounted(()=>
{
  setSkill()
})

</script>

<style lang="scss" scoped>
</style>