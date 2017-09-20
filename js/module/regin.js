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
						if(val.match(/^1[34578]\d{9}$/)) {
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
                        flag=true;
						break;
					}
			}
			return flag;
		}
		$("#btn").click(function(){
			var count=0;
			$(".error").each(function(index,item){
				//console.log($(item).css("display")=="none")
			if($(item).css("display")=="none"){
                count++;		
			}else{
				alert("请确认你的输入");
				return;
			}
			if(count==5){
				alert(1111)
			}
		})
		})
	})
})