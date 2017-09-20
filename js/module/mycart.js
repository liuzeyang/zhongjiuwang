require(["../model/config"],function(){
	require(["jquery"],function($){
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
		 $("i:lt(6)").mouseenter(function(){
		 	$(this).animate({
		 		opacity:0.7
		 	},500)
		 })
		 $("i:lt(6)").mouseleave(function(){
		 	$(this).animate({
		 		opacity:0
		 	},400)
		 })
	})
})