<template>
  <div class="w-full h-screen flex flex-col bg-gray-800 text-white overflow-hidden">
    <div class="flex flex-shrink flex-row p-1">
      <button class="p-1 bg-primary-800 text-primary-50 rounded">Ejecutar</button>
    </div>
    <vue-split-view class="flex flex-grow flex-row" style="height: 80vh;">
      <template #A>
        <AppEditor></AppEditor>
      </template>
      <template #B>
        <AppTerminal></AppTerminal>
      </template>
    </vue-split-view>
  </div>
</template>

<script>
import AppEditor from "@/pages/EditorPage/AppEditor";
import AppTerminal from "@/pages/EditorPage/AppTerminal";
import VueSplitView from 'vue-split-view/dist/vue2'
import 'vue-split-view/dist/style.css';

export default {
  name: "EditorPage",
  components: {AppTerminal, AppEditor, VueSplitView},
}
</script>

<style scoped>

</style>
