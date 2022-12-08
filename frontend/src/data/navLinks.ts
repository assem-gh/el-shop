import {
  MdBusiness,
  MdDashboard,
  MdOutlineAddBox,
  MdOutlineCategory,
  MdOutlineFormatListBulleted,
  MdOutlineTableChart,
} from "react-icons/md";

export const navLinks = [
  { name: "Home", icon: MdDashboard, links: [], path: "/admin" },
  {
    name: "Products",
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
        icon: MdOutlineTableChart,
      },
    ],
    path: "/admin/products",
  },
  {
    name: "Categories",
    icon: MdOutlineCategory,
    links: [
      {
        label: "Add Category",
        path: "/admin/categories/add",
        icon: MdOutlineAddBox,
      },
      {
        label: "List Categories",
        path: "/admin/categories/list",
        icon: MdOutlineFormatListBulleted,
      },
    ],
    path: "/admin/categories",
  },
];
