---
layout: core.njk
title: "uxtbd | blogs"
description: "ramblings, rants, and whatnot"
eleventyExcludeFromCollections: true
templateEngineOverride: njk,md
---

### {{ description }}

<div class="post-container">
{% for post in collections.posts | reverse %}
{% if post.url != "/posts/" and post.url != "/posts/index.html" %}
<p class="post-link-wrapper">
<a href="{{ post.url }}" class="post-link">{{ post.data.title or "Untitled" }}</a>
<span class="post-separator"> - </span> 
<span class="post-date">{{ post.date.toDateString() }}</span>
</p>
{% endif %}
{% endfor %}
</div>
