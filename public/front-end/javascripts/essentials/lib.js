// -------------------
// javascript lib
// -------------------

const lib = {
	// Time
	convertDate:function(date){
		let str = date.split('-');
		if(str!=""){
			var convertedDate = str[2]+"-"+str[1]+"-"+str[0];
		} else {
			var convertedDate = "";
		};
		return convertedDate;
	},
	genDate: function(){
		let d = new Date();
		let date = "";
		if(d.getDate()<10 && parseInt(d.getMonth())+1>9){
			date = "0"+d.getDate()+"-"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear();
		} else if(d.getDate()>9 && parseInt(d.getMonth())+1<10){
			date = ""+d.getDate()+"-0"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear();
		} else if(parseInt(d.getDate())<10 && parseInt(d.getMonth())+1<10){
			date = "0"+d.getDate()+"-0"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear();
		} else {
			date = ""+d.getDate()+"-"+parseInt(d.getMonth()+1)+"-"+d.getFullYear();
		};
		return date;
	},
	genFullDate: function(){
		let d = new Date();
		let date = "";
		if(d.getDate()<10 && parseInt(d.getMonth())+1>9){
			date = "0"+d.getDate()+"-"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		} else if(d.getDate()>9 && parseInt(d.getMonth())+1<10){
			date = ""+d.getDate()+"-0"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		} else if(parseInt(d.getDate())<10 && parseInt(d.getMonth())+1<10){
			date = "0"+d.getDate()+"-0"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		} else {
			date = ""+d.getDate()+"-"+parseInt(d.getMonth()+1)+"-"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		};
		return date;
	},
	fillDateInput: function(input){
		return input.valueAsDate = new Date();
	},
	colectByMonth: function(month, dates){
		let array = [];
		let str = [];
		for(i in dates){
			str = dates[i].date.split('-');
			if(parseInt(str[1])==parseInt(month)){
				array.push(dates[i]);
			};
		};
		return array;
	},

	//Math
	roundToInt: (num, places) => {
		return +(parseFloat(num).toFixed(places));
	},
	roundValue: function(value){
		return Math.round((value) * 100) / 100;
	},

	// HTTP
	serializedFormToJSON: (array) =>{
		var string = "";
		for(i in array){
			if (i == 0) {
				string += "{" + JSON.stringify(array[i].name) + ":" + JSON.stringify(array[i].value) + ", ";
			} else if (i > 0 && i < array.length - 1) {
				string += JSON.stringify(array[i].name) + ":" + JSON.stringify(array[i].value) + ", ";
			} else if(array.length - 1 == i){
				string += JSON.stringify(array[i].name) + ":" + JSON.stringify(array[i].value) + "}";
			};
		};

		return string;
	},

// html/css lib
	displayDiv: (div, button, openText, closeText) => {
		let selectedDiv = document.getElementById(div);
		
		if(selectedDiv.style.display == "none"){
			if(button && openText && closeText){
				button.innerHTML = closeText;
			};
			selectedDiv.style.display = "";
		} else if(selectedDiv.style.display == ""){
			if(button && openText && closeText){
				button.innerHTML = openText;
			};
			selectedDiv.style.display = "none";
		};
	},
	clearInnerHtml: (target) => {
		target.innerHTML = "";
	},
	displayMenuText: (button, openText, closeText) => {
		if(button.innerHTML == openText){ button.innerHTML = closeText ;} 
		else if(button.innerHTML == closeText){ button.innerHTML = openText; };
	},
	clearTable(table, location){
		document.getElementById(table).innerHTML = "NENHUM REGISTRO ENCONTRADO";
		$('#'+location+'Previous').prop('disabled');
		$('#'+location+'Next').prop('disabled');
		$('#'+location+'PageNumber').text('0');
	},
	noRecord(table){
		document.getElementById(table).innerHTML = "NENHUM REGISTRO ENCONTRADO";
	},
	fillSelect(selectLocation, location, route, method){
		$.ajax({
			url: route,
			method: method,
			success: (response) => {
				var select = document.getElementById(location);
				select.innerHTML = "";
				select.innerHTML += "<option value='0'>"+selectLocation+"</option>"
				for(i in response){
					select.innerHTML += "<option value='"+response[i].id+"'>"+response[i].name+"</option>"
				};
			}
		});
	},
	splitSelectTextBy: (select, string) => {
		if(select && string){
			let row = select.options[select.selectedIndex].text;
			let splited_text = row.split(string);
			splited_text.select = { value: select.value };
			return splited_text;
		};
		return false;
	},
	clearSelect(select){
		select.innerHTML = "";
		select.innerHTML += "<option value='0'>Sem resultados</option>"
	},
	focus(input){
		if(input.id){
			document.getElementById(input.id).focus();
		} else {
			input.focus();
		};
	},
	carousel: {
		// server data carousel
		render: (carousel_name) => {
			let slides = document.querySelectorAll("[data-js='"+carousel_name+"']");
	        let prevButton = document.querySelector("[data-js='"+carousel_name+"-prev']");
	        let nextButton = document.querySelector("[data-js='"+carousel_name+"-next']");

	        let lastSlideIndex = slides.length - 1;
	        let currentSlideIndex = 0;

	        let manipulateSlidesClasses = correctSlideIndex => {
	            slides.forEach(slide => slide.classList.remove("display-block"));
	            slides[correctSlideIndex].classList.add("display-block");
	        };

	        prevButton.addEventListener("click", () => {
	            let correctSlideIndex = currentSlideIndex === 0
	            ? currentSlideIndex = lastSlideIndex
	            : --currentSlideIndex

	            manipulateSlidesClasses(correctSlideIndex);
	        });

	        nextButton.addEventListener("click", () => {
	            let correctSlideIndex = currentSlideIndex === lastSlideIndex
	            ? currentSlideIndex = 0
	            : ++currentSlideIndex;

	            manipulateSlidesClasses(correctSlideIndex);
	        });
		},
		// fetch data carousel
		execute: (box, render, response, pagination) => {
			document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-previous").onclick = function(){
		        if(pagination.page > 0){
		            pagination.page--;
		            lib.carousel.paging(render, response, pagination);
		            lib.carousel.navigation(box, response, pagination);
		        };
		    };

		    document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-next").onclick = function(){
		        if(pagination.page < response.length / pagination.pageSize - 1){
		            pagination.page++;
		            lib.carousel.paging(render, response, pagination);
		            lib.carousel.navigation(box, response, pagination);
		        };
		    };
		    lib.carousel.paging(render, response, pagination);
		    lib.carousel.navigation(box, response, pagination);
		},
		paging: (render, response, pagination) => {
			render(response, pagination);
		},
		navigation: (box, response, pagination) => {
			if(!response.length){
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-previous").disabled = true;
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-page").innerHTML = " 0 ";
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-next").disabled = true;
			};

			if(response.length && response.length <= pagination.pageSize){
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-previous").disabled = true;
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-page").innerHTML = "1 de 1";
				document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-next").disabled = true;
			};

			if(response.length > pagination.pageSize){
				if(pagination.page <= 0){
					pagination.page = 0;
					document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-previous").disabled = true;
					document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-page").innerHTML = ""+ (pagination.page + 1) + " de " + Math.ceil(response.length / pagination.pageSize);
					document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-next").disabled = false;
				};

				if(pagination.page > 0 && pagination.page < (response.length / pagination.pageSize) - 1){
					document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-previous").disabled = false;
					document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-page").innerHTML = ""+ (pagination.page + 1) + " de " + Math.ceil(response.length / pagination.pageSize);
					document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-next").disabled = false;
				};

				if(pagination.page >= (response.length / pagination.pageSize) - 1){
					document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-previous").disabled = false;
					document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-page").innerHTML = ""+ (pagination.page + 1) + " de " + Math.ceil(response.length / pagination.pageSize);
					document.getElementById(box).children.namedItem("carousel-navigation").children.namedItem("carousel-next").disabled = true;
				};
			};
		}
	},
	
	// Canvas
	rect: (ctx,c,x,y,w,h) => {
		ctx.fillStyle = c;
		ctx.beginPath();
	    ctx.rect(x,y,w,h);
	    ctx.closePath();
	    ctx.fill();
	},
	drawRects: (ctx, rects) => {
		for(i in rects){
            ctx.fillStyle=rects[i].color;
            lib.rect(ctx, rects[i].x, rects[i].y, rects[i].width, rects[i].height);
        };
	},
	collide: (r1,r2) => {
		let dx=(r1.x+r1.width/2)-(r2.x+r2.width/2);
		let dy=(r1.y+r1.height/2)-(r2.y+r2.height/2);
		let width = (r1.width+r2.width)/2;
		let height = (r1.height+r2.height)/2;
		let crossWidth=width*dy;
		let crossHeight=height*dx;
		let collision='none';
		//
		if(Math.abs(dx) <= width && Math.abs(dy)<=height){
			if(crossWidth > crossHeight){
				collision = (crossWidth>(-crossHeight))?'bottom':'left';
			} else {
				collision = (crossWidth>-(crossHeight))?'right':'top';
			}
		}
		return(collision);
	}
};

lib.adress = {
	get: async (CEP) => {
		let response = await fetch("https://viacep.com.br/ws/"+CEP+"/json/");
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		
		return response;
	},
	fillForm:async (cep, form) => {
		let adress = await lib.adress.get(cep);
		if(adress.logradouro){ document.getElementById(form).elements.namedItem("street").value = adress.logradouro; };
		if(adress.complemento){ document.getElementById(form).elements.namedItem("complement").value = adress.complemento; };
		if(adress.bairro){ document.getElementById(form).elements.namedItem("neighborhood").value = adress.bairro; };
		if(adress.localidade){ document.getElementById(form).elements.namedItem("city").value = adress.localidade; };
		if(adress.uf){ document.getElementById(form).elements.namedItem("state").value = adress.uf; };
	}
};

lib.openExternalLink = (url) => {
	if('http'.substr(0, 4) == url.substr(0, 4)){
		window.open(url, '_blank');
	} else {
		url = "https://"+url;
		window.open(url, '_blank');
	};
};

lib.localStorage = {
	verify: (item) => {
		if(localStorage.getItem(item) != null){
			return true;
		};
		return false;
	},
	update: (item, stringified_object) => {
		localStorage.setItem(item, stringified_object);
	},
	remove: (item) => {
		localStorage.removeItem(item);
	}
};