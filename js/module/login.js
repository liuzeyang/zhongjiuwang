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
			$.ajax({
				type: "get",
				url: "/shopdata/userinfo.php",
				data: {
					status: "login",
					userID: $("#user").val(),
					password: $("#password").val()
				},
				async: true,
				success: function(data) {
					if(typeof JSON.parse(data) == "object") {
						$.cookie("user", $("#user").val(), {
							Path: '/'
						})
						self.location = '/html/home.html'; //跳转新页面
					} else if(JSON.parse(data) == 0) {
						$(".alert").hide();
						$(".error").show();
						count++;
					} else if(JSON.parse(data) == 2) {
						$(".alert").hide()
						$(".error").show()
						count++;
					}
					if(count > 3) {
						$(".check").show();
					}
				}
			});
			/*$.ajax("/shopdata/userinfo.php?status=login&userID=15553503036&password=aini123" , {//+ $("#user").val()
				datType: "jsonp",
				success: function(data) {
                    console.log(data)
					var date = JSON.parse(data.slice(9, -1))
					console.log(date[0].userID)
					//data[0].
					if(data == 0) {
						$(".alert").hide();
						$(".error").show();
						count++;
					} else {
						if(date[0].userID == $("#password").val()) {
							$.cookie("user", "admin", {
								Path: '/'
							})
							self.location = '/html/home.html';
						} else {
							$(".alert").hide()
							$(".error").show()
							count++;
						}
					}
				}
			});*/
			/*$.getJSON("../json/user.json", function(data) {
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
			})*/
		})

	})
})