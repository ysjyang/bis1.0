package gov.mof.fasp2.bis.test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.commons.io.IOUtils;

public class FileTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		File file = new File("C:/Users/pc/Desktop/代码效率.txt");
		String fileStr = new String();
		String newfile ="";
		try {
			fileStr = IOUtils.toString(new FileInputStream(file),"GBK");
			System.out.println(fileStr);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
