package lt.techin.moneymaven.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    
    private boolean isAdmin;
    
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
   public boolean getIsAdmin() {
	   return isAdmin;
   }
   
   public void setIsAdmin(boolean isAdmin) {
	   this.isAdmin = isAdmin;
   }
}

