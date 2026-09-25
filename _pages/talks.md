---
title: Talks
permalink: /talks/
class: talks-page
lead: Conference and workshop presentations on defense procurement, European defense discourse, and defense innovation.
description: Conference presentations and talks by Mümin Ahmedoğlu.
---

<div class="talk-list">
{%- assign _talks = site.talks | sort: "date" | reverse -%}
{%- for t in _talks %}
{% include talk-item.html t=t %}
{%- endfor %}
</div>
