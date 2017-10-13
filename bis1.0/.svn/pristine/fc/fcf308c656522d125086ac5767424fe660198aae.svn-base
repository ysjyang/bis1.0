package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test2101 {

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

			Map m = service.login("admin", "123456");
			Map rt = null;
			String verifycode = (String) m.get("verifycode");

			Map rt1 = service.readVou("2101", "bank", "1500", "2016",
					verifycode);
			m = service.login("admin", "123456");
			verifycode = (String) m.get("verifycode");
			rt = service.readUnReplySlipVou("2101", "bank", "1500", "2016",
					verifycode);
			System.out.println("读取 已读取未回执：" + rt);

			m = service.login("admin", "123456");
			verifycode = (String) m.get("verifycode");
			rt = service.replySlipVou("2101", "bank", "1500", "2016",
					verifycode, (List) rt.get("datas"));
			System.out.println("发送回执：" + rt);
			System.out.println("sendVou:" + rt1);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
