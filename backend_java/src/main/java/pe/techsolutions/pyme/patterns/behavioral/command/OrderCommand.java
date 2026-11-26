package pe.techsolutions.pyme.patterns.behavioral.command;

/**
 * Interfaz Command (RF7)
 */
public interface OrderCommand {
    void execute();
    void undo();
    String getCommandId();
    String getDescription();
}
