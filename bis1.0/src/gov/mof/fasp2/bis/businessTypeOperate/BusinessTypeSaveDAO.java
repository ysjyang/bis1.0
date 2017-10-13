package gov.mof.fasp2.bis.businessTypeOperate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import gov.mof.fasp2.bis.common.CommonDAO;

public class BusinessTypeSaveDAO {
	private CommonDAO commonDAO;
	
	public CommonDAO getCommonDAO() {
		return commonDAO;
	}


	public void setCommonDAO(CommonDAO commonDAO) {
		this.commonDAO = commonDAO;
	}
	
	/*
	 * 页面保存事件的DAO
	 */
	public Boolean saveTableData(List dataList, String province) {
//		int seventeen =0; 
//		int sixteen = 0;
//		int twenty = 0;
//		int nineteen = 0;
//		int eighteen = 0;
//		int twentyone = 0;
		String name = new String();
		String code = new String();
		String type = new String();
		String isuseStr = new String();
		int isuse = 0;
		//逐条循环list中的数据和数据库中的进行对比，删除或新增原数据
		for(int i=0;i<dataList.size();i++){
			Map map = new HashMap();
			map=(Map) dataList.get(i);
//			sixteen = Integer.parseInt((String) map.get("sixteen"));
//			seventeen = Integer.parseInt((String) map.get("seventeen"));
//			eighteen = Integer.parseInt((String) map.get("eighteen"));
//			nineteen = Integer.parseInt((String) map.get("nineteen"));
//			twenty = Integer.parseInt((String) map.get("twenty"));
//			twentyone = Integer.parseInt((String) map.get("twentyone"));
			name = (String) map.get("name");
			code = (String) map.get("code");
			type = (String) map.get("type");
			isuseStr = (String) map.get("isuse");
			if(isuseStr==null){
			    isuseStr ="0";
			}
			isuse = Integer.parseInt(isuseStr);
			Boolean havedate = getData(code,province);
			if(havedate){
//			    if(isuse==0){
//			        //删除本条数据
//			        deleteData(code,isuse,province);
//			    }
				//更新全部数据
				updateData(code,isuse,province);
			}else{
			    if(isuse==1){
			        //添加本条数据
			        insertData(code,isuse,province);
			    }
			}
//			Boolean sixteenBoolean = getYearData(code,2016,province);
//			if(sixteenBoolean){
//				if(sixteen==0){
//					//判断有没有2016年份，没有则添加
//					deleteData(code,2016,province);
//				}
//			}else{
//				if(sixteen==1){
//					insertData(code,2016,province);
//				}
//			}
//			
//			Boolean seventeenBoolean = getYearData(code,2017,province);
//			if(seventeenBoolean){
//				if(seventeen==0){
//					deleteData(code,2017,province);
//				}
//			}else{
//				if(seventeen==1){
//					insertData(code,2017,province);
//				}
//			}
//			
//			Boolean eighteenBoolean = getYearData(code,2018,province);
//			if(eighteenBoolean){
//				if(eighteen==0){
//					deleteData(code,2018,province);
//				}
//			}else{
//				if(eighteen==1){
//					insertData(code,2018,province);
//				}
//				
//			}
//			
//			Boolean nineteenBoolean = getYearData(code,2019,province);
//			if(nineteenBoolean){
//				if(nineteen==0){
//					deleteData(code,2019,province);
//				}
//			}else{
//				if(nineteen==1){
//					insertData(code,2019,province);
//				}
//			}
//			
//			Boolean twentyBoolean = getYearData(code,2020,province);
//			if(twentyBoolean){
//				if(twenty==0){
//					deleteData(code,2020,province);
//				}
//			}else{
//				if(twenty==1){
//					insertData(code,2020,province);
//				}
//			}
//			
//			Boolean twentyoneBoolean = getYearData(code,2021,province);
//			if(twentyoneBoolean){
//				if(twentyone==0){
//					deleteData(code,2021,province);
//				}
//			}else{
//				if(twentyone==1){
//					insertData(code,2021,province);
//				}
//			}
		}
		return true;
	}
	
//	/*
//	 * 判断表中是否有对应的年份
//	 */
//	public Boolean getYearData(String code,int year,String province){
//		Boolean returnParam = false;
//		List list = new ArrayList();
//		String sql = "select  * from BIS_T_BUSTYPECONFIG where bustype='"+code+"' and year='"+year+"' and province='"+province+"'";
//		list = commonDAO.queryForList(sql);
//		if(list.size()>0){
//			returnParam = true;
//		}
//		return returnParam;
//	}
	/*
     * 判断表中是否有对应的数据
     */
    public Boolean getData(String code,String province){
        Boolean returnParam = false;
        List list = new ArrayList();
        String sql = "select  * from BIS_T_BUSTYPECONFIG where bustype='"+code+"' and province='"+province+"'";
        list = commonDAO.queryForList(sql);
        if(list.size()>0){
            returnParam = true;
        }
        return returnParam;
    }
	
//	/*
//	 * 表添加数据
//	 */
//	public void insertData(String code,int year,String province){
//		String sql = "insert into BIS_T_BUSTYPECONFIG ( BUSTYPE,YEAR,PROVINCE) values (?,?,?)";
//		Object [] object = {code,year,province};
//		commonDAO.updateData(sql,object);
//	}
    /*
     * 表添加数据
     */
    public void insertData(String code,int isuse,String province){
        String sql = "insert into BIS_T_BUSTYPECONFIG ( BUSTYPE,ISUSE,PROVINCE) values (?,?,?)";
        Object [] object = {code,isuse,province};
        commonDAO.updateData(sql,object);
    }
	
    /*
     * 表添加数据
     */
    public void updateData(String code,int isuse,String province){
        String sql = "update BIS_T_BUSTYPECONFIG set ISUSE='"+isuse+"' where PROVINCE='"+province+"' and BUSTYPE='"+code+"'";
        commonDAO.update(sql);
    }
//	/*
//	 * 表删除数据
//	 */
//	public void deleteData(String code,int year,String province){
//		String sql = "delete from BIS_T_BUSTYPECONFIG where BUSTYPE=? and YEAR=? and PROVINCE=?";
//		Object [] object = {code,year,province};
//		commonDAO.updateData(sql,object);
//	}
    /*
     * 表删除数据
     */
    public void deleteData(String code,int isuse,String province){
        String sql = "delete from BIS_T_BUSTYPECONFIG where BUSTYPE=? and ISUSE=? and PROVINCE=?";
        Object [] object = {code,isuse,province};
        commonDAO.updateData(sql,object);
    }
}
