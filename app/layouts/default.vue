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
  <div class="flex min-h-screen">
    <Sidebar />

    <div class="flex flex-1 flex-col">
      <Header :page-title="routeName" />

      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
