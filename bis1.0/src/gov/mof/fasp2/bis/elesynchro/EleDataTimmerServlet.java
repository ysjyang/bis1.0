package gov.mof.fasp2.bis.elesynchro;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.factory.ServiceFactory;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class EleDataTimmerServlet extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override  
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)throws ServletException{  
		doPost(req,resp);
	}  
	@Override  
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)throws ServletException{  
		timeTask();
	}  
	
	public void init() throws ServletException {  
		System.out.println("进入servlet代码");
		Calendar calendar = Calendar.getInstance();
		CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
		String hour = "";
		String minute = "";
		String second = "";
		String delaytime = "";
		String sql = "select hour,minute,second,delaytime from bis_t_eledatatimer";
		List list = dao.queryForList(sql);
		if(list.size()!=0){
			Map map = (Map) list.get(0);
			hour = (String) map.get("hour");
			minute = (String) map.get("minute");
			second = (String) map.get("second");		
			delaytime = (String) map.get("delaytime");
					
			calendar.set(Calendar.HOUR_OF_DAY, Integer.valueOf(hour)); 
			calendar.set(Calendar.MINUTE, Integer.valueOf(minute));       
			calendar.set(Calendar.SECOND, Integer.valueOf(second));       
			Date time = calendar.getTime();        
			Timer timer = new Timer();
			timer.scheduleAtFixedRate(new TimerTask() {              
				public void run() {                  
					System.out.println("-------设定要指定任务--------");
					//添加hessian的读取方法
					HessianEleData hessianEleData = new HessianEleData();
					hessianEleData.getEleData();
				}          
			}, time, Long.parseLong(delaytime));// 这里设定将延时每天固定执行  
		}
	}
	
	public void timeTask(){
		
	}
	
}
