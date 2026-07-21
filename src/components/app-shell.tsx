import Link from "next/link";
import {
  Activity,
  BriefcaseBusiness,
  ChevronDown,
  ClipboardCheck,
  FileArchive,
  HeartHandshake,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Today", href: "/today", icon: LayoutDashboard, id: "today" },
  { label: "People Supported", href: "/people-supported", icon: HeartHandshake, id: "people" },
  { label: "Quality & Governance", href: "/quality-governance", icon: ShieldCheck, id: "quality" },
  { label: "Operations", href: "/operations", icon: Activity, id: "operations" },
  { label: "Workforce", href: "/workforce", icon: Users, id: "workforce" },
  { label: "Finance", href: "/finance", icon: BriefcaseBusiness, id: "finance" },
  { label: "Evidence & Reports", href: "/evidence-reports", icon: FileArchive, id: "evidence" },
] as const;

export function AppShell({
  active,
  children,
}: {
  active: (typeof navigation)[number]["id"];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-50 -translate-y-20 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-slate-950 text-white lg:flex">
        <Link href="/today" className="flex h-20 items-center gap-3 border-b border-white/10 px-6" aria-label="Muve Intelligence home">
          <span className="grid size-10 place-items-center rounded-xl bg-cyan-400 font-black tracking-tight text-slate-950">M</span>
          <span>
            <span className="block text-base font-bold tracking-tight">MUVE</span>
            <span className="block text-xs text-slate-400">Assurance intelligence</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex-1 space-y-1 px-3 py-5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const selected = active === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={selected ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                  selected && "bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:text-slate-950",
                )}
              >
                <Icon className="size-4.5 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-violet-300 text-xs font-bold text-slate-950">LB</span>
              <span>Registered Manager</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">All demonstration services</p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <Link href="/today" className="mr-auto flex items-center gap-2 lg:hidden" aria-label="Muve Intelligence home">
              <span className="grid size-8 place-items-center rounded-lg bg-slate-950 text-sm font-black text-cyan-300">M</span>
              <span className="font-bold">MUVE</span>
            </Link>

            <button type="button" className="hidden min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-left text-sm sm:flex" aria-label="Current service scope">
              <ClipboardCheck className="size-4 text-cyan-700" aria-hidden="true" />
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Scope</span>
                <span className="font-medium">All services</span>
              </span>
              <ChevronDown className="size-4 text-slate-400" aria-hidden="true" />
            </button>

            <button type="button" className="hidden min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm md:flex" aria-label="Search records">
              <Search className="size-4 text-slate-500" aria-hidden="true" />
              Search
              <kbd className="ml-3 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-500">⌘K</kbd>
            </button>

            <Link
              href="/today#ask-muve"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-violet-100 px-3 text-sm font-semibold text-violet-950 transition hover:bg-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
            >
              <Sparkles className="size-4" aria-hidden="true" />
              Ask Muve
            </Link>
          </div>

          <nav aria-label="Mobile primary" className="flex gap-1 overflow-x-auto border-t border-slate-100 px-3 py-2 lg:hidden">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active === item.id ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600",
                  active === item.id && "bg-slate-950 text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main id="main-content" tabIndex={-1} className="mx-auto min-h-[calc(100vh-4rem)] max-w-[1600px] p-4 outline-none sm:p-6 lg:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge tone="info">Plan implementation preview</Badge>
            <span className="text-xs text-slate-500">Demonstration data · no personal data</span>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
