/**
 * @Title: ChangePwdDAO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-14  胡川
 */
 

package gov.mof.fasp2.bis.ipconfig;

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

public class IPconfigDAO {
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
    /**
     * 查找所有IP地址
     * @return
     * @throws
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public List<Map> findAllIP() {
        CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
        return dao.queryForList("SELECT t.* from Bis_t_Ipaddress t");
    }
    
    
    
    
   
}
