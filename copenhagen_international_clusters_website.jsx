import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Globe2, Layers3, ArrowRight, BookOpen, Info, TrendingUp, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend, AreaChart, Area, ScatterChart, Scatter, Cell } from "recharts";

/*
  Copenhagen International Clusters — final project website
  --------------------------------------------------------
  Replace the sample arrays below with your exported results from the notebook:
  - cityTrend: city-wide international share over time
  - districtData: district-level features and cluster labels
  - originData: city-level country-of-origin composition

  The website is intentionally written for non-technical readers.
  Technical details belong in the linked explainer notebook.
*/

const clusterColors = {
  Low: "#6D8B74",
  Mixed: "#F2B84B",
  High: "#E76F51",
};

const cityTrend = [
  { year: 1995, internationalShare: 12, internationalPopulation: 62000 },
  { year: 2000, internationalShare: 14, internationalPopulation: 72000 },
  { year: 2005, internationalShare: 16, internationalPopulation: 84000 },
  { year: 2010, internationalShare: 19, internationalPopulation: 103000 },
  { year: 2015, internationalShare: 22, internationalPopulation: 128000 },
  { year: 2020, internationalShare: 25, internationalPopulation: 155000 },
  { year: 2026, internationalShare: 28, internationalPopulation: 181000 },
];

const districtData = [
  { district: "Indre By", share1995: 13, share2026: 26, avgAge: 37.9, femaleShare: 51, cluster: "Mixed", x: 50, y: 44 },
  { district: "Nørrebro", share1995: 19, share2026: 37, avgAge: 34.2, femaleShare: 50, cluster: "High", x: 42, y: 39 },
  { district: "Vesterbro/Kgs. Enghave", share1995: 15, share2026: 31, avgAge: 35.1, femaleShare: 49, cluster: "High", x: 45, y: 52 },
  { district: "Østerbro", share1995: 10, share2026: 22, avgAge: 39.4, femaleShare: 52, cluster: "Mixed", x: 58, y: 35 },
  { district: "Amager Vest", share1995: 11, share2026: 34, avgAge: 34.7, femaleShare: 50, cluster: "High", x: 58, y: 64 },
  { district: "Amager Øst", share1995: 9, share2026: 24, avgAge: 37.1, femaleShare: 51, cluster: "Mixed", x: 64, y: 60 },
  { district: "Bispebjerg", share1995: 12, share2026: 29, avgAge: 36.0, femaleShare: 51, cluster: "Mixed", x: 43, y: 28 },
  { district: "Brønshøj-Husum", share1995: 10, share2026: 21, avgAge: 39.2, femaleShare: 52, cluster: "Low", x: 31, y: 25 },
  { district: "Valby", share1995: 9, share2026: 23, avgAge: 38.0, femaleShare: 51, cluster: "Mixed", x: 36, y: 56 },
  { district: "Vanløse", share1995: 8, share2026: 18, avgAge: 40.1, femaleShare: 52, cluster: "Low", x: 27, y: 45 },
];

const originData = [
  { country: "Poland", population: 11800 },
  { country: "Turkey", population: 10900 },
  { country: "Germany", population: 9100 },
  { country: "Sweden", population: 7600 },
  { country: "Romania", population: 7100 },
  { country: "Italy", population: 6900 },
  { country: "Pakistan", population: 6400 },
  { country: "Ukraine", population: 6100 },
  { country: "India", population: 5600 },
  { country: "United Kingdom", population: 5200 },
];

const distributionData = [
  { bucket: "0–10%", districts: 0 },
  { bucket: "10–20%", districts: 2 },
  { bucket: "20–30%", districts: 5 },
  { bucket: "30–40%", districts: 3 },
  { bucket: "40%+", districts: 0 },
];

function StatCard({ icon: Icon, value, label }) {
  return (
    <Card className="rounded-2xl border-0 bg-white/80 shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="rounded-2xl bg-[#FFE3A3] p-3 text-[#E76F51]">
          <Icon size={24} />
        </div>
        <div>
          <div className="text-2xl font-bold text-[#2F3440]">{value}</div>
          <div className="text-sm text-[#667085]">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#E76F51]">{eyebrow}</div>
      <h2 className="text-4xl font-black tracking-tight text-[#2F3440] md:text-5xl">{title}</h2>
      {children && <p className="mt-5 text-lg leading-8 text-[#596070]">{children}</p>}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[#E6D7BD] bg-white p-3 shadow-md">
      <div className="font-bold text-[#2F3440]">{label}</div>
      {payload.map((item) => (
        <div key={item.name} className="text-sm text-[#596070]">
          {item.name}: <span className="font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function CopenhagenInternationalClusters() {
  const [year, setYear] = useState(2026);
  const [selectedCluster, setSelectedCluster] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("Nørrebro");

  const currentShareKey = year <= 2010 ? "share1995" : "share2026";

  const filteredDistricts = useMemo(() => {
    if (selectedCluster === "All") return districtData;
    return districtData.filter((d) => d.cluster === selectedCluster);
  }, [selectedCluster]);

  const selectedDistrictObject = districtData.find((d) => d.district === selectedDistrict) || districtData[0];

  const rankedDistricts = useMemo(() => {
    return [...districtData].sort((a, b) => b.share2026 - a.share2026);
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF6DE] text-[#2F3440]">
      <section className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28">
        <div className="absolute left-[-10%] top-[-20%] h-96 w-96 rounded-full bg-[#FAD46B]/40 blur-3xl" />
        <div className="absolute bottom-[-25%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-[#E76F51]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E76F51]/20 bg-white/70 px-4 py-2 text-sm font-semibold text-[#E76F51] shadow-sm">
              <Globe2 size={16} /> Social Data Science Final Project
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Where does the world live in Copenhagen?
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-[#596070]">
              Copenhagen is becoming more international. But the change is not evenly spread across the city. This story explores which districts are changing fastest, what kinds of international clusters appear, and what the city-wide composition looks like.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="rounded-full bg-[#E76F51] px-6 py-6 text-base font-bold hover:bg-[#d95d42]">
                Start the story <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button variant="outline" className="rounded-full border-[#6D8B74] bg-white/60 px-6 py-6 text-base font-bold text-[#4E6F55] hover:bg-white">
                <BookOpen className="mr-2" size={18} /> Explainer notebook
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.7 }}>
            <Card className="rounded-[2rem] border-0 bg-white/75 shadow-xl backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest text-[#6D8B74]">Central question</div>
                    <div className="text-2xl font-black">One city, or many?</div>
                  </div>
                  <MapPin className="text-[#E76F51]" size={32} />
                </div>
                <div className="relative h-[26rem] rounded-[1.5rem] bg-gradient-to-br from-[#FDF2D0] to-[#E6EDD7] p-5">
                  <div className="absolute inset-5 rounded-[2rem] border-2 border-dashed border-[#6D8B74]/30" />
                  {districtData.map((d) => (
                    <motion.div
                      key={d.district}
                      className="absolute flex h-16 w-16 cursor-pointer items-center justify-center rounded-full text-xs font-black text-white shadow-lg"
                      style={{ left: `${d.x}%`, top: `${d.y}%`, backgroundColor: clusterColors[d.cluster] }}
                      whileHover={{ scale: 1.15 }}
                      onClick={() => setSelectedDistrict(d.district)}
                      title={d.district}
                    >
                      {d.share2026}%
                    </motion.div>
                  ))}
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/80 p-4 shadow-sm">
                    <div className="text-sm font-bold text-[#2F3440]">Mock interactive district map</div>
                    <div className="mt-1 text-sm text-[#667085]">Circle color = cluster. Circle label = international share in 2026.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          <StatCard icon={TrendingUp} value="1980–2026" label="District-level time range" />
          <StatCard icon={Users} value="Age · sex · citizenship" label="District clustering variables" />
          <StatCard icon={Globe2} value="1995–2026" label="Country-of-origin time range" />
          <StatCard icon={Layers3} value="2 levels" label="District clusters + city composition" />
        </div>
      </section>

      <section className="px-6 py-24 md:px-12">
        <SectionTitle eyebrow="01 · The big picture" title="Copenhagen is becoming more international.">
          The first layer of the story is simple: the share of international residents has grown steadily. The more interesting question is whether this growth is shared by the whole city — or concentrated in particular districts.
        </SectionTitle>
        <Card className="mx-auto max-w-6xl rounded-[2rem] border-0 bg-white/80 shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cityTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8DDC8" />
                  <XAxis dataKey="year" stroke="#667085" />
                  <YAxis stroke="#667085" unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="internationalShare" name="International share (%)" stroke="#E76F51" fill="#F2B84B" fillOpacity={0.35} strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-6 text-center text-base leading-7 text-[#596070]">
              This chart should use your final city-wide numbers. Its role is to establish the context before the website zooms into the district level.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="bg-white/50 px-6 py-24 md:px-12">
        <SectionTitle eyebrow="02 · The spatial question" title="But not every district changes in the same way.">
          At district level, we can compare places by the share of residents with non-Danish citizenship. This lets us see whether internationalisation is evenly distributed or spatially clustered.
        </SectionTitle>
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[2rem] border-0 bg-[#2F3440] text-white shadow-lg">
            <CardContent className="p-7">
              <div className="mb-6 flex items-center gap-3">
                <BarChart3 className="text-[#F2B84B]" />
                <h3 className="text-2xl font-black">District ranking</h3>
              </div>
              <p className="mb-6 leading-7 text-white/75">
                Some districts stand out as more international than others. Instead of treating Copenhagen as one average city, the story compares its internal differences.
              </p>
              <div className="space-y-4">
                {rankedDistricts.slice(0, 6).map((d, index) => (
                  <div key={d.district}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{index + 1}. {d.district}</span>
                      <span className="font-bold">{d.share2026}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/15">
                      <div className="h-full rounded-full" style={{ width: `${d.share2026 * 2}%`, backgroundColor: clusterColors[d.cluster] }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-0 bg-white/85 shadow-lg">
            <CardContent className="p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black">Distribution of international share</h3>
                  <p className="mt-1 text-[#667085]">A quick view of how districts are spread across share ranges.</p>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8DDC8" />
                    <XAxis dataKey="bucket" stroke="#667085" />
                    <YAxis stroke="#667085" allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="districts" name="Districts" fill="#E76F51" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12">
        <SectionTitle eyebrow="03 · Clustering" title="From individual districts to district types.">
          The clustering groups districts by how international they are and how that profile changes over time. The aim is not to label places permanently, but to make the city easier to explore.
        </SectionTitle>

        <div className="mx-auto mb-8 flex max-w-7xl flex-wrap items-center justify-center gap-3">
          {["All", "Low", "Mixed", "High"].map((cluster) => (
            <Button
              key={cluster}
              variant={selectedCluster === cluster ? "default" : "outline"}
              onClick={() => setSelectedCluster(cluster)}
              className={`rounded-full px-6 ${selectedCluster === cluster ? "bg-[#E76F51] hover:bg-[#d95d42]" : "border-[#E6D7BD] bg-white/70 text-[#2F3440] hover:bg-white"}`}
            >
              {cluster}
            </Button>
          ))}
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[2rem] border-0 bg-white/85 shadow-lg">
            <CardContent className="p-7">
              <h3 className="mb-2 text-2xl font-black">Cluster map</h3>
              <p className="mb-6 text-[#667085]">Click a district to inspect it. Filter by cluster to compare similar areas.</p>
              <div className="relative h-[30rem] rounded-[1.5rem] bg-gradient-to-br from-[#FDF2D0] to-[#E6EDD7] p-5">
                <div className="absolute inset-5 rounded-[2rem] border-2 border-dashed border-[#6D8B74]/25" />
                {filteredDistricts.map((d) => (
                  <motion.div
                    key={d.district}
                    className="absolute flex h-16 w-16 cursor-pointer items-center justify-center rounded-full text-xs font-black text-white shadow-lg"
                    style={{ left: `${d.x}%`, top: `${d.y}%`, backgroundColor: clusterColors[d.cluster] }}
                    whileHover={{ scale: 1.15 }}
                    onClick={() => setSelectedDistrict(d.district)}
                  >
                    {d.share2026}%
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-0 bg-[#FFF0C9] shadow-lg">
            <CardContent className="p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-[#E76F51]">Selected district</div>
                  <h3 className="mt-1 text-3xl font-black">{selectedDistrictObject.district}</h3>
                </div>
                <div className="rounded-full px-4 py-2 text-sm font-black text-white" style={{ backgroundColor: clusterColors[selectedDistrictObject.cluster] }}>
                  {selectedDistrictObject.cluster}
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-2xl bg-white/70 p-5">
                  <div className="text-sm text-[#667085]">International share</div>
                  <div className="mt-1 text-4xl font-black">{selectedDistrictObject.share2026}%</div>
                  <div className="mt-1 text-sm text-[#667085]">Compared with {selectedDistrictObject.share1995}% in 1995</div>
                </div>
                <div className="rounded-2xl bg-white/70 p-5">
                  <div className="text-sm text-[#667085]">Average age</div>
                  <div className="mt-1 text-4xl font-black">{selectedDistrictObject.avgAge}</div>
                </div>
                <div className="rounded-2xl bg-white/70 p-5">
                  <div className="text-sm text-[#667085]">Female share</div>
                  <div className="mt-1 text-4xl font-black">{selectedDistrictObject.femaleShare}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-[#2F3440] px-6 py-24 text-white md:px-12">
        <SectionTitle eyebrow="04 · City-wide composition" title="Who are the internationals?">
          The country-of-origin dataset is only available at Copenhagen city level. That means we can describe the city-wide composition, but we do not attach specific nationalities to specific districts.
        </SectionTitle>
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_0.8fr]">
          <Card className="rounded-[2rem] border-0 bg-white/10 shadow-lg backdrop-blur">
            <CardContent className="p-7">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={originData} layout="vertical" margin={{ left: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
                    <XAxis type="number" stroke="rgba(255,255,255,0.75)" />
                    <YAxis dataKey="country" type="category" stroke="rgba(255,255,255,0.75)" width={110} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="population" name="Residents" fill="#F2B84B" radius={[0, 10, 10, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-0 bg-white text-[#2F3440] shadow-lg">
            <CardContent className="p-7">
              <div className="mb-4 flex items-center gap-3 text-[#E76F51]">
                <Info />
                <h3 className="text-2xl font-black">Important limitation</h3>
              </div>
              <p className="text-lg leading-8 text-[#596070]">
                The two datasets answer different questions. District data tells us <strong>where international presence is higher or lower</strong>. Country-of-origin data tells us <strong>who makes up Copenhagen’s international population overall</strong>.
              </p>
              <p className="mt-5 text-lg leading-8 text-[#596070]">
                We keep these levels separate to avoid a misleading story. No nationality is assigned to a district unless the data supports it.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12">
        <SectionTitle eyebrow="05 · Explore the change" title="Move through time.">
          The final website should let readers explore the data, not just read conclusions. A year slider makes the change feel visible and concrete.
        </SectionTitle>
        <Card className="mx-auto max-w-6xl rounded-[2rem] border-0 bg-white/85 shadow-lg">
          <CardContent className="p-7">
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-black">Selected year: {year}</h3>
                <p className="mt-1 text-[#667085]">Prototype interaction. Connect this to your full year-by-year table later.</p>
              </div>
              <div className="w-full md:w-96">
                <Slider min={1995} max={2026} step={1} value={[year]} onValueChange={(value) => setYear(value[0])} />
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8DDC8" />
                  <XAxis type="number" dataKey="avgAge" name="Average age" stroke="#667085" domain={[32, 42]} />
                  <YAxis type="number" dataKey={currentShareKey} name="International share" stroke="#667085" unit="%" domain={[0, 45]} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-[#E6D7BD] bg-white p-3 shadow-md">
                        <div className="font-bold">{d.district}</div>
                        <div className="text-sm text-[#596070]">Cluster: {d.cluster}</div>
                        <div className="text-sm text-[#596070]">Share: {d[currentShareKey]}%</div>
                        <div className="text-sm text-[#596070]">Average age: {d.avgAge}</div>
                      </div>
                    );
                  }} />
                  <Scatter data={districtData} name="Districts">
                    {districtData.map((entry) => (
                      <Cell key={entry.district} fill={clusterColors[entry.cluster]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="bg-white/55 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#2F3440] p-8 text-white shadow-xl md:p-12">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#F2B84B]">Final takeaway</div>
          <h2 className="text-4xl font-black md:text-5xl">Copenhagen is international — but unevenly so.</h2>
          <p className="mt-6 text-xl leading-9 text-white/78">
            The city-wide numbers tell us Copenhagen is becoming more diverse. The district-level analysis adds the missing spatial story: international presence appears in different intensities across the city, creating distinct district profiles. The result is not one simple Copenhagen, but several overlapping Copenhagens.
          </p>
          <div className="mt-8 rounded-2xl bg-white/10 p-5 text-white/78">
            <strong className="text-white">Narrative genre:</strong> this website uses a hybrid explanatory story. It starts as an author-driven guided narrative, then opens into reader-driven exploration with filters, maps, and interactive charts.
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-sm text-[#667085] md:px-12">
        Built for Social Data Science · Data source: Statistics Denmark · Add notebook link here
      </footer>
    </main>
  );
}
