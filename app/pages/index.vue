<script setup lang="ts">
import { useUserData } from "~/stores/auth";

const _userData = useUserData();
</script>

<template>
  <div class="container">
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Welcome, {{ _userData.user?.name }}</UiCardTitle>
      </UiCardHeader>

      <UiCardContent></UiCardContent>
    </UiCard>
  </div>
</template>
