const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'backend_java');
const srcMain = path.join(baseDir, 'src', 'main', 'java', 'pe', 'techsolutions', 'pyme');
const srcTest = path.join(baseDir, 'src', 'test', 'java', 'pe', 'techsolutions', 'pyme');

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log('Creado: ' + path.relative(baseDir, filePath));
}

// ==========================================================
// 1. PATRÓN ADAPTER (RF1, RF2)
// ==========================================================
writeFile(path.join(srcMain, 'patterns', 'structural', 'adapter', 'PaymentRequest.java'), `package pe.techsolutions.pyme.patterns.structural.adapter;

import java.math.BigDecimal;

public class PaymentRequest {
    private String codigoPedido;
    private BigDecimal monto;
    private String moneda; // PEN o USD
    private String clienteEmail;
    private String telefonoCelular; // Para Yape / Plin

    public PaymentRequest(String codigoPedido, BigDecimal monto, String moneda, String clienteEmail, String telefonoCelular) {
        this.codigoPedido = codigoPedido;
        this.monto = monto;
        this.moneda = moneda;
        this.clienteEmail = clienteEmail;
        this.telefonoCelular = telefonoCelular;
    }

    public String getCodigoPedido() { return codigoPedido; }
    public BigDecimal getMonto() { return monto; }
    public String getMoneda() { return moneda; }
    public String getClienteEmail() { return clienteEmail; }
    public String getTelefonoCelular() { return telefonoCelular; }
}
`);

writeFile(path.join(srcMain, 'patterns', 'structural', 'adapter', 'PaymentResponse.java'), `package pe.techsolutions.pyme.patterns.structural.adapter;

public class PaymentResponse {
    private boolean exitoso;
    private String transaccionId;
    private String pasarela;
    private String mensaje;

    public PaymentResponse(boolean exitoso, String transaccionId, String pasarela, String mensaje) {
        this.exitoso = exitoso;
        this.transaccionId = transaccionId;
        this.pasarela = pasarela;
        this.mensaje = mensaje;
    }

    public boolean isExitoso() { return exitoso; }
    public String getTransaccionId() { return transaccionId; }
    public String getPasarela() { return pasarela; }
    public String getMensaje() { return mensaje; }
}
`);

writeFile(path.join(srcMain, 'patterns', 'structural', 'adapter', 'PaymentGatewayTarget.java'), `package pe.techsolutions.pyme.patterns.structural.adapter;

/**
 * Interfaz Target del Patron Adapter (RF1)
 * Define el contrato unificado e independiente para cualquier pasarela de pago.
 */
public interface PaymentGatewayTarget {
    PaymentResponse processPayment(PaymentRequest request);
    String getGatewayName();
    boolean isAvailable();
}
`);

writeFile(path.join(srcMain, 'patterns', 'structural', 'adapter', 'PayPalService.java'), `package pe.techsolutions.pyme.patterns.structural.adapter;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Adaptee 1: API externa de PayPal con interfaz incompatible.
 */
public class PayPalService {
    public String executePayPalPayment(String accountEmail, double amountInUsd, String intent) {
        System.out.println("[PayPal SDK] Procesando cargo a " + accountEmail + " por USD " + amountInUsd + " con intento " + intent);
        return "PAYPAL-TX-" + UUID.randomUUID().toString().substring(0, 8);
    }
}
`);

writeFile(path.join(srcMain, 'patterns', 'structural', 'adapter', 'PayPalAdapter.java'), `package pe.techsolutions.pyme.patterns.structural.adapter;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Adapter concreto para PayPal (RF1)
 */
public class PayPalAdapter implements PaymentGatewayTarget {
    private final PayPalService payPalService;
    private static final BigDecimal TIPO_CAMBIO_USD = new BigDecimal("3.75");

    public PayPalAdapter(PayPalService payPalService) {
        this.payPalService = payPalService;
    }

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {
        try {
            // Convierte PEN a USD si es necesario
            BigDecimal montoUsd = request.getMoneda().equalsIgnoreCase("PEN")
                    ? request.getMonto().divide(TIPO_CAMBIO_USD, 2, RoundingMode.HALF_UP)
                    : request.getMonto();

            String txId = payPalService.executePayPalPayment(
                    request.getClienteEmail(),
                    montoUsd.doubleValue(),
                    "SALE_ECOMMERCE"
            );

            return new PaymentResponse(true, txId, "PAYPAL", "Pago procesado via PayPal exitosamente en USD " + montoUsd);
        } catch (Exception e) {
            return new PaymentResponse(false, null, "PAYPAL", "Fallo al procesar con PayPal: " + e.getMessage());
        }
    }

    @Override
    public String getGatewayName() { return "PAYPAL"; }

    @Override
    public boolean isAvailable() { return true; }
}
`);

writeFile(path.join(srcMain, 'patterns', 'structural', 'adapter', 'YapeService.java'), `package pe.techsolutions.pyme.patterns.structural.adapter;

import java.util.UUID;

/**
 * Adaptee 2: API externa de Yape (BCP) con interfaz incompatible basada en celular y OTP.
 */
public class YapeService {
    public boolean payWithPhoneNumber(String phoneNumber, double amountPen, String otpCode) {
        System.out.println("[Yape BCP SDK] Validando OTP para celular " + phoneNumber + " por monto S/ " + amountPen);
        return phoneNumber != null && phoneNumber.length() >= 9;
    }

    public String generateReceiptNumber() {
        return "YAPE-BCP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
`);

writeFile(path.join(srcMain, 'patterns', 'structural', 'adapter', 'YapeAdapter.java'), `package pe.techsolutions.pyme.patterns.structural.adapter;

/**
 * Adapter concreto para Yape (RF1)
 */
public class YapeAdapter implements PaymentGatewayTarget {
    private final YapeService yapeService;

    public YapeAdapter(YapeService yapeService) {
        this.yapeService = yapeService;
    }

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {
        boolean ok = yapeService.payWithPhoneNumber(
                request.getTelefonoCelular(),
                request.getMonto().doubleValue(),
                "123456" // OTP simulado
        );

        if (ok) {
            String receipt = yapeService.generateReceiptNumber();
            return new PaymentResponse(true, receipt, "YAPE", "Cobro inmediato Yape exitoso por S/ " + request.getMonto());
        } else {
            return new PaymentResponse(false, null, "YAPE", "Numero celular invalido o saldo insuficiente en Yape");
        }
    }

    @Override
    public String getGatewayName() { return "YAPE"; }

    @Override
    public boolean isAvailable() { return true; }
}
`);

writeFile(path.join(srcMain, 'patterns', 'structural', 'adapter', 'PlinService.java'), `package pe.techsolutions.pyme.patterns.structural.adapter;

import java.util.UUID;

/**
 * Adaptee 3: API externa de Plin (Interbank/BBVA/Scotiabank) con QR y celular.
 */
public class PlinService {
    public String transferByQRorPhone(String phone, double amount, String bankCode) {
        System.out.println("[Plin Interbancario] Transferencia via banco " + bankCode + " hacia " + phone + " por S/ " + amount);
        return "PLIN-IBK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
`);

writeFile(path.join(srcMain, 'patterns', 'structural', 'adapter', 'PlinAdapter.java'), `package pe.techsolutions.pyme.patterns.structural.adapter;

/**
 * Adapter concreto para Plin (RF1)
 */
public class PlinAdapter implements PaymentGatewayTarget {
    private final PlinService plinService;

    public PlinAdapter(PlinService plinService) {
        this.plinService = plinService;
    }

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {
        try {
            String opCode = plinService.transferByQRorPhone(
                    request.getTelefonoCelular(),
                    request.getMonto().doubleValue(),
                    "INTERBANK"
            );
            return new PaymentResponse(true, opCode, "PLIN", "Transferencia Plin acreditada correctamente.");
        } catch (Exception e) {
            return new PaymentResponse(false, null, "PLIN", "Error en red Plin: " + e.getMessage());
        }
    }

    @Override
    public String getGatewayName() { return "PLIN"; }

    @Override
    public boolean isAvailable() { return true; }
}
`);

writeFile(path.join(srcMain, 'patterns', 'structural', 'adapter', 'PaymentGatewayManager.java'), `package pe.techsolutions.pyme.patterns.structural.adapter;

import java.util.HashMap;
import java.util.Map;

/**
 * Gestor de Pasarelas y Panel de Habilitacion/Deshabilitacion (RF2)
 */
public class PaymentGatewayManager {
    private final Map<String, PaymentGatewayTarget> gateways = new HashMap<>();
    private final Map<String, Boolean> enabledStatus = new HashMap<>();

    public void registerGateway(PaymentGatewayTarget gateway, boolean enabled) {
        gateways.put(gateway.getGatewayName().toUpperCase(), gateway);
        enabledStatus.put(gateway.getGatewayName().toUpperCase(), enabled);
    }

    public void setGatewayEnabled(String gatewayName, boolean enabled) {
        String key = gatewayName.toUpperCase();
        if (gateways.containsKey(key)) {
            enabledStatus.put(key, enabled);
            System.out.println("[Configuracion RF2] Pasarela " + key + " " + (enabled ? "HABILITADA" : "DESHABILITADA"));
        } else {
            throw new IllegalArgumentException("Pasarela no registrada: " + gatewayName);
        }
    }

    public boolean isGatewayEnabled(String gatewayName) {
        return enabledStatus.getOrDefault(gatewayName.toUpperCase(), false);
    }

    public PaymentResponse process(String gatewayName, PaymentRequest request) {
        String key = gatewayName.toUpperCase();
        if (!isGatewayEnabled(key)) {
            return new PaymentResponse(false, null, key, "La pasarela de pago seleccionada se encuentra deshabilitada temporalmente.");
        }
        PaymentGatewayTarget target = gateways.get(key);
        if (target == null) {
            return new PaymentResponse(false, null, key, "Pasarela no soportada en el sistema.");
        }
        return target.processPayment(request);
    }
}
`);

// ==========================================================
// 2. PATRÓN PROXY (RF3, RF4)
// ==========================================================
writeFile(path.join(srcMain, 'patterns', 'structural', 'proxy', 'FinancialReportService.java'), `package pe.techsolutions.pyme.patterns.structural.proxy;

import pe.techsolutions.pyme.model.FinancialReportData;
import pe.techsolutions.pyme.model.User;

/**
 * Subject Interface del Patron Proxy (RF3)
 */
public interface FinancialReportService {
    FinancialReportData generateReport(User user, int month, int year);
}
`);

writeFile(path.join(srcMain, 'patterns', 'structural', 'proxy', 'RealFinancialReportService.java'), `package pe.techsolutions.pyme.patterns.structural.proxy;

import pe.techsolutions.pyme.model.FinancialReportData;
import pe.techsolutions.pyme.model.User;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * Real Subject: Servicio costoso que genera calculos financieros pesados y accede a BD.
 */
public class RealFinancialReportService implements FinancialReportService {

    public RealFinancialReportService() {
        // Simula inicializacion pesada de conexiones y modelos analiticos
        System.out.println("[RealFinancialReportService] Inicializando servicio pesado y conexiones analiticas...");
    }

    @Override
    public FinancialReportData generateReport(User user, int month, int year) {
        System.out.println("[RealFinancialReportService] Ejecutando calculo consolidado real para mes " + month + "/" + year);

        Map<String, BigDecimal> margen = new HashMap<>();
        margen.put("Tecnologia & Computo", new BigDecimal("41.7"));
        margen.put("Accesorios & Perifericos", new BigDecimal("51.1"));

        return new FinancialReportData(
                new BigDecimal("245600.00"),
                new BigDecimal("138400.00"),
                new BigDecimal("72180.00"),
                new BigDecimal("4210.00"),
                margen,
                user.getNombre() + " (" + user.getRole().name() + ")"
        );
    }
}
`);

writeFile(path.join(srcMain, 'patterns', 'structural', 'proxy', 'FinancialReportProxy.java'), `package pe.techsolutions.pyme.patterns.structural.proxy;

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
`);

// ==========================================================
// 3. PATRÓN OBSERVER (RF5, RF6)
// ==========================================================
writeFile(path.join(srcMain, 'patterns', 'behavioral', 'observer', 'StockObserver.java'), `package pe.techsolutions.pyme.patterns.behavioral.observer;

import pe.techsolutions.pyme.model.Product;

/**
 * Interfaz Observer (RF5)
 */
public interface StockObserver {
    void onStockLow(Product product, int currentStock, int minStock);
    String getObserverName();
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'observer', 'StockSubject.java'), `package pe.techsolutions.pyme.patterns.behavioral.observer;

import pe.techsolutions.pyme.model.Product;

/**
 * Interfaz Subject (Observable)
 */
public interface StockSubject {
    void attach(StockObserver observer);
    void detach(StockObserver observer);
    void notifyObservers(Product product);
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'observer', 'InventoryStockSubject.java'), `package pe.techsolutions.pyme.patterns.behavioral.observer;

import pe.techsolutions.pyme.model.Product;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Concrete Subject: Administra inventario y verifica umbrales minimos (RF5, RF6)
 */
public class InventoryStockSubject implements StockSubject {

    private final List<StockObserver> observers = new ArrayList<>();
    private final Map<String, Product> products = new HashMap<>();

    @Override
    public void attach(StockObserver observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }

    @Override
    public void detach(StockObserver observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(Product product) {
        for (StockObserver observer : observers) {
            observer.onStockLow(product, product.getStockActual(), product.getStockMinimo());
        }
    }

    public void addProduct(Product product) {
        products.put(product.getId(), product);
    }

    // RF6: El nivel minimo de stock debe ser configurable por producto
    public void configureMinimumStock(String productId, int newMinStock) {
        Product p = products.get(productId);
        if (p != null) {
            p.setStockMinimo(newMinStock);
            System.out.println("[Inventario RF6] Stock minimo configurado para " + p.getNombre() + ": " + newMinStock + " unidades.");
            if (p.getStockActual() <= newMinStock) {
                notifyObservers(p);
            }
        }
    }

    // Actualiza existencias y dispara alerta si cae por debajo del minimo (RF5)
    public void reduceStock(String productId, int quantity) {
        Product p = products.get(productId);
        if (p != null) {
            p.setStockActual(p.getStockActual() - quantity);
            System.out.println("[Inventario] Reduccion de stock en " + p.getNombre() + ". Stock restante: " + p.getStockActual());
            if (p.getStockActual() <= p.getStockMinimo()) {
                notifyObservers(p);
            }
        }
    }
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'observer', 'ManagerStockNotifier.java'), `package pe.techsolutions.pyme.patterns.behavioral.observer;

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
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'observer', 'ProcurementStockNotifier.java'), `package pe.techsolutions.pyme.patterns.behavioral.observer;

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
`);

// ==========================================================
// 4. PATRÓN COMMAND (RF7) Y MEMENTO (RF8)
// ==========================================================
writeFile(path.join(srcMain, 'patterns', 'behavioral', 'command', 'OrderCommand.java'), `package pe.techsolutions.pyme.patterns.behavioral.command;

/**
 * Interfaz Command (RF7)
 */
public interface OrderCommand {
    void execute();
    void undo();
    String getCommandId();
    String getDescription();
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'memento', 'OrderSnapshot.java'), `package pe.techsolutions.pyme.patterns.behavioral.memento;

import pe.techsolutions.pyme.model.Order;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Snapshot inmutable que representa el estado capturado de una orden
 */
public class OrderSnapshot {
    private final String orderId;
    private final Order.EstadoPedido estado;
    private final BigDecimal total;
    private final BigDecimal descuento;
    private final LocalDateTime timestamp;

    public OrderSnapshot(Order order) {
        this.orderId = order.getId();
        this.estado = order.getEstado();
        this.total = order.getTotal();
        this.descuento = order.getDescuento();
        this.timestamp = LocalDateTime.now();
    }

    public String getOrderId() { return orderId; }
    public Order.EstadoPedido getEstado() { return estado; }
    public BigDecimal getTotal() { return total; }
    public BigDecimal getDescuento() { return descuento; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'memento', 'OrderMemento.java'), `package pe.techsolutions.pyme.patterns.behavioral.memento;

/**
 * Memento inmutable (RF8)
 */
public class OrderMemento {
    private final OrderSnapshot snapshot;

    public OrderMemento(OrderSnapshot snapshot) {
        this.snapshot = snapshot;
    }

    public OrderSnapshot getSnapshot() {
        return snapshot;
    }
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'memento', 'OrderOriginator.java'), `package pe.techsolutions.pyme.patterns.behavioral.memento;

import pe.techsolutions.pyme.model.Order;

/**
 * Originator (RF8): Crea y restaura mementos sobre la entidad Order
 */
public class OrderOriginator {
    private Order order;

    public OrderOriginator(Order order) {
        this.order = order;
    }

    public OrderMemento saveToMemento() {
        System.out.println("[Memento Originator] Guardando snapshot de pedido " + order.getCodigo() + " en estado " + order.getEstado());
        return new OrderMemento(new OrderSnapshot(this.order));
    }

    public void restoreFromMemento(OrderMemento memento) {
        OrderSnapshot s = memento.getSnapshot();
        this.order.setEstado(s.getEstado());
        this.order.setDescuento(s.getDescuento());
        this.order.recalcularTotales();
        System.out.println("[Memento Originator RF8] Pedido " + order.getCodigo() + " RESTAURADO a estado anterior: " + s.getEstado());
    }

    public Order getOrder() { return order; }
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'memento', 'OrderCaretaker.java'), `package pe.techsolutions.pyme.patterns.behavioral.memento;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Caretaker (RF8): Administra la pila de mementos para permitir la operacion Deshacer (Undo)
 */
public class OrderCaretaker {
    private final Deque<OrderMemento> mementoHistory = new ArrayDeque<>();

    public void pushMemento(OrderMemento memento) {
        mementoHistory.push(memento);
    }

    public OrderMemento popMemento() {
        if (mementoHistory.isEmpty()) {
            return null;
        }
        return mementoHistory.pop();
    }

    public boolean hasMementos() {
        return !mementoHistory.isEmpty();
    }
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'command', 'ProcessOrderCommand.java'), `package pe.techsolutions.pyme.patterns.behavioral.command;

import pe.techsolutions.pyme.model.Order;
import pe.techsolutions.pyme.patterns.behavioral.memento.OrderCaretaker;
import pe.techsolutions.pyme.patterns.behavioral.memento.OrderOriginator;

import java.util.UUID;

public class ProcessOrderCommand implements OrderCommand {
    private final String commandId;
    private final OrderOriginator originator;
    private final OrderCaretaker caretaker;

    public ProcessOrderCommand(OrderOriginator originator, OrderCaretaker caretaker) {
        this.commandId = "CMD-PROC-" + UUID.randomUUID().toString().substring(0, 6);
        this.originator = originator;
        this.caretaker = caretaker;
    }

    @Override
    public void execute() {
        // Guarda snapshot previo antes de la modificacion
        caretaker.pushMemento(originator.saveToMemento());
        originator.getOrder().setEstado(Order.EstadoPedido.PROCESADO);
        System.out.println("[Command] Ejecutado ProcessOrderCommand sobre " + originator.getOrder().getCodigo());
    }

    @Override
    public void undo() {
        if (caretaker.hasMementos()) {
            originator.restoreFromMemento(caretaker.popMemento());
        }
    }

    @Override
    public String getCommandId() { return commandId; }

    @Override
    public String getDescription() { return "Procesar Pedido " + originator.getOrder().getCodigo(); }
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'command', 'CancelOrderCommand.java'), `package pe.techsolutions.pyme.patterns.behavioral.command;

import pe.techsolutions.pyme.model.Order;
import pe.techsolutions.pyme.patterns.behavioral.memento.OrderCaretaker;
import pe.techsolutions.pyme.patterns.behavioral.memento.OrderOriginator;

import java.util.UUID;

public class CancelOrderCommand implements OrderCommand {
    private final String commandId;
    private final OrderOriginator originator;
    private final OrderCaretaker caretaker;

    public CancelOrderCommand(OrderOriginator originator, OrderCaretaker caretaker) {
        this.commandId = "CMD-CANC-" + UUID.randomUUID().toString().substring(0, 6);
        this.originator = originator;
        this.caretaker = caretaker;
    }

    @Override
    public void execute() {
        caretaker.pushMemento(originator.saveToMemento());
        originator.getOrder().setEstado(Order.EstadoPedido.CANCELADO);
        System.out.println("[Command] CancelOrderCommand ejecutado sobre " + originator.getOrder().getCodigo());
    }

    @Override
    public void undo() {
        if (caretaker.hasMementos()) {
            originator.restoreFromMemento(caretaker.popMemento());
            System.out.println("[Command Undo] Cancelacion revertida mediante Memento!");
        }
    }

    @Override
    public String getCommandId() { return commandId; }

    @Override
    public String getDescription() { return "Cancelar Pedido " + originator.getOrder().getCodigo(); }
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'command', 'OrderCommandInvoker.java'), `package pe.techsolutions.pyme.patterns.behavioral.command;

import java.util.ArrayList;
import java.util.List;

/**
 * Invoker (RF7): Registra y audita la ejecucion de comandos en un historial inmutable
 */
public class OrderCommandInvoker {
    private final List<OrderCommand> executionHistory = new ArrayList<>();

    public void executeCommand(OrderCommand command) {
        command.execute();
        executionHistory.add(command);
    }

    public void undoLastCommand() {
        if (!executionHistory.isEmpty()) {
            OrderCommand last = executionHistory.remove(executionHistory.size() - 1);
            last.undo();
        }
    }

    public List<OrderCommand> getExecutionHistory() {
        return new ArrayList<>(executionHistory);
    }
}
`);

// ==========================================================
// 5. PATRÓN STRATEGY (RF9, RF10)
// ==========================================================
writeFile(path.join(srcMain, 'patterns', 'behavioral', 'strategy', 'PricingStrategy.java'), `package pe.techsolutions.pyme.patterns.behavioral.strategy;

import pe.techsolutions.pyme.model.Product;

import java.math.BigDecimal;

/**
 * Strategy Interface (RF9)
 */
public interface PricingStrategy {
    BigDecimal calculatePrice(Product product, int quantity);
    String getStrategyName();
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'strategy', 'StandardPricingStrategy.java'), `package pe.techsolutions.pyme.patterns.behavioral.strategy;

import pe.techsolutions.pyme.model.Product;

import java.math.BigDecimal;

/**
 * Estrategia 1: Precio Estandar
 */
public class StandardPricingStrategy implements PricingStrategy {
    @Override
    public BigDecimal calculatePrice(Product product, int quantity) {
        return product.getPrecioBase().multiply(BigDecimal.valueOf(quantity));
    }

    @Override
    public String getStrategyName() { return "PRECIO_ESTANDAR"; }
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'strategy', 'PercentageDiscountStrategy.java'), `package pe.techsolutions.pyme.patterns.behavioral.strategy;

import pe.techsolutions.pyme.model.Product;

import java.math.BigDecimal;

/**
 * Estrategia 2: Descuento Porcentual
 */
public class PercentageDiscountStrategy implements PricingStrategy {
    private final BigDecimal discountRate; // Ej: 0.15 para 15%

    public PercentageDiscountStrategy(BigDecimal discountRate) {
        this.discountRate = discountRate;
    }

    @Override
    public BigDecimal calculatePrice(Product product, int quantity) {
        BigDecimal subtotal = product.getPrecioBase().multiply(BigDecimal.valueOf(quantity));
        BigDecimal descuento = subtotal.multiply(discountRate);
        return subtotal.subtract(descuento);
    }

    @Override
    public String getStrategyName() { return "DESCUENTO_PORCENTUAL_" + discountRate.multiply(BigDecimal.valueOf(100)).intValue() + "%"; }
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'strategy', 'DynamicPricingStrategy.java'), `package pe.techsolutions.pyme.patterns.behavioral.strategy;

import pe.techsolutions.pyme.model.Product;

import java.math.BigDecimal;

/**
 * Estrategia 3: Precio Dinamico por Volumen o Temporada (RF9)
 */
public class DynamicPricingStrategy implements PricingStrategy {
    @Override
    public BigDecimal calculatePrice(Product product, int quantity) {
        BigDecimal base = product.getPrecioBase().multiply(BigDecimal.valueOf(quantity));
        if (quantity >= 50) {
            // Descuento mayorista agresivo 25%
            return base.multiply(new BigDecimal("0.75"));
        } else if (quantity >= 20) {
            // Descuento intermedio 15%
            return base.multiply(new BigDecimal("0.85"));
        } else if (quantity >= 10) {
            // Descuento inicial 10%
            return base.multiply(new BigDecimal("0.90"));
        }
        return base;
    }

    @Override
    public String getStrategyName() { return "PRECIO_DINAMICO_VOLUMEN"; }
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'strategy', 'PricingContext.java'), `package pe.techsolutions.pyme.patterns.behavioral.strategy;

import pe.techsolutions.pyme.model.Product;

import java.math.BigDecimal;

/**
 * Contexto de Precios que permite al administrador cambiar la estrategia en runtime (RF10)
 */
public class PricingContext {
    private PricingStrategy strategy;

    public PricingContext(PricingStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(PricingStrategy strategy) {
        this.strategy = strategy;
        System.out.println("[PricingContext RF10] Estrategia de precios actualizada a: " + strategy.getStrategyName());
    }

    public BigDecimal executeCalculation(Product product, int quantity) {
        return strategy.calculatePrice(product, quantity);
    }

    public PricingStrategy getStrategy() { return strategy; }
}
`);

// ==========================================================
// 6. PATRÓN ITERATOR (RF11, RF12)
// ==========================================================
writeFile(path.join(srcMain, 'patterns', 'behavioral', 'iterator', 'Iterator.java'), `package pe.techsolutions.pyme.patterns.behavioral.iterator;

/**
 * Generic Iterator Interface (RF11)
 */
public interface Iterator<T> {
    boolean hasNext();
    T next();
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'iterator', 'ProductCatalog.java'), `package pe.techsolutions.pyme.patterns.behavioral.iterator;

import pe.techsolutions.pyme.model.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

/**
 * Concrete Aggregate: Catalogo de productos (RF12)
 * Encapsula la coleccion interna evitando exponer listas o estructuras directas al cliente.
 */
public class ProductCatalog {
    private final List<Product> internalStorage = new ArrayList<>();

    public void addProduct(Product product) {
        internalStorage.add(product);
    }

    public int totalCount() {
        return internalStorage.size();
    }

    // Retorna iterador estandar
    public Iterator<Product> createIterator() {
        return new ProductCatalogIterator(this.internalStorage, p -> true, 1, Integer.MAX_VALUE);
    }

    // Retorna iterador con filtro y paginacion (RF11)
    public Iterator<Product> createFilterPageIterator(Predicate<Product> filter, int page, int pageSize) {
        return new ProductCatalogIterator(this.internalStorage, filter, page, pageSize);
    }
}
`);

writeFile(path.join(srcMain, 'patterns', 'behavioral', 'iterator', 'ProductCatalogIterator.java'), `package pe.techsolutions.pyme.patterns.behavioral.iterator;

import pe.techsolutions.pyme.model.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.function.Predicate;

/**
 * Concrete Iterator con soporte para filtros y paginacion (RF11, RF12)
 */
public class ProductCatalogIterator implements Iterator<Product> {

    private final List<Product> pageItems;
    private int cursor = 0;

    public ProductCatalogIterator(List<Product> allProducts, Predicate<Product> filter, int page, int pageSize) {
        // Filtra los elementos
        List<Product> filtered = new ArrayList<>();
        for (Product p : allProducts) {
            if (filter.test(p)) {
                filtered.add(p);
            }
        }

        // Aplica paginacion
        int fromIndex = Math.max(0, (page - 1) * pageSize);
        int toIndex = Math.min(filtered.size(), fromIndex + pageSize);

        if (fromIndex <= filtered.size()) {
            this.pageItems = new ArrayList<>(filtered.subList(fromIndex, toIndex));
        } else {
            this.pageItems = new ArrayList<>();
        }
    }

    @Override
    public boolean hasNext() {
        return cursor < pageItems.size();
    }

    @Override
    public Product next() {
        if (!hasNext()) {
            throw new NoSuchElementException("No hay mas productos en la pagina del iterador.");
        }
        return pageItems.get(cursor++);
    }
}
`);

// ==========================================================
// 7. PATRONES GRASP (Controller, Expert, Creator, Pure Fab)
// ==========================================================
writeFile(path.join(srcMain, 'grasp', 'OrderController.java'), `package pe.techsolutions.pyme.grasp;

import pe.techsolutions.pyme.model.Order;
import pe.techsolutions.pyme.model.Product;
import pe.techsolutions.pyme.model.User;
import pe.techsolutions.pyme.patterns.behavioral.command.OrderCommandInvoker;
import pe.techsolutions.pyme.patterns.behavioral.command.ProcessOrderCommand;
import pe.techsolutions.pyme.patterns.behavioral.memento.OrderCaretaker;
import pe.techsolutions.pyme.patterns.behavioral.memento.OrderOriginator;
import pe.techsolutions.pyme.patterns.structural.adapter.PaymentGatewayManager;
import pe.techsolutions.pyme.patterns.structural.adapter.PaymentRequest;
import pe.techsolutions.pyme.patterns.structural.adapter.PaymentResponse;

/**
 * GRASP Controller: Punto de entrada unico del subsistema de ventas que coordina
 * los casos de uso sin acoplar la UI con la logica interna.
 */
public class OrderController {
    private final PaymentGatewayManager paymentManager;
    private final OrderCommandInvoker invoker;

    public OrderController(PaymentGatewayManager paymentManager) {
        this.paymentManager = paymentManager;
        this.invoker = new OrderCommandInvoker();
    }

    public Order createOrder(String codigo, String cliente) {
        return OrderFactory.createOrder(codigo, cliente);
    }

    public PaymentResponse processAndPay(Order order, String pasarela, String celular) {
        OrderOriginator originator = new OrderOriginator(order);
        OrderCaretaker caretaker = new OrderCaretaker();

        // 1. Procesa la orden con Command
        ProcessOrderCommand procCmd = new ProcessOrderCommand(originator, caretaker);
        invoker.executeCommand(procCmd);

        // 2. Ejecuta cobro a traves del Adapter Manager
        PaymentRequest req = new PaymentRequest(order.getCodigo(), order.getTotal(), "PEN", order.getCliente() + "@pyme.pe", celular);
        PaymentResponse resp = paymentManager.process(pasarela, req);

        if (resp.isExitoso()) {
            order.setEstado(Order.EstadoPedido.PAGADO);
            order.setPasarelaPago(pasarela);
            InventoryAuditLogger.logAudit("PEDIDO_PAGADO", "Pedido " + order.getCodigo() + " pagado con " + pasarela);
        } else {
            InventoryAuditLogger.logAudit("ERROR_PAGO", "Fallo al pagar pedido " + order.getCodigo());
        }

        return resp;
    }
}
`);

writeFile(path.join(srcMain, 'grasp', 'OrderFactory.java'), `package pe.techsolutions.pyme.grasp;

import pe.techsolutions.pyme.model.Order;
import pe.techsolutions.pyme.model.OrderItem;
import pe.techsolutions.pyme.model.Product;

import java.util.UUID;

/**
 * GRASP Creator: Centraliza la creacion de entidades complejas (Order, OrderItem)
 * manteniendo bajo acoplamiento y alta cohesion.
 */
public class OrderFactory {
    public static Order createOrder(String codigo, String cliente) {
        return new Order(UUID.randomUUID().toString(), codigo, cliente);
    }

    public static OrderItem createItem(Product product, int cantidad) {
        return new OrderItem(product, cantidad, product.getPrecioBase());
    }
}
`);

writeFile(path.join(srcMain, 'grasp', 'OrderPriceExpert.java'), `package pe.techsolutions.pyme.grasp;

import pe.techsolutions.pyme.model.Order;
import pe.techsolutions.pyme.model.OrderItem;

import java.math.BigDecimal;

/**
 * GRASP Information Expert: Posee la informacion de calculo fiscal e impuestos (IGV 18%)
 */
public class OrderPriceExpert {
    private static final BigDecimal TASA_IGV = new BigDecimal("0.18");

    public static BigDecimal calculateIGV(Order order) {
        return order.getTotal().multiply(TASA_IGV);
    }

    public static BigDecimal calculateTotalWithIGV(Order order) {
        return order.getTotal().add(calculateIGV(order));
    }
}
`);

writeFile(path.join(srcMain, 'grasp', 'InventoryAuditLogger.java'), `package pe.techsolutions.pyme.grasp;

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
`);

console.log('Todos los patrones GoF y GRASP han sido generados en Java exitosamente.');
