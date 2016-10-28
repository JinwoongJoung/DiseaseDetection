import java.sql.*;
import java.io.*;

public class ExportTxt {
public static void main(String[] args) throws IOException {

		try {
			FileWriter fw = new FileWriter("tweets.txt");
			PrintWriter pw = new PrintWriter(fw);

			// 1. Get a connection to database
			Connection myConn = DriverManager.getConnection("jdbc:mysql://localhost:8889/DiseaseDetection", "root", "root");

			// 2. Create a statement
			Statement myStmt = myConn.createStatement();

			// 3. Execute SQL query
			ResultSet myRs = myStmt.executeQuery("select * from tweets");

			// 4. Process the result set
			while (myRs.next()) {
				pw.println(myRs.getString("tweetId") + ": " + myRs.getString("tweet"));
			}

			pw.close();
		}
		catch (Exception exc) {
			exc.printStackTrace();
		}
	}
}
