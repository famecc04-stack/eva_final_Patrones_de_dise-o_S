const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, HeadingLevel, BorderStyle, ShadingType,
  Header, Footer, PageNumber, NumberFormat, PageBreak
} = require('docx');

const {
  pHeading1, pHeading2, pHeading3, pBody, pBullet, pCallout, makeCell,
  C_NAVY, C_BLUE, C_BLUE_LIGHT, C_CRIMSON, C_TEXT, C_MUTED, C_BORDER, C_BG_ALT, C_WHITE
} = require('./doc_styles');

console.log("Generando documento maestro completo para TechSolutions S.A....");

const children = [];

// ==========================================
// 1. PORTADA ACADÉMICA
// ==========================================
children.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text: "INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO ZEGEL",
        bold: true,
        size: 26,
        font: "Segoe UI",
        color: C_CRIMSON,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 },
    children: [
      new TextRun({
        text: "ESCUELA DE TECNOLOGÍA | CARRERA DE DESARROLLO DE SISTEMAS DE INFORMACIÓN",
        bold: true,
        size: 20,
        font: "Segoe UI",
        color: C_MUTED,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 300, after: 120 },
    children: [
      new TextRun({
        text: "UNIDAD DIDÁCTICA:",
        size: 20,
        font: "Segoe UI",
        color: C_MUTED,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 400 },
    children: [
      new TextRun({
        text: "PATRONES DE DISEÑO DE SOFTWARE",
        bold: true,
        size: 32,
        font: "Segoe UI",
        color: C_NAVY,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text: "EVALUACIÓN FINAL – ETAPA 1",
        bold: true,
        size: 22,
        font: "Segoe UI",
        color: C_BLUE,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 100, after: 140 },
    children: [
      new TextRun({
        text: "PROYECTO EMPRESARIAL:",
        size: 20,
        font: "Segoe UI",
        color: C_MUTED,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 160 },
    children: [
      new TextRun({
        text: "TECHSOLUTIONS – PLATAFORMA DE GESTIÓN EMPRESARIAL INTEGRAL",
        bold: true,
        size: 30,
        font: "Segoe UI",
        color: C_NAVY,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 450 },
    children: [
      new TextRun({
        text: "Punto 1: Definición del Problema, Requerimientos del Sistema y Aplicación de Patrones de Diseño Estructurales, de Comportamiento y GRASP",
        size: 20,
        font: "Segoe UI",
        italics: true,
        color: C_MUTED,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 60 },
    children: [
      new TextRun({
        text: "EMPRESA OBJETO DE ESTUDIO:",
        bold: true,
        size: 19,
        font: "Segoe UI",
        color: C_NAVY,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 350 },
    children: [
      new TextRun({
        text: "TechSolutions S.A. (Lima, Perú)",
        size: 21,
        font: "Segoe UI",
        color: C_TEXT,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 60 },
    children: [
      new TextRun({
        text: "INTEGRANTES DEL EQUIPO DE DESARROLLO:",
        bold: true,
        size: 20,
        font: "Segoe UI",
        color: C_NAVY,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 40, after: 40 },
    children: [
      new TextRun({
        text: "1. Orellana del Castillo, Estefanía",
        bold: true,
        size: 21,
        font: "Segoe UI",
        color: C_TEXT,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 40, after: 400 },
    children: [
      new TextRun({
        text: "2. Cadillo Córdova, Fabiola",
        bold: true,
        size: 21,
        font: "Segoe UI",
        color: C_TEXT,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 150, after: 40 },
    children: [
      new TextRun({
        text: "LIMA – PERÚ",
        bold: true,
        size: 20,
        font: "Segoe UI",
        color: C_MUTED,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
    children: [
      new TextRun({
        text: "2026",
        size: 19,
        font: "Segoe UI",
        color: C_MUTED,
      }),
      new PageBreak(),
    ],
  })
);

// ==========================================
// 2. INTRODUCCIÓN
// ==========================================
children.push(
  pHeading1("1. INTRODUCCIÓN"),
  pBody("El vertiginoso desarrollo del comercio digital y la aceleración tecnológica en el Perú han transformado de manera radical las dinámicas de intercambio comercial. Las pequeñas y medianas empresas (PYMES), que constituyen más del 99% del tejido empresarial nacional y representan el principal motor de generación de empleo, se encuentran en una encrucijada crítica: deben adaptarse ágilmente a los canales digitales o afrontar el rezago comercial, la pérdida de competitividad y la ineficiencia operativa. No obstante, esta transición digital suele realizarse de forma fragmentada, desarticulada y empírica, recurriendo a soluciones aisladas como planillas de cálculo manuales, aplicaciones de mensajería instantánea y registros dispersos de existencias."),
  pBody("Frente a este escenario, TechSolutions S.A., empresa tecnológica peruana con sede en Lima especializada en la creación de soluciones de software empresarial, ha asumido el desafío estratégico de diseñar e implementar una plataforma web integral de gestión empresarial. La meta fundamental consiste en unificar y optimizar los flujos operativos neurálgicos de las PYMES: gestión de catálogo y visualización fluida de productos, control de inventario con notificaciones en tiempo real, administración ordenada del ciclo de vida de pedidos, cobros multicanal sin incompatibilidades técnicas, cálculo flexible de tarifas y promociones, auditoría transaccional con reversibilidad de operaciones erróneas, y generación segura y confidencial de reportes financieros."),
  pBody("Desde la perspectiva de la ingeniería de software, el éxito de una plataforma empresarial de esta envergadura no reside únicamente en su interfaz de usuario, sino primordialmente en la robustez, mantenibilidad, escalabilidad y bajo acoplamiento de su arquitectura de software. La aplicación improvisada de código procedural genera sistemas monolíticos y frágiles, donde cualquier modificación en una pasarela de pago o política de precios desencadena fallos en cascada."),
  pBody("Por ello, el presente proyecto se fundamenta en la aplicación rigurosa de patrones de diseño orientados a objetos reconocidos por la industria: patrones estructurales (Adapter y Proxy) para resolver la incompatibilidad y gobernar el acceso eficiente a datos sensibles; patrones de comportamiento (Observer, Command, Memento, Strategy e Iterator) para articular flujos dinámicos, reversibilidad y trazabilidad; y principios GRASP (General Responsibility Assignment Software Patterns) para asegurar una asignación metódica y coherente de responsabilidades entre objetos. El presente documento formaliza la primera etapa del proyecto académico, detallando exhaustivamente el análisis de necesidades, la especificación de requerimientos del sistema y la justificación técnica de cada patrón de diseño propuesto."),
  pCallout(
    "Propósito del Documento",
    "Establecer la base formal, conceptual y arquitectónica de la Plataforma TechSolutions, asegurando que cada necesidad operativa del caso práctico esté respaldada por una solución técnica modular, mantenible y alineada con los criterios de evaluación de nivel Sobresaliente."
  )
);

// ==========================================
// 3. DESCRIPCIÓN DE LA EMPRESA Y CONTEXTO
// ==========================================
children.push(
  pHeading1("2. DESCRIPCIÓN DE LA EMPRESA Y CONTEXTO EMPRESARIAL"),
  pHeading2("2.1. Perfil Corporativo de TechSolutions S.A."),
  pBody("TechSolutions S.A. es una compañía de base tecnológica con sede central en Lima, Perú, dedicada al diseño, arquitectura y despliegue de soluciones digitales en la nube para empresas del sector comercial, retail y servicios. Fundada con el compromiso de democratizar las herramientas de automatización empresarial, la organización provee software bajo modalidad SaaS (Software as a Service) a pequeñas y medianas organizaciones que buscan dar el salto hacia la digitalización formal."),
  pHeading2("2.2. Realidad Operativa y Desafíos de las PYMES en el Perú"),
  pBody("En el Perú contemporáneo, las PYMES enfrentan un ecosistema comercial híbrido y altamente demandante. La pandemia consolidó el uso masivo de billeteras móviles (Yape y Plin) como estándares fácticos de pago rápido, sumados a herramientas globales como PayPal y pasarelas de tarjetas bancarias. Sin embargo, este dinamismo ha desnudado severas limitaciones internas en los negocios:"),
  pBullet("Fragmentación de canales de venta:", "Los comerciantes registran ventas en tiendas físicas, ferias, redes sociales y canales web sin un inventario centralizado, provocando descoordinación logística inmediata."),
  pBullet("Falta de formalización de la información financiera:", "La gerencia y los contadores carecen de reportes en tiempo real, dependiendo de cierres mensuales tardíos y propensos a errores humanos."),
  pBullet("Costos elevados de software tradicional:", "Los ERP corporativos clásicos (SAP, Oracle) resultan prohibitivos en costo de licenciamiento, mantenimiento y complejidad de uso para una PYME peruana típica."),
  pBullet("Vulnerabilidad operativa por rotación de personal:", "Los errores de digitación al despachar pedidos o calcular descuentos generan pérdidas directas de dinero que no pueden ser corregidas con facilidad debido a la falta de historiales de auditoría.")
);

// ==========================================
// 4. DEFINICIÓN DEL PROBLEMA
// ==========================================
children.push(
  pHeading1("3. DEFINICIÓN DEL PROBLEMA"),
  pHeading2("3.1. Problema Central"),
  pBody("Las pequeñas y medianas empresas (PYMES) peruanas sufren una severa descoordinación operativa y vulnerabilidad de datos derivada de la carencia de un sistema integrado de gestión. Esta deficiencia genera incompatibilidad al procesar pagos heterogéneos, riesgos críticos de fuga o manipulación de información financiera confidencial, pérdida recurrente de ventas por desabastecimiento imprevisto de productos, errores contables y humanos irreversibles al procesar pedidos, rigidez para adaptar los precios a la demanda y lentitud en la navegación de catálogos comerciales."),
  pHeading2("3.2. Problemas Específicos Identificados"),
  pBody("A partir del análisis minucioso del caso práctico proporcionado por TechSolutions S.A., se han identificado siete (7) problemas específicos que impactan directamente en la rentabilidad y sostenibilidad del negocio:"),
  pBullet("1. Incompatibilidad técnica y dispersión de pasarelas de pago:", "Los clientes demandan pagar mediante diversos métodos digitales: billeteras móviles peruanas (Yape con código QR o número telefónico, Plin interbancario) y pasarelas internacionales de comercio electrónico (PayPal mediante redirección y tokens REST). La falta de una interfaz estandarizada genera que el código fuente de la tienda web dependa directamente de las APIs heterogéneas de cada proveedor, encareciendo el mantenimiento e impidiendo que el administrador pueda encender o apagar métodos de pago con facilidad."),
  pBullet("2. Exposición y falta de control de acceso a reportes financieros sensibles:", "Los balances contables, márgenes de utilidad neta, costos de adquisición de mercadería y flujo de caja contienen información altamente confidencial. Actualmente, no existe una barrera de control por roles robusta que impida que empleados no autorizados (como vendedores o personal de almacén) accedan a dicha data estratégica. Asimismo, las consultas recurrentes de reportes pesados congestionan la base de datos por falta de una capa de intermediación inteligente con control y caché."),
  pBullet("3. Desabastecimiento y pérdida de ventas por falta de alertas automáticas de stock:", "Los encargados de compras y la gerencia se enteran de que un producto de alta rotación se ha agotado recién cuando un cliente solicita una compra y el pedido no puede ser atendido. La inexistencia de un mecanismo reactivo que alerte automáticamente cuando las existencias descienden de un umbral mínimo configurado genera pérdida directa de ingresos, insatisfacción del cliente y quiebres de inventario."),
  pBullet("4. Gestión caótica de pedidos y ausencia de registro estructurado de acciones:", "El ciclo de vida de un pedido (creación, procesamiento, aplicación de descuentos promocionales, despacho y cancelación) se ejecuta sin un historial transaccional auditable. Si una venta sufre discrepancias, no es posible determinar qué colaborador ejecutó la modificación, en qué momento ni bajo qué parámetros, lo cual abre brechas de fraude interno y desorganización contable."),
  pBullet("5. Rigidez e ineficiencia en las políticas de cálculo de precios:", "En el mercado minorista peruano, los precios no son estáticos. Las empresas requieren aplicar tarifas estándar, descuentos porcentuales por campañas estacionales (Cyber Days, Navidad, Fiestas Patrias) y esquemas de precios dinámicos ajustados por demanda o volumen. Los sistemas tradicionales codifican estas reglas con estructuras de control condicional anidadas (if-else masivos), lo cual vuelve el código inestable y propenso a errores ante nuevos requerimientos comerciales."),
  pBullet("6. Catálogo de productos lento, poco amigable y acoplado a la infraestructura de datos:", "A medida que el catálogo crece a cientos o miles de referencias (SKU), la visualización de la interfaz se degrada. El sistema carga colecciones masivas en memoria y expone de forma directa las estructuras de datos subyacentes, lo cual ralentiza las búsquedas, sobrecarga la red y ofrece una experiencia de usuario deficiente e ineficiente."),
  pBullet("7. Irreversibilidad de modificaciones críticas y errores operativos:", "Cuando un vendedor aplica un descuento incorrecto o cancela un pedido por equivocación en el sistema actual, la alteración sobreescribe la base de datos de manera definitiva. La imposibilidad de 'deshacer' (rollback) o recuperar el estado previo de una transacción genera pérdidas financieras directas, distorsión en la contabilidad y frustración operativa generalizada.")
);

// ==========================================
// 5. NECESIDADES DE LOS USUARIOS (RBAC)
// ==========================================
children.push(
  pHeading1("4. NECESIDADES DE LOS USUARIOS Y MATRIZ DE PERFILES"),
  pBody("Para garantizar un diseño centrado en el usuario y una arquitectura de seguridad por capas (Principio de Menor Privilegio), se ha modelado el comportamiento y los requerimientos de cinco (5) perfiles clave en la organización:"),
  
  pHeading2("4.1. Perfil: Administrador del Sistema (TI / Dueño del Negocio)"),
  pBullet("Qué necesita hacer:", "Gobernar la infraestructura técnica de la plataforma, administrar credenciales de acceso, configurar parámetros globales (pasarelas de pago habilitadas, política de precios activa del comercio), asignar roles y supervisar la operatividad de los servicios."),
  pBullet("Qué información necesita consultar:", "Logs de auditoría del sistema, estado de salud de pasarelas externas, matriz de usuarios activos, historiales transaccionales de comandos y configuración de endpoints."),
  pBullet("Funcionalidades clave:", "Panel de encendido/apagado de pasarelas de pago (RF2), selector de estrategia de precios global (RF10), módulo de altas/bajas/modificaciones de usuarios, auditoría de eventos de sistema."),
  pBullet("Permisos asignados:", "Acceso total de configuración técnica. No interactúa rutinariamente con la emisión comercial directa."),

  pHeading2("4.2. Perfil: Gerente General / Administrador de Sucursal"),
  pBullet("Qué necesita hacer:", "Tomar decisiones comerciales y estratégicas, supervisar el desempeño general de las ventas, evaluar rentabilidad neta, validar compras de reposición y recibir alertas inmediatas de desabastecimiento."),
  pBullet("Qué información necesita consultar:", "Dashboard ejecutivo consolidado, reportes financieros exhaustivos (ingresos, costos, utilidades brutas y netas), alertas críticas de stock agotado o por agotarse, e indicadores de rendimiento (KPIs)."),
  pBullet("Funcionalidades clave:", "Acceso irrestricto a reportes financieros completos (RF4) a través del proxy de seguridad, recepción de notificaciones reactivas de stock bajo (RF5), visualización de auditoría general."),
  pBullet("Permisos asignados:", "Lectura de nivel ejecutivo y financiero total. Aprobación y supervisión."),

  pHeading2("4.3. Perfil: Contador / Auditor Financiero"),
  pBullet("Qué necesita hacer:", "Conciliar operaciones de cobro realizadas a través de pasarelas (PayPal, Yape, Plin), verificar ingresos reales contra pedidos facturados, auditar estados financieros y validar impuestos."),
  pBullet("Qué información necesita consultar:", "Reportes de flujo de caja, cierres diarios de caja, balance financiero, comisiones deducidas por pasarelas de pago, libros contables auxiliares e historial de transacciones revertidas."),
  pBullet("Funcionalidades clave:", "Acceso completo a reportes financieros analíticos (RF4), exportación de asientos contables, consulta de historial de pedidos y validación de cobros conciliados."),
  pBullet("Permisos asignados:", "Lectura y generación analítica sobre el módulo de reportes financieros y auditoría de cobros. Sin acceso a modificación de catálogo o configuración de hardware."),

  pHeading2("4.4. Perfil: Personal de Compras / Logística y Almacén"),
  pBullet("Qué necesita hacer:", "Gestionar el reabastecimiento continuo de existencias, negociar con proveedores locales, ingresar lotes de mercadería al inventario y establecer umbrales de stock mínimo de seguridad para cada SKU."),
  pBullet("Qué información necesita consultar:", "Niveles de existencias en almacén, kardex de movimientos de productos, lista de productos en estado crítico de rotación y alertas automáticas de reposición."),
  pBullet("Funcionalidades clave:", "Configuración del nivel mínimo de stock individual por producto (RF6), recepción de notificaciones automáticas inmediatas ante quiebre de stock (RF5), actualización de stock por órdenes de compra."),
  pBullet("Permisos asignados:", "Control total de inventario y parámetros de stock mínimo. Acceso denegado a reportes de utilidad financiera y balances."),

  pHeading2("4.5. Perfil: Vendedor u Operador de Pedidos y Caja"),
  pBullet("Qué necesita hacer:", "Atender solicitudes de clientes en punto de venta físico o digital, consultar disponibilidad en catálogo, crear nuevos pedidos, aplicar descuentos autorizados, cobrar mediante pasarelas digitales y corregir o cancelar pedidos ante solicitudes inmediatas del cliente."),
  pBullet("Qué información necesita consultar:", "Catálogo de productos con precios vigentes calculados por la estrategia activa, existencias disponibles, estado actual de pedidos del día e historial de órdenes recientes."),
  pBullet("Funcionalidades clave:", "Recorrido ágil y búsqueda en catálogo (RF11, RF12), creación y procesamiento de pedidos encapsulados como comandos (RF7), solicitud de cobro en pasarelas (RF1), y reversión de errores mediante restauración de memento (RF8)."),
  pBullet("Permisos asignados:", "Operaciones de venta, pedidos y cobro. Acceso denegado estrictamente a reportes financieros confidenciales y configuraciones de pasarelas."),

  pHeading2("4.6. Matriz de Control de Acceso Basada en Roles (RBAC)"),
  pBody("La siguiente tabla formaliza los privilegios de acceso para cada rol en los módulos críticos del sistema:")
);

// TABLA RBAC
const rbacTableRows = [
  new TableRow({
    tableHeader: true,
    children: [
      makeCell("Módulo / Recurso del Sistema", { isHeader: true, colWidth: 26 }),
      makeCell("Administrador", { isHeader: true, colWidth: 14 }),
      makeCell("Gerente", { isHeader: true, colWidth: 15 }),
      makeCell("Contador", { isHeader: true, colWidth: 15 }),
      makeCell("Compras", { isHeader: true, colWidth: 15 }),
      makeCell("Vendedor", { isHeader: true, colWidth: 15 }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Dashboard Principal", { isAlt: false, bold: true }),
      makeCell("Métricas TI", {}),
      makeCell("Métricas Negocio", {}),
      makeCell("Métricas Fiscales", {}),
      makeCell("Alertas Stock", {}),
      makeCell("Ventas del Día", {}),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Catálogo de Productos (Iterator)", { isAlt: true, bold: true }),
      makeCell("Administrar", { isAlt: true }),
      makeCell("Consultar", { isAlt: true }),
      makeCell("Consultar", { isAlt: true }),
      makeCell("Administrar", { isAlt: true }),
      makeCell("Consultar / Venta", { isAlt: true }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Gestión de Inventario (Kardex)", { isAlt: false, bold: true }),
      makeCell("Supervisar", {}),
      makeCell("Consultar", {}),
      makeCell("Auditoría", {}),
      makeCell("Total (Kardex/Stock)", {}),
      makeCell("Solo Existencias", {}),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Configurar Stock Mínimo (RF6)", { isAlt: true, bold: true }),
      makeCell("Autorizado", { isAlt: true }),
      makeCell("Autorizado", { isAlt: true }),
      makeCell("Denegado", { isAlt: true }),
      makeCell("Total (Gestor)", { isAlt: true }),
      makeCell("Denegado", { isAlt: true }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Recepción Alertas Stock (Observer RF5)", { isAlt: false, bold: true }),
      makeCell("Opcional", {}),
      makeCell("Suscrito Activo", {}),
      makeCell("No Suscrito", {}),
      makeCell("Suscrito Activo", {}),
      makeCell("No Suscrito", {}),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Gestión de Pedidos (Command RF7)", { isAlt: true, bold: true }),
      makeCell("Supervisar", { isAlt: true }),
      makeCell("Supervisar", { isAlt: true }),
      makeCell("Auditoría", { isAlt: true }),
      makeCell("Denegado", { isAlt: true }),
      makeCell("Crear/Proc/Desc", { isAlt: true }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Restaurar Pedidos (Memento RF8)", { isAlt: false, bold: true }),
      makeCell("Autorizado", {}),
      makeCell("Autorizado", {}),
      makeCell("Auditoría", {}),
      makeCell("Denegado", {}),
      makeCell("Revertir Propio", {}),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Pasarelas de Pago (Adapter RF1)", { isAlt: true, bold: true }),
      makeCell("Configuración", { isAlt: true }),
      makeCell("Supervisar", { isAlt: true }),
      makeCell("Conciliar", { isAlt: true }),
      makeCell("Denegado", { isAlt: true }),
      makeCell("Ejecutar Cobro", { isAlt: true }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Habilitar/Deshabilitar Pasarelas (RF2)", { isAlt: false, bold: true }),
      makeCell("Exclusivo Admin", {}),
      makeCell("Denegado", {}),
      makeCell("Denegado", {}),
      makeCell("Denegado", {}),
      makeCell("Denegado", {}),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Estrategias de Precios (Strategy RF9/10)", { isAlt: true, bold: true }),
      makeCell("Configurar/Cambiar", { isAlt: true }),
      makeCell("Autorizar", { isAlt: true }),
      makeCell("Consultar", { isAlt: true }),
      makeCell("Consultar", { isAlt: true }),
      makeCell("Aplicar Auto", { isAlt: true }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Reportes Financieros (Proxy RF3/4)", { isAlt: false, bold: true }),
      makeCell("Denegado / Cifrado", {}),
      makeCell("Acceso Completo", {}),
      makeCell("Acceso Completo", {}),
      makeCell("Acceso Denegado", {}),
      makeCell("Acceso Denegado", {}),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Historial Transaccional de Acciones", { isAlt: true, bold: true }),
      makeCell("Total", { isAlt: true }),
      makeCell("Total", { isAlt: true }),
      makeCell("Total Contable", { isAlt: true }),
      makeCell("Logs Compras", { isAlt: true }),
      makeCell("Logs Propios", { isAlt: true }),
    ],
  }),
];

children.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rbacTableRows,
  }),
  pHeading2("4.7. Propuestas Complementarias de Seguridad y UX (Opcionales)"),
  pBody("Con el fin de enriquecer la propuesta sin alterar los requerimientos esenciales del caso práctico, se plantean como mejoras complementarias:"),
  pBullet("Propuesta Complementaria 1 - Doble Factor de Autenticación (2FA):", "Implementación de confirmación mediante código temporal (TOTP) para usuarios con roles de Gerente y Administrador al momento de acceder a reportes o cambiar pasarelas de pago."),
  pBullet("Propuesta Complementaria 2 - Auditoría de Sesiones Concurrentes:", "Detección de accesos múltiples simultáneos para prevenir el préstamo de credenciales entre trabajadores en un mismo establecimiento comercial.")
);

// ==========================================
// 6. OBJETIVOS DEL PROYECTO
// ==========================================
children.push(
  pHeading1("5. OBJETIVOS DEL PROYECTO"),
  pHeading2("5.1. Objetivo General"),
  pBody("Diseñar y modelar conceptualmente una plataforma web integral de gestión empresarial para TechSolutions S.A., adaptada a las necesidades operativas de las PYMES peruanas, mediante la aplicación estratégica y justificada de patrones de diseño de software estructurales (Adapter, Proxy), de comportamiento (Observer, Command, Memento, Strategy, Iterator) y principios GRASP, garantizando una arquitectura altamente cohesiva, desacoplada, segura en el control de acceso a información financiera y resiliente ante fallos u operaciones erróneas."),
  pHeading2("5.2. Objetivos Específicos"),
  pBullet("OE1 (Cobros Multicanal - RF1, RF2):", "Diseñar un subsistema desacoplado de pagos que integre transparentemente pasarelas heterogéneas (PayPal, Yape, Plin) bajo un adaptador común, habilitando un panel administrativo para activar o desactivar cada canal sin requerir modificaciones en el código cliente."),
  pBullet("OE2 (Seguridad y Eficiencia Financiera - RF3, RF4):", "Proteger el acceso a la información financiera sensible a través de un sustituto inteligente (Proxy) que valide credenciales y roles (restringiendo el acceso total únicamente a Gerente y Contador), incorporando estrategias de carga perezosa y almacenamiento en caché para optimizar el rendimiento del servidor."),
  pBullet("OE3 (Monitoreo Reactivo de Inventario - RF5, RF6):", "Automatizar el sistema de notificaciones de inventario mediante una arquitectura publicador-suscriptor que alerte instantáneamente a los roles de Gerente y Personal de Compras cuando el stock caiga por debajo de un umbral mínimo configurable de manera independiente por producto."),
  pBullet("OE4 (Trazabilidad y Encapsulación de Pedidos - RF7):", "Estructurar las operaciones del ciclo de vida de los pedidos (crear, procesar, aplicar descuento y cancelar) como objetos comandos independientes, posibilitando su almacenamiento cronológico en un historial de auditoría y su ejecución secuencial controlada."),
  pBullet("OE5 (Confiabilidad y Reversión Operativa - RF8):", "Implementar un mecanismo de captura y restauración de estados previos de pedidos basado en mementos, permitiendo revertir operaciones erróneas o cancelaciones accidentales sin comprometer la integridad de la base de datos."),
  pBullet("OE6 (Flexibilidad Algorítmica de Precios - RF9, RF10):", "Desacoplar la lógica de tarificación comercial mediante el encapsulamiento de algoritmos intercambiables (precio estándar, descuento porcentual y precio dinámico estacional), permitiendo al administrador alternar la política de precios activa desde un panel de control."),
  pBullet("OE7 (Eficiencia en Navegación de Catálogos - RF11, RF12):", "Optimizar la experiencia de exploración, filtrado y paginación de productos a través de un iterador que recorra la colección eficientemente sin exponer su estructura interna de datos.")
);

// ==========================================
// 7. SOLUCIÓN PROPUESTA
// ==========================================
children.push(
  pHeading1("6. SOLUCIÓN PROPUESTA Y ARQUITECTURA CONCEPTUAL"),
  pBody("Para superar las problemáticas expuestas y cumplir los objetivos trazados, TechSolutions S.A. propone una arquitectura de software orientada a servicios y modelada por capas, que aísla de forma transparente la interfaz de usuario de las reglas de negocio y los mecanismos de persistencia."),
  pHeading2("6.1. Enfoque Arquitectónico por Capas"),
  pBullet("1. Capa de Presentación (Web UI):", "Diseñada para brindar una experiencia de usuario (UX) limpia, moderna, responsiva y en idioma español, adaptada a la terminología del comercio peruano (soles S/, categorías comerciales, identificación por DNI/RUC). Incluye menú lateral, tarjetas estadísticas, tablas paginadas y modales intuitivos."),
  pBullet("2. Capa de Control y Aplicación (GRASP Controller):", "Controladores centralizados que reciben las peticiones de la interfaz gráfica y coordinan la ejecución delegando tareas a los objetos de negocio, evitando que las vistas contengan lógica transaccional."),
  pBullet("3. Capa de Dominio (Entidades y Patrones GoF):", "El corazón de la solución. Aquí residen los modelos de negocio (Producto, Pedido, Inventario, Usuario, Pago) y se implementan rigurosamente los siete patrones de diseño solicitados, garantizando bajo acoplamiento y alta cohesión."),
  pBullet("4. Capa de Integración e Infraestructura:", "Encapsula las llamadas a APIs externas de pasarelas de pago (PayPal SDK, APIs de Yape/Plin), servicios de notificación por correo o push, y la persistencia de datos relacional."),
  pHeading2("6.2. Estrategia de Mitigación de Problemas"),
  pBody("Cada problemática es resuelta de manera directa mediante la arquitectura propuesta:"),
  pBullet("Ante la incompatibilidad de pasarelas:", "El patrón Adapter estandariza el procesamiento en un único método polimórfico, permitiendo añadir futuras billeteras (como Tunki o Agora) con cero impacto en el código de ventas."),
  pBullet("Ante el riesgo de fraude en reportes:", "El patrón Proxy intercepta cada consulta a datos financieros, bloqueando a usuarios no autorizados y sirviendo copias en caché para consultas repetidas."),
  pBullet("Ante el quiebre de stock imprevisto:", "El patrón Observer desencadena alertas automáticas inmediatas a los interesados correctos en el instante exacto en que ocurre una salida de mercadería crítica."),
  pBullet("Ante las cancelaciones o errores humanos:", "La combinación de Command y Memento provee una 'caja negra' auditable con capacidad de Undo, salvaguardando la exactitud contable."),
  pBullet("Ante la rigidez comercial:", "El patrón Strategy permite cambiar la política de precios de toda la tienda con un solo clic administrativo, sin desplegar nuevo código.")
);

// ==========================================
// 8. FUNCIONALIDADES DEL SISTEMA POR MÓDULOS
// ==========================================
children.push(
  pHeading1("7. FUNCIONALIDADES DEL SISTEMA ORGANIZADAS POR MÓDULOS"),
  pBody("El sistema TechSolutions se estructura funcionalmente en once (11) módulos integrados:"),

  pHeading2("7.1. Módulo 1: Dashboard Principal y Analítica Ejecutiva"),
  pBullet("Indicadores Clave (KPIs):", "Tarjetas en tiempo real con Ventas Totales del Día (S/), Pedidos Pendientes de Atención, Conteo de Productos con Stock Crítico e Ingresos Netos Acumulados."),
  pBullet("Gráficos Estadísticos:", "Tendencia de ventas semanales/mensuales y distribución de métodos de pago más utilizados."),
  pBullet("Actividad Reciente y Accesos Rápidos:", "Lista cronológica de las últimas órdenes procesadas y botones de navegación rápida hacia creación de pedidos, catálogo y kardex."),

  pHeading2("7.2. Módulo 2: Gestión de Productos y Catálogo (Iterator)"),
  pBullet("Catálogo de Productos:", "Vista tabular y en cuadrícula con soporte para miles de referencias, sin degradar el rendimiento del navegador."),
  pBullet("Buscador Dinámico y Filtros:", "Búsqueda por nombre de producto, SKU, categoría comercial (Electrónica, Abarrotes, Textil, Oficina) y rango de precios."),
  pBullet("Paginación Eficiente:", "Recorrido paginado desacoplado mediante el iterador, permitiendo explorar 10, 20 o 50 registros por página de forma fluida."),
  pBullet("Mantenimiento de Productos:", "Formularios para agregar nuevo producto, editar características, imagen referencial, precio base y categoría."),

  pHeading2("7.3. Módulo 3: Control de Inventario y Almacén"),
  pBullet("Kardex de Existencias:", "Registro de existencias físicas disponibles, stock comprometido en pedidos y valorización total del inventario."),
  pBullet("Indicadores Visuales de Estado:", "Etiquetas de estado semafóricas: Normal (Verde), Stock Medio (Amarillo), Stock Crítico (Rojo) y Agotado (Gris)."),
  pBullet("Ajustes de Almacén:", "Entradas por órdenes de compra de mercadería y salidas por mermas o devoluciones."),

  pHeading2("7.4. Módulo 4: Sistema de Alertas de Stock (Observer)"),
  pBullet("Notificaciones Automáticas:", "Emisión de notificaciones instantáneas hacia usuarios suscritos con roles de Gerente y Personal de Compras en el momento en que un producto cae por debajo de su umbral."),
  pBullet("Centro de Alertas Interactivo:", "Bandeja desplegable en la barra superior con indicador numérico de alertas no leídas y acceso al detalle del producto desabastecido."),
  pBullet("Configuración de Stock Mínimo:", "Interfaz para definir el umbral crítico de stock mínimo de forma independiente para cada producto del catálogo (RF6)."),

  pHeading2("7.5. Módulo 5: Gestión y Procesamiento de Pedidos (Command y Memento)"),
  pBullet("Ciclo de Vida de Pedidos:", "Creación de nuevas órdenes, asignación de cliente, agregación de líneas de producto, procesamiento comercial, despacho y facturación."),
  pBullet("Comandos Encapsulados:", "Ejecución de acciones mediante objetos comandos (CreateOrderCommand, ProcessOrderCommand, ApplyDiscountCommand, CancelOrderCommand)."),
  pBullet("Aplicación de Descuentos:", "Cálculo y aplicación de descuentos promocionales respetando la estrategia activa del negocio."),
  pBullet("Cancelación y Reversión:", "Cancelación controlada de órdenes con posibilidad de restaurar el estado anterior inmediatamente ante equivocaciones."),

  pHeading2("7.6. Módulo 6: Procesamiento e Integración de Pagos (Adapter)"),
  pBullet("Pasarelas Integradas:", "Soporte nativo unificado para PayPal (pago internacional), Yape (billetera móvil líder en Perú por QR/celular) y Plin (transferencias interbancarias inmediatas)."),
  pBullet("Flujo de Cobro Transparente:", "Selección del medio de pago en el checkout y confirmación en tiempo real del estado de la transacción (Aprobado, Pendiente, Rechazado)."),
  pBullet("Panel de Administración de Pasarelas:", "Interfaz exclusiva para el Administrador que permite habilitar o deshabilitar cualquier pasarela con un conmutador visual (RF2)."),

  pHeading2("7.7. Módulo 7: Configuración de Políticas y Estrategias de Precios (Strategy)"),
  pBullet("Estrategia 1 - Precio Estándar:", "Cálculo directo sobre el precio base unitario asignado al producto en el catálogo."),
  pBullet("Estrategia 2 - Precio con Descuento Porcentual:", "Aplicación de un porcentaje fijo de descuento promocional (ej. 15% o 20% de descuento por campaña) al subtotal de la compra."),
  pBullet("Estrategia 3 - Precio Dinámico:", "Ajuste algorítmico automatizado que incrementa o reduce tarifas según factores de estacionalidad, horarios comerciales o alta demanda del mercado."),
  pBullet("Selector Administrativo:", "Control centralizado donde el Administrador cambia la estrategia comercial activa de la plataforma con efecto instantáneo (RF10)."),

  pHeading2("7.8. Módulo 8: Reportes Financieros y Auditoría (Proxy)"),
  pBullet("Reporte de Ventas e Ingresos:", "Gráficos y tablas consolidadas de facturación diaria, semanal y mensual en soles peruanos."),
  pBullet("Resumen Financiero y Utilidad Neta:", "Visualización de costos operativos, márgenes de ganancia bruta, utilidad neta y deducciones fiscales."),
  pBullet("Filtros Avanzados:", "Segmentación por rangos de fechas personalizados, métodos de cobro y categorías de producto."),
  pBullet("Control Robusto de Acceso (Proxy):", "Muro de autenticación y autorización que valida si el usuario posee rol de Gerente o Contador. Si un usuario no autorizado intenta ingresar, el sistema bloquea la vista y registra un intento de acceso no autorizado."),

  pHeading2("7.9. Módulo 9: Gestión de Usuarios, Roles y Seguridad"),
  pBullet("Directorio de Colaboradores:", "Listado completo de usuarios registrados, estado de cuenta (Activo / Inactivo), sucursal y rol asignado."),
  pBullet("Administración de Roles RBAC:", "Asignación de perfiles (Administrador, Gerente, Contador, Compras, Vendedor) con políticas estrictas de menor privilegio."),
  pBullet("Seguridad de Credenciales:", "Mecanismos de autenticación segura con almacenamiento hash de contraseñas."),

  pHeading2("7.10. Módulo 10: Historial, Auditoría y Recuperación de Operaciones (Memento)"),
  pBullet("Log de Auditoría Transaccional:", "Registro cronológico de todas las órdenes modificadas, comandos ejecutados, fecha y hora exacta, usuario responsable y estado previo/posterior."),
  pBullet("Mecanismo de Deshacer (Undo / Rollback):", "Botón de acción rápida en el historial que permite recuperar el estado previo de un pedido modificado o cancelado por error, restituyendo los datos exactos respaldados en el memento."),

  pHeading2("7.11. Módulo 11: Configuración General del Sistema"),
  pBullet("Preferencias de la Empresa:", "Datos fiscales de la PYME (RUC, Razón Social, Dirección, Moneda Soles S/, Tasa de IGV 18%)."),
  pBullet("Conmutadores de Módulos:", "Ajustes de conectividad con servidores de correo, parámetros de caché del proxy y tiempos de retención de auditoría.")
);

// ==========================================
// 9. IDENTIFICACIÓN Y JUSTIFICACIÓN DE PATRONES
// ==========================================
children.push(
  pHeading1("8. IDENTIFICACIÓN Y JUSTIFICACIÓN TÉCNICA DE PATRONES DE DISEÑO"),
  pBody("Para responder con la máxima solvencia técnica a los requerimientos del caso práctico y alcanzar el nivel Sobresaliente de la rúbrica de evaluación, se ha realizado una articulación precisa de patrones estructurales, de comportamiento y patrones de asignación de responsabilidades GRASP."),
  pHeading2("8.1. Tabla Maestra de Patrones de Diseño"),
  pBody("La siguiente tabla condensa la relación directa entre el problema identificado, la funcionalidad requerida, el patrón seleccionado, su clasificación formal, la modalidad de aplicación arquitectónica y los beneficios tangibles aportados:")
);

// TABLA DE PATRONES SOLICITADA
const patternTableRows = [
  new TableRow({
    tableHeader: true,
    children: [
      makeCell("Problema o Necesidad", { isHeader: true, colWidth: 16 }),
      makeCell("Funcionalidad", { isHeader: true, colWidth: 16 }),
      makeCell("Patrón de Diseño", { isHeader: true, colWidth: 13 }),
      makeCell("Tipo de Patrón", { isHeader: true, colWidth: 13 }),
      makeCell("Cómo se Aplicará en el Sistema", { isHeader: true, colWidth: 22 }),
      makeCell("Beneficio para el Sistema", { isHeader: true, colWidth: 20 }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Incompatibilidad de APIs de pago heterogéneas (PayPal, Yape, Plin).", { isAlt: false }),
      makeCell("Integración de pasarelas y panel de habilitación (RF1, RF2).", { isAlt: false }),
      makeCell("ADAPTER", { isAlt: false, bold: true, color: C_BLUE }),
      makeCell("Estructural", { isAlt: false }),
      makeCell("Se define la interfaz unificada IPaymentGateway con el método processPayment(monto, ref). Se construyen adaptadores concretos (PayPalAdapter, YapeAdapter, PlinAdapter) que transforman las llamadas heterogéneas.", { isAlt: false }),
      makeCell("Desacoplamiento total. El código de ventas desconoce la API específica. Permite añadir nuevas pasarelas o deshabilitarlas sin tocar el flujo comercial.", { isAlt: false }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Riesgo de exposición de datos contables y sobrecarga en reportes pesados.", { isAlt: true }),
      makeCell("Control de acceso y protección de reportes financieros (RF3, RF4).", { isAlt: true }),
      makeCell("PROXY (Protección y Caché)", { isAlt: true, bold: true, color: C_BLUE }),
      makeCell("Estructural", { isAlt: true }),
      makeCell("La interfaz IFinancialReportService es implementada por RealFinancialReportService y por FinancialReportProxy. El proxy valida si el usuario en sesión es Gerente o Contador antes de consultar. Si el reporte ya fue generado recientemente, lo sirve de su caché.", { isAlt: true }),
      makeCell("Seguridad robusta y cumplimiento de menor privilegio. Carga perezosa (lazy loading) y caché en memoria que reduce consultas a la base de datos.", { isAlt: true }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Desabastecimiento y pérdida de ventas por quiebres imprevistos de stock.", { isAlt: false }),
      makeCell("Notificación automática de stock mínimo a Gerente y Compras (RF5, RF6).", { isAlt: false }),
      makeCell("OBSERVER", { isAlt: false, bold: true, color: C_BLUE }),
      makeCell("Comportamiento", { isAlt: false }),
      makeCell("La clase InventorySubject gestiona suscriptores IStockObserver (GerenteStockNotifier, ComprasStockNotifier). Cuando el stock disminuye y cae por debajo del minStock configurado, el sujeto invoca notifyObservers().", { isAlt: false }),
      makeCell("Monitoreo reactivo y en tiempo real. Elimina la necesidad de consultas de sondeo continuo (polling) y asegura compras de reposición a tiempo.", { isAlt: false }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Operaciones de pedido desordenadas, sin cola ni historial auditable.", { isAlt: true }),
      makeCell("Encapsulación de acciones de pedido en historial (RF7).", { isAlt: true }),
      makeCell("COMMAND", { isAlt: true, bold: true, color: C_BLUE }),
      makeCell("Comportamiento", { isAlt: true }),
      makeCell("Cada acción se modela como un objeto que implementa IOrderCommand (CreateOrderCommand, ProcessOrderCommand, ApplyDiscountCommand, CancelOrderCommand). El OrderInvoker encola y ejecuta los comandos registrándolos en un log.", { isAlt: true }),
      makeCell("Trazabilidad completa, desacoplamiento entre el emisor de la orden y el receptor (OrderService), y soporte nativo para encolar o registrar operaciones.", { isAlt: true }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Errores humanos irreversibles y modificaciones que distorsionan la contabilidad.", { isAlt: false }),
      makeCell("Restauración de pedidos a un estado previo (Undo / Rollback) (RF8).", { isAlt: false }),
      makeCell("MEMENTO", { isAlt: false, bold: true, color: C_BLUE }),
      makeCell("Comportamiento", { isAlt: false }),
      makeCell("La clase Order (Originator) genera un snapshot inmutable (OrderMemento) con su estado antes de un cambio crítico. El OrderCaretaker almacena los mementos en una pila de historial y permite invocar restore(memento).", { isAlt: false }),
      makeCell("Reversibilidad confiable sin violar la encapsulación del pedido. Permite deshacer cancelaciones o descuentos erróneos, protegiendo las finanzas.", { isAlt: false }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Rigidez comercial ante cambios de temporada, campañas o demanda variable.", { isAlt: true }),
      makeCell("Soporte y cambio dinámico de estrategias de precios (RF9, RF10).", { isAlt: true }),
      makeCell("STRATEGY", { isAlt: true, bold: true, color: C_BLUE }),
      makeCell("Comportamiento", { isAlt: true }),
      makeCell("Se crea la interfaz IPricingStrategy con el método calculateTotal(order). Se implementan StandardPricingStrategy, PercentageDiscountStrategy y DynamicPricingStrategy. El contexto OrderPricingContext conmuta la estrategia activa.", { isAlt: true }),
      makeCell("Flexibilidad comercial instantánea. Elimina estructuras condicionales masivas (if-else/switch) y permite agregar nuevas políticas con código limpio (Open/Closed).", { isAlt: true }),
    ],
  }),
  new TableRow({
    children: [
      makeCell("Navegación lenta en catálogos grandes y acoplamiento con la estructura de datos.", { isAlt: false }),
      makeCell("Recorrido eficiente del catálogo con filtros y paginación (RF11, RF12).", { isAlt: false }),
      makeCell("ITERATOR", { isAlt: false, bold: true, color: C_BLUE }),
      makeCell("Comportamiento", { isAlt: false }),
      makeCell("Se define la interfaz IIterator con hasNext() y next(). ProductCollection provee el iterador concreto ProductCatalogIterator, aplicando criterios de búsqueda y partición de páginas sin exponer el arreglo o lista interna.", { isAlt: false }),
      makeCell("Navegación veloz y amigable para el usuario. Protege la estructura interna de almacenamiento de productos y optimiza la paginación de datos en memoria.", { isAlt: false }),
    ],
  }),
];

children.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: patternTableRows,
  }),
  pHeading2("8.2. Justificación Técnica y Arquitectónica Detallada (Patrones GoF)"),
  
  pHeading3("8.2.1. Patrón Adapter (Estructural - Control de Pasarelas de Pago)"),
  pBody("El patrón Adapter es fundamental para resolver la dispersión de tecnologías financieras en el Perú. Mientras PayPal utiliza flujos REST con autenticación Bearer y URLs de retorno, Yape opera con validaciones de códigos de aprobación OTP o escaneo QR, y Plin emplea números de celular vinculados a cuentas interbancarias CCI. Implementar condicionales en el código de compras generaría un alto acoplamiento y fragilidad."),
  pBullet("Interfaz común IPaymentGateway:", "Declara el contrato formal: executePayment(PaymentRequest request): PaymentResult."),
  pBullet("Adaptadores concretos:", "PayPalPaymentAdapter, YapePaymentAdapter y PlinPaymentAdapter implementan la interfaz común y traducen la solicitud hacia las librerías nativas de cada proveedor."),
  pBullet("Panel de configuración (RF2):", "La clase PaymentManager mantiene un mapa de adaptadores disponibles y verifica si el método seleccionado se encuentra en estado habilitado antes de procesar el cobro."),

  pHeading3("8.2.2. Patrón Proxy (Estructural - Seguridad, Control de Acceso y Eficiencia)"),
  pBody("Para satisfacer los criterios de nivel Sobresaliente de la rúbrica ('sustituto inteligente para un objeto real, donde se controla el acceso a este y se permite añadir funcionalidades de carga perezosa y/o caché'), el patrón Proxy se implementa como un intermediario transparente frente al servicio de reportería financiera:"),
  pBullet("Control de Acceso (Protection Proxy):", "La clase FinancialReportProxy intercepta cada solicitud de generación de reportes. Consulta el contexto de seguridad del usuario autenticado; si el rol no es 'Gerente' ni 'Contador', deniega la operación con un error 403 Forbidden y audita la infracción."),
  pBullet("Carga Perezosa (Lazy Loading):", "El objeto costoso RealFinancialReportService no se instancia en memoria hasta que un usuario autorizado realiza una petición real."),
  pBullet("Caché en Memoria (Virtual / Cache Proxy):", "Los reportes financieros mensuales no cambian segundo a segundo. El proxy almacena los reportes previamente calculados en una estructura de caché temporal con clave (rangoFechas_tipoReporte), evitando sobrecargar la base de datos con consultas SQL pesadas."),

  pHeading3("8.2.3. Patrón Observer (Comportamiento - Alertas Reactivas de Inventario)"),
  pBody("La gestión tradicional basada en encuestas continuas (polling de base de datos) desperdicia recursos de cómputo y no garantiza inmediatez. Con Observer, se establece un patrón de comunicación reactiva uno a muchos:"),
  pBullet("Sujeto (InventorySubject / Product):", "Mantiene la cantidad actual de stock y el atributo minStock (configurable de forma independiente por cada producto, cumpliendo RF6). Al concretarse una venta, se descuentan unidades; si el nuevo stock es menor o igual a minStock, se gatilla el evento de notificación."),
  pBullet("Observadores suscritos:", "GerenteNotificationObserver (envía una alerta al panel ejecutivo y notificación push) y ComprasNotificationObserver (registra una tarea de reposición y envía un correo con el SKU y proveedor sugerido)."),

  pHeading3("8.2.4. Patrón Command (Comportamiento - Encapsulación y Cola de Pedidos)"),
  pBody("Cada transición en el ciclo de vida de un pedido se convierte en un objeto independiente que encapsula la acción, los parámetros y el receptor:"),
  pBullet("Comandos concretos:", "CreateOrderCommand, ProcessPaymentOrderCommand, ApplyDiscountCommand, CancelOrderCommand."),
  pBullet("OrderHistoryManager (Invocador y Auditor):", "Mantiene una lista cronológica de todos los comandos ejecutados. Esto permite que el sistema cumpla con RF7, otorgando auditoría completa de quién emitió cada orden y encolando transacciones para procesamiento asíncrono si el servidor presenta alta demanda."),

  pHeading3("8.2.5. Patrón Memento (Comportamiento - Mecanismo de Deshacer / Rollback)"),
  pBody("Para mitigar los errores operativos de cancelación o descuentos indebidos (RF8), se implementa Memento sin exponer los campos privados del pedido:"),
  pBullet("Originator (Order):", "Posee los métodos saveStateToMemento(): OrderMemento y restoreStateFromMemento(OrderMemento memento)."),
  pBullet("Memento (OrderMemento):", "Objeto inmutable que almacena una copia exacta de los atributos del pedido (estado, líneas de pedido, total, descuentos aplicados, fecha de modificación)."),
  pBullet("Caretaker (OrderHistoryCaretaker):", "Almacena los mementos ordenados por ID de pedido. Si el usuario hace clic en 'Deshacer Acción', el Caretaker entrega el memento previo al Pedido para que restaure su estado atómicamente."),

  pHeading3("8.2.6. Patrón Strategy (Comportamiento - Motor de Políticas de Precios)"),
  pBody("El cálculo comercial de precios requiere alta elasticidad para responder a promociones locales sin modificar el código fuente de facturación:"),
  pBullet("Interfaz IPricingStrategy:", "Declara el método calculateFinalPrice(basePrice, quantity, orderContext): BigDecimal."),
  pBullet("Estrategias Concretas:", "StandardPricingStrategy (precio catálogo * cantidad), PercentageDiscountStrategy (aplica descuento porcentual configurable, ej. 15%), y DynamicPricingStrategy (aplica factores dinámicos por demanda o temporada alta, ej. Cyber Day)."),
  pBullet("Contexto y Selección (RF10):", "OrderContext mantiene una referencia polimórfica a IPricingStrategy. Desde el panel de administración, el usuario conmutará la estrategia activa en tiempo de ejecución sin reiniciar la aplicación."),

  pHeading3("8.2.7. Patrón Iterator (Comportamiento - Exploración Eficiente del Catálogo)"),
  pBody("A fin de cumplir con RF11 y RF12 ('recorrer el catálogo utilizando un iterador con soporte para paginación y filtros, sin exponer la estructura interna'):"),
  pBullet("Separación de responsabilidades:", "La clase ProductCatalog actúa como el agregado concreto que custodia los productos. En lugar de retornar un arreglo o lista interna modificable (lo cual violaría el encapsulamiento), retorna una instancia de ProductIterator."),
  pBullet("Soporte para filtros y páginas:", "El iterador encapsula los punteros de paginación (offset, limit) y los predicados de búsqueda (categoría, texto coincidente), entregando únicamente los elementos que deben pintarse en la pantalla actual."),

  pHeading2("8.3. Justificación y Aplicación de Patrones GRASP (Nivel Sobresaliente)"),
  pBody("En estricto cumplimiento con la rúbrica de evaluación de Zegel, la arquitectura integra los patrones generales de asignación de responsabilidades GRASP:"),
  pBullet("1. Controlador (Controller):", "Se definen controladores especializados (OrderController, InventoryController, FinancialReportController) que reciben los eventos de la interfaz de usuario y delegan el trabajo a los servicios del dominio. Esto evita que la interfaz gráfica se acople a la lógica de negocio."),
  pBullet("2. Experto en Información (Information Expert):", "La responsabilidad de calcular el total de un pedido se asigna a la clase Order, pues es la que posee la colección de líneas de pedido (OrderItem) y sus cantidades. De igual forma, la clase Product es la experta en verificar si su stock actual es menor a su umbral mínimo."),
  pBullet("3. Creador (Creator):", "La clase Order es la creadora natural de los objetos OrderItem, dado que los agrega, contiene y gestiona estrechamente su ciclo de vida."),
  pBullet("4. Bajo Acoplamiento (Low Coupling):", "Mediante interfaces (IPaymentGateway, IFinancialReportService, IPricingStrategy), los módulos se comunican sin conocer implementaciones concretas, reduciendo drásticamente el impacto de cambios futuros."),
  pBullet("5. Alta Cohesión (High Cohesion):", "Cada clase posee una única responsabilidad bien acotada: PaymentManager solo gestiona pasarelas; InventorySubject solo monitorea niveles de stock; OrderMemento solo custodia el estado histórico."),
  pBullet("6. Polimorfismo (Polymorphism):", "El cálculo de precios y el cobro en pasarelas se resuelven mediante invocaciones polimórficas a interfaces, erradicando cadenas anidadas de sentencias 'if (tipo == PAYPAL) ... else if (tipo == YAPE)'."),
  pBullet("7. Fabricación Pura (Pure Fabrication):", "Clases como FinancialReportProxy, OrderInvoker o PaymentManager no representan conceptos del mundo real del comercio, sino artefactos técnicos creados para mantener la cohesión y el desacoplamiento."),
  pBullet("8. Indirección (Indirection):", "El adaptador de pagos y el proxy actúan como mediadores entre el cliente y los componentes reales, protegiendo al sistema de dependencias directas."),
  pBullet("9. Variaciones Protegidas (Protected Variations):", "Los puntos de inestabilidad externa (como los cambios en las APIs de Yape, Plin o PayPal) se encapsulan detrás de la interfaz común IPaymentGateway, aislando el núcleo de la aplicación.")
);

// ==========================================
// 10. ALCANCE DEL PROYECTO
// ==========================================
children.push(
  pHeading1("9. ALCANCE DEL PROYECTO"),
  pHeading2("9.1. Alcance Funcional Incluido en la Etapa"),
  pBullet("Definición Conceptual y Arquitectónica:", "Modelado exhaustivo de todos los casos de uso, especificación de requerimientos funcionales (RF1 al RF12) y diagramación conceptual de interacción de clases."),
  pBullet("Diseño de Experiencia de Usuario (UX/UI):", "Diseño completo de wireframes y prototipos interactivos en alta fidelidad con 11 pantallas maestras y 8 flujos de navegación funcional."),
  pBullet("Gobernanza de Patrones:", "Validación teórica y técnica de la aplicación de Adapter, Proxy, Observer, Command, Memento, Strategy, Iterator y principios GRASP."),
  pHeading2("9.2. Límites y Exclusiones de la Presente Etapa"),
  pBullet("Fase de Programación y Backend:", "En estricto apego a las instrucciones de la evaluación final, no se incluye en esta entrega la codificación Java Spring, conexión a bases de datos relacionales ni pruebas unitarias (los cuales corresponden a las etapas 3 y 4 posteriores)."),
  pBullet("Facturación Electrónica SUNAT:", "La emisión formal de comprobantes electrónicos tributarios (XML UBL 2.1 con certificado digital) no forma parte de este prototipo inicial."),
  pBullet("Dispositivos POS Físicos:", "El alcance se enfoca en transacciones web digitales (QR, token, móvil), excluyendo la integración con hardware de datáfonos físicos.")
);

// ==========================================
// 11. BENEFICIOS ESPERADOS DEL SISTEMA
// ==========================================
children.push(
  pHeading1("10. BENEFICIOS ESPERADOS DEL SISTEMA"),
  pBody("La implementación de la plataforma generará beneficios cuantitativos y cualitativos para las PYMES peruanas en siete dimensiones esenciales:"),
  pBullet("1. Seguridad:", "Protección estricta de la información financiera estratégica mediante el patrón Proxy y control RBAC. Los datos de ingresos, costos y márgenes de ganancia quedan blindados frente a visualizaciones no autorizadas."),
  pBullet("2. Eficiencia:", "Optimización en el tiempo de respuesta de la plataforma gracias a la navegación paginada del catálogo (Iterator) y la reutilización de consultas pesadas mediante la caché inteligente del proxy."),
  pBullet("3. Escalabilidad:", "Capacidad de incorporar nuevas billeteras digitales peruanas (ej. Tunki, Agora, KasNet) o pasarelas internacionales sin reescribir la lógica de facturación, gracias al desacoplamiento del patrón Adapter."),
  pBullet("4. Usabilidad:", "Experiencia de navegación fluida, diseño profesional e intuitivo con estándares de comercio electrónico moderno en moneda local (Soles S/), pensado para operadores con habilidades digitales básicas."),
  pBullet("5. Automatización:", "Supresión de chequeos manuales de existencias. El patrón Observer garantiza que Compras y Gerencia reciban alertas en el instante exacto en que un SKU se aproxima al quiebre de stock."),
  pBullet("6. Flexibilidad:", "Capacidad de reaccionar en minutos a campañas de descuento o temporadas comerciales cambiando la estrategia de precios desde el panel de control, sin desplegar nuevas versiones de software."),
  pBullet("7. Confiabilidad:", "Eliminación de la frustración por errores de digitación. La combinación de Command y Memento provee trazabilidad histórica completa y la posibilidad de revertir operaciones equivocadas sin descuadres contables.")
);

// ==========================================
// 12. CONCLUSIONES Y RECOMENDACIONES ACADÉMICAS
// ==========================================
children.push(
  pHeading1("11. CONCLUSIONES Y RECOMENDACIONES ACADÉMICAS"),
  pHeading2("11.1. Conclusiones"),
  pBullet("1. Diagnóstico preciso de la realidad PYME:", "Las micro y pequeñas empresas peruanas no fracasan en su digitalización por falta de demanda comercial, sino por el desorden operativo interno derivado del uso de herramientas desarticuladas y la carencia de trazabilidad transaccional."),
  pBullet("2. Valor estratégico de los patrones de diseño:", "Los patrones GoF seleccionados no son meros artefactos teóricos, sino soluciones probadas de ingeniería de software que resuelven de forma elegante, escalable y mantenible los dolores críticos del negocio (incompatibilidad de pagos, seguridad financiera, quiebres de inventario y errores humanos)."),
  pBullet("3. Cumplimiento exhaustivo de requerimientos:", "La propuesta articula con precisión quirúrgica los doce requerimientos funcionales (RF1 a RF12) establecidos en la evaluación final de Zegel, garantizando una base conceptual inexpugnable para las fases posteriores de programación."),
  pBullet("4. Sinergia entre patrones estructurales y de comportamiento:", "La interacción armónica de Adapter, Proxy, Observer, Command, Memento, Strategy e Iterator, reforzada por los lineamientos GRASP, demuestra que una arquitectura limpia previene la deuda técnica y garantiza la sostenibilidad del software en el tiempo."),

  pHeading2("11.2. Recomendaciones Académicas"),
  pBullet("1. Continuidad metodológica en el prototipado (Punto 2):", "Asegurar que los wireframes y pantallas interactivas reflejen con absoluta fidelidad visual los componentes de control derivados de los patrones (interruptores de pasarelas, conmutador de precios, historial de deshacer y centro de alertas)."),
  pBullet("2. Preservación del desacoplamiento en la fase de código (Punto 3 y 4):", "Al momento de programar en Java Spring, implementar rigurosamente interfaces Java separadas y aplicar inyección de dependencias para materializar los adaptadores, comandos y observadores diseñados."),
  pBullet("3. Pruebas de usabilidad orientadas a perfiles reales:", "Validar los flujos de trabajo con usuarios reales de pequeños negocios para comprobar que la interfaz simplifique efectivamente la operatividad diaria sin generar fricción cognitiva.")
);

// CONSTRUCCIÓN DEL DOCUMENTO DOCX CON METADATOS Y PIE DE PÁGINA
const doc = new Document({
  creator: "Estefanía Orellana del Castillo & Fabiola Cadillo Córdova",
  title: "TechSolutions - Evaluación Final Punto 1",
  description: "Documento formal académico para el curso de Patrones de Diseño de Software - Zegel",
  styles: {
    default: {
      document: {
        run: {
          font: "Segoe UI",
          size: 21,
          color: C_TEXT,
        },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 1440,    // 1 pulgada = 2.54 cm
            bottom: 1440,
            left: 1440,
            right: 1440,
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: "TechSolutions S.A. | Patrones de Diseño de Software – Zegel",
                  size: 16,
                  color: C_MUTED,
                  font: "Segoe UI",
                  italics: true,
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "Página ",
                  size: 16,
                  color: C_MUTED,
                  font: "Segoe UI",
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  size: 16,
                  bold: true,
                  color: C_NAVY,
                  font: "Segoe UI",
                }),
                new TextRun({
                  text: " de ",
                  size: 16,
                  color: C_MUTED,
                  font: "Segoe UI",
                }),
                new TextRun({
                  children: [PageNumber.TOTAL_PAGES],
                  size: 16,
                  color: C_MUTED,
                  font: "Segoe UI",
                }),
              ],
            }),
          ],
        }),
      },
      children: children,
    },
  ],
});

const outputPath = path.join(__dirname, 'Documentacion', 'TechSolutions_Punto1_Definicion_Problema.docx');

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log("Documento Word (.docx) generado exitosamente en:", outputPath);
}).catch((err) => {
  console.error("Error al generar el documento:", err);
});
