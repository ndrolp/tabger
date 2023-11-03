<script setup lang="ts">
import { computed, ComputedRef, onMounted, ref, Ref } from "vue";
import browser from "webextension-polyfill";

const showSearch = ref(false);
const textSearch: Ref<HTMLInputElement | null> = ref(null);
const tabs: Ref<browser.Tabs.Tab[]> = ref([]);
const searchText = ref("");

const maxItems: ComputedRef<number> = computed(() => {
  if (searchResult.value.length > 9) return 9;
  return searchResult.value.length;
});

const searchResult = computed(() => {
  return tabs.value.filter(
    (tab) => tab.title?.toLowerCase().includes(searchText.value.toLowerCase()),
  );
});

function focusTab(tab: browser.Tabs.Tab) {
  showSearch.value = false;
  browser.runtime.sendMessage({ query: "focus", tab: tab.index }).then(() => {
    return;
  });
}

onMounted(async () => {});

window.addEventListener("keydown", async (event) => {
  if (event.key === "F" && event.ctrlKey && event.shiftKey) {
    showSearch.value = !showSearch.value;
    searchText.value = "";
    browser.runtime
      .sendMessage({ query: "hello" })
      .then((value) => (tabs.value = value));
  }
  if (event.key === "Escape" && showSearch.value) showSearch.value = false;

  if (textSearch?.value && showSearch.value) textSearch.value.focus();
});
</script>

<template>
  <div class="tabger" v-if="showSearch">
    <div class="container">
      <input
        v-model="searchText"
        placeholder="Search Tabs"
        autofocus
        ref="textSearch"
        type="text"
      />
    </div>

    <div class="tabs">
      <button
        :key="index"
        v-for="index in maxItems"
        @click="() => focusTab(searchResult[index - 1])"
      >
        <img :src="searchResult[index - 1].favIconUrl" alt="" />
        <span>{{ searchResult[index - 1].title || "untitled" }}</span>
      </button>
    </div>
  </div>
</template>

<style>
.tabger {
  position: fixed;
  top: 0;
  height: 100%;
  left: 0;
  padding: 10px;
  width: 100%;
  z-index: 99999999;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  transition: 0.3s;
  box-sizing: border-box;
}
.tabger .container {
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  background: #2b2b2b;
}

.tabger .container input {
  transition: 0.3s;
  background: #2b2b2b;
  box-sizing: border-box;
  color: white;
  border: 1px solid transparent;
  width: 100%;
  padding: 5px;
  outline: none;
}

.tabger .tabs {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  width: 100%;
  gap: 5px;
  padding-top: 10px;
}

.tabger .tabs button {
  font-size: 0.7rem;
  border: none;
  margin-bottom: 5px;
  background: #242729;
  color: white;
  padding: 10px;
  display: flex;
  place-items: center;
  gap: 10px;
  cursor: pointer;
  text-align: left;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
}

.tabger .tabs button img {
  width: 10px;
}

.tabger .tabs button span {
  max-width: 45ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
