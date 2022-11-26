import {
  MdBusiness,
  MdDashboard,
  MdOutlineAdd,
  MdOutlineFormatListBulleted,
} from "react-icons/md";

export const navLinks = [
  { name: "Home", icon: MdDashboard, links: [] },
  {
    name: "products",
    icon: MdBusiness,
    links: [
      { label: "Add Product", path: "/admin/products/add", icon: MdOutlineAdd },
      {
        label: "List Products",
        path: "/admin/products/list",
        icon: MdOutlineFormatListBulleted,
      },
    ],
  },
];
