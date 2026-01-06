<script setup lang="ts">
import { sidebarMenu } from "~/config/sidebar";
</script>

<template>
  <aside>
    <!-- <div class="p-3">
      <img src="/images/logo/pgi-logo.webp" class="w-33" alt="Pusat Gadai Indonesia" />
    </div> -->

    <nav>
      <ul class="space-y-1">
        <SidebarItem v-for="item in sidebarMenu" :key="item.label" :item="item" />
      </ul>
    </nav>

    <div class="version-info">
      <span>v{{ useRuntimeConfig().public.version }}</span>
    </div>
  </aside>
</template>
