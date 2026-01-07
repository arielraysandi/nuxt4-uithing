<script setup lang="ts">
import { ref, computed } from "vue";
import { sidebarMenu } from "~/config/sidebar";

const isPinnedCollapsed = ref(false);
const isHovering = ref(false);

const isCollapsed = computed(() => isPinnedCollapsed.value && !isHovering.value);

function togglePinned() {
  isPinnedCollapsed.value = !isPinnedCollapsed.value;
}
</script>

<template>
  <UiCard class="sidebar" :class="isCollapsed ? 'collapsed' : 'expanded'">
    <div class="sidebar-head" :class="isCollapsed ? 'justify-center' : 'justify-between'">
      <img
        v-if="!isCollapsed"
        src="/images/logo/pgi-logo.webp"
        class="hidden lg:block w-32"
        alt="Pusat Gadai Indonesia"
      />

      <UiButton variant="ghost" size="icon" @click="togglePinned()">
        <Icon name="lucide:menu" />
      </UiButton>
    </div>

    <!-- Menu -->
    <UiScrollArea
      class="flex-1 overflow-auto"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <ul class="space-y-1">
        <SidebarItem
          v-for="item in sidebarMenu"
          :key="item.label"
          :item="item"
          :is-collapsed="isCollapsed"
        />
      </ul>
    </UiScrollArea>

    <UiCardFooter class="max-lg:hidden justify-center">
      <p class="text-foreground text-xs">v{{ useRuntimeConfig().public.version }}</p>
    </UiCardFooter>
  </UiCard>
</template>
