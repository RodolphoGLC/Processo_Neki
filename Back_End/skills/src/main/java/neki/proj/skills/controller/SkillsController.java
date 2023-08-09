package neki.proj.skills.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import neki.proj.skills.entities.Skills;
import neki.proj.skills.entities.Usuario;
import neki.proj.skills.repository.UsuarioRepository;
import neki.proj.skills.service.SkillsService;

@RestController
@RequestMapping("/skills")
public class SkillsController {

	@Autowired
	UsuarioRepository usuarioRepository;

	@Autowired
	SkillsService skillsService;

	@GetMapping
	public ResponseEntity<List<Skills>> getAllSkillss() {
		return new ResponseEntity<>(skillsService.getAllSkillses(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Skills> getSkillsById(@PathVariable Integer id) {
		Skills skillsResponse = skillsService.getSkillsById(id);
		if (null == skillsResponse)
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		else
			return new ResponseEntity<>(skillsResponse, HttpStatus.OK);
	}

	@GetMapping("/usuario/{id}")
	public ResponseEntity<List<Skills>> getSkillsByIdUsuario(@PathVariable Integer id) {
		List<Skills> skillsResponse = skillsService.getSkillsByIdUsuario(id);
		if (null == skillsResponse)
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		else
			return new ResponseEntity<>(skillsResponse, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Skills> saveSkills(@RequestBody Skills skills){
		return new ResponseEntity<>(skillsService.saveSkills(skills), HttpStatus.CREATED);
	}

	@PostMapping("/{id}")
	public ResponseEntity<Skills> saveSkills(@RequestBody Skills skills, @PathVariable Integer id) {
		Usuario user = usuarioRepository.buscarUsuarioById(id);
		if(user != null) {
			skills.setUsuario(user);
			return new ResponseEntity<>(skillsService.saveSkills(skills), HttpStatus.CREATED);
		}
		else {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Skills> updateSkills(@RequestBody Skills skills, @PathVariable Integer id) {
		Skills verificar = skillsService.getSkillsById(id);
		if (verificar == null)
			return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
		else
			return new ResponseEntity<>(skillsService.updateSkills(skills, id), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> delSkills(@PathVariable Integer id) {
		if (skillsService.getSkillsById(id) != null) {
			Boolean resp = skillsService.deleteSkills(id);
			if (resp)
				return new ResponseEntity<>(resp, HttpStatus.OK);
			else
				return new ResponseEntity<>(resp, HttpStatus.NOT_MODIFIED);
		} else
			return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
	}
}
