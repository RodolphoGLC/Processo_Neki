package neki.proj.skills.dto;

import java.util.HashSet;
import java.util.Set;

public class UserDTO {
	private Integer id;
	private String username;
	private Set<String> roles = new HashSet<>();
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
}