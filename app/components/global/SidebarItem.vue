<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import type { SidebarItem } from "~/config/sidebar";

const props = defineProps<{
  item: SidebarItem;
  isCollapsed?: boolean;
}>();

const route = useRoute();
const isOpen = ref(false);

const isActive = computed(() => {
  if (!props.item.to) return false;
  return route.path === props.item.to || route.path.startsWith(`${props.item.to}/`);
});

const hasChildren = computed(() => !!props.item.children?.length);

// Auto expand when a child is active
watch(
  () => route.path,
  () => {
    if (!hasChildren.value) return;

    isOpen.value = props.item.children!.some(
      (child) => child.to && route.path.startsWith(child.to)
    );
  },
  { immediate: true }
);

function toggle() {
  if (hasChildren.value) {
    isOpen.value = !isOpen.value;
  }
}
</script>

<template>
  <li>
    <NuxtLink
      v-if="item.to"
      :to="item.to"
      class="sidebar-item"
      :class="{
        'dark:bg-slate-800 bg-blue-50': isActive,
        'justify-center': props.isCollapsed,
        'justify-between': !props.isCollapsed,
      }"
    >
      <div class="navigator">
        <UiIcon
          v-if="item.icon"
          :name="item.icon"
          :class="{ 'text-brand-secondary': isActive }"
          :size="20"
        />
        <span
          v-if="!props.isCollapsed"
          class="truncate"
          :class="{ 'font-bold': isActive }"
          >{{ item.label }}</span
        >
      </div>
    </NuxtLink>

    <div
      v-else
      class="sidebar-item"
      :class="props.isCollapsed ? 'justify-center' : 'justify-between'"
      tabindex="0"
      @click="toggle()"
    >
      <div class="navigator">
        <UiIcon
          v-if="item.icon"
          :name="item.icon"
          :class="{ 'text-brand-secondary': isActive }"
          :size="20"
        />
        <span
          v-if="!props.isCollapsed"
          class="truncate"
          :class="{ 'text-soft-white': isActive }"
          >{{ item.label }}</span
        >
      </div>

      <UiIcon
        v-if="hasChildren && !props.isCollapsed"
        :name="isOpen ? 'ic:round-keyboard-arrow-down' : 'ic:round-keyboard-arrow-right'"
        :size="20"
      />
    </div>

    <!-- children -->
    <Transition name="dropdown">
      <ul v-if="hasChildren && isOpen" class="sidebar-child">
        <SidebarItem
          v-for="child in item.children"
          :key="child.label"
          :item="child"
          :is-collapsed="props.isCollapsed"
        />
      </ul>
    </Transition>
  </li>
</template>
