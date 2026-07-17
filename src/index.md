---
layout: core.njk
title: "uxtbd | personal website"
description: "software engineer"
---

# Welcome!

## About me

21-year-old software engineer from south america, I am quite a pleco fan, I love plecos, I love cats as well.

I can code in C, x86 Assembly, some Rust, C is my primary language for now... Rust will eventually take its place

Currently a contributor at [AerynOS](https://aerynos.com/), give it a try!

# Projects

{% if collections.githubRepos.length > 0 -%}
{%- for repo in collections.githubRepos -%}
<a href="{{ repo.html_url }}" target="_blank">{{ repo.name }}</a>{% if repo.description.length > 0 %} - <span>{{ repo.description }}</span>{% endif %}<br>
{%- endfor -%}
{%- else -%}
<p>No repository data to display</p>
{%- endif %}

# Contact

Discord: uxtbd
Email: <a href="mailto:dev@kthread.dev">dev [at] kthread [dot] dev</a>

### badges :3

<a href="https://nixie.starlightnet.work"><img src="https://nixie.starlightnet.work/?fg=eeeeee&bg=111111&pixel=1" alt="view counter" referrerpolicy="no-referrer-when-downgrade"/></a>
