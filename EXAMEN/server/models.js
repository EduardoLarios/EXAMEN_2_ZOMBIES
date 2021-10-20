class Usuario {
	constructor(id, email, password) {
		this.id = id;
		this.email = email;
		this.password = password;
	}
}

class Zombie {
	constructor(id, nombre) {
		this.id = id;
		this.nombre = nombre;
	}
}

class Estado {
	constructor(id, estado) {
		this.id = id;
		this.estado = estado;
	}
}

class ZombieEstado {
	constructor(nombre, estado, actualizado) {
		this.nombre = nombre;
		this.estado = estado;
		this.actualizado = actualizado;
	}
}

module.exports = {
	Usuario,
	Zombie,
	Estado,
	ZombieEstado
};
