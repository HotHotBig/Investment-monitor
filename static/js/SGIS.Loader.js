(function() {
	var dhtmlx = "dhtmlx";
	window["SGIS"] = window["SGIS"] || {};
	window["SGIS"].Loader = {
		_tags : [
				["jquery", "jquery.1.10.2"],
				["underscore", "underscore"],
				[
						"iclient.javascript",
						"iClient/jssp3/libs/SuperMap-6.1.3-10027,iClient/jssp3/libs/Lang/zh-CN",
						"iClient/jssp3/theme/default/style",
						"iClient/jssp3/theme/images/marker"],
				["page", "SGIS.Component.Paginationdev", "css/pagination"],
				["dhtmlx", dhtmlx + "/dhtmlx", dhtmlx + "/dhtmlx"],
				["tree", dhtmlx + "/dhtmlxcommon," + dhtmlx + "/dhtmlxtree",
						dhtmlx + "/dhtmlxtree"],
				[
						"tree.drag",
						dhtmlx + "/dhtmlxcommon," + dhtmlx + "/dhtmlxtree,"
								+ dhtmlx + "/ext/dhtmlxtree_dragin",
						dhtmlx + "/dhtmlxtree"],
				[
						"accordion",
						dhtmlx + "/dhtmlxcommon," + dhtmlx
								+ "/dhtmlxcontainer," + dhtmlx
								+ "/dhtmlxaccordion",
						dhtmlx + "/skins/dhtmlxaccordion_dhx_skyblue"],
				[
						"tabbar",
						dhtmlx + "/dhtmlxcommon," + dhtmlx + "/dhtmlxtabbar,"
								+ dhtmlx + "/dhtmlxcontainer," + dhtmlx
								+ "/dhtmlxtabbar_start",
						dhtmlx + "/dhtmlxtabbar"],
				[
						"windows",
						dhtmlx + "/dhtmlxcommon," + dhtmlx
								+ "/dhtmlxcontainer," + dhtmlx
								+ "/dhtmlxwindows",
						dhtmlx + "/dhtmlxwindows," + dhtmlx
								+ "/skins/dhtmlxwindows_dhx_skyblue"],
				[
						"grid",
						dhtmlx + "/dhtmlxcommon," + dhtmlx + "/dhtmlxgrid,"
								+ dhtmlx + "/dhtmlxgridcell",
						dhtmlx + "/dhtmlxgrid," + dhtmlx
								+ "/skins/dhtmlxgrid_dhx_skyblue"],
				[
						"grid.smart",
						dhtmlx + "/dhtmlxcommon," + dhtmlx + "/dhtmlxgrid,"
								+ dhtmlx + "/dhtmlxgridcell," + dhtmlx
								+ "/ext/dhtmlxgrid_srnd",
						dhtmlx + "/dhtmlxgrid," + dhtmlx
								+ "/skins/dhtmlxgrid_dhx_skyblue"],
				[
						"grid.drag",
						dhtmlx + "/dhtmlxcommon," + dhtmlx + "/dhtmlxgrid,"
								+ dhtmlx + "/dhtmlxgridcell," + dhtmlx
								+ "/ext/dhtmlxgrid_drag",
						dhtmlx + "/dhtmlxgrid," + dhtmlx
								+ "/skins/dhtmlxgrid_dhx_skyblue"],
				[
						"menu",
						dhtmlx + "/dhtmlxcommon," + dhtmlx + "/dhtmlxmenu,"
								+ dhtmlx + "/ext/dhtmlxmenu_ext",
						dhtmlx + "/skins/dhtmlxmenu_dhx_skyblue"],
				["toolbar",
						dhtmlx + "/dhtmlxcommon," + dhtmlx + "/dhtmlxtoolbar",
						dhtmlx + "/skins/dhtmlxtoolbar_dhx_blue"],
				[
						"layout",
						dhtmlx + "/dhtmlxcommon," + dhtmlx
								+ "/dhtmlxcontainer," + dhtmlx
								+ "/dhtmlxlayout",
						dhtmlx + "/dhtmlxlayout," + dhtmlx
								+ "/skins/dhtmlxlayout_dhx_skyblue"],
				[
						"calendar",
						dhtmlx + "/dhtmlxcommon," + dhtmlx + "/dhtmlxcalendar",
						dhtmlx + "/dhtmlxcalendar," + dhtmlx
								+ "/skins/dhtmlxcalendar_dhx_skyblue"],
				["hchart",
						"jquery.1.7,highcharts/highcharts,highcharts/exporting"],
				["bootstrap", "", "bootstrap2.3.2/css/bootstrap.min"],
				["bootstrap.plugin",
						"jquery.1.7,bootstrap2.3.2/js/bootstrap.min",
						"bootstrap2.3.2/css/bootstrap.min"],
				["bootstrap.responsive",
						"jquery.1.7,bootstrap2.3.2/js/bootstrap",
						"bootstrap2.3.2/css/bootstrap,bootstrap/css/bootstrap-responsive"],
				["bootstrap3", "bootstrap3.2/js/bootstrap.min","bootstrap3.2/css/bootstrap.min"],
				["bootstrap3.plugin",
						"jquery.1.7,bootstrap3/js/bootstrap.min",
						"bootstrap3.2/css/bootstrap.min"],
				["uploadify", "jquery.1.7,uploadify/jquery.uploadify-3.1.min",
						"uploadify/uploadify"],
				["pnotify", "pnotify/jquery.pnotify.min",
						"pnotify/jquery.pnotify.default"],
				[
						"jqueryui",
						"jquery.1.7,jquery-ui-bootstrap/js/jquery-ui-1.8.16.custom.min",
						"jquery-ui-bootstrap/css/custom-theme/jquery-ui-1.8.16.custom"],
				["artdialog", "artDialog/jquery.artDialog",
						"artDialog/skins/blue"],
				
				["iclient7C.js", "iclient7C/libs/SuperMap.Include",
					]
				],
		_js : {},
		_css : {},
		_IncludeScript : function(b) {
			var a = '<script type="text/javascript" src="' + this.basePath + b
					+ '.js"><\/script>';
			return a
		},
		_IncludeStyle : function(b) {
			var a = '<link type="text/css" rel="stylesheet" href="'
					+ this.basePath + b + '.css" />';
			return a
		},
		_add : function(a) {
			window.document.write(a)
		},
		load : function(d) {
			for (var f = 0; f < d.length; f++) {
				var e = null;
				for (var a = 0; a < this._tags.length; a++) {
					if (this._tags[a][0] == d[f]) {
						e = this._tags[a];
						break
					}
				}
				if (e) {
					if (e[1]) {
						var g = e[1].split(",");
						for (var c = 0; c < g.length; c++) {
							this._js[g[c]] = 1
						}
					}
					if (e[2]) {
						var h = e[2].split(",");
						for (var c = 0; c < h.length; c++) {
							this._css[h[c]] = 1
						}
					}
				} else {
					alert(d[f] + " 未能找到该tag。")
				}
			}
			var b = [];
			for (key in this._js) {
				b.push(this._IncludeScript(key))
			}
			for (key in this._css) {
				b.push(this._IncludeStyle(key))
			}
			this._add(b.join(""));
		}
	};
	window["SGIS"].Loader.basePath = "";
})();
