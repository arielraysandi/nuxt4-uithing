<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "blank",
});

useHead({
  title: "Login",
});

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
</script>

<template>
  <main id="login-page">
    <div class="section-form-wrapper">
      <UiCard class="w-full max-w-lg">
        <template #header>
          <UiCardHeader>
            <img
              src="/images/logo/pgi-logo.webp"
              class="w-40 mx-auto"
              alt="Pusat Gadai Indonesia"
            />

            <div class="mt-10 text-center">
              <h1>Login</h1>
              <h2>Masuk ke dashboard Anda</h2>
            </div>
          </UiCardHeader>
        </template>

        <template #content>
          <UiCardContent>
            <form class="space-y-4">
              <UiInput
                v-model="_auth.formLogin.username"
                label="username"
                type="text"
                placeholder="Username"
                :autofocus="true"
                required
              />
              <UiInput
                v-model="_auth.formLogin.password"
                label="Password"
                type="password"
                placeholder="Password"
                required
              />

              <UiButton
                type="submit"
                variant="default"
                class="w-full"
                :loading="_auth.isLoading"
                size="lg"
                effect="ringHover"
                @click="_auth.login()"
              >
                {{ _auth.isLoading ? "Logging In..." : "Login" }}
              </UiButton>
            </form>
          </UiCardContent>
        </template>

        <template #footer>
          <div class="mt-4 text-center">
            <p class="text-gray-500 text-sm">&copy; 2026 Pusat Gadai Indonesia.</p>
          </div>

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
        </template>
      </UiCard>
    </div>

    <div class="section-welcome-wrapper">
      <div class="text-center">
        <h3>Selamat Datang</h3>
        <p class="text-soft-white text-sm opacity-80">
          Powered by <strong>Pusat Gadai Indonesia</strong>
        </p>
      </div>
    </div>
  </main>
</template>
