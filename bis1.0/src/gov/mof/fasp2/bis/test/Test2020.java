package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test2020 {

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
            List list= new ArrayList();
//            public Map sendVou(String bustype,String bankcode,String province,String year,String verifycode,List listmap) throws AppException {
            Map map = new HashMap();
            List sublist = new ArrayList();
            Map submap = new HashMap();
            submap.put("guid", "12322");
            submap.put("mainguid", "12312322");
            submap.put("voucherguid", "1424311990");
            submap.put("voucherno", "1424311990");
            submap.put("agencyexpcode", "1424311990");
            submap.put("agencyexpname", "123");
            submap.put("programcode", "123123");
            submap.put("programname", "1424311990");
            submap.put("bgttypecode", "1424311990");
            submap.put("bgttypename", "1424311990");
            submap.put("expfunccode", "123");
            submap.put("expfuncname", "123123");
            submap.put("expecocode", "1424311990");
            submap.put("expeconame", "1424311990");
            submap.put("departmentcode", "1424311990");
            submap.put("departmentname", "123");
            submap.put("agencycode", "123123");
            submap.put("agencyname", "1424311990");
            submap.put("fundtypecode", "1424311990");
            submap.put("fundtypename", "1424311990");
            submap.put("payeeacctno", "wwj");
            submap.put("payeeacctname", "1424311990");
            submap.put("payeeacctbankname", "1424311990");
            submap.put("payacctno", "123");
            submap.put("payacctname", "123123");
            submap.put("payacctbankname", "1424311990");
            submap.put("amt", 1.00);
            submap.put("remark", "1424311990");
            submap.put("paykindcode", "wwj");
            submap.put("paykindname", "123123");
            submap.put("paytypecode", "1424311990");
            submap.put("paytypename", "1424311990");
            submap.put("setmodecode", "1424311990");
            submap.put("setmodename", "wwj");
            submap.put("createdate", "1424311990");
            submap.put("indsourcecode", "1424311990");
            submap.put("indsourcename", "123");
            submap.put("province", "123123");
            submap.put("year", "142");
            sublist.add(submap);
            map.put("sublist", sublist);
            map.put("guid", "12312322");
            map.put("billcode", "1111");
            map.put("clearbankcode", "1");
            map.put("clearbankname", "20160525");
            map.put("paybankcode", "testtest");
            map.put("paybankname", "1");
            map.put("expfunccode", "123123");
            map.put("expfuncname", "1111");
            map.put("fundtypecode", "1");
            map.put("fundtypename", "20160525");
            map.put("agencycode", "testtest");
            map.put("agencyname", "1");
            map.put("bgttypecode", "123123");
            map.put("bgttypename", "1111");
            map.put("paytypecode", "1");
            map.put("paytypename", "20160525");
            map.put("createdate", "testtest");
            map.put("payeeacctno", "123123");
            map.put("payacctno", "1111");
            map.put("amt", 1);
            map.put("bisbankcode", "pay");
            list.add(map);
            Map rt = service.sendVou("2020","bank","1500","2016",verifycode,list);
            System.out.println(rt);
            
            
            m = service.login("admin", "123456");
            verifycode = (String)m.get("verifycode");
            Map rt1 = service.cancelSendVou("2021","bank","1500","2016",verifycode,list);
            System.out.println(rt1);
            
            
            
//            //发送和读取
//            m = service.login("admin", "123456");
//            verifycode = (String)m.get("verifycode");
//            list= new ArrayList();
////            public Map sendVou(String bustype,String bankcode,String province,String year,String verifycode,List listmap) throws AppException {
//            map = new HashMap();
//            sublist = new ArrayList();
//            submap = new HashMap();
//            submap.put("guid", "1234");
//            submap.put("mainguid", "12312344");
//            submap.put("voucherguid", "1424311990");
//            submap.put("voucherno", "1424311990");
//            submap.put("agencyexpcode", "1424311990");
//            submap.put("agencyexpname", "123");
//            submap.put("programcode", "123123");
//            submap.put("programname", "1424311990");
//            submap.put("bgttypecode", "1424311990");
//            submap.put("bgttypename", "1424311990");
//            submap.put("expfunccode", "123");
//            submap.put("expfuncname", "123123");
//            submap.put("expecocode", "1424311990");
//            submap.put("expeconame", "1424311990");
//            submap.put("departmentcode", "1424311990");
//            submap.put("departmentname", "123");
//            submap.put("agencycode", "123123");
//            submap.put("agencyname", "1424311990");
//            submap.put("fundtypecode", "1424311990");
//            submap.put("fundtypename", "1424311990");
//            submap.put("payeeacctno", "wwj");
//            submap.put("payeeacctname", "1424311990");
//            submap.put("payeeacctbankname", "1424311990");
//            submap.put("payacctno", "123");
//            submap.put("payacctname", "123123");
//            submap.put("payacctbankname", "1424311990");
//            submap.put("amt", 1.00);
//            submap.put("remark", "1424311990");
//            submap.put("paykindcode", "wwj");
//            submap.put("paykindname", "123123");
//            submap.put("paytypecode", "1424311990");
//            submap.put("paytypename", "1424311990");
//            submap.put("setmodecode", "1424311990");
//            submap.put("setmodename", "wwj");
//            submap.put("createdate", "1424311990");
//            submap.put("indsourcecode", "1424311990");
//            submap.put("indsourcename", "123");
//            submap.put("province", "123123");
//            submap.put("year", "142");
//            sublist.add(submap);
//            map.put("sublist", sublist);
//            map.put("guid", "12312344");
//            map.put("billcode", "1111");
//            map.put("clearbankcode", "1");
//            map.put("clearbankname", "20160525");
//            map.put("paybankcode", "testtest");
//            map.put("paybankname", "1");
//            map.put("expfunccode", "123123");
//            map.put("expfuncname", "1111");
//            map.put("fundtypecode", "1");
//            map.put("fundtypename", "20160525");
//            map.put("agencycode", "testtest");
//            map.put("agencyname", "1");
//            map.put("bgttypecode", "123123");
//            map.put("bgttypename", "1111");
//            map.put("paytypecode", "1");
//            map.put("paytypename", "20160525");
//            map.put("createdate", "testtest");
//            map.put("payeeacctno", "123123");
//            map.put("payacctno", "1111");
//            map.put("amt", 1);
//            list.add(map);
//            rt = service.sendVou("2020","bank","150100","2016",verifycode,list);
//            System.out.println(rt);
//            
//            
//            m = service.login("admin", "123456");
//            verifycode = (String)m.get("verifycode");
//            rt1 = service.readVou("1024","bank","150100","2016",verifycode);
//            System.out.println(rt1);
        }catch(Exception e){
        	e.printStackTrace();
        }
	}

}
