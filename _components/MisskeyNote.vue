<template>
  <div ref="container">
    <iframe
      :src="props.src"
      :data-misskey-embed-id="props.id"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      style="
        border: none;
        width: 100%;
        max-width: 500px;
        height: 300px;
        color-scheme: light dark;
        margin: auto;
      "
    />
  </div>
</template>
<script setup>
import { onMounted, useTemplateRef } from "vue";

const el = useTemplateRef("container");

const props = defineProps({
  src: String,
  id: String,
});

onMounted(() => {
  const scriptTag = document.createElement("script");
  scriptTag.setAttribute("src", "https://nya.one/embed.js");
  scriptTag.setAttribute("defer", true);
  el.value.appendChild(scriptTag);
});
</script>
