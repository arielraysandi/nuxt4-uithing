<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - UI Thing Dashboard` : "UI Thing Dashboard";
  },
});
</script>

<template>
  <NuxtLoadingIndicator />

  <UiSonner />
  <Dialog />
  <Loading />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
