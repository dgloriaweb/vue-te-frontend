<template>
    <div>

    </div>
</template>

<script setup>
import { useSkillStore } from '../store/skillstore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const skillStore = useSkillStore()
const route = useRouter()

onMounted(() => {
  skillStore.setSkill(route.params.id)
})

</script>
