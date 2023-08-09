package neki.proj.skills.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import neki.proj.skills.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
	
	@Query(value = "FROM Usuario u WHERE u.id = :id")
	public Usuario buscarUsuarioById(@Param("id") Integer id);
}
