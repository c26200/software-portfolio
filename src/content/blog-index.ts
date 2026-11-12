/**
 * Generated from the full content by scripts/build-indexes.mjs.
 * Keep it free of article bodies: it is imported by the app shell and the
 * prerenderer, and must stay small.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PostSummary {
  slug: string;
  date: string;
  updated?: string;
  es: { title: string; excerpt: string; faq: FaqItem[] };
  en: { title: string; excerpt: string; faq: FaqItem[] };
}

export const postIndex: PostSummary[] = [
  {
    "slug": "etl-n8n-postgresql",
    "date": "2026-11-11",
    "es": {
      "title": "ETL con n8n y PostgreSQL",
      "excerpt": "Diseña un flujo ETL con n8n y PostgreSQL para procesar hojas de cálculo con validación, cargas idempotentes, reintentos y monitoreo. Incluye ejemplos.",
      "faq": [
        {
          "question": "¿Necesito una tabla de staging para cada flujo ETL?",
          "answer": "No siempre. Es útil cuando necesitas validar el conjunto antes de publicarlo, investigar rechazos o recuperarte de cargas parciales. Para una sincronización pequeña, con esquema y clave bien definidos, una carga directa puede ser suficiente."
        },
        {
          "question": "¿Cómo evito duplicados si n8n reintenta una ejecución?",
          "answer": "Define una clave única que represente al registro y usa una operación de inserción o actualización basada en esa clave. Registra además el lote para auditar reintentos. La huella del archivo por sí sola no reemplaza la identidad de cada fila."
        },
        {
          "question": "¿Debo detener todo el lote por una fila inválida?",
          "answer": "Depende del impacto de aceptar una carga parcial. Si una fila incorrecta puede cambiar un total o una decisión, detén el lote y corrígelo. Si las filas son independientes, puedes poner las inválidas en cuarentena, siempre que el resultado informe claramente cuántas quedaron fuera."
        },
        {
          "question": "¿Cómo elijo el tamaño del lote?",
          "answer": "Mide memoria, duración, límites de conexión y facilidad de recuperación con volúmenes representativos. Un lote menor suele facilitar el diagnóstico; uno mayor puede reducir viajes a la base. El equilibrio depende de la carga y no conviene fijarlo sin pruebas."
        }
      ]
    },
    "en": {
      "title": "ETL with n8n and PostgreSQL",
      "excerpt": "Build an n8n ETL workflow with PostgreSQL for spreadsheets: validation, idempotent imports, retries and monitoring, with practical examples.",
      "faq": [
        {
          "question": "Does every ETL workflow need a staging table?",
          "answer": "Not always. It helps when you need to validate the full set before publishing it, investigate rejected rows or recover from partial loads. For a small sync with a well-defined schema and key, a direct load may be enough."
        },
        {
          "question": "How do I prevent duplicates when n8n retries a run?",
          "answer": "Define a unique key for each record and use an insert-or-update operation based on that key. Keep a batch record for auditing retries as well. A file fingerprint alone does not replace row identity."
        },
        {
          "question": "Should one invalid row stop the whole batch?",
          "answer": "It depends on the impact of accepting a partial load. If one bad row can change a total or decision, stop and correct the batch. If rows are independent, invalid ones can be quarantined as long as the result clearly reports how many were excluded."
        },
        {
          "question": "How should I choose batch size?",
          "answer": "Measure memory, duration, connection limits and recovery effort with representative volumes. Smaller batches often make diagnosis easier; larger ones may reduce database round trips. The right balance depends on the workload and should be tested."
        }
      ]
    }
  },
  {
    "slug": "series-temporales-producto",
    "date": "2026-05-01",
    "updated": "2026-11-11",
    "es": {
      "title": "De las series temporales al producto",
      "excerpt": "Guía completa para llevar un modelo de series temporales del notebook a un servicio observable: datos, validación, ensemble LSTM + Transformer y operación.",
      "faq": [
        {
          "question": "¿Necesito deep learning para una serie temporal?",
          "answer": "No. Empieza con un baseline y un modelo estadístico bien validado. El deep learning aporta cuando hay suficientes datos, relaciones no lineales y varias series relacionadas; si no, añade complejidad sin garantía de mejora."
        },
        {
          "question": "¿Cuántos datos necesito?",
          "answer": "Depende de la señal y del horizonte, no solo del número de filas. Pocos datos favorecen modelos simples; muchas series ruidosas no se arreglan con más parámetros. La validación walk-forward te dirá si el modelo generaliza."
        },
        {
          "question": "¿Cómo evito filtrar información del futuro?",
          "answer": "Separa por tiempo, nunca al azar. Ajusta la normalización y cualquier transformación solo con el pasado. Revisa que cada variable exógena esté disponible en el momento de predecir."
        },
        {
          "question": "¿Cuándo debo reentrenar?",
          "answer": "Cuando el error o la distribución de los datos cambie de forma sostenida. Combina un calendario con disparadores por drift; reentrenar cada día sin evidencia solo añade riesgo operativo."
        }
      ]
    },
    "en": {
      "title": "From Time Series to Product",
      "excerpt": "A complete guide to taking a time-series model from the notebook to an observable service: data, validation, an LSTM + Transformer ensemble and operations.",
      "faq": [
        {
          "question": "Do I need deep learning for a time series?",
          "answer": "No. Start with a baseline and a well-validated statistical model. Deep learning helps when there is enough data, non-linear relationships and several related series; otherwise it adds complexity without a guaranteed gain."
        },
        {
          "question": "How much data do I need?",
          "answer": "It depends on the signal and the horizon, not just the number of rows. Little data favors simple models; many noisy series are not fixed with more parameters. Walk-forward validation will tell you whether the model generalizes."
        },
        {
          "question": "How do I avoid leaking future information?",
          "answer": "Split by time, never at random. Fit normalization and any transformation only on the past. Check that every exogenous variable is available at prediction time."
        },
        {
          "question": "When should I retrain?",
          "answer": "When error or data distribution changes persistently. Combine a schedule with drift triggers; retraining daily without evidence only adds operational risk."
        }
      ]
    }
  },
  {
    "slug": "docker-fundamentals",
    "date": "2026-04-15",
    "updated": "2026-11-11",
    "es": {
      "title": "Docker para Desarrolladores — Lo Esencial",
      "excerpt": "Guía práctica de Docker para desarrollar y desplegar: imágenes, Dockerfile, Compose, datos, redes, seguridad, CI y errores comunes.",
      "faq": [
        {
          "question": "¿Docker es una máquina virtual?",
          "answer": "No. Un contenedor comparte el kernel del host y aísla el proceso; una máquina virtual emula un sistema completo. Por eso los contenedores arrancan más rápido y pesan menos, aunque el aislamiento es distinto."
        },
        {
          "question": "¿Puedo usar Docker en producción?",
          "answer": "Sí, con healthchecks, reinicios, límites de recursos y una estrategia de despliegue. Para proyectos pequeños, una plataforma gestionada puede ser más simple que administrar el orquestador."
        },
        {
          "question": "¿Cómo persisto los datos?",
          "answer": "Con volúmenes. Los datos escritos en la capa del contenedor se pierden al recrearlo. Declara el volumen en Compose y prueba la restauración de un backup."
        },
        {
          "question": "¿Cómo reduzco el tamaño de la imagen?",
          "answer": "Usa Alpine, multi-stage builds, .dockerignore y solo dependencias de producción en la etapa final. Revisa el tamaño por capas antes de optimizar a ciegas."
        }
      ]
    },
    "en": {
      "title": "Docker for Developers — The Essentials",
      "excerpt": "A practical Docker guide for development and deployment: images, Dockerfile, Compose, data, networking, security, CI and common mistakes.",
      "faq": [
        {
          "question": "Is Docker a virtual machine?",
          "answer": "No. A container shares the host kernel and isolates the process; a virtual machine emulates a full system. Containers start faster and weigh less, although the isolation model is different."
        },
        {
          "question": "Can I use Docker in production?",
          "answer": "Yes, with healthchecks, restarts, resource limits and a deployment strategy. For small projects, a managed platform can be simpler than running an orchestrator."
        },
        {
          "question": "How do I persist data?",
          "answer": "With volumes. Data written to the container layer is lost when it is recreated. Declare the volume in Compose and test restoring a backup."
        },
        {
          "question": "How do I reduce image size?",
          "answer": "Use Alpine, multi-stage builds, .dockerignore and production-only dependencies in the final stage. Inspect size by layer before optimizing blindly."
        }
      ]
    }
  },
  {
    "slug": "estado-local-react",
    "date": "2026-11-11",
    "es": {
      "title": "Estado local en React: persistir datos sin backend",
      "excerpt": "Cómo modelar, versionar y escribir estado local en React para que una app sin backend no se rompa cuando cambia el esquema, con ejemplos y errores comunes.",
      "faq": [
        {
          "question": "¿Es seguro guardar datos en localStorage?",
          "answer": "Para datos personales de baja sensibilidad, sí. No guardes tokens, contraseñas ni información que no quieras exponer: cualquier script que se ejecute en la página puede leerlo. La seguridad depende de evitar inyección de código, no del almacenamiento en sí."
        },
        {
          "question": "¿Cómo sincronizo los datos entre dispositivos?",
          "answer": "Necesitas un servidor y una política de conflictos: quién gana cuando dos dispositivos editan lo mismo. Un enfoque común es registrar cambios con marca de tiempo y resolver por campo, pero no es automático ni gratis. Mientras no lo necesiten los usuarios, un botón de exportar e importar cubre muchos casos."
        },
        {
          "question": "¿Cuánto puedo guardar?",
          "answer": "Depende del navegador; suele rondar los 5 MB por origen para localStorage . Si el contenido incluye imágenes o historiales largos, IndexedDB es la opción sensata."
        },
        {
          "question": "¿Necesito una librería de estado?",
          "answer": "No para empezar. Un módulo tipado y un estado de React bien ubicado bastan. Una librería ayuda cuando hay muchas escrituras concurrentes o sincronización compleja, pero no sustituye entender el modelo."
        }
      ]
    },
    "en": {
      "title": "Local state in React: persisting data without a backend",
      "excerpt": "How to model, version and write local state in React so a backend-free app survives schema changes, with examples and common mistakes.",
      "faq": [
        {
          "question": "Is localStorage safe?",
          "answer": "For low-sensitivity personal data, yes. Do not store tokens, passwords or anything you would not want exposed: any script running on the page can read it. Security depends on preventing code injection, not on the storage itself."
        },
        {
          "question": "How do I sync data across devices?",
          "answer": "You need a server and a conflict policy: who wins when two devices edit the same thing. A common approach records changes with timestamps and resolves per field, but it is neither automatic nor free. Until users need it, an export/import button covers many cases."
        },
        {
          "question": "How much can I store?",
          "answer": "It depends on the browser; it is usually around 5 MB per origin for localStorage . If the content includes images or long histories, IndexedDB is the sensible choice."
        },
        {
          "question": "Do I need a state library?",
          "answer": "Not to start. A typed module and well-placed React state are enough. A library helps with many concurrent writes or complex synchronization, but it does not replace understanding the model."
        }
      ]
    }
  },
  {
    "slug": "diseno-dashboards-react",
    "date": "2026-11-11",
    "es": {
      "title": "Dashboards que se leen: jerarquía y datos en React",
      "excerpt": "Cómo diseñar un dashboard que responda preguntas: jerarquía editorial, pocas métricas, gráficas honestas, tablas escaneables y temas claro/oscuro con React.",
      "faq": [
        {
          "question": "¿Cuántas métricas debe tener un dashboard?",
          "answer": "Tres a cinco en el primer nivel. El resto pertenece al detalle. Si necesitas más, probablemente sean varios paneles con preguntas distintas, no uno con todo."
        },
        {
          "question": "¿Qué gráfica uso para tendencias?",
          "answer": "Una línea con el periodo explícito. Las barras funcionan para comparar categorías y los números grandes para una sola cifra con contexto. Evita gráficas 3D y pasteles con muchas porciones."
        },
        {
          "question": "¿Recharts o D3?",
          "answer": "Recharts cubre la mayoría de paneles de producto con menos código y buen comportamiento responsive. D3 tiene sentido cuando necesitas una visualización a medida que ninguna librería de componentes resuelve."
        },
        {
          "question": "¿Cómo hago el panel accesible?",
          "answer": "Contraste suficiente en ambos temas, información que no dependa solo del color y una tabla o resumen textual como alternativa a cada gráfica. Los tooltips deben poder alcanzarse con teclado."
        }
      ]
    },
    "en": {
      "title": "Dashboards people can read: hierarchy and data in React",
      "excerpt": "How to design a dashboard that answers questions: editorial hierarchy, few metrics, honest charts, scannable tables and light/dark themes with React.",
      "faq": [
        {
          "question": "How many metrics should a dashboard have?",
          "answer": "Three to five at the first level. The rest belongs to detail. If you need more, they are probably several panels with different questions, not one with everything."
        },
        {
          "question": "Which chart should I use for trends?",
          "answer": "A line with an explicit period. Bars work for comparing categories and large numbers for a single figure with context. Avoid 3D charts and pies with many slices."
        },
        {
          "question": "Recharts or D3?",
          "answer": "Recharts covers most product panels with less code and good responsive behavior. D3 makes sense when you need a custom visualization that no component library solves."
        },
        {
          "question": "How do I make the panel accessible?",
          "answer": "Enough contrast in both themes, information that does not rely on color alone and a table or textual summary as an alternative to each chart. Tooltips must be reachable by keyboard."
        }
      ]
    }
  },
  {
    "slug": "ia-en-tiempo-real",
    "date": "2026-11-11",
    "es": {
      "title": "IA en tiempo real: servir un modelo sin romper la interfaz",
      "excerpt": "Qué cambia al servir un modelo de IA en tiempo real: transporte, contrato de inferencia, latencia, fallback, versionado y monitoreo para un servicio confiable.",
      "faq": [
        {
          "question": "¿Necesito WebSocket para servir un modelo?",
          "answer": "No. Depende de la frecuencia de actualización y de si el servidor debe empujar datos. Para una predicción diaria, REST es más simple. Para un panel que se actualiza varias veces por minuto, una conexión persistente evita peticiones innecesarias."
        },
        {
          "question": "¿Cómo evito mensajes duplicados o fuera de orden?",
          "answer": "Incluye un identificador de secuencia y una marca de tiempo en cada mensaje, y descarta en el cliente lo que llegue repetido o anterior al último estado aplicado. El orden no se garantiza solo por usar WebSocket."
        },
        {
          "question": "¿Debo reentrenar automáticamente?",
          "answer": "No ante cada alerta. Primero distingue un cambio real de un dato roto; después decide si toca reentrenar, recalibrar o corregir la ingesta. Un reentrenamiento automático sin evidencia añade riesgo operativo."
        },
        {
          "question": "¿Qué métrica operativa importa más?",
          "answer": "La latencia p95 de punta a punta y la antigüedad del último dato. Con esas dos puedes detectar la mayoría de los incidentes que afectan al usuario."
        }
      ]
    },
    "en": {
      "title": "Real-time AI: serving a model without breaking the interface",
      "excerpt": "What changes when serving an AI model in real time: transport, inference contract, latency, fallback, versioning and monitoring for a reliable service.",
      "faq": [
        {
          "question": "Do I need WebSocket to serve a model?",
          "answer": "No. It depends on update frequency and whether the server must push data. For a daily prediction, REST is simpler. For a panel that updates several times per minute, a persistent connection avoids unnecessary requests."
        },
        {
          "question": "How do I avoid duplicate or out-of-order messages?",
          "answer": "Include a sequence id and a timestamp in every message, and discard repeated messages or ones older than the last applied state. Order is not guaranteed just by using WebSocket."
        },
        {
          "question": "Should I retrain automatically?",
          "answer": "Not on every alert. First distinguish a real change from broken data; then decide whether to retrain, recalibrate or fix ingestion. Automatic retraining without evidence adds operational risk."
        },
        {
          "question": "Which operational metric matters most?",
          "answer": "End-to-end p95 latency and the age of the last datum. With those two you can detect most incidents that affect the user."
        }
      ]
    }
  }
];

export function getPostSummary(post: PostSummary, language: string) {
  return language.startsWith('en') ? post.en : post.es;
}
