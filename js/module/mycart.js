require(["../model/config"], function() {
	require(["jquery", "template", "jqcookie", "jqueryui"], function($, tem, cookie, ui) {
		var t = setInterval(function() {
			var coo = $.cookie("user");
			if(coo == null) {
				return
			} else {
				clearInterval(t);
				console.log(coo)
				$(".login-regin").html("<span>" + coo + "<span>")
			}
		}, 3000)
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
		$(".right-side-menu").find("i").not($(".cart")).on("mouseenter", function() {
			$(this).css({
				background: "#e3393c"
			}).next("span").css({
				display: "block",
			}).animate({
				right: 40,
				opacity: 1
			})
		})
		$(".side-cart").on("mouseenter", function() {
			$(this).css({
				background: "#e3393c"
			})
		})
		$(".right-side-menu").find("i").not($(".cart")).on("mouseleave", function() {
			$(this).css({
				background: "#2a2a2a"
			}).next("span").css({
				display: "block",
			}).animate({
				right: 60,
				opacity: 0
			})
		})
		$(".side-cart").on("mouseleave", function() {
			$(this).css({
				background: "#2a2a2a"
			})
		})
		$("i:lt(6)").mouseenter(function() {
			$(this).animate({
				opacity: 0.7
			}, 500)
		})
		$("i:lt(6)").mouseleave(function() {
			$(this).animate({
				opacity: 0
			}, 400)
		})
		var count = $.cookie('goods');
		$("#lala").html(tem("count"));
		$(".quantity-text").val(count);
		$("#selectedCount").text(count);
		var allprice = parseInt($(".price").text().replace("¥", "")) * parseInt(count);
		$("#finalPrice").text("￥" + allprice)
		$(".jian").click(function() {
			//console.log($(".quantity-text").val())
			if(parseInt($(".quantity-text").val()) == 0) {
				return
			} else {
				$(".quantity-text").val(parseInt($(".quantity-text").val()) - 1);
				allprice = parseInt($(".price").text().replace("¥", "")) * parseInt($(".quantity-text").val());
				$("#finalPrice").text("￥" + allprice);
				$("#selectedCount").text($(".quantity-text").val());
				var count = $(".quantity-text").val()
				$.cookie("goods", count, {
					Path: '/'
				})
			}
		})
		$(".jia").click(function() {
			$(".quantity-text").val(parseInt($(".quantity-text").val()) + 1);
			allprice = parseInt($(".price").text().replace("¥", "")) * parseInt($(".quantity-text").val());
			$("#finalPrice").text("￥" + allprice);
			$("#selectedCount").text($(".quantity-text").val());
			var count = $(".quantity-text").val()
			$.cookie("goods", count, {
				Path: '/'
			})
		})
		//$("#dialog").hide()
		$(".cart-remove").click(function(e) {
			$("#dialog").dialog("open");
			e.preventDefault();
		})
		$("#dialog").dialog({
			autoOpen: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"确认删除": function() {
					$(this).dialog("close");
					$("#product-1-3568").remove()
					//console.log($(".item").length)
					if($(".item").length == 0) {
						$(".message").show().siblings().hide()
					}
				},
				"取消": function() {
					$(this).dialog("close");
				}
			}
		});

	})
})