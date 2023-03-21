import { GenTarget, NavItem } from "../models/models";
import { RemoveRedEye, DirectionsCarFilledSharp, AutoFixHigh } from "@mui/icons-material";

export const colorTargets: GenTarget[] = ["body", "discs", "glass"];

export const navItems: NavItem[] = [
  {
    title: "Free View",
    icon: RemoveRedEye,
    mode: "view",
  },
  {
    title: "General",
    icon: DirectionsCarFilledSharp,
    mode: "general",
  },
  {
    title: "Stickers",
    icon: AutoFixHigh,
    mode: "stickers",
  },
];
