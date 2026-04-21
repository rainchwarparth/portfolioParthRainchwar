import { motion } from "framer-motion";
import { FileText, Database, BookOpen, Award, ExternalLink } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import type { TimelineEvent } from "@/data/types";

interface Props {
  events: TimelineEvent[];
}

const attachmentIcons = {
  form: FileText,
  dataset: Database,
  paper: BookOpen,
  credential: Award,
  certificate: Award,
};

const TAG_STYLES: Record<string, string> = {
  published:           "bg-blue-100 text-blue-700 border border-blue-200",
  "data leak":         "bg-red-100 text-red-700 border border-red-200",
  catalyst:            "bg-orange-100 text-orange-700 border border-orange-200",
  cbt:                 "bg-purple-100 text-purple-700 border border-purple-200",
  freud:               "bg-purple-100 text-purple-700 border border-purple-200",
  foundation:          "bg-gray-100 text-gray-600 border border-gray-200",
  iob:                 "bg-teal-100 text-teal-700 border border-teal-200",
  "ml results":        "bg-green-100 text-green-700 border border-green-200",
  "survey design":     "bg-yellow-100 text-yellow-700 border border-yellow-200",
  "data analysis":     "bg-sky-100 text-sky-700 border border-sky-200",
  "extended analysis": "bg-violet-100 text-violet-700 border border-violet-200",
  "commercial insight":"bg-emerald-100 text-emerald-700 border border-emerald-200",
  framework:           "bg-rose-100 text-rose-700 border border-rose-200",
  // ONCP tags
  personal:            "bg-slate-100 text-slate-600 border border-slate-200",
  "turning point":     "bg-orange-100 text-orange-700 border border-orange-200",
  observation:         "bg-sky-100 text-sky-700 border border-sky-200",
  lco:                 "bg-rose-100 text-rose-700 border border-rose-200",
  india:               "bg-orange-100 text-orange-700 border border-orange-200",
  industry:            "bg-gray-100 text-gray-600 border border-gray-200",
  policy:              "bg-blue-100 text-blue-700 border border-blue-200",
  vision:              "bg-violet-100 text-violet-700 border border-violet-200",
  dpi:                 "bg-teal-100 text-teal-700 border border-teal-200",
  ondc:                "bg-teal-100 text-teal-700 border border-teal-200",
  infrastructure:      "bg-gray-100 text-gray-600 border border-gray-200",
  architecture:        "bg-rose-100 text-rose-700 border border-rose-200",
  strategy:            "bg-purple-100 text-purple-700 border border-purple-200",
  "reality check":     "bg-red-100 text-red-700 border border-red-200",
  manifesto:           "bg-amber-100 text-amber-700 border border-amber-200",
  dream:               "bg-amber-100 text-amber-700 border border-amber-200",
  seeking:             "bg-green-100 text-green-700 border border-green-200",
};

function tagStyle(tag: string) {
  return TAG_STYLES[tag.toLowerCase()] ?? "bg-amber-100 text-amber-700 border border-amber-200";
}

export default function StoryTimeline({ events }: Props) {
  return (
    <div className="relative">
      {/* vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-10">
        {events.map((e, i) => {
          const Icon = e.attachment
            ? attachmentIcons[e.attachment.type]
            : null;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="relative pl-12"
            >
              {/* dot */}
              <span className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-background" />

              {/* year */}
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                {e.year}
              </span>

              {/* tags */}
              {e.tags && e.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1.5 mb-1">
                  {e.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${tagStyle(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* title */}
              <h4 className="mt-1 font-semibold text-foreground">{e.title}</h4>

              {/* description */}
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {e.description}
              </p>

              {/* attachment pill — linked when href is present */}
              {e.attachment && Icon && (
                e.attachment.href ? (
                  <a
                    href={e.attachment.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-xs text-amber-700 hover:bg-amber-100 transition-colors"
                  >
                    <Icon className="w-3 h-3" />
                    {e.attachment.label}
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                  </a>
                ) : (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-xs text-amber-700">
                    <Icon className="w-3 h-3" />
                    {e.attachment.label}
                  </div>
                )
              )}

              {/* data table */}
              {e.dataTable && (
                <div className="mt-4 overflow-x-auto rounded-lg border border-border">
                  {e.dataTable.caption && (
                    <p className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted border-b border-border">
                      {e.dataTable.caption}
                    </p>
                  )}
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-amber-50 border-b border-amber-200">
                        {e.dataTable.headers.map((h) => (
                          <th
                            key={h}
                            className="px-4 py-2.5 text-left text-xs font-semibold text-amber-800 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {e.dataTable.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          className={ri % 2 === 0 ? "bg-background" : "bg-muted/30"}
                        >
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className="px-4 py-2.5 text-muted-foreground align-top leading-snug"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* bar chart */}
              {e.barChart && (
                <div className="mt-4 rounded-lg border border-border overflow-hidden">
                  {e.barChart.caption && (
                    <p className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted border-b border-border">
                      {e.barChart.caption}
                    </p>
                  )}
                  <div className="p-3 bg-background">
                    <ResponsiveContainer width="100%" height={230}>
                      <BarChart
                        data={e.barChart.data}
                        margin={{ top: 4, right: 12, left: 0, bottom: 36 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey={e.barChart.xKey}
                          tick={{ fontSize: 10 }}
                          angle={-25}
                          textAnchor="end"
                          interval={0}
                        />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          unit="%"
                          domain={[0, 100]}
                          label={e.barChart.yLabel ? { value: e.barChart.yLabel, angle: -90, position: "insideLeft", style: { fontSize: 10 } } : undefined}
                        />
                        <Tooltip formatter={(v) => v != null ? `${v}%` : ""} />
                        <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
                        {e.barChart.bars.map((b) => (
                          <Bar
                            key={b.dataKey}
                            dataKey={b.dataKey}
                            fill={b.color}
                            name={b.label}
                            radius={[3, 3, 0, 0]}
                          />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* figures */}
              {e.figures && e.figures.length > 0 && (
                <div className="mt-4 space-y-6">
                  {e.figures.map((fig, fi) => (
                    <figure
                      key={fi}
                      className="rounded-lg border border-border overflow-hidden bg-muted/20"
                    >
                      <div className="bg-white flex items-center justify-center p-2">
                        <img
                          src={fig.src}
                          alt={fig.alt}
                          className="max-h-72 w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <figcaption className="px-4 py-2.5 text-xs text-muted-foreground leading-relaxed border-t border-border bg-muted/30">
                        {fig.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
