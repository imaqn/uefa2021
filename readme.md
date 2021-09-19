# Unofficial 2021 UEFA website

A static web that show teams, standings and schedules of UEFA Championship. 
API Source: [football-data.org](https://www.football-data.org/)

## Description
1. A PWA
2. Built using Materialize CSS and Vanilla JS
3. Can be used offline by use dynamic caching with workbox
4. Can save information about favorite teams using Indexed DB

## Usage

Create account at [football-data.org](https://www.football-data.org/) to get your token. 
Change the value of HTTP Header's X-Auth-Token at directory [api](/js/api.js).
You can try to running the app by using VS Code Live Server Extensions.

## Deployment

The app has been deployed at [Unofficial UEFA 2021](https://unofficialuefa2021.netlify.app/)