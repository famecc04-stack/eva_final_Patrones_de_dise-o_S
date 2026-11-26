package pe.techsolutions.pyme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * TechSolutions S.A. - Plataforma de Gestion Empresarial para PYMES
 * Curso: Patrones de Diseno de Software - Zegel
 * Integrantes:
 * - Orellana del Castillo, Estefania
 * - Cadillo Cordova, Fabiola
 */
@SpringBootApplication
public class TechSolutionsApplication {
    public static void main(String[] args) {
        SpringApplication.run(TechSolutionsApplication.class, args);
        System.out.println(">>> TechSolutions S.A. Backend iniciado exitosamente.");
    }
}
