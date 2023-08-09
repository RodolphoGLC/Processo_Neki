package neki.proj.skills.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import neki.proj.skills.entities.Skills;

public interface SkillsRepository extends JpaRepository<Skills, Integer> {

	@Query(value = "FROM Skills s WHERE s.usuario.id = :id")
	public List<Skills> buscarSkillsUsuario(@Param("id") Integer id);
}
