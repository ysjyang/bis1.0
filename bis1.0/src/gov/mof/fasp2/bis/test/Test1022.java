package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test1022 {

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
            List list = new ArrayList();
            Map map = new HashMap();
            map.put("guid", "1111");
            map.put("createdate", "1");
            map.put("payeebankaccount", "111");
            map.put("payee", "112");
            map.put("payeebank", "1234");
            map.put("voucherno", "1234");
            map.put("amt", 11);
            map.put("bisbankcode", "pay");
            list.add(map);
            Map rt1 = service.sendVou("1022","bank","1500","2016",verifycode,list);
            System.out.println("sendVou:"+rt1);
            
//            m = service.login("admin", "123456");
//            String verifycode1 = (String)m.get("verifycode");
//            Map rt = service.cancelSendVou("1023","bank","150100","2016",verifycode1,list);
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
//            map.put("guid", "21");
//            map.put("createdate", "1");
//            map.put("payeebankaccount", "111");
//            map.put("payee", "112");
//            map.put("payeebank", "1234");
//            map.put("voucherno", "1234");
//            map.put("amt", 11);
//            list.add(map);
//            rt = service.sendVou("1022","bank","150100","2016",verifycode,list);
//            System.out.println(rt);
//            
//            
//            m = service.login("admin", "123456");
//            verifycode = (String)m.get("verifycode");
//            rt1 = service.readVou("2019","bank","150100","2016",verifycode);
//            System.out.println(rt1);
        }catch(Exception e){
        	e.printStackTrace();
        }


	}

}
