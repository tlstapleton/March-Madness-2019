var champions = []
var titles = []
// console.log(teams);
function buildChampCharts() {

   d3.csv(teamsfile, function(data) {
   data.forEach(function(d) {
   champions.push(d.champion)
   titles.push(d.year)
   console.log(data);
   });

   var trace1 = [
       {
       x: champions,
       y: titles,
       mode: "markers",
       text: champions,
       type: 'bar',
       marker: {
         color: "B6BC54",
         size: 1500,
         colorscale: "Viridis",
         text: [champions, titles]
       }
   }]

  var layout1 = {
       title: "NCAA Champions",
       xaxis: { title: "School" },
       yaxis: { title: "Number of titles" }
     };

   Plotly.newPlot("bar1", trace1, layout1);




}
   )};

var coaches = []
var championships = []

function buildCoachCharts() {

   d3.csv(coachesfile, function(data) {

   data.forEach(function(d) {
   coaches.push(d.coach)
   championships.push(d.champion)
   });

   var trace1 = [
       {
       x: coaches,
       y: championships,
       mode: "markers",
       text: coaches,
       type: 'bar',
       marker: {
         color: "2217F9",
         size: 1500,
         colorscale: "Viridis"
       }
   }]

   var layout2 = {
       title: "NCAA Champion Coaches",
       yaxis: { title: "Number of titles" }
     };

   Plotly.newPlot("bar2", trace1, layout2)
}
   )};


   var years = []
   var totalPoints = []

   function buildPointsGraph () {

       d3.csv(winnersfile, function(data) {
           console.log(data)

       data.forEach(function(d) {
       years.push(d.year)
       totalPoints.push(d.total_points)
       });

       totalPoints = totalPoints.reverse()
       years = years.reverse()
       console.log(years, totalPoints)

           var trace1 = {
               x: years,
               y: totalPoints,
               mode: 'markers',
               marker: {
                   color: 'blue',
                   size: 12
               }
           }

       var trace2 = {
           x: years,
           y: championships,
           mode: 'lines',
           line: {
             color: 'rgb(55, 128, 191)',
             width: 3
           }
         };

       var layout = {
           title: "Total Points in NCAA Final",
           yaxis: { title: "Total Points" },
           marker: {
               color: 'rgb(219, 64, 82)',
               size: 12
           }

       };

       Plotly.newPlot("linegraph", [trace1, trace2], layout)
   }
       )};



buildChampCharts();
buildCoachCharts();
buildPointsGraph();