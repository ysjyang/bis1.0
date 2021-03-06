package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test1016 {

    /**
     * @param args
     * @throws
     */
    public static void main(String[] args) {
        String url = "http://127.0.0.1:7001/remoting/service/bankservice";
        BurlapProxyFactory factory = new BurlapProxyFactory();
        try {
            IFasp2PayBankService service = (IFasp2PayBankService) factory.create(IFasp2PayBankService.class, url);
            
            Map m = service.login("admin", "123456");
            String verifycode = (String)m.get("verifycode");
            List list = new ArrayList();
            Map map = new HashMap();
            map.put("guid", "11");
            map.put("voucherguid", "169E61F6340E911A549794F34C91753F");
            map.put("voucherno", "12344321");
            map.put("amt", 1);
            map.put("paydate", "112");
            map.put("remark", "退款原因");
            
//            Map submap = new HashMap();
//            submap.put("guid","98E743252FCE8395ECA88BEE4EE7FD7F");
//            submap.put("mainguid","11");
//            submap.put("amt","13");
//            submap.put("province","14");
//            submap.put("year","15");
//            List sublist = new ArrayList();
//            sublist.add(submap);
//            map.put("sublist",sublist);
            list.add(map);
            //
//           // list = new ArrayList();
//            map = new HashMap();
//            map.put("guid", "111");
//            map.put("voucherguid", "5B93E98C9835A819E884F393100986C1");
//            map.put("voucherno", "12344321");
//            map.put("amt", 1);
//            map.put("paydate", "112");
//            map.put("remark", "退款原因");
//            
//            submap = new HashMap();
//            submap.put("guid","98E743252FCE8395ECA88BEE4EE7FD7F");
//            submap.put("mainguid","111");
//            submap.put("amt","13");
//            submap.put("province","14");
//            submap.put("year","15");
//            sublist = new ArrayList();
//            sublist.add(submap);
//            submap = new HashMap();
//            submap.put("guid","98E743252FCE8395ECA88BEE4EE7FD7F");
//            submap.put("mainguid","111");
//            submap.put("amt","13");
//            submap.put("province","14");
//            submap.put("year","15");
//            sublist.add(submap);
//            map.put("sublist",sublist);
//            list.add(map);
//            Map rt1 = service.sendVou("1016","bank","150000","2017",verifycode,list);
//            System.out.println("sendVou:"+rt1);
            
            m = service.login("admin", "123456");
            verifycode = (String)m.get("verifycode");
            Map rt2 = service.cancelSendVou("1017", "bank", "150000", "2017", verifycode, list);
            System.out.println(rt2.toString());
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
