# ahmedoglu.github.io

Personal academic website of **Mümin Ahmedoğlu**: <https://ahmedoglu.github.io>

The site is built by GitHub Pages with Jekyll. Every change you commit to the
`master` branch goes live automatically after 1–2 minutes. You can edit
everything directly on github.com: open a file, click the pencil icon, edit,
and commit.

## Where things live

| To change…                        | Edit this file or folder                  |
|-----------------------------------|-------------------------------------------|
| Bio and research-interest tags    | `_pages/about.md` (the home page)         |
| News on the home page             | `_data/news.yml`                          |
| Name, title, email, profile links | `_config.yml` (the `author` and `profiles` sections) |
| Publications and working papers   | `_publications/` (one file per paper)     |
| Talks                             | `_talks/` (one file per talk)             |
| Essays                            | `_posts/` (one file per essay)            |
| Substack posts listed on the site | `_data/substack.yml`                      |
| Research page text and projects   | `_pages/research.md`                      |
| CV                                | `_pages/cv.md`                            |
| Menu                              | `_data/navigation.yml`                    |
| Essay topics (filters)            | `_data/topics.yml`                        |
| Colors and design                 | `assets/css/site.css` (color tokens at the top) |

## Add an essay

Create a file in `_posts/` named `YYYY-MM-DD-short-title.md`, for example
`_posts/2026-10-02-defence-budgets-after-2025.md`. The part after the date
becomes the address: `/writing/defence-budgets-after-2025/`.

```markdown
---
title: "Defence Budgets After 2025"
date: 2026-10-02
topics: [Defense economics, Europe]
tags:
  - Defense Budget
  - NATO
---

Your text in Markdown. Use ## for section headings; essays with three or
more sections get an automatic "On this page" menu.
```

Topics must match the names in `_data/topics.yml`. Add `lang: tr` for an essay
in Turkish. To add images, drag them into the GitHub editor window.

## List a new Substack post

Posts from the newsletter *Defense Economics Notes* are not copied into the site.
The Writing page and the home page list them next to the essays and link to
Substack. To add one, put an entry at the top of `_data/substack.yml`:

```yaml
- title: "Title of the Post"
  subtitle: "The subtitle shown on Substack"
  date: 2026-10-05
  url: https://ahmedoglu.substack.com/p/title-of-the-post
  minutes: 8                      # optional reading time
  topics: [Defense economics]     # optional, from _data/topics.yml
```

If an essay exists both here in `_posts/` and on Substack, keep it in `_posts/`
only and add `substack: https://ahmedoglu.substack.com/p/…` to its front matter.
The essay page then links to the Substack version.

## Add a publication or working paper

Create a file in `_publications/`, for example `_publications/eu-procurement-coordination.md`.
It appears on the Research page, on the CV, and on its own page at
`/research/eu-procurement-coordination/`.

```markdown
---
title: "Title of the Paper"
authors: [Mümin Ahmedoğlu, Co Author]
date: 2026-10-01
category: working        # journal, working, chapter, thesis, or project
venue: Journal Name      # for journal articles
status: Under review at *Journal Name*   # optional; *…* shows in italics
doi: 10.1234/abcd        # optional
pdf: /files/paper.pdf    # optional; put the PDF in the files/ folder
slides:                  # optional link
featured: true           # optional; shows it on the home page
keywords: [Defense procurement, EDF]
---

The abstract goes here.
```

A citation (APA) and a BibTeX entry are generated automatically from these
fields. When a working paper is published, change `category` to `journal` and
add `venue` and `doi`.

## Add a talk

Create a file in `_talks/`, for example `_talks/ices-2027.md`:

```markdown
---
title: "Title of the Talk"
type: Conference presentation
event: Name of the Conference
host: Host University
location: City, Country
date: 2026-06-20                      # used for sorting
when: June 20–22, 2026                # optional; shown instead of the date
link: https://conference-website.org  # optional event page
link_label: Conference programme      # optional button text (default: Event page)
slides: /files/slides-ices-2026.pdf   # optional
paper: /research/some-paper/          # optional link to a related paper
---

A short description. Photos dragged into the editor appear as a gallery.
```

## Add a news item

Add an entry at the top of `_data/news.yml`, keeping the indentation:

```yaml
- date: 2026-10-01
  text: Started a research stay at … (Markdown works here)
  link: https://example.org   # optional
```

## Update the CV

`_pages/cv.md` is plain Markdown. Each `###` line is an entry, and the line
directly below it is its grey details line, where you can add years:

```markdown
### Doctoral Researcher
University of Vienna · Vienna, Austria · 2025–present
```

Publications, working papers, and talks are filled in automatically. To offer
a PDF of your CV, upload it as `files/cv.pdf` and set `cv_pdf: /files/cv.pdf`
in `_config.yml`. Visitors can also use the "Print or save as PDF" button.

## Add teaching

Add one file per course to `_teaching/`, for example
`_teaching/2027s-game-theory.md`. It appears on the Teaching page and in the CV.

```markdown
---
title: "Game Theory (BA)"
role: Lecturer
term: Summer 2027
institution: University of Vienna
details: Bachelor in Economics · Course 040123 · 4 ECTS · English
date: 2027-03-01
link: https://ufind.univie.ac.at/en/course.html?lv=040123&semester=2027S
---

One or two sentences about the course.
```

`date` only sets the order, newest first. To hide the Teaching page and its
menu link, set `published: false` in `_pages/teaching.md`.

## Visitor statistics

The site counts visits with GoatCounter. It uses no cookies and stores no
personal data, so no cookie banner is needed. See countries, browsers,
operating systems, referring sites, and popular pages at
<https://ahmedoglu.goatcounter.com>. To stop counting your own visits, open
<https://ahmedoglu.github.io/#toggle-goatcounter> once in each browser you use.
To switch counting off, empty `goatcounter:` under `analytics:` in `_config.yml`.

## Old addresses

The site was redesigned in September 2026. Every old address, such as
`/posts/2012/08/blog-post-26/` or `/publication/2009-10-01-paper-title-number-10`,
redirects to its new page through the `redirect_from` lines in each file.
Please keep those lines.

## Preview on your computer (optional)

Install Ruby 3.3 (`brew install ruby@3.3`), then in this folder:

```bash
bundle install
bundle exec jekyll serve
```

and open <http://localhost:4000>. The `Gemfile` uses the same `github-pages`
gem as GitHub, so the preview matches the live site.

---

© Mümin Ahmedoğlu. The texts, papers, and photos on this site are the author's own work.
