<script lang="ts" setup>
import { CIcon } from "@coreui/icons-vue";
import { cilCog } from "@coreui/icons";

export interface Props {
  text?: string;
  icon?: string | string[];
}

withDefaults(defineProps<Props>(), {
  icon: () => cilCog,
});

const emit = defineEmits<{
  iconClick: [];
}>();
</script>

<template>
  <div class="header-bar">
    <h1>{{ text }}</h1>
    <div @click="() => emit('iconClick')" class="icon-button">
      <CIcon :icon="icon" />
    </div>
  </div>
</template>

<style scoped>
.header-bar {
  transition: 0.3s;
  padding: 4px 10px;
  background: #242729;
  display: flex;
  color: white;
  font-size: 1.3em;
  place-items: center;
  justify-content: space-between;
  color: #c3d1e3;
}

.header-bar h1 {
  font-size: 1rem;
  padding: 4px;
}

.header-bar .icon-button {
  transition: 0.3s;
  padding: 9px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  color: #c3d1e3;
  width: 20px;
  display: flex;
  place-items: center;
}

.header-bar .icon-button:hover {
  background: #34383b;
}
</style>
