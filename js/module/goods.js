require(["../model/config"], function() {
	require(["jquery", "tophtml", "jqueryui","template"], function($, top, ui,tem) {
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
					y: e.clientY - offsetPage($(".pictrue").get(0)).top + document.documentElement.scrollTop
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
			$(".picchange").find("img").click(function() {
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
			$(".append").click(function() {

				var box = $("<div>")
				$("body").append($(box))
				$(box).addClass("box").css({
					left: $(".append").get(0).clientX,
					top: $(".append").get(0).clientY
				}).animate({
					width: 50,
					height: 50
				}, 500).animate({
					top: $(".cart").get(0).clientY,
					right: 0
				}, 500).remove()
				//var t = setTimeout(function() {
				$("#right_cart").find("em").text($("#acount").val());
				//clearTimeout(t)
				//}, 1000)
			})
			$(".address").click(function() {
				if($(".choose").css("display")=="block"){
					$(".address").text( $(".pri").text()+$(".city1").text() )
					$(".choose").hide()
					return
				}else{
					$.ajax({
					type: "get",
					url: "http://127.0.0.1:8020/gitspace/zhongjiuwang/json/where.json", //http://www.mango918.com/shop/index.php?act=index&op=json_area
					async: true,
					//AccessControlAllowOrigin:"*",
					success: function(data) {
						city(data["provinces"], ".province")
						//console.log(data["provinces"][1])
					}
				});
					$(".choose").show()
					$(".province").show().siblings().hide()
				}
			})

			$(".province").click(function(e) {
				var li = e.target;
				//console.log($(li))
				$(li).addClass("cur").siblings().removeClass("cur")
				$(".pri").text($(li).text())
				$.ajax({
					type: "get",
					url: "http://127.0.0.1:8020/gitspace/zhongjiuwang/json/where.json", //http://www.mango918.com/shop/index.php?act=index&op=json_area
					async: true,
					//AccessControlAllowOrigin:"*",
					success: function(data) {
						var citylist = data.provinces.find(function(pro) {
							return pro.name == $(".pri").text()
						})
						city(citylist.cities, ".city")
						//console.log($(".city").sib)
						$(".city").show().siblings().hide()
						$(".city").find("li:first").addClass("cur")
						$(".city1").text($(".city li:first").text())
					}
				});
			})
			$(".city").click(function(e) {
				var li = e.target;
				//console.log($(li))
				$(li).addClass("cur").siblings().removeClass("cur")
				$(".city1").text($(li).text())
				$.ajax({
					type: "get",
					url: "http://127.0.0.1:8020/gitspace/zhongjiuwang/json/where.json", //http://www.mango918.com/shop/index.php?act=index&op=json_area
					async: true,
					//AccessControlAllowOrigin:"*",
					success: function(data) {
						var dislist = data.provinces.find(function(pro) {
							return pro.name == $(".pri").text()
						}).cities.find(function(cit) {
							return cit.name == $(".city1").text()
						}).districts;
						city(dislist, ".distrct")
						$(".distrct").show().siblings().hide()
						$(".dist").text($(".distrct li:first").text())
					}
				});
			})
			$(".distrct").click(function(e) {
				var li = e.target
				$(".dist").text($(li).text())
				$(li).addClass("cur").siblings().removeClass("cur")
                
			})
			$(".addtop span").click(function() {
				$(this).addClass("cho").siblings().removeClass("cho")
			})
			$.ajax({
				type:"get",
				url:"/Product/GetHotSaleProduct?sid=1",
				async:true,
				success:function(data){
					$("#tem").html(tem("hot", data))
				}
			});
			$(".mt li").click(function(){
				$(this).addClass("curr").siblings().removeClass("curr")
				$("#comment").show().siblings().not(":first").hide()
			})
		})
 
		function city(data, place) {
			//console.log(11)
			for(var i = 0; i < data.length; i++) {
				var li = $("<li>")
				//console.log($(li))
				$(place).append($(li))
				$(li).text(data[i].name)
			}
		}
		$("#foot").load("sub/foothtml.html")
	})
})