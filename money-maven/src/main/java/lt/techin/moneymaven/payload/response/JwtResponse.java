package lt.techin.moneymaven.payload.response;

import java.util.List;

public class JwtResponse {
	  private String token;
	  private String type = "Bearer";
	  private Integer userId;
	  private String username;
	  private List<String> authorities;

	  public JwtResponse(String accessToken, Integer userId, String username, List<String> authorities) {
	    this.token = accessToken;
	    this.userId = userId;
	    this.username = username;
	    this.authorities = authorities;
	  }

	  public String getAccessToken() {
	    return token;
	  }

	  public void setAccessToken(String accessToken) {
	    this.token = accessToken;
	  }

	  public String getTokenType() {
	    return type;
	  }

	  public void setTokenType(String tokenType) {
	    this.type = tokenType;
	  }

	  public Integer getUserId() {
	    return userId;
	  }

	  public void setUserId(Integer userId) {
	    this.userId = userId;
	  }

	  public String getUsername() {
	    return username;
	  }

	  public void setUsername(String username) {
	    this.username = username;
	  }
	  
	  public List<String> getAuthorities() {
		    return authorities;
		  }
	}
