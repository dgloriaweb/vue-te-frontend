<template>
  <div>
    <h1>All Skills</h1>
    <div id="skillWrapper">
      <!-- {{skillStore.skills}} -->
      <div v-for="skill in skillStore.skills" :key="skill.id">
        <div v-if="st != skill.skill_type">
          <h1>{{ skill.skill_type }}</h1>
          <div :set="(st = skill.skill_type)"></div>
        </div>
        
        <div v-if="cs != skill.core_skill">
          <div v-if="skill.core_skill" id="coreSkill">
            <h3>{{ skill.core_skill }}</h3>
          </div>
          <div v-else>
            <h3>Miscellaneous</h3>
          </div>
          <div :set="(cs = skill.core_skill)"></div>
        </div>
        <div>
          <div class="myBtn">{{ skill.skill }}</div>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script setup>
import { useSkillStore } from '../store/skillstore'
const skillStore = useSkillStore()
let st = null
let cs = null

</script>

<style lang="css" scoped>
#myGridContainer {
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  border: 1px solid gray;
}
@media (min-width: 600px) {
  #myGridContainer {
    width: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
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
.myBtn {
  padding: 5px 10px;
  border: 1px solid gray;
  background-color: lightgray;
  border-radius: 12px;
}

</style>