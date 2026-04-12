---
title: 'I Said I Wouldn’t Repeat Broken Hiring. Then I Got to Help Redesign It.'
description: 'The practical follow-up to my earlier post on broken hiring: what I changed from the inside, and why I think modern engineering interviews need a reset.'
publishDate: '13 April 2026'
tags: ['hiring', 'interviewing', 'engineering', 'leadership', 'ai']
coverImage:
  src: './cover.webp'
  alt: ''
draft: false
---

**AI changes engineering. Hiring needs to catch up.**

Some time ago I wrote about the hiring patterns I refused to repeat after going through too many frustrating software engineering processes myself in [From candidate to interviewer: what I refuse to repeat](/posts/from-candidate-to-interviewer-what-i-refuse-to-repeat/).

That post was easy to write.

It is easy to have principles when you are the candidate. The real test comes when you are on the other side and finally get the chance to shape the process.

At Enginy, I got that chance.

So this is the practical follow-up to that post. Not another complaint. Not another “hiring is broken” rant. This is the concrete version: what I pushed to change once I joined, and why I think the bigger lesson goes beyond Enginy.

Because the real point is not just that we changed our process.

It is that **AI is changing what makes someone a great engineer, and hiring processes need to catch up**.

If software is becoming easier to build, the bottleneck moves. The scarce thing is not just knowing a lot about a specific stack. It is having **taste, agency, product sense, and the ability to use AI to deliver something that actually matters**.

That is the shift I wanted our hiring process to reflect.

Not in theory. In the actual interviews.

## What I wanted to change

Once I joined Enginy and started getting involved in hiring, I did not want to just comment on the process from the sidelines. I wanted to change the parts that still felt too far from actual engineering work.

Concretely, that meant three things.

I redesigned the first interview template so it focused on a dual goal: understanding the candidate’s story while also making the case for why Enginy might be the right place for them.

I reworked the technical interview around product thinking instead of stack recall, and created the template for it.

And I pushed hardest on the take-home. I proposed replacing it completely, then built the small “tiny Enginy” project we now use so the task feels much closer to real work.

## The old shape of technical interviews is aging badly

Too many technical interviews are still optimized for accumulated knowledge.

They over-index on stack knowledge, trivia, and whether someone can answer enough questions about React, distributed systems, databases, or framework internals.

That made a lot of sense when writing good software was expensive and implementation was the hardest part.

I think AI breaks that assumption.

Writing software is getting cheaper. Judgment is not.

For years, a lot of engineering interviews were built around a reasonable idea: if implementation is the scarce thing, test for implementation knowledge. But if implementation becomes faster, cheaper, and more assisted, then the scarce thing changes.

The premium moves to judgment.

Can this person decide what is worth building? Can they simplify? Can they make good trade-offs? Can they steer AI instead of being dragged by it? Can they stay anchored in user value instead of shipping clever nonsense?

Knowing things still matters. But it is no longer enough to be the center of the interview.

So when I had the chance to influence the process, that is where I pushed.

## The process we have today

I call it four phases plus a phase zero.

Phase 0 is triage. Then there are four real interview phases.

Not every phase carries the same weight for me. The real philosophy shows up in Phase 2 and especially Phase 3. That is where the process becomes more than just a funnel.

Still, the shape matters, so here is how it works.

### Phase 0 — Triage

This is the most brutal part of hiring.

Not because people are careless. Because there is barely any signal, and still a decision has to be made.

At this stage you have a CV, maybe a LinkedIn, maybe a side project, maybe a few clues in how someone presents themselves. That is it. And from that, you still have to decide which profiles might have potential and which ones do not clear the minimum bar.

I do not think there is a perfect way to do this. It is hard on both sides.

For candidates, it means getting rejected very early, often with little context. For the people triaging, it means trying to spot something real in a very compressed format.

The main lesson I took from my own experience is this: **you need to make your signal legible**.

Experience in a product company helps. Interesting side projects help. Signs of early agency help. A clear match between your past challenges and the kind of problems the company is working on helps.

I wrote before about [my exprience finding a software engineering job](/posts/my-journey-finding-my-current-software-engineer-job/), and one thing I still believe is that presenting the best version of yourself, and making clear what makes you stand out, matters a lot at this stage.

I do not love this phase, but I do think it reflects a hard truth: if your signal is hard to see, many teams will miss it. That is unfair sometimes. It is also real.

### Phase 1 — First contact

I created the template for this interview around a very intentional dual goal:

**their story + the Enginy sale**

I dislike first interviews that are basically screening calls pretending to be conversations. If the call is only useful for the company, it is a badly designed interview.

This is a 30-minute chat with one of our engineers. We want to understand who the candidate is, what they want professionally, how they think about engineering, how they work with others, and what kind of environment brings out their best work.

But it also has to work in the other direction. We should be able to explain what Enginy is, how we work, what kind of problems we care about, and why this might actually be the right place for them.

A hiring process should not just filter. It should help both sides decide.

What we are looking for here is not polish. It is depth.

Can the candidate explain why they made past decisions? Can they talk through trade-offs without hiding behind buzzwords? Do they sound outcome-driven? Do they show taste? Do they show agency? Can they connect technical work to user value?

That is much more interesting than hearing the same rehearsed career story for the tenth time.

### Phase 2 — We stopped testing for stack recall

This is one of the parts I most wanted to change.

The older version looked more like what many teams still do: a classic technical interview that touched several technologies we use internally. That was useful for checking stack familiarity, but it kept the focus too close to accumulated knowledge.

I wanted to move the center of gravity.

So I redefined the interview around a product problem instead.

It is a 60-minute conversation designed to evaluate five things:

- **Product mindset** — do they understand users and outcomes?
- **Taste** — do they simplify and make good trade-offs?
- **Agency** — do they drive decisions and challenge assumptions?
- **Technical depth** — can they execute on their ideas?
- **Stack strength** — where are they strongest?

The important shift is that we are not testing these in isolation. They show up in how someone reasons about a realistic product and systems problem.

A representative example would be something like this:

> Today, users build prospecting workflows by manually combining filters and rules. We want them to describe the kind of companies they want to target in plain language, and have the platform generate, rank, and continuously refresh a list of matching accounts automatically.

That kind of prompt is much closer to the work that actually matters. It forces candidates to reason about users, ambiguity, trade-offs, scope, system design, and failure modes.

That is the point.

What changed for me is not just the format of the interview. It is what I consider good signal.

If AI makes building easier, I want the interview to spend less time asking “how much do you know about this tool?” and more time asking “how do you think when the problem is real?”

### Phase 3 — We replaced the fake task with real work

This is the phase I care most about.

Because I have done the standard take-home. Most engineers have.

Take this public API. Build a small app. Show a list. Add a detail view.

I get why companies do it. It is easy to administer. Easy to compare. Easy to explain.

It is also a pretty bad simulation of real work.

When we discussed what our technical task should be, two goals became obvious.

First, **we wanted to understand what it would actually feel like to work with this person day to day**.

Second, **we wanted to see how they work with AI tooling, because that is already part of day-to-day engineering at Enginy**.

So I pushed to rethink the task completely.

Instead of a greenfield exercise, candidates get a small project that mimics a tiny version of the Enginy platform. It has a realistic stream of work: a couple of bugs to fix, a feature touching frontend and API, and another feature touching more core services. Then we let the candidate choose what to work on for one hour.

That choice is part of the evaluation.

We are not just looking at whether they finish something. We are looking at how they prioritize, how they scope, where they choose to create value first, how they navigate ambiguity, and whether they can deliver something meaningful within constraints.

And yes, **we explicitly want candidates to use AI**.

We even provide Claude Code API keys for them to use.

Not because we want to see who can vibe-code fastest, but because using AI well is now part of the job. The interesting question is not whether someone uses it. The interesting question is how.

Do they steer it well?  
Do they keep ownership of the thinking?  
Can they explain the trade-offs themselves instead of delegating the thought process to the model?  
Do they question code quality?  
Do they know when the model is helping and when it is just producing noise?

That is what I actually want to learn from a technical task.

And because the task is intentionally close to real work, I do not even think “preparing too well” for it is a problem. If someone researches the setup, understands the context, and comes in ready to do better work, that looks less like cheating to me and more like how I would want them to behave on the job.

Right now we ask candidates to record themselves while they work on it, because we care more about how they think than about the final artifact. I want to experiment with doing it live in a virtual call with one of our engineers, because I suspect that format might give even better signal.

But the principle is not changing: **we want to evaluate people in something that feels as close as possible to actual work**.

And we only give one hour for a reason.

Partly because I care about not eating up a candidate’s free time. But also because with strong AI tools, one hour is enough to reveal a lot.

**Feedback is part of the deal**

One of the commitments I made in my previous article was that if I ever got the chance to influence hiring, I would not treat candidate effort as disposable.

This is one of the clearest places where I wanted to act on that.

If someone reaches the technical task stage, the least we can do is give something back. That means spending time reviewing their work and giving thoughtful, honest feedback.

The same way we would for a colleague in a code review.

Companies love to talk about respecting candidates. Fine. Then act like it.

### Phase 4 — Final check

This is the phase where I am least involved, so I will not pretend to have deep insight I do not have.

But I do agree strongly with one principle Kai, one of our cofounders, holds: the final hiring call compounds too much to fully outsource.

By this stage, the technical question is mostly answered. What is left is meeting in person and checking whether the fit is actually real.

Every hire changes how a company behaves. How fast it moves. How ambitious it stays. How it treats customers. Early on, founders define the product. Later, they increasingly define who gets to build it.

That is why Kai still interviews every candidate who reaches the final stage, as he explains in [this post](https://www.linkedin.com/posts/kaibrandtlopez_if-you-cant-let-go-youll-lose-your-best-activity-7440348277822132224-TGad).

Not because it is a trust issue. Because it is one of the highest-leverage decisions a company makes.

## This is not a finished process

I do not think we have found the perfect hiring process.

I do think we are moving in the right direction.

Less trivia. Less artificial exercises. Less obsession with stack-specific recall. More realism. More product judgment. More ownership. More signal about how someone actually works. More explicit recognition that AI is now part of the job.

That does not mean technical skill matters less.

It means technical skill, by itself, is no longer enough.

## AI won’t replace engineers. But it does change what great engineers look like.

That is the real idea underneath all of this.

AI is not going to make engineering irrelevant. But it is going to make shallow definitions of engineering irrelevant.

If implementation keeps getting cheaper, then hiring for people who mostly optimize for narrow execution inside a specific lane becomes a worse bet over time.

The engineers I would bet on now are not the ones with the cleanest trivia recall. They are the ones with judgment: the ones who can simplify, navigate ambiguity, use AI without outsourcing taste, and stay anchored in outcomes.

If that is true, and I believe it is, then hiring processes have to catch up.

That is what I wanted to change at Enginy.

Not because I wanted a more creative interview loop.

Because too many companies are still hiring for the version of engineering that is fading away, not the one that is already here.
