<template>
    <div id="container" class="wrapper">
        <h2>Edit Skills</h2>
        <h3>Click on the skill you want to edit</h3>
        <div id="skillWrapper">
            <div v-for="(value, key) in skillStore.skills" :key="key">
                <div>
                    <b>{{ key }}</b>
                </div>
                <div v-for="skill in value" :key="skill.id" id="skillLoop" style="display: inline-grid">
                    <div class="myBtn" @click="editSkill(key, skill)">
                        {{ skill.skill }} <i class="fa fa-plus-circle"></i>
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

