<script setup lang="ts">
import { computed } from "vue";
import { sidebarMenu } from "~/config/sidebar";

import { useDialog } from "~/composables/useDialog";
import { useUserData, useAuthStore } from "~/stores/auth";

const props = defineProps<{
  pageTitle: string;
}>();

const _dialog = useDialog();
const _userData = useUserData();
const _auth = useAuthStore();
const colorMode = useColorMode();

const isDarkMode = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark: boolean) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});

function confirmLogout() {
  _dialog.show({
    title: "Are you sure?",
    content: "Are you sure you want to log out of your account?",
    confirmText: "Confirm",
    backText: "Cancel",
    callback: {
      onTapBack: () => {
        _dialog.hideDialog();
      },
      onTapConfirm: () => {
        _auth.logout();
      },
    },
  });
}
</script>

<template>
  <UiCard class="header-bar">
    <div class="header-content">
      <h1 class="2xl:text-lg font-semibold">{{ props.pageTitle }}</h1>

      <div class="flex items-center gap-1 lg:gap-3">
        <UiButton
          variant="ghost"
          size="icon"
          @click="colorMode.preference = isDarkMode ? 'light' : 'dark'"
        >
          <Icon
            :name="isDarkMode ? 'lucide:moon' : 'lucide:sun'"
            :class="isDarkMode ? 'text-yellow-500' : 'text-blue-600'"
          />
        </UiButton>

        <div class="hidden lg:block">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline">
                <Icon name="lucide:user" class="mr-2" />
                {{ _userData.user?.name }}
              </UiButton>
            </UiDropdownMenuTrigger>

            <UiDropdownMenuContent align="end">
              <UiDropdownMenuItem>
                <Icon name="lucide:key" class="mr-2" />
                Change Password
              </UiDropdownMenuItem>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem class="text-destructive" @click="confirmLogout()">
                <Icon name="lucide:log-out" class="mr-2 text-destructive" />
                Logout
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>

        <div class="block xl:hidden">
          <UiSheet>
            <UiSheetTrigger as-child>
              <UiButton size="icon-xs" variant="outline">
                <UiIcon name="ic:round-menu" class="text-gray-500 dark:text-foreground" />
              </UiButton>
            </UiSheetTrigger>

            <UiSheetContent class="bg-background sm:max-w-none md:w-112.5" side="left">
              <template #header>
                <div class="p-2 flex justify-between items-center">
                  <UiDropdownMenu>
                    <UiDropdownMenuTrigger as-child>
                      <UiButton variant="outline">
                        <Icon name="lucide:user" class="mr-2" />
                        {{ _userData.user?.name }}
                      </UiButton>
                    </UiDropdownMenuTrigger>

                    <UiDropdownMenuContent align="end">
                      <UiDropdownMenuItem>
                        <Icon name="lucide:key" class="mr-2" />
                        Change Password
                      </UiDropdownMenuItem>
                      <UiDropdownMenuSeparator />
                      <UiDropdownMenuItem
                        class="text-destructive"
                        @click="confirmLogout()"
                      >
                        <Icon name="lucide:log-out" class="mr-2 text-destructive" />
                        Logout
                      </UiDropdownMenuItem>
                    </UiDropdownMenuContent>
                  </UiDropdownMenu>

                  <UiSheetClose as-child>
                    <UiButton size="icon-sm" variant="link">
                      <UiIcon
                        name="ic:round-close"
                        class="text-gray-500 dark:text-foreground"
                      />
                    </UiButton>
                  </UiSheetClose>
                </div>
              </template>

              <template #content>
                <nav class="overflow-y-auto">
                  <ul class="lg:space-y-1">
                    <SidebarItem
                      v-for="item in sidebarMenu"
                      :key="item.label"
                      :item="item"
                    />
                  </ul>
                </nav>
              </template>

              <template #footer>
                <UiSheetFooter>
                  <div class="version-info">
                    <span>v{{ useRuntimeConfig().public.version }}</span>
                  </div>
                </UiSheetFooter>
              </template>
            </UiSheetContent>
          </UiSheet>
        </div>
      </div>
    </div>
  </UiCard>
</template>
