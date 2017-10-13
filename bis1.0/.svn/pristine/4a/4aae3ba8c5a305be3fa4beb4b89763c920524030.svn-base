package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test1002 {

	/**
	 * 直接支付-确认支付
	 * @param args
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void main(String[] args) {
		String url = "http://127.0.0.1:7001/remoting/service/bankservice";
        BurlapProxyFactory factory = new BurlapProxyFactory();
        try {
            IFasp2PayBankService service = (IFasp2PayBankService) factory.create(IFasp2PayBankService.class, url);
            
            Map m = service.login("admin", "123456");
            String verifycode = (String)m.get("verifycode");
            List list = new ArrayList();
            Map map = new HashMap();
            map.put("guid", "A40B0211F38FCC7980480A4C8B5B22B8");
            map.put("billcode", "11500200004");
            map.put("payeebankaccount", "111");
            map.put("payee", "112");
            map.put("payeebank", "1234");
            map.put("paydate", "1234");
            map.put("amt", 33.31);
            map.put("bisbankcode", "pay");
            
            List sublist = new ArrayList();
            Map submap = new HashMap();
            submap.put("guid","96DAB38850F6D6AD1CF25D0D23F7176A");
            submap.put("mainguid","A40B0211F38FCC7980480A4C8B5B22B8");
            submap.put("amt",33.31);
            submap.put("province","1500");
            submap.put("year","2017");
            sublist.add(submap);
            map.put("sublist", sublist);
            list.add(map);
            
            map = new HashMap();
            map.put("guid", "F9675D3382C38CD498A1B120F1AF386D");
            map.put("billcode", "11500200005");
            map.put("payeebankaccount", "111");
            map.put("payee", "112");
            map.put("payeebank", "1234");
            map.put("paydate", "1234");
            map.put("amt", 21.33);
            map.put("bisbankcode", "pay");
            
            sublist = new ArrayList();
            submap = new HashMap();
            submap.put("guid","7E61EA14B690C6E4BE9BB2B27EEAFE9A");
            submap.put("mainguid","F9675D3382C38CD498A1B120F1AF386D");
            submap.put("amt",21.33);
            submap.put("province","1500");
            submap.put("year","2017");
            sublist.add(submap);
            map.put("sublist", sublist);
            list.add(map);
//            map = new HashMap();
//            map.put("guid", "2222");
//            map.put("billcode", "1");
//            map.put("payeebankaccount", "111");
//            map.put("payee", "112");
//            map.put("payeebank", "1234");
//            map.put("paydate", "1234");
//            map.put("amt", 11);
//            map.put("bisbankcode", "pay");
//            list.add(map);
         //  Map rt1 = service.sendVou("1002","bank","150000","2017",verifycode,list);
            
         Map rt1 = service.cancelSendVou("1003","bank","150000","2017",verifycode,list);
            System.out.println("sendVou:"+rt1);
            
//            m = service.login("admin", "123456");
//            String verifycode1 = (String)m.get("verifycode");
//            Map rt = service.cancelSendVou("1003","bank","1500","2016",verifycode1,list);
//            System.out.println("cancelSendVou:"+rt);
        }catch(Exception e){
        	e.printStackTrace();
        }


	}

}
