// lib/export-csv.ts
// Utility untuk ekspor data tabel dashboard admin ke file CSV (FR-21)

export function exportToCsv(arg1: string | Record<string, any>[], arg2?: string | Record<string, any>[]) {
  let filename = "export"
  let rows: Record<string, any>[] = []

  if (typeof arg1 === "string" && Array.isArray(arg2)) {
    filename = arg1
    rows = arg2
  } else if (Array.isArray(arg1) && typeof arg2 === "string") {
    rows = arg1
    filename = arg2
  } else if (Array.isArray(arg1)) {
    rows = arg1
  }

  if (!rows || !rows.length) {
    alert("Tidak ada data untuk diekspor.")
    return
  }

  const separator = ","
  const keys = Object.keys(rows[0])

  const csvContent =
    keys.map((k) => `"${String(k).replace(/"/g, '""')}"`).join(separator) +
    "\n" +
    rows
      .map((row) => {
        return keys
          .map((k) => {
            let cell = row[k] === null || row[k] === undefined ? "" : row[k]
            if (typeof cell === "boolean") {
              cell = cell ? "Hadir" : "Tidak Hadir"
            }
            cell = cell instanceof Date ? cell.toLocaleString("id-ID") : String(cell)
            return `"${cell.replace(/"/g, '""')}"`
          })
          .join(separator)
      })
      .join("\n")

  // Add BOM for proper UTF-8 handling in Microsoft Excel
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  const cleanFilename = filename.endsWith(".csv") ? filename : `${filename}.csv`

  link.setAttribute("href", url)
  link.setAttribute("download", cleanFilename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
