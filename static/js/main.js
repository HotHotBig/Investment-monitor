/**
 * Created by lyh on 2018/5/21.
 */

let myChart=null;
let bm=null;
let option=null;
//初始化地图echarts，添加点击下钻返回事件
$(function () {
    let optionMonth=[1,2,3,4,5,6,7,8,9,10,11,12];
    let optionYear=[2017,2018];
    /**
     * 导航栏切换
     * */
    let $menu = $(".module-menu") ;
    $menu.find("a").click(function(){
        $menu.find("li").removeClass("active");
        $(this).parent().addClass("active");
        let id = $(this).attr("id");
        let path="./"+id+".html";
        console.log(path)
        window.open(path,"_self")
    });
    /**
     * 年月的切换
     * */
    let $type=$("#type");
    $type.on("change",function () {
        let val=$type.val();
        let month=$("#month")
        if(val=="year"){
            month.empty();
            for(let i of optionYear){
                let year1=document.createElement("option");
                year1.value=i;
                year1.text=i+"年";
                month.append(year1)
            }
        }else{
            month.empty();
            for(let i of optionMonth){
                let month1=document.createElement("option");
                month1.value=i;
                month1.text=i+"月";
                month.append(month1)
            }
        }
    });

    myChart=echarts.init(document.getElementById('baidu_map'));
    option={
        bmap:{
            center:[110.404, 35.915],
            zoom:5,
            maxZoom:12,
            roam:true,
            mapStyle:{
                styleJson: [ {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                        "color": "#021019"
                    }
                },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#147a92"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#0b3d51"
                        }
                    },
                    {
                        "featureType": "local",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "land",
                        "elementType": "all",
                        "stylers": {
                            "color": "#08304b"
                        }
                    },
                    {
                        "featureType": "railway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "railway",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#08304b"
                        }
                    },
                    {
                        "featureType": "subway",
                        "elementType": "geometry",
                        "stylers": {
                            "lightness": -70
                        }
                    },
                    {
                        "featureType": "building",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#857f7f"
                        }
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#000000"
                        }
                    },
                    {
                        "featureType": "building",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#022338"
                        }
                    },
                    {
                        "featureType": "green",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#062032"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "all",
                        "stylers": {
                            "color": "#1e1c1c"
                        }
                    },
                    {
                        "featureType": "manmade",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#022338"
                        }
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#2da0c6",
                            "visibility": "on"
                        }
                    },
                    {
                        "featureType": "city",
                        "elementType": "labels",
                        "stylers": {
                            "color": "#ffffff00"
                        }
                    }]
            }
        }
    };
    myChart.setOption(option);
    bm=myChart.getModel().getComponent('bmap').getBMap();
/*    bm.addEventListener("click",drill);
    bm.addEventListener("rightclick",upper);*/
/*    let point1 =new BMap.Point(116.404, 39.915);
    let marker = new BMap.Marker(point1);        // 创建标注
    bm.addOverlay(marker);*/
    // addPoint(106.63,26.65,"王县项目",["亚马逊",345321312,2018,4,25],"15%");

});

