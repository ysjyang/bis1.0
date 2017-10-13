package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test1004 {

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
            map.put("guid", "22");
            map.put("billcode", "1");
            map.put("paydate", "111");
            map.put("remark", "退回原因");
            map.put("bisbankcode", "pay");
            list.add(map);
            map = new HashMap();
            map.put("guid", "22");
            map.put("billcode", "1");
            map.put("paydate", "111");
            map.put("remark", "退回原因");
            map.put("bisbankcode", "pay");
            list.add(map);
            Map rt1 = service.sendVou("1004","bank","150000","2016",verifycode,list);
            System.out.println("sendVou:"+rt1);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
