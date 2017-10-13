package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test2023 {

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
            submap.put("guid", "1234");
            submap.put("mainguid", "12312344");
            submap.put("voucherguid", "1424311990");
            submap.put("voucherno", "1424311990");
            submap.put("createdate", "1424311990");
            submap.put("departmentcode", "123");
            submap.put("departmentname", "123123");
            submap.put("agencycode", "1424311990");
            submap.put("agencyname", "1424311990");
            submap.put("expfunccode", "1424311990");
            submap.put("expfuncname", "123");
            submap.put("programcode", "123123");
            submap.put("programname", "1424311990");
            submap.put("amt", 1);
            submap.put("paybankcode", "1424311990");
            submap.put("paybankname", "123");
            submap.put("province", "123123");
            submap.put("year", "142");
            sublist.add(submap);
            map.put("sublist", sublist);
            map.put("guid", "12312344");
            map.put("billcode", "1111");
            map.put("createdate", "1");
            map.put("amt", 1);
            map.put("paybankcode", "testtest");
            map.put("paybankname", "1");
            list.add(map);
            Map rt = service.sendVou("2023","bank","150100","2016",verifycode,list);
            System.out.println(rt);
            
            
            m = service.login("admin", "123456");
            verifycode = (String)m.get("verifycode");
            Map rt1 = service.cancelSendVou("2024","bank","150100","2016",verifycode,list);
            System.out.println(rt1);
            
            
            
            //发送和读取
            m = service.login("admin", "123456");
            verifycode = (String)m.get("verifycode");
            list= new ArrayList();
//            public Map sendVou(String bustype,String bankcode,String province,String year,String verifycode,List listmap) throws AppException {
            map = new HashMap();
            sublist = new ArrayList();
            submap = new HashMap();
            submap.put("guid", "1235");
            submap.put("mainguid", "12312355");
            submap.put("voucherguid", "1424311990");
            submap.put("voucherno", "1424311990");
            submap.put("createdate", "1424311990");
            submap.put("departmentcode", "123");
            submap.put("departmentname", "123123");
            submap.put("agencycode", "1424311990");
            submap.put("agencyname", "1424311990");
            submap.put("expfunccode", "1424311990");
            submap.put("expfuncname", "123");
            submap.put("programcode", "123123");
            submap.put("programname", "1424311990");
            submap.put("amt", 1);
            submap.put("paybankcode", "1424311990");
            submap.put("paybankname", "123");
            submap.put("province", "123123");
            submap.put("year", "142");
            sublist.add(submap);
            map.put("sublist", sublist);
            map.put("guid", "12312355");
            map.put("billcode", "1111");
            map.put("createdate", "1");
            map.put("amt", 1);
            map.put("paybankcode", "testtest");
            map.put("paybankname", "1");
            list.add(map);
            rt = service.sendVou("2023","bank","150100","2016",verifycode,list);
            System.out.println(rt);
            
            
            m = service.login("admin", "123456");
            verifycode = (String)m.get("verifycode");
            rt1 = service.readVou("1027","bank","150100","2016",verifycode);
            System.out.println(rt1);
        }catch(Exception e){
        	e.printStackTrace();
        }

	}

}
