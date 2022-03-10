<template>
  <div class="w-full h-screen flex flex-col bg-gray-800 text-white">
    <div class="flex flex-shrink flex-row p-1">
      <button class="p-1 bg-primary-800 text-primary-50 rounded">Ejecutar</button>
    </div>
    <div class="flex flex-grow flex-row">
      <div class="w-1/2 flex">
        <AppEditor></AppEditor>
      </div>
      <div class="w-1/2 flex">
        <AppTerminal></AppTerminal>
      </div>
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
