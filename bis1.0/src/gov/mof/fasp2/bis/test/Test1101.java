package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test1101 {

	/**
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
            map.put("cardno","11");
            map.put("cardname","11");
            map.put("agencycode","11");
            map.put("agencyname","11");
            map.put("gatheringbankacctname","11");
            map.put("gatheringbankname","11");
            map.put("gatheringbankacctcode","11");
            map.put("idnumber","11");
            map.put("digest","11");
            map.put("bankcode","11");
            map.put("bankname","11");
            map.put("createdate","11");
            map.put("startdate","11");
            map.put("enddate","11");
            list.add(map);
            Map rt1 = service.sendVou("1101","bank","150000","2017",verifycode,list);
            System.out.println("sendVou:"+rt1);
        }catch(Exception e){
        	e.printStackTrace();
        }

	}

}
