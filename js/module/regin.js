require(["../model/config"], function() {
	require(["jquery","piccheck"], function($,piccheck) {
		//随机生成验证码
		var index;
		$.getJSON("../json/regin.json", function(data) {
			index = Math.floor(Math.random() * 4);
			$("#checkCodeImg").attr({
				src: data.src[index]
			})
		})
		$("#checkCodeImg").click(function() {
			$.getJSON("../json/regin.json", function(data) {
				var index1 = Math.floor(Math.random() * 4);
				while(data.src[index] == data.src[index1]) {
					index1 = Math.floor(Math.random() * 4);
				}
				$("#checkCodeImg").attr({
					src: data.src[index1]
				})
				index = index1;
			})
		})
		
		
		//piccheck();// 找不到index
		//登录验证
		$("input:lt(5)").focus(function() {
			$(this).parent().find(".focus").css({
				display: "block"
			})
			console.log()
		})
		$("input:lt(5)").blur(function() {
			var val = $(this).val();
			$(this).parent().find(".focus").css({
				display: "none"
			})
			//setTimeout(function() {
			if(check($(this), val)) {
				$(this).parent().find(".error").css({
					display: "none	"
				})
			} else {
				$(this).parent().find(".error").css({
					display: "block"
				})
			}
			//}, 50)

		})

		function check($input, val) {
			var flag = false;
			switch($input.attr("name")) {
				case "cellphone":
					{
						if(val.match(/^1(35)|(32)|(47)|(55)|(38)|(87)|(50)[0-9]{8}/)) {
							flag = true;
						}
						break;
					}
				case "check":
					{
						$.getJSON("../json/regin.json", function(data) {
							//							console.log(data.val[parseInt(index)])
							//							console.log(val)
							if(data.val[index] == val) {
								flag = true;
								$input.parent().find(".error").css({
									display: "none	"
								})
							}
						})

						return;
					}
				case "password":
					{
						if(val.match(/\S{6,20}/)) {
							flag = true
						}
						break;
					}
				case "ensure":
					{
						if(val == $(".i-pass").val()) {
							flag = true
						}
						break;
					}
				case "ipcheck":
					{

						break;
					}
			}
			return flag;
		}
		$(".error").each(function(index,item){
			if($(item).css("display")=="none"){
				$("#btn").removeAttr("disabled")
			}
		})
	})
})