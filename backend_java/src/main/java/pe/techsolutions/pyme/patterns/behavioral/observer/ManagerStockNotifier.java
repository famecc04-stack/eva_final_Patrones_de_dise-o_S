package pe.techsolutions.pyme.patterns.behavioral.observer;

import pe.techsolutions.pyme.model.Product;

import java.util.ArrayList;
import java.util.List;

/**
 * Concrete Observer 1: Notificaciones a Gerente General (RF5)
 */
public class ManagerStockNotifier implements StockObserver {
    private final List<String> receivedAlerts = new ArrayList<>();

    @Override
    public void onStockLow(Product product, int currentStock, int minStock) {
        String msg = "[ALERTA GERENCIAL] El producto " + product.getNombre() + " (SKU: " + product.getSku()
                + ") ha alcanzado stock critico: " + currentStock + " unidades (Minimo: " + minStock + "). Posible impacto en facturacion.";
        receivedAlerts.add(msg);
        System.out.println(msg);
    }

    @Override
    public String getObserverName() { return "GERENTE_NOTIFIER"; }

    public List<String> getReceivedAlerts() { return receivedAlerts; }
}
