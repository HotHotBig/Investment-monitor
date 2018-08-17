/**
 * Created by asus on 2018/6/14.
 */
/**
 * date日期
 * num唯一指标
 * state{1,2,3,4,5}{全部,未开始,未审核,已审核,未通过}
 * type:[-1,3,'is_msxm']{按关注度，按项目建设类型，财政/民生项目}
 * location [a,b]经度，纬度
 * firm[a,b,c]公司名称，投资金额，开工时间
 * schedule进度
 * */
const data = {
    "赵县项目": {
        "date": [2018, 3, 3],
        "num": 100,
        "state": 2,
        "type": [-1, 1, 'is_msxm'],
        "location":[106.63,26.65],
        "firm":["百度",12521651,2017,5,6],
        "schedule":"15%",
    },
    "李县项目": {
        "date": [2018, 4, 3],
        "num": 200,
        "state": 2,
        "type": [-1, 1, 'is_msxm'],
        "location":[116.40 ,39.90],
        "firm":["腾讯",5612331,2018,3,5],
        "schedule":"15%",
    },
    "钱县项目": {
        "date": [2018, 5, 3],
        "num": 300,
        "state": 4,
        "type": [-1, 3, 'is_msxm'],
        "location":[117.20,39.12],
        "firm":["阿里",741251652,2018,6,5],
        "schedule":"15%",
    },
    "孙县项目": {
        "date": [2018, 7, 3],
        "num": 400,
        "state": 3,
        "type": [-1, 2, 'is_msxm'],
        "location":[114.52,38.05],
        "firm":["滴滴",10236547,2018,4,8],
        "schedule":"15%",
    },
    "刘县项目": {
        "date": [2018, 1, 3],
        "num": 500,
        "state": 2,
        "type": [-1, 4, 'is_msxm'],
        "location":[112.55,37.87],
        "firm":["美团",67543245,2018,1,3],
        "schedule":"15%",
    },
    "王县项目": {
        "date": [2018, 3, 3],
        "num": 600,
        "state": 4,
        "type": [-1, 5, 'is_msxm'],
        "location":[121.47,31.23],
        "firm":["京东",12333332,2018,2,5],
        "schedule":"15%",
    },
    "郭县项目": {
        "date": [2017, 2, 3],
        "num": 700,
        "state": 5,
        "type": [-1, 5, 'is_msxm'],
        "location":[118.78,32.07],
        "firm":["优酷",54635636,2018,3,1],
        "schedule":"15%",
    },
    "图县项目": {
        "date": [2018, 4, 3],
        "num": 800,
        "state": 4,
        "type": [-1, 1, 'is_msxm'],
        "location":[120.15,30.28],
        "firm":["小米",453453,2018,3,28],
        "schedule":"15%",
    },
    "张县项目": {
        "date": [2017, 5, 3],
        "num": 900,
        "state": 3,
        "type": [5000, 1, 'is_msxm'],
        "location":[119.30,26.08],
        "firm":["大疆",45321312,2018,1,9],
        "schedule":"15%",
    },
    "康县项目": {
        "date": [2017, 7, 3],
        "num": 110,
        "state": 5,
        "type": [-1, 5, 'is_msxm'],
        "location":[116.98,36.67],
        "firm":["高德",12354345,2018,3,13],
        "schedule":"15%",
    },
    "明县项目": {
        "date": [2018, 4, 3],
        "num": 120,
        "state": 4,
        "type": [-1, 4, 'is_msxm'],
        "location":[113.62,34.75],
        "firm":["膜拜",435773,2018,2,16],
        "schedule":"15%",
    },
    "魏县项目": {
        "date": [2018, 5, 3],
        "num": 130,
        "state": 3,
        "type": [0, 4, 'is_czxm'],
        "location":[113.27,23.13],
        "firm":["网易",45321321,2018,2,11],
        "schedule":"15%",
    },
    "南县项目": {
        "date": [2017, 5, 3],
        "num": 140,
        "state": 5,
        "type": [-1, 5, 'is_msxm'],
        "location":[108.93,34.27],
        "firm":["亚马逊",345321312,2018,4,25],
        "schedule":"15%",
    },
};

/**向地图中随机添加点
 * */
/*function add() {
    let bounds = bm.getBounds();
    let lngSpan = bounds.xl.lng - bounds.Ol.lng;
    let latSpan = bounds.xl.lat - bounds.Ol.lat;
    for (let i = 0; i < 10; i++) {
        var point = new BMap.Point(bounds.Ol.lng + lngSpan * (Math.random() * 0.7 + 0.15),
            bounds.Ol.lat + latSpan * (Math.random() * 0.7 + 0.15));
        console.log(point)
        addPoint(point, i);
    }
}*/
/**
 * 向地图中的点添加点击信息
 * (经度，纬度,"王县项目",["亚马逊",345321312,2018,4,25],进度)
 * */
function addPoint(lng,lat,proName,firmName,schdeulName) {
    let point = new BMap.Point(lng,lat);    // 创建图标对象
    let marker = new BMap.Marker(point);        // 创建标注
    bm.addOverlay(marker);                     // 将标注添加到地图中
    let opts = {
        width: 200,     // 信息窗口宽度
        height: 266,     // 信息窗口高度
        title: "项目信息", // 信息窗口标题
    };
    let div=document.createElement("div");
    let pro=document.createElement("p");
    let firm=document.createElement("p");
    let firm1=document.createElement("p");
    let firm2=document.createElement("p");
    let schedul=document.createElement("p");
    pro.innerHTML="项目名称:<br>"+proName;
    firm.innerHTML="项目单位名称:<br>"+firmName[0];
    firm1.innerHTML="项目计划总投资:<br>"+firmName[1];
    firm2.innerHTML="开工时间:<br>"+firmName[2]+"年"+firmName[3]+"月"+firmName[4]+"日";
    schedul.innerHTML="项目进度:<br>"+schdeulName;
    div.append(pro,firm,firm1,firm2,schedul);
    var infoWindow = new BMap.InfoWindow(div, opts);  // 创建信息窗口对象
    marker.addEventListener("click", function () {
        bm.openInfoWindow(infoWindow, point); //开启信息窗口
    });
}

/**
 * 添加li
 * */
function addLi(key, name) {
    let ul = document.getElementById("company");
    //添加 li
    let li = document.createElement("li");
    //设置 li 属性，如 id
    li.setAttribute("id", key);
    li.innerHTML = name;
    ul.append(li);
}
/**
 * 清除li
 * */
function removeLi() {
    $("#company").empty()
}

/**
 * 向容器中添加内容
 * */
function addCon() {
    let arr = Object.keys(data);
    for (let i in data) {
        addLi(data[i].num, i)
    }
}
/**
 * 查询按钮
 * */
function query() {
    removeLi();
    bm.clearOverlays();
    let type = $("#type option:selected").val();
    let state = $("#state option:selected").val();
    let month = $("#month option:selected").val();
    let name = $("#name").val();
    let attention = $("input[name='attention-rate']:checked").val();
    let project = $("input[name='project_type']:checked").val();
    let finance = $("input[name='is_msxm_czxm']:checked").val();
    if ($("#myModal").hasClass("in")) {
        if(month.length!=4){
            if(name){
                if(state==1){
                    for (let i in data){
                        if (data[i].date[1] == month && i == name) {
                            if((attention==data[i].type[0]||attention==-1)&&(project==data[i].type[1]||project==-1)&&(finance==data[i].type[2]||finance==-1)){
                                addLi(data[i].num, i);
                                addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule)
                            }
                        }
                    }
                }else{
                    for (let i in data){
                        if (data[i].date[1] == month && data[i].state == state && i == name) {
                            if((attention==data[i].type[0]||attention==-1)&&(project==data[i].type[1]||project==-1)&&(finance==data[i].type[2]||finance==-1)){
                                addLi(data[i].num, i);
                                addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                            }
                        }
                    }
                }
            }else{
                if(state==1){
                    for (let i in data){
                        if (data[i].date[1] == month) {
                            if((attention==data[i].type[0]||attention==-1)&&(project==data[i].type[1]||project==-1)&&(finance==data[i].type[2]||finance==-1)){
                                addLi(data[i].num, i);
                                addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                            }
                        }
                    }
                }else{
                    for (let i in data){
                        if (data[i].date[1] == month && data[i].state == state) {
                            if((attention==data[i].type[0]||attention==-1)&&(project==data[i].type[1]||project==-1)&&(finance==data[i].type[2]||finance==-1)){
                                addLi(data[i].num, i);
                                addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                            }
                        }
                    }
                }
            }
        }else{
            if(name){
                if(state==1){
                    for (let i in data){
                        if (data[i].date[0] == month && i == name) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }else{
                    for (let i in data){
                        if (data[i].date[0] == month && data[i].state == state && i == name) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }
            }else{
                if(state==1){
                    for (let i in data){
                        if (data[i].date[0] == month) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }else{
                    for (let i in data){
                        if (data[i].date[0] == month && data[i].state == state) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }
            }
        }
    } else {
        console.log("b1")
        if(month.length!=4){
            if(name){
                if(state==1){
                    for (let i in data){
                        if (data[i].date[1] == month && i == name) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }else{
                    for (let i in data){
                        if (data[i].date[1] == month && data[i].state == state && i == name) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }
            }else{
                if(state==1){
                    for (let i in data){
                        if (data[i].date[1] == month) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }else{
                    for (let i in data){
                        if (data[i].date[1] == month && data[i].state == state) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }
            }
        }else{
            if(name){
                if(state==1){
                    for (let i in data){
                        if (data[i].date[0] == month && i == name) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }else{
                    for (let i in data){
                        if (data[i].date[0] == month && data[i].state == state && i == name) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }
            }else{
                if(state==1){
                    for (let i in data){
                        if (data[i].date[0] == month) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }else{
                    for (let i in data){
                        if (data[i].date[0] == month && data[i].state == state) {
                            addLi(data[i].num, i);
                            addPoint(data[i].location[0],data[i].location[1],i,data[i].firm,data[i].schedule);
                        }
                    }
                }
            }
        }
    }
}
/**
 * 筛选按钮
 * */
function filtrate() {
    query();
    $('#myModal').modal('hide');
}