import { GraduationCap } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground">MAI Institute</h1>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Beasiswa Bintang Mandiri Angkatan 6</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-border bg-card shadow-sm p-8">
          <h2 className="text-base font-semibold text-foreground">Masuk ke Dashboard</h2>
          <p className="mt-1 text-xs text-muted-foreground">Hanya admin yang dapat mengakses dashboard ini.</p>

          <form className="mt-6 space-y-4" action="/dashboard">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground" htmlFor="email">
                Email Admin
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@mai-institute.id"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground" htmlFor="password">
                Kata Sandi
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Masuk
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 px-3 py-2.5 text-xs text-amber-700 dark:text-amber-400">
            <strong>TBD-01:</strong> Mekanisme autentikasi (email/password, Google Login, atau lainnya) belum ditetapkan. Halaman ini adalah placeholder UI.
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          Beswan dan mentor tidak memiliki akses ke dashboard ini.
        </p>
      </div>
    </div>
  )
}

