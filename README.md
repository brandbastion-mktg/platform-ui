# platform-ui

The stylesheet an application links so that its top bar is the same bar every
other application in the suite has: the tool's own name as the switcher, the
tabs beside it, the mark closing the bar on the right.

One file, no dependencies, no build step. It is the visual half of what
[`platform-auth`](https://github.com/brandbastion-mktg/platform-auth) is for
behaviour: sign-in makes the applications one product to a person, and this makes
them look like it.

## Why this is a package and not six copies

The bar was hand-written six times, from a written specification, by people
trying to match. An audit measuring all six side by side found **eleven
differences**, including tabs sitting 58px apart in one application and 28px in
another.

None of them was carelessness, and every application's own tests passed
throughout. The reason is structural and worth stating once:

> **An application's tests can only see that application.** Nothing in a repository
> is ever in a position to notice that a number matches everywhere except in a
> repository it cannot read.

So the numbers stop living in six files. They live here, once.

## Install

Not published to a registry. Depend on a tagged version by URL:

```json
{
  "dependencies": {
    "@brandbastion-mktg/platform-ui": "https://github.com/brandbastion-mktg/platform-ui/archive/refs/tags/v1.0.0.tar.gz"
  }
}
```

A download URL rather than a `github:` reference on purpose: `github:` makes npm
shell out to `git`, which is absent from slim container images, so the dependency
resolves on a laptop and fails inside the build. That lesson is borrowed from
`platform-auth`, which learned it the expensive way.

Then serve `header.css` as a static asset and link it above your own stylesheet.

## What may live here, and nothing else

A closed list, written before the first line, because the predicted failure of a
shared package is that it accretes until nobody can change it:

1. **The bar and the menu behind the tool's name.** Its layout, its type, its
   colours, its states, and the panel that opens under it.
2. **Nothing else.** No buttons, no forms, no tables, no cards, no page layout,
   no utility classes, no reset, no fonts. An application's own screens are its
   own, deliberately: the applications have genuinely different jobs and should
   not be forced into one another's shape.

If a rule here would change how anything below the bar looks, it does not belong
here. The test of a proposed addition is not "is it shared" but "is it the bar".

**Two things sit in the bar and are still not here.** The typeface, because
loading a font is the application's job and this file only asks to inherit it
(Inter, weights 400 500 600 700 800). And the signed-in person's name and
sign-out control, because they appear in exactly one application: the platform
itself owns identity, which is precisely why no tool shows an account. Something
that exists in one place cannot drift between six, so it stays where it is.

## It brings its own names for its colours

Every value the stylesheet needs is declared inside it, prefixed `--pui-`:

```css
:root{
  --pui-blue:#0066e6;
  --pui-ink:#13151b;
  /* ...and so on */
}
```

This is deliberate and it is what makes the file droppable into any application
without a migration. The applications name their own colours three different
ways: the same blue is `--blue` in one, `--accent` in another. A shared file that
referenced any one of those spellings would render wrong in the others, silently,
and would force a rename of every colour in every application before it could be
adopted at all.

An application that wants the bar to follow its own palette overrides a `--pui-`
variable in its own stylesheet. Nothing here reads an application's variables.

## The markup it expects

The stylesheet cannot enforce structure, so this is the contract. Getting it
wrong is not cosmetic: the largest of the eleven differences came from exactly
one application getting one line of this wrong.

```html
<header class="pui-bar">
  <div class="pui-bar-in">

    <div class="pui-sw" data-switcher>
      <button class="pui-sw-btn" type="button" aria-expanded="false"
              aria-haspopup="true" aria-controls="suiteMenu">
        <span class="pui-sw-name">This Tool<span class="pui-sw-dot">.</span></span>
        <svg class="pui-sw-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      <div class="pui-sw-menu" id="suiteMenu" hidden>
        <!-- The way back. Every tool carries it; the platform itself does not,
             and uses <div class="pui-sw-lbl">Tools</div> in its place. -->
        <a class="pui-sw-hub" href="https://platform.example.com/">
          <span class="pui-sw-eyebrow">Back to</span>
          <span class="pui-sw-hubname">Marketing Hub
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6"/>
            </svg>
          </span>
        </a>

        <div class="pui-sw-list">
          <a class="pui-sw-item" href="https://sibling.example.com/">
            <span class="pui-sw-ic"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">…</svg></span>
            <span><span class="pui-sw-t">A Sibling</span><span class="pui-sw-s">What it does, in a few words</span></span>
          </a>
          <!-- The tool you are standing in: a span, never a link -->
          <span class="pui-sw-item pui-here">
            <span class="pui-sw-ic"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">…</svg></span>
            <span><span class="pui-sw-t">This Tool</span><span class="pui-sw-s">What it does, in a few words</span></span>
          </span>
        </div>
      </div>
    </div>

    <nav class="pui-tabs">          <!-- ONE wrapper. This is the load-bearing line -->
      <a class="pui-tab pui-on" href="/">First</a>
      <a class="pui-tab" href="/second">Second</a>
    </nav>

    <div class="pui-spacer"></div>
    <img class="pui-mark" src="/bb-mark.svg" alt="BrandBastion" width="28" height="28">
  </div>
</header>
```

The panel opens and closes from your own script: set `data-open` on `.pui-sw`,
drop `hidden` from the menu, and mirror `aria-expanded` on the button. Click
outside and Escape both close it. The menu starts `hidden` so a page rendered
before its script runs shows a closed bar rather than an open panel lying over
the screen.

**The tabs go inside one wrapper**, and that wrapper is a single child of the bar.
The bar separates its own children with a 30px gap; a tab placed directly in the
bar becomes one of those children and inherits that gap on top of its own padding.
That is how one application ended up with tabs twice as far apart as another,
while both stylesheets agreed on every number.

**A tab is a link with a real address**, never a button. A button cannot be opened
in a new tab, bookmarked, or returned to.

## Versioning

Semantic, and the tag is the whole delivery mechanism.

- **Patch** for a fix that changes no measurement.
- **Minor** for a value that moves by a pixel or two, or a new state.
- **Major** for anything that requires an application to change its markup.

An application takes a new version by bumping the URL above. Nothing updates
itself, on purpose: a stylesheet that changed under a running application would
be a deploy nobody made.
