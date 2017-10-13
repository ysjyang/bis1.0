/**
 * @Title: Test1.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */

package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

/**
 * @ClassName: Test1
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>2016-5-11 钟毅11:10:54
 */

public class TestEleMents {

	/**
	 * @param args
	 * @throws
	 */
	public static void main(String[] args) {

		String url = "http://127.0.0.1:7001/remoting/service/bankservice";
		BurlapProxyFactory factory = new BurlapProxyFactory();
		try {

			IFasp2PayBankService service = (IFasp2PayBankService) factory
					.create(IFasp2PayBankService.class, url);
			//queryVersion(service);
			queryData(service);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static void queryData(IFasp2PayBankService service) {
		//
		Map m = service.login("admin", "123456");
		String verifycode = (String) m.get("verifycode");
		Map rt = service.queryElelement("1202", "bank", "150000", "2017",
				verifycode, "gzbs", "0");
		System.out.println(rt);
		
	}

	private static void queryVersion(IFasp2PayBankService service) {
		Map m = service.login("admin", "123456");
		Map rt = null;
		System.out.println(m);
		String verifycode = (String) m.get("verifycode");

		List elementcodelist = new ArrayList();
		elementcodelist.add("fundtype");
		elementcodelist.add("paytype");
		elementcodelist.add("setmode");
		elementcodelist.add("bgttype");
		elementcodelist.add("paykind");
		elementcodelist.add("agencyexp");
		elementcodelist.add("program");
		elementcodelist.add("expfunc");
		elementcodelist.add("expeco");
		elementcodelist.add("agency");
		elementcodelist.add("bank");
		elementcodelist.add("bankaccount");
		elementcodelist.add("bankaccounttype");
		elementcodelist.add("zfgllx");
		//民生接口基础数据
		elementcodelist.add("department");
		elementcodelist.add("dwzbly");
		elementcodelist.add("bzjg");
		elementcodelist.add("gzbs");
		rt = service.queryElelementVersion("1201", "bankcode", "150000",
				"2017", verifycode, elementcodelist);
		System.out.println(rt);
		
	}

}
