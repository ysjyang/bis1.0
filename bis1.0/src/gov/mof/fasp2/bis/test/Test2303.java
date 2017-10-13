package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test2303 {

	/**
	 *拨款单发送
	 * @param args
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void main(String[] args) {
		String url = "http://127.0.0.1:7001/remoting/service/bankservice";
        BurlapProxyFactory factory = new BurlapProxyFactory();
        try {
            IFasp2PayBankService service = (IFasp2PayBankService) factory.create(IFasp2PayBankService.class, url);
          //sendMethod(service);
           readMethod(service);
        }catch(Exception e){
        	e.printStackTrace();
        }


	}

	private static void readMethod(IFasp2PayBankService service) {
		Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        Map rt2 = service.readVou("1303","msxt","150000","2017",verifycode);
       // Map rt2 = service.readUnReplySlipVou("1303", "MSXT", "150000", "2017", verifycode);
        m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
       // Map rt2 = service.replySlipVou("1303","msxt","150000","2017",verifycode,(List)rt1.get("datas"));
        System.out.println("rt2:"+rt2);
     //   System.out.println("readVou:"+rt1);
	}

	private static void sendMethod(IFasp2PayBankService service) {
		 Map m = service.login("admin", "123456");
         String verifycode = (String)m.get("verifycode");
         List list = new ArrayList();
         Map map = new HashMap();
         map.put("guid","1112");
         map.put("billcode","111");
         map.put("finintorgcode","111");
         map.put("finintorgname","111");
         map.put("programcode","111");
         map.put("programname","111");
         map.put("dwzblycode","111");
         map.put("dwzblyname","111");
         map.put("expfunccode","111");
         map.put("expfuncname","111");
         map.put("expecocode","111");
         map.put("expeconame","111");
         map.put("agencyexpcode","111");
         map.put("agencyexpname","111");
         map.put("agencycode","111");
         map.put("agencyname","111");
         map.put("fundtypecode","111");
         map.put("fundtypename","111");
         map.put("payeeacctno","111");
         map.put("payeeacctname","111");
         map.put("payeeacctbankname","111");
         map.put("amt","111");
         map.put("usage","111");
         map.put("paytypecode","111");
         map.put("paytypename","111");
         map.put("paydate","111");
         map.put("payresult","退款");
         map.put("remark","111");
         map.put("payacctno","111");
         map.put("payacctname","111");
         map.put("payacctbankname","111");
         map.put("voucherno","111");
         
         map.put("voucherguid","111");
         map.put("voucherno","111");

         list.add(map);
         map = new HashMap();
         map.put("guid","1122");
         map.put("billcode","111");
         map.put("finintorgcode","111");
         map.put("finintorgname","111");
         map.put("programcode","111");
         map.put("programname","111");
         map.put("dwzblycode","111");
         map.put("dwzblyname","111");
         map.put("expfunccode","111");
         map.put("expfuncname","111");
         map.put("expecocode","111");
         map.put("expeconame","111");
         map.put("agencyexpcode","111");
         map.put("agencyexpname","111");
         map.put("agencycode","111");
         map.put("agencyname","111");
         map.put("fundtypecode","111");
         map.put("fundtypename","111");
         map.put("payeeacctno","111");
         map.put("payeeacctname","111");
         map.put("payeeacctbankname","111");
         map.put("amt","111");
         map.put("usage","111");
         map.put("paytypecode","111");
         map.put("paytypename","111");
         map.put("paydate","111");
         map.put("payresult","退款");
         map.put("remark","111");
         map.put("payacctno","111");
         map.put("payacctname","111");
         map.put("payacctbankname","111");
         map.put("voucherno","111");
         
         map.put("voucherguid","111");
         map.put("voucherno","111");

        list.add(map);
         Map rt1 = service.sendVou("2303","speacct","1500","2017",verifycode,list);
         System.out.println("sendVou:"+rt1);
		
	}

}
