import java.util.List;
import java.util.Scanner;

import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.Status;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

public class DiseaseDetection {

	public static void main(String[] args) throws TwitterException{
		
		// Setting up the Twitter application with authentication keys
		ConfigurationBuilder cf = new ConfigurationBuilder();
		
		cf.setDebugEnabled(true)
				.setOAuthConsumerKey("9VUQs9mJvWm0IrsYItq144lqB")
				.setOAuthConsumerSecret("tYBDQFtQ1RBQ2SCC8MYA84TAKySsmr4mQ1xmDteLPMv5ygIG6n")
				.setOAuthAccessToken("125165204-V9YfRLdwQQMuw4rfxwWUR8m1ToQFofeLT8HOEMsN")
				.setOAuthAccessTokenSecret("rXe4ac7dTzhhipS3MZmWv6aK15cKSIgEyWuSKymjokCP8");
		
		TwitterFactory tf = new TwitterFactory(cf.build());
		twitter4j.Twitter twitter = tf.getInstance();
		
		// Take input keyword(s) from the user
		Scanner input = new Scanner(System.in);
		System.out.println("Enter the keyword(s) you would like to search: ");
		String keyword = input.nextLine();
		
		// Print the status based on the query
		Query query = new Query(keyword);
	    QueryResult result = twitter.search(query);
	    for (Status status : result.getTweets()) {
	        System.out.println("@" + status.getUser().getScreenName() + " - " + status.getText());
	    }
	    
	    // Take the user name and print the time line
	    System.out.println("Enter the user to see the timeline: ");
	    String user = input.nextLine();
	    List<Status> statuses;
        statuses = twitter.getUserTimeline(user);
        System.out.println("Showing @" + user + "'s user timeline.");
        for (Status status : statuses) {
            System.out.println("@" + status.getUser().getScreenName() + " - " + status.getText() + " - " + status.getCreatedAt());
        }
	}
}
