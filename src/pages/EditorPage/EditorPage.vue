<template>
  <div class="w-full h-screen flex flex-row bg-gray-100">
    <div class="w-1/2 flex">
      <AppEditor></AppEditor>
    </div>
    <div class="w-1/2 flex">
      <AppTerminal></AppTerminal>
    </div>
  </div>
</template>

<script>
import AppEditor from "@/pages/EditorPage/AppEditor";
import AppTerminal from "@/pages/EditorPage/AppTerminal";
export default {
  name: "EditorPage",
  components: {AppTerminal, AppEditor},
}
</script>

<style scoped>

</style>
