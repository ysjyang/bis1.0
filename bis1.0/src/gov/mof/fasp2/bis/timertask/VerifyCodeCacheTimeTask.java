/**
 * @Title: ElelementTimeTask.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-20  钟毅
 */
 

package gov.mof.fasp2.bis.timertask;

import gov.mof.fasp2.bis.cache.VerifyCodeCache;
import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.factory.ServiceFactory;

import java.util.Date;
import java.util.TimerTask;

/**
 * @ClassName: ElelementTimeTask
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-20 上午09:36:33
 */

public class VerifyCodeCacheTimeTask extends TimerTask{

    @Override
    public void run() {
        VerifyCodeCache.clearVerifyCode((long)600000);
    }

}
