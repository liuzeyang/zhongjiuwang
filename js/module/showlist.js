require(["../model/config"], function() {
	require(["jquery", "tophtml", "template"], function($, top, tem) {
		$("#top").load("sub/tophtml.html", function() {
			top();
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
		$.ajax({
			type: "get",
			url: "/Product/GetHotSaleProduct?sid=1",
			async: true,
			success: function(data) {
				$("#plist").html(tem("product", data))
				$(".hot-product").html(tem("hot-product", data))
				$(".see-more").html(tem("see", data))
			}
		});
		var t;
		t = setTimeout(function() {
			$(".list-h li").mouseenter(function() {
				$(this).find(".scale-img").show()
			})
		}, 300)

		$("#foot").load("sub/foothtml.html")
	})
})