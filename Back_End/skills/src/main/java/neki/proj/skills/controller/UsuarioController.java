package neki.proj.skills.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import neki.proj.skills.entities.Usuario;
import neki.proj.skills.repository.UserRepository;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/{id}")
	public ResponseEntity<Usuario> getUser(@PathVariable Integer id){
		Usuario usuarioResponse = userRepository.findById(id).orElse(null);
		if (null == usuarioResponse)
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		else
			return new ResponseEntity<>(usuarioResponse, HttpStatus.OK);
	}
}
