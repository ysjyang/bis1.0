package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test1011 {
    /**
     * @param args
     * @throws
     */
    @SuppressWarnings("unchecked")
	public static void main(String[] args) {
        String url = "http://127.0.0.1:7001/remoting/service/bankservice";
        BurlapProxyFactory factory = new BurlapProxyFactory();
        try {
            IFasp2PayBankService service = (IFasp2PayBankService) factory.create(IFasp2PayBankService.class, url);
            
            Map m = service.login("admin", "123456");
            String verifycode = (String)m.get("verifycode");
            List list = new ArrayList();
            Map map = new HashMap();
            List sublist = new ArrayList();
            Map submap = new HashMap();
            //子表数据1
            submap.put("billcode","1");
            submap.put("mainguid","1");
            submap.put("oldbillcode","1");
            submap.put("agencyexpcode","1");
            submap.put("expfunccode","1");
            submap.put("bgttypecode","1");
            submap.put("bgttypename","1");
            submap.put("agencyname","1");
            submap.put("fundtypecode","1");
            submap.put("fundtypename","1");
            submap.put("payeeacctno","1");
            submap.put("payeeacctname","1");
            submap.put("payeeacctbankname","1");
            submap.put("payacctno","1");
            submap.put("payacctname","1");
            submap.put("payacctbankname","1");
            submap.put("amt","1");
            submap.put("remark","1");
            submap.put("paykindcode","1");
            submap.put("paykindname","1");
            submap.put("paytypecode","1");
            submap.put("paytypename","1");
            submap.put("setmodecode","1");
            submap.put("setmodename","1");
            submap.put("createdate","1");
            submap.put("paydate","1");
            submap.put("indsourcecode","1");
            submap.put("indsourcename","1");
            submap.put("zfgllxcode","1");
            submap.put("zfgllxname","1");
            submap.put("programcode","1");
            submap.put("programname","1");
            submap.put("guid","11");
            submap.put("voucherno","1");
            submap.put("oldguid","1");
            submap.put("agencyexpname","1");
            submap.put("expfuncname","1");
            submap.put("expecocode","1");
            submap.put("expeconame","1");
            submap.put("departmentcode","1");
            submap.put("departmentname","1");
            submap.put("agencycode","1");
            submap.put("clearbankname","1");
            submap.put("clearbankacctcode","1");
            submap.put("clearbankacctname","1");
            submap.put("finintorgcode","1");
            submap.put("finintorgname","1");
            submap.put("paybankcode","1");
            submap.put("posno","1");

            submap.put("paybankname","1");
            submap.put("bgtdocno","1");
            submap.put("gzbscode","1");
            submap.put("gzbsname","1");
            submap.put("usage","1");
            submap.put("bzjgcode","1");
            submap.put("bzjgname","1");
            submap.put("province","1");
            submap.put("year","1");
            sublist.add(submap);
            //子表数据2
            submap = new HashMap();
            submap.put("billcode","1");
            submap.put("posno","1");
            submap.put("mainguid","1");
            submap.put("oldbillcode","1");
            submap.put("agencyexpcode","1");
            submap.put("expfunccode","1");
            submap.put("bgttypecode","1");
            submap.put("bgttypename","1");
            submap.put("agencyname","1");
            submap.put("fundtypecode","1");
            submap.put("fundtypename","1");
            submap.put("payeeacctno","1");
            submap.put("payeeacctname","1");
            submap.put("payeeacctbankname","1");
            submap.put("payacctno","1");
            submap.put("payacctname","1");
            submap.put("payacctbankname","1");
            submap.put("amt","1");
            submap.put("remark","1");
            submap.put("paykindcode","1");
            submap.put("paykindname","1");
            submap.put("paytypecode","1");
            submap.put("paytypename","1");
            submap.put("setmodecode","1");
            submap.put("setmodename","1");
            submap.put("createdate","1");
            submap.put("paydate","1");
            submap.put("indsourcecode","1");
            submap.put("indsourcename","1");
            submap.put("zfgllxcode","1");
            submap.put("zfgllxname","1");
            submap.put("programcode","1");
            submap.put("programname","1");
            submap.put("guid","22");
            submap.put("voucherno","1");
            submap.put("oldguid","1");
            submap.put("agencyexpname","1");
            submap.put("expfuncname","1");
            submap.put("expecocode","1");
            submap.put("expeconame","1");
            submap.put("departmentcode","1");
            submap.put("departmentname","1");
            submap.put("agencycode","1");
            submap.put("clearbankname","1");
            submap.put("clearbankacctcode","1");
            submap.put("clearbankacctname","1");
            submap.put("finintorgcode","1");
            submap.put("finintorgname","1");
            submap.put("paybankcode","1");
            submap.put("paybankname","1");
            submap.put("bgtdocno","1");
            submap.put("gzbscode","1");
            submap.put("gzbsname","1");
            submap.put("usage","1");
            submap.put("bzjgcode","1");
            submap.put("bzjgname","1");
            submap.put("province","1");
            submap.put("year","1");
            sublist.add(submap);
   
            map.put("sublist", sublist);
            map.put("guid","1");
            map.put("billcode","1");
            map.put("agencyexpcode","1");
            map.put("agencyexpname","1");
            map.put("programcode","1");
            map.put("programname","1");
            map.put("bgttypecode","1");
            map.put("bgttypename","1");
            map.put("expfunccode","1");
            map.put("expfuncname","1");
            map.put("expecocode","1");
            map.put("expeconame","1");
            map.put("departmentcode","1");
            map.put("departmentname","1");
            map.put("agencycode","1");
            map.put("agencyname","1");
            map.put("fundtypecode","1");
            map.put("fundtypename","1");
            map.put("payeeacctno","1");
            map.put("payeeacctname","1");
            map.put("payeeacctbankname","1");
            map.put("payacctno","1");
            map.put("payacctname","1");
            map.put("payacctbankname","1");
            map.put("amt","1");
            map.put("remark","1");
            map.put("paykindcode","1");
            map.put("paykindname","1");
            map.put("paytypecode","1");
            map.put("paytypename","1");
            map.put("setmodecode","1");
            map.put("setmodename","1");
            map.put("createdate","1");
            map.put("indsourcecode","1");
            map.put("indsourcename","1");
            map.put("province","1");
            map.put("year","1");
            map.put("oldguid","1");
            map.put("oldbillcode","1");
            map.put("bisbankcode","pay");
            list.add(map);
            /**主单数据2*/
            sublist = new ArrayList();
            submap = new HashMap();
            submap.put("billcode","1");
            submap.put("mainguid","1");
            submap.put("oldbillcode","1");
            submap.put("agencyexpcode","1");
            submap.put("expfunccode","1");
            submap.put("bgttypecode","1");
            submap.put("bgttypename","1");
            submap.put("agencyname","1");
            submap.put("fundtypecode","1");
            submap.put("fundtypename","1");
            submap.put("payeeacctno","1");
            submap.put("payeeacctname","1");
            submap.put("payeeacctbankname","1");
            submap.put("payacctno","1");
            submap.put("payacctname","1");
            submap.put("payacctbankname","1");
            submap.put("amt","1");
            submap.put("remark","1");
            submap.put("paykindcode","1");
            submap.put("paykindname","1");
            submap.put("paytypecode","1");
            submap.put("paytypename","1");
            submap.put("setmodecode","1");
            submap.put("setmodename","1");
            submap.put("createdate","1");
            submap.put("paydate","1");
            submap.put("indsourcecode","1");
            submap.put("indsourcename","1");
            submap.put("zfgllxcode","1");
            submap.put("zfgllxname","1");
            submap.put("programcode","1");
            submap.put("programname","1");
            submap.put("guid","33");
            submap.put("voucherno","1");
            submap.put("oldguid","1");
            submap.put("agencyexpname","1");
            submap.put("expfuncname","1");
            submap.put("expecocode","1");
            submap.put("expeconame","1");
            submap.put("departmentcode","1");
            submap.put("departmentname","1");
            submap.put("agencycode","1");
            submap.put("clearbankname","1");
            submap.put("clearbankacctcode","1");
            submap.put("clearbankacctname","1");
            submap.put("finintorgcode","1");
            submap.put("finintorgname","1");
            submap.put("paybankcode","1");
            submap.put("paybankname","1");
            submap.put("bgtdocno","1");
            submap.put("gzbscode","1");
            submap.put("gzbsname","1");
            submap.put("usage","1");
            submap.put("bzjgcode","1");
            submap.put("bzjgname","1");
            submap.put("province","1");
            submap.put("year","1");
            submap.put("posno","1");
            sublist.add(submap);
            
            submap = new HashMap();
            submap.put("billcode","1");
            submap.put("mainguid","1");
            submap.put("oldbillcode","1");
            submap.put("agencyexpcode","1");
            submap.put("expfunccode","1");
            submap.put("bgttypecode","1");
            submap.put("bgttypename","1");
            submap.put("agencyname","1");
            submap.put("fundtypecode","1");
            submap.put("fundtypename","1");
            submap.put("payeeacctno","1");
            submap.put("payeeacctname","1");
            submap.put("payeeacctbankname","1");
            submap.put("payacctno","1");
            submap.put("payacctname","1");
            submap.put("payacctbankname","1");
            submap.put("amt","1");
            submap.put("remark","1");
            submap.put("paykindcode","1");
            submap.put("paykindname","1");
            submap.put("paytypecode","1");
            submap.put("paytypename","1");
            submap.put("setmodecode","1");
            submap.put("setmodename","1");
            submap.put("createdate","1");
            submap.put("paydate","1");
            submap.put("indsourcecode","1");
            submap.put("indsourcename","1");
            submap.put("zfgllxcode","1");
            submap.put("zfgllxname","1");
            submap.put("programcode","1");
            submap.put("programname","1");
            submap.put("guid","44");
            submap.put("voucherno","1");
            submap.put("oldguid","1");
            submap.put("agencyexpname","1");
            submap.put("expfuncname","1");
            submap.put("expecocode","1");
            submap.put("expeconame","1");
            submap.put("departmentcode","1");
            submap.put("departmentname","1");
            submap.put("agencycode","1");
            submap.put("clearbankname","1");
            submap.put("clearbankacctcode","1");
            submap.put("clearbankacctname","1");
            submap.put("finintorgcode","1");
            submap.put("finintorgname","1");
            submap.put("paybankcode","1");
            submap.put("paybankname","1");
            submap.put("bgtdocno","1");
            submap.put("gzbscode","1");
            submap.put("gzbsname","1");
            submap.put("usage","1");
            submap.put("bzjgcode","1");
            submap.put("bzjgname","1");
            submap.put("province","1");
            submap.put("year","1");
            submap.put("posno","1");
            sublist.add(submap);
            
            
            map = new HashMap();
            map.put("sublist", sublist);
            map.put("guid","2");
            map.put("billcode","1");
            map.put("agencyexpcode","1");
            map.put("agencyexpname","1");
            map.put("programcode","1");
            map.put("programname","1");
            map.put("bgttypecode","1");
            map.put("bgttypename","1");
            map.put("expfunccode","1");
            map.put("expfuncname","1");
            map.put("expecocode","1");
            map.put("expeconame","1");
            map.put("departmentcode","1");
            map.put("departmentname","1");
            map.put("agencycode","1");
            map.put("agencyname","1");
            map.put("fundtypecode","1");
            map.put("fundtypename","1");
            map.put("payeeacctno","1");
            map.put("payeeacctname","1");
            map.put("payeeacctbankname","1");
            map.put("payacctno","1");
            map.put("payacctname","1");
            map.put("payacctbankname","1");
            map.put("amt","1");
            map.put("remark","1");
            map.put("paykindcode","1");
            map.put("paykindname","1");
            map.put("paytypecode","1");
            map.put("paytypename","1");
            map.put("setmodecode","1");
            map.put("setmodename","1");
            map.put("createdate","1");
            map.put("indsourcecode","1");
            map.put("indsourcename","1");
            map.put("province","1");
            map.put("year","1");
            map.put("oldguid","1");
            map.put("oldbillcode","1");
            map.put("bisbankcode","pay");
            list.add(map);
            Map rt1 = service.sendVou("2009","bank","1500","2020",verifycode,list);
            System.out.println("sendVou:"+rt1);
            
	          m = service.login("admin", "123456");
	          verifycode = (String)m.get("verifycode");
	          Map rt12 = service.cancelSendVou("2010","bank","1500","2020",verifycode,list);
	          System.out.println(rt12);
        }catch(Exception e){
            e.printStackTrace();
        }

    }
}
