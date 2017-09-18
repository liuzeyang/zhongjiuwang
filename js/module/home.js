require(["../model/config"], function() {
	require(["jquery", "tophtml", "homebody", "swiper"], function($, top, homebody, swp) {
		$("#top").load("sub/tophtml.html", function() {
			top();
		});
		$("#home").load("sub/homebody.html", function() {
			new Promise(homebody).then(function() { //  需要保证模板加载完成
				$(".floor-hd ul li:first-child").addClass("active");
				$(".floor-hd ul li:not(:last)").on("mouseenter", function() {
					$(this).addClass("active").siblings().removeClass("active");
					var i = $(this).attr("index");
					$($(this).parents(".floor-hd").next(".floor-bd:first").find(".content-right-img")[i]).css({
						display: "block"
					}).siblings().css({
						display: "none"
					});
				})
				//加载轮播图
				var myswiper = new swp(".swiper-container1", {
					autoplay: 3000, //自动播放
					pagination: '.swiper-pagination', //分页器
					effect: 'fade', //效果
					loop: true, //循环
					paginationClickable: true, //分页器控制切换
					paginationHide: false, //分页器隐藏
					autoplayDisableOnInteraction: false,
					onInit: function(swiper) {
						//Swiper初始化了
						//alert(swiper.activeIndex);提示Swiper的当前索引
						$(".swiper-container").on("mouseenter", function() {
							myswiper.stopAutoplay();
						})
						$("#slide img").on("mouseleave", function() {
							myswiper.startAutoplay();
						})
					}
				})
				var floorswiper = new swp(".swiper-container2", {
					effect: 'slide',
					pagination: '.swiper-pagination', //分页器
					loop: true,
					paginationClickable: true, //分页器控制切换
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
				})
				var floorswiper = new swp(".swiper-container3", {
					effect: 'slide',
					pagination: '.swiper-pagination', //分页器
					loop: true,
					paginationClickable: true, //分页器控制切换
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
				})
				$(".floor1-bottom").find("img").on("mouseenter", function() {
					$(this).animate({
						left: -10
					})
				})
				$(".floor1-bottom").find("img").on("mouseleave", function() {
					$(this).animate({
						left: 0
					})
				})


			});
		});
		$("#foot").load("sub/foothtml.html")
		/*function changeimg($item){
			var img=$item.parents(".floor-hd").next(".floor-bd").find("img");
			switch(item.attr("index")){
				case "0": 
				img[15].src=
				break;
			}
		}*/

	})
})