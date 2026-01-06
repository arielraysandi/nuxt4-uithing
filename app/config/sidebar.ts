export interface SidebarItem {
  label: string;
  icon?: string;
  to?: string;
  children?: SidebarItem[];
}

export const sidebarMenu: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: "mdi:home-outline",
    to: "/",
  },
  {
    label: "Menu 1",
    icon: "mdi:account-group-outline",
    children: [
      {
        label: "Child Menu 1",
        to: "/users",
      },
      {
        label: "Child Menu 2",
        to: "/users/create",
      },
    ],
  },
  {
    label: "Menu 2",
    icon: "mdi:cog-outline",
    children: [
      {
        label: "Child Menu",
        to: "/settings/general",
      },
      // {
      //   label: 'Security',
      //   children: [
      //     {
      //       label: 'Roles',
      //       to: '/settings/security/roles'
      //     },
      //     {
      //       label: 'Permissions',
      //       to: '/settings/security/permissions'
      //     }
      //   ]
      // }
    ],
  },
];
