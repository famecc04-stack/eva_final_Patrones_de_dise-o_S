const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, HeadingLevel, BorderStyle, ShadingType,
  Header, Footer, PageNumber, NumberFormat, PageBreak
} = require('docx');

const C_NAVY = "0F172A";
const C_BLUE = "1D4ED8";
const C_BLUE_LIGHT = "EFF6FF";
const C_CRIMSON = "E11D48";
const C_TEXT = "1E293B";
const C_MUTED = "475569";
const C_BORDER = "CBD5E1";
const C_BG_ALT = "F8FAFC";
const C_WHITE = "FFFFFF";

const standardBorder = {
  top: { style: BorderStyle.SINGLE, size: 1, color: C_BORDER },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: C_BORDER },
  left: { style: BorderStyle.SINGLE, size: 1, color: C_BORDER },
  right: { style: BorderStyle.SINGLE, size: 1, color: C_BORDER },
};

function pTitle(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 120 },
    run: { size: 32, bold: true, color: C_NAVY, font: "Segoe UI" }
  });
}

function pHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 320, after: 120 },
    run: { size: 24, bold: true, color: C_BLUE, font: "Segoe UI" }
  });
}

function pHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    run: { size: 20, bold: true, color: C_NAVY, font: "Segoe UI" }
  });
}

function pBody(text) {
  return new Paragraph({
    text: text,
    spacing: { before: 50, after: 80 },
    alignment: AlignmentType.JUSTIFY,
    run: { size: 21, color: C_TEXT, font: "Segoe UI" }
  });
}

function pSpeaker(speaker, speech) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [
      new TextRun({ text: "🎤 " + speaker + ": ", bold: true, color: speaker.includes("Estefanía") ? C_CRIMSON : C_BLUE, size: 21, font: "Segoe UI" }),
      new TextRun({ text: "«" + speech + "»", italic: true, color: C_TEXT, size: 21, font: "Segoe UI" })
    ]
  });
}

function pBullet(boldPrefix, text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 30, after: 50 },
    children: [
      new TextRun({ text: boldPrefix + " ", bold: true, color: C_NAVY, size: 21, font: "Segoe UI" }),
      new TextRun({ text: text, color: C_TEXT, size: 21, font: "Segoe UI" })
    ]
  });
}

const slides = [
  {
    num: "Diapositiva 1",
    title: "Portada y Presentación del Equipo",
    content: "Título: TechSolutions – Plataforma de Gestión Empresarial Integral.\nCurso: Patrones de Diseño de Software | Institución: Zegel.\nIntegrantes: Estefanía Orellana del Castillo y Fabiola Cadillo Córdova.\nEmpresa del caso: TechSolutions S.A. (Lima, Perú).",
    speaker: "Estefanía Orellana",
    speech: "Buenas noches, profesor y compañeros. Mi nombre es Estefanía Orellana y junto a mi compañera Fabiola Cadillo presentamos hoy la sustentación final de nuestro proyecto 'TechSolutions: Plataforma de Gestión Empresarial'. Este sistema fue concebido para resolver las problemáticas reales y operativas de las PYMES en el Perú, aplicando una arquitectura limpia basada en patrones de diseño GoF y principios GRASP."
  },
  {
    num: "Diapositiva 2",
    title: "El Problema de las PYMES en el Perú",
    content: "7 Problemas Críticos identificados en el caso de estudio:\n1. Incompatibilidad de pasarelas de pago (PayPal, Yape, Plin).\n2. Fugas de información en reportes financieros.\n3. Quiebres de stock sin alertas automáticas.\n4. Errores operativos en pedidos sin opción de deshacer.\n5. Precios rígidos sin soporte dinámico.\n6. Catálogos lentos y difíciles de navegar.\n7. Falta de control de roles y accesos seguros.",
    speaker: "Fabiola Cadillo",
    speech: "Tal como indica el enunciado, las pequeñas y medianas empresas enfrentan graves cuellos de botella: pierden clientes por no contar con métodos de pago populares como Yape o Plin; filtran reportes confidenciales a personal no autorizado; sufren quiebres de inventario porque nadie les avisa a tiempo; y si un operador comete un error en un pedido, no hay forma de deshacer el cambio. Nuestra misión fue diseñar una solución integral que ataque cada uno de estos 7 problemas de raíz."
  },
  {
    num: "Diapositiva 3",
    title: "Objetivos y Alcance del Sistema",
    content: "Objetivo General: Desarrollar una plataforma modular y escalable para ventas, pagos, inventario y reportes.\nObjetivos Específicos:\n- Integrar múltiples pasarelas con un adaptador común.\n- Proteger reportes mediante proxies con caché.\n- Automatizar notificaciones de stock mínimo con observadores.\n- Encapsular acciones y permitir rollback de estados.\n- Proveer estrategias de precios flexibles y catálogo paginado.",
    speaker: "Estefanía Orellana",
    speech: "Definimos un objetivo general claro: construir una plataforma modular, confiable y segura. Nuestros objetivos específicos se alinean directamente con los 12 requerimientos funcionales del caso. Para lograrlo, no bastaba con programar código aislado; requeríamos una ingeniería de software estructurada, donde cada patrón de diseño cumpliera un rol concreto y medible en la solución."
  },
  {
    num: "Diapositiva 4",
    title: "Arquitectura General de la Solución",
    content: "Arquitectura en Capas desacopladas:\n- Capa de Presentación: UI moderna empresarial (Figma + Web HTML5/Tailwind).\n- Capa de Control y Casos de Uso: Controladores GRASP.\n- Capa de Dominio y Negocio: Patrones GoF Estructurales y de Comportamiento.\n- Capa de Infraestructura: Spring Boot 3.2.0, pasarelas externas simuladas y persistencia.",
    speaker: "Fabiola Cadillo",
    speech: "Nuestra arquitectura adopta un enfoque desacoplado por capas. En la presentación, diseñamos 11 pantallas vectoriales a 1440 por 900 píxeles. En la capa de aplicación, utilizamos los principios GRASP para coordinar los flujos sin acoplarnos a la interfaz. Y en el núcleo de dominio, implementamos 7 patrones GoF que encapsulan la lógica de pagos, reportes, inventario, pedidos y catálogo."
  },
  {
    num: "Diapositiva 5",
    title: "Demostración de Wireframes y Prototipo en Figma (Punto 2)",
    content: "11 Pantallas diseñadas en Figma:\n01. Login | 02. Dashboard | 03. Catálogo (Iterator) | 04. Inventario (Observer) | 05. Pedidos (Command) | 06. Pagos (Adapter) | 07. Precios (Strategy) | 08. Reportes (Proxy) | 09. Usuarios (RBAC) | 10. Historial (Memento) | 11. Configuración.\n39 Interacciones con transiciones inteligentes y 2 Flow Starting Points.",
    speaker: "Estefanía Orellana",
    speech: "En el Punto 2, construimos el prototipo interactivo en Figma con 11 pantallas completas, datos en soles peruanos y 39 reacciones de navegación. El flujo permite al usuario iniciar sesión, explorar productos, recibir la alerta de stock, procesar un pedido, pagar con Yape o PayPal, y lo más destacado: anular una orden y hacer clic en 'Deshacer' para restaurar su estado anterior mediante el patrón Memento."
  },
  {
    num: "Diapositiva 6",
    title: "Patrón Estructural: Adapter (RF1, RF2)",
    content: "Problema: Incompatibilidad entre APIs de PayPal (USD/Email), Yape (Celular/OTP) y Plin (QR Interbancario).\nSolución Adapter:\n- Interfaz común: PaymentGatewayTarget.\n- Adapters concretos: PayPalAdapter, YapeAdapter, PlinAdapter.\n- Panel de configuración (RF2): PaymentGatewayManager permite habilitar/deshabilitar pasarelas en caliente.",
    speaker: "Fabiola Cadillo",
    speech: "Pasando a los patrones estructurales, el primero es el Adapter. PayPal pide correos y dólares; Yape pide número celular y código de aprobación; Plin utiliza transferencias interbancarias. Mediante la interfaz común PaymentGatewayTarget, nuestro sistema procesa cualquier pasarela de manera uniforme. Además, cumpliendo con el requerimiento RF2, creamos PaymentGatewayManager, que permite al administrador activar o desactivar pasarelas con un solo clic."
  },
  {
    num: "Diapositiva 7",
    title: "Patrón Estructural: Proxy (RF3, RF4)",
    content: "Problema: Fugas de información financiera y lentitud por consultas analíticas pesadas.\nSolución Proxy Inteligente:\n- Control RBAC (RF3, RF4): Solo GERENTE y CONTADOR pueden acceder; otros roles son bloqueados.\n- Lazy Loading: RealFinancialReportService solo se instancia cuando la petición es autorizada.\n- Caché en Memoria (TTL 300s): Respuestas inmediatas durante 5 minutos.",
    speaker: "Estefanía Orellana",
    speech: "El segundo patrón estructural es el Proxy. Para satisfacer los requerimientos RF3 y RF4, FinancialReportProxy actúa como un sustituto inteligente. Primero, valida el rol del usuario: si un vendedor o encargado de compras intenta entrar, se dispara una excepción de seguridad. Segundo, aplica carga perezosa para no inicializar servicios pesados innecesariamente. Y tercero, almacena en caché las respuestas por 300 segundos, reduciendo drásticamente la carga del servidor."
  },
  {
    num: "Diapositiva 8",
    title: "Patrón de Comportamiento: Observer (RF5, RF6)",
    content: "Problema: Pérdida de ventas por falta de avisos de stock mínimo.\nSolución Observer:\n- Subject: InventoryStockSubject monitorea existencias.\n- Observers: ManagerStockNotifier y ProcurementStockNotifier.\n- Umbral configurable (RF6): Cada producto tiene su propio stockMinimo.\n- Notificación automática (RF5): Notifica a Gerencia y a Compras en el mismo instante.",
    speaker: "Fabiola Cadillo",
    speech: "En los patrones de comportamiento, el patrón Observer resuelve las alertas de inventario. En InventoryStockSubject registramos dos observadores: el Notificador Gerencial y el Notificador de Compras. En cuanto una venta hace que el stock caiga por debajo del umbral mínimo, ambos roles son notificados de manera automática y desacoplada, permitiendo reponer mercadería antes de perder ventas."
  },
  {
    num: "Diapositiva 9",
    title: "Patrones de Comportamiento: Command y Memento (RF7, RF8)",
    content: "Problema: Acciones operativas desordenadas y modificaciones accidentales irreversibles.\nSolución Combinada:\n- Command (RF7): Acciones encapsuladas en ProcessOrderCommand y CancelOrderCommand con registro de auditoría en OrderCommandInvoker.\n- Memento (RF8): OrderOriginator captura snapshots inmutables guardados en OrderCaretaker.\n- Botón Deshacer (Undo): Restaura el estado previo exacto del pedido.",
    speaker: "Estefanía Orellana",
    speech: "Una de las joyas del sistema es la integración entre Command y Memento. Con Command, cada acción del pedido se convierte en un objeto que se guarda en el historial de transacciones. Y con Memento, guardamos una 'fotografía inmutable' del pedido justo antes de modificarlo. Si un operador cancela una orden por error, simplemente presiona 'Deshacer' y el memento restaura el estado previo intacto."
  },
  {
    num: "Diapositiva 10",
    title: "Patrón de Comportamiento: Strategy (RF9, RF10)",
    content: "Problema: Precios rígidos que no se adaptan a promociones o compras mayoristas.\nSolución Strategy:\n- Estrategias: StandardPricing, PercentageDiscount (promocional) y DynamicPricing (escalonado: 10%, 15% y 25% por volumen).\n- Conmutación en Runtime (RF10): PricingContext.setStrategy() cambia la regla global al instante desde el panel de control.",
    speaker: "Fabiola Cadillo",
    speech: "El patrón Strategy nos da flexibilidad total en la política de precios. Implementamos tres estrategias: Precio Estándar, Descuento Porcentual y Precio Dinámico por Volumen para compras al por mayor. A través de PricingContext, el administrador puede cambiar la política de precios de toda la tienda en tiempo de ejecución sin alterar el resto del código."
  },
  {
    num: "Diapositiva 11",
    title: "Patrón de Comportamiento: Iterator (RF11, RF12)",
    content: "Problema: Catálogo pesado que expone colecciones internas y lentitud de navegación.\nSolución Iterator:\n- Agregado: ProductCatalog almacena productos de forma privada sin exponer listas (RF12).\n- Iterador: ProductCatalogIterator soporta filtros por categoría y paginación bajo demanda (RF11).\n- Recorrido eficiente de grandes volúmenes de datos.",
    speaker: "Estefanía Orellana",
    speech: "Para el catálogo de productos aplicamos el patrón Iterator. ProductCatalog encapsula el almacenamiento de datos sin exponer listas internas, cumpliendo el requerimiento RF12. Y ProductCatalogIterator permite filtrar por categoría y paginar los resultados en bloques de productos, optimizando la memoria y la velocidad de respuesta en la pantalla de la PYME."
  },
  {
    num: "Diapositiva 12",
    title: "Patrones GRASP para Alta Cohesión y Bajo Acoplamiento",
    content: "Asignación de Responsabilidades GRASP:\n- Controller: OrderController centraliza la lógica de casos de uso de venta.\n- Information Expert: OrderPriceExpert calcula impuestos (IGV 18% SUNAT).\n- Creator: OrderFactory instancia órdenes y productos desacopladamente.\n- Pure Fabrication: InventoryAuditLogger gestiona la bitácora sin ensuciar el dominio.",
    speaker: "Fabiola Cadillo",
    speech: "Para alcanzar el nivel Sobresaliente de la rúbrica, aplicamos también los patrones GRASP. OrderController centraliza los eventos del sistema; OrderPriceExpert calcula el IGV del 18% por ser el experto en información de precios; OrderFactory se encarga de crear las órdenes; y InventoryAuditLogger es una invención pura que asegura la auditoría sin sobrecargar a las entidades del negocio."
  },
  {
    num: "Diapositiva 13",
    title: "Pruebas Unitarias y Automatización (Punto 4)",
    content: "Validación de Calidad de Software:\n- 22 Pruebas Unitarias construidas en JUnit 5 y Test Runner nativo.\n- Cobertura: 100% de los requerimientos RF1 al RF12.\n- Resultados: 22 aprobadas, 0 fallos, 0 errores.\n- Verificación de casos límite, excepciones de seguridad y rendimiento de caché.",
    speaker: "Estefanía Orellana",
    speech: "En el Punto 4 desarrollamos una suite de 22 pruebas unitarias automatizadas con JUnit 5. Validamos que PayPal convierta la moneda; que Yape y Plin generen comprobantes; que el Proxy lance excepciones ante usuarios no autorizados; que el Memento revierta pedidos; y que el Iterator filtre correctamente. Todas las 22 pruebas pasan al 100% de forma exitosa."
  },
  {
    num: "Diapositiva 14",
    title: "Pruebas de Usabilidad y Mejoras Implementadas",
    content: "Resultados de la Evaluación UX:\n- 5 Participantes representativos de los 5 roles del caso.\n- Puntaje SUS obtenido: 88.5 / 100 (Grado A - Excelente).\n- Mejoras Aplicadas:\n  1. Modal de confirmación y badge de estado previo en Memento.\n  2. Botón de reposición rápida dentro de alerta Observer.\n  3. Conversión visible PEN a USD en Adapter PayPal.\n  4. Indicador de tiempo de caché en Proxy.",
    speaker: "Fabiola Cadillo",
    speech: "Evaluamos el prototipo con 5 usuarios en un test de usabilidad formal. Obtuvimos un puntaje SUS de 88.5 sobre 100, equivalente a una calificación Excelente. A partir del feedback de los usuarios, aplicamos cuatro mejoras clave: aclaramos la conversión de divisas en PayPal, agregamos un botón de compra rápida en las alertas de inventario y transparentamos la vigencia de la caché en los reportes."
  },
  {
    num: "Diapositiva 15",
    title: "Conclusiones y Ronda de Preguntas",
    content: "Conclusiones Finales:\n- Se completaron los 5 puntos de la Rúbrica de Evaluación Final.\n- La arquitectura basada en patrones asegura escalabilidad, seguridad y alta mantenibilidad.\n- TechSolutions está lista para impulsar la transformación digital de las PYMES peruanas.\n\n¡Muchas gracias por su atención! Quedamos atentas a sus preguntas.",
    speaker: "Estefanía Orellana y Fabiola Cadillo",
    speech: "En conclusión, el proyecto TechSolutions demuestra que los patrones de diseño no son teoría abstracta, sino soluciones concretas a problemas de negocio reales. Hemos completado con rigor los 5 puntos de la rúbrica de Zegel, entregando documentación académica, prototipo interactivo en Figma, backend Java y pruebas unitarias completas. Muchas gracias por su atención y quedamos a su disposición para resolver cualquier pregunta."
  }
];

const children = [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "INSTITUCIÓN EDUCATIVA SUPERIOR ZEGEL", bold: true, color: C_CRIMSON, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 200 }, children: [new TextRun({ text: "PATRONES DE DISEÑO DE SOFTWARE | EVALUACIÓN FINAL", bold: true, color: C_MUTED, size: 20 })] }),
  pTitle("GUION DE SUSTENTACIÓN ORAL Y ESTRUCTURA DE DIAPOSITIVAS (PUNTO 5)"),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 300 }, children: [new TextRun({ text: "Plataforma TechSolutions S.A. | Presentación Técnica de Alto Impacto", bold: true, color: C_BLUE, size: 22 })] }),

  new Table({
    width: { size: 9360, type: WidthType.DXA },
    alignment: AlignmentType.CENTER,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: standardBorder,
            shading: { type: ShadingType.CLEAR, fill: C_BLUE_LIGHT },
            children: [
              pBullet("Integrantes del Equipo:", "1. Orellana del Castillo, Estefanía  |  2. Cadillo Córdova, Fabiola"),
              pBullet("Estructura de la Exposición:", "15 Diapositivas estructuradas con contenido visual y guion verbal palabra por palabra"),
              pBullet("Duración Estimada:", "12 a 15 minutos de presentación formal + 5 minutos de preguntas"),
              pBullet("Distribución de Turnos:", "Alternancia equilibrada al 50% entre ambas integrantes")
            ]
          })
        ]
      })
    ]
  }),
  new Paragraph({ spacing: { before: 200, after: 200 } })
];

slides.forEach(s => {
  children.push(pHeading1(`${s.num}: ${s.title}`));
  children.push(new Paragraph({
    spacing: { before: 40, after: 80 },
    children: [
      new TextRun({ text: "📋 Contenido Visual Recomendado para la Diapositiva:", bold: true, color: C_NAVY, size: 20, font: "Segoe UI" })
    ]
  }));
  children.push(pBody(s.content));
  children.push(pSpeaker(s.speaker, s.speech));
  children.push(new Paragraph({ spacing: { before: 100, after: 150 }, children: [new TextRun({ text: "─────────────────────────────────────────────────────────────", color: C_BORDER, size: 16 })] }));
});

const doc = new Document({
  styles: { default: { document: { run: { font: "Segoe UI", size: 21 } } } },
  sections: [{
    properties: {
      page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "TechSolutions S.A. | Guion de Sustentación Oral (Punto 5)", color: C_MUTED, size: 17 })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Página ", color: C_MUTED, size: 18 }),
            new TextRun({ children: [PageNumber.CURRENT], color: C_MUTED, size: 18 }),
            new TextRun({ text: " de ", color: C_MUTED, size: 18 }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], color: C_MUTED, size: 18 })
          ]
        })]
      })
    },
    children: children
  }]
});

const outputPath = path.join(__dirname, 'Documentacion', 'TechSolutions_Guion_Diapositivas_Sustentacion.docx');
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log('Documento Word de Guion y Diapositivas generado: ' + outputPath);
});
