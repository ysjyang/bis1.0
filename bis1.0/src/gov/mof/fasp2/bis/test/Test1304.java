package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test1304 {

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
            
            sendMethod(service);
          // readMethod(service);
            
        }catch(Exception e){
        	e.printStackTrace();
        }


	}

	private static void readMethod(IFasp2PayBankService service) {
		 Map m = service.login("admin", "123456");
         String verifycode = (String)m.get("verifycode");
         Map rt1 = service.readVou("2302","msxt","1500","2017",verifycode);
         m = service.login("admin", "123456");
         verifycode = (String)m.get("verifycode");
         Map rt2 = service.replySlipVou("2302","msxt","1500","2017",verifycode,(List)rt1.get("datas"));
         System.out.println("rt2:"+rt2);
         System.out.println("readVou:"+rt1);
		
	}

	private static void sendMethod(IFasp2PayBankService service) {
		Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        List list = new ArrayList();
        Map map = new HashMap();
        map.put("guid","msxt_request_test_001");
        map.put("billcode","000000001");
        map.put("finintorgcode","06");
        map.put("finintorgname","经济贸易处");
        map.put("programcode","111");
        map.put("programname","111");
        map.put("dwzblycode","001001002");
        map.put("dwzblyname","年初预算");
        map.put("expfunccode","2160201");
        map.put("expfuncname","行政运行");
        map.put("expecocode","31002");
        map.put("expeconame","办公设备购置");
        map.put("agencyexpcode","111");
        map.put("agencyexpname","111");
        map.put("agencycode","602001");
        map.put("agencyname","内蒙古自治区供销合作社联合社");
        map.put("fundtypecode","11");
        map.put("fundtypename","一般公共预算");
        map.put("payeeacctno","0602005729002320145");
        map.put("payeeacctname","内蒙古自治区财政厅");
        map.put("payeeacctbankname","工行内蒙古分行营业部敕勒川大街支行");
        map.put("amt","11.00");
        map.put("usage","办公费【内蒙古自治区供销合作社联合社】");
        map.put("paytypecode","112");
        map.put("paytypename","工程、物品和服务采购支出");
        map.put("setmodecode","2");
        map.put("setmodename","转账支票");
        map.put("bgtdocno","部门预算【2017】");
        map.put("gzbscode","0");
        map.put("gzbsname","非统发");
        map.put("indsourcecode","111");
        map.put("indsourcename","自治区本级安排");
        map.put("bzjgcode","01");
        map.put("bzjgname","预算单位自编");
        map.put("zfgllxcode","001001");
        map.put("zfgllxname","正常支付");

        list.add(map);
//        map = new HashMap();
//        map.put("guid","112");
//        map.put("billcode","111");
//        map.put("finintorgcode","111");
//        map.put("finintorgname","111");
//        map.put("programcode","111");
//        map.put("programname","111");
//        map.put("dwzblycode","111");
//        map.put("dwzblyname","111");
//        map.put("expfunccode","111");
//        map.put("expfuncname","111");
//        map.put("expecocode","111");
//        map.put("expeconame","111");
//        map.put("agencyexpcode","111");
//        map.put("agencyexpname","111");
//        map.put("agencycode","111");
//        map.put("agencyname","111");
//        map.put("fundtypecode","111");
//        map.put("fundtypename","111");
//        map.put("payeeacctno","111");
//        map.put("payeeacctname","111");
//        map.put("payeeacctbankname","111");
//        map.put("amt","111");
//        map.put("usage","111");
//        map.put("paytypecode","111");
//        map.put("paytypename","111");
//        map.put("setmodecode","111");
//        map.put("setmodename","111");
//        map.put("bgtdocno","111");
//        map.put("gzbscode","111");
//        map.put("gzbsname","111");
//        map.put("indsourcecode","111");
//        map.put("indsourcename","111");
//        map.put("bzjgcode","111");
//        map.put("bzjgname","111");
//        map.put("zfgllxcode","111");
//        map.put("zfgllxname","111");

        //list.add(map);
        Map rt1 = service.sendVou("1304","msxt","150000","2017",verifycode,list);
        System.out.println("sendVou:"+rt1);
		
	}

}
