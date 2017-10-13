package gov.mof.fasp2.bis.serviceaddress;

public class ServiceAddressBO {
	private ServiceAddressDAO serviceAddressDAO;

	public ServiceAddressDAO getServiceAddressDAO() {
		return serviceAddressDAO;
	}

	public void setServiceAddressDAO(ServiceAddressDAO serviceAddressDAO) {
		this.serviceAddressDAO = serviceAddressDAO;
	}
	public String updateData(String ip,String port){
		serviceAddressDAO.updateDatas(ip, port);
		return "success";
	}
}
