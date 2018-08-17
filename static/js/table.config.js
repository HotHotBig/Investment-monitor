/**
 * 报表、指标等固化配置
 */
 
 /**
  * 领导桌面汇总表配置
  * @type 
  */
var TotalTable ={
	//区域
	region:{
		tablecode:"7f0000001670",
		tablename:"按区划汇总投资指标"
	},
	//行业
	industry:{
		tablecode:"7f0000002210",
		tablename:"按行业汇总投资指标"
	},
	//时序对比
	seqcomparsion:{
		tablecode:"Bp0000002220",
		tablename:"多报告期投资指标对比分析"
	}
};
 
 /**
  * 报告期先固化下来
  * @type 
  */
var PeriodConfig =[{
	name:"周报",
	code:"6a0Y"
}];
 /**
  * 基本信息表
  * @type 
  */
var  BasicTable = {
	tableCode:"sl0000001400",   //表号
	tableName:"项目基本信息表",	//表名称或表描述
	queryFields:{	//
		proName:"R0C1", 
		proCode:"R0C0",
		industry:"",
		SMX:"R0C25",
		SMY:"R0C26"
	}
};

/**
 * 项目坐标表
 * @type 
 */
var XYTable = {
	tableCode:"sl0000001400",   //表号
	tableName:"项目基本信息表",	//表名称或表描述
	queryFields:{	//
		proName:"R0C4", 
		proCode:"R0C5",
		SMX:"R0C27",
		SMY:"R0C28"
	}
};

/**
 * 项目图片表
 * @type 
 */
var PicTable ={
	tableCode:"nA0000001500",   //表号
	tableName:"项目进度图片采集",	//表名称或表描述
	queryFields:{	//
		proName:"",
		proCode:"",
		picField:"R0C2"   //进度图片、宾栏多个	
	},
	location:{
		lonField:"R0C9",
		latField:"R0C8",
		time:"R0C6",  //拍摄时间
		heading:"R0C11" //拍摄方位
	},
	time:"R0C6" , //拍摄时间
	infoFields:["R0C3","R0C4","R0C6","R0C7"]   //图片详情 显示字段
} ;

/**
 * 地图弹窗信息配置
 * @type 
 */
var MapPopu = [{
		tableCode:"sl0000001400",   //表号
		tableName:"项目基本信息表",	//表名称或表描述
		fields:["R0C2","R0C8"]
	},{
		tableCode:"O80000001820",   //表号
		tableName:"项目投资表",	//表名称或表描述
		fields:["R0C0","R1C0","R2C0","R3C0"]
	}
];

/**
 * 手机端采集状态
 * @type 
 */
var PDAStatusTable ={
	tableCode:"sl0000001400",   //表号
	tableName:"项目基本信息表",	//表名称或表描述
	statusField:"R0C27"     //状态字段
};
/**
 * PDA采集报表
 * @type 
 */
var PDATables = [{
		tableCode:"nA0000001500",   //表号
		tableName:"进度图片采集",	//表名称或表描述
		isPic:true,
		time:"R0C6" , //拍摄时间
		showFields:["R0C2","R0C3"],  //显示的指标
		hideFields:[] ,    //隐藏的指标，同显示指标配置只有一个有效
		autoFields:{
			latitude:"拍摄经度",
			longitude:"拍摄纬度",
			time:"拍摄时间",  //拍摄时间
			heading:"照片拍摄方位"
		},
		//提交常量  自动填充
		cons:[{
			field:"R0C8",
			value: 1
		}]
	},{
		tableCode:"AI0000001820",   //表号
		tableName:"项目投资表",	//表名称或表描述
		isInvest: true ,
		isPic:false,
		showFields:["R3C0","R4C0","R5C0","R6C0","R7C0"],  //显示的指标
		hideFields:[] ,    //隐藏的指标，同显示指标配置只有一个有效
		autoFields:[],
		autoCalculate:{
			bq:"R3C0",	//本期累计
			dn:"R2C0",	//当年累计
			zkj:"R1C0"	//自开建以来
		}
	}
] ;
/**
 * pad图片采集检测
 * @type 
 */
var PDACheck ={
	distince:100000000000000 ,  //米
	heading:360	,	//度
	picNum:3     //图片数目
};