---
layout: core.njk
title: "/var/blogs"
description: "Both serious and funny toned blogs regarding tech, life, etcetera"
eleventyExcludeFromCollections: true
templateEngineOverride: njk,md
---

### {{ description }}

<div class="post-container">
{% for post in collections.posts %}
{% if post.url != "/posts/" and post.url != "/posts/index.html" %}
<p class="post-link-wrapper">
<a href="{{ post.url }}" class="post-link">{{ post.data.title or "Untitled" }}</a>
<span class="post-separator"> | </span> 
<span class="post-description">{{ post.data.description or "No description" }}</span>
<span class="post-separator"> - </span> 
<span class="post-date">{{ post.date.toDateString() }}</span>
</p>
{% endif %}
{% endfor %}
</div>
