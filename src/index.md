---
layout: core.njk
title: "uxtbd | personal website"
description: "software engineer"
---

# Welcome!

21-year-old software engineer from south america, I am quite a pleco fan, I love plecos, I love cats as well.

```c
#include <stdio.h>

int main(void) {
  printf("Hello syntax highlighting\n");
  return 0;
}
```

# Projects
{% if collections.githubRepos.length > 0 %}
  <div id="projects">
  {% for repo in collections.githubRepos %}
      {% if repo.description.length > 0 %}
      <a href="{{ repo.html_url }}" target="_blank">{{ repo.name }}</a> - <span>{{ repo.description }}</span>
      {% endif %}
  {% endfor %}
  </div>
{% else %}
  <p>No repository data to display</p>
{% endif %}
