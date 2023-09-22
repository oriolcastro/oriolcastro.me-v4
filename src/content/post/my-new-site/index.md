---
title: 'My new site is here!'
description: 'I finally decided to update my site after leaving it abandoned for 3 years 😅'
publishDate: '22 Sep 2023'
tags: ['blog', 'astro', 'react', 'gatsby', 'career']
draft: false
---

## The beginning

I registered this domain 5 years ago when I was starting my career in the software development world. My goal was to have an online presence and write about my journey. Long story short, I only wrote a couple of articles during my freelance/learning phase back in [2017-2018](/timeline#2017) and never continued it.

Those first articles weren't even written in English, as at that moment I didn't understood that it was the default language of this industry.

The [original version](https://github.com/oriolcastro/oriolcastro.me-v3/releases/tag/v2.0.0) of the blog was build using [Gatsby framework v2](https://v2.gatsbyjs.com/) and it was styled with [Semantic UI](https://semantic-ui.com/). I build it on top of a template that managed the content using [Netlify CMS](https://v1.netlifycms.org/) ([currently Decap CMS](https://www.netlify.com/blog/netlify-cms-to-become-decap-cms/)). Gatsby will always have a special place in my heart as it was the framework that introduced me to modern web development and where I discovered React.

## The abandonment

After I started in my first job in [2019](/timeline#2019) I stopped blogging as I couldn't find neither the time nor the motivation. The site lasted dormant until 2020 when I decided to give it a face lift using some of the knowledge I learned while working at Xceed. [This new version](https://github.com/oriolcastro/oriolcastro.me-v3/releases/tag/v3.0.0) had a fully original theming using [Theme UI](https://theme-ui.com/) (based on [Emotion](https://emotion.sh/)) and used [MDX](https://v1.mdxjs.com/) to author the content. At the end of 2020 I [slightly updated](https://github.com/oriolcastro/oriolcastro.me-v3/releases/tag/v3.1.0) the site with a refreshed home page and updated dependencies.

The site remained like that for a couple of years until a point that it if felt abandoned. I tried to modernize it by updating it to the latest version of [Gatsby](https://v4.gatsbyjs.com/docs/) and [Tailwind](https://tailwindcss.com/) for styling it, but [it was never completed](https://github.com/oriolcastro/oriolcastro.me-v3/commits/feature/switch-to-tailwind). In the summer of 2023 after I was [laid off from my last job at Gigapipe](/timeline#2023) I had the perfect opportunity to pick up the work on the site.

## A new beginning

If I was going to tackle the update of the blog, I had a few goals for it

### Use modern tools

A lot has changed in the last 3 years in the frontend space. Gatsby is not the shiny tool it was after [being acquired by Netlify](https://www.netlify.com/press/netlify-acquires-gatsby-inc-to-accelerate-adoption-of-composable-web-architectures/). Tailwind has skyrocketed in popularity as a fast and easy way to style your pages, I think it is perfect for styling static HTML. [Astro](https://astro.build/) has become really popular for content sites, and it looks like the perfect tool for my blog.

### Apply everything I learned

I have changed a lot in these years, and I have been able to accumulate a lot of knowledge from my teammates and from the challenges I faced at work. The new site should be written in Typescript, and it should have clean and well written code.

### Don't reinvent the wheel

There are a ton of [templates for Astro](https://astro.build/themes/) and a lot of [integrations](https://astro.build/integrations/), this was what attracted me from Gatsby in the first place. So, why starting from scratch? I decided to pick a nice template and build on top of it. The new site uses the [astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus) theme from Chris Williams.

### A fresh start

I was tempted to keep using the same [repo](https://github.com/oriolcastro/oriolcastro.me-v3) I have been using since 2018 so I could keep the git history. But switching to an entirely new framework and also changing most of the infra tools (I use PNPM instead of Yarn, Cloudflare instead of Netlify, Typescript instead of vanilla JavaScript) made it very difficult. That's why I created a brand-new [repo](https://github.com/oriolcastro/oriolcastro.me-v4)

I don't know if I would be able to keep posting regularly. But I understand now that writing a blog could be a good tool to keep pushing forward my career, specially after transitioning to a senior role. If my colleagues appreciate my opinions and my knowledge is valued, why not share it?
