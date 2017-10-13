package gov.mof.fasp2.bis.json;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class JSONUtil {

	/**
	 * @param args
	 * @throws JSONException 
	 */
	public static void main(String[] args) throws JSONException {
		// TODO Auto-generated method stub
//		String json1 = "[{\"id\":\"7ece7a52386542278fb44ee9f84f8dcb\",\"pId\":null,\"name\":\"测试系统\",\"url\":\"/test.do\",\"target\":\"mainframe\",\"children\":[{\"id\":\"7ece7a52386542278fb44e19f84f8dcb\",\"pId\":\"7ece7a52386542278fb44ee9f84f8dcb\",\"name\":\"模块1\",\"click\":\"alert(1)\",\"level\":1,\"tId\":\"maintree_2\",\"parentTId\":\"maintree_1\",\"open\":false,\"isParent\":false,\"zAsync\":true,\"isFirstNode\":true,\"isLastNode\":false,\"isAjaxing\":false,\"checked\":false,\"checkedOld\":false,\"nocheck\":false,\"chkDisabled\":false,\"halfCheck\":false,\"check_Child_State\":-1,\"check_Focus\":false,\"isHover\":false,\"editNameFlag\":false},{\"id\":\"7ece7a52386542278fb44229f84f8dcb\",\"pId\":\"7ece7a52386542278fb44ee9f84f8dcb\",\"name\":\"模块2\",\"url\":\"/gen.do\",\"target\":\"mainframe\",\"level\":1,\"tId\":\"maintree_3\",\"parentTId\":\"maintree_1\",\"open\":false,\"isParent\":false,\"zAsync\":true,\"isFirstNode\":false,\"isLastNode\":true,\"isAjaxing\":false,\"checked\":false,\"checkedOld\":false,\"nocheck\":false,\"chkDisabled\":false,\"halfCheck\":false,\"check_Child_State\":-1,\"check_Focus\":false,\"isHover\":false,\"editNameFlag\":false}],\"level\":0,\"tId\":\"maintree_1\",\"parentTId\":null,\"open\":false,\"isParent\":true,\"zAsync\":true,\"isFirstNode\":true,\"isLastNode\":true,\"isAjaxing\":false,\"checked\":false,\"checkedOld\":false,\"nocheck\":false,\"halfCheck\":false,\"check_Child_State\":0,\"check_Focus\":false,\"isHover\":false,\"editNameFlag\":false},{\"id\":\"7ece7a52386542278fb44e19f84f8dcb\",\"pId\":\"7ece7a52386542278fb44ee9f84f8dcb\",\"name\":\"模块1\",\"click\":\"alert(1)\",\"level\":1,\"tId\":\"maintree_2\",\"parentTId\":\"maintree_1\",\"open\":false,\"isParent\":false,\"zAsync\":true,\"isFirstNode\":true,\"isLastNode\":false,\"isAjaxing\":false,\"checked\":false,\"checkedOld\":false,\"nocheck\":false,\"chkDisabled\":false,\"halfCheck\":false,\"check_Child_State\":-1,\"check_Focus\":false,\"isHover\":false,\"editNameFlag\":false},{\"id\":\"7ece7a52386542278fb44229f84f8dcb\",\"pId\":\"7ece7a52386542278fb44ee9f84f8dcb\",\"name\":\"模块2\",\"url\":\"/gen.do\",\"target\":\"mainframe\",\"level\":1,\"tId\":\"maintree_3\",\"parentTId\":\"maintree_1\",\"open\":false,\"isParent\":false,\"zAsync\":true,\"isFirstNode\":false,\"isLastNode\":true,\"isAjaxing\":false,\"checked\":false,\"checkedOld\":false,\"nocheck\":false,\"chkDisabled\":false,\"halfCheck\":false,\"check_Child_State\":-1,\"check_Focus\":false,\"isHover\":false,\"editNameFlag\":false}]";
//		
//		
//		JSONArray ja = new JSONArray(json1);
//		Object obj = JSONToObject(json1);
//		Object obj1 = ((Map)((List)obj).get(0)).get("children");
//		System.out.println(ja.length());
//		System.out.println(((JSONObject)ja.get(0)).get("children"));
//		System.out.println(ja.get(1));
	}
	
	public static Object JSONToObject(String json) throws JSONException{
		if(json.startsWith("[")){
			JSONArray ja = new JSONArray(json);
			return getListMapObject(ja,null);
		}else if(json.startsWith("{")){
			JSONObject jo = new JSONObject(json);
			return getListMapObject(jo,null);
		}else{
			throw new JSONException("");
		}
	}
	public static Object JSONToObject(String json,Map template) throws JSONException{
		if(json.startsWith("[")){
			JSONArray ja = new JSONArray(json);
			return getListMapObject(ja,template);
		}else if(json.startsWith("{")){
			JSONObject jo = new JSONObject(json);
			return getListMapObject(jo,template);
		}else{
			throw new JSONException("");
		}
	}
	
	public static Object getListMapObject(Object json,Map template){
		Object value = null;
		if(json instanceof JSONArray){
			List list = ((JSONArray)json).toArrayList();
			for(int i=0;i<list.size();i++){
				value = list.get(i);
				if(value==null){
					 continue;
				 }else if(value instanceof JSONArray || value instanceof JSONObject){
					 list.set(i, getListMapObject(list.get(i),template)) ;
				 }else{
					 continue;
				 }
			}
			return list;
		}else if(json instanceof JSONObject){
			Map m = ((JSONObject)json).toMap();
			if(template!=null){
				m.putAll(template);
			}
			Iterator iterator = m.entrySet().iterator();
			Map.Entry entry = null;
			while(iterator.hasNext()){
				 entry = (Map.Entry)iterator.next();
				 value = entry.getValue();
				 if(value==null){
					 continue;
				 }else if(value instanceof JSONArray || value instanceof JSONObject){
					 entry.setValue(getListMapObject(value,template));
				 }else{
					 continue;
				 }
			}
			return m;
		}else{
			return json;
		}
	}
	
	
	

}
