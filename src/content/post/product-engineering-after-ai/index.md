---
title: 'Why AI Made Me Care More About Being a Product Engineer'
description: 'AI makes it easier to turn instructions into working software, but it does not decide whether the software should exist. This article reflects on why product responsibility matters more when implementation gets cheaper.'
publishDate: '6 May 2026'
tags: ['engineering', 'ai', 'career', 'leadership', 'product engineering']
coverImage:
  src: './cover.webp'
  alt: 'A small silhouetted figure walks through a misty, cinematic landscape along a winding path from deep blue darkness toward warm golden light in the distance.'
draft: false
---

**The AI change that was technically correct but product-wrong**

Earlier this year, I was reviewing an AI-generated pull request that did exactly what it had been asked to do.

It was for a feature where a client had asked for more control. The ticket was rough, something like: “Add option to X in Y so users can do Z.”

The PR added the configuration setting. The migration was there. The tests passed. The UI behaved correctly. The implementation was not perfect, but it was reasonable. If I looked only at the ticket, the PR was hard to reject. It had translated an instruction into working software.

And still, something felt wrong.

The problem was not that the AI had failed. In a narrow sense, it had succeeded. It had answered the request almost too literally.

The client did want more control. But the deeper issue was not simply that the product lacked another setting. They wanted control because the defaults of the feature were unclear, or because the defaults were not working for them in a way they could understand or trust.

Adding a setting gave them control. It also added another path through the product, another workflow to explain, and another concept users would have to keep in their heads.

Inside the diff, the change was correct. Inside the product, it was questionable.

That moment stayed with me because it made a shift I had been feeling much harder to ignore.

I have always described myself more naturally as a Product Engineer than as a Software Engineer. Not because I dislike software engineering. I love software engineering. I love clean systems, good abstractions, elegant APIs, and the satisfaction of separate pieces finally fitting together.

By Product Engineer, I mean an engineer who treats implementation as part of the job, not the edge of it.

If I think of my job as producing software, the boundary can stop at the implementation. If I think of my job as producing a product, that boundary disappears. I am responsible for the problem, the tradeoff, the user experience, and the consequences of what we ship.

AI makes it easier to build the wrong thing faster.

If AI can write more code than us, then our value cannot be the amount of code we produce.

## Clean code was my comfort zone

Earlier in my career, I optimized for elegance.

I wanted the code to be clean. I cared about APIs, layers, abstractions, and modules that could be built separately but still compose into something coherent. I liked the feeling of a system becoming legible: boundaries settling into place, names becoming obvious, complexity finding a shape.

I still care about clean systems. But clean code only matters if the product decision behind it is worth keeping.

But I care about it differently now.

The danger is not clean code. The danger is believing clean code is the point.

Clean code can become a hiding place because it feels objective and controllable. The abstraction either holds or it does not. The API either feels right or it does not. The module is either too coupled or it is not. These are difficult questions, but they are questions engineers can answer mostly inside the system.

Product work is messier.

Users contradict each other. Timing changes the right answer. Business needs matter. A technically awkward solution may be the right thing to ship because it buys learning, trust, or time. A beautifully designed abstraction may be premature because the product concept underneath it is still unstable.

Clean code can become a hiding place when the product question is uncomfortable.

I could point to the refactor. I could explain the architecture. I could show that the implementation was flexible, tested, and maintainable. Those things mattered, and still matter, but they also gave me a familiar way to measure my value.

AI has made that comfort feel less stable.

That is not because I think craft is dead. I do not. I still care when code is sloppy. I still care when a model leaks into the wrong layer, when an API name hides the real behavior, or when a shortcut will make the next change painful. Those are real engineering concerns.

But I feel less able to hide there now.

If an AI system can produce a plausible first version of the implementation, then being valuable cannot only mean being the person who can turn a ticket into code. The craft still matters, but it is no longer enough to treat it as the safest place to stand.

The harder question is whether the ticket should become code at all.

## AI makes output cheap. Product debt is still expensive.

When implementation was expensive, producing code felt like the scarce part.

If you could build the thing, you had leverage. You could turn ambiguity into a working system. You could make ideas real. For a long time, that ability shaped how many engineers understood their value. I was not immune to that. I loved the craft, and part of my identity was built around being able to create solid software out of messy requirements.

AI changes the economics of that work.

It can scaffold the feature, write the first version of the tests, explore a library, explain an unfamiliar part of the system, and produce a plausible implementation. It does not make any of those things free, and it does not make them automatically good. But it lowers the cost of getting from instruction to output.

That matters.

When output becomes cheaper, scarcity moves elsewhere. It moves toward knowing what to ask for, what to leave out, and what a product can absorb without becoming harder to understand. It moves toward recognizing when a request is a symptom of confusion rather than a missing feature.

The AI-generated PR with the configuration setting is a small example. A user asked for more control. The obvious implementation was to add control. But the product question was different: why did the user need control in the first place? Were the defaults wrong? Were they invisible? Were we asking users to trust behavior they could not predict?

AI can solve an instruction, and it can increasingly help critique one. But it still cannot own the tradeoff.

I do not think AI means we will have less software. I think it means we will have more. More experiments will be cheap enough to attempt. More internal tools will be built. More workflows will become software. More teams will generate features that previously would have taken too long to justify.

Some of that will be good. Some of it will be useful. Some of it will create real leverage.

But more software also means more surfaces to explain, more states to maintain, more edge cases to support, and more chances for the product to become incoherent. The cost of producing a feature may go down, but the cost of carrying the wrong feature does not disappear.

A feature does not stop costing money when the pull request is merged. It costs attention. It costs maintenance. It costs conceptual space in the product. It becomes something users have to understand and the team has to preserve, migrate, document, debug, or eventually remove.

That is why the work before implementation matters more, not less.

Code is not the whole job. It is the artifact we leave behind after deciding what should exist.

## Product work starts before the instruction is clear

This became very obvious to me during our work on Enginy’s Smart Inbox.

The inbox is a unified place for messages across different channels, multiple identities, and many contacts. At first, the intention sounded straightforward: make it better designed, prettier, and more polished. It was the kind of project that can look mostly visual from the outside. Improve the surface. Clean up the experience. Make it feel more refined.

But once we touched it, the project stopped being about polish.

We started uncovering different ideas of what the inbox was supposed to be. Some users wanted it to process everything. They wanted a place where all incoming work could be handled, sorted, and moved forward. Others wanted it to stay focused on the next relevant action, almost as a way to protect attention.

A lot of the requests sounded like requests for more control. Users wanted filters by status: unread, read, unreplied, replied. They wanted to filter by almost any available property. From the outside, these requests looked reasonable. If the data exists, why not expose it? If users ask for a filter, why not add the filter?

But this was the same pattern as the PR from the beginning. The obvious implementation was to add the requested control. The deeper product question was whether the inbox model was clear enough.

The inbox was not just a list of conversations anymore. One of the major product changes was grouping multiple conversations with the same contact into one view. That made the product more useful in some ways, because users often think in terms of people and relationships, not individual message threads. But it also introduced constraints that made some requests less straightforward.

A status that is obvious at the individual conversation level can become ambiguous when multiple conversations are grouped under the same contact.

If one conversation is replied and another is unreplied, what status should the contact have? If the last reply in one channel came from the contact, but another channel has a drafted message ready to send, what should the inbox show? If a filter says “unreplied,” should it include a contact with one unreplied thread and three completed ones?

These are not just implementation details. They are product decisions hiding inside implementation details.

Each answer teaches users what the inbox is for. Adding another status sounds harmless, but it changes whether users understand the inbox as a place to manage every possible message state or as a place to know what needs their attention now.

That distinction became the center of the project.

Was the inbox a triage surface, a task list, a communication hub, or a focused view of follow-ups? Each answer led to a different product. We could have said yes to every request and built a more powerful inbox in the narrow sense, exposing every possible property, status, and filter. It would have satisfied many individual asks, but it also would have made the product heavier: more configurable, less clear, and slower to understand.

The direction we chose was narrower: the inbox should show what needs attention now, not expose every possible message state.

That did not mean ignoring every other workflow. It meant choosing the product’s center of gravity.

If we said no too aggressively, we risked ignoring real pain and forcing users into a model that did not match their day.

This is where product engineering starts: before the code, when deciding what the product should become.

Users know their pain. They know what feels slow, confusing, or broken. They know the part of the workflow that hurts them most. But they usually see the product through that pain. The engineer working on the product has to see the system around it: the behaviors we encourage, the concepts we teach, the complexity we expose, and the promises we make harder to change later.

AI can make this easier to get wrong because it reduces the friction between idea and implementation. A vague request can become a working feature very quickly. The requested field can be exposed. The requested setting can be added. The requested filter can appear. And because it works, it can feel like progress.

But speed is only useful when it improves learning.

Shipping quickly can be the right move when uncertainty is high and waiting is more expensive than being wrong. Sometimes a narrow solution for an important client is correct because it buys trust or reveals something the team could not learn abstractly. Sometimes the same move is wrong because it creates product debt disguised as responsiveness.

AI increases the speed of generation, but not automatically the quality of learning.

The lesson is to move at the speed of learning, not at the speed of generation.

## The job gets bigger, not smaller

I use AI heavily now.

I use it for technical research, exploring libraries, understanding unfamiliar parts of the system, analyzing product data, and writing code. It has made me faster, especially in the early stages of thinking. When I have a blurry idea, I can start exploring it immediately. I can compare approaches, generate a first version, ask questions, and use the output as material to think with.

That is genuinely useful.

What feels vulnerable is not a fear of AI, or a desire to protect an older idea of engineering from change. I do not feel anti-AI. Most days, I feel the opposite: I would not want to go back to working without it.

The uncomfortable part is more personal than that.

AI weakens the comfort of craft as a complete identity. It makes it harder to rely on the familiar feeling of being valuable because I can produce the implementation. It takes a part of the work that used to feel like proof of competence and makes it easier to generate, easier to compare, and easier to replace with a first draft.

That does not make engineering less important. It makes the responsibility around engineering larger.

I do not trust AI output by default. I treat it like a pull request from another developer, and often with more caution, because the accountability does not move to the tool. It stays with me.

If another developer opens a PR, I review it. I try to understand the choices. I ask whether the implementation fits the system and whether the solution matches the intention. AI-generated work deserves the same review. Maybe more.

AI can produce something that is correct inside the diff and wrong inside the product.

It can pass the tests and still make the experience harder to understand. It can implement the requested behavior and still add the wrong concept. It can follow sparse specifications and solve the narrow problem while ignoring the broader one. That is not necessarily a failure of the tool. It is a failure of the process around the tool.

The user does not appear automatically in the prompt. The business does not appear automatically in the generated code. The product model does not appear automatically because a ticket says “add option” or “add filter.” Those things have to be brought into the work by the people responsible for the product.

AI does not know which debts are intentional. It does not know which shortcuts buy learning and which ones make the product harder to change six months from now. It does not know when a client request should become a feature, when it should become a better default, and when it should reveal that the current model is unclear.

That work remains human because accountability remains human.

The skills that matter more after AI are often mislabeled as soft. Product sense is not decorative; it is the ability to see how a small setting can create a new workflow. Communication is not separate from the work; it is how we figure out what the work should be. Technical care still matters, but it has to be tied to the consequences of what we decide to build.

The product engineer after AI is not less technical. They are more responsible.

More responsible for understanding the problem before generating the solution. More responsible for seeing the tradeoffs hidden inside implementation. More responsible for saying no when a request would make the product worse. More responsible for using AI without letting speed become a substitute for thought.

AI can help us build. It can help us research. It can help us explore possibilities. It can make us faster, and sometimes it can make us better.

But it cannot decide what kind of product we are becoming.

After AI, the title matters less. The responsibility matters more.

Engineering that stops at implementation no longer feels honest.
