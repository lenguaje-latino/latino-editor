<template>
  <div class="w-full h-screen flex flex-col bg-gray-800 text-white overflow-hidden">
    <AppBar></AppBar>

    <vue-split-view class="flex flex-grow flex-row">
      <template #A>
        <LatEditor></LatEditor>
      </template>
      <template #B>
        <LatTerminal></LatTerminal>
      </template>
    </vue-split-view>
  </div>
</template>

<script>
import LatEditor from '@/components/LatEditor';
import LatTerminal from '@/components/LatTerminal';
import VueSplitView from 'vue-split-view/dist/vue2';
import 'vue-split-view/dist/style.css';
import AppBar from '@/components/AppBar';

export default {
  name: 'EditorPage',
  components: { AppBar, LatTerminal, LatEditor, VueSplitView },
};
</script>

<style scoped></style>
