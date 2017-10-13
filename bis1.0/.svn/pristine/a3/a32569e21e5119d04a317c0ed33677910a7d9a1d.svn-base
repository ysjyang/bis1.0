package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test2026 {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String url = "http://127.0.0.1:7001/remoting/service/bankservice";
        BurlapProxyFactory factory = new BurlapProxyFactory();
        try {
            IFasp2PayBankService service = (IFasp2PayBankService) factory.create(IFasp2PayBankService.class, url);
            
            Map m = service.login("admin", "123456");
            String verifycode = (String)m.get("verifycode");
           
            Map rt1 = service.readVou("2026", "pay", "150000", "2017", verifycode);
            System.out.println("sendVou:"+rt1);
            
//            m = service.login("admin", "123456");
//            String verifycode1 = (String)m.get("verifycode");
//            Map rt = service.cancelSendVou("1026","bank","150100","2016",verifycode1,list);
//            System.out.println("cancelSendVou:"+rt);
//            
//            
//            
//            //发送和读取
//            m = service.login("admin", "123456");
//            verifycode = (String)m.get("verifycode");
//            list= new ArrayList();
////            public Map sendVou(String bustype,String bankcode,String province,String year,String verifycode,List listmap) throws AppException {
//            list = new ArrayList();
//            map = new HashMap();
//            map.put("guid", "222");
//            map.put("voucherno", "1");
//            map.put("paydate", "20160519");
//            map.put("payeebankaccount", "1.02");
//            map.put("payee", "20160519111111");
//            map.put("payeebank", "20160519");
//            map.put("amt", 1.01);
//            list.add(map);
//            rt = service.sendVou("1025","bank","150100","2016",verifycode,list);
//            System.out.println(rt);
//            
//            
//            m = service.login("admin", "123456");
//            verifycode = (String)m.get("verifycode");
//            rt1 = service.readVou("2022","bank","150100","2016",verifycode);
//            System.out.println(rt1);
        }catch(Exception e){
        	e.printStackTrace();
        }

	}

}
