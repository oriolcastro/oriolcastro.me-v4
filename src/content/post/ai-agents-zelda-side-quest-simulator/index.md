---
title: 'AI Agents Are Turning Engineering Into a Zelda Side-Quest Simulator'
description: 'AI tools can turn a focused bug fix into a quest chain, and latency may be the reason engineers lose the main objective.'
publishDate: '12 Mar 2026'
tags: ['AI Agents', 'Engineering', 'Productivity', 'Workflow', 'Focus']
coverImage:
  src: './cover.webp'
  alt: 'A developer in a Zelda-like dungeon facing a monster while AI side quests float around the screen'
draft: true
---

A few days ago I opened my editor to fix a bug.

Ten minutes later I was reviewing AI-generated code, reading documentation summaries, and exploring a different API design entirely.

The bug was still there.

Somewhere along the way the mission had changed.

The whole experience reminded me of playing _The Legend of Zelda_.

You enter a dungeon with a clear objective. Defeat the boss and retrieve the artifact. But halfway through the dungeon an NPC stops you.

“Hero, can you collect five mushrooms?”

Then another one appears.

“My chickens escaped.”

Suddenly you are no longer saving Hyrule. You are running errands.

Modern AI-assisted engineering sometimes feels exactly like that. You start with a clear objective, but every tool and every agent introduces a new thing to explore.

Another side quest.

If you are not careful, a simple bug fix turns into a quest chain.

---

## The Cost of Leaving the Dungeon

Debugging requires holding an entire system in your head.

The state of the request. The assumptions in the code. The edge case that should not be happening but somehow is.

That mental model is fragile. When you switch tasks, it disappears.

Research on interruptions suggests that after switching tasks it can take more than 20 minutes to regain full focus. Source: [Jellyfish - The cost of context switching](https://www.jellyfish.co/library/developer-productivity/context-switching)

Most developers recognize this instantly. You return to a bug and spend the first few minutes rebuilding the mental map.

Paul Graham described the problem well when writing about maker schedules.

> Great work happens in long stretches of uninterrupted time.

Source: [Paul Graham - Maker's Schedule, Manager's Schedule](http://www.paulgraham.com/makersschedule.html)

Programming is immersion. The longer you stay inside the problem, the clearer the system becomes.

Leaving the dungeon resets the dungeon.

---

## AI Agents Change the Shape of Work

AI tools introduce a new dynamic.

Most agent workflows are asynchronous.

You ask a model to generate code. Then you wait. Thirty seconds. Maybe a minute.

During that waiting period it is almost impossible to stay idle. So you start something else.

Maybe you ask another model to analyze logs. Maybe you explore a different architectural idea. Maybe you open documentation the agent just summarized.

Soon you are supervising several parallel processes.

Cursor generating code. Another model reviewing the diff. A third explaining a dependency you have not used in months.

At that moment the role of the engineer shifts slightly. Instead of solving a single problem, you start orchestrating multiple agents.

Andrej Karpathy once joked about this shift in programming.

> The hottest new programming language is English.

Source: [Andrej Karpathy on X](https://twitter.com/karpathy/status/1617979122625712128)

Prompting models becomes part of the workflow.

The danger is not the tools themselves. The danger is how easily they fragment attention.

Each agent quietly hands you another task.

Before long your mental inventory is full of half-finished tasks.

---

## Latency Might Be the Real Problem

There is an interesting possibility hidden in all of this.

A lot of today's multitasking behavior comes from waiting.

You prompt a model. Then you fill the gap with another activity.

But imagine a different world.

Imagine models that respond almost instantly. Ten times faster than today.

The workflow changes.

Instead of juggling asynchronous tasks, the interaction becomes continuous. You ask a question and immediately continue reasoning about the same problem.

The model behaves less like a background job and more like a collaborator.

Latency is not just a performance issue. It shapes how we think and how we work.

Slow tools encourage branching workflows.

Fast tools keep you inside the problem.

In other words, faster AI might actually reduce multitasking instead of amplifying it.

The agent stays in the dungeon with you.

---

## Staying on the Main Quest

Side quests are not bad.

In Zelda they are part of what makes the world fun.

But experienced players know something important. Side quests are best explored after the main quest moves forward.

Engineering is not so different.

The bug you are fixing. The system you are designing. The feature you are shipping.

That is the dungeon.

AI tools can reduce cognitive load. They can generate scaffolding, summarize documentation, and automate repetitive work.

But they work best when they stay inside the problem you are already solving.

The hardest part of engineering is not solving the problem.

It is staying inside the problem long enough to solve it.
