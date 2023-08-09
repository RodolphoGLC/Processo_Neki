package neki.proj.skills.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import neki.proj.skills.entities.Skills;
import neki.proj.skills.entities.Usuario;
import neki.proj.skills.repository.SkillsRepository;
import neki.proj.skills.repository.UserRepository;

@Service
public class SkillsService {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	SkillsRepository skillsRepository;
	
	public List<Skills> getAllSkillses() {
		return skillsRepository.findAll();
	}
	
	public Skills getSkillsById(Integer id) {
		return skillsRepository.findById(id).orElse(null);
	}
	
	public List<Skills> getSkillsByIdUsuario(Integer id) {
		return skillsRepository.buscarSkillsUsuario(id);
	}
	
	public Skills saveSkills(Skills skills) {
		return skillsRepository.save(skills);
	}
	
	public Skills saveSkillsUser(Skills skills, Integer id) {
		
		Usuario user = userRepository.findById(id).orElse(null);
		
		if(user != null) {
			skills.setUsuario(user);
			return skillsRepository.save(skills);
		}
		
		else {
			return null;
		}
	}
	
	public Skills updateSkills(Skills skills, Integer id) {
		return skillsRepository.save(skills);
	}
	
	public boolean deleteSkills(Integer id) {
		skillsRepository.deleteById(id);
		Skills skillsDeletado = skillsRepository.findById(id).orElse(null);
		if (null == skillsDeletado) {
			return true;
		} else {
			return false;
		}
	}
}

