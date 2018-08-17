/**
 **区划分析相关
 */

var Map = (function() {
	var map = null;
	var elementsLayer, boundLayer;
	var container = "map-container";
	var basePath = "js/leader/";
	var layerDiv = null, zr = null;
	var pFeatures = null ;  //点集
	
	var dataCache =null ; //分区域数据
	
	var currIndName = indexName ; //当前指标名称
	//假参数
	var tempFake = 1;
	
	jQuery(function() {
				Map.init();
	});

	var hlStyle = {
		fillOpacity : 0.8,
		strokeColor : "#0193BF", 
		strokeOpacity : 1,
		strokeWidth : 1,
		fill : true,
		fillColor:"#00C7FE",
		pointRadius : 2
	};
	var init = function() {
		initMap();
		initLayer();
	};

	var initMap = function() {
		map = new SuperMap.Map(container, {
			allOverlays : true,
			controls : [new SuperMap.Control.DragPan(),
					//new SuperMap.Control.MousePosition(),
					new SuperMap.Control.Navigation({
								dragPanOptions : {
									enableKinetic : true
								}
							})],
			maxResolution : "auto"
			//restrictedExtent:new SuperMap.Bounds(5000000,0, 17000000, 11000000)
			//,maxExtent: new SuperMap.Bounds(50,0, 160, 60)
			,
			projection : "EPSG:4326"
				//displayProjection: "EPSG:900913"
			});
			
			
		  map.events.on({
//            "zoomend": zoomEndListener,
            "moveend": reDraw
        });
	};

	/**
	 * 添加图层
	 */
	var initLayer = function() {
		//添加底图
		var option = {
			layerType : "img"
		};
//		var layer = new SuperMap.Layer.Tianditu(option);
//		map.addLayer(layer);
//		map.setBaseLayer(layer);
//		map.setCenter(new SuperMap.LonLat(106.29417942816, 26.398934305958), 8);

		if (!elementsLayer) {
			elementsLayer = new SuperMap.Layer.Elements("elementsLayer");
			map.addLayer(elementsLayer);
			$("div[id*='SuperMap.Layer.Elements']").css("z-index", 600);

			layerDiv = elementsLayer.getDiv();
			layerDiv.style.width = map.div.clientWidth + "px";
			layerDiv.style.height = map.div.clientHeight + "px";
		}
		//边界图层
		if (!boundLayer) {
			boundLayer = new SuperMap.Layer.Vector("boundLayer", {
						renderers : ["Canvas2"]
					});
			map.addLayer(boundLayer);
			map.setBaseLayer(boundLayer);
			map.setCenter(new SuperMap.LonLat(106.29417942816, 26.398934305958), 8);
			var filename = "data_r_xn";
			loadTool.load(basePath + filename + ".js").done(function() {
						var feas = [];
						var win_data = window[filename];//JS文件名为变量名的JSON对象
						if (win_data) {
							var obj;
							if (win_data.encode) {
								obj = Util.decodeJson(win_data);
							}
							feas = SuperMap.REST.Recordset.fromJson(obj).features;//读取专题面
						} else {
							console.log("专题【" + name + "】JS文件加载失败，请检查文件配置");
						}
						$.each(feas, function(i, f) {
									f.style = hlStyle;
								});
						//添加要素
						boundLayer.addFeatures(feas);
						renderData();
					});
		}
	};

	/**
	 * 渲染数据
	 */
	var renderData = function() {
		var filename = "data_p_xn";
		loadTool.load(basePath + filename + ".js").done(function() {
					var feas = [];
					var win_data = window[filename];//JS文件名为变量名的JSON对象
					if (win_data) {
						var obj;
						if (win_data.encode) {
							obj = Util.decodeJson(win_data);
						}
						feas = SuperMap.REST.Recordset.fromJson(obj).features;//读取专题面
					} else {
						console.log("专题【" + name + "】JS文件加载失败，请检查文件配置");
					}
					//渲染要素
					drawGeometry(feas);
				});
	};
	
	var drawGeometry = function(feas) {
		if(feas){
			pFeatures =  feas ;
		}else{
			feas = pFeatures ;
		}
		if(!pFeatures&&!feas){
			return ;
		}
		//如果缓存数据还未生成，延迟加载
		if(dataCache == null){
			setTimeout(function(){
				drawGeometry(feas);
			},500);
			return ;
		}
		zr = zrender.init(document.getElementById(layerDiv.id));
		$.each(feas, function(i, f) {
					var x = f.geometry.x;
					var y = f.geometry.y;
					 var pointPix = map.getPixelFromLonLat(new SuperMap.LonLat(x,y) );
//					var radius = 20;
					var text =f.data["QH_NAME"];
					var code = f.data["QH_CODE"];
					var data = getDataByCode(code);
					if(!data){ return ;}
//					if(data.value == 0){ return ;}
					var radius = Util.getRadius(data.value,data.max).r;
					console.log("半径:"+radius);
					radius =parseFloat(radius) ;
					zr.add( new echarts.graphic.Circle( {
								shape : 'circle',
								id : "sharp_" + i,
								shape: {
			                        cx: pointPix.x,
			                        cy: pointPix.y,
			                        r: radius
			                    },
								style : {
									stroke : "#19BAE1",
									opacity:"1",
									fill:"#F4D232",
									backgroundColor:"#ccc",
//									textColor:"#ffffff",
//									color:"#ccc",
									shadowOffsetX:"0",
									shadowOffsetY:"0",
									shadowColor:"#d35400",
									shadowBlur:"0",
									text : data.value  +"\n" +text,
									textFill:"#000",
									textPosition : 'inside',
									textFont : " " + "12"  //bold
											+ "px verdana",
									data : f
								},
								onmouseover : function(params) {
									var el  =params.target ;
								},
								onmouseout : function(params) {
								},
								hoverable:true
							})); //new echarts.graphic.Circle( 
				});
		zr.refreshImmediately();

		/*
		zr = zrender.init(document.getElementById(layerDiv.id));
		var pointlonlat, pointPix, radius, text;
		if (queryResult) {
		   for (var i = 0, size = queryResult.length; i < size; i++) {
		       pointlonlat = new SuperMap.LonLat(queryResult[i].smx, queryResult[i].smy);
		       pointPix = activeMap.getPixelFromLonLat(pointlonlat);
		       radius = Util.getRadius(regionInfos[i].num, regionInfos[i].max, regionInfos[i].level);
		       if (configInfo.isShowName) {
		           text = regionInfos[i].num;
		//                  text = regionInfos[i].num + "\n" + regionInfos[i].name;
		       } else {
		           text = regionInfos[i].num;
		       }
		       zr.addShape({
		           shape: 'circle',
		           id: "sharp_" + i,
		           style: {
		               x: pointPix.x,
		               y: pointPix.y,
		               r: radius,
		               color: configInfo.style.color[0] || "#e67e22",// rgba supported
		               strokeColor: configInfo.style.color[1] || "#d35400",
		               text: text,
		               textPosition: 'inside',
		               textFont: "bold " + (radius) + "px verdana",
		               data: regionInfos[i]
		           },
		           onmouseover: function (params) {
		               if (params.target) {
		                   if (targetId != params.target.id) {
		                       targetId = params.target.id;
		                       var data = params.target.style.data;
		                       var html = "<div>" + data.name + "：" + data.num + "</div>";
		                       var x = params.event.clientX , y = params.event.clientY, r = params.target.style.r;
		                       var tooltip = "<div id='_tooltip' style='font-size: 10px;position: absolute;padding: 5px; z-index: 100000;opacity: 0.8;'><div style='position: absolute;width: 0; height: 0; line-height: 0; border: 6px dashed #000;top: 0px;left: 20%;margin-left: -5px;border-bottom-style: solid;border-top: none; border-left-color: transparent; border-right-color: transparent;border-bottom-color:#000;'></div><div style='background-color: #000;color: #FFF; max-width: 200px;padding: 5px 8px 4px 8px;text-align: center; border-radius: 3px;'>" + html + "</div></div>";
		                       var $toop = $('#_tooltip');
		                       if ($toop.length == 0) {
		                           $('body').append(tooltip);
		                       }
		                       var _x = parseInt(x) + parseInt(r), _y = parseInt(y) + parseInt(r);
		                       $('#_tooltip').css({
		                           "top": _y + "px",
		                           "left": _x + "px"
		                       }).show('fast');
		                       //console.log("add");
		                   }
		               }
		           },
		           onmouseout: function (params) {
		               if (params.target) {
		                   var $tip = $('#_tooltip');
		                   if ($tip.length > 0) {
		                       $tip.remove();
		                       //console.log("remove");
		                   }
		                   targetId = "";
		               }
		           }
		       });
		   }
		   zr.render();
		}
		 */
	};
	
	/**
	 * 根据区划名称 ，获取指标数据
	 */
	var getDataByCode = function(code){
		var fields = dataCache.fields ;
		var values = dataCache.values ;
//		var max = 0 ;
		var max = 10000 ;
		var index =-1 ;
		var len = fields.length ;
		
		//模拟
		if(code == "520111000000"){
			code = "520701000000";
		}
		for(var i =0 ; i< len ;i++){
			if(fields[i].cname.indexOf( currIndName)!=-1){
				index = i ;
				break ;
			}
		}
		if(index == -1 ){return null ;}
		var value =0 ;
		len = values.length ;
		
		
		$.each(values,function(i,row){
			var v = row[index+2] ;
			v =  v==""?0:v ;
			if(parseFloat(v) >max){
				max = parseFloat(v) ;
			}
			if(row[0] == code ){
				value = v ;
			}
			value = 500+(++tempFake)*2;
		});
		console.log(code+":"+value +","+max) ;
		return{
			value:value,
			max:max
		}
	};
	
	/**
	 * 重绘
	 */
	
	var reDraw = function(){
	
		drawGeometry(null) ;
		
	};
	
	/**
	 * 切换指标
	 */
	var switchIndicator = function(indName){
		currIndName = indName ;
		reDraw();
		
	};

	/**
	 * 工具类
	 */
	var Util = (function() {

		/**
		 * 解码json文件
		 * @param obj
		 * @returns {*}
		 */
		var decodeJson = function(obj) {
			if (!obj.encode || obj.encode == "done") { //无需解码
				return obj;
			}
			var feas = obj.features;
			for (var i = 0, len = feas.length; i < len; i++) {
				var fea = feas[i];
				fea.fieldNames = obj.fields;
				fea.geometry.center = arrToObj(fea.geometry.center, obj.sys);

				for (var j = 0, ll = fea.geometry.points.length; j < ll; j++) {
					fea.geometry.points[j] = arrToObj(fea.geometry.points[j],
							obj.sys);
				}
			}
			obj.encode = "done";
			obj.sys = "done";
			return obj;
		};

		var arrToObj = function(arr, sys) {
			var y = arr[0];
			var x = arr[1];

			if (sys === true) {
				y = sysConvert(y);
				x = sysConvert(x);
			}
			return {
				"y" : y,
				"x" : x
			};
		};

		/**
		 * 36进制转10进制
		 * @param num
		 * @returns {*}
		 */
		var sysConvert = function(num) {
			var dotIndex = (num + "").indexOf(".");
			var leftN = num, rightN = 0;
			if (dotIndex > 0) {
				leftN = (num + "").substring(0, dotIndex);
				rightN = (num + "").substring(dotIndex + 1);

				leftN = parseInt(leftN, 36);
				rightN = parseInt(rightN, 36);

				num = leftN + "." + rightN;
			} else {
				num = parseInt(leftN, 36);
			}
			return num;
		}
		
		var getRadius = function (count, max) {
            //根据视觉原理，绘制的圆最好为10个等级(根据maxradius)
            var range = 25;
            var radius_count = Math.sqrt(count/Math.PI);//当前值相对圆半径
            var radius_max = Math.sqrt(max/Math.PI);//最大值相对圆半径
            var index = count==max ? 10 : Math.floor(radius_count/(radius_max/10))+1;//等级
            return {
                r: (range*(index/10.0)).toFixed(1),
                index: index
            }
        };

		return {
			decodeJson : decodeJson,
			getRadius:getRadius
		}

	})();
	
	/**
	 * 设置分区域数据
	 */
	var setData = function(data){
		dataCache = data ;
	};

	return {
		renderData : renderData,
		setData:setData,
		init : init,
		switchIndicator:switchIndicator
	}
})();

/**
 * js文件加载工具 加载进html中,通过window直接访问是OK的
 * @type {{load}}
 */
var loadTool = (function() {
	//顺序加载JS脚本数据（变量值）
	var loadOne = function(url) {
		var dtd = $.Deferred(); //定义延迟对象
		var node = document.createElement('script');
		node.type = "text/javascript"; //读文件类型
		var onload = function() {
			dtd.resolve(); //加载JS完成，清除
		};
		//文件读取完成事件
		$(node).load(onload).bind('readystatechange', function() {
					if (node.readyState == 'loaded') {
						onload();
					}
				});
		document.getElementsByTagName('head')[0].appendChild(node);//加载到当前页面中
		node.src = url; //脚本文件路径
		return dtd.promise(); //返回一个新的延迟对象
	};

	/**
	 * 根据完整路径urls，加载多个文件
	 * urls需要为数组,如果非数组,则需要转化为数组
	 */
	var load = function(urls) {
		if (!$.isArray(urls)) { //非数组
			return load([urls]);
		}
		var ret = [];
		var leng = urls.length;
		for (var i = 0; i < leng; i++) {
			ret[i] = loadOne(urls[i]);//加载JS文件脚本，到当前页面
		}
		return $.when.apply($, ret);//加载JS应用开始
	};
	return {
		load : load
	}
})();
