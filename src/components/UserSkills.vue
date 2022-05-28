<template>
  <div>
    <h1>User Skills</h1>
    <div v-for="skill in skills" :key="skill.id" id="myGridRow">
      {{ skill.skill }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import { useSkillStore } from '../store/skillstore'

// const skillStore = useSkillStore()

let skills = ref(null)
import personService from '@/services/person.service'
function setSkill() {
  personService.getPersonSkills().then((response) => {
    console.log(response.data);
    skills.value = response.data
  })
}
onMounted(() => {
  setSkill()
})

</script>

<style lang="scss" scoped>
</style>