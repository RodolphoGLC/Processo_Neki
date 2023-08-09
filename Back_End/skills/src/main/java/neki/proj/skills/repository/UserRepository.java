package neki.proj.skills.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import neki.proj.skills.entities.Usuario;

public interface UserRepository extends JpaRepository<Usuario, Integer> {
	
	Optional<Usuario> findByUsername(String username);

	Boolean existsByUsername(String username);
}