/* Types for the suite list.
 *
 * They live in the package rather than in a consumer, for the same reason the
 * list itself does: one applet typechecks strictly, and a declaration written
 * locally to satisfy it would be a second description of this file, free to
 * disagree with it. `platform-auth` ships its own types for the same reason. */

/** One tool in the suite. */
export interface Tool {
  /** The platform's own id, and the only durable identity a tool has. Grants,
   *  addresses and page permissions are all keyed by it, so a rename moves
   *  `name` and never this. */
  id: string;
  /** What people call it. */
  name: string;
  /** The one-liner under the name in the switcher menu. */
  line: string;
  /** The longer sentence the platform's launcher card shows. */
  about: string;
  /** The glyph's inner SVG markup, drawn on a 24x24 grid in `currentColor`. */
  icon: string;
}

/** The fleet, in the one order every menu uses. */
export const TOOLS: readonly Tool[];

/** One tool by id, or undefined. */
export function toolById(id: string): Tool | undefined;

/** The glyph as a whole `<svg>`, at whatever size the caller's CSS decides. */
export function toolIcon(id: string): string;
