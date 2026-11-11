import { DashboardHeader } from "@/components/dashboard-shell"
import { masterWilayah, masterBeswan } from "@/lib/mock-data"
import { Users, MapPin } from "lucide-react"

export default function WilayahPage() {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <DashboardHeader
        title="Wilayah & Mentor"
        subtitle="Daftar kelompok mentor dan sebaran beswan per wilayah"
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 px-4 py-3 text-xs text-blue-700 dark:text-blue-300">
          <strong>TBD-12:</strong> Apakah beswan dapat berpindah wilayah/mentor selama program belum dikonfirmasi. Saat ini rekap wilayah menggunakan master wilayah/mentor yang ditetapkan admin.
        </div>

        {/* Grid Wilayah Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {masterWilayah.map((w) => {
            const beswan = masterBeswan.filter((b) => b.wilayah === w.wilayah)
            return (
              <div key={w.id} className="rounded-xl border border-border bg-card p-5 shadow-xs hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{w.id}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground leading-tight">{w.wilayah}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Mentor: <span className="font-medium text-foreground">{w.mentor}</span></p>
                <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold text-foreground">{w.jumlahBeswan} beswan</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tabel detail */}
        <div className="rounded-xl border border-border bg-card shadow-xs">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">Daftar Beswan per Wilayah</h3>
            <p className="text-xs text-muted-foreground">Beswan dikelompokkan berdasarkan master wilayah/mentor</p>
          </div>
          <div className="divide-y divide-border/50">
            {masterWilayah.map((w) => {
              const beswan = masterBeswan.filter((b) => b.wilayah === w.wilayah)
              return (
                <div key={w.id}>
                  <div className="flex items-center justify-between bg-muted/30 px-5 py-3">
                    <div>
                      <span className="text-xs font-semibold text-foreground">{w.wilayah}</span>
                      <span className="ml-3 text-xs text-muted-foreground">Mentor: {w.mentor}</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{w.jumlahBeswan} beswan</span>
                  </div>
                  {beswan.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <tbody>
                          {beswan.map((b) => (
                            <tr key={b.nid} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                              <td className="px-8 py-2.5 font-mono text-muted-foreground w-24">{b.nid}</td>
                              <td className="px-3 py-2.5 font-medium text-foreground">{b.nama}</td>
                              <td className="px-3 py-2.5 text-muted-foreground">{b.universitas}</td>
                              <td className="px-5 py-2.5">
                                {b.status === "Aktif" ? (
                                  <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">Aktif</span>
                                ) : (
                                  <span className="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">Perlu Periksa</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

