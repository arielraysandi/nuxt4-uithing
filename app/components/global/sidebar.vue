<script setup lang="ts">
import { sidebarMenu } from "~/config/sidebar";

const collapsed = ref(false);
</script>

<template>
  <UiCard class="sidebar" :class="collapsed ? 'w-0 lg:w-16' : 'w-0 lg:w-56 2xl:w-64'">
    <div class="sidebar-head" :class="collapsed ? 'justify-center' : 'justify-between'">
      <img
        v-if="!collapsed"
        src="/images/logo/pgi-logo.webp"
        class="hidden lg:block w-32"
        alt="Pusat Gadai Indonesia"
      />
      <UiButton variant="ghost" size="icon" @click="collapsed = !collapsed">
        <Icon name="lucide:menu" />
      </UiButton>
    </div>

    <UiScrollArea class="flex-1 overflow-auto">
      <ul class="space-y-1">
        <SidebarItem
          v-for="item in sidebarMenu"
          :key="item.label"
          :item="item"
          :is-collapsed="collapsed"
        />
      </ul>
    </UiScrollArea>
  </UiCard>
</template>
