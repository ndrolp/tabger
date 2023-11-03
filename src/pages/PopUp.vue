<script lang="ts" setup>
import HeaderVar from "../components/HeaderVar.vue";
import TabsViewer from "../components/TabsViewer.vue";
import WorkSpaces from "../components/WorkSpaces.vue";
import { cilBriefcase, cilBookmark } from "@coreui/icons";
import { ActiveWindow } from "../types/enums";
import { ref } from "vue";

const tab = ref(ActiveWindow.TABS);

function cogClicked() {
  if (tab.value === ActiveWindow.TABS) tab.value = ActiveWindow.WORKSPACES;
  else tab.value = ActiveWindow.TABS;
}
</script>

<template>
  <div class="content">
    <HeaderVar
      :key="tab"
      :icon="tab === ActiveWindow.TABS ? cilBriefcase : cilBookmark"
      @icon-click="cogClicked"
      :text="tab"
    />
    <TabsViewer v-if="tab === ActiveWindow.TABS" />
    <WorkSpaces v-else />
  </div>
</template>

<style>
html,
body {
  width: 400px;
  height: 500px;
  background: blue;
  padding: 0;
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;

  background: #34383b;
}
.content {
  background: #34383b;
  height: 100%;
  width: 100%;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
