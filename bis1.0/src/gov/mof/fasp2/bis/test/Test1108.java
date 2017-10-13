package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;
import gov.mof.fasp2.bis.exception.AppException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test1108 {

	/**
	 * 主子表的发送和取消发送
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		String url = "http://127.0.0.1:7001/remoting/service/bankservice";
		BurlapProxyFactory factory = new BurlapProxyFactory();
		try {
			IFasp2PayBankService service = (IFasp2PayBankService) factory
					.create(IFasp2PayBankService.class, url);

			Map m = service.login("admin", "123456");
			String verifycode = (String) m.get("verifycode");
			List list = new ArrayList();
			// public Map sendVou(String bustype,String bankcode,String
			// province,String year,String verifycode,List listmap) throws
			// AppException {
			Map map = new HashMap();
			List sublist = new ArrayList();
			Map submap = new HashMap();
			submap.put("guid", "123166");
			submap.put("mainguid", "1111");
			submap.put("billno", "1424311990");
			submap.put("province", "1500");
			submap.put("year", "2016");
			submap.put("amt", 0.02);
			sublist.add(submap);
			map.put("sublist", sublist);
			map.put("billid", "1111");
			map.put("guid", "123123155");
			map.put("voucherno", "1");
			map.put("amt", 1.02);
			map.put("paydate", "20160525");
			map.put("remark", "testtest");
			list.add(map);

			//
			map = new HashMap();
			sublist = new ArrayList();
			submap = new HashMap();
			submap.put("guid", "123166");
			submap.put("mainguid", "11111");
			submap.put("billno", "1424311990");
			submap.put("province", "1500");
			submap.put("year", "2016");
			submap.put("amt", 0.02);
			sublist.add(submap);
			submap = new HashMap();
			submap.put("guid", "123166");
			submap.put("mainguid", "11111");
			submap.put("billno", "1424311990");
			submap.put("province", "1500");
			submap.put("year", "2016");
			submap.put("amt", 0.02);
			sublist.add(submap);
			map.put("sublist", sublist);
			map.put("billid", "11111");
			map.put("guid", "123123155");
			map.put("voucherno", "1");
			map.put("amt", 1.02);
			map.put("paydate", "20160525");
			map.put("remark", "testtest");
			list.add(map);
			Map rt = service.sendVou("1108", "bank1", "150000", "2016",
					verifycode, list);
			System.out.println(rt);

//			m = service.login("admin", "123456");
//			verifycode = (String) m.get("verifycode");
//			Map rt2 = service.cancelSendVou("1109", "bank1", "150000", "2016",
//					verifycode, list);
//			System.out.println(rt2.toString());

			// m = service.login("admin", "123456");
			// verifycode = (String)m.get("verifycode");
			// Map rt1 =
			// service.cancelSendVou("1109","bank","150100","2016",verifycode,list);
			// System.out.println(rt1);
			//
			//
			//
			// //发送和读取
			// m = service.login("admin", "123456");
			// verifycode = (String)m.get("verifycode");
			// list= new ArrayList();
			// // public Map sendVou(String bustype,String bankcode,String
			// province,String year,String verifycode,List listmap) throws
			// AppException {
			// map = new HashMap();
			// sublist = new ArrayList();
			// submap = new HashMap();
			// submap.put("guid", "1234");
			// submap.put("mainguid", "1231234");
			// submap.put("voucherno", "1424311990");
			// submap.put("cardno", "1424311990");
			// submap.put("posno", "1424311990");
			// submap.put("amt", 0.02);
			// submap.put("cardname", "wwj");
			// sublist.add(submap);
			// map.put("sublist", sublist);
			// map.put("billid", "1111");
			// map.put("guid", "1231234");
			// map.put("voucherno", "1");
			// map.put("amt", 1.02);
			// map.put("paydate", "20160525");
			// map.put("remark", "testtest");
			// list.add(map);
			// rt =
			// service.sendVou("1108","bank","150100","2016",verifycode,list);
			// System.out.println(rt);
			//
			//
			// m = service.login("admin", "123456");
			// verifycode = (String)m.get("verifycode");
			// rt1 = service.readVou("2106","bank","150100","2016",verifycode);
			// System.out.println(rt1);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
