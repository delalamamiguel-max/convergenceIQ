/**
 * Data-level translations: maps English data strings from curated-datasets.ts to Spanish.
 * Used by the useTd() hook to translate data values at render time.
 */
export const dataEs: Record<string, string> = {
  // ============================================================
  // SIGNAL LABELS — Conflict
  // ============================================================
  'Ukraine-Russia Conflict Intensity': 'Intensidad del Conflicto Ucrania-Rusia',
  'Middle East Instability Index': 'Índice de Inestabilidad del Medio Oriente',
  'Sub-Saharan Africa Conflict': 'Conflicto en África Subsahariana',
  'South China Sea Tensions': 'Tensiones en el Mar del Sur de China',
  'Latin America Political Instability': 'Inestabilidad Política en América Latina',

  // ============================================================
  // SIGNAL LABELS — Lobbying
  // ============================================================
  'Tech Sector Lobbying': 'Lobbying del Sector Tecnológico',
  'Pharma/Health Lobbying': 'Lobbying Farmacéutico/Salud',
  'Finance/Insurance Lobbying': 'Lobbying de Finanzas/Seguros',
  'Energy/Natural Resources Lobbying': 'Lobbying de Energía/Recursos Naturales',
  'Defense Sector Lobbying': 'Lobbying del Sector Defensa',
  'Real Estate Lobbying': 'Lobbying Inmobiliario',

  // ============================================================
  // SIGNAL LABELS — Corruption Index
  // ============================================================
  'Denmark CPI Score': 'Puntuación CPI de Dinamarca',
  'Finland CPI Score': 'Puntuación CPI de Finlandia',
  'Singapore CPI Score': 'Puntuación CPI de Singapur',
  'United States CPI Score': 'Puntuación CPI de Estados Unidos',
  'UAE CPI Score': 'Puntuación CPI de EAU',
  'India CPI Score': 'Puntuación CPI de India',
  'Brazil CPI Score': 'Puntuación CPI de Brasil',
  'Nigeria CPI Score': 'Puntuación CPI de Nigeria',

  // ============================================================
  // SIGNAL LABELS — Disruption
  // ============================================================
  'AI/ML Startup Funding': 'Financiamiento de Startups IA/ML',
  'Climate Tech Funding': 'Financiamiento en Tecnología Climática',
  'FinTech Disruption Index': 'Índice de Disrupción FinTech',
  'HealthTech Innovation': 'Innovación HealthTech',
  'EdTech Market Growth': 'Crecimiento del Mercado EdTech',
  'SpaceTech Ventures': 'Emprendimientos SpaceTech',
  'Web3/Blockchain Funding': 'Financiamiento Web3/Blockchain',

  // ============================================================
  // SIGNAL LABELS — Cultural Trends
  // ============================================================
  'Remote Work Preference': 'Preferencia por Trabajo Remoto',
  'Sustainability Priority (Gen Z)': 'Prioridad de Sostenibilidad (Gen Z)',
  'AI Trust Level': 'Nivel de Confianza en IA',
  'Digital Privacy Concern': 'Preocupación por Privacidad Digital',
  'Creator Economy Participation': 'Participación en Economía de Creadores',
  'Mental Health Awareness': 'Conciencia sobre Salud Mental',

  // ============================================================
  // SIGNAL LABELS — Tech Adoption
  // ============================================================
  'Generative AI Enterprise Adoption': 'Adopción Empresarial de IA Generativa',
  'Edge Computing Maturity': 'Madurez del Edge Computing',
  'Quantum Computing Readiness': 'Preparación para Computación Cuántica',
  'Zero Trust Security Adoption': 'Adopción de Seguridad Zero Trust',
  'Autonomous Systems Deployment': 'Despliegue de Sistemas Autónomos',
  'Digital Twin Adoption': 'Adopción de Gemelos Digitales',

  // ============================================================
  // REGIONS
  // ============================================================
  'Eastern Europe': 'Europa del Este',
  'Middle East': 'Medio Oriente',
  'Sub-Saharan Africa': 'África Subsahariana',
  'East Asia': 'Asia Oriental',
  'Latin America': 'América Latina',
  'Europe': 'Europa',
  'Asia': 'Asia',
  'North America': 'Norteamérica',
  'United States': 'Estados Unidos',
  'Austin, TX': 'Austin, TX',
  'Round Rock / Cedar Park': 'Round Rock / Cedar Park',
  'Georgetown / Leander': 'Georgetown / Leander',
  'San Marcos / Pflugerville': 'San Marcos / Pflugerville',
  'Austin Surrounding': 'Alrededores de Austin',
  'Remote (US)': 'Remoto (EE.UU.)',

  // ============================================================
  // SECTORS (signal field values)
  // ============================================================
  'defense': 'defensa',
  'energy': 'energía',
  'mining': 'minería',
  'shipping': 'transporte marítimo',
  'commodities': 'materias primas',
  'technology': 'tecnología',
  'healthcare': 'salud',
  'finance': 'finanzas',
  'real_estate': 'bienes raíces',
  'product': 'producto',
  'ai_ml': 'ia_ml',
  'climate_tech': 'tecnología climática',
  'fintech': 'fintech',
  'healthtech': 'healthtech',
  'edtech': 'edtech',
  'spacetech': 'spacetech',
  'web3': 'web3',
  'infrastructure': 'infraestructura',
  'quantum': 'cuántica',
  'security': 'seguridad',
  'autonomy': 'autonomía',
  'manufacturing': 'manufactura',

  // ============================================================
  // SECTOR NAMES (sectorGrowthData)
  // ============================================================
  'Information Technology': 'Tecnología de la Información',
  'Communication Services': 'Servicios de Comunicación',
  'Health Care': 'Salud',
  'Consumer Discretionary': 'Consumo Discrecional',
  'Financials': 'Finanzas',
  'Industrials': 'Industriales',
  'Materials': 'Materiales',
  'Utilities': 'Servicios Públicos',
  'Consumer Staples': 'Consumo Básico',
  'Energy': 'Energía',
  'Real Estate': 'Bienes Raíces',

  // Short chart names (after .replace() in investing-view)
  'Info Technology': 'Info Tecnología',
  'Comm. Services': 'Serv. Comunicación',
  'Cons. Discretionary': 'Cons. Discrecional',
  'Cons. Staples': 'Cons. Básico',

  // ============================================================
  // CORRELATION MATRIX LABELS
  // ============================================================
  'Fed Funds Rate': 'Tasa de Fondos Federales',
  'Tech Startup Funding': 'Financiamiento Startups Tech',
  'Real Estate Jobs': 'Empleos en Bienes Raíces',
  'AI Adoption Rate': 'Tasa de Adopción de IA',
  'AI/ML Job Growth': 'Crecimiento Empleos IA/ML',
  'Admin Job Displacement': 'Desplazamiento Empleos Administrativos',
  'Conflict Intensity': 'Intensidad de Conflicto',
  'Defense Sector Growth': 'Crecimiento del Sector Defensa',
  'Energy Prices': 'Precios de Energía',
  'Lobbying Spend (Tech)': 'Gasto en Lobbying (Tech)',
  'Regulatory Leniency': 'Indulgencia Regulatoria',
  'Corruption Index': 'Índice de Corrupción',
  'FDI Inflows': 'Flujos de IED',
  'Consumer Sentiment': 'Sentimiento del Consumidor',
  'Retail Sector Growth': 'Crecimiento del Sector Minorista',
  'Remote Work %': '% Trabajo Remoto',
  'Commercial Real Estate': 'Bienes Raíces Comerciales',
  'Sustainability Priority': 'Prioridad de Sostenibilidad',
  'SEC Regulatory Volume': 'Volumen Regulatorio SEC',
  'Compliance Job Growth': 'Crecimiento Empleos en Cumplimiento',
  'Cybersecurity Threats': 'Amenazas de Ciberseguridad',
  'Cybersecurity Job Growth': 'Crecimiento Empleos en Ciberseguridad',
  'VIX (Volatility)': 'VIX (Volatilidad)',
  'VC Funding': 'Financiamiento VC',
  'Gen Z Sustainability': 'Sostenibilidad Gen Z',
  'ESG Fund Inflows': 'Flujos a Fondos ESG',

  // ============================================================
  // CONFLUENCE ALERT SECTORS & REGIONS
  // ============================================================
  'AI Product Management': 'Gestión de Productos de IA',
  'United States / Austin': 'Estados Unidos / Austin',
  'Climate Tech': 'Tecnología Climática',
  'Global': 'Global',
  'Technical PM / Platform': 'PM Técnico / Plataformas',
  'Austin / Remote': 'Austin / Remoto',
  'Growth PM / PLG': 'PM de Crecimiento / PLG',
  'United States / Remote': 'Estados Unidos / Remoto',
  'PM Role Automation': 'Automatización de Roles PM',

  // CONFLUENCE ALERT DESCRIPTIONS
  'Strong convergence: AI enterprise adoption (78%), record AI startup funding ($28.5B), and 42% projected AI PM job growth. Austin AI PM demand exceeds supply 3:1. Median AI PM salary ($192K nationally) leads all PM specialties.':
    'Fuerte convergencia: adopción empresarial de IA (78%), financiamiento récord de startups de IA ($28.5B) y 42% de crecimiento proyectado en empleos de AI PM. La demanda de AI PM en Austin supera la oferta 3:1. El salario mediano de AI PM ($192K a nivel nacional) lidera todas las especialidades de PM.',
  'Climate tech convergence: Record renewable investment ($580B), Gen Z sustainability priority (85%), falling energy sector creating disruption vacuum, and green bond SEC standards creating framework for growth.':
    'Convergencia en tecnología climática: inversión récord en renovables ($580B), prioridad de sostenibilidad de la Gen Z (85%), sector energético en declive creando un vacío de disrupción, y estándares SEC de bonos verdes creando un marco para el crecimiento.',
  'Technical PM demand converges with platform investment: Austin tech PM growing at 24%, remote technical PM at 20%. Developer-tools companies (Vercel, Supabase, Datadog) are remote-first and hiring. Best comp-to-COL ratio in Austin.':
    'La demanda de PM Técnico converge con la inversión en plataformas: PM técnico en Austin crece al 24%, PM técnico remoto al 20%. Empresas de herramientas para desarrolladores (Vercel, Supabase, Datadog) son remote-first y están contratando. Mejor ratio compensación-costo de vida en Austin.',
  'Growth PM intersects with PLG startup wave: Product-led growth companies need PMs who drive metrics, not features. Remote-friendly by nature. Growth PM expertise is transferable across industries — hedge against sector-specific downturns.':
    'PM de Crecimiento se cruza con la ola de startups PLG: las empresas de crecimiento liderado por producto necesitan PMs que impulsen métricas, no funcionalidades. Naturalmente compatibles con trabajo remoto. La expertise en Growth PM es transferible entre industrias — cobertura contra caídas sectoriales.',
  'Delivery/Program PM roles face 35-45% AI displacement on tactical tasks (status reports, timeline management). Generalist PM salaries compressing. Strategic specialization is the hedge — AI PM, Technical PM, and Growth PM roles are growing 2-4x faster.':
    'Los roles de PM de Delivery/Programa enfrentan 35-45% de desplazamiento por IA en tareas tácticas (reportes de estado, gestión de cronogramas). Los salarios de PM generalista se comprimen. La especialización estratégica es la cobertura — los roles de AI PM, PM Técnico y Growth PM crecen 2-4x más rápido.',

  // ============================================================
  // SCENARIO VARIABLES
  // ============================================================
  'Federal Funds Rate': 'Tasa de Fondos Federales',
  'Global Conflict Index': 'Índice de Conflicto Global',
  // 'Consumer Sentiment' already defined above
  'Corruption Perception': 'Percepción de Corrupción',
  'Regulatory Intensity': 'Intensidad Regulatoria',
  'Remote Work Adoption': 'Adopción de Trabajo Remoto',
  'Climate Tech Investment': 'Inversión en Tecnología Climática',
  // 'AI Adoption Rate' already defined above

  // ============================================================
  // THRESHOLD PRESETS
  // ============================================================
  'Ethical Investor': 'Inversor Ético',
  'Prioritizes low-conflict regions, high transparency, and ESG-aligned sectors': 'Prioriza regiones de bajo conflicto, alta transparencia y sectores alineados con ESG',
  'Risk-Tolerant Founder': 'Fundador Tolerante al Riesgo',
  'Focuses on disruption potential and emerging tech, accepts higher uncertainty': 'Se enfoca en potencial de disrupción y tecnología emergente, acepta mayor incertidumbre',
  'AI-Resilient Career Seeker': 'Profesional Resiliente a la IA',
  'Identifies roles with low automation risk and high growth trajectory': 'Identifica roles con bajo riesgo de automatización y alta trayectoria de crecimiento',
  'Regulatory Arbitrage': 'Arbitraje Regulatorio',
  'Spots opportunities where regulatory shifts create asymmetric advantages': 'Detecta oportunidades donde los cambios regulatorios crean ventajas asimétricas',
  'Balanced Explorer': 'Explorador Equilibrado',
  'Equal weighting across all dimensions for broad opportunity scanning': 'Ponderación igual en todas las dimensiones para un escaneo amplio de oportunidades',

  // ============================================================
  // PM ROLE LABELS
  // ============================================================
  // US
  'Product Manager (General)': 'Product Manager (General)',
  'AI Product Manager': 'AI Product Manager',
  'Technical Product Manager': 'Product Manager Técnico',
  'Growth Product Manager': 'Product Manager de Crecimiento',
  'Product Strategy / Product Ops': 'Estrategia de Producto / Product Ops',
  'Program / Product Delivery Manager': 'Gerente de Programa / Delivery de Producto',
  'Innovation / R&D Product Lead': 'Líder de Producto de Innovación / I+D',
  // Austin
  'Product Manager (Austin Metro)': 'Product Manager (Área Metro de Austin)',
  'AI Product Manager (Austin)': 'AI Product Manager (Austin)',
  'Technical PM (Austin)': 'PM Técnico (Austin)',
  'Growth PM (Austin)': 'PM de Crecimiento (Austin)',
  'Product Ops / Strategy (Austin)': 'Product Ops / Estrategia (Austin)',
  // Austin Surrounding
  'Product Manager (Round Rock / Cedar Park)': 'Product Manager (Round Rock / Cedar Park)',
  'Product Manager (Georgetown / Leander)': 'Product Manager (Georgetown / Leander)',
  'Product Manager (San Marcos / Pflugerville)': 'Product Manager (San Marcos / Pflugerville)',
  'AI/Technical PM (Surrounding Areas)': 'PM de IA/Técnico (Áreas Circundantes)',
  // Remote
  'Remote Product Manager (US)': 'Product Manager Remoto (EE.UU.)',
  'Remote AI Product Manager': 'AI Product Manager Remoto',
  'Remote Technical PM': 'PM Técnico Remoto',
  'Remote Growth PM': 'PM de Crecimiento Remoto',
  'Remote Product Ops / Strategy': 'Product Ops / Estrategia Remoto',

  // ============================================================
  // PM ROLE EXPLANATIONS (keyed by ID)
  // ============================================================
  'pm-us-1.explanation': 'Los roles de PM generalista están creciendo aproximadamente al doble del promedio nacional para todas las ocupaciones. El BLS proyecta un crecimiento del 14% en la próxima década, impulsado por empresas que integran el pensamiento de producto en cada equipo — no solo en tecnología.',
  'pm-us-1.whyItMatters': 'Esta es la categoría más amplia de PM y tu punto de entrada más accesible. Un crecimiento superior al 10% señala contratación sostenida, lo que significa más vacantes y más opciones de movimiento lateral una vez dentro.',
  'pm-us-1.recommendedAction': 'Si estás entrando a PM o haciendo un giro profesional, apunta a roles generalistas de PM en empresas medianas (500-5,000 empleados) donde el título está menos restringido y el alcance multifuncional es amplio.',

  'pm-us-2.explanation': 'AI PM es la subespecialidad de PM de más rápido crecimiento en el país. Con un crecimiento proyectado del 42%, supera a casi todos los demás roles de trabajo del conocimiento. Los empleadores buscan PMs que puedan traducir las capacidades de los modelos en productos orientados al usuario.',
  'pm-us-2.whyItMatters': 'Aquí es donde las primas salariales son más altas y la competencia por talento es más feroz. Las empresas pagan 20-30% por encima de la compensación base de PM porque no encuentran suficientes personas que hablen tanto "producto" como "ML".',
  'pm-us-2.recommendedAction': 'Desarrolla un conocimiento práctico de las capacidades de LLM, ingeniería de prompts y métricas de evaluación. No necesitas programar modelos — necesitas definir qué pueden y qué no pueden hacer, y lanzar productos en torno a eso.',

  'pm-us-3.explanation': 'Los PM Técnicos — aquellos que gestionan plataformas, infraestructura o productos para desarrolladores — están creciendo al 22%. Las empresas que construyen APIs, SDKs y plataformas internas necesitan PMs que escriban especificaciones que los ingenieros respeten.',
  'pm-us-3.whyItMatters': 'Los roles de PM Técnico son menos susceptibles al desplazamiento por IA porque el trabajo requiere comprensión profunda de sistemas, razonamiento sobre trade-offs y negociación con stakeholders que la IA no puede automatizar.',
  'pm-us-3.recommendedAction': 'Si tienes experiencia en ingeniería o datos, inclínate hacia roles de PM Técnico. Destaca tu comprensión de diseño de sistemas, experiencia con productos API o proyectos de experiencia de desarrollador en tu portafolio.',

  'pm-us-4.explanation': 'Growth PM está expandiéndose al 18% a medida que las empresas pasan de "construir funcionalidades" a "mover métricas". Estos roles están en la intersección de producto, datos y marketing.',
  'pm-us-4.whyItMatters': 'Los Growth PMs son valorados por su impacto directo en ingresos y retención. Este es uno de los caminos más claros para demostrar impacto empresarial medible, lo cual importa para la progresión de carrera.',
  'pm-us-4.recommendedAction': 'Desarrolla fluidez en marcos de experimentación (pruebas A/B, análisis de cohortes) y funnels de activación/retención. Prepara casos de estudio que muestren cómo moviste una métrica específica.',

  'pm-us-5.explanation': 'Los roles de Estrategia de Producto y Product Ops están creciendo al 12%, aproximadamente en línea con la categoría general de PM. Estos roles surgen a escala — empresas con más de 10 PMs necesitan a alguien que alinee roadmaps y estandarice procesos.',
  'pm-us-5.whyItMatters': 'Estos roles son ideales para PMs experimentados que prefieren la influencia sobre la ejecución directa. Son más difíciles de encontrar en empresas pequeñas pero ofrecen alta visibilidad y posicionamiento para liderazgo en organizaciones grandes.',
  'pm-us-5.recommendedAction': 'Apunta a startups Series C+ o empresas con organizaciones de producto grandes. Enfatiza experiencia en alineación entre equipos, gobernanza de roadmaps y priorización de portafolio.',

  'pm-us-6.explanation': 'Los roles de PM enfocados en delivery y gestión de programas están creciendo al 10%. Estos roles enfatizan el rigor de ejecución — entregar a tiempo, gestionar dependencias y eliminar bloqueadores.',
  'pm-us-6.whyItMatters': 'La demanda es estable pero no acelerando. Estos roles enfrentan riesgo moderado de desplazamiento por IA ya que las tareas de seguimiento de proyectos y reportes de estado se automatizan. El valor se desplaza hacia la coordinación compleja entre equipos.',
  'pm-us-6.recommendedAction': 'Si estás en gestión de delivery/programas, comienza a añadir habilidades estratégicas de PM (descubrimiento, priorización, enmarcado de resultados) para evitar quedar encasillado en un nicho táctico que se reduce.',

  'pm-us-7.explanation': 'Los roles de producto en innovación e I+D están creciendo al 8%, más lento que el PM core. Estos roles existen principalmente en grandes empresas e industrias intensivas en investigación (farmacéutica, defensa, hardware).',
  'pm-us-7.whyItMatters': 'Bajo volumen pero alta compensación. Estos roles recompensan la expertise profunda en un dominio y la tolerancia a la ambigüedad. No son una jugada de volumen — estás apuntando a un conjunto pequeño de empresas específicas.',
  'pm-us-7.recommendedAction': 'Persigue estos roles solo si tienes expertise de dominio en una vertical específica (salud, energía, defensa). Para generalistas, el mejor ROI es AI PM o Growth PM.',

  // Austin
  'pm-atx-1.explanation': 'Los roles de PM en Austin están creciendo 4 puntos más rápido que el promedio nacional. La ciudad ahora alberga organizaciones de producto importantes de Apple, Google, Meta, Oracle, Tesla y un sólido grupo de startups Series B-D.',
  'pm-atx-1.whyItMatters': 'Austin ha cruzado el umbral de "hub tech emergente" a mercado de talento establecido. Más roles de PM significan más opciones, pero también más competencia de transplantes del Bay Area.',
  'pm-atx-1.recommendedAction': 'Conéctate con comunidades de PM específicas de Austin (ProductCamp Austin, Austin Product Meetup). La red local importa más aquí que en mercados remote-first.',

  'pm-atx-2.explanation': 'La demanda de AI PM en Austin está creciendo incluso más rápido que la tasa nacional, impulsada por laboratorios de IA y equipos de IA empresarial en empresas como Oracle, Dell y una ola de startups nativas de IA.',
  'pm-atx-2.whyItMatters': 'Austin se está convirtiendo en un hub secundario para trabajo de producto de IA después de SF/NYC. Entrar ahora te posiciona antes de que el mercado madure completamente y la competencia se intensifique.',
  'pm-atx-2.recommendedAction': 'Asiste a meetups de IA en Austin, apunta a empresas como WP Engine, Disco, Athena Intelligence y equipos de IA empresarial en Dell/Oracle. El pool de talento de AI PM aquí aún es pequeño — ser visible importa.',

  'pm-atx-3.explanation': 'La sólida escena de ingeniería de plataformas e infraestructura de Austin (Apple silicon, Tesla firmware, Indeed platform) impulsa una demanda de PM Técnico por encima del promedio.',
  'pm-atx-3.whyItMatters': 'Los roles de PM Técnico en Austin pagan dentro del 5-10% de las tarifas de SF pero con 25-35% menor costo de vida. Esta es una de las mejores relaciones compensación-costo de vida del país para este rol.',
  'pm-atx-3.recommendedAction': 'Apunta a equipos de plataforma en Apple Austin, Indeed o Tesla. Destaca cualquier experiencia con herramientas de desarrollador, diseño de APIs o productos de infraestructura.',

  'pm-atx-4.explanation': 'Los roles de Growth PM en Austin se concentran en empresas orientadas al consumidor y marketplaces. El volumen es menor que PM generalista, pero crece de manera constante.',
  'pm-atx-4.whyItMatters': 'Menos roles significa contratación más selectiva. Las empresas quieren experiencia demostrada en experimentación e historias claras de impacto en métricas.',
  'pm-atx-4.recommendedAction': 'Construye un portafolio de experimentos de crecimiento con resultados documentados. Apunta a empresas como Indeed, Bumble y empresas SaaS de alto crecimiento en Austin con estrategias PLG.',

  'pm-atx-5.explanation': 'Los roles de Product Ops y Estrategia en Austin están limitados a organizaciones de producto más grandes. La mayoría de las empresas de Austin aún no están a la escala donde estos roles son comunes.',
  'pm-atx-5.whyItMatters': 'El bajo volumen hace que este sea un objetivo primario difícil en Austin. Si esta es tu especialidad, puede que necesites combinarla con oportunidades remotas.',
  'pm-atx-5.recommendedAction': 'Amplía tu búsqueda para incluir roles remotos de Product Ops mientras mantienes PM generalista en Austin como respaldo.',

  // Austin Surrounding
  'pm-atxs-1.explanation': 'Los roles de PM en Round Rock y Cedar Park están anclados por Dell Technologies, Emerson Automation y un grupo creciente de empresas SaaS de mercado medio que se reubican desde el centro de Austin por menores costos de arrendamiento.',
  'pm-atxs-1.whyItMatters': 'Estos roles típicamente ofrecen compensación similar a Austin con desplazamientos más cortos y menor competencia. Dell por sí solo opera múltiples organizaciones de producto desde Round Rock.',
  'pm-atxs-1.recommendedAction': 'Si estás abierto a trabajo de producto enterprise/B2B, Dell y Emerson son objetivos fuertes. La cultura de PM tiende hacia enterprise pero el trabajo es sustancial.',

  'pm-atxs-2.explanation': 'Georgetown y Leander tienen muy pocos roles dedicados de PM. La mayoría del trabajo de producto en estas áreas es en oficinas satélite o empresas pequeñas donde PM se superpone con funciones de fundador o gestión de proyectos.',
  'pm-atxs-2.whyItMatters': 'No planifiques tu búsqueda de empleo alrededor de estas ubicaciones específicamente. El volumen de roles es demasiado bajo para ser una fuente confiable.',
  'pm-atxs-2.recommendedAction': 'Trata los roles en Georgetown/Leander como bonificaciones, no como objetivos. Enfoca tu búsqueda en Austin propiamente dicho, Round Rock o remoto — y vive donde prefieras.',

  'pm-atxs-3.explanation': 'San Marcos es principalmente una ciudad universitaria (Texas State) con densidad de empleadores tech muy limitada. Pflugerville es residencial con casi ningún empleador principal de PM — la mayoría de los residentes viajan a Austin o Round Rock.',
  'pm-atxs-3.whyItMatters': 'Ninguna ubicación tiene la densidad de empleadores para soportar una búsqueda de trabajo de PM. Los números aquí confirman que vivir en estas áreas es una elección de estilo de vida, no una elección de mercado laboral.',
  'pm-atxs-3.recommendedAction': 'Si vives en San Marcos o Pflugerville, busca roles en Austin y Round Rock o trabaja en remoto. Tu dirección no limita tus opciones — tu radio de búsqueda sí.',

  'pm-atxs-4.explanation': 'Los roles de AI y PM Técnico fuera de los límites de la ciudad de Austin están casi exclusivamente en Dell (Round Rock) y un puñado de empresas de defensa/semiconductores. La prima de especialización existe pero el volumen es muy delgado.',
  'pm-atxs-4.whyItMatters': 'Si quieres trabajo de AI PM y vives en las áreas circundantes, lo más probable es que necesites viajar a Austin o trabajar remotamente. La base de empleadores suburbanos no se ha puesto al día con la ola de AI PM.',
  'pm-atxs-4.recommendedAction': 'Combina una búsqueda de AI PM en la ciudad de Austin con solicitudes remotas. No te restrinjas a tu código postal inmediato para roles especializados.',

  // Remote
  'pm-rem-1.explanation': 'Aproximadamente el 33% de todas las publicaciones de empleo de PM en EE.UU. ahora listan "remoto" como opción, subiendo del 22% en 2023. El PM remoto está creciendo al 15%, al ritmo del mercado general de PM.',
  'pm-rem-1.whyItMatters': 'PM remoto es una categoría real y sostenida — no una anomalía de la pandemia. Sin embargo, la competencia por rol es 3-5x mayor que las publicaciones locales porque estás compitiendo a nivel nacional.',
  'pm-rem-1.recommendedAction': 'Aplica a roles remotos pero no los hagas tu único canal. Combina con búsqueda local en Austin para una fuente balanceada. Personaliza cada solicitud remota — las solicitudes genéricas se filtran a tasas mucho más altas.',

  'pm-rem-2.explanation': 'Los roles remotos de AI PM están en auge porque las startups nativas de IA son abrumadoramente remote-first. Muchas empresas de IA no tienen oficina física — toda la organización de producto trabaja de forma distribuida.',
  'pm-rem-2.whyItMatters': 'Esta es la intersección de mayor demanda y mayor compensación en el mercado de PM ahora mismo. AI PM remoto es donde la escasez de talento es más aguda.',
  'pm-rem-2.recommendedAction': 'Este debería ser tu objetivo remoto de mayor prioridad. Construye expertise visible en productos de IA (blog posts, casos de estudio, contribuciones open-source) porque la contratación remota depende fuertemente de señales de portafolio.',

  'pm-rem-3.explanation': 'Los roles remotos de PM Técnico son comunes en empresas de herramientas para desarrolladores, proveedores de infraestructura cloud y negocios API-first — muchos de los cuales eran remotos antes de 2020.',
  'pm-rem-3.whyItMatters': 'Estos roles son más estables que las categorías impulsadas por hype porque las empresas que contratan para ellos tienen prácticas remotas maduras e ingresos reales.',
  'pm-rem-3.recommendedAction': 'Apunta a empresas como Vercel, Supabase, PlanetScale, Datadog o Cloudflare. Enfatiza pensamiento de plataforma, diseño de APIs y experiencia de desarrollador en las solicitudes.',

  'pm-rem-4.explanation': 'Los roles remotos de Growth PM son comunes en empresas PLG (crecimiento liderado por producto) donde el producto es el motor de adquisición y retención. Estas empresas se preocupan por la velocidad de experimentación, no por la presencia en oficina.',
  'pm-rem-4.whyItMatters': 'Los roles de Growth PM recompensan el output sobre la presencia, haciéndolos un ajuste natural para trabajo remoto. Si puedes mostrar resultados basados en experimentación, la ubicación se vuelve irrelevante.',
  'pm-rem-4.recommendedAction': 'Documenta 3-5 experimentos que hayas ejecutado con métricas claras de antes/después. Las empresas PLG quieren ver que piensas en hipótesis y mides impacto — esto importa más que dónde te sientes.',

  'pm-rem-5.explanation': 'Los roles remotos de Product Ops y Estrategia existen en empresas en etapa de escala (500+ empleados) que ya tienen equipos de producto distribuidos. Son roles de alta coordinación donde el trabajo remoto es viable pero no el estándar.',
  'pm-rem-5.whyItMatters': 'Las empresas que contratan Product Ops remoto están señalando que confían en la coordinación asíncrona. Esto típicamente significa una organización de producto madura con procesos establecidos.',
  'pm-rem-5.recommendedAction': 'Busca roles remotos de Product Ops en empresas con "distribuido" en su descripción de cultura. Destaca habilidades de comunicación asíncrona, documentación y facilitación entre zonas horarias.',

  // ============================================================
  // PM MARKET INSIGHTS
  // ============================================================
  'pmi-us-1.title': 'AI PM es el rol #1 de crecimiento en product management',
  'pmi-us-1.metric': 'Crecimiento Proyectado',
  'pmi-us-1.metricValue': '42% (2024-2034)',
  'pmi-us-1.explanation': 'Los roles de AI PM están creciendo más rápido que cualquier otra subespecialidad de PM porque cada empresa que lanza funciones de IA necesita a alguien que pueda definir qué pueden hacer los modelos y convertir eso en un roadmap de producto.',
  'pmi-us-1.whyItMatters': 'Esto no es un pico temporal. La adopción empresarial de IA está al 78% y acelerando. Las empresas que no están contratando AI PMs hoy los estarán contratando en 18 meses.',
  'pmi-us-1.recommendedAction': 'Invierte en habilidades de producto de IA ahora, incluso si no estás apuntando a roles de AI PM inmediatamente. Este conocimiento se convertirá en requisito básico para todos los roles de PM en 3-5 años.',

  'pmi-us-2.title': 'Los salarios de PM se comprimen fuera de las top-10 metros',
  'pmi-us-2.metric': 'Rango Salarial Mediano',
  'pmi-us-2.metricValue': '$142K-$192K',
  'pmi-us-2.explanation': 'La brecha salarial entre la subespecialidad de PM mejor pagada (AI PM a $192K) y la más baja (PM de Programa/Delivery a $142K) es $50K. Fuera de las principales metros, los salarios de PM generalista se agrupan alrededor de $140-155K.',
  'pmi-us-2.whyItMatters': 'Si persigues crecimiento salarial, el camino es a través de la especialización (IA, Técnico, Crecimiento), no a través de antigüedad en roles generalistas. El techo salarial del PM generalista se está aplanando.',
  'pmi-us-2.recommendedAction': 'Elige una especialización y construye profundidad. La prima salarial por especialización es 15-25% por encima del PM generalista al mismo nivel.',

  'pmi-us-3.title': 'Los roles de PM de Delivery/Programa enfrentan presión de automatización',
  'pmi-us-3.metric': 'Riesgo de Desplazamiento por IA',
  'pmi-us-3.metricValue': 'Moderado (35-45%)',
  'pmi-us-3.explanation': 'Las herramientas de IA ya están automatizando actualizaciones de estado, seguimiento de dependencias y cronogramas de proyectos — las tareas centrales de los roles de PM enfocados en delivery. Los roles no desaparecen, pero la porción táctica se reduce.',
  'pmi-us-3.whyItMatters': 'Si tu día a día es principalmente coordinación, reportes de estado y gestión de cronogramas, el valor de mercado de esas tareas está disminuyendo. Los roles que sobreviven requerirán más juicio estratégico.',
  'pmi-us-3.recommendedAction': 'Si estás en PM de delivery/programa, comienza a asumir responsabilidades de descubrimiento, priorización o negociación con stakeholders ahora — antes de que el rol se reduzca a tu alrededor.',

  'pmi-atx-1.title': 'El mercado de PM en Austin supera el promedio nacional',
  'pmi-atx-1.metric': 'Tasa de Crecimiento Local',
  'pmi-atx-1.metricValue': '18% vs. 14% a nivel nacional',
  'pmi-atx-1.explanation': 'Los roles de PM en Austin están creciendo 4 puntos más rápido que el promedio de EE.UU., impulsados por expansiones de empresas tech (Apple, Google, Oracle) y un denso ecosistema de startups.',
  'pmi-atx-1.whyItMatters': 'Austin ha pasado de "emergente" a "establecido" como mercado de PM. La tasa de crecimiento significa que se crean nuevos roles más rápido de lo que el talento local puede cubrir — bueno para quienes buscan empleo.',
  'pmi-atx-1.recommendedAction': 'Si estás en Austin, estás en una posición fuerte. Prioriza construir conexiones de red locales — los gerentes de contratación aquí aún dependen mucho de las referencias.',

  'pmi-atx-2.title': 'La demanda de AI PM en Austin supera la oferta ~3:1',
  'pmi-atx-2.metric': 'Relación Oferta-Demanda',
  'pmi-atx-2.metricValue': '620 roles / ~200 candidatos locales cualificados',
  'pmi-atx-2.explanation': 'Austin tiene aproximadamente 620 roles abiertos de AI PM pero el pool local de PMs con experiencia genuina en productos de IA se estima en alrededor de 200. Las empresas compiten por un pool de talento pequeño.',
  'pmi-atx-2.whyItMatters': 'Este desequilibrio oferta-demanda significa que los candidatos de AI PM en Austin tienen un fuerte poder de negociación. Las empresas ofrecen paquetes de reubicación y compensación por encima del mercado.',
  'pmi-atx-2.recommendedAction': 'Si tienes cualquier experiencia en productos de IA, hazte visible en el mercado de Austin inmediatamente. Incluso experiencia adyacente (productos de datos, funcionalidades cercanas a ML) califica.',

  'pmi-atxs-1.title': 'Las áreas circundantes tienen baja densidad de empleadores de PM',
  'pmi-atxs-1.metric': 'Total de Vacantes de PM',
  'pmi-atxs-1.metricValue': '~650 en todas las áreas circundantes',
  'pmi-atxs-1.explanation': 'Round Rock, Cedar Park, Georgetown, Leander, San Marcos y Pflugerville combinados tienen unas 650 vacantes de PM — aproximadamente el 23% de Austin ciudad solo. La gran mayoría están en Dell en Round Rock.',
  'pmi-atxs-1.whyItMatters': 'No puedes construir una búsqueda de carrera de PM alrededor de ubicaciones suburbanas de Austin solamente. Los números son demasiado delgados para un flujo de fuente confiable.',
  'pmi-atxs-1.recommendedAction': 'Vive donde quieras en el área metropolitana de Austin. Busca roles en la ciudad de Austin y Round Rock, y complementa con solicitudes remotas. Tu dirección importa menos que tu radio de búsqueda.',

  'pmi-atxs-2.title': 'Round Rock es la única área circundante con profundidad de PM',
  'pmi-atxs-2.metric': 'Vacantes de PM en Round Rock',
  'pmi-atxs-2.metricValue': '~380 roles',
  'pmi-atxs-2.explanation': 'Round Rock representa el 58% de todos los roles de PM en las áreas circundantes de Austin, casi en su totalidad debido a Dell Technologies. Cedar Park tiene un cluster pequeño pero creciente.',
  'pmi-atxs-2.whyItMatters': 'Si específicamente quieres evitar viajar a Austin, Round Rock es tu única opción suburbana con volumen significativo de roles de PM. Todo lo demás es demasiado escaso.',
  'pmi-atxs-2.recommendedAction': 'Apunta a Dell y sus socios de ecosistema en Round Rock. Para todas las demás áreas circundantes, planifica viajar o trabajar en remoto.',

  'pmi-rem-1.title': 'El 33% de las publicaciones de PM ahora ofrecen remoto — pero la competencia es 3-5x mayor',
  'pmi-rem-1.metric': 'Participación de PM Remoto',
  'pmi-rem-1.metricValue': '33% de todas las publicaciones de PM en EE.UU.',
  'pmi-rem-1.explanation': 'Un tercio de todas las publicaciones de empleo de PM listan remoto como opción. Este es un cambio real y sostenido — no un efecto de la pandemia. Sin embargo, cada publicación remota recibe 3-5 veces más solicitudes que una equivalente local.',
  'pmi-rem-1.whyItMatters': 'PM remoto es viable pero más difícil de conseguir. Tu solicitud necesita destacar más porque estás compitiendo contra todo el país, no solo tu metro.',
  'pmi-rem-1.recommendedAction': 'Trata las solicitudes remotas como complemento a tu búsqueda local, no como reemplazo. Invierte más por solicitud — carta de presentación personalizada, enlace de portafolio y un gancho claro de "por qué esta empresa".',

  'pmi-rem-2.title': 'AI PM remoto es la categoría de PM remoto con mayor compensación',
  'pmi-rem-2.metric': 'Salario Mediano de AI PM Remoto',
  'pmi-rem-2.metricValue': '$188,000',
  'pmi-rem-2.explanation': 'Los roles remotos de AI PM pagan una mediana de $188K — más alto que la mayoría de los roles de PM generalista presenciales en empresas de primer nivel. Las startups nativas de IA están dispuestas a pagar top porque el pool de talento es pequeño y distribuido.',
  'pmi-rem-2.whyItMatters': 'Si puedes conseguir un rol remoto de AI PM, obtienes compensación nivel SF sin el costo de vida de SF. Este es el mejor arbitraje financiero disponible en el mercado de PM ahora mismo.',
  'pmi-rem-2.recommendedAction': 'Construye un portafolio público de pensamiento de producto de IA — escribe sobre cómo diseñarías funciones de IA, publica casos de estudio o contribuye a comunidades de producto de IA. La contratación remota de AI PM está impulsada por el portafolio.',

  // ============================================================
  // PM RECOMMENDATIONS
  // ============================================================
  'rec-1.title': 'Prioriza AI Product Management como tu objetivo principal',
  'rec-1.body': 'AI PM tiene la tasa de crecimiento más alta (42% nacional, 48% en Austin), el salario mediano más alto ($185-192K) y la escasez de talento más aguda. Ya sea que lo persigas localmente en Austin o remotamente, aquí es donde el mercado se mueve más rápido y donde tu ratio esfuerzo-resultado es mejor. No necesitas un título en ML — necesitas demostrar que puedes definir las capacidades de IA, establecer criterios de evaluación y lanzar funciones con IA.',
  'rec-2.title': 'Desarrolla fluidez en productos de IA aunque apuntes a otros roles de PM',
  'rec-2.body': 'En 3-5 años, la fluidez en IA será esperada en todos los roles de PM, no solo en los específicos de IA. Comienza a aprender cómo funcionan los LLMs a nivel de producto: qué pueden y qué no pueden hacer, cómo evaluar la calidad del output, cómo diseñar flujos de trabajo human-in-the-loop. Esta es la inversión de habilidades con mayor ROI que puedes hacer ahora mismo.',
  'rec-3.title': 'Usa Austin + Remoto como estrategia de búsqueda de doble canal',
  'rec-3.body': 'Austin tiene fuerte demanda local de PM (2,800+ roles en la ciudad, creciendo al 18%) y tienes acceso geográfico. Remoto abre otros 11,200+ roles a nivel nacional. Ejecuta ambos canales simultáneamente — aplica localmente con intros cálidas impulsadas por networking y remotamente con solicitudes frías impulsadas por portafolio. Esto te da el embudo más amplio sin diluir el enfoque.',
  'rec-4.title': 'No restrinjas tu búsqueda a las áreas circundantes de Austin',
  'rec-4.body': 'Round Rock, Cedar Park, Georgetown, Leander, San Marcos y Pflugerville combinados tienen solo ~650 vacantes de PM, con 58% en un solo empleador (Dell). Los números son demasiado delgados para construir una fuente confiable. Vive donde prefieras en el área metro — viaja a Austin o Round Rock cuando sea necesario, y usa oportunidades remotas para todo lo demás.',
  'rec-5.title': 'Si estás en PM de delivery/programa, comienza a reposicionarte ahora',
  'rec-5.body': 'Los roles de PM de delivery y programa están creciendo solo al 10% y enfrentan 35-45% de riesgo de desplazamiento por IA en sus tareas centrales. El valor de mercado de los reportes de estado, gestión de cronogramas y seguimiento de dependencias está disminuyendo a medida que las herramientas de IA automatizan estas funciones. Comienza a asumir responsabilidades de descubrimiento, priorización o diseño de experimentos en tu rol actual. Enmarca tu próxima búsqueda de empleo alrededor de habilidades estratégicas de PM, no mecánicas de ejecución.',
  'rec-6.title': 'Especialízate para romper el techo salarial generalista',
  'rec-6.body': 'Los salarios de PM generalista se comprimen alrededor de $142-158K fuera de las principales metros. El camino hacia mayor compensación es la especialización: AI PM ($185-192K), PM Técnico ($168-175K) o Growth PM ($155-165K), todos con primas del 15-25%. Elige la especialización más cercana a tu experiencia existente y construye profundidad. Una historia fuerte de especialización supera diez solicitudes generalistas.',

  // ============================================================
  // ACTIVE LISTINGS (seniority & postedDate)
  // ============================================================
  'Senior': 'Senior',
  'Mid-Senior': 'Mid-Senior',
  'Mid': 'Mid',
  'Principal': 'Principal',
  'Active as of May 2026': 'Activo desde mayo 2026',

  // ============================================================
  // JOB MARKET SIGNALS
  // ============================================================
  'jms-us.summary': 'El panorama nacional de contratación de PM es fuerte y está inclinado hacia la especialización. Los roles de AI PM dominan las publicaciones de mayor compensación, con empresas como Anthropic, Scale AI y HubSpot reclutando activamente. La demanda de PM Técnico se mantiene robusta en empresas de infraestructura y plataformas (Stripe, Figma, Plaid). Growth PM se concentra en fintech de alta velocidad y empresas PLG. La señal general: la contratación de PM generalista continúa, pero las publicaciones premium — las que pagan $170K+ — abrumadoramente requieren fluidez en IA, experiencia técnica en plataformas o habilidades demostradas en experimentación de crecimiento. Las empresas no solo publican roles; publican por capacidades específicas.',
  'jms-atx.summary': 'La contratación de PM en Austin refleja la evolución de la ciudad hacia un hub tech top-5. Apple, Oracle, Tesla y CrowdStrike están contratando activamente PMs con especializaciones en IA y técnicas. La señal específica de Austin: las empresas locales compiten con SF y NYC por el mismo talento de AI PM, lo que significa que los paquetes de compensación están subiendo para mantenerse competitivos. Indeed sigue siendo el mayor empleador nativo de PM en Austin, y Bumble ofrece uno de los pocos asientos puros de Growth PM en la ciudad. Las empresas que contratan localmente quieren candidatos que participen en la comunidad tech de Austin — el networking aquí no es opcional, es parte de la señal de contratación.',
  'jms-atxs.summary': 'Las áreas circundantes confirman el patrón de los datos agregados: Round Rock es el único suburbio con contratación significativa de PM, y Dell domina ese mercado. Emerson añade una opción nicho de tech industrial. Fuera de Round Rock, la densidad de listados cae bruscamente — Georgetown, Leander, San Marcos y Pflugerville no tienen esencialmente roles dedicados de PM de empleadores principales. El camino realista para candidatos de PM que viven en estas áreas: viajar a Austin o Round Rock para roles presenciales, o enfocarse en el canal remoto. No planifiques una búsqueda de empleo alrededor de la densidad de empleadores suburbanos.',
  'jms-rem.summary': 'La contratación remota de PM es madura, competitiva y fuertemente orientada hacia herramientas de desarrollador y empresas de IA. Vercel, Supabase, GitLab, Zapier y Linear son todas remote-first por diseño — no adaptaciones pandémicas. La señal remota: estas empresas evalúan candidatos principalmente por portafolio, comunicación escrita y habilidades de colaboración asíncrona. AI PM remoto (Supabase, GitLab, Zapier, Descript) ofrece la mejor relación compensación-flexibilidad del mercado. Growth PM remoto (Webflow, Mercury) recompensa resultados de experimentación demostrados sobre pedigrí. La competencia por listado es 3-5x mayor que roles locales, así que la calidad de solicitud importa más que el volumen.',

  // ============================================================
  // LISTING RELEVANCE TEXTS
  // ============================================================
  // US listings
  'AI-native company building frontier models. Direct AI PM work — scoping model capabilities into product features, exactly where the highest demand and salary premium sit.':
    'Empresa nativa de IA construyendo modelos de frontera. Trabajo directo de AI PM — definiendo capacidades de modelos en funcionalidades de producto, exactamente donde la mayor demanda y prima salarial se concentran.',
  'Technical PM role on payments platform. API-first product thinking, developer experience focus, and infrastructure-level complexity — strong fit for Technical PM specialization.':
    'Rol de PM Técnico en plataforma de pagos. Pensamiento de producto API-first, enfoque en experiencia de desarrollador y complejidad a nivel de infraestructura — fuerte ajuste para especialización en PM Técnico.',
  'Intersection of AI PM and Technical PM. Building AI-powered observability features for developers — combines platform product experience with AI capability scoping.':
    'Intersección de AI PM y PM Técnico. Construyendo funciones de observabilidad con IA para desarrolladores — combina experiencia en producto de plataforma con definición de capacidades de IA.',
  'AI PM role at a productivity tool company. Shipping LLM-powered features to millions of users — high-visibility AI product work with direct user impact measurement.':
    'Rol de AI PM en empresa de herramientas de productividad. Lanzando funcionalidades con LLM a millones de usuarios — trabajo de producto de IA de alta visibilidad con medición directa de impacto.',
  'Platform PM role focused on developer ecosystem and plugin marketplace. Strong Technical PM fit — API design, third-party developer experience, and platform growth strategy.':
    'Rol de PM de Plataforma enfocado en ecosistema de desarrolladores y marketplace de plugins. Fuerte ajuste para PM Técnico — diseño de APIs, experiencia de desarrolladores terceros y estrategia de crecimiento de plataforma.',
  'Fintech data platform role. API product management, regulatory-aware product decisions (financial data handling), and B2B product strategy in a high-growth vertical.':
    'Rol de plataforma de datos fintech. Gestión de productos API, decisiones de producto conscientes de regulación (manejo de datos financieros) y estrategia de producto B2B en un vertical de alto crecimiento.',
  'AI PM at the intersection of hardware and software. Computer vision product features for physical security — a differentiated AI PM niche with less competition than pure-software AI roles.':
    'AI PM en la intersección de hardware y software. Funcionalidades de producto de visión por computadora para seguridad física — un nicho diferenciado de AI PM con menos competencia que los roles de IA de software puro.',
  'Senior AI PM role embedding LLM capabilities into enterprise CRM. High-impact role translating AI into revenue features for millions of SMBs — strong growth PM angle too.':
    'Rol senior de AI PM integrando capacidades de LLM en CRM empresarial. Rol de alto impacto traduciendo IA en funcionalidades de ingresos para millones de PyMEs — también fuerte ángulo de Growth PM.',
  'AI infrastructure company. PM role on the enterprise platform that powers AI training data for government and Fortune 500 — deep AI domain with enterprise product complexity.':
    'Empresa de infraestructura de IA. Rol de PM en la plataforma empresarial que potencia datos de entrenamiento de IA para gobierno y Fortune 500 — dominio profundo de IA con complejidad de producto empresarial.',
  'Pure Growth PM role at one of the fastest-growing fintech companies. Metric-driven experimentation, activation/retention funnels, and PLG motion — exactly the skills that command a Growth PM premium.':
    'Rol puro de Growth PM en una de las empresas fintech de más rápido crecimiento. Experimentación basada en métricas, funnels de activación/retención y estrategia PLG — exactamente las habilidades que demandan una prima de Growth PM.',

  // Austin listings
  'AI PM at Apple Austin campus. Working on Apple Intelligence features that ship to billions of devices — massive scale AI product work with Austin-local presence.':
    'AI PM en campus de Apple Austin. Trabajando en funciones de Apple Intelligence que llegan a miles de millones de dispositivos — trabajo de producto de IA a escala masiva con presencia local en Austin.',
  'Enterprise AI PM role. Building AI services for Oracle Cloud Infrastructure — cloud platform product work with AI specialization at a company investing heavily in Austin.':
    'Rol de AI PM empresarial. Construyendo servicios de IA para Oracle Cloud Infrastructure — trabajo de producto de plataforma cloud con especialización en IA en una empresa que invierte fuertemente en Austin.',
  'Technical PM role on search and ML-powered recommendations. Indeed is Austin-native — deep local network, strong engineering culture, and AI/ML product integration at scale.':
    'Rol de PM Técnico en búsqueda y recomendaciones con ML. Indeed es nativo de Austin — red local profunda, fuerte cultura de ingeniería e integración de producto AI/ML a escala.',
  'Technical PM at Tesla Austin HQ. Energy products (Powerwall, Megapack) sit at the intersection of hardware, software, and clean energy — differentiated product domain.':
    'PM Técnico en sede de Tesla Austin. Productos de energía (Powerwall, Megapack) en la intersección de hardware, software y energía limpia — dominio de producto diferenciado.',
  'AI PM at an Austin-native company. Integrating AI content generation into WordPress hosting platform — practical AI product work for a large creator/SMB user base.':
    'AI PM en empresa nativa de Austin. Integrando generación de contenido con IA en plataforma de hosting WordPress — trabajo práctico de producto de IA para una gran base de creadores/PyMEs.',
  'Cybersecurity platform PM in Austin. ML-powered threat detection, real-time data products, and enterprise security — a high-growth vertical with strong regulatory tailwinds.':
    'PM de plataforma de ciberseguridad en Austin. Detección de amenazas con ML, productos de datos en tiempo real y seguridad empresarial — un vertical de alto crecimiento con fuertes vientos regulatorios a favor.',
  'Growth PM at Austin-headquartered consumer tech company. User acquisition, retention experiments, and PLG metrics — direct Growth PM specialization with Austin-local presence.':
    'Growth PM en empresa de tech de consumo con sede en Austin. Adquisición de usuarios, experimentos de retención y métricas PLG — especialización directa en Growth PM con presencia local en Austin.',
  'AI PM in construction tech (vertical SaaS). Applying AI to a traditional industry with massive efficiency gains — less competitive than pure-tech AI PM roles with similar comp.':
    'AI PM en tech de construcción (SaaS vertical). Aplicando IA a una industria tradicional con ganancias masivas de eficiencia — menos competitivo que los roles de AI PM de tech puro con compensación similar.',

  // Austin surrounding listings
  'AI PM at the largest employer in Round Rock. Building AI server and infrastructure products — hardware-meets-AI product work with enterprise scale and strong local job stability.':
    'AI PM en el mayor empleador de Round Rock. Construyendo servidores de IA y productos de infraestructura — trabajo de producto donde hardware se encuentra con IA a escala empresarial con fuerte estabilidad laboral local.',
  "Cloud platform PM at Dell. APEX is Dell's as-a-service platform — Technical PM work on infrastructure products with subscription/consumption model. Stable employer, solid comp.":
    'PM de plataforma cloud en Dell. APEX es la plataforma as-a-service de Dell — trabajo de PM Técnico en productos de infraestructura con modelo de suscripción/consumo. Empleador estable, buena compensación.',
  'Industrial IoT product management. Software platform for manufacturing automation — niche but defensible domain with less competition from traditional tech PMs.':
    'Gestión de productos IoT industrial. Plataforma de software para automatización de manufactura — dominio nicho pero defendible con menos competencia de PMs tech tradicionales.',
  'Consumer digital product role (booking, in-resort app, guest experience). Lower comp than tech PM but lower barrier to entry — possible stepping stone for career switchers in the area.':
    'Rol de producto digital de consumo (reservas, app en resort, experiencia del huésped). Menor compensación que PM tech pero menor barrera de entrada — posible trampolín para quienes hacen cambio de carrera en el área.',

  // Remote listings
  'Remote-first developer tools company. Technical PM role on DX — the workflow developers use daily. API design, deployment UX, and platform thinking at a company defining the modern web stack.':
    'Empresa de herramientas para desarrolladores remote-first. Rol de PM Técnico en DX — el flujo de trabajo que los desarrolladores usan diariamente. Diseño de APIs, UX de deployment y pensamiento de plataforma en una empresa que define el stack web moderno.',
  'AI + Technical PM at an open-source database platform. Vector search, AI integrations, and developer tools — remote-first with strong open-source community engagement.':
    'AI + PM Técnico en plataforma de base de datos open-source. Búsqueda vectorial, integraciones de IA y herramientas para desarrolladores — remote-first con fuerte engagement de comunidad open-source.',
  'Senior AI PM at a fully remote public company. Embedding AI into the developer workflow — code generation, vulnerability detection, review automation. Remote-first culture since founding.':
    'AI PM Senior en empresa pública completamente remota. Integrando IA en el flujo de trabajo del desarrollador — generación de código, detección de vulnerabilidades, automatización de revisiones. Cultura remote-first desde su fundación.',
  'AI PM at the leading automation platform. Building AI-powered workflow creation for millions of non-technical users — AI product work with direct consumer impact and PLG metrics.':
    'AI PM en la plataforma líder de automatización. Construyendo creación de flujos de trabajo con IA para millones de usuarios no técnicos — trabajo de producto de IA con impacto directo en consumidor y métricas PLG.',
  'Growth PM at a PLG design tool. Self-serve acquisition, activation, and expansion — pure Growth PM work at a remote-first company with strong product-led motion.':
    'Growth PM en herramienta de diseño PLG. Adquisición self-serve, activación y expansión — trabajo puro de Growth PM en empresa remote-first con fuerte estrategia product-led.',
  'Technical PM on the most-used API development platform. Developer tools, API design, and ecosystem growth — deep Technical PM work in a remote-first environment.':
    'PM Técnico en la plataforma de desarrollo de APIs más usada. Herramientas para desarrolladores, diseño de APIs y crecimiento de ecosistema — trabajo profundo de PM Técnico en entorno remote-first.',
  'AI PM building smart video features (auto-summaries, chapters, search). Consumer-facing AI with enterprise distribution through Atlassian — AI product work with dual-market reach.':
    'AI PM construyendo funciones de video inteligente (resúmenes automáticos, capítulos, búsqueda). IA orientada al consumidor con distribución empresarial a través de Atlassian — trabajo de producto de IA con alcance de doble mercado.',
  'Generalist PM at one of the most respected product-led developer tools. Small team, high autonomy, and extreme attention to product craft — great resume signal and skill development.':
    'PM Generalista en una de las herramientas de desarrollador product-led más respetadas. Equipo pequeño, alta autonomía y atención extrema al craft de producto — gran señal en CV y desarrollo de habilidades.',
  'AI PM at a creative tools startup. AI-powered video/audio editing — generative AI product work in a consumer-friendly domain. Less crowded than enterprise AI PM applications.':
    'AI PM en startup de herramientas creativas. Edición de video/audio con IA — trabajo de producto de IA generativa en un dominio amigable al consumidor. Menos saturado que las solicitudes de AI PM empresarial.',
  'Fintech platform PM. Building banking products for startups — regulatory-aware product decisions, API-first architecture, and Growth PM elements in customer acquisition.':
    'PM de plataforma fintech. Construyendo productos bancarios para startups — decisiones de producto conscientes de regulación, arquitectura API-first y elementos de Growth PM en adquisición de clientes.',

  // ============================================================
  // CATEGORIES (displayed in signal detail)
  // ============================================================
  'ethical': 'ético',
  'cultural': 'cultural',
  'regulatory': 'regulatorio',
  'technological': 'tecnológico',

  // ============================================================
  // TREND LABELS
  // ============================================================
  'up': 'al alza',
  'down': 'a la baja',
  'stable': 'estable',

  // ============================================================
  // SCENARIO EFFECT TARGETS (from scoring-engine)
  // ============================================================
  'Tech Valuations': 'Valuaciones Tech',
  'Startup Funding': 'Financiamiento de Startups',
  'PM Job Growth': 'Crecimiento Empleos PM',
  'Defense Stocks': 'Acciones de Defensa',
  'Supply Chain Risk': 'Riesgo de Cadena de Suministro',
  'Automation Risk': 'Riesgo de Automatización',
  'AI Startup Growth': 'Crecimiento Startups de IA',
  'AI PM Demand': 'Demanda de AI PM',
  'Consumer Spending': 'Gasto del Consumidor',
  'Retail Growth': 'Crecimiento Retail',
  'Market Confidence': 'Confianza del Mercado',
  'Business Transparency': 'Transparencia Empresarial',
  'FDI Flows': 'Flujos de IED',
  'Compliance Costs': 'Costos de Cumplimiento',
  'Fintech Opportunity': 'Oportunidad Fintech',
  'Remote PM Roles': 'Roles PM Remotos',
  'Commercial RE Pressure': 'Presión en Bienes Raíces Comerciales',
  'Office-Based Jobs': 'Empleos Presenciales',
  'Clean Energy Stocks': 'Acciones de Energía Limpia',
  'ESG Fund Growth': 'Crecimiento Fondos ESG',
  'Green Startup Funding': 'Financiamiento Startups Verdes',

  // ============================================================
  // SCENARIO CASCADE — targetSector values (excluding duplicates defined above)
  // ============================================================
  'Technology': 'Tecnología',
  // 'VC Funding' already defined in correlation labels
  'PM Hiring Velocity': 'Velocidad de Contratación PM',
  'AI Startups': 'Startups de IA',
  'Technical PM': 'PM Técnico',
  'Defense': 'Defensa',
  'Emerging Markets': 'Mercados Emergentes',
  'Technical PM (Defense/Security)': 'PM Técnico (Defensa/Seguridad)',
  'Retail': 'Retail',
  'D2C Startups': 'Startups D2C',
  'Growth PM': 'PM de Crecimiento',
  'Product Ops/Strategy': 'Product Ops/Estrategia',
  'RegTech': 'RegTech',
  'Small Cap': 'Pequeña Capitalización',
  'Collaboration Tools': 'Herramientas de Colaboración',
  // 'Remote PM Roles' already defined in scenario effect targets
  'Austin PM Market': 'Mercado PM de Austin',
  'Renewables': 'Renovables',
  'Innovation/R&D PM': 'PM de Innovación/I+D',
  'Fossil Fuels': 'Combustibles Fósiles',
  'Delivery/Program PM': 'PM de Delivery/Programa',

  // SCENARIO CASCADE — metric values (excluding duplicates defined above)
  'Sector Growth': 'Crecimiento Sectorial',
  'Valuations': 'Valuaciones',
  'Total Investment': 'Inversión Total',
  'Startup PM Roles': 'Roles PM en Startups',
  'Net Interest Margin': 'Margen de Interés Neto',
  'Job Openings': 'Vacantes',
  'Automation Displacement': 'Desplazamiento por Automatización',
  'Funding': 'Financiamiento',
  'Revenue Growth': 'Crecimiento de Ingresos',
  'Demand Growth': 'Crecimiento de Demanda',
  'Price Volatility': 'Volatilidad de Precios',
  'Investment Attractiveness': 'Atractivo de Inversión',
  'Demand': 'Demanda',
  'Revenue': 'Ingresos',
  'Success Rate': 'Tasa de Éxito',
  'Consumer Sector Demand': 'Demanda del Sector Consumo',
  // 'FDI Inflows' already defined in scenario effect targets
  'Portfolio Allocation': 'Asignación de Portafolio',
  'Regulatory PM Demand': 'Demanda de PM Regulatorio',
  'Regulatory Product Demand': 'Demanda de Producto Regulatorio',
  'Market Opportunity': 'Oportunidad de Mercado',
  'Compliance Burden': 'Carga de Cumplimiento',
  'Occupancy Rates': 'Tasas de Ocupación',
  'Market Growth': 'Crecimiento de Mercado',
  'Availability': 'Disponibilidad',
  'Local Competition': 'Competencia Local',
  // 'Startup Funding' already defined in scenario effect targets
  'CleanTech PM Demand': 'Demanda de PM en CleanTech',
  'Market Share': 'Participación de Mercado',

  // Score card sectors (from scoring engine groupBy)
  'general': 'general',
  'global': 'global',
};
