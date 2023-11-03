console.log("ELELEMETN");
import { createApp } from "vue";
import TabberOverlay from "../overlays/TabberOverlay.vue";

const element = document.querySelector("body");
console.log({ element });
const anchor = document.createElement("div");
anchor.id = "tabber-div";
console.log({ anchor });

element?.insertBefore(anchor, element.firstChild);

createApp(TabberOverlay).mount("#tabber-div");

export {};
