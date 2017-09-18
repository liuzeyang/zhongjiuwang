define(["jquery", "swiper", "template"], function($, swp, tem) {
	return function(success) {
		//字符串模板
		$.getJSON("../json/jiuyuehot.json", function(data) {
			$(".floor1-bottom").html(tem("retui", data))
		})
		//floors
		$.getJSON("../json/floor1.json", function(data) {
			$(".floor1").html(tem("helpyou", data))
		})
		$.getJSON("../json/floor1.json", function(data) {
			$(".floor2").html(tem("helpyou", data))
		})
		$.getJSON("../json/floor1.json", function(data) {
			$(".floor3").html(tem("helpyou", data))
		})
		$.getJSON("../json/floor1.json", function(data) {
			$(".floor4").html(tem("helpyou", data))
		})
		setTimeout(function() { //--------------加载模板 需要时间 问老师需要
			success();
		}, 300)
		
		var $floornav = $(".floornav").find("a");
		$(window).scroll(function() {
			var _scrolltop = $(window).scrollTop();
			if(_scrolltop > 1017 && _scrolltop < 4517) {
				$(".floornav").fadeIn();
			} else {
				$(".floornav").fadeOut()
			}
			if(_scrolltop > 1017 && _scrolltop < 1887) {
				$($floornav[0]).addClass("over").find("em").css({
					display: "none"
				})
				$($floornav[0]).parent().siblings().find("a").each(function(index,item){
					$(item).removeClass("over").find("em").css({
					display: "block"
				})
				})
				
			} else if(_scrolltop > 1887 && _scrolltop < 2587) {
				$($floornav[1]).addClass("over").find("em").css({
					display: "none"
				})
				$($floornav[1]).parent().siblings().find("a").each(function(index,item){
					$(item).removeClass("over").find("em").css({
					display: "block"
				})
				})
			} else if(_scrolltop > 2587 && _scrolltop < 3387) {
				$($floornav[2]).addClass("over").find("em").css({
					display: "none"
				})
				$($floornav[2]).parent().siblings().find("a").each(function(index,item){
					$(item).removeClass("over").find("em").css({
					display: "block"
				})
				})
			} else if(_scrolltop > 3387 && _scrolltop < 4587) {
				$($floornav[3]).addClass("over").find("em").css({
					display: "none"
				})
				$($floornav[3]).parent().siblings().find("a").each(function(index,item){
					$(item).removeClass("over").find("em").css({
					display: "block"
				})
				})
			}
		})

		$floornav.on("mousedown", function() {
            var index=$(this).attr("index");
            switch (index){
            	case "0" : $("html,body").animate({scrollTop:1328});break
            	case "1" : $("html,body").animate({scrollTop:2072});break
            	case "2": $("html,body").animate({scrollTop:2820});break
            	case "3": $("html,body").animate({scrollTop:3565});break
            }
		})
		$floornav.on("mouseenter", function() {
			$(this).addClass("over").find("em").css({
				display: "none"
			})
		})
		$floornav.on("mouseleave", function() {
			$(this).removeClass("over").find("em").css({
				display: "block"
			})
		})
		//切换heading
		//moveimg
		$(".moveimg").on("mouseenter", function() {
			$(this).animate({
				left: -10,
				opacity: 1
			}, 500)
		})
		$(".moveimg").on("mouseleave", function() {
			$(this).animate({
				left: 0,
				opacity: 0.9
			}, 500)
		})

	}
})