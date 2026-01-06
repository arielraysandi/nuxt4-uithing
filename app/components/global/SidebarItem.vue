<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import type { SidebarItem } from "~/config/sidebar";

const props = defineProps<{
  item: SidebarItem;
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
      :class="{ 'bg-slate-800': isActive }"
    >
      <div class="navigator">
        <UiIcon
          v-if="item.icon"
          :name="item.icon"
          class="icon"
          :class="{ 'text-brand-secondary': isActive }"
        />
        <span class="truncate" :class="{ 'text-soft-white': isActive }">{{
          item.label
        }}</span>
      </div>
    </NuxtLink>

    <div v-else class="sidebar-item" tabindex="0" @click="toggle()">
      <div class="navigator">
        <UiIcon
          v-if="item.icon"
          :name="item.icon"
          class="icon"
          :class="{ 'text-brand-secondary': isActive }"
        />
        <span class="truncate" :class="{ 'text-soft-white': isActive }">{{
          item.label
        }}</span>
      </div>

      <UiIcon
        v-if="hasChildren"
        :name="isOpen ? 'ic:round-keyboard-arrow-down' : 'ic:round-keyboard-arrow-right'"
        class="arrow-icon"
      />
    </div>

    <!-- children -->
    <Transition name="dropdown">
      <ul v-if="hasChildren && isOpen" class="sidebar-child">
        <SidebarItem v-for="child in item.children" :key="child.label" :item="child" />
      </ul>
    </Transition>
  </li>
</template>
