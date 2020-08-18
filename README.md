## Getting started (MacOS/Linux)

* install Node.js (14+)
* `./install` - installs deps and runs tests
* `./start` - starts `webapp` and `ad-tracker` in two subshells
* Go to http://localhost:3001/ to open a `webapp`
* Go to http://localhost:3000/ to open `ad-tracker` landing page

For Windows users repeat the steps from `install` and `start` scripts manually.


## Actual deployment

`webapp`: https://web-ads.netlify.app/ (make sure to disable your adblock)

`ad-tracker`: https://adtracker.herokuapp.com/ (this app needs about 30 second to wake up after the first access and
cleans database after each deployment)

## Diagrams and Architecture Decision Records (ADRs)

Digrams and ADRs are [here](adr)