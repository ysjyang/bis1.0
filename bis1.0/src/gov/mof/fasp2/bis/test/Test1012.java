package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test1012 {
    /**
     * 授权支付凭证-确认支付
     * @param args
     * @throws
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
            List subList = new ArrayList();
            //第一条数据
            Map map = new HashMap();
            map.put("guid", "B5FB19B30854832EC68F4E150E6D2A69");	//1
            map.put("billcode", "1150034300071");					//1
            map.put("amt", "1000.00");								//1
            map.put("paydate", "20170320");
            map.put("payeebankaccount", "112");
            map.put("payee", "111");
            map.put("payeebank", "111");
            map.put("bisbankcode", "pay");
            Map submap = new HashMap();
            submap.put("guid", "B9DECB69FB9FA9116073A2AB0883D0B5");		//1
            submap.put("mainguid", "B5FB19B30854832EC68F4E150E6D2A69"); //1
            submap.put("amt", "300.0");								//1
            submap.put("province", "1500");
            submap.put("year", "2017");
            subList.add(submap);
            submap = new HashMap();
            submap.put("guid", "B9DECB69FB9FA9116073A2AB0883D0B1");		//1
            submap.put("mainguid", "B5FB19B30854832EC68F4E150E6D2A69"); //1
            submap.put("amt", "200.0");								//1
            submap.put("province", "1500");
            submap.put("year", "2017");
            subList.add(submap);
            submap = new HashMap();
            submap.put("guid", "B9DECB69FB9FA9116073A2AB0883D0B2");		//1
            submap.put("mainguid", "B5FB19B30854832EC68F4E150E6D2A69"); //1
            submap.put("amt", "500");								//1
            submap.put("province", "1500");
            submap.put("year", "2017");
            subList.add(submap);
            map.put("sublist", subList);
            list.add(map);
            //第二条数据
            map = new HashMap();
            subList = new ArrayList();
            map.put("guid", "EBE91C6CEA350539032241311241F4F7");	//2
            map.put("billcode", "1150034300072");					//2
            map.put("amt", 4600.00);								//2
            map.put("paydate", "20170215");
            map.put("payeebankaccount", "112");
            map.put("payee", "111");
            map.put("payeebank", "111");
            map.put("bisbankcode", "pay");
            submap = new HashMap();
            submap.put("guid", "3F854D621C3774607B6D30A7FF5E1626");			//2
            submap.put("mainguid", "EBE91C6CEA350539032241311241F4F7");		//2
            submap.put("amt", 4600.00);									//2
            submap.put("province", "1500");
            submap.put("year", "2017");
            subList.add(submap);
            map.put("sublist", subList);
            list.add(map);
            //第三条数据
            map = new HashMap();
            subList = new ArrayList();
            map.put("guid", "9FD85F2CF2E2612EFB75EF68529956AB");	//3
            map.put("billcode", "1150034300073");					//3
            map.put("amt", 200.00);								//3
            map.put("paydate", "20170215");
            map.put("payeebankaccount", "112");
            map.put("payee", "111");
            map.put("payeebank", "111");
            map.put("bisbankcode", "pay");
            submap = new HashMap();
            submap.put("guid", "EE997669E367AF3532C108EADD7F32AB");			//3
            submap.put("mainguid", "9FD85F2CF2E2612EFB75EF68529956AB");		//3
            submap.put("amt", 200.00);									//3
            submap.put("province", "1500");
            submap.put("year", "2017");
            subList.add(submap);
            map.put("sublist", subList);
            list.add(map);
            //第四条数据
            map = new HashMap();
            subList = new ArrayList();
            map.put("guid", "8FDD5428C6A8271084B1E461DFFAE403");	//4
            map.put("billcode", "1150034300074");					//4
            map.put("amt", 8400.00);								//4
            map.put("paydate", "20170215");
            map.put("payeebankaccount", "112");
            map.put("payee", "111");
            map.put("payeebank", "111");
            map.put("bisbankcode", "pay");
            submap = new HashMap();
            submap.put("guid", "1F0710B91D455286AD972CF751CDC942");			//4
            submap.put("mainguid", "8FDD5428C6A8271084B1E461DFFAE403");		//4
            submap.put("amt", 8400.0);									//4
            submap.put("province", "1500");
            submap.put("year", "2017");
            subList.add(submap);
            map.put("sublist", subList);
            list.add(map);
            Map rt1 = service.sendVou("1012","bank","150000","2017",verifycode,list);
     //  	Map rt1 = service.cancelSendVou("1013", "bank", "150000","2017",verifycode, list);
            System.out.println("sendVou:"+rt1);
        }catch(Exception e){
            e.printStackTrace();
        }

    }
}
