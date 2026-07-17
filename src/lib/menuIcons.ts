// Maps the kebab-case icon names sent by pawvet-server's `authUserInfo.menus`
// (e.g. "layout-dashboard", "paw-print") to their lucide-react component. Menu
// icons arrive as strings from the backend rather than as imported components,
// unlike every other icon usage in this codebase — this is the one place that
// needs a name → component lookup.

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  Building,
  Calendar,
  CalendarDays,
  CircleDot,
  LayoutDashboard,
  Menu,
  Package,
  PawPrint,
  Receipt,
  Settings,
  Shield,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";

const MENU_ICONS: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  dashboard: LayoutDashboard,
  users: Users,
  "paw-print": PawPrint,
  calendar: Calendar,
  "calendar-days": CalendarDays,
  package: Package,
  receipt: Receipt,
  "bar-chart": BarChart3,
  "user-cog": UserCog,
  shield: Shield,
  menu: Menu,
  building: Building,
  bell: Bell,
  wallet: Wallet,
  settings: Settings,
};

// Fallback icon for menu codes the backend adds before the client knows about
// them, so a new menu never renders with a missing/undefined icon component.
const FALLBACK_ICON: LucideIcon = CircleDot;

export function resolveMenuIcon(icon?: string | null): LucideIcon {
  if (!icon) return FALLBACK_ICON;
  return MENU_ICONS[icon] ?? FALLBACK_ICON;
}

// Selectable icon names for the /menus admin form's icon picker
// (src/components/menus/menuFormConfig.ts) — derived from the same map
// instead of a second hardcoded list, so the two can't drift apart.
export const MENU_ICON_NAMES = Object.keys(MENU_ICONS);
