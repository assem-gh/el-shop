import {
  MdBusiness,
  MdDashboard,
  MdOutlineAddBox,
  MdOutlineFormatListBulleted,
} from "react-icons/md";

export const navLinks = [
  { name: "Home", icon: MdDashboard, links: [], path: "/admin" },
  {
    name: "products",
    icon: MdBusiness,
    links: [
      {
        label: "Add Product",
        path: "/admin/products/add",
        icon: MdOutlineAddBox,
      },
      {
        label: "List Products",
        path: "/admin/products/list",
        icon: MdOutlineFormatListBulleted,
      },
    ],
    path: "/admin/products",
  },
];
