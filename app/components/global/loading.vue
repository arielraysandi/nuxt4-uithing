<script setup lang="ts">
import { useLoading } from "~/composables/useLoading";

const _controller = useLoading();
</script>

<template>
  <div class="loader-container">
    <UiLoader v-model="_controller.isLoading" class="size-14" lock-scroll full-page>
      <div class="loader-text">
        <p>Loading...</p>
      </div>
    </UiLoader>
  </div>
</template>
