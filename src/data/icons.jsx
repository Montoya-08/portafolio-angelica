// Mapa de nombre → icono (lucide-react). Úsalo en los archivos de datos con `icon: 'nombre'`.
import { Code, Braces, FileCode, Palette, Atom, Database, GitBranch, Github, Table, Sigma, LineChart, BarChart3,
  Search, Brain, Layers, Gauge, Globe, Workflow, Target, GraduationCap, FlaskConical, Sparkles } from 'lucide-react'
export const icons = { code: Code, braces: Braces, file: FileCode, palette: Palette, atom: Atom, database: Database, branch: GitBranch,
  github: Github, table: Table, sigma: Sigma, line: LineChart, chart: BarChart3, search: Search, brain: Brain, layers: Layers,
  gauge: Gauge, globe: Globe, workflow: Workflow, target: Target, school: GraduationCap, flask: FlaskConical, spark: Sparkles }
export const Icon = ({ name, size = 22, ...p }) => { const C = icons[name] || Sparkles; return <C size={size} aria-hidden="true" {...p} /> }
