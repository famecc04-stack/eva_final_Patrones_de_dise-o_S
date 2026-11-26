# GUÍA DE IMPORTACIÓN Y CONEXIÓN INTERACTIVA EN FIGMA
## TECHSOLUTIONS – PLATAFORMA DE GESTIÓN EMPRESARIAL
**Curso:** Patrones de Diseño de Software | **Institución:** Zegel  
**Integrantes:** Estefanía Orellana del Castillo & Fabiola Cadillo Córdova  

---

### 1. ESTRUCTURA DE LAS 11 PANTALLAS VECTORIALES (1440 x 900 px)

En la carpeta `prototipo_interactivo/wireframes_figma/` dispones de los 11 archivos vectoriales listos para Figma:

1. `01_Inicio_Sesion.svg`: Pantalla de Login con selección de rol RBAC (Gerente, Contador, Admin, Compras, Vendedor).
2. `02_Dashboard_Principal.svg`: Tablero general con 4 KPIs (Soles S/), gráfico de ventas, accesos rápidos y pedidos recientes.
3. `03_Gestion_Productos_Iterator.svg`: Catálogo desacoplado con el patrón Iterator (RF11, RF12), buscador y paginación.
4. `04_Inventario_Alertas_Observer.svg`: Módulo de inventario con stock mínimo configurable (RF6) y alertas a Gerente/Compras (RF5).
5. `05_Gestion_Pedidos_Command.svg`: Ciclo de pedidos encapsulados como comandos (RF7) con estados y acciones.
6. `06_Procesamiento_Pagos_Adapter.svg`: Panel de pasarelas unificadas (PayPal, Yape, Plin) mediante `IPaymentGateway` (RF1, RF2).
7. `07_Configuracion_Precios_Strategy.svg`: Selector de políticas de precios comercial (Estándar, Descuento 15%, Dinámico +10%) (RF9, RF10).
8. `08_Reportes_Financieros_Proxy.svg`: Reporte financiero protegido por Proxy con control RBAC y caché (RF3, RF4).
9. `09_Usuarios_Roles_RBAC.svg`: Directorio de colaboradores con asignación de roles y permisos del Proxy.
10. `10_Historial_Operaciones_Memento.svg`: Registro de auditoría de comandos con botón "Deshacer (Memento Rollback)" (RF8).
11. `11_Configuracion_General.svg`: Preferencias de la empresa (RUC, Moneda PEN S/, IGV 18%, parámetros de caché).

---

### 2. PASO A PASO PARA IMPORTAR EN FIGMA

1. Abre tu navegador e ingresa a [Figma.com](https://www.figma.com).
2. Crea un nuevo archivo en blanco: **New design file**.
3. Nómbralo: **TechSolutions – Plataforma de Gestión Empresarial (Zegel)**.
4. Abre la carpeta en tu explorador de Windows:
   `c:\Users\FABIOLA\Documents\ZEGEL\CUARTO CICLO\PATRONES DE DISEÑO DE SOFTWARE\TechSolutions – Evaluación Final\prototipo_interactivo\wireframes_figma\`
5. **Selecciona los 11 archivos .svg y arrástralos directamente al lienzo (canvas) de Figma.**
   - Figma creará automáticamente 11 *Frames* vectoriales independientes y 100% editables (con textos, rectángulos, botones y colores).
6. Organiza los frames en orden de izquierda a derecha (o 2 filas) para facilitar el cableado interactivo.

---

### 3. CABLEADO DE LOS 8 FLUJOS INTERACTIVOS (PROTOTYPE MODE EN FIGMA)

En Figma, cambia a la pestaña **Prototype** (en la esquina superior derecha del panel de propiedades). Luego arrastra la flecha azul desde los elementos indicados hacia los frames destino:

#### Flujo A: Inicio de Sesión
- **Origen:** Botón *"Iniciar Sesión en el Sistema"* en `01_Inicio_Sesion`.
- **Interacción:** `On click` -> `Navigate to` -> `02_Dashboard_Principal`.
- **Animación:** `Smart animate` o `Dissolve` (300 ms).

#### Flujo B: Catálogo de Productos (Iterator)
- **Origen:** Opción *"Catálogo Productos"* en el menú lateral o acceso rápido en Dashboard.
- **Interacción:** `On click` -> `Navigate to` -> `03_Gestion_Productos_Iterator`.
- **Subflujo:** Clic en botón *"Pedir"* de la Laptop HP -> Abre modal o navega a `05_Gestion_Pedidos_Command`.

#### Flujo C: Inventario y Alertas (Observer)
- **Origen:** Opción *"Inventario & Stock"* en el menú lateral o tarjeta de Stock Crítico.
- **Interacción:** `On click` -> `Navigate to` -> `04_Inventario_Alertas_Observer`.
- **Subflujo:** Clic en *"Simular Venta & Alerta"* -> Dispara notificación visual en la campana del Topbar.

#### Flujo D: Gestión de Pedidos (Command)
- **Origen:** Opción *"Gestión Pedidos"* en el menú lateral.
- **Interacción:** `On click` -> `Navigate to` -> `05_Gestion_Pedidos_Command`.
- **Subflujo:** Clic en botón *"Crear Nuevo Pedido"* -> Abre modal de creación con `CreateOrderCommand`.

#### Flujo E: Cancelación y Recuperación (Memento Rollback)
- **Paso 1:** En `05_Gestion_Pedidos_Command`, clic en botón rojo *"Cancelar"* en el pedido `ORD-2026-001`.
- **Paso 2:** Navega a `10_Historial_Operaciones_Memento`.
- **Paso 3:** En el historial, clic en el botón *"↺ Deshacer (Undo)"* -> Restaura el pedido a su estado previo `PROCESADO`.

#### Flujo F: Pasarelas de Pago (Adapter)
- **Origen:** Opción *"Pasarelas de Pago"* en el menú lateral.
- **Interacción:** `On click` -> `Navigate to` -> `06_Procesamiento_Pagos_Adapter`.
- **Subflujo:** Conmutar switches de Yape/Plin/PayPal o hacer clic en *"Ejecutar Cobro con Adapter"* para ver el resultado HTTP 200 OK.

#### Flujo G: Reportes Financieros (Proxy)
- **Origen:** Opción *"Reportes Financieros"* en el menú lateral.
- **Interacción:** `On click` -> `Navigate to` -> `08_Reportes_Financieros_Proxy`.
- **Demostración:** Muestra cómo el proxy valida el rol de Gerente/Contador (RF4) y entrega datos desde la memoria caché.

#### Flujo H: Configuración de Precios (Strategy)
- **Origen:** Opción *"Estrategias Precios"* en el menú lateral.
- **Interacción:** `On click` -> `Navigate to` -> `07_Configuracion_Precios_Strategy`.
- **Subflujo:** Clic en *"Descuento Porcentual (15%)"* o *"Precio Dinámico (+10%)"* para alternar la política activa.

---

### 4. CÓMO GENERAR EL ENLACE COMPARTIDO PARA LA ENTREGA

1. En la esquina superior derecha de Figma, presiona el botón **Present** (ícono de triángulo ▶) para probar que todos los flujos funcionen.
2. Presiona el botón azul **Share** (Compartir) en la parte superior derecha.
3. En el diálogo que aparece, asegúrate de configurar:
   - **"Anyone with the link"** -> **"can view"** (Cualquiera con el enlace puede ver).
4. Haz clic en **Copy link** (Copiar enlace).
5. Este enlace es el que se adjunta en la carátula o entrega formal requerida por el docente de Zegel.
