require(["../model/config"], function() {
	require(["jquery", "tophtml", "jqueryui", "template", "jqcookie", "funpara"], function($, top, ui, tem, cookie, para) {
		$("#top").load("sub/tophtml.html", function() {
			top();
			var t = setInterval(function() {
				var coo = $.cookie("user");
				if(coo == null) {
					return
				} else {
					clearInterval(t);
					//console.log(coo)
					$(".login-regin").html("<span>" + coo + "<span>")
				}
			}, 3000)
			var t;
			$(".category .mc").hide();
			$(".cate-all").mouseenter(function() {
				$(".category .mc").show();
			})
			$(".cate-all").mouseleave(function() {
				t = setTimeout(function() {
					$(".category .mc").hide();
				}, 300)
			})
			$(".category .mc").mouseenter(function() {
				clearTimeout(t);
				$(".category .mc").show();
			})
			$(".category .mc").mouseleave(function() {
				$(".category .mc").hide();
			})
		});

		function offsetPage(obj) {
			var _left = obj.offsetLeft;
			var _top = obj.offsetTop;
			while(obj.offsetParent) {
				_left += obj.offsetParent.offsetLeft;
				_top += obj.offsetParent.offsetTop;
				obj = obj.offsetParent;
			}
			return {
				"left": _left,
				"top": _top
			};
		}
		$("#goods").load("sub/goods.html", function() {
			/*$(".pictrue").get(0).addEventListener('DOMMouseScroll', function(e){
				e.preventDefault()
			});
            $(".pictrue").get(0).addEventListener('mousewheel', function(e){
				e.preventDefault()
            });*/
			$(".pictrue").mousemove(function(e) {
				var mouse = {
					x: e.clientX - offsetPage($(".pictrue").get(0)).left,
					y: e.clientY - offsetPage($(".pictrue").get(0)).top + $(window).scrollTop()
				}
				//console.log($(document).scrollTop())
				if(mouse.x >= 50 && mouse.x <= 300 && mouse.y >= 50 && mouse.y <= 300) {
					$(".move").css({
						display: "block",
						left: mouse.x - 50,
						top: mouse.y - 50
					})
					$(".bigpic").show();
					$(".feng").css({
						left: -$(".move").position().left * 3.5,
						top: -$(".move").position().top * 3.5
					})

				} else {
					$(".move").hide()
					$(".bigpic").hide();
				}
				//console.log($(".move").position())
			})
			$(".picchange").find("img").mouseenter(function() {
				console.log($(".small"))
				var ssss = $(this).attr("src").replace("_50", "");
				$(".small").attr("src", ssss)
				$(".feng").attr("src", ssss)
				$(this).parent().parent().addClass("on").siblings().removeClass("on")
			})
			$(".jian").click(function() {
				if(parseInt($("#acount").val()) == 0) {
					return
				} else {
					$("#acount").val(parseInt($("#acount").val()) - 1)
				}
			})
			$(".jia").click(function() {
				$("#acount").val(parseInt($("#acount").val()) + 1)
			})
			//购物车抛物线
			var eleFlyElement = document.getElementsByClassName("fly")[0],
				eleShopCart = document.getElementById("right_cart");
			// 抛物线运动的触发
			console.log(eleFlyElement.getBoundingClientRect().left)
			var numberItem = 0;
			var myParabola = funParabola(eleFlyElement, eleShopCart, {
				speed: 100,
				curvature: 0.002,
				complete: function() {
					eleFlyElement.style.visibility = "hidden";
					//eleShopCart.querySelector("span").innerHTML = ++numberItem;
				}
			});
			$(".append").click(function() {
				eleFlyElement.style.display = "block";
				var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
					scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
				eleFlyElement.style.left = 0 + "px";
				eleFlyElement.style.top = 0 + "px";
				console.log(eleFlyElement.style.left, eleFlyElement.style.top)
				eleFlyElement.style.visibility = "visible";
				myParabola.position().move();
				var box = $("<div>")
				/*$("body").append($(box))
				$(box).addClass("box").css({
					left: $(".append").get(0).clientX,
					top: $(".append").get(0).clientY
				}).animate({
					width: 50,
					height: 50
				}, 500).animate({
					top: $(".cart").get(0).clientY,
					right: 0
				}, 500).remove()*/
				//var t = setTimeout(function() {
				var count = $("#acount").val()
				$("#right_cart").find("em").text(count);
				$.cookie('goods', null);
				$.cookie("goods", count, {
					Path: '/'
				})

				//clearTimeout(t)
				//}, 1000)
			})
			//城市选择 代理数据
			function city(data, place) {
				//console.log(11)
				for(var i = 0; i < data.length; i++) {
					var li = $("<li>")
					//console.log($(li))
					$(place).append($(li))
					$(li).text(data[i][1]).attr({
						index: data[i][0]
					})
				}
			}
			$(".address").click(function() {
				$(".listyle").html("");
					$.ajax('/shop/index.php?act=index&op=json_area&_=1505892344233', {
						dataType: 'jsonp',
						callback: 'callback',
						success: data => {
							//console.log(data)
							city(data[0], ".province")
						}
					});
					$(".choose").show()
					$(".province").show().siblings().hide()
			})

			$(".province").click(function(e) {
				var li = e.target;
				$(li).addClass("cur").siblings().removeClass("cur")
				$(".pri").text($(li).text());
				var index = parseInt($(li).attr("index")) ;
				$.ajax('/shop/index.php?act=index&op=json_area&_=1505892344233', {
					dataType: 'jsonp',
					callback: 'callback',
					success: data => {
						//console.log(data[index])
						city(data[index], ".city");
						$(".city").show().siblings().hide()
						$(".city").find("li:first").addClass("cur")
						$(".city1").addClass("cho").siblings().removeClass("cho")
						$(".city1").text($(".city li:first").text())
					}
				});
			})
			$(".city").click(function(e) {
				var li = e.target;
				$(li).addClass("cur").siblings().removeClass("cur")
				$(".city1").text($(li).text())
				var index = parseInt($(li).attr("index"));
				$.ajax('/shop/index.php?act=index&op=json_area&_=1505892344233', {
					dataType: 'jsonp',
					callback: 'callback',
					success: data => {
						//console.log(data[index])
						city(data[index], ".distrct");
						$(".distrct").show().siblings().hide()
						$(".distrct").find("li:first").addClass("cur")
						$(".dist").addClass("cho").siblings().removeClass("cho")
						$(".dist").text($(".distrct li:first").text())
					}
				});
			})
			$(".distrct").click(function(e) {
				var li = e.target
				$(".dist").text($(li).text())
				$(li).addClass("cur").siblings().removeClass("cur")
				$(".choose").hide()
				$(".address").text($(".pri").text() + $(".city1").text())
				$(".listyle").html("");
                $(".pri").addClass("cho").siblings().removeClass("cho")
			})
			$(".addtop span").click(function() {
				$(this).addClass("cho").siblings().removeClass("cho")
				$("#comments-list").show()
			})

			//代理数据
			$.ajax({
				type: "get",
				url: "/Product/GetHotSaleProduct?sid=1",
				async: true,
				success: function(data) {
					$("#tem").html(tem("hot", data))
					$("#sp-hot-sale .mt span").click(function() {

						if($(this).text() == "热门销售") {
							$("#hotConcerned").show().siblings().hide()
						} else {
							$("#hotConcerned").hide().siblings().show()
						}
						$(this).addClass("cur").siblings().removeClass("cur")

					})
				}
			});
			$.ajax({
				type: "get",
				url: "/Product/GetCommentByProduct?pId=496&pageNo=1&pageSize=10&commentType=0",
				async: true,
				success: function(data) {
					console.log(data)
					$("#comment1").html(tem("com", data))
				}
			});
			$.ajax({
				type: "get",
				url: "/Product/GetHotConcernedProduct?sid=1",
				async: true,
				success: function(data) {
					$("#hotConcerned").html(tem("watch", data))
				}
			});
			$(".mt li").click(function() {
				if($(this).find("a").text() == "商品介绍") {
					$("#product-detail-1").show()
					$("#comment").hide()
				} else {
					$("#product-detail-1").hide()
					$("#comment").show()
				}
				$(this).addClass("curr").siblings().removeClass("curr")
				//$("#comment").show().siblings().not(":first").hide()
			})

		})

		$("#foot").load("sub/foothtml.html")
	})
})