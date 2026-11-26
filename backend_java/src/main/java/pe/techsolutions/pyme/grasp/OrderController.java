package pe.techsolutions.pyme.grasp;

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
