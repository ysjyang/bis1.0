/**
 * @Title: TestH.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-18  胡川
 */

package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

/**
 * @ClassName: TestH
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-18 下午5:33:41
 */

public class TestH {
    public static void main(String[] args) {
    	//String url = "http://10.68.1.90:9005/remoting/service/bankservice";
        String url = "http://localhost:7001/remoting/service/bankservice";
        BurlapProxyFactory factory = new BurlapProxyFactory();
        try {
            IFasp2PayBankService service = (IFasp2PayBankService) factory.create(IFasp2PayBankService.class, url);
            Map m = null;
            Map rt = null;
            String verifycode = "";
            String type = "";
            Map rs = null;
            Map rt1 =null;
            List l = new ArrayList();
            Map datas = new HashMap();
            Map datas1 = new HashMap();
            datas.put("cardno", "6282220000001596");
            datas1.put("cardno", "6282220000001596");
            l.add(datas);
            l.add(datas1);
            /*
             * 测试不带子表读取
             */
//            m = service.login("admin", "123456");
//            System.out.println("登录信息：" + m);
//            verifycode = (String) m.get("verifycode");
//            System.out.println(l.toString());
//            rt = service.replySlipVou("2101","pay","150000","2016",verifycode, l);
//            rt = service.readVou("2103", "001", "1500", "2016", verifycode);
//           rt = service.readUnReplySlipVou("2103", "010", "1500", "2016", verifycode);
//            m = service.login("admin", "123456");
//            verifycode = (String) m.get("verifycode");
//            service.replySlipVou("2103", "010", "1500", "2016", verifycode, (List)rt.get("datas"));
//            System.out.println("1001读取未读取状态：" + rt);
            
//             type="1017";
//             m = service.login("admin", "123456");
//             System.out.println(m);
//             verifycode = (String) m.get("verifycode");
//             System.out.println(type+"发送退回凭证：");
//             rt1 = service.cancelSendVou(type, "003", "1500", "2016", verifycode, (List)rt.get("datas"));
//             System.out.println(rt);
//        
            /*
             * 1011 授权支付凭证-读取
             */
             m = service.login("admin", "123456");
             System.out.println("1011登录信息："+m);
             verifycode = (String) m.get("verifycode");
             //rt = service.readVou("1021", "002", "150000", "2016", verifycode);
             System.out.println("1011读取未读取状态：" + rt);
            //
            // m = service.login("admin", "123456");
            // System.out.println("登录："+m);
            // verifycode = (String) m.get("verifycode");
            // rt = service.readUnReplySlipVou("1011", "bank", "150100", "2016", verifycode);
            // System.out.println("读取 已读取未回执：" + rt);
            //
            // m = service.login("admin", "123456");
            // System.out.println("登录："+m);
            // verifycode = (String) m.get("verifycode");
            // rt = service.replySlipVou("1011", "bank", "150100", "2016", verifycode, (List) rt.get("datas"));
            // System.out.println("发送回执："+rt);
            /*
             * 1012 授权支付凭证-确认支付
             */
            // m = service.login("admin", "123456");
            // System.out.println(m);
            // verifycode = (String) m.get("verifycode");
            // rt = service.sendVou("1012", "bank", "150100", "2016", verifycode, (List) rt.get("datas"));
            // System.out.println("发送退回凭证：" + rt);
            /*
             * 1013 授权支付凭证-取消确认支付
             */
            // m = service.login("admin", "123456");
            // System.out.println(m);
            // verifycode = (String) m.get("verifycode");
            // rt = service.cancelSendVou("1013", "bank", "150100", "2016", verifycode, (List) rt.get("datas"));
            // System.out.println("取消发送退回：" + rt);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
