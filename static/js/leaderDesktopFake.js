//行业分析
//基于准备好的dom，初始化echarts实例（行业分析）
var industryChart = echarts.init(document.getElementById('industry-analysis-main'));
var industryName = null;
var industryData = null;

//多期对比
//基于准备好的dom，初始化echarts实例（多期对比）
var multiphaseChart = echarts.init(document.getElementById('multiphase-contrast-main'));
var multiphaseName = null;
var multiphaseData = null;
//当前的指标
var indexName = "其中：本周完成投资";
//多期对比报告期
var startData = null;
var endData = null;
//报告期
var reportData = [];

var winHeight = $(window.parent.window).height();
var containerHeight = $(".container").height();
if(winHeight<=containerHeight){
	$(".header").css("margin","10px 0");
	$(".col-style").css("height","45%");
}

//初始化页面
$(function(){
	getReportData();
	var reportDatas = reportData[0].split('.');
	var year = $(".nav-pills .report-year-btn .number").html(reportDatas[0]);
	var month = $('.nav-pills .report-month-btn .number').html(reportDatas[1]);
	var day = $('.nav-pills .report-day-btn .number').html(reportDatas[2]);
	//多期对比报告期
	var firstReportDatas = reportData[reportData.length-1].split('.');
	$(".nav-pills .start-report-year-btn .number").html(firstReportDatas[0]);
	$('.nav-pills .start-report-month-btn .number').html(firstReportDatas[1]);
	$('.nav-pills .start-report-day-btn .number').html(firstReportDatas[2]);
	
	//得到指标概要的相关数据
	getAreaData(reportData[0]);
	
	$(".cartogram-box .indexes-cartogram").eq(0).addClass("checked2");
	//初始化行业分析，初始默认显示第一个指标（其中：本周完成投资）
	getIndustryData(reportData[0], "其中：本周完成投资");
	initEcharts('industry-analysis-main', industryOptionFun(), 8, 'yAxis', 0, 10);
	
	//初始化多期对比，初始默认显示第一个指标（其中：本周完成投资）
	getMultiphaseReportData();
	
	//切换指标事件
	$('.cartogram-box').on('click', 'div', function (e) {
	    if (e.target.className.indexOf("indexes-cartogram") != -1 || e.target.parentElement.className.indexOf("indexes-cartogram") != -1) {
	    	$(".cartogram-box .indexes-cartogram").removeClass("checked2");
	    	$(this).addClass("checked2");
	    	indexName = $(this).find(".indexes-cartogram-name").html();
	    	//行业分析随指标切换联动
	    	getIndustryData(reportData[0], indexName);
	    	initEcharts('industry-analysis-main', industryOptionFun(), 8, 'yAxis', 0, 10);    		    	   	
	    	//切换地图指标
	    	Map.switchIndicator(indexName);	    		    	
	    	//获取时序对比数据
	    	getMultiphaseReportData();
	    }
	});	
	
	//下拉菜单选中一项
	$('.nav-pills').on('click', 'ul li', function (e) {
	    if (e.target.className.indexOf("presentation") == -1 || e.target.parentElement.className.indexOf("presentation") == -1) {
	    	$(this).parent().parent().find('button .number').html($(this).html());
	    	
	    	//多期对比报告期切换(具体时间点)
	    	if($(this).parent().parent().attr('class').indexOf("start")!=-1 || $(this).parent().parent().attr('class').indexOf("end")!=-1){	    		
	    		getMultiphaseReportData();		    	
	    	}
	    	
	    	//多期对比报告期切换(最近几个月)
	    	if($(this).parent().parent().attr('class').indexOf("reportData")!=-1){	    		
	    		var endDatas = endData.split(".");
	    		var endYear = parseInt(endDatas[0]);
	    		var endMonth = parseInt(endDatas[1]);
	    		var endDay = parseInt(endDatas[2]);
	    		var checkeData = $(this).val();
	    		var earliestMonth = endMonth-checkeData+1;
	    		var startYear = endYear;
	    		var startMonth = 0;
	    		if(earliestMonth <= 0 ){
	    			var i = 1;
	    			earliestMonth = endMonth+12-checkeData;
	    			startMonth = earliestMonth;
		    		for(i; earliestMonth<=0; i++){
		    			earliestMonth = startMonth+12;
		    			startMonth = earliestMonth;		  
		    		}
	    			startYear = endYear-i;
	    		}
    			/*startData = startYear + "." + earliestMonth + "." + 1;*/
    			$(".start .start-report-year-btn .number").html(startYear);
    			$(".start .start-report-month-btn .number").html(earliestMonth);
    			$(".start .start-report-day-btn .number").html(1);
    			getMultiphaseReportData();	    		
	    	}
	    }
	});
	
});

//刷新多期对比数据
function getMultiphaseReportData(){
	var startYear = $(".start .start-report-year-btn .number").html();
	var startMonth = $(".start .start-report-month-btn .number").html();
	var startDay = $(".start .start-report-day-btn .number").html();
	
	var endYear = $(".end .end-report-year-btn .number").html();
	var endMonth = $(".end .end-report-month-btn .number").html();
	var endDay = $(".end .end-report-day-btn .number").html();
	
	startData = startYear + "." + startMonth + "." + startDay;
	endData = endYear + "." + endMonth + "." + endDay;
	
	var startReportData = startData.split('.');
	var endReportData = endData.split('.');
	var data1 = new Date(Date.UTC(startReportData[0],startReportData[1],startReportData[2]));
	var data2 = new Date(Date.UTC(endReportData[0],endReportData[1],endReportData[2]));
	if(data2-data1 > 0){
		getTimingComparisonData(startData,endData,indexName);
		var multiphaseOption = multiphaseOptionFun();
		multiphaseOption.xAxis.interval = "auto";
    	initEcharts('multiphase-contrast-main', multiphaseOption, 5, 'xAxis', "auto", 0);
    	
	}
}



//指标切换，echartsOption（统计图）参数，随着指标切换，数据跟着改变
function industryOptionFun(){
		return {
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    grid: {
	    	left: '5%',
	        top: '0',
	    	width: '85%',
	    	height: '100%',
	        containLabel: true
	    },
	    xAxis: {
	    	show: false,
	        type: 'value',
	        axisLabel: {
	            show: false
	        },
	        axisLine:{
	            show: false
	        },
	        splitLine:{show: false}
	    },
	    yAxis: {
	        type: 'category',
	        data: industryName/*['批发和零售业','采矿业','制造业','农、林、牧、渔业','交通运输、仓储和邮政业','建筑业','电力，热力，燃气及水产和供应业']*/,        	        
	        axisLine:{
	            lineStyle:{
	                color:'#00c7fe',
	                width:2,
	                type: 'solid'//这里是为了突出显示加上的，可以去掉                    
	            },
	        },
	        axisTick: {
	        	alignWithLabel: true,
	        	length: 4,
	        	lineStyle: {
	        		width: 3
	        	}
	        },
	        
	    },
	    series: [
	        {
	            name: indexName,
	            type: 'bar',
//	            data: industryData/*[35,70, 40, 65, 55, 100, 45]*/,
	            data: [285,70, 40, 65, 55, 10, 45],
	            itemStyle:{
	                normal:{color:'#00c7fe'}
	            },
	            barWidth: '15px',
	            /*barGap: '20px',            // 柱间距离，默认为柱形宽度的30%，可设固定值
	            barCategoryGap : '20px',
	            padding: '20px',*/
	            label:{ 
		            	normal:{ 
		            	show: true, 
		            	position: 'right',
		            	/*formatter: '{c}%',*/
		            	textStyle: {
		            		color: 'white'
		            	}} 
	            	}
	        }      
	    
	    ]
	};


}

//多期对比，echartsOption（统计图）参数，随着指标切换，数据跟着改变
function multiphaseOptionFun(){
	return  {
			tooltip: {
		        trigger: 'axis'
		    },
		    dataZoom: {
		        show: true,
		        start : 0,
		        height: 15,
		        textStyle: {
		        	color: "white"
		        },
		        bottom: "7%"
		    },
		    /*legend: {
		        data:[
		              {
			              name: indexName,
			              icon: 'circle'
		        	  },
		        	  {
		        		  name:'自开始建设累计投资',
			              icon: 'circle'
		        	  },
		        	  {
		        		  name:'本年完成投资',
			              icon: 'circle'
		        	  }
		        ],
		        bottom: '1%',
		        align: 'left',
		        padding: 0,
		        itemGap: 20,
		        textStyle: {
		        	color: 'white'
		        }
		    },	 */
		    grid: {
		    	show: true,
		        top: '2%',
		        width: '80%',
		        height: '80%',
		        containLabel: true,
		        backgroundColor: 'rgba(255,255,255,0.03)'
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        /*data: multiphaseName['01-07','01-15','02-06','02-15','03-07','03-15','04-10','04-15','04-21','05-01','05-09','05-15','06-07','06-10','06-15','06-17','07-09','07-15','08-01','09-27','12-22','12-30'] ,*/
		        data: ['01-07','01-15','02-06','02-15','03-07','03-15','04-10','04-15','04-21','05-01','05-09','05-15','06-07','06-10','06-15','06-17','07-09','07-15','08-01','09-27','12-22','12-30'] ,
		        axisLine:{
		            lineStyle:{
		                color:'#00c7fe',
		                width:2,
		                type: 'solid'//这里是为了突出显示加上的，可以去掉                    
		            }	    
		        },
		        axisLabel: {
		        	interval: 0,
		        	textStyle: {
			            color: 'white'	        		
		        	},
		        	formatter: function (value, index) {
		        	    // 格式化成月/日，只在第一个刻度显示年份
		        	    var texts = [];
		        	    if (index%3 === 0) {
		        	    	texts.push(value);
		        	    }
		        	    return texts;
		        	}
		        },	        
		        splitLine:{
		        	show: true,
		        	lineStyle: {
		        		color: 'rgba(255,255,255,0.4)',
		        		type: 'dotted'
		        	}
		        },
		        axisTick: {show: false}
		    },
		    yAxis: {
		        type: 'value',
		        axisLine:{
		            lineStyle:{
		                color:'#00c7fe',
		                width:2,
		                type: 'solid'//这里是为了突出显示加上的，可以去掉                    
		            }
		    
		        },
		        splitLine:{
		        	show: true,
		        	lineStyle: {
		        		color: '#00c7fe',
		        		type: 'dotted'
		        	}
		        },
		        axisTick: {show: false},
		        splitNumber: 10,
		        minInterval: 10
		    },
		    /*toolbox: {  
	            show : true,  
	            orient: 'vertical',
	            feature : {  
	                mark : {show: true}, // 辅助线标志，上图icon左数1/2/3，分别是启用，删除上一条，删除全部  
	                dataView : {show: true, readOnly: false},// 数据视图，上图icon左数8，打开数据视图  
	                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},// 图表类型切换，当前仅支持直角系下的折线图、柱状图转换，上图icon左数6/7，分别是切换折线图，切换柱形图  
	                restore : {show: true}, // 还原，复位原始图表，上图icon左数9，还原  
	                saveAsImage : {show: true} // 保存为图片，上图icon左数10，保存  
	            },
	            right: 5,
	            top: '10%'
	        }, */ 
		    series: [
		        {
		            name: indexName,
		            type:'line',
		            /*data: multiphaseData [20, 21, 25, 22, 30, 35, 40,50,36,45,50,40,20,20, 50,40, 22, 35, 35,10, 41, 35] ,*/
		            data: [20, 21, 25, 22, 30, 35, 40,50,36,45,50,40,20,20, 50,40, 22, 35, 35,10, 41, 35] ,
		            itemStyle: {
		            	normol: {color: "#f7494a"}
		            },
		            symbol: 'circle'
		        }/*,
		        {
		            name:'自开始建设累计投资',
		            type:'line',
		            data:[25, 20, 30, 20, 36, 45, 30,40,44,40,30,20,35,20, 20,35, 22, 20, 35,50, 25, 45],
		            itemStyle: {
		            	normal: {color: "#f38a32"}
		            },
		            symbol: 'circle'
		        },
		        {
		            name:'本年完成投资',
		            type:'line',
		            data:[20, 28, 40, 50, 30, 40, 22,32,13,30,35,26,37,32,13, 25, 22, 30, 35,30, 31, 25],
		            itemStyle: {
		            	normal: {color: "#3ec59d"}
		            },
		            symbol: 'circle'
		        }*/
		      ]  
		    
	 
	};
}

//初始化echarts
function initEcharts(echartContainer,option,number,axis,intervalVal,rotate){
	eChart = echarts.init(document.getElementById(echartContainer));
	option = newline(option, number, axis, intervalVal, rotate);
	eChart.setOption(option);
}

//统计图轴线条目换行
function newline(option, number, axis, intervalVal, rotateNum){
    option[axis]['axisLabel']={    		
        interval: intervalVal,
        formatter: function(params){
            var newParamsName = "";
            var paramsNameNumber = params.length;
            var provideNumber = number;
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
            if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p == rowNumber - 1) {
                        tempStr = params.substring(start, paramsNameNumber);
                    } else {
                        tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;
                }
            } else {
                newParamsName = params;
            }
            return newParamsName;
        },
        textStyle: {
            color: 'white'
        },
        rotate: rotateNum,
        margin: 12
    };
    return option;
}

//设置全局ajax请求同步
$.ajaxSetup({
	  async: false
});


//获取各类数据的报告期
function getReportData() {
	$.post(SGIS.Ajax.getUrl("hdh.totaltable.periods"), {
		tablecode : TotalTable.region.tablecode
	// 来自配置文件table.config.js
	}, function(re) {
		// 返回数组
		var year = [];
		var month = [];
		var day = [];
		$('.report-month').html('');
		$('.report-day').html('');
		for ( var i = 0; i < re.length; i++) {
			reportData.push(re[i]);
			var data = re[i].split('.');
			if($.inArray(data[0],year) == -1){
				year.push(data[0]);
			}
			if($.inArray(data[1],month) == -1){
				month.push(data[1]);
			}
			if($.inArray(data[2],day) == -1){
				day.push(data[2]);
			}			
		}
		month.sort();
		day.sort();
		$(".report-year-btn .number").html(year[0]);
		$(".report-month-btn .number").html(month[0]);
		$(".report-day-btn .number").html(day[0]);
		for(var i=0; i<year.length; i++){
			$('.report-year').append('<li role="presentation" class="presentation">' + year[i] + '</li>');
		}
		for(var i=0; i<month.length; i++){
			$('.report-month').append('<li role="presentation" class="presentation">' + month[i] + '</li>');
		}
		for(var j=0; j<day.length; j++){
			$('.report-day').append('<li role="presentation" class="presentation">' + day[j] + '</li>');
		}
		$('.report-year').html(year);
	});
};

// 获取按区域汇总的数据
function getAreaData(data){
	$(".cartogram-box div.indexes-cartogram").remove();
	$.post(SGIS.Ajax.getUrl("hdh.totaltable.data"), 
			{
		     tablecode: TotalTable.region.tablecode, //来自配置文件table.config.js
			  time: data//来自第二步中的获取的报告期
		 },function(re){
		 	//设置分区域缓存数据
		 	Map.setData(re);
		 	
			//返回json格式
			 var fields = re.fields;
			 var values = re.values[0];
			 var indexsData = [];
			 var indexsData2 = [50,100,1500,500,100];
			 var k = 0;
			 //累计完成投资
			 var grandTotal = 0;
			 //计划总投资
			 var planTotal = 0;
			 
			 //指标概要
			 for(var j=0;j<values.length;j++){
				 if(j>=2){
					 if(values[j] == null || values[j] == ""){
						 values[j] = 0;
					 }
					 indexsData.push(values[j]);
				 }
			 }
			 
			 for(var i=0,j=0; i<fields.length,j<indexsData.length; i++,j++){
				 if(fields[i].cname.indexOf("累计完成投资")!=-1){
					 grandTotal = indexsData[j]/10000;
				 }
				 if(fields[i].cname.indexOf("计划总投资")!=-1){
					 planTotal = indexsData[j];
				 }
				 var cname = fields[i].cname.split('(');
				 var name = cname[0];
				 if(name.indexOf('累计完成投资') >= 0){
					 name = "自开建累计投资";
				 }
				 var imgName = null;
				 var colorClass = null;
				 k++;
				 //设置背景图框
				 if(k>3){
					 k = 1;					 
				 }
				 if(cname[1].indexOf('万') >= 0){
					 imgName = "indicators-w-"+k;
					 colorClass = "indexes-cartogram-number-w-"+k;
					 
				 }
				 if(cname[1].indexOf('个') >= 0){
					 imgName = "indicators-a";
					 colorClass = "indexes-cartogram-number-a";
				 }
				 if(cname[1].indexOf('亿') >= 0){
					 imgName = "indicators-t";
					 colorClass = "indexes-cartogram-number-t";
				 }				 
				 indexsData[j] = Math.round(indexsData[j]);
				 /*$("#indexes-completed-progress").after('<div class="cartogram indexes-cartogram"><img src="././img/leader/'+imgName+'.png"/><span class="indexes-cartogram-number '+colorClass+'">'+indexsData[j]+'</span><span class="indexes-cartogram-name font-medium hide">'+cname[0]+'</span><span class="indexes-cartogram-name-show font-medium">'+name+'</span></div>');*/
				 $("#indexes-completed-progress").after('<div class="cartogram indexes-cartogram"><img src="././img/leader/'+imgName+'.png"/><span class="indexes-cartogram-number '+colorClass+'">'+indexsData2[j]+'</span><span class="indexes-cartogram-name font-medium hide">'+cname[0]+'</span><span class="indexes-cartogram-name-show font-medium">'+name+'</span></div>');
			 }
			 
			 //完成进度
			 var completeProgress = grandTotal/planTotal*100;
			 /*$('#p1BarPie').attr("data-to-value", Math.round(completeProgress));*/
			 $('#p1BarPie').attr("data-to-value", Math.round(50));
		});
}

//获取按行业汇总的数据
function getIndustryData(data, indexName){
	industryName = [];
	industryData = [];
	$.post(SGIS.Ajax.getUrl("hdh.totaltable.data"), 
			{
		     tablecode: TotalTable.industry.tablecode, //来自配置文件table.config.js
			  time: data//来自第二步中的获取的报告期
		 },function(re){
			//返回json格式
			 var fields = re.fields;
			 var values = re.values;
			 var j = 0;
			 //记录指标在数据中的位置
			 var index = 0;
			 for(var j=0; j<fields.length; j++){
				 if(fields[j].cname.indexOf(indexName) != -1){
					 index = j;
				 }
			 }

			 for(var i=0; i<values.length; i++){
				 if(i<10){
					 industryName.push(values[i][1]);
					 if(values[i][index+2] == null || values[i][index+2] == ""){
						 values[i][index+2] = 0;
					 }
					 industryData.push(values[i][index+2]);
				 }				 
			 }
			 

		});
}


//获取时序对比数据
function getTimingComparisonData(starttime, endtime, indexName){
	multiphaseName = [];
	multiphaseData = [];
	$.post(SGIS.Ajax.getUrl("hdh.seqtable.data"), 
			{
		     tablecode: TotalTable.seqcomparsion.tablecode, //来自配置文件table.config.js
			  starttime: starttime,//来自第二步中的获取的报告期
			    endtime: endtime//来自第二步中的获取的报告期
		 },function(re){
			//返回json格式			 
			 var fields = re.fields;
			 var values = re.values;
			 //记录指标在数据中的位置
			 var index = 0;
			 for(var j=0; j<fields.length; j++){
				 if(fields[j].cname.indexOf(indexName) != -1){
					 index = j;
				 }
			 }
			 for(var i=0; i<values.length; i++){
				 multiphaseName.push(values[i][1]);
				 if(values[i][index+2] == null || values[i][index+2] == ""){
					 values[i][index+2] = 0;
				 }
				 multiphaseData.push(values[i][index+2]);
			 }
		});
}




