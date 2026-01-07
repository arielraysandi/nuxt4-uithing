<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const routeName = computed(() => {
  const currentPageName = route.name!.toString();

  if (currentPageName.toLowerCase() === "index") return "Dashboard";
  return currentPageName;
});
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar />

    <div class="flex flex-1 flex-col overflow-hidden">
      <Header :page-title="routeName" />

      <main id="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>
