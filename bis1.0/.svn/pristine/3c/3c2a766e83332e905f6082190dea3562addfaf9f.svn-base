package gov.mof.fasp2.bis.serviceaddress;

import gov.mof.fasp2.bis.common.CommonDAO;

import java.util.List;

public class ServiceAddressDAO {
	private CommonDAO commonDao;

	public CommonDAO getCommonDao() {
        return commonDao;
    }
    public void setCommonDao(CommonDAO commonDao) {
        this.commonDao = commonDao;
    }
    public void updateDatas(String ip,String port){
    	String sql="select * from BIS_T_SYSTEMSET where code='BISBANKBASEDATA'";
    	List list=commonDao.queryForList(sql);
    	String value="http://"+ip+":"+port+"/dic/hessian/services";
    	if(list.size()==0){
       		sql="insert into BIS_T_SYSTEMSET(code,name,value) values('BISBANKBASEDATA','银行基础数据','value')";
    	}else{
    		sql="update BIS_T_SYSTEMSET set value='"+value+"' where code='BISBANKBASEDATA'";
    	}
    	commonDao.update(sql);
    }
}
