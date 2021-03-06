package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.Fasp2PayBankService;
import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.elesynchro.HessianEleData;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TestAction implements IAction{

	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		// TODO Auto-generated method stub
		if(isajax){
			String typeCode = request.getParameter("typecode")+"";
			String bankCode = request.getParameter("bankcode")+"";
			String province = (request.getParameter("province")+"").split("-")[0];
			String year = request.getParameter("year")+"";
			String readtype = request.getParameter("readtype")+"";
			String ele = request.getParameter("ele")+"";
			String seq = request.getParameter("seq")+"";
			/**
			 * busdatatype
			 * 01：直接
			 * 02：授权
			 * 03：公务卡
			 */
			String busdatatype = request.getParameter("busdatatype")+"";
			if(typeCode.startsWith("1")){
				if(province.length() == 4){
					province += "00";
				}
			}
			Fasp2PayBankService service = new Fasp2PayBankService();
			//所有读取
			if("1001,1010,1011,1020,1021,1024,1027,1107,2003,2004,2005,2006,2011,2012,2013,2014,2019,2022,2101,2012,2013,2102,2103,2106,2107".indexOf(typeCode)!=-1){
				//读取未读取状态凭证
				if("read1".equals(readtype)){
					Map readVou = service.readVou(typeCode, bankCode, province, year, getverifycode());
//					System.out.println(readVou);
					BisUtil.ajaxPrint(BisUtil.objectToJson(readVou), response);
				}
				//读取凭证成功回执
				if("read2".equals(readtype)){
					Map readVou = service.readVou(typeCode, bankCode, province, year, getverifycode());
					List reply = (List)readVou.get("datas");
					if(reply.size()>=0){
						Map replySlipVou = service.replySlipVou(typeCode, bankCode, province, year, getverifycode(), reply);
//						System.out.println(replySlipVou);
						BisUtil.ajaxPrint(BisUtil.objectToJson(replySlipVou), response);
					}
				}
				//读取已读取但未回执凭证
				if("read3".equals(readtype)){
					Map readUnReplySlipVou = service.readUnReplySlipVou(typeCode, bankCode, province, year, getverifycode());
//					BisUtil.ajaxPrint(BisUtil.objectToJson(readUnReplySlipVou), response);
					List reply = (List)readUnReplySlipVou.get("datas");
					if(reply.size()>=0){
						Map replySlipVou = service.replySlipVou(typeCode, bankCode, province, year, getverifycode(), reply);
//						System.out.println(replySlipVou);
						BisUtil.ajaxPrint(BisUtil.objectToJson(readUnReplySlipVou), response);
					}
				}
			}
			//直接支付凭证
			if("1002".equals(typeCode)){
				action1002(service,bankCode, province, year,response);
			}
			if("1003".equals(typeCode)){
				action1003(service,bankCode, province, year,response);
			}
			if("1004".equals(typeCode)){
				action1004(service,bankCode, province, year,response);
			}
			if("1005".equals(typeCode)){
				action1005(service,bankCode, province, year,response);
			}
			if("1006".equals(typeCode)){
				action1006(service,bankCode, province, year,response);
			}
			if("1007".equals(typeCode)){
				action1007(service,bankCode, province, year,response);
			}
			//授权支付凭证
			if("1012".equals(typeCode)){
				if("02".equals(busdatatype)){
					action1012_01(service,bankCode, province, year,response);
				}else if("03".equals(busdatatype)){
					action1012_02(service,bankCode, province, year,response);
				}
			}
			if("1013".equals(typeCode)){
				if("02".equals(busdatatype)){
					action1013_01(service,bankCode, province, year,response);
				}else if("03".equals(busdatatype)){
					action1013_02(service,bankCode, province, year,response);
				}
			}
			if("1014".equals(typeCode)){
				action1014(service,bankCode, province, year,response);
			}
			if("1015".equals(typeCode)){
				action1015(service,bankCode, province, year,response);
			}
			if("1016".equals(typeCode)){
				action1016(service,bankCode, province, year,response);
			}
			if("1017".equals(typeCode)){
				action1017(service,bankCode, province, year,response);
			}
			//通知书
			if("1008".equals(typeCode)){
				action1008(service,bankCode, province, year,response);
			}
			if("1009".equals(typeCode)){
				action1009(service,bankCode, province, year,response);
			}
			if("1018".equals(typeCode)){
				action1018(service,bankCode, province, year,response);
			}
			if("1019".equals(typeCode)){
				action1019(service,bankCode, province, year,response);
			}
			//划款凭证申请
			if("1022".equals(typeCode)){
				//01 直接  02 授权   03 公务卡
				if("01".equals(busdatatype)){
					action1022_01(service,bankCode, province, year,response);					
				}else if("02".equals(busdatatype)){
					action1022_02(service,bankCode, province, year,response);
				}else if("03".equals(busdatatype)){
					action1022_03(service,bankCode, province, year,response);
				}
			}
			if("1023".equals(typeCode)){
				if("01".equals(busdatatype)){
					action1023_01(service,bankCode, province, year,response);					
				}else if("02".equals(busdatatype)){
					action1023_02(service,bankCode, province, year,response);
				}else if("03".equals(busdatatype)){
					action1023_03(service,bankCode, province, year,response);
				}
			}
			//支付日报
			if("1025".equals(typeCode)){
				action1025(service,bankCode, province, year,response);
			}
			if("1026".equals(typeCode)){
				action1026(service,bankCode, province, year,response);
			}
			//新增公务卡信息
			if("1101".equals(typeCode)){
				action1101(service,bankCode, province, year,response);
			}
			if("1102".equals(typeCode)){
				action1102(service,bankCode, province, year,response);
			}
			//公务卡状态变更
			if("1103".equals(typeCode)){
				action1103(service,bankCode, province, year,response);
			}
			if("1104".equals(typeCode)){
				action1104(service,bankCode, province, year,response);
			}
			//公务卡消费信息下载
			if("1105".equals(typeCode)){
				action1105(service,bankCode, province, year,response);
			}
			if("1106".equals(typeCode)){
				action1106(service,bankCode, province, year,response);
			}
			//公务卡退款通知单
			if("1108".equals(typeCode)){
				action1108(service,bankCode, province, year,response);
			}
			if("1109".equals(typeCode)){
				action1109(service,bankCode, province, year,response);
			}
			//上卡日期
			if("1110".equals(typeCode)){
				action1110(service,bankCode, province, year,response);
			}
			if("1111".equals(typeCode)){
				action1111(service,bankCode, province, year,response);
			}
			//基础数据
			if("1201".equals(typeCode)){
				action1201(service,bankCode, province, year,response);
			}
			if("1202".equals(typeCode)){
				action1202(service,bankCode, province, year,response,ele,seq);
			}
		}
		return true;
	}
	public String getverifycode(){
		Fasp2PayBankService service = new Fasp2PayBankService();
		Map m = service.login("admin", "123456");
		return (String)m.get("verifycode");
	}
	//1002直接支付凭证-确认支付
	public void action1002(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        Map readVou = service.readVou("1001", bankCode, province, year, verifycode);
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	
    	List data00 = (List)readVou.get("datas");
    	
    	//1002直接支付凭证-确认支付
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List list = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("billcode", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("payeebankaccount", data.get("payeeacctno"));
        	map.put("payee", data.get("payeeacctname"));
        	map.put("payeebank", data.get("payeeacctbankname"));
        	map.put("amt", data.get("amt"));
        	map.put("sublist",data.get("sublist"));
        	list.add(map);
        }
        Map sendVou = service.sendVou("1002", bankCode, province, year, verifycode, list);
//    	System.out.println("1002直接支付凭证-确认支付  sendVou:" + ((List)sendVou.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	//1003直接支付凭证-取消确认支付
	public void action1003(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        Map readVou = service.readVou("1001", bankCode, province, year, verifycode);
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
//    	
    	List data00 = (List)readVou.get("datas");
    	
//    	//1002直接支付凭证-确认支付
//    	m = service.login("admin", "123456");
//        verifycode = (String)m.get("verifycode");
//        List list = new ArrayList();
//        for(int i=0;i<data00.size();i++){
//        	Map data = (Map)data00.get(i);
//        	Map map = new HashMap();
//        	map.put("billcode", data.get("billcode"));
//        	map.put("guid", data.get("guid"));
//        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
//        	map.put("payeebankaccount", data.get("payeeacctno"));
//        	map.put("payee", data.get("payeeacctname"));
//        	map.put("payeebank", data.get("payeeacctbankname"));
//        	map.put("amt", data.get("amt"));
//        	map.put("sublist",data.get("sublist"));
//        	list.add(map);
//        }
//        Map sendVou = service.sendVou("1002", bankCode, province, year, verifycode, list);
//    	System.out.println("1002直接支付凭证-确认支付  sendVou:" + ((List)sendVou.get("datas")).size());
    	
    	//1003直接支付凭证-取消确认支付
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List cancellist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("billcode", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("payeebankaccount", data.get("payeeacctno"));
        	map.put("payee", data.get("payeeacctname"));
        	map.put("payeebank", data.get("payeeacctbankname"));
        	map.put("amt", data.get("amt"));
        	map.put("sublist",data.get("sublist"));
        	cancellist.add(map);
        }
		Map cancelSendVou = service.cancelSendVou("1003", bankCode, province, year, verifycode, cancellist);
//		System.out.println("1003直接支付凭证-取消确认支付  cancelSendVou:" + cancelSendVou);
		BisUtil.ajaxPrint(BisUtil.objectToJson(cancelSendVou), response);
	}
	//1004直接支付凭证-退回
	public void action1004(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        Map readVou = service.readVou("1001", bankCode, province, year, verifycode);
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	
    	List data00 = (List)readVou.get("datas");
		//1004直接支付凭证-退回
		m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List backlist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("billcode", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("remark", "测试退回");
        	map.put("sublist",data.get("sublist"));
        	backlist.add(map);
        }
        Map sendVou01 = service.sendVou("1004", bankCode, province, year, verifycode, backlist);
//    	System.out.println("1004直接支付凭证-退回  sendVou:" + ((List)sendVou01.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou01), response);
	}
	//1005直接支付凭证-取消退回
	public void action1005(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        Map readVou = service.readVou("1001", bankCode, province, year, verifycode);
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	
    	List data00 = (List)readVou.get("datas");
//		//1004直接支付凭证-退回
//		m = service.login("admin", "123456");
//        verifycode = (String)m.get("verifycode");
//        List backlist = new ArrayList();
//        for(int i=0;i<data00.size();i++){
//        	Map data = (Map)data00.get(i);
//        	Map map = new HashMap();
//        	map.put("billcode", data.get("billcode"));
//        	map.put("guid", data.get("guid"));
//        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
//        	map.put("remark", "测试退回");
//        	map.put("sublist",data.get("sublist"));
//        	backlist.add(map);
//        }
//        Map sendVou01 = service.sendVou("1004", bankCode, province, year, verifycode, backlist);
//    	System.out.println("1004直接支付凭证-退回  sendVou:" + ((List)sendVou01.get("datas")).size());
    	//1005直接支付凭证-取消退回
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List cancelbacklist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("billcode", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("remark", "测试退回");
        	map.put("sublist",data.get("sublist"));
        	cancelbacklist.add(map);
        }
        Map cancelSendVou2 = service.cancelSendVou("1005", bankCode, province, year, verifycode, cancelbacklist);
//    	System.out.println("1005直接支付凭证-取消退回  cancelSendVou2:" + cancelSendVou2);
    	BisUtil.ajaxPrint(BisUtil.objectToJson(cancelSendVou2), response);
	}
	//1006直接支付凭证退款通知书-发送
	public void action1006(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        Map readVou = service.readVou("1001", bankCode, province, year, verifycode);
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	
    	List data00 = (List)readVou.get("datas");
		//1006直接支付凭证退款通知书-发送
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List noticelist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("voucherguid", data.get("guid"));
        	map.put("voucherno", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("amt", "-"+data.get("amt"));
        	map.put("remark", "测试退款通知书-发送");
        	List subdatas = (List)data.get("sublist");
        	for(int j=0;j<subdatas.size();j++){
        		Map subdata =(Map)subdatas.get(j);
        		subdata.put("amt", "-"+subdata.get("amt"));
        	}
        	map.put("sublist",subdatas);
        	noticelist.add(map);
        }
        Map sendVou2 = service.sendVou("1006", bankCode, province, year, verifycode, noticelist);
//    	System.out.println("1006直接支付凭证退款通知书-发送  sendVou2:" + ((List)sendVou2.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou2), response);
	}
	//1007直接支付凭证退款通知书-取消发送
	public void action1007(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        Map readVou = service.readVou("1001", bankCode, province, year, verifycode);
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	
    	List data00 = (List)readVou.get("datas");
//		//1006直接支付凭证退款通知书-发送
//    	m = service.login("admin", "123456");
//        verifycode = (String)m.get("verifycode");
//        List noticelist = new ArrayList();
//        for(int i=0;i<data00.size();i++){
//        	Map data = (Map)data00.get(i);
//        	Map map = new HashMap();
//        	map.put("voucherguid", data.get("guid"));
//        	map.put("voucherno", data.get("guid"));
//        	map.put("guid", data.get("guid"));
//        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
//        	map.put("amt", data.get("amt"));
//        	map.put("remark", "测试退款通知书-发送");
//        	map.put("sublist",data.get("sublist"));
//        	noticelist.add(map);
//        }
//        Map sendVou2 = service.sendVou("1006", bankCode, province, year, verifycode, noticelist);
//    	System.out.println("1006直接支付凭证退款通知书-发送  sendVou2:" + ((List)sendVou2.get("datas")).size());
    	//1007直接支付凭证退款通知书-取消发送
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List cancelnoticelist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("voucherguid", data.get("guid"));
        	map.put("voucherno", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("amt", "-"+data.get("amt"));
        	map.put("remark", "测试退款通知书-取消发送");
        	List subdatas = (List)data.get("sublist");
        	for(int j=0;j<subdatas.size();j++){
        		Map subdata =(Map)subdatas.get(j);
        		subdata.put("amt", "-"+subdata.get("amt"));
        	}
        	map.put("sublist",subdatas);
        	cancelnoticelist.add(map);
        }
        Map cancelSendVou01 = service.cancelSendVou("1007", bankCode, province, year, verifycode, cancelnoticelist);
//    	System.out.println("1007直接支付凭证退款通知书-取消发送  cancelSendVou01:" + cancelSendVou01);
    	BisUtil.ajaxPrint(BisUtil.objectToJson(cancelSendVou01), response);
	}
	//1012授权支付凭证-确认支付
	public void action1012_01(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		/**
         * 1011授权支付凭证读取
         */
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        
        Map readVou = service.readVou("1011", bankCode, province, year, verifycode);
//    	System.out.println("1011授权支付凭证读取  readVou:"+readVou.size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}    	
    	List data00 = (List)readVou.get("datas");
    	
    	/**
    	 * 1012授权支付凭证-确认支付
    	 */
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List list = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("billcode", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("payeebankaccount", data.get("payeeacctno"));
        	map.put("payee", data.get("payeeacctname"));
        	map.put("payeebank", data.get("payeeacctbankname"));
        	map.put("amt", data.get("amt"));
        	map.put("sublist",data.get("sublist"));
        	list.add(map);
        }
        Map sendVou = service.sendVou("1012", bankCode, province, year, verifycode, list);
//    	System.out.println("1012授权支付凭证-确认支付  sendVou:" + sendVou.size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	public void action1012_02(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		/**
         * 1107公务卡支付凭证读取
         */
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        
        Map readVou = service.readVou("1107", bankCode, province, year, verifycode);
//    	System.out.println("1011授权支付凭证读取  readVou:"+readVou.size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}    	
    	List data00 = (List)readVou.get("datas");
    	
    	/**
    	 * 1012授权支付凭证-确认支付
    	 */
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List list = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("billcode", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("payeebankaccount", data.get("payeeacctno"));
        	map.put("payee", data.get("payeeacctname"));
        	map.put("payeebank", data.get("payeeacctbankname"));
        	map.put("amt", data.get("amt"));
        	map.put("sublist",data.get("sublist"));
        	list.add(map);
        }
        Map sendVou = service.sendVou("1012", bankCode, province, year, verifycode, list);
//    	System.out.println("1012授权支付凭证-确认支付  sendVou:" + sendVou.size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	//1013授权支付凭证-取消确认支付
	public void action1013_01(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		/**
         * 1011授权支付凭证读取
         */
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        
        Map readVou = service.readVou("1011", bankCode, province, year, verifycode);
//    	System.out.println("1011授权支付凭证读取  readVou:"+readVou.size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}    	
    	List data00 = (List)readVou.get("datas");
    	
//    	/**
//    	 * 1012授权支付凭证-确认支付
//    	 */
//    	m = service.login("admin", "123456");
//        verifycode = (String)m.get("verifycode");
//        List list = new ArrayList();
//        for(int i=0;i<data00.size();i++){
//        	Map data = (Map)data00.get(i);
//        	Map map = new HashMap();
//        	map.put("billcode", data.get("billcode"));
//        	map.put("guid", data.get("guid"));
//        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
//        	map.put("payeebankaccount", data.get("payeeacctno"));
//        	map.put("payee", data.get("payeeacctname"));
//        	map.put("payeebank", data.get("payeeacctbankname"));
//        	map.put("amt", data.get("amt"));
//        	map.put("sublist",data.get("sublist"));
//        	list.add(map);
//        }
//        Map sendVou = service.sendVou("1012", bankCode, province, year, verifycode, list);
//    	System.out.println("1012授权支付凭证-确认支付  sendVou:" + sendVou.size());
    	/**
    	 * 1013授权支付凭证-取消确认支付
    	 */
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List cancellist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("billcode", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("payeebankaccount", data.get("payeeacctno"));
        	map.put("payee", data.get("payeeacctname"));
        	map.put("payeebank", data.get("payeeacctbankname"));
        	map.put("amt", data.get("amt"));
        	map.put("sublist",data.get("sublist"));
        	cancellist.add(map);
        }
		Map cancelSendVou = service.cancelSendVou("1013", bankCode, province, year, verifycode, cancellist);
//		System.out.println("1013授权支付凭证-取消确认支付  cancelSendVou:" + cancelSendVou.size());
		BisUtil.ajaxPrint(BisUtil.objectToJson(cancelSendVou), response);
	}
	
	//1013授权支付凭证-取消确认支付
		public void action1013_02(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
			/**
	         * 1107公务卡支付凭证读取
	         */
	        Map m = service.login("admin", "123456");
	        String verifycode = (String)m.get("verifycode");
	        
	        Map readVou = service.readVou("1107", bankCode, province, year, verifycode);
//	    	System.out.println("1011授权支付凭证读取  readVou:"+readVou.size());
	    	String result = (String)readVou.get("result");
//	    	if("ERROR".equals(result)){
//	    		System.out.println("ERROR：");
//	    		System.out.println("errorno:" + readVou.get("errorno"));
//	    		System.out.println("errormsg:" + readVou.get("errormsg"));
//	    		return;
//	    	}
//	    	if("SUCCESS".equals(result)){
//	    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//	    	}    	
	    	List data00 = (List)readVou.get("datas");
	    	
//	    	/**
//	    	 * 1012授权支付凭证-确认支付
//	    	 */
//	    	m = service.login("admin", "123456");
//	        verifycode = (String)m.get("verifycode");
//	        List list = new ArrayList();
//	        for(int i=0;i<data00.size();i++){
//	        	Map data = (Map)data00.get(i);
//	        	Map map = new HashMap();
//	        	map.put("billcode", data.get("billcode"));
//	        	map.put("guid", data.get("guid"));
//	        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
//	        	map.put("payeebankaccount", data.get("payeeacctno"));
//	        	map.put("payee", data.get("payeeacctname"));
//	        	map.put("payeebank", data.get("payeeacctbankname"));
//	        	map.put("amt", data.get("amt"));
//	        	map.put("sublist",data.get("sublist"));
//	        	list.add(map);
//	        }
//	        Map sendVou = service.sendVou("1012", bankCode, province, year, verifycode, list);
//	    	System.out.println("1012授权支付凭证-确认支付  sendVou:" + sendVou.size());
	    	/**
	    	 * 1013授权支付凭证-取消确认支付
	    	 */
	    	m = service.login("admin", "123456");
	        verifycode = (String)m.get("verifycode");
	        List cancellist = new ArrayList();
	        for(int i=0;i<data00.size();i++){
	        	Map data = (Map)data00.get(i);
	        	Map map = new HashMap();
	        	map.put("billcode", data.get("billcode"));
	        	map.put("guid", data.get("guid"));
	        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
	        	map.put("payeebankaccount", data.get("payeeacctno"));
	        	map.put("payee", data.get("payeeacctname"));
	        	map.put("payeebank", data.get("payeeacctbankname"));
	        	map.put("amt", data.get("amt"));
	        	map.put("sublist",data.get("sublist"));
	        	cancellist.add(map);
	        }
			Map cancelSendVou = service.cancelSendVou("1013", bankCode, province, year, verifycode, cancellist);
//			System.out.println("1013授权支付凭证-取消确认支付  cancelSendVou:" + cancelSendVou.size());
			BisUtil.ajaxPrint(BisUtil.objectToJson(cancelSendVou), response);
		}
	//1014授权支付凭证-退回
	public void action1014(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		/**
         * 1011授权支付凭证读取
         */
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        
        Map readVou = service.readVou("1011", bankCode, province, year, verifycode);
//    	System.out.println("1011授权支付凭证读取  readVou:"+readVou.size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}    	
    	List data00 = (List)readVou.get("datas");
    	/**
		 * 1014授权支付凭证-退回
		 */
		m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List backlist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("billcode", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("remark", "测试退回");
        	map.put("sublist",data.get("sublist"));
        	backlist.add(map);
        }
        Map sendVou01 = service.sendVou("1014", bankCode, province, year, verifycode, backlist);
//    	System.out.println("1014授权支付凭证-退回  sendVou:" + sendVou01);
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou01), response);
	}
	//1015授权支付凭证-取消退回
	public void action1015(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		/**
         * 1011授权支付凭证读取
         */
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        
        Map readVou = service.readVou("1011", bankCode, province, year, verifycode);
//    	System.out.println("1011授权支付凭证读取  readVou:"+readVou.size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}    	
    	List data00 = (List)readVou.get("datas");
//    	/**
//		 * 1014授权支付凭证-退回
//		 */
//		m = service.login("admin", "123456");
//        verifycode = (String)m.get("verifycode");
//        List backlist = new ArrayList();
//        for(int i=0;i<data00.size();i++){
//        	Map data = (Map)data00.get(i);
//        	Map map = new HashMap();
//        	map.put("billcode", data.get("billcode"));
//        	map.put("guid", data.get("guid"));
//        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
//        	map.put("remark", "测试退回");
//        	map.put("sublist",data.get("sublist"));
//        	backlist.add(map);
//        }
//        Map sendVou01 = service.sendVou("1014", bankCode, province, year, verifycode, backlist);
//    	System.out.println("1014授权支付凭证-退回  sendVou:" + sendVou01);
    	/**
    	 * 1015授权支付凭证-取消退回
    	 */
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List cancelbacklist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("billcode", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("remark", "测试退回");
        	map.put("sublist",data.get("sublist"));
        	cancelbacklist.add(map);
        }
        Map cancelSendVou2 = service.cancelSendVou("1015", bankCode, province, year, verifycode, cancelbacklist);
//    	System.out.println("1015授权支付凭证-取消退回  cancelSendVou2:" + cancelSendVou2.size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(cancelSendVou2), response);
	}
	//1016授权支付凭证退款通知书-发送
	public void action1016(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		/**
         * 1011授权支付凭证读取
         */
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        
        Map readVou = service.readVou("1011", bankCode, province, year, verifycode);
//    	System.out.println("1011授权支付凭证读取  readVou:"+readVou.size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}    	
    	List data00 = (List)readVou.get("datas");
		/**
    	 * 1016授权支付凭证退款通知书-发送
    	 */
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List noticelist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("voucherguid", data.get("guid"));
        	map.put("voucherno", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("amt", "-"+data.get("amt"));
        	map.put("remark", "测试退款通知书-发送");
        	List subdatas = (List)data.get("sublist");
        	for(int j=0;j<subdatas.size();j++){
        		Map subdata =(Map)subdatas.get(j);
        		subdata.put("amt", "-"+subdata.get("amt"));
        	}
        	map.put("sublist",subdatas);
        	noticelist.add(map);
        }
        Map sendVou2 = service.sendVou("1016", bankCode, province, year, verifycode, noticelist);
//    	System.out.println("1016授权支付凭证退款通知书-发送  sendVou2:" + ((List)sendVou2.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou2), response);
	}
	//1017授权支付凭证退款通知书-取消发送
	public void action1017(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		/**
         * 1011授权支付凭证读取
         */
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        
        Map readVou = service.readVou("1011", bankCode, province, year, verifycode);
//    	System.out.println("1011授权支付凭证读取  readVou:"+readVou.size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}    	
    	List data00 = (List)readVou.get("datas");
//		/**
//    	 * 1016授权支付凭证退款通知书-发送
//    	 */
//    	m = service.login("admin", "123456");
//        verifycode = (String)m.get("verifycode");
//        List noticelist = new ArrayList();
//        for(int i=0;i<data00.size();i++){
//        	Map data = (Map)data00.get(i);
//        	Map map = new HashMap();
//        	map.put("voucherguid", data.get("guid"));
//        	map.put("voucherno", data.get("guid"));
//        	map.put("guid", data.get("guid"));
//        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
//        	map.put("amt", data.get("amt"));
//        	map.put("remark", "测试退款通知书-发送");
//        	map.put("sublist",data.get("sublist"));
//        	noticelist.add(map);
//        }
//        Map sendVou2 = service.sendVou("1016", bankCode, province, year, verifycode, noticelist);
//    	System.out.println("1016授权支付凭证退款通知书-发送  sendVou2:" + ((List)sendVou2.get("datas")).size());
    	/**
    	 * 1017授权支付凭证退款通知书-取消发送
    	 */
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List cancelnoticelist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("voucherguid", data.get("guid"));
        	map.put("voucherno", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("amt", "-"+data.get("amt"));
        	map.put("remark", "测试退款通知书-取消发送");List subdatas = (List)data.get("sublist");
        	for(int j=0;j<subdatas.size();j++){
        		Map subdata =(Map)subdatas.get(j);
        		subdata.put("amt", "-"+subdata.get("amt"));
        	}
        	map.put("sublist",subdatas);
        	cancelnoticelist.add(map);
        }
        Map cancelSendVou01 = service.cancelSendVou("1017", bankCode, province, year, verifycode, cancelnoticelist);
//    	System.out.println("1017授权支付凭证退款通知书-取消发送  cancelSendVou01:" + cancelSendVou01.size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(cancelSendVou01), response);
	}
	//1008直接支付入账通知书-发送
	public void action1008(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        Map readVou = service.readVou("1001", bankCode, province, year, verifycode);
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	
    	List data00 = (List)readVou.get("datas");
		//1008直接支付入账通知书-发送
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List importlist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("voucherguid", data.get("guid"));
        	map.put("voucherno", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("payeebankaccount", data.get("payeeacctno"));
        	map.put("payee", data.get("payeeacctname"));
        	map.put("payeebank", data.get("payeeacctbankname"));
        	map.put("amt", data.get("amt"));
        	map.put("sublist",data.get("sublist"));
        	importlist.add(map);
        }
        Map sendVou3 = service.sendVou("1008", bankCode, province, year, verifycode, importlist);
//    	System.out.println("1008直接支付入账通知书-发送  sendVou3:" + ((List)sendVou3.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou3), response);
	}
	//1009直接支付入账通知书-取消发送
	public void action1009(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        Map readVou = service.readVou("1001", bankCode, province, year, verifycode);
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	
    	List data00 = (List)readVou.get("datas");
//		//1008直接支付入账通知书-发送
//    	m = service.login("admin", "123456");
//        verifycode = (String)m.get("verifycode");
//        List importlist = new ArrayList();
//        for(int i=0;i<data00.size();i++){
//        	Map data = (Map)data00.get(i);
//        	Map map = new HashMap();
//        	map.put("voucherguid", data.get("guid"));
//        	map.put("voucherno", data.get("guid"));
//        	map.put("guid", data.get("guid"));
//        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
//        	map.put("payeebankaccount", data.get("payeeacctno"));
//        	map.put("payee", data.get("payeeacctname"));
//        	map.put("payeebank", data.get("payeeacctbankname"));
//        	map.put("amt", data.get("amt"));
//        	map.put("sublist",data.get("sublist"));
//        	importlist.add(map);
//        }
//        Map sendVou3 = service.sendVou("1008", bankCode, province, year, verifycode, importlist);
//    	System.out.println("1008直接支付入账通知书-发送  sendVou3:" + ((List)sendVou3.get("datas")).size());
    	//1009直接支付入账通知书-取消发送
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List cancelimportlist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map map = new HashMap();
        	map.put("voucherguid", data.get("guid"));
        	map.put("voucherno", data.get("billcode"));
        	map.put("guid", data.get("guid"));
        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        	map.put("payeebankaccount", data.get("payeeacctno"));
        	map.put("payee", data.get("payeeacctname"));
        	map.put("payeebank", data.get("payeeacctbankname"));
        	map.put("amt", data.get("amt"));
        	map.put("sublist",data.get("sublist"));
        	cancelimportlist.add(map);
        }
        Map cancelSendVou4 = service.cancelSendVou("1009", bankCode, province, year, verifycode, cancelimportlist);
//    	System.out.println("1009直接支付入账通知书-取消发送  cancelSendVou4:" + cancelSendVou4.size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(cancelSendVou4), response);
	}
	//1018财政授权支付额度到账通知书-发送
	public void action1018(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		 /**
         * 1011授权支付凭证读取
         */
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        
        Map readVou = service.readVou("1021", bankCode, province, year, verifycode);
//    	System.out.println("1011授权支付凭证读取  readVou:"+readVou);
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}    	
    	List data00 = (List)readVou.get("datas");
    	/**
    	 * 1018财政授权支付入账通知书-发送
    	 */
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List importlist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	List sublist = (List)data.get("sublist");
        	for(int j=0;j<sublist.size();j++){
        		Map sublistMap = (Map)sublist.get(j);
        		Map map = new HashMap();
        		map.put("guid", sublistMap.get("guid"));
        		map.put("planguid", sublistMap.get("planguid"));
        		map.put("plancode", sublistMap.get("plancode"));
        		map.put("month", sublistMap.get("month"));
        		map.put("amt", sublistMap.get("amt"));
        		map.put("province", province);
        		map.put("year", year);
        		importlist.add(map);
        	}
        }
//        importlist.addAll(importlist);
        Map sendVou3 = service.sendVou("1018", bankCode, province, year, verifycode, importlist);
//    	System.out.println("1018授权支付入账通知书-发送  sendVou3:" + sendVou3.size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou3), response);
	}
	//1019财政授权支付额度到账通知书-取消发送
	public void action1019(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		 /**
         * 1011授权支付凭证读取
         */
        Map m = service.login("admin", "123456");
        String verifycode = (String)m.get("verifycode");
        
        Map readVou = service.readVou("1021", bankCode, province, year, verifycode);
//    	System.out.println("1011授权支付凭证读取  readVou:"+readVou);
//    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}    	
    	List data00 = (List)readVou.get("datas");
//    	/**
//    	 * 1018财政授权支付入账通知书-发送
//    	 */
//    	m = service.login("admin", "123456");
//        verifycode = (String)m.get("verifycode");
//        List importlist = new ArrayList();
//        for(int i=0;i<data00.size();i++){
//        	Map data = (Map)data00.get(i);
//        	Map map = new HashMap();
//        	map.put("voucherguid", data.get("guid"));
//        	map.put("voucherno", data.get("guid"));
//        	map.put("guid", data.get("guid"));
//        	map.put("paydate", new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
//        	map.put("payeebankaccount", data.get("payeeacctno"));
//        	map.put("payee", data.get("payeeacctname"));
//        	map.put("payeebank", data.get("payeeacctbankname"));
//        	map.put("amt", data.get("amt"));
//        	map.put("planguid", data.get("guid"));
//        	map.put("sublist",data.get("sublist"));
//        	importlist.add(map);
//        }
//        Map sendVou3 = service.sendVou("1018", bankCode, province, year, verifycode, importlist);
//    	System.out.println("1018授权支付入账通知书-发送  sendVou3:" + sendVou3.size());
    	/**
    	 * 1019财政授权支付入账通知书-取消发送
    	 */
    	m = service.login("admin", "123456");
        verifycode = (String)m.get("verifycode");
        List cancelimportlist = new ArrayList();
        for(int i=0;i<data00.size();i++){
        	Map data = (Map)data00.get(i);
        	Map sublistMap = (Map)((List)data.get("sublist")).get(0);
        	Map map = new HashMap();
        	map.put("guid", data.get("guid"));
        	map.put("planguid", sublistMap.get("planguid"));
        	map.put("plancode", sublistMap.get("plancode"));
        	map.put("month", data.get("month"));
        	map.put("amt", data.get("amt"));
        	map.put("province", province);
        	map.put("year", year);
        	cancelimportlist.add(map);
        }
        Map cancelSendVou4 = service.cancelSendVou("1019", bankCode, province, year, verifycode, cancelimportlist);
//    	System.out.println("1019授权支付入账通知书-取消发送  cancelSendVou4:" + cancelSendVou4.size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(cancelSendVou4), response);
	}
	//1022划款凭证申请发送
	public void action1022_01(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map readVou = service.readVou("1001", bankCode, province, year, getverifycode());
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
//    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	List data00 = (List)readVou.get("datas");
    	//1022划款凭证申请发送
    	List list = new ArrayList();
    	for(int i=0;i<data00.size();i++){
			Map datas = (Map)data00.get(i);
			Map map = new HashMap();
			map.put("voucherno", datas.get("billcode"));
			map.put("guid", datas.get("guid"));
			map.put("createdate", datas.get("createdate"));
			map.put("payeebankaccount", "测试收款账号");
			map.put("payee", datas.get("payeeacctname"));
			map.put("payeebank", datas.get("payeeacctbankname"));
			map.put("amt", datas.get("amt"));
			map.put("sublist",datas.get("sublist"));
			list.add(map);
		}
    	Map sendVou = service.sendVou("1022", bankCode, province, year, getverifycode(), list);
//    	System.out.println("sendVou:" + ((List)sendVou.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	public void action1022_02(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1011授权支付凭证读取
        Map readVou = service.readVou("1011", bankCode, province, year, getverifycode());
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
//    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	List data00 = (List)readVou.get("datas");
    	//1022划款凭证申请发送
    	List list = new ArrayList();
    	for(int i=0;i<data00.size();i++){
			Map datas = (Map)data00.get(i);
			Map map = new HashMap();
			map.put("voucherno", datas.get("billcode"));
			map.put("guid", datas.get("guid"));
			map.put("createdate", datas.get("createdate"));
			map.put("payeebankaccount", "测试收款账号");
			map.put("payee", datas.get("payeeacctname"));
			map.put("payeebank", datas.get("payeeacctbankname"));
			map.put("amt", datas.get("amt"));
			map.put("sublist",datas.get("sublist"));
			list.add(map);
		}
    	Map sendVou = service.sendVou("1022", bankCode, province, year, getverifycode(), list);
//    	System.out.println("sendVou:" + ((List)sendVou.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	
	public void action1022_03(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1107公务卡支付凭证读取
        Map readVou = service.readVou("1107", bankCode, province, year, getverifycode());
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
//    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	List data00 = (List)readVou.get("datas");
    	//1022划款凭证申请发送
    	List list = new ArrayList();
    	for(int i=0;i<data00.size();i++){
			Map datas = (Map)data00.get(i);
			Map map = new HashMap();
			map.put("voucherno", datas.get("billcode"));
			map.put("guid", datas.get("guid"));
			map.put("createdate", datas.get("createdate"));
			map.put("payeebankaccount", datas.get("payeeacctno"));
			map.put("payee", datas.get("payeeacctname"));
			map.put("payeebank", datas.get("payeeacctbankname"));
			map.put("amt", datas.get("amt"));
			map.put("sublist",datas.get("sublist"));
			list.add(map);
		}
    	Map sendVou = service.sendVou("1022", bankCode, province, year, getverifycode(), list);
//    	System.out.println("sendVou:" + ((List)sendVou.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	//1023划款凭证申请取消发送
	public void action1023_01(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map readVou = service.readVou("1001", bankCode, province, year, getverifycode());
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
//    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	List data00 = (List)readVou.get("datas");
    	//1023划款凭证申请取消发送
    	List list = new ArrayList();
    	for(int i=0;i<data00.size();i++){
			Map datas = (Map)data00.get(i);
			Map map = new HashMap();
			map.put("voucherno", datas.get("billcode"));
			map.put("guid", datas.get("guid"));
			map.put("createdate", datas.get("createdate"));
			map.put("payeebankaccount", "测试收款账号");
			map.put("payee", datas.get("payeeacctname"));
			map.put("payeebank", datas.get("payeeacctbankname"));
			map.put("amt", datas.get("amt"));
			map.put("sublist",datas.get("sublist"));
			list.add(map);
		}
    	Map cancelsendVou = service.cancelSendVou("1023", bankCode, province, year, getverifycode(), list);
//    	System.out.println("cancelsendVou:" + ((List)cancelsendVou.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(cancelsendVou), response);
	}
	
	//1023划款凭证申请取消发送
		public void action1023_02(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
			//1011授权支付凭证读取
	        Map readVou = service.readVou("1011", bankCode, province, year, getverifycode());
//	    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
//	    	String result = (String)readVou.get("result");
//	    	if("ERROR".equals(result)){
//	    		System.out.println("ERROR：");
//	    		System.out.println("errorno:" + readVou.get("errorno"));
//	    		System.out.println("errormsg:" + readVou.get("errormsg"));
//	    		return;
//	    	}
//	    	if("SUCCESS".equals(result)){
//	    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//	    	}
	    	List data00 = (List)readVou.get("datas");
	    	//1023划款凭证申请取消发送
	    	List list = new ArrayList();
	    	for(int i=0;i<data00.size();i++){
				Map datas = (Map)data00.get(i);
				Map map = new HashMap();
				map.put("voucherno", datas.get("billcode"));
				map.put("guid", datas.get("guid"));
				map.put("createdate", datas.get("createdate"));
				map.put("payeebankaccount", "测试收款账号");
				map.put("payee", datas.get("payeeacctname"));
				map.put("payeebank", datas.get("payeeacctbankname"));
				map.put("amt", datas.get("amt"));
				map.put("sublist",datas.get("sublist"));
				list.add(map);
			}
	    	Map cancelsendVou = service.cancelSendVou("1023", bankCode, province, year, getverifycode(), list);
//	    	System.out.println("cancelsendVou:" + ((List)cancelsendVou.get("datas")).size());
	    	BisUtil.ajaxPrint(BisUtil.objectToJson(cancelsendVou), response);
		}
		
		//1023划款凭证申请取消发送
		public void action1023_03(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
			//1107公务卡支付凭证读取
	        Map readVou = service.readVou("1107", bankCode, province, year, getverifycode());
//	    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
//	    	String result = (String)readVou.get("result");
//	    	if("ERROR".equals(result)){
//	    		System.out.println("ERROR：");
//	    		System.out.println("errorno:" + readVou.get("errorno"));
//	    		System.out.println("errormsg:" + readVou.get("errormsg"));
//	    		return;
//	    	}
//	    	if("SUCCESS".equals(result)){
//	    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//	    	}
	    	List data00 = (List)readVou.get("datas");
	    	//1023划款凭证申请取消发送
	    	List list = new ArrayList();
	    	for(int i=0;i<data00.size();i++){
				Map datas = (Map)data00.get(i);
				Map map = new HashMap();
				map.put("voucherno", datas.get("billcode"));
				map.put("guid", datas.get("guid"));
				map.put("createdate", datas.get("createdate"));
				map.put("payeebankaccount", datas.get("payeeacctno"));
				map.put("payee", datas.get("payeeacctname"));
				map.put("payeebank", datas.get("payeeacctbankname"));
				map.put("amt", datas.get("amt"));
				map.put("sublist",datas.get("sublist"));
				list.add(map);
			}
	    	Map cancelsendVou = service.cancelSendVou("1023", bankCode, province, year, getverifycode(), list);
//	    	System.out.println("cancelsendVou:" + ((List)cancelsendVou.get("datas")).size());
	    	BisUtil.ajaxPrint(BisUtil.objectToJson(cancelsendVou), response);
		}
	//1025支付日报-发送
	public void action1025(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map readVou = service.readVou("1011", bankCode, province, year, getverifycode());
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	List data00 = (List)readVou.get("datas");
//    	data00.addAll(data00);
    	//1022支付日报-发送
    	List list = new ArrayList();
    	for(int i=0;i<data00.size();i++){
			Map datas = (Map)data00.get(i);
			Map map = new HashMap();
			map.put("voucherno", datas.get("billcode"));
			map.put("guid", datas.get("guid"));
			map.put("payedate", BisUtil.getCreateDate10(BisUtil.getCreateDate()));
			map.put("payeebankaccount", datas.get("payeeacctno"));
			map.put("payee", datas.get("payeeacctname"));
			map.put("payeebank", datas.get("payeeacctbankname"));
			map.put("amt", datas.get("amt"));
			map.put("sublist",datas.get("sublist"));
			list.add(map);
		}
    	Map sendVou = service.sendVou("1025", bankCode, province, year, getverifycode(), list);
//    	System.out.println("sendVou:" + ((List)sendVou.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	//1026支付日报-取消发送
	public void action1026(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1011授权支付凭证读取
        Map readVou = service.readVou("1011", bankCode, province, year, getverifycode());
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
//    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	List data00 = (List)readVou.get("datas");
    	//1026支付日报-取消发送
    	List list = new ArrayList();
    	for(int i=0;i<data00.size();i++){
			Map datas = (Map)data00.get(i);
			Map map = new HashMap();
			map.put("voucherno", datas.get("billcode"));
			map.put("guid", datas.get("guid"));
			map.put("createdate", datas.get("createdate"));
			map.put("payeebankaccount", datas.get("payeeacctno"));
			map.put("payee", datas.get("payeeacctname"));
			map.put("payeebank", datas.get("payeeacctbankname"));
			map.put("amt", datas.get("amt"));
			map.put("sublist",datas.get("sublist"));
			list.add(map);
		}
    	Map cancelsendVou = service.cancelSendVou("1026", bankCode, province, year, getverifycode(), list);
//    	System.out.println("cancelsendVou:" + ((List)cancelsendVou.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(cancelsendVou), response);
	}
	//1101新增公务卡信息-发送
	public void action1101(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		List listmap = new ArrayList();
		for(int i=0;i<7;i++){
			Map map = new HashMap();
			map.put("cardno", (6282220000201620L+i)+"");
			map.put("cardname", "张三  "+i);
			map.put("agencycode", (507001L+i)+"");
			map.put("agencyname", "自治区环境保护厅本级");
			map.put("gatheringbankacctname", "待划转信用卡公务卡清算资金过渡户1");
			map.put("gatheringbankname", "待划转信用卡公务卡清算资金过渡户2");
			map.put("gatheringbankacctcode", (59010133150050000L+i)+"");
			map.put("idnumber", (152104198201252000L+i)+"");
			map.put("digest", "公务还款");
			map.put("bankcode", "001");
			map.put("bankname", "上海浦发银行呼和浩特市分行");
			map.put("createdate", "2016/9/26");
			map.put("startdate", "2016/9/26");
			map.put("enddate", "2099/9/27");
			listmap.add(map);
		}
		Map sendVou = service.sendVou("1101", bankCode, province, year, getverifycode(), listmap);
//		System.out.println("sendVou:" + ((List)sendVou.get("datas")).size());
		BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	//1102新增公务卡信息-取消发送
	public void action1102(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		List listmap = new ArrayList();
		for(int i=0;i<7;i++){
			Map map = new HashMap();
			map.put("cardno", (6282220000201620L+i)+"");
			map.put("cardname", "张三  "+i);
			map.put("agencycode", (507001L+i)+"");
			map.put("agencyname", "自治区环境保护厅本级");
			map.put("gatheringbankacctname", "待划转信用卡公务卡清算资金过渡户1");
			map.put("gatheringbankname", "待划转信用卡公务卡清算资金过渡户2");
			map.put("gatheringbankacctcode", (59010133150050000L+i)+"");
			map.put("idnumber", (152104198201252000L+i)+"");
			map.put("digest", "公务还款");
			map.put("bankcode", "001");
			map.put("bankname", "上海浦发银行呼和浩特市分行");
			map.put("createdate", "2016/9/26");
			map.put("startdate", "2016/9/26");
			map.put("enddate", "2099/9/27");
			listmap.add(map);
		}
		Map cancelsendVou = service.cancelSendVou("1102", bankCode, province, year, getverifycode(), listmap);
//		System.out.println("cancelsendVou:" + ((List)cancelsendVou.get("datas")).size());
		BisUtil.ajaxPrint(BisUtil.objectToJson(cancelsendVou), response);
	}
	//1103公务卡状态变更-发送
	public void action1103(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		List listmap = new ArrayList();
		for(int i=0;i<4;i++){
			Map map = new HashMap();
			map.put("cardno", (6282220000201620L+i)+"");
			map.put("status", "1");
			map.put("cardname", "张三  "+i);
			map.put("agencycode", (507001L+i)+"");
			map.put("agencyname", "自治区环境保护厅本级");
			map.put("reasoncode", "0000");
			map.put("reasonname", "测试启用");
			map.put("remark", "启用");
			listmap.add(map);
		}
		Map sendVou = service.sendVou("1103", bankCode, province, year, getverifycode(), listmap);
//		System.out.println("sendVou:" + ((List)sendVou.get("datas")).size());
		BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	//1104公务卡状态变更-取消发送
	public void action1104(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		List listmap = new ArrayList();
		for(int i=0;i<4;i++){
			Map map = new HashMap();
			map.put("cardno", (6282220000201620L+i)+"");
			map.put("status", "1");
			map.put("cardname", "张三  "+i);
			map.put("agencycode", (507001L+i)+"");
			map.put("agencyname", "自治区环境保护厅本级");
			map.put("reasoncode", "0000");
			map.put("reasonname", "测试启用");
			map.put("remark", "启用");
			listmap.add(map);
		}
		Map cancelsendVou = service.cancelSendVou("1104", bankCode, province, year, getverifycode(), listmap);
//		System.out.println("cancelsendVou:" + ((List)cancelsendVou.get("datas")).size());
		BisUtil.ajaxPrint(BisUtil.objectToJson(cancelsendVou), response);
	}
	//1105公务卡消费信息下载-发送
	public void action1105(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		List listmap = new ArrayList();
		for(int i=0;i<7;i++){
			Map map = new HashMap();
			map.put("guid", (10000+i)+"");
			map.put("cardno", (6282220000201620L+i)+"");
			map.put("busdate ", "20160926");
			map.put("busmoney", (111*(i+1))+"");
			map.put("cardname", "张三  "+i);
			map.put("merchantname", "真实惠饭店");
			map.put("agencycode", (507001L+i)+"");
			map.put("gatheringbankacctname", "待划转信用卡公务卡清算资金过渡户1");
			map.put("gatheringbankname", "待划转信用卡公务卡清算资金过渡户2");
			map.put("gatheringbankacctcode", (59010133150050000L+i)+"");
			map.put("pergatherbankname", "个人还款账户银行名称");
			map.put("pergatherbankcode", (7282221111201620L+i)+"");
			map.put("pergatherbankacctname", "个人还款账户名称");
			listmap.add(map);
		}
//		listmap.addAll(listmap);
		Map sendVou = service.sendVou("1105", bankCode, province, year, getverifycode(), listmap);
//		System.out.println("sendVou:" + ((List)sendVou.get("datas")).size());
		BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	//1106公务卡消费信息下载-取消发送
	public void action1106(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		List listmap = new ArrayList();
		for(int i=0;i<7;i++){
			Map map = new HashMap();
			map.put("guid", (10000+i)+"");
			map.put("cardno", (6282220000201620L+i)+"");
			map.put("busdate ", "20160926");
			map.put("busmoney", (111*(i+1))+"");
			map.put("cardname", "张三  "+i);
			map.put("merchantname", "真实惠饭店");
			map.put("agencycode", (507001L+i)+"");
			listmap.add(map);
		}
		Map cancelsendVou = service.cancelSendVou("1106", bankCode, province, year, getverifycode(), listmap);
//		System.out.println("cancelsendVou:" + ((List)cancelsendVou.get("datas")).size());
		BisUtil.ajaxPrint(BisUtil.objectToJson(cancelsendVou), response);
	}
	//1108公务卡退款通知单-发送
	public void action1108(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1107公务卡支付凭证读取
        Map readVou = service.readVou("1107", bankCode, province, year, getverifycode());
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
//    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	List data00 = (List)readVou.get("datas");
    	//1108公务卡退款通知单-发送
    	List list = new ArrayList();
    	for(int i=0;i<data00.size();i++){
			Map datas = (Map)data00.get(i);
			Map map = new HashMap();
			map.put("billid", datas.get("guid"));
			map.put("guid", datas.get("guid"));
			map.put("voucherno", datas.get("billcode"));
			map.put("paydate", "2016-12-01");
			map.put("amt", datas.get("amt"));
			map.put("sublist",datas.get("sublist"));
			list.add(map);
		}
    	list.addAll(list);
    	Map sendVou = service.sendVou("1108", bankCode, province, year, getverifycode(), list);
//    	System.out.println("sendVou:" + ((List)sendVou.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	//1109公务卡退款通知单-取消发送
	public void action1109(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1107公务卡支付凭证读取
        Map readVou = service.readVou("1107", bankCode, province, year, getverifycode());
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
//    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	List data00 = (List)readVou.get("datas");
    	//1109公务卡退款通知单-取消发送
    	List list = new ArrayList();
    	for(int i=0;i<data00.size();i++){
			Map datas = (Map)data00.get(i);
			Map map = new HashMap();
			map.put("billid", datas.get("guid"));
			map.put("guid", datas.get("guid"));
			map.put("voucherno", datas.get("billcode"));
			map.put("paydate", "2016-12-01");
			map.put("amt", datas.get("amt"));
			List sublist = new ArrayList();
			for(int j=0;i<((List)datas.get("sublist")).size();i++){
				Map submap =  new HashMap();
				submap.put("guid", ((Map)((List)datas.get("sublist")).get(j)).get("guid"));
				submap.put("mainguid", datas.get("guid"));
				submap.put("voucherno", datas.get("billcode"));
				submap.put("cardno", "100000000000001");
				submap.put("cardname", "测试");
				submap.put("posno", "消费流水号");
				submap.put("amt", datas.get("amt"));
				sublist.add(submap);
			}
			map.put("sublist",sublist);
			list.add(map);
		}
    	Map cancelsendVou = service.cancelSendVou("1109", bankCode, province, year, getverifycode(), list);
		//System.out.println("cancelsendVou:" + ((List)cancelsendVou.get("datas")).size());
		BisUtil.ajaxPrint(BisUtil.objectToJson(cancelsendVou), response);
	}
	//1110上卡日期下载-发送
	public void action1110(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map readVou = service.readVou("1001", bankCode, province, year, getverifycode());
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
//    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	List data00 = (List)readVou.get("datas");
    	//1110上卡日期下载-发送
    	List list = new ArrayList();
    	for(int i=0;i<data00.size();i++){
			Map datas = (Map)data00.get(i);
			Map map = new HashMap();
			map.put("guid", datas.get("guid"));
			map.put("voucherno", datas.get("billcode"));
			map.put("agencycode", "1234567");
			map.put("returndate", "1000-10-10");
			map.put("privateaccount", "1000000");
			map.put("privateaccountname", "测试");
			map.put("cardno", "100000000000001");
			list.add(map);
    	}
//    	list.addAll(list);
    	Map sendVou = service.sendVou("1110", bankCode, province, year, getverifycode(), list);
//    	System.out.println("sendVou:" + ((List)sendVou.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(sendVou), response);
	}
	//1111上卡日期下载-取消发送
	public void action1111(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		//1001直接支付凭证读取
        Map readVou = service.readVou("1001", bankCode, province, year, getverifycode());
//    	System.out.println("1001直接支付凭证读取  readVou:"+((List)readVou.get("datas")).size());
//    	String result = (String)readVou.get("result");
//    	if("ERROR".equals(result)){
//    		System.out.println("ERROR：");
//    		System.out.println("errorno:" + readVou.get("errorno"));
//    		System.out.println("errormsg:" + readVou.get("errormsg"));
//    		return;
//    	}
//    	if("SUCCESS".equals(result)){
//    		System.out.println("iscomplete:" + readVou.get("iscomplete"));
//    	}
    	List data00 = (List)readVou.get("datas");
    	//1110上卡日期下载-发送
    	List list = new ArrayList();
    	for(int i=0;i<data00.size();i++){
			Map datas = (Map)data00.get(i);
			Map map = new HashMap();
			map.put("guid", datas.get("guid"));
			map.put("voucherno", datas.get("billcode"));
			map.put("agencycode", "1234567");
			map.put("returndate", "1000-10-10");
			map.put("privateaccount", "1000000");
			map.put("privateaccountname", "测试");
			map.put("cardno", "100000000000001");
			list.add(map);
    	}
    	Map cancelsendVou = service.cancelSendVou("1111", bankCode, province, year, getverifycode(), list);
//    	System.out.println("cancelsendVou:" + ((List)cancelsendVou.get("datas")).size());
    	BisUtil.ajaxPrint(BisUtil.objectToJson(cancelsendVou), response);
	}
	//1201查询基础数据版本
	public void action1201(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response) throws Exception{
		List elementcodelist = new ArrayList();
		String sql = "select t.elementcode from bis_t_elements t where t.year='"+year+"' and t.status='1'";
		CommonDAO commonDao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
		List list = commonDao.queryForList(sql);
		for (Object obj : list) {
			elementcodelist.add(((Map)obj).get("elementcode"));
		}
		Map version = service.queryElelementVersion("1201", bankCode, province, year, getverifycode(), elementcodelist );
		BisUtil.ajaxPrint(BisUtil.objectToJson(version), response);
	}
	//1202下载基础数据
	public void action1202(Fasp2PayBankService service,String bankCode,String province,String year,HttpServletResponse response,String ele,String seq) throws Exception{
//		HessianEleData h = new HessianEleData();
//		h.getEleData();
		Map queryElelement = service.queryElelement("1202", bankCode, province, year, getverifycode(), ele, seq);
		BisUtil.ajaxPrint(BisUtil.objectToJson(queryElelement), response);
	}
}






