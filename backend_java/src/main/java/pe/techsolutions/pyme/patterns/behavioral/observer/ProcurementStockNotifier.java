package pe.techsolutions.pyme.patterns.behavioral.observer;

import pe.techsolutions.pyme.model.Product;

import java.util.ArrayList;
import java.util.List;

/**
 * Concrete Observer 2: Notificaciones al departamento de Compras (RF5)
 */
public class ProcurementStockNotifier implements StockObserver {
    private final List<String> generatedPurchaseRequests = new ArrayList<>();

    @Override
    public void onStockLow(Product product, int currentStock, int minStock) {
        int deficit = (minStock * 2) - currentStock;
        String request = "[COMPRAS ORDEN DE REPOSICION] Generada Solicitud de Compra para producto: "
                + product.getNombre() + ". Cantidad sugerida a ordenar: " + deficit + " unidades.";
        generatedPurchaseRequests.add(request);
        System.out.println(request);
    }

    @Override
    public String getObserverName() { return "COMPRAS_NOTIFIER"; }

    public List<String> getGeneratedPurchaseRequests() { return generatedPurchaseRequests; }
}
