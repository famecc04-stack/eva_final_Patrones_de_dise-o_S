package pe.techsolutions.pyme.model;

public class User {
    private String id;
    private String nombre;
    private String email;
    private Role role;
    private boolean activo;

    public User(String id, String nombre, String email, Role role, boolean activo) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.role = role;
        this.activo = activo;
    }

    public String getId() { return id; }
    public String getNombre() { return nombre; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public boolean isActivo() { return activo; }
}
