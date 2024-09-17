<!-- toc -->
## Table of Content
- [SERVIR PORTALS](#servir-portals)
- [1. Artisanal Small-scale Mining Monitoring Service](#1-artisanal-small-scale-mining-monitoring-service)
  - [1.1. Introduction](#11-introduction)
    - [1.1.1. Portal](#111-portal)
    - [1.1.2. Scripts and Methodology](#112-scripts-and-methodology)
- [2. Charcoal Production Monitoring Service](#2-charcoal-production-monitoring-service)
  - [2.1. About](#21-about)
    - [2.1.1. Portal](#211-portal)
    - [2.1.2. Scripts and Methodology](#212-scripts-and-methodology)
- [3. LandScape Ghana Portal](#3-landscape-ghana-portal)
  - [3.1. About](#31-about)
    - [3.1.1. Portal](#311-portal)
- [4. Code Installation](#4-code-installation)
  - [4.1. Required](#41-required)
  - [4.2. Installation / Setup](#42-installation--setup)
    - [4.2.1. Local Installation for Development](#421-local-installation-for-development)
- [5. Others](#5-others)
  - [5.1. Tech Stack](#51-tech-stack)
  - [5.2. Useful Links](#52-useful-links)
<!-- tocstop -->

<br>

# SERVIR PORTALS
- [Artisanal Small-scale Mining Monitoring Service](https://ssmportal.cersgis.org/)
- [Charcoal Production Monitoring Portal](https://cpsm.cersgis.org/) 
- [LandScape Ghana Portal](http://landsensegh.cersgis.org/)  


<br><br>

# 1. Artisanal Small-scale Mining Monitoring Service
## 1.1. Introduction
Small-scale mining is an important source of livelihood for areas associated with alluvial gold deposits. 
However, it is also a major driver of freshwater pollution, forest and land degradation, and deforestation, 
not to mention poor worker safety and child labour. 
Despite attempts by regulatory authorities to control galamsey activities, 
it has expanded rapidly with dire consequences including contaminated soils and water bodies.

With the advent of freely available earth observation data and cloud computing resources, 
CERSGIS under the NASA/SERVIR West Africa program since 2018 has explored and developed methodologies based on satellite imageries (Sentinel 1, Sentinel 2, Planet NICFI Monthly Mosaics) to identify and quantify 
the extent of galamsey activities in the high forest zone of Ghana, where these activities are widespread.

The Monitoring of Small-Scale Mining (Galamsey) Sites in Ghana service, 
has a [monitoring platform](https://servir.cersgis.org/map) with information on the location of illegal mining sites across Ghana and their associated land degradation. 
It provides the necessary spatial data input to decision-makers and partners, such as A Rocha Ghana, who will use the information to target areas for remediation and landscape restoration activities. 
It also has a [mobile application](https://play.google.com/store/apps/details?id=org.cersgis.trueking.landscapeghv2&pli=1) for collecting data on the field.

###  1.1.1. Portal
Visit (https://ssmportal.cersgis.org/) to view the portal.

### 1.1.2. Scripts and Methodology
Visit (https://github.com/CERSGIS/Small-Scale-Mining-Sites-Monitoring) to view scripts and methodology.

<br><br>




# 2. Charcoal Production Monitoring Service 

## 2.1. About
The Charcoal Production Site Monitoring Service, a joint initiative of SERVIR-PCU, NASA SCO, AST, A Rocha and CERSGIS to help developing countries use information provided by Earth observing satellites and geospatial technologies for identifying charcoal production sites and associated changes in woody vegetation cover on a regular basis.

The Monitoring Service is a web-based platform for visualizing the spatial distribution of charcoal production sites, thereby facilitating forest degradation monitoring in the study areas. Very high-resolution imagery from Google Earth and remote sensing data from Landsat 7 and Landsat 8 will be used to identify charcoal kilns and the production of tree cover density maps. The information will aid in the monitoring of tree cover loss for estimating carbon emissions and for district-level land use planning purposes.

![SERVIR West Africa - Charcoal Production Site Monitoring System](readMe-Media/charcoal.jpg?raw=true)

### 2.1.1. Portal
Visit (https://cpsm.cersgis.org/) to view the portal.

### 2.1.2. Scripts and Methodology
Visit (https://github.com/CERSGIS/charcoal-production-site-monitoring-service) to view scripts and methodology.

<br><br>




#  3. LandScape Ghana Portal
## 3.1. About
The LandScape protal allows users to view, analyze, and interact with the collected geospatial data from the [GeoSacpe app](https://play.google.com/store/apps/details?id=org.cersgis.trueking.landscapeghv2&pli=1), offering insights into various datasets gathered in the field. The interface is designed to provide an intuitive and user-friendly experience, where users can easily navigate through different data layers, filter information, and generate reports as needed.

Additionally, the platform offers a public API that enables developers, researchers, and external users to access the data programmatically. This API provides endpoints that allow users to retrieve data in a structured format, enabling seamless integration into their own systems or applications. By using the API, anyone can incorporate the geospatial data into their own projects, whether for analysis, visualization, or other custom use cases.

This ensures flexibility and accessibility for a broad range of users who may wish to utilize the data for various purposes, enhancing the overall utility of the platform.

### 3.1.1. Portal
Visit (http://landsensegh.cersgis.org/) to view the portal.

<br><br>




# 4. Code Installation

## 4.1. Required
- Docker Desktop
- Google Service Account secret key JSON

## 4.2. Installation / Setup

The Servir Portals System can be install and run locally or installed in a Server Environment (Production Deployment).

### 4.2.1. Local Installation for Development
1. To install the project locally requires the installation of the [Docker Application](https://docs.docker.com/desktop/) for Windows, Mac or Linux.
2. Open a terminal (Mac or Linux) or command prompt (Windows) on your computer
3. Navigate to the directory (folder) where you want to clone the repository.
4. Run the command `git clone https://github.com/CERSGIS/CERSGIS-SERVIR-WA-Service-Portals.git`
5. Press Enter. This will start the cloning process and create a copy of the repository on your computer in the current directory.
6. After the clonning process is finished, you will find a new directory named servir-portals. This directory contains the full copy of the repository including all the files.
7. copy the `env.example` and rename it to the `env`.
8. You will need the Google Earth Engine(GEE) Account secret key JSON used for runing GEE scripts.
9. Place the secret key JSON file into a directory named `key.json` in the app/geeAccount directory.
10. Put the path to the Google Service Account secret key JSON into the `SERVICE_ACCOUNT_KEY=` variable in the directory `env/app/.env`. _**Eg**. `SERVICE_ACCOUNT_KEY=app/geeAccount/key.json`_
11. Populate and complete the rest of the Environment Variables in the `env/app/.env`. 
    ```
    DATABASE_HOST=db
    PROJECT_ASSETS=projects/ee-cersgisrsteams/assets/
    ```
12. Populate and complete the rest of the Environment Variables in the `env/db/.env`. **For the Development ONLY** The database connection variables should be the same for the app and the db env's.
13. Populate and complete the rest of the Environment Variables in the `env/pgadmin/.env`.
14. In the terminal or command prompt, run the command `docker compose -f docker-compose.yml up -d`.
15. Press Enter. 

<br><br>




# 5. Others 

## 5.1. Tech Stack

**Web/Desktop Application:** Python, Django 

**Database**: PostgreSQL

**Misc**: Bootstrap, HTML, CSS, JQuery, Font Awesome, Highcharts, Leaflet

<br>

## 5.2. Useful Links
| **Partners** | **Portals** |
| --- | --- |
| - [SERVIR](https://servirglobal.net/) | - [Artisanal Small-scale Mining Monitoring Portal](https://ssmportal.cersgis.org/) |
| - [CERSGIS](https://cersgis.org/) | - [Charcoal Production Monitoring Portal](https://cpsm.cersgis.org/) |
| - [USAID](https://www.usaid.gov/) | - [LandScape Ghana Portal](http://landsensegh.cersgis.org/) |
| - [NASA](https://www.nasa.gov/) |