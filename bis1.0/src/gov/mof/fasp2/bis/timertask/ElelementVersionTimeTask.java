/**
 * @Title: ElelementVersionTimeTask.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-20  钟毅
 */
 

package gov.mof.fasp2.bis.timertask;

import java.util.Date;
import java.util.TimerTask;

/**
 * @ClassName: ElelementVersionTimeTask
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-20 上午09:36:17
 */

public class ElelementVersionTimeTask extends TimerTask{

    @Override
    public void run() {
        System.out.println("ElelementVersionTimeTask="+new Date());
    }

}
