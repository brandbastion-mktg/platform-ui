/* ============================================================================
   The suite: which tools exist, and what each one is called.

   ONE list, for every application's switcher menu and for the platform's own
   launcher. Before this, the same five rows were written out in six places, so
   renaming a single tool took six repositories and one of them said the old name
   for two days afterwards with nothing able to notice.

   WHAT IS HERE is what more than one application needs in order to DRAW a tool:
   its id, its name, the line under the name, the longer sentence the platform's
   launcher card shows, and its glyph.

   WHAT IS NOT HERE, deliberately:

     - ADDRESSES. Every application reads those from its own configuration
       (`APP_URLS`, keyed by the same ids below), so the day a domain moves is a
       settings change and a restart, never an edit and six deploys. That third
       of this problem was already solved and is not being un-solved.
     - WHO MAY OPEN WHAT. Grants belong to the platform and nowhere else. This
       file says a tool exists; it never says anybody may use it.
     - THE PAGES INSIDE A TOOL. They are tied to grants rather than to display,
       and each application already holds its own navigation to them.
   ============================================================================ */

/* THE ORDER IS THE FLEET'S ORDER and it is the point of the file: the same
   sequence in every menu, including the platform's own. Add a new tool where it
   belongs in the sequence, not at the end for convenience. */
export const TOOLS = [
  {
    id: 'content',
    name: 'Content Engine',
    // `line` is the one-liner under the name in the switcher menu: what the tool
    // does, in the fewest words that still mean something.
    line: 'Blog operations, intake to draft',
    // `about` is the longer sentence, shown on the platform's launcher card,
    // where there is room for a whole thought.
    about: 'Blog content operations, from an opportunity through to a HubSpot draft.',
    // The glyphs are FILLED, not stroked. Each one's second layer is a
    // lower-opacity path of the same `currentColor`, never a second colour, so a
    // single colour drives the whole glyph and any per-tool tint keeps working.
    // The sparkle here is KNOCKED OUT of the page with `fill-rule="evenodd"`
    // rather than drawn on top of it: drawn on top it is the same colour as the
    // shape beneath and disappears entirely, which is how it first shipped.
    icon: '<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 2H7a2.5 2.5 0 0 0-2.5 2.5v15A2.5 2.5 0 0 0 7 22h10a2.5 2.5 0 0 0 2.5-2.5V8h-4.8a1.2 1.2 0 0 1-1.2-1.2V2zm-1.5 9.3l1.02 2.45 2.45 1.02-2.45 1.02L12 18.26l-1.02-2.47-2.45-1.02 2.45-1.02z"/><path d="M15.2 2.4V6.4h4z" opacity=".45"/>',
  },
  {
    id: 'brands',
    name: 'ABM Engine',
    line: 'Who owns which brands, for ABM',
    about: 'Maps a company’s operating brand family, for ABM targeting.',
    icon: '<path d="M11.1 7.75v3.1H6.4a1.6 1.6 0 0 0-1.6 1.6v3.05h1.9V13.1a.4.4 0 0 1 .4-.4h10.6a.4.4 0 0 1 .4.4v2.4h1.9v-3.05a1.6 1.6 0 0 0-1.6-1.6h-4.7v-3.1z" opacity=".5"/><circle cx="12" cy="4.9" r="2.9"/><circle cx="5.4" cy="18.2" r="2.9"/><circle cx="18.6" cy="18.2" r="2.9"/>',
  },
  {
    id: 'comment',
    name: 'Comment Blindspot',
    line: 'What is sitting under the ads',
    about: 'Reads the comments under a brand’s ads and grades what is there.',
    icon: '<path d="M20.5 4.5H9.8a2.3 2.3 0 0 0-2.3 2.3v5.1a2.3 2.3 0 0 0 2.3 2.3h1.1v2.6a.55.55 0 0 0 .93.4l3.1-3h5.57a2.3 2.3 0 0 0 2.3-2.3V6.8a2.3 2.3 0 0 0-2.3-2.3z" opacity=".38" transform="translate(-1.2 -1.1)"/><path d="M13.9 8.2H4.6A2.6 2.6 0 0 0 2 10.8v5.3a2.6 2.6 0 0 0 2.6 2.6h1.1v2.6a.6.6 0 0 0 1.02.43l3.06-3.03h4.12a2.6 2.6 0 0 0 2.6-2.6v-5.3a2.6 2.6 0 0 0-2.6-2.6z"/>',
  },
  {
    id: 'desk',
    name: 'AI Desk',
    line: 'Enforced AI writing workflows',
    about: 'The library and logbook for enforced AI writing workflows: runs happen in Claude Code, the desk holds the prompts and every run.',
    icon: '<rect x="3" y="14.6" width="18" height="4.8" rx="1.7"/><rect x="4.7" y="9.3" width="14.6" height="4" rx="1.5" opacity=".5"/><rect x="6.4" y="4.6" width="11.2" height="3.5" rx="1.4" opacity=".28"/>',
  },
  {
    id: 'events',
    name: 'Event Radar',
    line: 'The industry-event database',
    about: 'Every vetted industry event, its tier, the argument for going, and what came back afterwards.',
    icon: '<circle cx="12" cy="13.2" r="2.6"/><path d="M12 6.6a6.6 6.6 0 0 1 6.6 6.6h-2a4.6 4.6 0 0 0-9.2 0h-2A6.6 6.6 0 0 1 12 6.6z" opacity=".5"/><path d="M12 2.4A10.8 10.8 0 0 1 22.8 13.2h-2A8.8 8.8 0 0 0 12 4.4a8.8 8.8 0 0 0-8.8 8.8h-2A10.8 10.8 0 0 1 12 2.4z" opacity=".26"/>',
  },
];

/** One tool by id, or undefined. Ids are the platform's own words for each tool
 *  and never change: a rename moves `name`, never `id`, because the ids are what
 *  grants, addresses and page permissions are all keyed by. Renaming one would
 *  orphan every one of those silently. */
export const toolById = (id) => TOOLS.find((t) => t.id === id);

/** The glyph as a whole `<svg>`, at the size the caller's CSS decides. */
export const toolIcon = (id) => {
  const tool = toolById(id);
  const inner = tool ? tool.icon : '<circle cx="12" cy="12" r="8"/>';
  return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${inner}</svg>`;
};
