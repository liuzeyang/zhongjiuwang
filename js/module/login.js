require(["../model/config"], function() {
	require(["jquery", "piccheck", "jqcookie"], function($, piccheck, cookie) {
		//2017-9-17  login.js  cookie 还没写 写完再添加
		$(".righttop li").on("mousedown", function() {
			//console.log($(this).attr("name"))
			var aname = $(this).attr("name");
			if(aname == "sao") {
				$(this).addClass("active").siblings().removeClass("active")
				$("#section2").hide().siblings("#section1").show()
			} else {
				$(this).addClass("active").siblings().removeClass("active")
				$("#section1").hide().siblings("#section2").show()
			}
		})
		//index 找不到 需要帮助
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
		//piccheck();
		//console.log(index)
		var count = 0;
		$("#btn").on("click", function() {
			$.getJSON("../json/user.json", function(data) {
				data.user.forEach(function(item, i) {
					//console.log( $("#password").val() )
					if(item == $("#user").val()) { //账号判断
						if(data.password[i] == $("#password").val()) { //密码判断
							var user = $("#user")
							
							if(count > 3) { //验证码
								$.getJSON("../json/regin.json", function(data1) {
									if(data1.val[index] == $("#checkCodeBox").val()) {
										$.cookie("user", "admin", {
											Path: '/'
										})
										self.location = '/html/home.html'; //跳转新页面
									}
								})

							} else {
								$.cookie("user", "admin", {
									Path: '/'
								})
								self.location = '/html/home.html'; //跳转新页面
							}
						} else {
							$(".alert").hide();
							$(".error").show();
							count++;
						}
					} else {
						$(".alert").hide()
						$(".error").show()
						count++;
					}
				})
				if(count > 3) {
					$(".check").show();
				}
			})
		})

	})
})