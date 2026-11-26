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

console.log("Iniciando la construcción del documento académico formal...");

const docChildren = [];

// ==========================================
// 1. PORTADA ACADÉMICA
// ==========================================
docChildren.push(
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
    spacing: { before: 0, after: 500 },
    children: [
      new TextRun({
        text: "Punto 1: Definición del Problema, Necesidades de Usuarios, Requerimientos Funcionales y Justificación Arquitectónica de Patrones GoF y GRASP",
        size: 20,
        font: "Segoe UI",
        italics: true,
        color: C_MUTED,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 300, after: 60 },
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
    spacing: { before: 0, after: 400 },
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
    spacing: { before: 40, after: 450 },
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
    spacing: { before: 200, after: 40 },
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
docChildren.push(
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
docChildren.push(
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
docChildren.push(
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

console.log("Secciones 1 a 3 construidas con éxito.");
