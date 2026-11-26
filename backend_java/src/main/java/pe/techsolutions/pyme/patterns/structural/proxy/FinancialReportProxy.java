package pe.techsolutions.pyme.patterns.structural.proxy;

import pe.techsolutions.pyme.model.FinancialReportData;
import pe.techsolutions.pyme.model.Role;
import pe.techsolutions.pyme.model.User;

import java.util.HashMap;
import java.util.Map;

/**
 * Proxy Inteligente (RF3, RF4):
 * 1. Control de Acceso RBAC (Solo GERENTE o CONTADOR tienen acceso completo).
 * 2. Carga Perezosa (Lazy Loading): RealFinancialReportService solo se instancia cuando se autoriza la peticion.
 * 3. Cache en memoria con clave (month-year) y expiracion de 300 segundos (TTL).
 */
public class FinancialReportProxy implements FinancialReportService {

    private RealFinancialReportService realService;
    private final Map<String, CacheEntry> cache = new HashMap<>();
    private static final long TTL_MILLIS = 300_000L; // 300 segundos = 5 minutos

    private static class CacheEntry {
        final FinancialReportData data;
        final long timestamp;

        CacheEntry(FinancialReportData data) {
            this.data = data;
            this.timestamp = System.currentTimeMillis();
        }

        boolean isValid() {
            return (System.currentTimeMillis() - timestamp) < TTL_MILLIS;
        }
    }

    @Override
    public FinancialReportData generateReport(User user, int month, int year) {
        // 1. Validacion de seguridad y control de acceso (RF3, RF4)
        if (user == null || !user.isActivo()) {
            throw new SecurityException("Acceso denegado: Usuario no autenticado o inactivo.");
        }

        if (user.getRole() != Role.GERENTE && user.getRole() != Role.CONTADOR) {
            throw new SecurityException("Acceso denegado (RF4): Solo usuarios con rol GERENTE o CONTADOR pueden acceder a los reportes financieros confidenciales. Rol actual: " + user.getRole());
        }

        String cacheKey = month + "-" + year;

        // 2. Verificacion de cache en memoria (Eficiencia)
        CacheEntry entry = cache.get(cacheKey);
        if (entry != null && entry.isValid()) {
            System.out.println("[FinancialReportProxy CACHE HIT] Retornando reporte desde cache para " + cacheKey);
            return entry.data;
        }

        // 3. Lazy Loading del servicio real
        if (realService == null) {
            System.out.println("[FinancialReportProxy LAZY LOAD] Instanciando RealFinancialReportService por primera vez...");
            realService = new RealFinancialReportService();
        }

        // 4. Delegacion y almacenamiento en cache
        FinancialReportData report = realService.generateReport(user, month, year);
        cache.put(cacheKey, new CacheEntry(report));
        return report;
    }

    public void clearCache() {
        cache.clear();
        System.out.println("[FinancialReportProxy] Cache invalidada.");
    }

    public int getCacheSize() {
        return cache.size();
    }
}
