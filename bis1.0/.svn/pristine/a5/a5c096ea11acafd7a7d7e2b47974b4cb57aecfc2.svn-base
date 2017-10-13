/**
 * @Title: ChangePwdDAO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-14  胡川
 */
 

package gov.mof.fasp2.bis.usermanage.changepwd;

import gov.mof.fasp2.bis.cache.SysCache;
import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.login.LoginCheckAction;

import java.util.List;
import java.util.Map;

/**
 * @ClassName: ChangePwdDAO
 * @Description: 更改密码dao
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-14 上午11:21:54
 */

public class ChangePwdDAO {
    /**
     * 根据code查找用户
     * @param code
     * @return
     * @throws
     */
    @SuppressWarnings("rawtypes")
	public List findUserByCode(String code){
        CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
        return dao.queryForList("SELECT * FROM BIS_T_USER where code=?",new Object[]{code});
    }
    /**
     * 查找所有用户
     * @return
     * @throws
     */
    @SuppressWarnings("rawtypes")
	public List findAllUser(){
    	
        CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
	    
        //获取当前用户的区划
	    String username = (String) LoginCheckAction.curuser_name.get("username");
	    String sql = "select province from bis_t_user where code = '"+username+"' and usertype='1'";
	    List sqlList = dao.queryForList(sql);
	    String province = (String) ((Map)sqlList.get(0)).get("province");
	    //本级权限
	    if(province.endsWith("00")){
	    	province = province.substring(0, province.length()-2);
	    }
    	
	    String sql1 = "select * from bis_t_user t1 WHERE t1.province " +
	    		"IN (select m.code from bis_t_province m start with m.code=" + province +
	    		"connect by m.superguid=prior m.guid)";
	    
        return dao.queryForList(sql1);
    }
    /**
     * 修改用户密码
     * @param code
     * @param digest
     * @throws
     */
    public void updatePwd(String newPwd, String code) {
        CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
        dao.updateData("update bis_t_user set password=? where code=?", new Object[]{newPwd, code});
        SysCache.refreshUserNameCache();
    }
    
    
    
    
   
}
