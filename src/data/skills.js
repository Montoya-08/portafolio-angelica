// ✏️ HABILIDADES. `level`: número 0-100 que TÚ confirmes, o null si aún no lo defines
// (se mostrará "Nivel por definir" y no se inventa ningún porcentaje).
export const skillCategories = [
  { id: 'software', title: 'Desarrollo de software', skills: [
    { name: 'Python', icon: 'code', level: 80, desc: 'Lenguaje para backend, automatización y ciencia de datos.' },
    { name: 'JavaScript', icon: 'braces', level: 80, desc: 'Lógica e interactividad en la web.' },
    { name: 'HTML5', icon: 'file', level: 90, desc: 'Estructura semántica de páginas web.' },
    { name: 'CSS3', icon: 'palette', level: 90, desc: 'Estilos, layouts y diseño responsive.' },
    { name: 'React', icon: 'atom', level: 85, desc: 'Interfaces con componentes reutilizables.' },
    { name: 'SQL', icon: 'database', level: 80, desc: 'Consulta y gestión de bases de datos relacionales.' },
    { name: 'Git', icon: 'branch', level: 95, desc: 'Control de versiones.' },
    { name: 'GitHub', icon: 'github', level: 95, desc: 'Colaboración y publicación de proyectos.' },
  ]},
  { id: 'data', title: 'Análisis de datos', skills: [
    { name: 'Pandas', icon: 'table', level: 75, desc: 'Manipulación y limpieza de datos tabulares.' },
    { name: 'NumPy', icon: 'sigma', level: 75, desc: 'Cálculo numérico y arreglos.' },
    { name: 'Matplotlib', icon: 'line', level: 75, desc: 'Gráficos estáticos en Python.' },
    { name: 'Seaborn', icon: 'chart', level: 75, desc: 'Visualización estadística.' },
    { name: 'Power BI', icon: 'chart', level: 75, desc: 'Dashboards e indicadores interactivos.' },
    { name: 'Excel', icon: 'table', level: 85, desc: 'Análisis y organización de datos.' },
    { name: 'Análisis exploratorio', icon: 'search', level: 90, desc: 'EDA: patrones, distribuciones y anomalías.' },
    { name: 'Visualización de datos', icon: 'line', level: 90, desc: 'Comunicar resultados con gráficos claros.' },
  ]},
  { id: 'ai', title: 'Inteligencia artificial', skills: [
    { name: 'Machine Learning', icon: 'brain', level: 90, desc: 'Aprendizaje supervisado y no supervisado.' },
    { name: 'Árboles de decisión', icon: 'branch', level: 80, desc: 'Modelos interpretables de clasificación y regresión.' },
    { name: 'Random Forest', icon: 'layers', level: 70, desc: 'Ensamble de árboles para mejorar predicciones.' },
    { name: 'Evaluación de modelos', icon: 'gauge', level: 50, desc: 'Métricas de rendimiento y validación.' },
  ]},
]
export const softSkills = ['Pensamiento analítico','Resolución de problemas','Comunicación','Trabajo en equipo','Creatividad','Pensamiento crítico','Aprendizaje autónomo']
