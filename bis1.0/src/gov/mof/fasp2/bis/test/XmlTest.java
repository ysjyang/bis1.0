package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.bustype.IFasp2PayBankService;

import java.util.Map;

import com.caucho.burlap.client.BurlapProxyFactory;

public class XmlTest {
	public static void main(String[] args) {

		try{  
			//服务地址
			java.net.URL url = new java.net.URL("http://127.0.0.1:7001/remoting/service/bankservice"); 
			BurlapProxyFactory factory = new BurlapProxyFactory();
			IFasp2PayBankService service = (IFasp2PayBankService) factory
					.create(IFasp2PayBankService.class, "http://127.0.0.1:7001/remoting/service/bankservice");

			Map m = service.login("admin", "123456");
			String ver = (String) m.get("verifycode");
			//请求报文//</map></list></burlap:call>
			String XMLmessage = "<burlap:call><method>sendVou</method><string>1101</string><string>bank</string><string>150000</string><string>2017</string><string>"+ver+"</string><list><type></type><length>1</length><map><type></type><string>cardname</string><string>11</string><string>bankname</string><string>11</string><string>createdate</string><string>11</string><string>idnumber</string><string>11</string><string>digest</string><string>11</string><string>gatheringbankacctname</string><string>11</string><string>gatheringbankacctcode</string><string>11</string><string>startdate</string><string>11</string><string>bankcode</string><string>11</string><string>gatheringbankname</string><string>11</string><string>agencyname</string><string>11</string><string>cardno</string><string>11</string><string>enddate</string><string>11</string><string>agencycode</string><string>11</string></map></list></burlap:call>";
			
			java.net.URLConnection urlConnection = url.openConnection();  
            urlConnection.setDoOutput(true);  
            java.io.OutputStreamWriter out = new java.io.OutputStreamWriter(urlConnection.getOutputStream());  
            out.write(XMLmessage);  
            out.flush();  
            out.close();  
              
            java.io.InputStream inputStream = urlConnection.getInputStream();  
            String encoding = urlConnection.getContentEncoding();  
            System.out.println(encoding);
            String body = org.apache.commons.io.IOUtils.toString(inputStream, encoding);  
            System.out.println(body);  //返回数据报文
        }catch(Exception e){  
        }  
	}

}
