export const sidebarMenu = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "Home",
    roles: ["admin", "user"],
  },
  {
  label: "Settings",
  icon: "Home",
  roles: ["admin"],
  children: [
    {
      label: "Profile",
      href: "/profile",
      icon: "Home"
    },
  ],
},
  {
    label: "User",
    icon: "Home",
    roles: ["admin"],
    children: [
      {
        href: "/users/all",
        label: "All Users"
      },
      {
        href: "/users/new",
        label: "Add user"
      }
    ]
  }
]