package neki.proj.skills.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import neki.proj.skills.entities.Role;
import neki.proj.skills.entities.RoleEnum;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	Optional<Role> findByName(RoleEnum name);
}