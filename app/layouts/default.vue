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
  <div id="dashboard-page">
    <Sidebar />

    <main class="main-content">
      <Header :page-title="routeName" />
      <slot />
    </main>
  </div>
</template>
