package gov.mof.fasp2.bis.login;

public class LoginCheckBO {
	private LoginCheckDao  loginCheckDao;

	public LoginCheckDao getLoginCheckDao() {
		return loginCheckDao;
	}

	public void setLoginCheckDao(LoginCheckDao loginCheckDao) {
		this.loginCheckDao = loginCheckDao;
	}

	public String checkUser(String username, String passwordMD5) {
		return loginCheckDao.checkUser(username, passwordMD5);
	}
}
