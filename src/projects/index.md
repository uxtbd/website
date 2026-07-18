---
layout: core.njk
title: "uxtbd | projects"
description: "personal projects, contributions, etc"
eleventyExcludeFromCollections: true
templateEngineOverride: njk,md
---

### {{ description }}

{% if collections.githubRepos.length > 0 -%}
{%- for repo in collections.githubRepos -%}
<a href="{{ repo.html_url }}" target="_blank">{{ repo.name }}</a>{% if repo.description.length > 0 %} - <span>{{ repo.description }}</span>{% endif %}<br>
{%- endfor -%}
{%- else -%}
<p>No repository data to display</p>
{%- endif %}
