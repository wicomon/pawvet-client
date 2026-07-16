// Mirrors pawvet-server's Menu entity + Create/UpdateMenuInput DTOs
// (src/menu/entities/menu.entity.ts, src/menu/dto/*.input.ts). Broader than
// MenuSummary (src/types/user.ts), which only carries the fields the sidebar
// needs from authUserInfo — this type also carries isActive for the /menus
// admin table.

export const MENU_TYPE_OPTIONS = ["link", "dropdown"] as const;
export type MenuType = (typeof MENU_TYPE_OPTIONS)[number];

export const MENU_POSITION_OPTIONS = ["sidebar", "topbar"] as const;
export type MenuPosition = (typeof MENU_POSITION_OPTIONS)[number];

export interface Menu {
  id: string;
  code: string;
  name: string;
  path: string | null;
  type: string;
  position: string;
  description?: string | null;
  icon?: string | null;
  order?: number | null;
  parentId?: string | null;
  isActive?: boolean | null;
  // Only ever populated one level deep — MENU_FIND_ALL requests
  // `subMenu { ...MenuFields }` but not a nested subMenu.subMenu, since this
  // view only manages a 2-level hierarchy (root menu + its direct children).
  subMenu?: Menu[] | null;
}

// CreateMenuInput: code/name/path/type/position required; the rest optional.
// parentId lets this menu attach under an existing root "dropdown" menu —
// both DTOs declare it `nullable: true` on the backend (create-menu.input.ts,
// inherited by UpdateMenuInput via PartialType), so `null` is a valid value,
// not just `undefined`: it's how an update explicitly clears a parent.
export interface CreateMenuInput {
  code: string;
  name: string;
  path: string;
  type: string;
  position: string;
  description?: string;
  icon?: string;
  order?: number;
  parentId?: string | null;
}

export interface UpdateMenuInput extends Partial<CreateMenuInput> {
  id: string;
}
