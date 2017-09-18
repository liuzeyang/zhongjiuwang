define(["jquery"],function($){
	return function(){
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
        return index;
	}
})