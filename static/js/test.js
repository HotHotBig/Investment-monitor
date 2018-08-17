/**
 * Created by asus on 2018/6/20.
 */
$(function(){
    let $menu = $(".module-menu") ;
    $menu.find("a").click(function(){
        $menu.find("li").removeClass("active");
        $(this).parent().addClass("active");
        let id = $(this).attr("id");
        let path="./"+id+".html"
        window.open(path,"_self")
    }) ;
})



keywords = ['未审核','20%~50%','农业'];

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
                "shenhe_state" : "1"
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
                "shenhe_state" : "1"
            },
            {
                "longitude" : "106.730527",
                "latitude" : "226.619549",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市南明",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "100%",
                "industry_num" : "18003",
                "industry_name" : "旅游业",
                "shenhe_state" : "1"
            },
            {
                "longitude" : "106.730527",
                "latitude" : "26.60482",
                "address" : "贵州省贵阳市南明区沙坡路23号",
                "project_name" : "贵州省贵阳市南明",
                "unit_name" : "贵州花溪地",
                "plan_investment" : "10000000",
                "work_time" : "20180101",
                "project_progress" : "100%",
                "industry_num" : "18004",
                "industry_name" : "林业",
                "shenhe_state" : "1"
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
                "shenhe_state" : "1"
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
                "shenhe_state" : "1"
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
                "shenhe_state" : "1"
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
                "shenhe_state" : "1"
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
                "shenhe_state" : "1"
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
                "shenhe_state" : "1"
            }
    ]
var arr1 = [],
	arr2 = [],
	arr3 = [];



if(type=="shenhe_status"){
	$(this).html().push(arr1);
}
if(type=="jindu_status"){
	$(this).html().push(arr2);
}
if(type=="hangye_category"){
	$(this).html().push(arr3);
}

for(let j in arr2){
	let arr2_item = arr2[j];
	arr2_item.split("~");
}
for (let i in data_info){
	if (data_info[i].shenhe_state in arr1 || arr1.indexOf(data_info[i].shenhe_state)==-1 && data_info[i].project_progress) {}
}


