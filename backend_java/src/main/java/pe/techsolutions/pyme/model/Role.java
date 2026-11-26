package pe.techsolutions.pyme.model;

public enum Role {
    ADMINISTRADOR("Administrador de Sistemas"),
    GERENTE("Gerente General"),
    CONTADOR("Contador Principal"),
    COMPRAS("Especialista de Compras"),
    VENDEDOR("Operador de Ventas");

    private final String descripcion;

    Role(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
