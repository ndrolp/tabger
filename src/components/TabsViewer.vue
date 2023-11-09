<script lang="ts" setup>
import { computed, ComputedRef, onMounted, Ref, ref } from 'vue'
import browser from 'webextension-polyfill'
const tabs: Ref<browser.Tabs.Tab[]> = ref([])
const searchText: Ref<string> = ref('')

function focusTab(tab: browser.Tabs.Tab) {
    browser.tabs.highlight({ tabs: tab.index })
    console.log(tab)
}

const searchResult = computed(() => {
    return tabs.value.filter(
        tab => tab.title?.toLowerCase().includes(searchText.value.toLowerCase()),
    )
})

const maxItems: ComputedRef<number> = computed(() => {
    if (searchResult.value.length > 9) return 9
    return searchResult.value.length
})

onMounted(() => browser.tabs.query({}).then(instances => (tabs.value = instances)))
</script>

<template>
    <div class="tabs-holder">
        <div class="tabs">
            <button
                @click="() => focusTab(searchResult[index - 1])"
                :key="index"
                v-for="index in maxItems"
            >
                <img :src="searchResult[index - 1].favIconUrl" alt="" />
                <span>{{ searchResult[index - 1].title || 'untitled' }}</span>
            </button>
        </div>
        <div class="search">
            <input autofocus v-model="searchText" placeholder="Search tabs" type="text" />
        </div>
    </div>
</template>

<style scoped>
.tabs-holder {
    width: 100%;
    height: 100%;
    padding: 8px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.tabs-holder .tabs {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: 100%;
    padding: 0px;
}

.tabs-holder .tabs button {
    border: none;
    margin-bottom: 5px;
    background: #242729;
    color: white;
    padding: 10px;
    width: 100%;
    display: flex;
    place-items: center;
    gap: 10px;
    cursor: pointer;
    text-align: left;
    border-radius: 5px;
}

.tabs-holder .tabs button img {
    width: 10px;
}

.tabs-holder .tabs button span {
    max-width: 45ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.tabs-holder .search {
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #495059;
}

.tabs-holder .search input {
    box-sizing: border-box;
    border: none;
    padding: 8px 5px;
    width: 100%;
    outline: none;
    background: #34383b;
    color: #c3d1e3;
}
</style>
