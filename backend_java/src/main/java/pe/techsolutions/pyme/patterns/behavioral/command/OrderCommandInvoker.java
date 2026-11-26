package pe.techsolutions.pyme.patterns.behavioral.command;

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
