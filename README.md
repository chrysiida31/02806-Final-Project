# 02806 Final Project - Copenhagen’s Changing Population

This repository contains our final project submission for **02806 Social Data Analysis and Visualization** at DTU.

The project investigates how Copenhagen’s population changed between 1995 and 2025, with a particular focus on internationalisation, district-level demographic differences, spatial patterns, clustering, and long-term development trends.

---

# Authors & Contributions

| Name | Contribution | ID |
|---|---|---|
| Chrysiida Drakopoulou | Narrative structure, data cleaning/preprocessing, exploratory analysis, website writing, GitHub Pages deployment, and interpretation of demographic trends | s243574 |
| Nicola Davalli | Interactive visualization development, geographic maps, clustering visualizations, and figure export/integration | s253463 |
| Sammy Chauhan | Forecast modelling, statistical analysis, notebook structuring, and final review/editing | s191181 |

---

# Motivation

Copenhagen is frequently described as one of Europe’s most livable cities, but aggregate rankings hide substantial demographic differences across neighbourhoods.

Over the last 30 years, Copenhagen became both larger and more international. However, this transformation did not occur evenly across the city’s districts. Some neighbourhoods experienced rapid demographic change, while others remained comparatively stable.

The goal of this project is to explore:

- how Copenhagen’s population changed from 1995–2025,
- where internationalisation was strongest,
- how neighbourhood trajectories differ,
- and how demographic change relates to spatial and socioeconomic patterns.

Rather than relying on politically loaded administrative labels, the analysis focuses directly on measurable demographic indicators such as ancestry shares, population growth, and district-level development.

---

# Dataset

The project combines multiple datasets from **Statistics Denmark** and **Copenhagen Municipality**.

Main datasets include:

- District-level population counts by ancestry group
- Country-of-origin population statistics
- District-level demographic development
- Income statistics by ancestry category
- Geographic district coordinates for mapping

The district-level dataset spans:

- **1995–2025**
- annual temporal resolution
- all 10 major Copenhagen boroughs

This long time horizon makes it possible to study gradual urban demographic transformation rather than short-term fluctuations.

---

# Goal of the Website

The website was designed for a non-technical audience.

The objective was to create a narrative-driven data story where readers can:

- explore how their district changed over time,
- compare neighbourhood trajectories,
- interact with maps and visualizations,
- and understand Copenhagen’s demographic development without needing technical background knowledge.

The technical details, modelling, preprocessing, and methodology are documented separately in the explainer notebook.

---

# Repository Structure

```text
02806-Final-Project/
├── data/                 # Cleaned datasets
├── notebooks/            # Jupyter notebook analysis
├── docs/                 # GitHub Pages website
│   ├── index.html
│   ├── images/
│   ├── maps/
│   └── reports/
├── build_html.sh         # Notebook-to-HTML conversion script
├── README.md
└── .gitignore
```

---

# Website

GitHub Pages website:

https://chrysiida31.github.io/02806-Final-Project/

# Live Data Story

[View the project website](https://chrysiida31.github.io/02806-Final-Project/)

---

# Explainer Notebook

The notebook contains:

- data cleaning and preprocessing,
- exploratory analysis,
- clustering analysis,
- forecasting models,
- visualization generation,
- methodological discussion,
- and narrative design choices.

The notebook HTML export is available in:

```text
docs/reports/copenhagen_full_analysis.html
```

---

# Main Findings

- Copenhagen experienced sustained population growth between 1995 and 2025.
- Internationalisation increased across all districts, but unevenly.
- Brønshøj-Husum, Bispebjerg, and Amager Vest experienced some of the strongest demographic changes.
- The city’s foreign-origin population became increasingly diverse over time.
- Highly international districts were not necessarily economically declining districts.
- Clustering analysis identified distinct neighbourhood development trajectories across Copenhagen.
- Forecast models suggest continued demographic divergence if current trends persist.

---

# Visual Narrative & Storytelling

The project follows a **martini-glass narrative structure** (Segel & Heer, 2010):

1. A guided narrative introduces the reader to the main findings,
2. followed by interactive visualizations that allow independent exploration.

Visual storytelling tools used include:

- annotated line charts,
- interactive hover-based exploration,
- geographic maps,
- animated temporal visualizations,
- clustering diagrams,
- and comparative bar charts.

The structure was chosen to balance accessibility for general readers with analytical depth.

---

# Technologies Used

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Plotly
- Folium
- Scikit-learn
- Jupyter Notebook
- GitHub Pages

---

# Building the Notebook HTML

To regenerate the notebook HTML export:

```bash
jupyter nbconvert --to html notebooks/*.ipynb --output-dir docs/reports
```

---

# References

- Statistics Denmark StatBank. Population, ancestry, and income datasets used throughout the analysis.  
  https://www.statbank.dk/statbank5a/default.asp?w=1536

- Musterd, S., Marcińczak, S., van Ham, M., & Tammaru, T. (2017).  
  *Socioeconomic segregation in European capital cities: Increasing separation between poor and rich.*  
  Urban Geography.  
  https://www.tandfonline.com/doi/full/10.1080/02723638.2016.1228371

- OECD. (2018).
  *Divided Cities: Understanding Intra-urban Inequalities.*  
  OECD Publishing.  
  https://www.oecd.org/publications/divided-cities-9789264300385-en.htm

- Florida, R. (2017).  
  *The New Urban Crisis: How Our Cities Are Increasing Inequality, Deepening Segregation, and Failing the Middle Class-and What We Can Do About It.*  
  Basic Books.  
  https://www.researchgate.net/publication/327796430_Richard_Florida_The_new_urban_crisis_how_our_cities_are_increasing_inequality_deepening_segregation_and_failing_the_middle_class-and_what_we_can_do_about_it_Basic_Books_2017_USD_2000_352pp_ISBN_978-0-

- Massey, D. S. (1996).  
  *The age of extremes: Concentrated affluence and poverty in the twenty-first century.*  
  Demography, 33(4), 395–412.  
  https://www.jstor.org/stable/2061773

- Segel, E., & Heer, J. (2010).  
  *Narrative Visualization: Telling Stories with Data.*  
  IEEE Transactions on Visualization and Computer Graphics.  
  https://ieeexplore.ieee.org/document/5613452