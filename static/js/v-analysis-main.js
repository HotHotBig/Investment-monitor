//百度地图
window.onload=function(){
	var map = new BMap.Map("map",{mapType: BMAP_HYBRID_MAP});

	// 创建地图实例  
	var point = new BMap.Point(106.700919, 26.575098);
	map.centerAndZoom(point, 9);
	$("#region_select").change(function(){
		var region_options = $("#region_select");
		map.centerAndZoom(region_options.val(),9);
	});
	
    var mapBoxHeight = $(window).height()  - $('nav').height();
    $('#map').css({height: mapBoxHeight + 'px'});
	// 创建点坐标  
	

	map.enableScrollWheelZoom();
	map.enableContinuousZoom();

	//添加缩放控件
	var opts = {type:BMAP_NAVIGATION_CONTROL_ZOOM};
	var navigationcontrol = new BMap.NavigationControl(opts);
	map.addControl(navigationcontrol);

	//添加图层类型控件
	map.addControl(new BMap.MapTypeControl());


	//鼠标绘制
	var overlays = [];
	var overlaycomplete = function(e){
        overlays.push(e.overlay);
    };
    var styleOptions = {
        strokeColor:"#99ffff",    
        fillColor:"#99ffff",      
        strokeWeight: 1,       
        strokeOpacity: 0.5,	  
        fillOpacity: 0.5,  
        strokeStyle: 'solid'
    }
    //实例化鼠标绘制工具
    var options = {
        isOpen:false, 
        drawingType:BMAP_DRAWING_CIRCLE, 
        enableDrawingTool: true, 
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_LEFT,
            offset: new BMap.Size(592,60), 
            drawingModes:[
            	BMAP_DRAWING_CIRCLE,
            	BMAP_DRAWING_POLYGON,
            	BMAP_DRAWING_RECTANGLE
            ]
        },
        circleOptions: styleOptions, //圆的样式
        polygonOptions: styleOptions, //多边形的样式
        rectangleOptions: styleOptions //矩形的样式
    }

	var drawingManager = new BMapLib.DrawingManager(map,options);
	drawingManager._drawingTool.hide();

    //选择区域按钮显示/隐藏
	var num=0; 
    
	$('.select_region').click(function(e){ 
		if(num++ %2 == 0){ 
			drawingManager._drawingTool.show(); 
		}else{ 
			drawingManager._drawingTool.hide();
		} 
		e.preventDefault();
	}); 

    //清除按钮
	$(".clear").bind("click",function(){
        // debugger;
		map.clearOverlays();
        $('.dl_list ul>li label').removeClass('activate');
        $('.dl_list ul li input:checkbox').prop({checked:false});
        $('#selected_value').children().remove();
        document.getElementsByClassName("search_result")[0].style="transition:all 1s;display:none;";
	});

    var data_info = [

            {
                "longitude" : "106.700919",
                "latitude" : "26.575098",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市南明",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "25%",
                "industry_num" : "18001",
                "industry_name" : "农业",
                "shenhe_state" : "未审核"
            },
            {
                "longitude" : "106.724491",
                "latitude" : "26.60482",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市南明",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "30%",
                "industry_num" : "18002",
                "industry_name" : "林业",
                "shenhe_state" : "未审核"
            },
            {
                "longitude" : "106.730527",
                "latitude" : "26.619549",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市南明",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "100%",
                "industry_num" : "18003",
                "industry_name" : "旅游业",
                "shenhe_state" : "已驳回"
            },
            {
                "longitude" : "106.730527",
                "latitude" : "26.60482",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市测试",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "100%",
                "industry_num" : "18004",
                "industry_name" : "林业",
                "shenhe_state" : "已驳回"
            },
            {
                "longitude" : "106.700919",
                "latitude" : "26.619549",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市南明",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "80%",
                "industry_num" : "18005",
                "industry_name" : "水产业",
                "shenhe_state" : "审核通过"
            },
            {
                "longitude" : "106.705",
                "latitude" : "26.62",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市南明",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "20%",
                "industry_num" : "18006",
                "industry_name" : "钢铁工业",
                "shenhe_state" : "审核通过"
            },
            {
                "longitude" : "106.729",
                "latitude" : "26.609",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市南明",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "60%",
                "industry_num" : "18007",
                "industry_name" : "旅游业",
                "shenhe_state" : "审核通过"
            },
            {
                "longitude" : "106.732",
                "latitude" : "26.613",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市南明",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "85%",
                "industry_num" : "18008",
                "industry_name" : "制造业",
                "shenhe_state" : "未开始"
            },
            {
                "longitude" : "106.725",
                "latitude" : "26.61",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市南明",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "75%",
                "industry_num" : "18009",
                "industry_name" : "建筑业",
                "shenhe_state" : "未开始"
            },
            {
                "longitude" : "106.739",
                "latitude" : "26.591",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市南明",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "40%",
                "industry_num" : "18010",
                "industry_name" : "服务业",
                "shenhe_state" : "未审核"
            }
    ]

    marker_info = ["../vis-master1/data/image/1.png","../vis-master1/data/image/2.png","../vis-master1/data/image/3.png","../vis-master1/data/image/4.png","../vis-master1/data/image/5.png"]


    var pro_opts = {
    	width:300,
    	height:280,
    	title:"项目信息",
    	enableMessage:true
    };

    //搜索点击事件
    $(".search_text").focus(function(){
        $(this).val("");
    })
    $(".search_btn").bind("click",function(){
        var searchtext = $(".search_text").val();
        map.clearOverlays();

        searchBoth(searchtext);
        $('.search_result').css({'display':'block','opacity':'1'});
    });

    function searchBoth(searchtext){
        for (var i = 0; i < data_info.length; i++) {
            if(searchtext == data_info[i].industry_name){
                addMarkers(i);
                randerList(i);
            }
            if(searchtext == data_info[i].industry_num){
                addMarkers(i);
                randerList(i);
            }
        }
    }

    //添加不同样式标注点，渲染地图randerMap()
    function addMarkers(i){
        var pt = new BMap.Point(data_info[i].longitude,data_info[i].latitude);
        
        if (0 < parseFloat(data_info[i].project_progress) && parseFloat(data_info[i].project_progress)<=20)
        {
            var myIcon = new BMap.Icon(marker_info[0],new BMap.Size(35,40));
        }
        else if(parseFloat(data_info[i].project_progress)>20 && parseFloat(data_info[i].project_progress)<=50)
        {
            var myIcon = new BMap.Icon(marker_info[1],new BMap.Size(35,40));
        }
        else if(parseFloat(data_info[i].project_progress)>50 && parseFloat(data_info[i].project_progress)<=80)
        {
            var myIcon = new BMap.Icon(marker_info[2],new BMap.Size(35,40));
        }
        else if(parseFloat(data_info[i].project_progress)>80 && parseFloat(data_info[i].project_progress)<100)
        {
            var myIcon = new BMap.Icon(marker_info[3],new BMap.Size(35,40));
        }
        else
        {
            var myIcon = new BMap.Icon(marker_info[4],new BMap.Size(35,40));
        }

        var marker = new BMap.Marker(pt,{icon:myIcon});
        var content = '<p class="info_content">地址：'+data_info[i].address+'<br/>项目名称：'+data_info[i].project_name+'<br/>项目单位名称：'+data_info[i].unit_name+'<br/>项目计划总投资：'+data_info[i].plan_investment+'<br/>项目进度：'+data_info[i].project_progress+'<br/>开工时间：'+data_info[i].work_time+'</p>';
        map.addOverlay(marker);
        addClickHandler(content,marker);
    }

    function randerList(i){
        // debugger;
        var ul = $("<ul class='result_ul'></ul>");
            res_div = $("#tabs-1");
        //var total = arr1.concat(arr2,arr3);
        if (0 < parseFloat(data_info[i].project_progress) && parseFloat(data_info[i].project_progress)<=20)
        {
            var icon_src = marker_info[0];
        }
        else if(parseFloat(data_info[i].project_progress)>20 && parseFloat(data_info[i].project_progress)<=50)
        {
            var icon_src = marker_info[1];
        }
        else if(parseFloat(data_info[i].project_progress)>50 && parseFloat(data_info[i].project_progress)<=80)
        {
            var icon_src = marker_info[2];
        }
        else if(parseFloat(data_info[i].project_progress)>80 && parseFloat(data_info[i].project_progress)<100)
        {
            var icon_src = marker_info[3];
        }
        else
        {
            var icon_src = marker_info[4];
        }
        //排序显示
        
        var lis = $("<li class='result_items'><a class='result_items_a' href='#'>"+data_info[i].project_name+"</a><p class='result_items_p'>"+data_info[i].project_progress+"</p><img class='result_items_img' src='"+icon_src+"' /></li>");
        lis.appendTo(ul);
        ul.appendTo(res_div);
    }

    //默认显示点
    for(var i = 0; i<data_info.length; i++){

        // addMarkers(i);

    }

    //添加标注点
    function addMarker(point){
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }

    //标注点击事件
	function addClickHandler(content,marker){
        // debugger;
		marker.addEventListener("click",function(e){
			openInfo(content,e)}
		);
	}

    //打开信息窗口
	function openInfo(content,e){
		var p = e.target;
		var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		var infoWindow = new BMap.InfoWindow(content,pro_opts); 
		map.openInfoWindow(infoWindow,point); 
	}



    //图例
    var closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click',function(){
    	document.getElementById('legend').style="opacity:0;width:0;height:0;transition:all 1s;";
    	var openBtn = document.createElement("p");
    	openBtn.setAttribute('id','openBtn');
    	openBtn.appendChild(document.createTextNode("打开图例"));
    	openBtn.style.cssText = "width:4rem;height:2rem;color:#fff;border-radius:5px;cursor: pointer;line-height:2rem;font-size:1rem;background:rgba(102,102,255,.9);position:fixed;bottom:3rem;left:.5rem;";

    	openBtn.addEventListener('click',function(){
    	document.getElementById('legend').style="opacity:1;width:13rem;height:16rem;transition:all 1s;";
    	this.style="display:none;"
    });
    	map.getContainer().appendChild(openBtn);
    });
    


    //筛选框打开关闭
    $(".toggle_btn").bind("click",function(){
    	$(".search_condition").toggle(100);
    });

    //筛选框
    var filterData = [
    	{
            
            "cb_name":"cb_exa_status",
    		"name":"审核状态",
    		"value":"shenhe_status",
    		"data":[
    			{
                    "cb_id":"cb_exa_1",
    				"name":"未开始",
    				"value":"未开始"
    			},
    			{
                    "cb_id":"cb_exa_2",
    				"name":"未审核",
    				"value":"未审核"
    			},
    			{
                    "cb_id":"cb_exa_3",
    				"name":"审核通过",
    				"value":"审核通过"
    			},
    			{
                    "cb_id":"cb_exa_4",
    				"name":"已驳回",
    				"value":"已驳回"
    			}
    		]
    	},
    	{
            
            "cb_name":"cb_pro_status",
    		"name":"进度状态",
    		"value":"jindu_status",
    		"data":[
    			{
                    "cb_id":"cb_pro_1",
    				"name":"0~20%",
    				"value":"0~20%"
    			},
    			{
                    "cb_id":"cb_pro_2",
    				"name":"20%~50%",
    				"value":"20%~50%"
    			},
    			{
                    "cb_id":"cb_pro_3",
    				"name":"50%~80%",
    				"value":"50%~80%"
    			},
    			{
                    "cb_id":"cb_pro_4",
    				"name":"80%~100%",
    				"value":"80%~100%"
    			}
    		]
    	},
    	{
            
            "cb_name":"cb_ind_category",
    		"name":"行业大类",
    		"value":"hangye_category",
    		"data":[
    			{
                    "cb_id":"cb_ind_1",
    				"name":"全部",
    				"value":"全部"
    			},
    			{
                    "cb_id":"cb_ind_2",
    				"name":"农业",
    				"value":"农业"
    			},
    			{
                    "cb_id":"cb_ind_3",
    				"name":"林业",
    				"value":"林业"
    			},
    			{
                    "cb_id":"cb_ind_4",
    				"name":"水产业",
    				"value":"水产业"
    			},
    			{
                    "cb_id":"cb_ind_5",
    				"name":"钢铁工业",
    				"value":"钢铁工业"
    			},
    			{
                    "cb_id":"cb_ind_6",
    				"name":"旅游业",
    				"value":"旅游业"
    			},
    			{
                    "cb_id":"cb_ind_7",
    				"name":"服务业",
    				"value":"服务业"
    			},
    			{
                    "cb_id":"cb_ind_8",
    				"name":"制造业",
    				"value":"制造业"
    			},
    			{
                    "cb_id":"cb_ind_9",
    				"name":"建筑业",
    				"value":"建筑业"
    			}

    		]
    	},
    	{
            
            
    		"name":"重点项目",
    		"value":"zhongdian_project",
    		"data":[
    			{
                    "cb_id":"cb_imp_1",
    				"name":"未开始",
    				"value":"未开始"
    			},
    			{
                    "cb_id":"cb_imp_2",
    				"name":"未审核",
    				"value":"未审核"
    			},
    			{
                    "cb_id":"cb_imp_3",
    				"name":"审核通过",
    				"value":"审核通过"
    			},
    			{
                    "cb_id":"cb_imp_4",
    				"name":"已驳回",
    				"value":"已驳回"
    			}
    		]
    	},
    ];




    //添加筛选标签
    for(var i in filterData){
    	var item = filterData[i],
    		data = item.data,
    		dl = $('<dl id="'+item.value+'"class="dl_list" value="'+item.value+'"><dt>'+item.name+':</dt></dl>'),
    		ul = $('<ul class="inline"></ul>');
    	for(var j in data){
    		var subdata = data[j];
    		 $('<li><input type="checkbox" name="'+item.cb_name+'"id="'+subdata.cb_id+'" class="cb_box" value = "' + subdata.value + '"/><label value="'+subdata.value+'" for="'+subdata.cb_id+'">'+ subdata.name +'</label></li>').appendTo(ul);
    	}
    	ul.appendTo($('<dd></dd>')).appendTo(dl);
        dl.appendTo($('.search_condition'));
    }



    var arr1 = [],
        arr2 = [],
        arr3 = [];


    $(".search_condition li label").bind("click",function(){
        // debugger;
        var type = $(this).parents('dl').attr('value');
        // $(this).removeClass('activate');
        $("#tabs-1").children().remove();
        // $('#'+type+' ul>li label').removeClass('activate');
        if(!$(this).hasClass('activate')){
            $(this).addClass('activate');
            var item = $('<div class="span1" value="'+$(this).attr("value")+'" type="'+type+'"><span>'+$(this).html()+'</span></div>');

            if(type=="shenhe_status"){
                arr1.push($(this).html());
            }
            if(type=="jindu_status"){
                arr2.push($(this).html());
            }
            if(type=="hangye_category"){
                arr3.push($(this).html());
            }




            var deleteBtn = $('<i class="icon_remove"></i>').bind("click",function(){
                //debugger;
                var txt = $(this).prev('span').html();
                $(this).parent().remove();
                $("#tabs-1").children().remove();
                $('#'+type+' ul>li label').removeClass('activate');
                $('#'+type+' ul li input:checkbox[value="'+txt+'"]').prop({checked:false});
                // var deltype = $(this).parent(".span1").attr("value");
                //debugger;
                if(type=="shenhe_status"){
                    var valtxt = $(this).parent(".span1").attr("value");
                    for(let i = 0;i<arr1.length;i++){
                        if(arr1[i]==valtxt){
                            arr1.splice(i,1);
                        }
                        else{
                            continue;
                        }
                    }
                }
                if(type=="jindu_status"){
                    //debugger;
                    var valtxt = $(this).parent(".span1").attr("value");
                    for(let i = 0;i<arr2.length;i++){
                        if(arr2[i]==valtxt){
                            arr2.splice(i,1);
                        }
                        else{
                            continue;
                        }
                    }
                }
                if(type=="hangye_category"){
                    var valtxt = $(this).parent(".span1").attr("value");
                    for(let i = 0;i<arr3.length;i++){
                        if(arr3[i]==valtxt){
                            arr3.splice(i,1);
                        }
                        else{
                            continue;
                        }
                    }
                }
                searchAction(arr1,arr2,arr3);
                $('.search_result').css({'display':'block','opacity':'1'});
            });
            deleteBtn.appendTo(item); 
            item.appendTo('#selected_value'); //添加当前的筛选条件
            var searchtext =$(this).html();
            searchAction(arr1,arr2,arr3);
            $('.search_result').css({'display':'block','opacity':'1'});
        }
    });


function searchAction(arr1,arr2,arr3){
    // debugger;
    map.clearOverlays();
    if(arr1.length!=0){
            if (arr2.length!=0){
                if (arr3.length!=0){
                    for(let j in arr2){
                        var arr2item = arr2[j];
                            itemsplit = arr2item.split("~");
                        for(let i in data_info){
                            if((arr1.indexOf(data_info[i].shenhe_state)>=0) && ((parseFloat(data_info[i].project_progress) >= parseFloat(itemsplit[0])) && parseFloat(data_info[i].project_progress) <= parseFloat(itemsplit[1])) && (arr3.indexOf(data_info[i].industry_name)>=0)){
                                addMarkers(i);
                                randerList(i);
                            }
                        } 
                    }
                }
                else{
                    for(let j in arr2){
                        var arr2item = arr2[j];
                            itemsplit = arr2item.split("~");
                        for(let i in data_info){
                            if ((arr1.indexOf(data_info[i].shenhe_state)>=0)&& ((parseFloat(data_info[i].project_progress) >= parseFloat(itemsplit[0])) && parseFloat(data_info[i].project_progress) <= parseFloat(itemsplit[1])) && (arr3.indexOf(data_info[i].industry_name)==-1)){
                                addMarkers(i);
                                randerList(i);
                            }
                        }
                    }
                }
            }
            else{
                if (arr3.length!=0){
                    for(let i in data_info){
                        if ((arr1.indexOf(data_info[i].shenhe_state)>=0) && (arr3.indexOf(data_info[i].industry_name)>=0)) {
                            addMarkers(i);
                            randerList(i);
                        }
                    }
                }
                else{
                    for(let i in data_info){
                        if ((arr1.indexOf(data_info[i].shenhe_state)>=0)&& (arr3.indexOf(data_info[i].industry_name)==-1)) {
                            addMarkers(i);
                            randerList(i);
                        }
                    }
                }
            }
    }
    else{
        if (arr2.length!=0){
            if (arr3.length!=0){
                for(let j in arr2){
                    var arr2item = arr2[j];
                        itemsplit = arr2item.split("~");
                    for(let i in data_info){
                        if ((parseFloat(data_info[i].project_progress) >= parseFloat(itemsplit[0]) && parseFloat(data_info[i].project_progress) <= parseFloat(itemsplit[1])) && (arr3.indexOf(data_info[i].industry_name)>=0)) {
                            addMarkers(i);
                            randerList(i);
                        }
                    }
                }
            }
            else{
                for(let j in arr2){
                    var arr2item = arr2[j];
                        itemsplit = arr2item.split("~");
                        console.log(itemsplit);
                    for(let i in data_info){
                        if ((parseFloat(data_info[i].project_progress) >= parseFloat(itemsplit[0]) && parseFloat(data_info[i].project_progress) <= parseFloat(itemsplit[1])) && (arr3.indexOf(data_info[i].industry_name)==-1)) {
                            addMarkers(i);
                            randerList(i);
                        }
                    }
                }
            }
        }
        else{
            if (arr3.length!=0){
                for(let i in data_info){
                    if (arr3.indexOf(data_info[i].industry_name)>=0) {
                        addMarkers(i);
                        randerList(i);
                    }
                }
            }
            else{
                map.clearOverlays();
                document.getElementsByClassName("search_result")[0].style="transition:all 1s;display:none;";
            }
        }
    }
}    














    //结果面板选项卡切换
    $('#tabs').tabulous({
        effect: 'scale'
    });

    //关闭结果面板
    $('#result_closeBtn').bind('click',function(){
        document.getElementsByClassName("search_result")[0].style="transition:all 1s;display:none;";
    });

       
}
