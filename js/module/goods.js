require(["../model/config"], function() {
	require(["jquery", "tophtml", "jqueryui"], function($, top, ui) {
		$("#top").load("sub/tophtml.html", function() {
			top();
			var t;
			$(".mc").hide();
			$(".cate-all").mouseenter(function() {
				$(".mc").show();
			})
			$(".cate-all").mouseleave(function() {
				t = setTimeout(function() {
					$(".mc").hide();
				}, 300)
			})
			$(".mc").mouseenter(function() {
				clearTimeout(t);
				$(".mc").show();
			})
			$(".mc").mouseleave(function() {
				$(".mc").hide();
			})
		});
		
		
        $("#goods").load("sub/goods.html",function(){
        	
        })
        
        
		$("#foot").load("sub/foothtml.html")
	})
})