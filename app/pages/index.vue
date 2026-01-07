<script setup lang="ts">
import dayjs from "dayjs";
import { useUserData } from "~/stores/auth";

// const _userData = useUserData();
const date = ref();

const users = [
  {
    name: "Nadine Wijaya",
    title: "Product Manager",
    email: "nadine.wijaya@example.com",
    role: "manager",
  },
  {
    name: "Kevin Pratama",
    title: "Backend Engineer",
    email: "kevin.pratama@example.com",
    role: "developer",
  },
  {
    name: "Sarah Liem",
    title: "UI/UX Designer",
    email: "sarah.liem@example.com",
    role: "designer",
  },
  {
    name: "Michael Santoso",
    title: "DevOps Engineer",
    email: "michael.santoso@example.com",
    role: "engineer",
  },
  {
    name: "Clara Hartono",
    title: "QA Analyst",
    email: "clara.hartono@example.com",
    role: "qa",
  },
  {
    name: "Daniel Kusuma",
    title: "Data Analyst",
    email: "daniel.kusuma@example.com",
    role: "analyst",
  },
  {
    name: "Felicia Tan",
    title: "HR Specialist",
    email: "felicia.tan@example.com",
    role: "hr",
  },
];
</script>

<template>
  <div class="container">
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Sample Table</UiCardTitle>
      </UiCardHeader>

      <UiCardContent>
        <form class="table-data-filter">
          <div class="flex items-center gap-4">
            <UiInputGroup>
              <UiInputGroupInput placeholder="Search..." />
              <UiInputGroupAddon>
                <Icon name="lucide:search" aria-label="Search" />
              </UiInputGroupAddon>
            </UiInputGroup>

            <UiSelect>
              <UiSelectTrigger>
                <UiSelectValue placeholder="Select a timezone" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectLabel>North America</UiSelectLabel>
                  <UiSelectItem value="est">Eastern Standard Time (EST)</UiSelectItem>
                  <UiSelectItem value="cst">Central Standard Time (CST)</UiSelectItem>
                  <UiSelectItem value="mst">Mountain Standard Time (MST)</UiSelectItem>
                  <UiSelectItem value="pst">Pacific Standard Time (PST)</UiSelectItem>
                  <UiSelectItem value="akst">Alaska Standard Time (AKST)</UiSelectItem>
                  <UiSelectItem value="hst">Hawaii Standard Time (HST)</UiSelectItem>
                </UiSelectGroup>
                <UiSelectGroup>
                  <UiSelectLabel>Europe & Africa</UiSelectLabel>
                  <UiSelectItem value="gmt">Greenwich Mean Time (GMT)</UiSelectItem>
                  <UiSelectItem value="cet">Central European Time (CET)</UiSelectItem>
                  <UiSelectItem value="eet">Eastern European Time (EET)</UiSelectItem>
                  <UiSelectItem value="west">
                    Western European Summer Time (WEST)
                  </UiSelectItem>
                  <UiSelectItem value="cat">Central Africa Time (CAT)</UiSelectItem>
                  <UiSelectItem value="eat">East Africa Time (EAT)</UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>

            <UiDatepicker v-model="date">
              <template #default="{ togglePopover }">
                <UiButton
                  variant="outline"
                  :class="[
                    !date && 'text-muted-foreground',
                    'w-[260px] justify-start text-left',
                  ]"
                  @click="togglePopover"
                >
                  <Icon name="lucide:calendar" class="size-4" />
                  {{ date ? dayjs(date).format("MMMM DD, YYYY") : "Select a date" }}
                </UiButton>
              </template>
            </UiDatepicker>
          </div>
        </form>

        <div class="table-outer">
          <UiTable>
            <UiTableHeader class="table-header">
              <UiTableRow>
                <UiTableHead class="table-head-row">Name</UiTableHead>
                <UiTableHead class="hidden lg:table-cell table-head-row">
                  Title
                </UiTableHead>
                <UiTableHead class="hidden md:table-cell table-head-row">
                  Email
                </UiTableHead>
                <UiTableHead class="table-head-row">Role</UiTableHead>
                <UiTableHead class="table-head-row text-right"> Actions </UiTableHead>
              </UiTableRow>
            </UiTableHeader>

            <UiTableBody>
              <template v-for="user in users" :key="user.id">
                <UiTableRow class="table-body">
                  <UiTableCell>
                    <div class="flex flex-col">
                      <p class="font-medium">{{ user.name }}</p>
                      <p class="text-muted-foreground lg:hidden">{{ user.title }}</p>
                      <p class="text-muted-foreground md:hidden">{{ user.email }}</p>
                    </div>
                  </UiTableCell>

                  <UiTableCell class="hidden text-muted-foreground lg:table-cell">
                    {{ user.title }}
                  </UiTableCell>
                  <UiTableCell class="hidden text-muted-foreground md:table-cell">
                    {{ user.email }}
                  </UiTableCell>
                  <UiTableCell class="text-muted-foreground">{{ user.role }}</UiTableCell>
                  <UiTableCell>
                    <div class="table-action-button-group">
                      <UiButton size="xs" variant="outline" effect="ringHover">
                        <UiIcon name="ic:round-edit" :size="12" />
                        Edit
                      </UiButton>
                      <UiButton size="xs" variant="destructive" effect="ringHover">
                        <UiIcon name="ic:round-delete" :size="12" />
                        Delete
                      </UiButton>
                    </div>
                  </UiTableCell>
                </UiTableRow>
              </template>
            </UiTableBody>
          </UiTable>
        </div>
      </UiCardContent>
    </UiCard>
  </div>
</template>
