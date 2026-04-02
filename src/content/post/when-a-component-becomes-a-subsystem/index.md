<<<<<<< ours
---
title: 'When a Component Becomes a Subsystem'
description: 'A rewrite of Enginy’s editor became a case study in a broader architecture problem: when a component grows into a subsystem, local fixes stop working and clear boundaries start to matter more than patches.'
publishDate: '2 April 2026'
tags: ['frontend', 'react', 'architecture', 'rich-text', 'engineering']
coverImage:
  src: './cover.webp'
  alt: 'Abstract representation of a complex editor system evolving from a tangled component into a structured architecture'
draft: false
---

_Why we rewrote Enginy’s editor around boundaries instead of patches_

At some point, a component stops being a unit of composition and becomes a unit of coordination.

That is the moment it becomes a subsystem.

This happened to Enginy’s rich text editor. But the editor is only the case study. The broader pattern is architectural: once a component starts hosting product behavior, multiple state domains, and competing control paths, it needs boundaries that ordinary components do not.

The rewrite was not about cleanup. It was about recognizing that we were still treating a subsystem like a component.

---

## The old editor did not start simple

One detail matters here: `<AutocompleteField2 />` was never a primitive editor.

From the beginning, it already owned a lot:

- TipTap setup
- smart-field mentions
- image support
- a non-editable signature block
- HTML-oriented behavior
- the field wrapper

Even the extension list made that clear.

**Built-in TipTap extensions**

```text
StarterKit
TextAlign
Highlight
Document
Image
Paragraph
Text
Bold
Italic
Underline
CharacterCount
TextStyle
Color
```

**Custom extensions and customizations**

```text
NonEditableSignature
ImageResize
CustomLink
CustomParagraph
FontSize
FontFamily
CustomMention
```

That is not a lightweight input.

By the time we were calling it a field, it was already carrying the responsibilities of a product surface. And then we kept adding more to it.

---

## What was actually wrong

The problem was not feature count.

The problem was that several independent systems had been collapsed into one ownership boundary.

Inside `<AutocompleteField2 />`, we had:

- editor engine — TipTap lifecycle and extensions
- document serialization — JSON ↔ HTML ↔ markdown ↔ text
- mention system — autocomplete, insertion, rendering
- placeholder validation — business rules per context
- clipboard bridge — custom copy/paste protocol
- upload system — images, files, async mutations
- signature system — non-editable block with cursor rules
- AI orchestration — enhance, accept/reject, feedback
- formatting UI — toolbar, modals, commands
- React integration — refs, effects, callbacks

That matters beyond editors.

Whenever one component starts owning persisted state, runtime behavior, domain rules, UI orchestration, and external integrations at the same time, you do not just have a “big component.” You have multiple systems competing inside one abstraction.

---

## Why bugs cascaded

All of those systems touched the same content:

- typing
- paste handling
- link insertion
- uploads
- signatures
- AI flows
- HTML conversion
- parent-driven updates

Different paths wrote to the editor in different ways. Some emitted `onChange`. Some transformed content before emitting it. Some reinserted structure after mutation.

There was no single write path.

There was no stable source of truth.

That is how bugs propagate: not because any one feature is unusual, but because every feature is competing for authority over the same state.

---

## The invariants that kept breaking

Looking back, the system was constantly violating its own implicit rules:

- the editor instance should be stable once mounted
- the document should be the source of truth
- programmatic writes should not fight user edits
- mentions should round-trip consistently
- the signature block should not corrupt cursor behavior
- `onChange` should reflect actual editor state
- validation should not depend on rendering context

If a system cannot protect its invariants, code cleanliness is cosmetic.

---

## The bug history made the problem obvious

None of these bugs were unusual on their own. What stood out was that they all came from the same architectural fault line.

### 1. Multi-line paste collapsed into plain text

Paste handling intercepted everything and rebuilt paragraphs manually.

This was not just a paste bug. Clipboard parsing and document modeling were happening in the same place, so changing one broke the other.

### 2. Adding a link could freeze the editor

Link insertion was split across multiple transactions with unstable selection handling.

This was not “a rendering issue.” It was a violation of a core invariant: a logical editor operation should be atomic.

### 3. AI prompt content reset itself

The editor lifecycle was reactive in the wrong places and static in the wrong places.

Instantiation was partially frozen. Content sync was overly eager. Unrelated prop changes could rewrite editor content.

### 4. Programmatic updates skipped `onChange`

The system had no consistent source of truth.

Sometimes the editor was authoritative. Sometimes React state was. Sometimes converted content was.

That is not a coherent model. It is contention.

### 5. Invalid placeholders looked valid

Validation lived inside rendering.

That meant the renderer had access to context the persisted document did not. A placeholder could appear valid in the UI while already being invalid from the domain’s point of view.

Rendering was doing domain work, and the two could drift apart.

**Different bugs. Same root cause.**

Once a component has to understand everything, it becomes a place where everything can break everything else.

That is also the decision boundary.

A component has crossed into subsystem territory when:

- it coordinates multiple independent concerns
- it has more than one meaningful state domain
- different actors can write through different paths
- its invariants matter more than its rendering details

At that point, the question is no longer “how do we keep this component tidy?”
It is “what boundaries does this subsystem need?”

---

## So we stopped patching the system and changed the architecture

This was not a feature project.

It was an architecture project.

The new editor is built around one idea:

**separate lifecycle, document state, runtime behavior, and product logic**

That sounds simple when written in one sentence. It was not simple to implement. But it gave us a model we could actually reason about.

---

## The new mental model

The shift was not just decomposition. It was ownership.

Instead of one component, we now have:

- lifecycle layer — `useEnginyEditor`
- UI shell — `Editor.Root`, `Editor.Content`
- capabilities — extensions
- product orchestration — outside the editor

That matters because boundaries are really ownership decisions:

- who owns lifecycle
- who owns persisted state
- who owns runtime behavior
- who owns product rules

Once those are explicit, the system becomes easier not only to implement, but to evolve. Features stop negotiating through one god abstraction and start interacting through defined control surfaces.

Most importantly, the editor instance is owned by the consumer.

Not hidden. Not abstracted away. Owned.

That one decision changes a lot. It makes lifecycle explicit. It makes control surfaces visible. And it removes the illusion that one component can safely mediate every concern in the system.

---

## Lifecycle is now explicit

Previously, lifecycle was scattered across React effects and implicit reset paths. The editor could be recreated or resynchronized for reasons that were not obvious from the outside.

Now lifecycle is centralized in `useEnginyEditor`:

- the editor is created once
- configuration is stable
- capabilities are composed explicitly
- side effects stay outside the editor core

```tsx
const { editor } = useEnginyEditor({
  content: '<p>Hello world</p>',
  onChange: value => console.log(value),
  extensions: [
    ...createFileAttachmentExtension({
      onFile: (file, insertNode) => {
        // Handle file upload
      },
    }),
  ],
})
```

This does not remove every possible editor bug, but it removes the main reset failure mode: unrelated React activity no longer gets to implicitly rewrite the editor’s content.

---

## The real rewrite: separating state domains

This was the most important change.

Before, multiple state domains had been collapsed into one place. The document, transient feature state, UI state, and external product logic were all pushing against each other.

Now they are separate.

**Document state**

- TipTap document
- selection
- persisted content

**Runtime state**

- AI suggestions
- attachment state
- transient editor behavior
- extension-local state

**React state**

- UI shell
- modals
- product orchestration

That separation sounds obvious in retrospect, but it changes everything.

The persisted document no longer has to carry transient behavior. Runtime state no longer has to pretend to be durable. React no longer has to act as a shadow editor engine.

Each layer has ownership, and ownership is what makes the system understandable.

---

## Extensions define behavior boundaries

In the new model, an extension owns a feature boundary.

It can:

- read editor state
- write through transactions
- store runtime state related to that feature

It cannot:

- own unrelated UI
- become a new god object
- redefine editor ownership

That is the rule: one feature, one boundary.

The point is not purity. The point is containment. Features still interact, but they no longer have to share a giant undifferentiated abstraction to do it.

---

## Features became capabilities

Once those boundaries became explicit, several features became much easier to model correctly.

### Mentions

Before, structure, validation, and rendering were coupled together.

Now the editor owns the structure, the domain owns validation, and the UI renders derived state.

That means mention nodes can stay structurally stable even when domain metadata changes. It also means validation is no longer smuggled into rendering logic.

### Links

Before, link logic was entangled with editor lifecycle and selection handling.

Now link behavior is isolated as a capability with a clearer transaction boundary. That makes it much easier to preserve atomic operations and avoid selection instability.

### Media

Before, all media was pushed through one abstraction.

Now inline images and attachments are treated as different concepts, because they are different concepts. One is part of the document model. The other usually has upload lifecycle, async state, metadata, and failure modes that live outside the document.

That distinction matters.

### AI

Before, AI mutated the document directly and forced synchronization paths back through the editor.

Now AI lives in runtime state. The document only changes when the user accepts something.

That separates ephemeral state from persistent state, which is exactly the distinction the old model kept collapsing.

---

## Hydration changed how we think about documents

This was one of the biggest conceptual shifts.

The old model tried to store too much inside the document. Labels, presentation metadata, and contextual details were treated as if they belonged in persisted content.

The new model is built on a different assumption:

**the persisted document stores stable identity, not the full rendering truth**

That is where hydration comes in.

```tsx
const hydratedContent = useMemo(() => {
  return hydrateMentionNodes(initialValue, smartFields ?? [])
}, [initialValue, smartFields])
```

```ts
function hydrateMentionNodes(content, smartFields) {
  return mapNodes(content, node => {
    if (node.type !== 'mention') return node

    const field = smartFields.find(f => f.id === node.attrs.id)
    if (!field) return node

    return {
      ...node,
      attrs: {
        ...node.attrs,
        label: field.label,
        meta: {
          type: field.type,
          icon: field.icon,
          iconColor: field.iconColor,
        },
      },
    }
  })
}
```

Hydration lets the document keep the durable part — identity — while runtime rendering reattaches the volatile part — labels, icons, metadata, contextual presentation.

That matters for a few reasons.

First, it keeps persisted content stable even when metadata changes elsewhere.

Second, it avoids stale documents. If a field label changes, the document does not need to be rewritten just to stay visually accurate.

Third, it makes migrations less painful. You are no longer treating every presentation change as a schema change.

And finally, it degrades gracefully. If a field disappears, the node can still exist structurally even if some enriched metadata is no longer available.

The important properties here are that hydration is deterministic and idempotent. It can be applied repeatedly without drifting the document, and it gives the system a clean boundary between stored content and derived rendering state.

That boundary removed a lot of hidden coupling.

---

## Tradeoffs

This architecture is better.

It is not simpler.

The cost is that complexity becomes explicit. You have to reason across layers, coordinate extensions carefully, and decide where logic belongs.

What gets harder:

- understanding the full system
- debugging across boundaries
- extension coordination
- lifecycle-aware cleanup
- feature composition

But this is a better kind of complexity.

The old system was complex because everything was tangled.
The new system is complex because boundaries are real.

And real boundaries have organizational consequences too: they clarify ownership, reduce hidden coupling, and make future changes easier to scope.

---

## When this is overkill

More generally, this architecture becomes necessary when a component stops being a UI primitive and starts behaving like infrastructure for product behavior.

In our case, that component was an editor.
The same pattern shows up in data grids, form builders, canvases, workflow editors, media composers, and other advanced surfaces.

The trigger is usually some combination of:

- domain logic
- async workflows
- multiple state domains
- external integrations
- invariants that must hold across features

Once those accumulate, “keep it inside the component” stops being a simplification.
It becomes a way of hiding a subsystem without designing one.

---

## How AI actually helped

One principle I really like, [introduced by Jake Nations](https://www.youtube.com/watch?v=eIoohUmYpGI) and popularized by [Dex Horthy](https://x.com/dexhorthy) is: _“Do not outsource the thinking.”_

That shaped how I used AI here.

AI did not design this system for me. But it did accelerate the search.

It helped me:

- identify that the real issue was collapsed state domains
- explore alternative architectures faster
- pressure-test ideas like hydration
- surface tradeoffs earlier

It also made plenty of bad suggestions, especially local fixes inside the broken abstraction. That was useful too, because it made the limits of the old model even more obvious.

Used well, AI was not the architect. It was a way to search the space faster.

---

## The lesson I would keep

You know a component has outgrown its architecture when you cannot clearly explain three things:

- who owns state
- where writes happen
- what counts as the source of truth

That was the lesson from the editor, but it is not really about editors.

It is a general rule for software design:
when ownership is unclear, writes are competing, and state domains are collapsed, the abstraction is already failing.

At that point, the goal is not to make the component cleaner.
The goal is to give the subsystem the boundaries it has already earned.
|||||||
=======
---
title: 'When a Component Becomes a Subsystem'
description: 'A rewrite of Enginy’s editor became a case study in a broader architecture problem: when a component grows into a subsystem, local fixes stop working and clear boundaries start to matter more than patches.'
publishDate: '2 April 2026'
tags: ['frontend', 'react', 'architecture', 'rich-text', 'engineering']
coverImage:
  src: './cover.webp'
  alt: 'Abstract representation of a complex editor system evolving from a tangled component into a structured architecture'
draft: false
---

_Why we rewrote Enginy’s editor around boundaries instead of patches_

At some point, simple editor changes at Enginy started to feel risky.

Not because the code was especially messy, but because the architecture was wrong.

As the product surface around the editor kept expanding, I spent a lot of time understanding where the old model was breaking and helping shape the new one. The rewrite was not about cleanup. It was about fixing an architecture that had turned normal product work into risky editor work.

Over time, the editor had stopped behaving like a reusable component and started behaving like a subsystem.

The example here is an editor, but the pattern is broader. Once a component starts hosting product behavior, it needs architectural boundaries that most components never need.

We were still treating it like the former.

---

## The old editor did not start simple

One detail matters here: `<AutocompleteField2 />` was never a primitive editor.

From the beginning, it already owned a lot:

- TipTap setup
- smart-field mentions
- image support
- a non-editable signature block
- HTML-oriented behavior
- the field wrapper

Even the extension list made that clear.

### Built-in TipTap extensions

```text
StarterKit
TextAlign
Highlight
Document
Image
Paragraph
Text
Bold
Italic
Underline
CharacterCount
TextStyle
Color
```

### Custom extensions and customizations

```text
NonEditableSignature
ImageResize
CustomLink
CustomParagraph
FontSize
FontFamily
CustomMention
```

That is not a lightweight input.

By the time we were calling it a field, it was already carrying the responsibilities of a product surface. And then we kept adding more to it.

---

## What was actually wrong

The problem was not that the editor had too many features.

The problem was that several independent systems had been fused into one component.

Inside `<AutocompleteField2 />`, we had:

- editor engine — TipTap lifecycle and extensions
- document serialization — JSON ↔ HTML ↔ markdown ↔ text
- mention system — autocomplete, insertion, rendering
- placeholder validation — business rules per context
- clipboard bridge — custom copy/paste protocol
- upload system — images, files, async mutations
- signature system — non-editable block with cursor rules
- AI orchestration — enhance, accept/reject, feedback
- formatting UI — toolbar, modals, commands
- React integration — refs, effects, callbacks

These were not all the same kind of concern. Some belonged to the persisted document model. Some belonged to runtime editor behavior. Some belonged to UI. Some belonged to business rules. Some were integrations with external systems.

Treating them as one concern made the editor fragile.

---

## Why bugs cascaded

All of those systems touched the same content:

- typing
- paste handling
- link insertion
- uploads
- signatures
- AI flows
- HTML conversion
- parent-driven updates

Different paths wrote to the editor in different ways. Some emitted `onChange`. Some transformed content before emitting it. Some reinserted structure after mutation.

There was no single write path.

There was no stable source of truth.

That is how bugs propagate: not because any one feature is unusual, but because every feature is competing for authority over the same state.

---

## The invariants that kept breaking

Looking back, the system was constantly violating its own implicit rules:

- the editor instance should be stable once mounted
- the document should be the source of truth
- programmatic writes should not fight user edits
- mentions should round-trip consistently
- the signature block should not corrupt cursor behavior
- `onChange` should reflect actual editor state
- validation should not depend on rendering context

If a system cannot protect its invariants, code cleanliness is cosmetic.

---

## The bug history made the problem obvious

None of these bugs were unusual on their own. What stood out was that they all came from the same architectural fault line.

### 1. Multi-line paste collapsed into plain text

Paste handling intercepted everything and rebuilt paragraphs manually.

This was not just a paste bug. Clipboard parsing and document modeling were happening in the same place, so changing one broke the other.

### 2. Adding a link could freeze the editor

Link insertion was split across multiple transactions with unstable selection handling.

This was not “a rendering issue.” It was a violation of a core invariant: a logical editor operation should be atomic.

### 3. AI prompt content reset itself

The editor lifecycle was reactive in the wrong places and static in the wrong places.

Instantiation was partially frozen. Content sync was overly eager. Unrelated prop changes could rewrite editor content.

### 4. Programmatic updates skipped `onChange`

The system had no consistent source of truth.

Sometimes the editor was authoritative. Sometimes React state was. Sometimes converted content was.

That is not a coherent model. It is contention.

### 5. Invalid placeholders looked valid

Validation lived inside rendering.

That meant the renderer had access to context the persisted document did not. A placeholder could appear valid in the UI while already being invalid from the domain’s point of view.

Rendering was doing domain work, and the two could drift apart.

---

Different bugs. Same root cause.

Once a component has to understand everything, it eventually becomes a place where everything can break everything else.

---

## So we stopped patching the system and changed the architecture

This was not a feature project.

It was an architecture project.

The new editor is built around one idea:

**separate lifecycle, document state, runtime behavior, and product logic**

That sounds simple when written in one sentence. It was not simple to implement. But it gave us a model we could actually reason about.

---

## The new mental model

Instead of one component, we now have:

- lifecycle layer — `useEnginyEditor`
- UI shell — `Editor.Root`, `Editor.Content`
- capabilities — extensions
- product orchestration — outside the editor

The shift was not just decomposition. It was ownership.

Each layer now has a clear job, a clear boundary, and fewer chances to silently become the source of truth for everything else.

Most importantly, the editor instance is owned by the consumer.

Not hidden. Not abstracted away. Owned.

That one decision changes a lot. It makes lifecycle explicit. It makes control surfaces visible. And it removes the illusion that one component can safely mediate every concern in the system.

---

## Lifecycle is now explicit

Previously, lifecycle was scattered across React effects and implicit reset paths. The editor could be recreated or resynchronized for reasons that were not obvious from the outside.

Now lifecycle is centralized in `useEnginyEditor`:

- the editor is created once
- configuration is stable
- capabilities are composed explicitly
- side effects stay outside the editor core

```tsx
const { editor } = useEnginyEditor({
  content: '<p>Hello world</p>',
  onChange: value => console.log(value),
  extensions: [
    ...createFileAttachmentExtension({
      onFile: (file, insertNode) => {
        // Handle file upload
      },
    }),
  ],
})
```

This does not remove every possible editor bug, but it removes the main reset failure mode: unrelated React activity no longer gets to implicitly rewrite the editor’s content.

---

## The real rewrite: separating state domains

This was the most important change.

Before, multiple state domains had been collapsed into one place. The document, transient feature state, UI state, and external product logic were all pushing against each other.

Now they are separate.

### Document state

- TipTap document
- selection
- persisted content

### Runtime state

- AI suggestions
- attachment state
- transient editor behavior
- extension-local state

### React state

- UI shell
- modals
- product orchestration

That separation sounds obvious in retrospect, but it changes everything.

The persisted document no longer has to carry transient behavior. Runtime state no longer has to pretend to be durable. React no longer has to act as a shadow editor engine.

Each layer has ownership, and ownership is what makes the system understandable.

---

## Extensions define behavior boundaries

In the new model, an extension owns a feature boundary.

It can:

- read editor state
- write through transactions
- store runtime state related to that feature

It cannot:

- own unrelated UI
- become a new god object
- redefine editor ownership

That is the rule: one feature, one boundary.

The point is not purity. The point is containment. Features still interact, but they no longer have to share a giant undifferentiated abstraction to do it.

---

## Features became capabilities

Once those boundaries became explicit, several features became much easier to model correctly.

### Mentions

Before, structure, validation, and rendering were coupled together.

Now the editor owns the structure, the domain owns validation, and the UI renders derived state.

That means mention nodes can stay structurally stable even when domain metadata changes. It also means validation is no longer smuggled into rendering logic.

### Links

Before, link logic was entangled with editor lifecycle and selection handling.

Now link behavior is isolated as a capability with a clearer transaction boundary. That makes it much easier to preserve atomic operations and avoid selection instability.

### Media

Before, all media was pushed through one abstraction.

Now inline images and attachments are treated as different concepts, because they are different concepts. One is part of the document model. The other usually has upload lifecycle, async state, metadata, and failure modes that live outside the document.

That distinction matters.

### AI

Before, AI mutated the document directly and forced synchronization paths back through the editor.

Now AI lives in runtime state. The document only changes when the user accepts something.

That separates ephemeral state from persistent state, which is exactly the distinction the old model kept collapsing.

---

## Hydration changed how we think about documents

This was one of the biggest conceptual shifts.

The old model tried to store too much inside the document. Labels, presentation metadata, and contextual details were treated as if they belonged in persisted content.

The new model is built on a different assumption:

**the persisted document stores stable identity, not the full rendering truth**

That is where hydration comes in.

```tsx
const hydratedContent = useMemo(() => {
  return hydrateMentionNodes(initialValue, smartFields ?? [])
}, [initialValue, smartFields])
```

```ts
function hydrateMentionNodes(content, smartFields) {
  return mapNodes(content, node => {
    if (node.type !== 'mention') return node

    const field = smartFields.find(f => f.id === node.attrs.id)
    if (!field) return node

    return {
      ...node,
      attrs: {
        ...node.attrs,
        label: field.label,
        meta: {
          type: field.type,
          icon: field.icon,
          iconColor: field.iconColor,
        },
      },
    }
  })
}
```

Hydration lets the document keep the durable part — identity — while runtime rendering reattaches the volatile part — labels, icons, metadata, contextual presentation.

That matters for a few reasons.

First, it keeps persisted content stable even when metadata changes elsewhere.

Second, it avoids stale documents. If a field label changes, the document does not need to be rewritten just to stay visually accurate.

Third, it makes migrations less painful. You are no longer treating every presentation change as a schema change.

And finally, it degrades gracefully. If a field disappears, the node can still exist structurally even if some enriched metadata is no longer available.

The important properties here are that hydration is deterministic and idempotent. It can be applied repeatedly without drifting the document, and it gives the system a clean boundary between stored content and derived rendering state.

That boundary removed a lot of hidden coupling.

---

## Tradeoffs

This architecture is better.

It is not simpler.

The cost of this design is that complexity becomes explicit. You have to reason across layers, coordinate extensions carefully, and decide where logic belongs.

What gets harder:

- understanding the system
- debugging across boundaries
- extension coordination
- lifecycle-aware cleanup
- feature composition

But that is a better kind of complexity.

The old system was complex because everything was tangled.

The new system is complex because boundaries are real.

That is much easier to live with over time.

---

## When this is overkill

This architecture is not the right answer for every editor.

If your editor is just:

- basic formatting
- no custom nodes
- no uploads
- no AI
- no contextual business rules

then this is probably too much.

More generally, this kind of architecture becomes necessary when a component stops being a UI primitive and starts hosting product behavior.

In our case, that component was an editor. But the same pattern shows up in data grids, form builders, canvases, workflow editors, media composers, and other advanced surfaces.

Once a component starts accumulating domain logic, async workflows, multiple state domains, and external integrations, the old “just keep it inside the component” model stops scaling.

That is usually the moment when you need to make lifecycle, ownership, and boundaries explicit.

---

## How AI actually helped

One principle I like from [Dex Horthy](https://x.com/dexhorthy) is: do not outsource the thinking.

That shaped how I used AI here.

AI did not design this system for me. But it did accelerate the search.

It helped me:

- identify that the real issue was collapsed state domains
- explore alternative architectures faster
- pressure-test ideas like hydration
- surface tradeoffs earlier

It also made plenty of bad suggestions, especially local fixes inside the broken abstraction. That was useful too, because it made the limits of the old model even more obvious.

Used well, AI was not the architect. It was a way to search the space faster.

---

## The lesson I would keep

You know a component has outgrown its architecture when you cannot clearly explain three things:

- who owns state
- where writes happen
- what counts as the source of truth

That was the real lesson for me.

The editor was only the case study.

The deeper problem was architectural: too many responsibilities, too many state domains, and too many competing control paths had been collapsed into one place.

We rebuilt this because normal product work had become expensive. The result is not smaller, and it is not simpler.

But it is understandable.

And that is what scales.

The problem was not the editor.

It was that we kept putting everything inside it.
>>>>>>> theirs
