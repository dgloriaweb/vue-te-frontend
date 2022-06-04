<template>
  <div>
    <h1>User Skills</h1>
    <div id="myGridContainer" v-if="skillStore.userSkills">
      <h2>Your current skill list</h2>
      <div v-for="userSkill in skillStore.userSkills" :key="userSkill.id" id="myGridRow">
        {{ userSkill.skill }}
      </div>
    </div>
    <div id="myGridContainer" v-if="skillStore.skills">
      <h2>Skills list</h2>
      <div v-for="skill in skillStore.skills" :key="skill.id" id="myGridRow">
        {{ skill.skill }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSkillStore } from '../store/skillstore'
const skillStore = useSkillStore()


</script>

<style lang="css" scoped>
#myGridContainer {
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  gap: 35px;
  border:1px solid gray;
}
@media (min-width: 600px) {
  #myGridContainer {
    width: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 35px;
  }
}
#myGridColumn {
  padding: 1vw;
  min-width: 200px;
}
#myGridRow {
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 10px;
}

.grid-cell-1 {
  width: max-content;
}
.grid-cell-2 {
  text-align: right;
}
.grid-cell-2:after {
  content: "%";
}
</style>