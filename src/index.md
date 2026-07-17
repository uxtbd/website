---
layout: core.njk
title: "uxtbd | personal website"
description: "software engineer"
---

# Welcome!

## About me
21-year-old software engineer from south america, I am quite a pleco fan, I love plecos, I love cats as well.

I can code in C, x86 Assembly, some Rust, C is my primary language for now... 

Currently a contributor at [AerynOS](https://aerynos.com/), give it a try!

# Projects
{% if collections.githubRepos.length > 0 %}
  <div id="projects">
  {% for repo in collections.githubRepos %}
      <a href="{{ repo.html_url }}" target="_blank">{{ repo.name }}</a>
      {% if repo.description.length > 0 %}
      - <span>{{ repo.description }}</span>
      {% else %}
      - <span> This repository doesn't have a description... yet </span>
      {% endif %}
  {% endfor %}
  </div>
{% else %}
  <p>No repository data to display</p>
{% endif %}
