Project 3: Data Visualization Track
Team 6 - Dr. John
Title: Granular Analysis of Driver Performance Metrics by Race Characteristics
Sub-Title: Formula One Driver & Race Results 2014 to 2019

This readme file contains:

    -An overview of the project and its purpose

    -Instructions on how to use and interact with the project

    -A summary of ethical considerations made for the project

    -References for the data source(s)

    -References for any code used that is not your own

Overview:
Formula One (F1) is the highest class of open-wheeled auto racing defined by the Fédération Internationale de l'Automobile (FIA), motorsport's world governing body. Due to the nature of the sport, motor racing is an inherently risky activity with drivers prone to high rates of incidence of morbidities. Formula One racing continues to grapple with a persistently high rate of incidents on track, which can lead to morbidity or mortality among drivers and other stakeholders. 

Despite advancements in safety technology and regulations, these incidents remain a significant concern, posing risks to the well-being of drivers and the integrity of the sport.

Purpose:
This project aims to leverage accessible data and develop innovative tools to enhance safety awareness and mitigate risks in Formula One racing.

FORM1 is an is an interactive dashboard based on Formula One timing and static data. 

Its principal aim is to provide an overview of which track characteristics affect driver performance, whilst allowing the user to probe the data and explore the differences in performance across track locations.

In particular, FORM1 will consider data such as Did Not Finish (DNFs) results, in which a driver was unable to complete the race. Reasons for DNFs vary, but are primarily accidents and/or mechanical failures. While our data included the number of accidents and failures per driver per season, it did not specify in which race the accident or failure occurred. Our data did note which driver had a DNF for a particular race. However, it is possible for a driver to have an accident or failure and recover and still finish the race. In our view, these metrics represent the possibility of health hazards to drivers--any reason for a DNF, including accidents or failures, means the driver was in a position of potential danger (a collision, a stalled vehicle next to racecars going hundreds of kilometers per hour, etc.). Put simply, any incident on a track as perilous as an F1 track could potentially be fatal, so we believe using these three metrics effectively corresponds to driver safety.

To add to our analysis, we looked to see if external conditions could affect driver safety, i.e., the number of DNFs, accidents, or failures. In particular, we examined if weather on the day of the race could have caused more incidents. If so, F1 would need to add additional safety enhancements to cars and drivers based on weather conditions.

Instructions for Use:
To view the interactive applications, please visit our Git Pages links. There are two pages, one with JavaScript-enabled HTML charts and another page with an interactive JavaScript- and Leaflet-enabled map.

On the graphs page, select the season from the dropdown menu. Many of the charts will update automatically to reflect the data of the selected season. The seasons are from the period available in our dataset.

On the map page, view locations of F1 tracks around the world on a world map. You can click on the circle markers to view some race data for each location. Use the checkboxes in the map control to select which season to view. The size and color of the markers represent the number of DNF results from the race.

Ethical Considerations:
Formula One is a popular sport worldwide with many fans who have collected their own data on races and drivers. The FIA does release its own metrics, which fans have taken and adapted for their own use, particularly to create datasets, either static ones or dynamic ones such as with an API. Because Formula One is very much in the public eye, and all data are collected from public observations or from official sources, we did not feel there were any ethical issues with collecting and using the data. Of the data we did collect, all were available for free and to the public.

While some of the data specifically refers to individuals--that is, the drivers--we again believe that because they are public figures participating in a public sport, data on their activities while performing the sport are acceptable to use. Of course, health and safety data of individuals should be protected, and we value the privacy of the drivers. The data did not include any personal health information of the drivers. Any personal identifiable information included driver IDs and names, the first of which were created for the dataset and the second of which are widely and publicly available.

Data on driver and team standings could perhaps be used to gain a competitive advantage on other racing teams. However, due to the public nature of the races and data, and because we are not associated with any racing team, we feel this is not a concern.

Data Sources:
While there is a wealth of F1 race data, most comes from one source: the Ergast API (http://ergast.com/mrd/), an unofficial collection of race info giving race and driver metrics.

Our main data set came from the F1 Timing Data GitHub repo (https://github.com/TUMFTM/f1-timing-database), an F1 fan’s own collection of data using additional accident and failure data not from the Ergast API.

Weather data came from Open Weather Map’s One Call API 3.0 (https://openweathermap.org/api/one-call-3), which lets users call historical weather data based on timestamps (the race date timestamps were part of the above data).

Code Sources:
The majority of the code is our own. Some code help came from AI chatbots such as ChatGPT and Xpert Learning Assistant. Other code snippets and suggestions came from Stack Overflow. Some code came directly from documentation of the languages and libraries we used (primarily JavaScript, Leaflet, Python, Pandas, HTML, and SQL or Postgresql). Class assignments or challenges also provided direction and example code. In general, we used outside sources to test ideas, confirm assumptions, and learn new methods, which allowed us to better write our own code and cross the finish line.


[View Accidents Graph](accidents_index.html)


