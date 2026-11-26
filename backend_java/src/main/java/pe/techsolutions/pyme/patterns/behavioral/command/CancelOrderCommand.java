package pe.techsolutions.pyme.patterns.behavioral.command;

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
