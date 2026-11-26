package pe.techsolutions.pyme.grasp;

import java.time.LocalDateTime;

/**
 * GRASP Pure Fabrication: Servicio de infraestructura dedicado a auditoria y registro de eventos
 * que no contamina el modelo de dominio.
 */
public class InventoryAuditLogger {
    public static void logAudit(String accion, String detalle) {
        System.out.println("[AUDITORIA GRASP " + LocalDateTime.now() + "] Accion: " + accion + " | Detalle: " + detalle);
    }
}
