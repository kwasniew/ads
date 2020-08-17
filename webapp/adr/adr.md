1) API URL config for the ads mock server
* for now I host it within my webapp to avoid base url config issue

2) I keep the webapp extremely simple on purpose. I want to spend the 3 hours wisely on the
backend part that seems to be the main part of the exercise. 

3) To make it visually pleasing I'm using a webapp template from tachyons  

4) I'm using ES5 to avoid transpilation. For fetch and sendBeacom I'm using polyfill IO


5) Minification bundling in netlify 

6) URLSearchParams buggy in chrome

7) Evn specific vars:
Showing two options:
* ad loader mock hosted withing the app so relative URLs works
* env specific build for the ad tracker API. Netlify sets ad tracker URL 

More: https://www.freecodecamp.org/news/environment-settings-in-javascript-apps-c5f9744282b6/