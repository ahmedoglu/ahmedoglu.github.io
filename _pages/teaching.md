---
title: Teaching
permalink: /teaching/
# Add one file per course to _teaching/ (see README.md). Set "published: false"
# here to hide this page and its menu link.
published: true
lead: Courses I teach at the University of Vienna.
description: Courses taught by Mümin Ahmedoğlu at the University of Vienna.
---

<div class="pub-list">
{%- assign _courses = site.teaching | sort: "date" | reverse -%}
{%- for c in _courses %}
<article class="pub">
  <p class="pub-kicker"><span class="badge">{{ c.role | default: "Teaching" }}</span><span class="pub-year">{{ c.term }}</span></p>
  <h3 class="pub-title">{% if c.link %}<a href="{{ c.link }}">{{ c.title }}</a>{% else %}{{ c.title }}{% endif %}</h3>
  <p class="pub-authors">{{ c.institution }}{% if c.details %} · {{ c.details }}{% elsif c.level %} · {{ c.level }}{% endif %}</p>
  <div class="prose prose-sm">{{ c.content }}</div>
  {%- if c.link %}
  <div class="pub-actions"><a class="pill" href="{{ c.link }}">Course page{% include icon.html name="external" %}</a></div>
  {%- endif %}
</article>
{%- endfor %}
</div>
