package gov.mof.fasp2.bis.createTable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import gov.mof.fasp2.bis.common.CommonDAO;

import org.springframework.transaction.annotation.Transactional;

public class CreateTableBatchDAO {
	private CommonDAO commonDAO;
	
	
	public CommonDAO getCommonDAO() {
		return commonDAO;
	}


	public void setCommonDAO(CommonDAO commonDAO) {
		this.commonDAO = commonDAO;
	}
	/*
	 * 根据前台传入的地区编码、年份、表空间批量创建表
	 */
	public Map createTableBatch(String province, String year,
			String tablespace) {
	    Map returnmap = new HashMap();
	    //查找表空间是否存在
	    String spacesql = "select * from bis_t_systemset where code='BISTABLESPACES'";
	    List spaceList = commonDAO.queryForList(spacesql);
	    Map spaceMap = new HashMap();
	    spaceMap = (Map) spaceList.get(0);
	    String bis = (String) spaceMap.get("value");
	    tablespace = bis;
	    spacesql = "select tablespace_name from dba_tablespaces where tablespace_name = '"+bis+"'";
	    spaceList = commonDAO.queryForList(spacesql);
	    if(spaceList.size()==0){
	        returnmap.put("errorMsg", "bis表空间不存在，请创建！");
            return returnmap;
	    }
	  try{
		//校验系统中是否存在要创建的表
		List sqlList = new ArrayList();
		String sql = "select * from BIS_T_TABLEINBIS where year='"+year+"' and PROVINCECODE='"+province+"'";
		sqlList = commonDAO.queryForList(sql);
		if(sqlList.size()>0){
			returnmap.put("errorMsg", "您要创建的"+year+"年、"+province+"地区的表已存在!");
			return returnmap;
		}  
		//查找BIS_T_TABLECOLUMN创建所有表
		String sqltable = "select tablecode from BIS_T_TABLECOLUMN group by tablecode";
		List list = commonDAO.queryForList(sqltable);
		//把所有表名放到list中
		List tablenameList = new ArrayList();
		Map map = new HashMap();
		String tablecode = new String();
		for(int i=0;i<list.size();i++){
			map = (Map) list.get(i);
			tablecode = (String) map.get("tablecode");
			tablenameList.add(tablecode);
		}
		String createtablesql = "";//建表语句		
		String tablenamesql = "";//条件查询语句
		List tableList = new ArrayList();
		String columncode = new String();//列名
		String type = new String();				
		int isnull=0;//列可为空，1表示可为空，空表示不为空
			for(int i=0;i<tablenameList.size();i++){
			tablenamesql = "select * from BIS_T_TABLECOLUMN where tablecode='"+ tablenameList.get(i)+"'";
			tableList = commonDAO.queryForList(tablenamesql);
				createtablesql = "create table "+""+tablenameList.get(i)+"_"+province+"_"+year+"(";
				map = new HashMap();
				for(int j=0;j<tableList.size();j++){
					isnull = 0;
					if(j!=tableList.size()-1){
						map = (Map) tableList.get(j);
						columncode = (String) map.get("columncode");
						type = (String) map.get("type");
						if(map.get("isnull") !=null && !"".equals(map.get("isnull"))){
							isnull = 1;
						}
						createtablesql += columncode+" "+type+" ";
						if(isnull!=1){
							createtablesql += "not null"+" ";
						}
						createtablesql += ","+" ";
					}else{
						map = (Map) tableList.get(j);
						columncode = (String) map.get("columncode");
						type = (String) map.get("type");
						if(map.get("isnull") !=null && !"".equals(map.get("isnull"))){
							isnull = 1;
						}
						createtablesql += columncode+" "+type+" ";
						if(isnull!=1){
							createtablesql += "not null"+" ";
						}
						createtablesql += ") tablespace "+tablespace;
					}
				}
				commonDAO.execute(createtablesql);	
				/**
				 * 创建完表之后紧接着创建该表对应的视图
				 */
				if(tablenameList.get(i).equals("BIS_T_BUSTYPE1011M") || tablenameList.get(i).equals("BIS_T_BUSTYPE1011S")){
					createview(province,year,tablenameList.get(i).toString());				
				}
		}
						/*
		 * 在刚新建的表上--条件
		 * 创建所有表的主键
		 */
		if(sqlList.size()==0){
			String queryKey = "select * from BIS_T_TABLECOLUMN where ispk is not null";
			List keyList = commonDAO.queryForList(queryKey);
			Map keymap = new HashMap();
			String keysql = "";
			String subtablecode = "";
			int a = 0;
			for(int i=0;i<keyList.size();i++){
				keymap = (Map) keyList.get(i);
				if(keymap.get("tablecode").equals("BIS_T_BUSTYPE1101M")&&a==0){
					//BIS_T_BUSTYPE1101M 创建联合主键
					a=1;
					String[] sub = keymap.get("tablecode").toString().split("_");
					subtablecode = sub[2];
					keysql = "alter table"+" "+keymap.get("tablecode")+"_"+province+"_"+year+" "+"add constraint pk_"+subtablecode+"_"+province+"_"+year+" "+"primary key (CARDNO,agencycode)";
					commonDAO.execute(keysql);
				}
				if(!keymap.get("tablecode").equals("BIS_T_BUSTYPE1101M")){
					String[] sub = keymap.get("tablecode").toString().split("_");
					subtablecode = sub[2];
					keysql = "alter table"+" "+keymap.get("tablecode")+"_"+province+"_"+year+" "+"add constraint pk_"+subtablecode+"_"+province+"_"+year+" "+"primary key("+keymap.get("columncode")+")";
					commonDAO.execute(keysql);
				}
				
				//创建主键索引
				//alter table table_name add constraint index_name primary key (col1);
			}
		}
		/*
		 * 创建所有表的外键
		 */
		if(sqlList.size()==0){
			String queryKey = "select * from BIS_T_TABLECOLUMN where isfk is not null";
			List keyList = commonDAO.queryForList(queryKey);
			Map keymap = new HashMap();
			String keysql = "";
			String subtablecode = "";
			for(int i=0;i<keyList.size();i++){
				keymap = (Map) keyList.get(i);
				String[] sub = keymap.get("tablecode").toString().split("_");
				subtablecode = sub[2];
					keysql = "alter table"+" "+keymap.get("tablecode")+"_"+province+"_"+year+" "+"add constraint fk_"+subtablecode+"_"+province+"_"+year+" "+"foreign key("+keymap.get("columncode")+") references"+" "+keymap.get("fktable")+"_"+province+"_"+year+"("+keymap.get("fktablecolumn")+")";
					commonDAO.execute(keysql);
			}
		}
		//表和视图创建成功之后给各业务表主键添加索引
		
		//上述过程没有发生异常
		//  创建完表后把其保存到BIS_T_TABLEINBIS表中
		String insertsql = "insert into BIS_T_TABLEINBIS(TABLESPACE,PROVINCECODE,YEAR,STATUS) values('"+tablespace+"','"+province+"','"+year+"','true')";
		commonDAO.update(insertsql);
		returnmap.put("createTrue", true);
	}catch(Exception e){
		String insertsql = "insert into BIS_T_TABLEINBIS(TABLESPACE,PROVINCECODE,YEAR,STATUS) values('"+tablespace+"','"+province+"','"+year+"','false')";
		commonDAO.update(insertsql);
		e.printStackTrace();
		returnmap.remove("createTrue");
		returnmap.put("consoleMsg", e.getStackTrace());
	}		
		
		
		return returnmap;
	}


	public void createview(String province,String year,String tablename){
		String createviewsql = "";//建视图语句
		List viewcollist = new ArrayList();//视图中所需的列名的集合
		String viewsqlcol = "";//查询视图中所需的列
		String viewcol ="";
		if(tablename.equals("BIS_T_BUSTYPE1011M")){
			//查询BIS_T_BUSTYPE1011S_province_year和BIS_T_BUSTYPE1011M_province_year两张表中status=1的字段
			viewsqlcol = "select columncode from BIS_T_TABLECOLUMN where tablecode='BIS_T_BUSTYPE1011M' and status='1'";//status=1表示该视图中需要的字段				
		}else{
			viewsqlcol = "select columncode from BIS_T_TABLECOLUMN where tablecode='BIS_T_BUSTYPE1011S' and status='1'";//status=1表示该视图中需要的字段				

		}
		/**
		 * 注:
		 * 这里只给BIS_T_BUSTYPE1011S_province_year和BIS_T_BUSTYPE1011M_province_year创建视图
		 */				
		viewcollist = commonDAO.queryForList(viewsqlcol);
		for(int k=0;k<viewcollist.size();k++){
			if(k!=viewcollist.size()-1){
				//特殊处理ISCARD字段,替换成billtype
				if("ISCARD".equals((((Map)viewcollist.get(k)).get("columncode")+"").toUpperCase())){
					((Map)viewcollist.get(k)).put("columncode", "decode(ISCARD,1,1,0) BILLTYPE");
				}
				viewcol+=((Map)viewcollist.get(k)).get("columncode").toString()+",";					
			}else{
				//特殊处理ISCARD字段,替换成billtype
				if("ISCARD".equals((((Map)viewcollist.get(k)).get("columncode")+"").toUpperCase())){
					((Map)viewcollist.get(k)).put("columncode", "decode(ISCARD,1,1,0) BILLTYPE");
				}
				viewcol+=((Map)viewcollist.get(k)).get("columncode").toString();
			}
		}				
		createviewsql = "create or replace view "+tablename.replace("_T_", "_V_")+"_"+province+"_"+year+" as select "+viewcol+" from "+tablename+"_"+province+"_"+year;
		commonDAO.execute(createviewsql);
	}
	
	/*
	 * 批量删除表
	 */
	public Map deleteTableBatch(String province, String year, String tablespace) {
	    //先查找表空间
	    String spacesql = "select * from bis_t_systemset where code='BISTABLESPACES'";
        List spaceList = commonDAO.queryForList(spacesql);
        Map spaceMap = new HashMap();
        spaceMap = (Map) spaceList.get(0);
        String bis = (String) spaceMap.get("value");
        tablespace = bis;
        
	    Map returnMap = new HashMap();
		Boolean returnBoo = true;
		String errortablename ="";
		StackTraceElement[] errorMsg = null;
		
		String tablecodesql = "select tablecode from bis_t_tablecolumn group by tablecode";
		List tablecodelist = new ArrayList();
		tablecodelist = commonDAO.queryForList(tablecodesql);
		//删除之前检查是否表内有数据
		List mainlist = new ArrayList();
		Map map = new HashMap();
		String maintablecode = null;
		for(int i=0;i<tablecodelist.size();i++){
		    map = (Map) tablecodelist.get(i);
		    maintablecode = (String) map.get("tablecode");
		    if(maintablecode.contains("M")){
		        mainlist = commonDAO.queryForList("select * from "+maintablecode+"_"+province+"_"+year);
		        if(mainlist.size()>0){
		            returnMap.put("havedata", "您要删除的表中有数据，请先备份再删除！");
		            return returnMap;
		        }
		    }
		}
		Map tablecodemap = new HashMap();
		String tablename = "";
		String tablecode = "";
		String deletesql ="";
		Map imaginemap = new HashMap();
		for(int i=0;i<tablecodelist.size();){
			tablecodemap = (Map) tablecodelist.get(i);
			tablecode = (String) tablecodemap.get("tablecode");
			//判断此表有没有子表
			try{
				if(tablecode.contains("M")){
					//可能包含子表
					imaginemap.put("tablecode", tablecode.replace('M', 'S'));
					if(tablecodelist.contains(imaginemap)){
						//包含子表
						tablecodelist.remove(imaginemap);
						tablename = tablecode.replace('M', 'S')+"_"+province+"_"+year;
						deletesql = "drop table "+tablename ;
						commonDAO.execute(deletesql);
						imaginemap.put("tablecode", tablecode);
						tablecodelist.remove(imaginemap);
						tablename = tablecode+"_"+province+"_"+year;
						deletesql = "drop table "+tablename ;
						commonDAO.execute(deletesql);
					}else{
						imaginemap.put("tablecode", tablecode);
						tablecodelist.remove(imaginemap);
						tablename = tablecode+"_"+province+"_"+year;
						deletesql = "drop table "+tablename ;
						commonDAO.execute(deletesql);
					}
				}else{
					//如果是子表直接删除
					imaginemap.put("tablecode", tablecode);
					tablecodelist.remove(imaginemap);
					tablename = tablecode+"_"+province+"_"+year;
					deletesql = "drop table "+tablename ;
					commonDAO.execute(deletesql);
				}
			}catch(Exception e){
				e.printStackTrace();
				returnBoo = false;
				errortablename =tablecode+"_"+province+"_"+year;
				errorMsg=e.getStackTrace();
			}		
			//如果删除的表是BIS_T_BUSTYPE1011M_province_year或者BIS_T_BUSTYPE1011S_province_year,那么同时也删除掉其对应的视图
			if("BIS_T_BUSTYPE1011M".equals(tablecode) || "BIS_T_BUSTYPE1011S".equals(tablecode)){
				deleteCurView(tablecode,province,year);			
			}
		}
		// 删除表后再删除bis_t_tableinbis表中的数据
		deleteCurTab(province, year);
		if(returnBoo){
			returnMap.put("deletetrue", true);
		}else{
			returnMap.put("deletetrue", false);
			returnMap.put("errortablename", errortablename);
			returnMap.put("errorMsg", errorMsg);
		}
		return returnMap;
	}
	
	private void deleteCurView(String tablecode,String province,String year) {
		String deletesql="drop view "+tablecode.replace("_T_", "_V_")+"_"+province+"_"+year;
		commonDAO.update(deletesql);		
	}
	/*
	 * 通过表名删除现有表的数据
	 */
	public void deleteCurTab(String province,String year){
		String sql = "delete from bis_t_tableinbis where PROVINCECODE='"+province+"' and YEAR='"+year+"'";
		commonDAO.update(sql);
	}
}










