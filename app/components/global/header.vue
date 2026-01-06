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
  <header>
    <div class="flex items-center">
      <div class="logo-holder">
        <img src="/images/logo/pgi-logo.webp" alt="Pusat Gadai Indonesia" />
      </div>

      <div class="page-heading">
        <h1>{{ props.pageTitle }}</h1>

        <div class="flex gap-4 lg:gap-2">
          <div
            v-if="!colorMode.unknown"
            class="group darkmode-switch"
            :data-state="isDarkMode ? 'checked' : 'unchecked'"
          >
            <span
              id="darkmode-on"
              class="icon group-data-[state=checked]:text-muted-foreground/70"
              @click="isDarkMode = true"
            >
              <Icon name="lucide:sun" :size="16" />
            </span>

            <UiSwitch id="darkmode" v-model="isDarkMode" />

            <span
              id="darkmode-off"
              class="icon group-data-[state=unchecked]:text-muted-foreground/70"
              @click="isDarkMode = false"
            >
              <Icon name="lucide:moon" :size="16" />
            </span>
          </div>

          <div class="hidden lg:block px-3">
            <UiPopover>
              <UiPopoverTrigger as-child>
                <div class="header-userdata">
                  <div class="icon-outer">
                    <UiIcon name="ic:baseline-person-outline" class="icon" />
                  </div>

                  <div class="leading-0">
                    <p class="username">{{ _userData.user?.name }}</p>
                    <em class="role">{{ _userData.role?.name }}</em>
                  </div>

                  <UiIcon
                    name="ic:round-keyboard-arrow-down"
                    class="text-gray-500 text-lg"
                  />
                </div>
              </UiPopoverTrigger>

              <UiPopoverContent>
                <div class="user-config-dropdown">
                  <button type="button">
                    <div class="flex items-center gap-3">
                      <UiIcon name="ic:outline-person" class="icon" />
                      <p>Ubah Password</p>
                    </div>
                  </button>

                  <UiSeparator class="my-1" />

                  <button type="button" class="logout" @click="confirmLogout()">
                    <div class="flex items-center gap-3">
                      <UiIcon name="ic:outline-logout" class="icon" />
                      <p>Log Out</p>
                    </div>
                  </button>
                </div>
              </UiPopoverContent>
            </UiPopover>
          </div>

          <div class="block xl:hidden">
            <UiSheet>
              <UiSheetTrigger as-child>
                <UiButton size="icon-xs" variant="outline">
                  <UiIcon
                    name="ic:round-menu"
                    class="text-gray-500 dark:text-foreground"
                  />
                </UiButton>
              </UiSheetTrigger>

              <UiSheetContent class="bg-slate-900 sm:max-w-none md:w-112.5" side="left">
                <template #header>
                  <div class="p-2 flex justify-between items-center">
                    <UiDropdownMenu>
                      <UiDropdownMenuTrigger as-child>
                        <div class="header-userdata">
                          <div class="icon-outer">
                            <UiIcon name="ic:baseline-person-outline" class="icon" />
                          </div>

                          <div class="leading-0">
                            <p class="text-soft-white text-sm">
                              {{ _userData.user?.name }}
                            </p>
                            <em class="role">{{ _userData.role?.name }}</em>
                          </div>

                          <UiIcon
                            name="ic:round-keyboard-arrow-down"
                            class="text-gray-500 text-lg"
                          />
                        </div>
                      </UiDropdownMenuTrigger>

                      <UiDropdownMenuContent class="w-56">
                        <UiDropdownMenuLabel :label="_userData.user?.name" />

                        <UiDropdownMenuSeparator />
                        <UiDropdownMenuItem
                          title="Ubah Password"
                          icon="ic:outline-person"
                        />

                        <UiDropdownMenuSeparator />
                        <UiDropdownMenuItem
                          title="Log Out"
                          icon="ic:outline-logout"
                          @click="confirmLogout()"
                        />
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
    </div>
  </header>
</template>
