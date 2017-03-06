module.exports = (function(){
  var data = [ 
      {expense: 10, category: "Retail"},
      {expense: 15, category: "Gas"},
      {expense: 30, category: "Retail"},
      {expense: 50, category: "Dining"},
      {expense: 80, category: "Gas"},
      {expense: 65, category: "Retail"},
      {expense: 55, category: "Gas"},
      {expense: 30, category: "Dining"},
      {expense: 20, category: "Retail"},
      {expense: 10, category: "Dining"},
      {expense: 8, category: "Gas"}
    ];
	return {
       init:function(selector){
       	 d3.select(selector)
       	 .append('div')
       	 .append('h1')
       	 .text("d3js experments starts");

         d3.select(selector).selectAll("div.h-bar")
         .data(data)
         .enter()
         .append("div")
         .attr("class", "h-bar")
         .append("span"); 

         d3.select(selector).selectAll("div.h-bar") // <-C
        .data(data)
        .exit().remove();


        d3.select(selector).selectAll("div.h-bar") // <-D
        .data(data)
        .attr("class", "h-bar")
        .style("width", function (d) {
          return (d.expense * 5) + "px";
        })
        .select("span")
        .text(function (d) {
          return d.category;
        });
      }   
	}
})();