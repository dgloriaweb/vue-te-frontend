<template>
  <div id="container">
    <div id="left-side">
      <h1>All Skills</h1>
      <div id="skillWrapper">
        <!-- {{skillStore.skills}} -->
        <div
          v-for="skill in skillStore.skills"
          :key="skill.id"
          id="skillLoop"
          style="display: inline-grid"
        >
          <div>
            <div class="myBtn">{{ skill.skill }} <i class="fa fa-plus-circle"></i></div>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <div id="right-side">
      <h1>Your Skills</h1>
      <div id="skillWrapper">
        <div
          v-for="userSkill in skillStore.userSkills"
          :key="userSkill.id"
          id="skillLoop"
          style="display: inline-grid"
        >
          <div>
            <div class="myBtn">{{ userSkill.skill }} <i class="fa fa-minus-circle"></i></div>
          </div>
        </div>
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
#container{
  display:grid;
  grid-template-columns: 1fr 1fr;
}
#left-side,
#right-side{
  width:50%;

}
</style>