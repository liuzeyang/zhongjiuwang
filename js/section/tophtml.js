define(["jquery"], function($) {
	 return function(){
		$(".dropdown").on("mouseenter", function() {
			$(this).addClass("hover")
		})
		$(".dropdown").on("mouseleave", function() {
			$(this).removeClass("hover")
		})
		$(".item").on("mouseenter", function() {
			$(this).addClass("hover")
		})
		$(".item").on("mouseleave", function() {
			$(this).removeClass("hover")
		})
		 $(".right-side-menu").find("i").not($(".cart")).on("mouseenter",function(){
		 	$(this).css({background:"#e3393c"}).next("span").css({display:"block",}).animate({
		 		right:40,
		 		opacity:1
		 	})
		 })
		 $(".side-cart").on("mouseenter",function(){
		 	$(this).css({background:"#e3393c"})
		 })
		 $(".right-side-menu").find("i").not($(".cart")).on("mouseleave",function(){
		 	$(this).css({background:"#2a2a2a"}).next("span").css({display:"block",}).animate({
		 		right:60,
		 		opacity:0
		 	})
		 })
		 $(".side-cart").on("mouseleave",function(){
		 	$(this).css({background:"#2a2a2a"})
		 })
		 //边框显示
		 $("#right_cart").on("mousedown", function(e) {
				e.stopPropagation()
				$(".side-content").show()
				$(".right-side").css({
					right: -200
				}).animate({
					right: 0
				}, 300)
			})
			var count = $.cookie('goods');
			$(".count").text(count);
			$(".s-num span").text(count);
			$("#shopping-amount").text(parseInt(count));
			$(".s-g-price").text(parseInt(count)*599);
			$(".cart-shop-price").text(parseInt(count)*599);
			$("#s-total-money").text(parseInt(count)*599);
			$(".s-total-num").text(count);
			$(".checkall").click(function(){
				if($(".checkall").attr("checked")=="checked"){
					$(".cart-list").find("input").attr("checked","checked")
				}else{
					$(".cart-list").find("input").removeAttr("checked")
				}
			})
	 }	
})