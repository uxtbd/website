---
layout: core.njk
title: "/home"
description: "Software engineer"
---

{{ description }} from south america, I am quite a pleco fan, I love plecos (My favorite one is the L095 Orange Cheek Pinecone Pleco (_Pseudorinelepis cf. genibarbis_), I love cats as well. I can code in **C**, {_x86,arm_} **Assembly**, **Python**, I love learning programming languages whenever I get the chance to.

Currently a contributor at [AerynOS](https://aerynos.com/), give it a try!

You should check out my [blogs](/posts/), I tend to rant about stuff, maybe my [projects](/projects/) too!

# Latest changes to this website

<ul>
  {%- for commit in collections.recentChanges %}
        <li><time>{{ commit.authorDate }}</time> > {{ commit.subject }} <pre>({{ commit.hash }})</pre></li>
  {%- endfor %}
</ul>

# Contact

Discord: uxtbd

# Badges

<a href="https://aerynos.com">
<img class="cute-button" src="assets/gif/AerynOS.gif" alt="AerynOS" /> </a>

<a href="https://glocean.dev" referrerpolicy="strict-origin-when-cross-origin">
<img class="cute-button" src="https://glocean.dev/badge.png" width="88" height="31" alt="Glocean" />
</a>

<a href="https://ipfs.tech/" referrerpolicy="strict-origin-when-cross-origin">
<img class="cute-button" src="https://88x31.kate.pet/ipfs.gif" height="31" />
</a>

<a href="https://www.firefox.com" referrerpolicy="strict-origin-when-cross-origin">
<img class="cute-button" src="https://88x31.kate.pet/firefox_now.png" height="31" />
</a>

<a href="https://runningwithscissors.com/games/postal/" referrerpolicy="strict-origin-when-cross-origin">
<img class="cute-button" src="https://88x31.kate.pet/postal.jpg" height="31" />
</a>
