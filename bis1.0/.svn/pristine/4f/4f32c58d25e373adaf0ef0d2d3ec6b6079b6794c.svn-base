package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test2015 {

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
            
            map.put("guid","11");
            map.put("billcode","12");
            map.put("agencycode","13");
            map.put("agencyname","14");
            map.put("createdate","15");
            map.put("month","16");
            map.put("amt","17");
            
            Map submap = new HashMap();
            submap.put("guid","11");
            submap.put("mainguid","11");
            submap.put("planguid","13");
            submap.put("plancode","14");
            submap.put("month","15");
            submap.put("amt","16");
            submap.put("agencycode","17");
            submap.put("agencyname","18");
            submap.put("expfunccode","19");
            submap.put("expfuncname","20");
            submap.put("expecocode","21");
            submap.put("expeconame","22");
            submap.put("programcode","23");
            submap.put("programname","24");
            submap.put("agencyexpcode","25");
            submap.put("agencyexpname","26");
            submap.put("bgttypecode","27");
            submap.put("bgttypename","28");
            submap.put("paykindcode","29");
            submap.put("paykindname","30");
            submap.put("remark","31");
            submap.put("indsourcecode","32");
            submap.put("indsourcename","33");
            submap.put("fundtypecode","34");
            submap.put("fundtypename","35");
            submap.put("province","36");
            submap.put("year","37");
            List sublist = new ArrayList();
            sublist.add(submap);
            //明细2
            submap = new HashMap();
            submap.put("guid","12");
            submap.put("mainguid","11");
            submap.put("planguid","13");
            submap.put("plancode","14");
            submap.put("month","15");
            submap.put("amt","16");
            submap.put("agencycode","17");
            submap.put("agencyname","18");
            submap.put("expfunccode","19");
            submap.put("expfuncname","20");
            submap.put("expecocode","21");
            submap.put("expeconame","22");
            submap.put("programcode","23");
            submap.put("programname","24");
            submap.put("agencyexpcode","25");
            submap.put("agencyexpname","26");
            submap.put("bgttypecode","27");
            submap.put("bgttypename","28");
            submap.put("paykindcode","29");
            submap.put("paykindname","30");
            submap.put("remark","31");
            submap.put("indsourcecode","32");
            submap.put("indsourcename","33");
            submap.put("fundtypecode","34");
            submap.put("fundtypename","35");
            submap.put("province","36");
            submap.put("year","37");
            sublist.add(submap);
            
            map.put("sublist",sublist);
            list.add(map);
            Map rt1 = service.sendVou("2015","bank","1500","2016",verifycode,list);
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
