var get_selected=function(select_id){
	
	var selection=null;
	var select_control=document.getElementById(select_id);
	
	for(var oidx=0;oidx<select_control.length;oidx++){
		if(select_control.options[oidx].selected==true)
			return select_control.options[oidx].value;
	}
	return selection;
}

var compute_resolution=function(bbox,is3857,W,H){
	
	var xmax=bbox[2];
	var xmin=bbox[0];
	var ymin=bbox[1];
	var ymax=bbox[3];
	
	var p1,p2;
	if(is3857){
		p2=[xmax,ymax];
		p1=[xmin,ymin];
	}
	else{
		p2=ol.proj.transform([xmax,ymax],"EPSG:4326","EPSG:3857");
		p1=ol.proj.transform([xmin,ymin],"EPSG:4326","EPSG:3857");
	}
	
	console.log(p1+", "+p2);
	
	var dx=p2[0]-p1[0];
	var dy=p2[1]-p1[1];
	
	
	var AR_win=W/H;
	var AR_shp=dx/dy;
	
	var res;
	if(AR_win>1){
		if(AR_shp<1){
			res=dy/H;
		}
		else if(AR_shp>AR_win){
			res=dx/W;
		}
		else{
			res=dy/H;
		}
	}
	else{//AR_win<1
		if(AR_shp>1){
			res=dx/W;
		}
		else if(AR_shp<AR_win){
			res=dy/H;
		}
		else{
			res=dx/W;
		}
	}
	console.log("res="+res);
	return res;
}
