package neki.proj.skills.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neki.proj.skills.entities.Usuario;
import neki.proj.skills.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	public Usuario findByUsername(String username) {
		return userRepository.findByUsername(username).orElse(null);
	}
	
	public Usuario findById(Integer id) {
		return userRepository.findById(id).orElse(null);
	}
}
