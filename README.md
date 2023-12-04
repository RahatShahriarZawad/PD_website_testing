# Lower arm movement data collection website for Parkinson's Disease. 
### Website Available [Here](https://skparab1.github.io/pd)

# Overview
- Website collects demographic data of the patient
- Website conducts computer mouse movement and keyboard tapping tests to measure arm movement
- When tests have finished, website sends data to a database

# Code setup
- Uses HTML and CSS for user interface
- Uses JS for data collection
- Uses HTML Canvas to draw tracing lines and keypress cues

# File setup
  - index.html: redirects to /src/index.html
  - /src: contains all the html files
    - about.html: gives information about website and study
    - collectinfo.html: html form to collect information and send to database
    - done.html: informs user that they have already completed the test if they have already done so
    - index.html: homepage/intro page
    - keyboard.html: page for keyboard tapping test
    - mouse.html: page for mouse movement test
  - /css: contains all css files
    - styles.css: main css file
    - utility.css: secondary css file
  - /js: contains all js files
    - collector.js: manages html for data collection for collectinfo.html, manages sending data to database
    - keyboard.js: runs keyboard tapping test for keyboard.html
    - mouse.js: runs mouse movement test for mouse.html
  - /assets: contains all assets
    - logo.png: UH Manoa letterhead for homepage
   
# Website Hosting
  - This website is hosted using Github pages at [https://skparab1.github.io/pd](https://skparab1.github.io/pd)

# Data storage
  - Data is transmitted through a custom built API hosted on Deta Space Micros [learn more](https://deta.space/docs/en/build/fundamentals/the-space-runtime/micros/)
    - API built using node.js, receives data through string query and writes to database
    - Data is writted by website 3 seperate times: when user completes demographics form, when user completes mouse movement test, and when use completes keyboard tapping test.
  - Data is stored in a Deta Space Collections Base [learn more](https://deta.space/docs/en/build/fundamentals/data-storage)
    - Key value database
    - Each stores feature is a column, each set of rows is a participant
  - When reading data for analysis, there is an endpoint from which the JSON for each participant can be fetched.

# Current Data
  - Data Collected from the first run of this study is available at [https://github.com/skparab2/Parkinsons_movement_tests_dataset](https://github.com/skparab2/Parkinsons_movement_tests_dataset)
