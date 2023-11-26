<template>
    <div>
{{ route.params.id }}
    </div>
</template>

<script setup>
import { useSkillStore } from '../store/skillstore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const skillStore = useSkillStore()
const route = useRoute()

onMounted(() => {
  skillStore.setSkill(route.params.id)
})

</script>
