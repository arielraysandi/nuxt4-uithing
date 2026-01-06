<script setup lang="ts">
import { useDialog } from "~/composables/useDialog";

const _controller = useDialog();
</script>

<template>
  <UiAlertDialog v-model:open="_controller.isShown">
    <UiAlertDialogContent>
      <div class="dialog-content-icon-wrapper">
        <div class="dialog-content-icon-container" aria-hidden="true">
          <Icon name="lucide:circle-alert" class="icon" />
        </div>

        <UiAlertDialogHeader>
          <UiAlertDialogTitle>{{ _controller.title }}</UiAlertDialogTitle>
          <UiAlertDialogDescription>{{ _controller.content }}</UiAlertDialogDescription>
        </UiAlertDialogHeader>
      </div>

      <UiAlertDialogFooter>
        <UiAlertDialogCancel @click="_controller.callback.onTapBack">
          {{ _controller.backText }}
        </UiAlertDialogCancel>
        <UiAlertDialogAction @click="_controller.callback.onTapConfirm">
          {{ _controller.confirmText }}
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
