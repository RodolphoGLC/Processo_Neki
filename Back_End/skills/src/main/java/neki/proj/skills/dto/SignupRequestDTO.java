package neki.proj.skills.dto;

import java.util.Set;

import jakarta.validation.constraints.*;

public class SignupRequestDTO {
	@Size(min = 3, message = "Tamanho incorreto. O valor deve ser maior que 3 carac.")
	private String username;

	private Set<String> role;

	@Size(min = 6, max = 40)
	private String password;

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

	public Set<String> getRole() {
		return this.role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}
}