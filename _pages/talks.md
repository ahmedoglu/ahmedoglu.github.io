---
title: Talks
permalink: /talks/
class: talks-page
lead: Conference and workshop presentations on defense procurement, European defense discourse, and defense innovation.
description: Conference presentations and talks by Mümin Ahmedoğlu.
banner: /images/speaking.jpg
banner_webp: /images/speaking.webp
banner_alt: Mümin Ahmedoğlu speaking at a podium
banner_position: 35% 30%
---

<div class="talk-list">
{%- assign _talks = site.talks | sort: "date" | reverse -%}
{%- for t in _talks %}
{% include talk-item.html t=t %}
{%- endfor %}
</div>
