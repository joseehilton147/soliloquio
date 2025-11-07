import Link from "next/link";
import { Sparkles, BookOpen, Users, ArrowRight } from "lucide-react";

export default function PortalHomePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Bem-vindo ao Solilóquio</h1>
        <p className="text-lg text-muted-foreground">
          Um espaço sagrado para sua jornada espiritual através do Tarot, estudos de Umbanda,
          Espiritismo e conhecimentos ancestrais.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="http://localhost:3002"
          className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-3">
                <Sparkles className="size-6 text-primary" />
              </div>
              <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Tarot</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Explore os Arcanos Maiores e suas interpretações profundas para guiar sua jornada
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                Disponível
              </span>
            </div>
          </div>
        </Link>

        <div className="group rounded-lg border bg-card p-6 opacity-60">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-muted p-3">
                <BookOpen className="size-6 text-muted-foreground" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Grimório</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Seu diário espiritual pessoal para registrar insights, sonhos e aprendizados
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                Em breve
              </span>
            </div>
          </div>
        </div>

        <div className="group rounded-lg border bg-card p-6 opacity-60">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-muted p-3">
                <Users className="size-6 text-muted-foreground" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Estudos</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Mergulhe nos fundamentos da Umbanda, Espiritismo e tradições espirituais
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                Em breve
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Sobre o Solilóquio</h2>
          <p className="text-muted-foreground">
            Solilóquio é mais que um aplicativo - é um companheiro para sua jornada interior.
            Aqui você encontrará ferramentas para:
          </p>
          <ul className="grid gap-2 md:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="mt-1">✨</span>
              <span className="text-sm text-muted-foreground">
                Consultar e estudar cartas do Tarot com interpretações profundas
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">📖</span>
              <span className="text-sm text-muted-foreground">
                Registrar suas experiências e insights espirituais
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">🌙</span>
              <span className="text-sm text-muted-foreground">
                Aprender sobre tradições ancestrais como Umbanda e Espiritismo
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">🔮</span>
              <span className="text-sm text-muted-foreground">
                Conectar-se com sabedorias espirituais milenares
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
