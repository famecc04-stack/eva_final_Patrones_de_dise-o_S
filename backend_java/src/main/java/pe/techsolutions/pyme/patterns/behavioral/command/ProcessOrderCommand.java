package pe.techsolutions.pyme.patterns.behavioral.command;

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
