package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class Test2104 {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String url = "http://127.0.0.1:7001/remoting/service/bankservice";
        BurlapProxyFactory factory = new BurlapProxyFactory();
        try {
            IFasp2PayBankService service = (IFasp2PayBankService) factory.create(IFasp2PayBankService.class, url);
            
            Map m=service.login("admintest","111111");
		    String verifycode=(String)m.get("verifycode");
			String bustype = "2104";//业务类型
			String bankcode = "1";//银行编码
			String province = "1500";//区划
			String year = "2016";//年度
			System.out.println("verifycode:"+verifycode);
			
			//2104-公务卡支付凭证发送
			  List list= new ArrayList();
	          Map map = new HashMap();
	          List sublist = new ArrayList();
	          Map submap = new HashMap();
	          submap.put("guid", "4");           
	          submap.put("mainguid", "4"); 
	          submap.put("voucherno", "1");  
	          submap.put("billno", "1"); 
	          submap.put("cardno", "1"); 
	          submap.put("cardname", "JIM");                  	               
	          submap.put("posno", "11");
	          submap.put("amt", 100);  
	          submap.put("pergatherbankname","招商银行健德门支行");
	          submap.put("pergatherbankacctcode","457854784755");
	          submap.put("pergatherbankacctname","内蒙古自治区财政局");
	          submap.put("oldguid","1");          
	          submap.put("oldbillcode","1"); 
	          submap.put("agencyexpcode","1");    
	          submap.put("agencyexpname","1");    
	          submap.put("programcode","1");      
	          submap.put("programname","1");      
	          submap.put("bgttypecode","1");      
	          submap.put("bgttypename","1");      
	          submap.put("expfunccode","1");      
	          submap.put("expfuncname","1");      
	          submap.put("expecocode","1");       
	          submap.put("expeconame","1");       
	          submap.put("departmentcode","1");   
	          submap.put("departmentname","1");   
	          submap.put("agencycode","1");       
	          submap.put("agencyname","1");       
	          submap.put("fundtypecode","1");     
	          submap.put("fundtypename","1");     
	          submap.put("payeeacctno","1");      
	          submap.put("payeeacctname","1");    
	          submap.put("payeeacctbankname","1");
	          submap.put("payacctno","1");        
	          submap.put("payacctname","1");      
	          submap.put("payacctbankname","1");  
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
	          submap.put("clearbankname","1");    
	          submap.put("clearbankacctcode","1");
	          submap.put("clearbankacctname", "11");
	          submap.put("finintorgcode", "11");  
	          submap.put("finintorgname", "11");  
	          submap.put("paybankcode", "11");    
	          submap.put("paybankname", "11");    
	          submap.put("bgtdocno","1");         
	          submap.put("gzbscode","1");         
	          submap.put("gzbsname","1");         
	          submap.put("usage","1");            
	          submap.put("bzjgcode","1");         
	          submap.put("bzjgname","1");         
	          submap.put("province","1500");         
	          submap.put("year","2016");                      
	          sublist.add(submap);
	          map.put("sublist", sublist);
	          map.put("guid", "4");
	          map.put("voucherno", "1");
	          map.put("createdate", "20160707");
	          map.put("payacctno", "10112545745454");
	          map.put("payacctname", "内蒙古自治区财政局");
	          map.put("payacctbankname", "招商银行如意路支行");
	          map.put("payeeacctno", "10254784587564");
	          map.put("payeeacctname", "内蒙古警察局");
	          map.put("payeeacctbankname", "招商银行内蒙古支行");
	          map.put("amt",1000);
	          map.put("agencycode", "1001001");
	          map.put("agencyname", "预算单位1001001");
	          map.put("departmentcode", "1001");
	          map.put("departmentname", "预算单位1001");
	          map.put("expfunccode", "2030501");
	          map.put("expfuncname", "专项工程");
	          map.put("expecocode", "30228");
	          map.put("expeconame", "工会经费");
	          map.put("programcode", "001");
	          map.put("programname", "银行接口");
	          map.put("paytypecode", "11");
	          map.put("paytypename", "财政直接支付");
	          map.put("paykindcode", "11");
	          map.put("paykindname", "现金");
	          map.put("setmodecode", "11");
	          map.put("setmodename", "年底结算");
	          map.put("remark", "教育经费");
	          map.put("indsourcecode", "10");
	          map.put("indsourcename", "上年结余");
	          map.put("fundtypecode", "11");
	          map.put("fundtypename", "政府性基金");
	          map.put("oldguid", "1");
	          map.put("oldbillcode", "1");
	          map.put("province", "1500");
	          map.put("year", "2016");
	          map.put("bisbankcode", "4");
	          list.add(map);
	          Map rt1 = service.sendVou(bustype,bankcode,province,year,verifycode,list);
	          System.out.println("sendVou:"+rt1);
            
            
	        m=service.login("admintest","111111");
            verifycode = (String)m.get("verifycode");
            rt1 = service.cancelSendVou("2105","bank","1500","2016",verifycode,list);
            System.out.println(rt1);
            
            
            
//            //发送和读取
//            m = service.login("admin", "123456");
//            verifycode = (String)m.get("verifycode");
//            list= new ArrayList();
////            public Map sendVou(String bustype,String bankcode,String province,String year,String verifycode,List listmap) throws AppException {
//            map = new HashMap();
//            sublist = new ArrayList();
//            submap = new HashMap();
//            submap.put("guid", "1235");
//            submap.put("mainguid", "12312355");
//            submap.put("voucherno", "1424311990");
//            submap.put("cardno", "1424311990");
//            submap.put("cardname", "wwj");
//            submap.put("posno", "1424311990");
//            submap.put("amt", 0.02);
//            sublist.add(submap);
//            map.put("sublist", sublist);
//            map.put("guid", "12312355");
//            map.put("voucherno", "1111");
//            map.put("createdate", "20160525");
//            map.put("payacctno", "1");
//            map.put("payacctname", "wwj");
//            map.put("payacctbankname", "chine");
//            map.put("payeeacctno", "1111");
//            map.put("payeeacctname", "123123");
//            map.put("payeeacctbankname", "china");
//            map.put("amt", 1.02);
//            map.put("agencycode", "20160525");
//            map.put("agencyname", "testtest");
//            map.put("departmentcode", "1111");
//            map.put("departmentname", "123123");
//            map.put("expfunccode", "1");
//            map.put("expfuncname", "20160525");
//            map.put("expecocode", "testtest");
//            map.put("expeconame", "1111");
//            map.put("programcode", "123123");
//            map.put("programname", "1");
//            map.put("paytypecode", "1");
//            map.put("paytypename", "testtest");
//            map.put("paykindcode", "123123");
//            map.put("paykindname", "1");
//            map.put("setmodecode", "20160525");
//            map.put("setmodename", "testtest");
//            map.put("remark", "1111");
//            map.put("indsourcecode", "123123");
//            map.put("indsourcename", "1");
//            map.put("fundtypename", "1");
//            map.put("province", "testtest");
//            map.put("year", "2016");
//            list.add(map);
//            rt = service.sendVou("2104","bank","150100","2016",verifycode,list);
//            System.out.println(rt);
//            
//            
//            m = service.login("admin", "123456");
//            verifycode = (String)m.get("verifycode");
//            rt = service.readVou("1107","bank","1500","2016",verifycode);
//            System.out.println(rt);
        }catch(Exception e){
        	e.printStackTrace();
        }
	}

}
