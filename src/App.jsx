import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const IK = 'https://ik.imagekit.io/iu4cuvwazh/VM/'

const thumb = (url, w = 600) => {
  if (url.includes('?tr=')) return url.replace(/tr=w-\d+/, `tr=w-${w}`)
  return url + `?tr=w-${w}`
}



const THEATER_IMAGES = [
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG9205.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00030.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG3772.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00002.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG3930.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00044.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG4426.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00026.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG8686.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00034.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG8988.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00042.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG9004.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00020.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG3759.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00031.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/4d75b74e-3f00-44e1-9a28-e738860107e0.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00024.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/721ac6bd-1543-41df-ba45-750ec288cbb6.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00032.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/laborantin_hp1_c_Kaufhold_0585.JPG',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00048.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/laborantin_hp1_c_Kaufhold_0790.JPG',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00083.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/laborantin_hp2_c_Kaufhold_1335.JPG',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00053.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG9037.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00085.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG9073.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00022.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG9277.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00037.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG3764.jpg',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG3777.jpg',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG3923.jpg',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG3939.jpg',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG4436.jpg',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG8950.jpg',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG8992%20Kopie.jpg',
  'https://ik.imagekit.io/iu69j6qea/vm/_SIG9369.jpg',
]

const PORTRAIT_IMAGES = [
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(5%20von%207).jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00088.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/5AE1FBBF-D92C-46F4-A09F-95547A0D50C4_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(2%20von%207)-bw.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00059.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/8BD63264-ED80-45E6-85CE-49BC14EDC06B_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(6%20von%207)-bw.jpg',
  'https://ik.imagekit.io/iu69j6qea/vm/40E84991-8F10-4479-8C08-5507EF78849B_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(1%20von%201).jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00012.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/67AF27FD-2031-4C10-95AF-340FCA186980_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(1%20von%207)-bw.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00015.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/319B2625-888A-43C2-9E92-DA8AECD5976C_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(4%20von%207).jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00055.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/792FC173-D91A-433E-B4CB-E47DADB2C0A9_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(4%20von%207)-bw.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00062.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/7500F3AF-DBCB-46DA-8D5B-FAFB7B76562A_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(5%20von%207)-bw.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00063.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(6%20von%207).jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00067.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/B095475C-DC03-496F-8864-09325979D739_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(1%20von%201)-bw.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00068.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/C8CCE9E3-3ACC-41B8-AC87-DE3DA7DC3961_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(1%20von%207).jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00072.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/D6BC86AF-0754-41E7-A5B1-0AAD416002AD_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(2%20von%207).jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00073.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/DEFCD033-CB65-44CF-A54A-F7CD5804AE25_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(3%20von%207)-bw.jpg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00075.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/EBEE5FFF-0C7D-454B-9FF7-9FD935CDC95F_1_105_c.jpeg',
  'https://ik.imagekit.io/iu69j6qea/vm/4FE110DA-68E1-4A22-B3C4-C40E7746788C_1_105_c.jpeg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00065.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/5C187945-4874-4263-ACDE-3C24F08A9C09_1_105_c.jpeg',
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00099.jpg?tr=w-1400',
  'https://ik.imagekit.io/iu69j6qea/vm/8FBF69D7-9D63-449B-9291-2E4796C155DF_1_105_c.jpeg',
]

const ABOUT_SLIDER_IMAGES = [
  'https://ik.imagekit.io/iu4cuvwazh/VM/image00062.jpg?tr=w-500',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(5%20von%207).jpg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(1%20von%201).jpg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(6%20von%207).jpg',
  'https://ik.imagekit.io/iu69j6qea/vm/Verena-Maria-Bauer(c)SaskiaAllers%20(4%20von%207).jpg',
]

const HERO_IMAGES = [
  'image00088.jpg',
  'image00002.jpg',
  'image00031.jpg',
  'image00065.jpg',
  'image00059.jpg',
]

const GD = (id) => `https://drive.google.com/file/d/${id}/preview`

const VIDEOS = {
  about: GD('1HFtcqcMdDK4Lcy5YERqsTzObBx1np-Ef'),
  showreels: [
    { title: 'BZgA – Der Hirntod in der ethischen Diskussion', url: GD('11Cgt_VcCcwVYx3_TFJm-dM_9UzE-WniS') },
    { title: 'Die Galerie der vergessenen Berufe', url: GD('1dkrRdOedzAeAGzuqDIIkPQVoLtkuZsnI') },
    { title: 'Les Amoures', url: GD('1chRAKGXaJjxTNxvjeyWfbdcj3-oxOxvo') },
    { title: 'Die Überflüssigen', url: GD('1XbH-s3slBTefs_ZRhMkcTmDAbZjFsY8x') },
  ],
  audio: GD('12wfiX1kX3yLYNcvrdzYOKVf4afBsL6Iy'),
}

const SHOWREEL_POSTERS = [
  `${IK}Screenshot%202026-04-09%20145851.png`,
  `${IK}Screenshot%202026-04-09%20150143.png`,
  `${IK}Screenshot%202026-04-09%20150249.png`,
  `${IK}Screenshot%202026-04-09%20150340.png`,
]

const FILMOGRAPHY = {
  'Film / TV': [
    { year: '2025', title: 'Brunnstraße 52; 3. Stock links', details: 'HR, als: Annika, R: Anselm Dornier', type: 'Kurzfilm' },
    { year: '2023', title: 'BZgA – Der Hirntod in der ethischen Diskussion', details: 'R: Louisa', type: 'Bildung' },
    { year: '2021', title: 'Les amoures', details: 'als: Matilda, R: Luigjina Shkupa', type: 'Ausbildung' },
    { year: '2019', title: 'When In Doubt', details: 'HR, als: She, R: Christina Iberl & Kaj Lehner', type: 'Musikvideo' },
    { year: '2017', title: 'Die Galerie der vergessenen Berufe', details: 'HR, als: Alma, R: Willi Kubica', type: 'Film' },
    { year: '2016', title: 'Some Sunday Morning', details: 'HR, als: Vera, R: Oliver Haffner', type: 'Ausbildung' },
    { year: '2015', title: 'Wer Wir Sind', details: 'als: Lisa, R: Raphael Niederhauser', type: 'Kurzfilm' },
  ],
  Theater: [
    { year: '2025', title: 'Wie es euch gefällt', details: 'NR, als: Silvius, R: Christian Schlüter', type: 'Theater Osnabrück' },
    { year: '2024–25', title: 'Von Fischen und Frauen', details: 'HR, als: Anglerin 1, R: Theresa Thomasberger', type: 'Saarl. Staatstheater' },
    { year: '2025', title: 'Tod eines Handlungsreisenden', details: 'NR, als: The Woman, R: Christoph Mehler', type: 'Saarl. Staatstheater' },
    { year: '2024', title: 'Der Reichskanzler von Atlantis', details: 'NR, als: Frau Semmerling, R: Thorsten Köhler', type: 'Saarl. Staatstheater' },
    { year: '2024', title: 'Der Mann der lacht', details: 'als: Barkilphedro, R: Sébastien Jacobi', type: 'Saarl. Staatstheater' },
    { year: '2022–23', title: 'Die Ratten', details: 'HR, als: Frau John, R: Julia Prechsl', type: 'Saarl. Staatstheater' },
    { year: '2023', title: 'Broadway Danny Rose', details: 'als: Tina Vitale, R: Michael Schachermeier', type: 'Saarl. Staatstheater' },
    { year: '2023', title: 'Wie später ihre Kinder', details: 'als: Steph, R: Leyla-Claire Rabih', type: 'Saarl. Staatstheater' },
    { year: '2023', title: 'Die Kommune', details: 'NR, als: Emma, R: Bettina Bruinier', type: 'Saarl. Staatstheater' },
    { year: '2022', title: 'Die Dreigroschenoper', details: 'NR, als: Jenny, R: Klaus Kusenberg', type: 'Theater Regensburg' },
    { year: '2021', title: 'Richard III', details: 'als: Lady Anne, R: Georg Schmiedleitner', type: 'Theater Regensburg' },
    { year: '2021', title: 'Die Nibelungen', details: 'HR, als: Brunhild, R: Julia Prechsl', type: 'Theater Regensburg' },
    { year: '2019–20', title: 'Die Letzte Sau', details: 'als: Birgit, R: Julia Prechsl', type: 'Theater Regensburg' },
    { year: '2019–20', title: 'Am Königsweg', details: 'als: Volksstimme, R: Stephan Otteni', type: 'Theater Regensburg' },
    { year: '2020', title: 'The Who And The What', details: 'HR, als: Zarina, R: Daniela Wahl', type: 'Theater Regensburg' },
    { year: '2018–19', title: 'Wer hat Angst vorm weißen Mann', details: 'HR, als: Zita, R: Klaus Kusenberg', type: 'Theater Regensburg' },
    { year: '2017–18', title: 'Maria Stuart', details: 'HR, als: Maria Stuart, R: Mélanie Huber', type: 'Theater Regensburg' },
    { year: '2017–18', title: 'Winterreise', details: 'als: Natascha Kampusch, R: Mia Constantine', type: 'Theater Regensburg' },
    { year: '2017–18', title: 'The Black Rider', details: 'HR, als: Käthchen, R: Jan Langenheim', type: 'Theater Regensburg' },
    { year: '2018', title: 'Liliom', details: 'HR, als: Julie, R: Katrin Plötner', type: 'Theater Regensburg' },
    { year: '2016–17', title: 'Hamlet', details: 'als: Ophelia, R: Katrin Plötner', type: 'Theater Regensburg' },
    { year: '2016–17', title: 'Atmen', details: 'HR, als: Frau, R: Jona Manow', type: 'Theater Regensburg' },
    { year: '2017', title: 'Sisters of Swing', details: 'HR, als: Maxene, R: Uwe Schwarz', type: 'Theater Regensburg' },
    { year: '2016', title: 'Empört Euch Ihr Krähwinkler!', details: 'als: div. Rollen, R: Gernot Plass', type: 'TAG Wien' },
  ],
  Audio: [
    { year: '2024–25', title: 'Stimmen des Widerstands 1935', details: 'als: Lore Wolf, R: Finn Tödte', type: 'Hörspiel' },
    { year: '2016', title: 'Pearle – Werbespot', details: 'als: Sprecherin', type: 'Werbung' },
    { year: '2016', title: 'Lopoca Sportwetten', details: 'als: Sprecherin', type: 'Werbung' },
    { year: '2016', title: 'Schärdinger – "Meine Linie"', details: 'als: Sprecherin', type: 'Werbung' },
    { year: '2015', title: 'JUHU! T-mobile', details: 'als: Sprecherin', type: 'Werbung' },
    { year: '2015', title: 'Pearle Radiospot', details: 'als: Sprecherin', type: 'Werbung' },
    { year: '2014', title: 'Baymax – Riesiges Robowabohu', details: 'als: Studentin, R: Don Hall', type: 'Synchronisation' },
  ],
}

const AWARDS = [
  { year: '2020', title: 'Förderpreis der Theaterfreunde Regensburg' },
  { year: '2018', title: 'Science + Imagination Award', details: 'Sci-On Filmfestival Nevada – "Die Galerie der vergessenen Berufe"' },
  { year: '2018', title: '"Outstanding German Contribution"', details: 'Berlin Sci-Fi Filmfestival – "Die Galerie der vergessenen Berufe"' },
]

const SKILLS_DATA = {
  Sprachen: [
    { name: 'Deutsch', level: 'Muttersprache', pro: true },
    { name: 'Englisch', level: 'fließend', pro: true },
    { name: 'Latein', level: 'Grundkenntnisse' },
    { name: 'Polnisch', level: 'Grundkenntnisse' },
  ],
  'Dialekte & Akzente': [
    { name: 'Bairisch', level: 'Heimatdialekt', pro: true },
    { name: 'Britisch', level: 'Standard', pro: true },
    { name: 'Amerikanisch', level: 'Standard', pro: true },
  ],
  Gesang: [
    { name: 'Chanson', level: 'professionell', pro: true },
    { name: 'Musical', level: 'professionell', pro: true },
    { name: 'A cappella', level: 'professionell', pro: true },
    { name: 'Folk / Jazz / Country', level: 'gut' },
    { name: 'Soul / RnB / Klassisch', level: 'gut' },
  ],
  Tanz: [
    { name: 'Jazzdance', level: 'gut' },
    { name: 'Choreografie', level: 'gut' },
    { name: 'Modern Dance', level: 'gut' },
    { name: 'Ballett / Hip Hop / Steppen', level: 'Grundkenntnisse' },
  ],
  Instrumente: [
    { name: 'Klavier', level: 'gut' },
    { name: 'Gitarre', level: 'Grundkenntnisse' },
    { name: 'Querflöte', level: 'Grundkenntnisse' },
  ],
  Sport: [
    { name: 'Yoga', level: 'gut' },
    { name: 'Volleyball / Beachvolleyball', level: 'gut' },
    { name: 'Bühnenkampf / Fechten', level: 'Grundkenntnisse' },
  ],
}

const ABOUT_TABS_DATA = {
  Fakten: [
    { name: 'Spielalter', value: '28 – 37' },
    { name: 'Größe', value: '176 cm' },
    { name: 'Stimmlage', value: 'Mezzosopran' },
    { name: 'Wohnort', value: 'Osnabrück' },
    { name: 'Haarfarbe', value: 'Braun, mittel' },
    { name: 'Augenfarbe', value: 'Dunkelbraun' },
  ],
  Sprachen: [
    ...SKILLS_DATA['Sprachen'].map(s => ({ name: s.name, value: s.level, pro: s.pro })),
    ...SKILLS_DATA['Dialekte & Akzente'].map(s => ({ name: s.name, value: s.level, pro: s.pro })),
  ],
  Skills: [
    {
      name: 'Gesang',
      value: 'professionell',
      pro: true,
      sub: SKILLS_DATA['Gesang'].map(s => `${s.name} (${s.level})`),
      hasPreview: true
    },
    ...SKILLS_DATA['Tanz'].map(s => ({ name: s.name, value: s.level, pro: s.pro })),
    ...SKILLS_DATA['Instrumente'].map(s => ({ name: s.name, value: s.level, pro: s.pro })),
    ...SKILLS_DATA['Sport'].map(s => ({ name: s.name, value: s.level, pro: s.pro })),
  ],
}

const SKILL_VIDEO_TIMESTAMPS = {
  'Bairisch': 20,
  'Klavier': 92,
  'Gesang': 92,
}

/* ═══════ SHARED COMPONENTS ═══════ */

function FadeIn({ children, className, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  )
}

function HeroSlideshow() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_IMAGES.length), 5000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="hero-slideshow">
      <AnimatePresence mode="wait">
        <motion.img key={idx} src={`${IK}${HERO_IMAGES[idx]}?tr=w-1400,h-1000,fo-face`} alt="Verena Maria Bauer"
          initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} />
      </AnimatePresence>
    </div>
  )
}

function AboutSlider() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ABOUT_SLIDER_IMAGES.length), 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="about-slider">
      <AnimatePresence mode="wait">
        <motion.img key={idx} src={thumb(ABOUT_SLIDER_IMAGES[idx], 700)} alt="Verena Maria Bauer"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }} loading="lazy" />
      </AnimatePresence>
      <div className="about-slider-dots">
        {ABOUT_SLIDER_IMAGES.map((_, i) => (
          <button key={i} className={`about-slider-dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} />
        ))}
      </div>
    </div>
  )
}

function AboutTabs({ activeAboutTab, setActiveAboutTab, setSkillVideo }) {
  return (
    <div className="about-tabs-section">
      <div className="about-tabs-nav">
        {Object.keys(ABOUT_TABS_DATA).map(tab => (
          <button key={tab} className={`about-tab-btn ${activeAboutTab === tab ? 'active' : ''}`} onClick={() => setActiveAboutTab(tab)}>
            {tab}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={activeAboutTab} className="about-tabs-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
          {activeAboutTab === 'Skills' ? (
            <>
              <div className="about-tab-cards about-tab-cards-single">
                {/* Gesang Card nimmt ganze Zeile */}
                {(() => {
                  const item = ABOUT_TABS_DATA['Skills'][0]
                  return (
                    <div className="about-tab-card has-preview" style={{gridColumn: '1/-1'}}>
                      <span className="about-tab-card-label">Gesang</span>
                      <strong className={item.pro ? 'pro' : ''}>{item.value}</strong>
                      <ul className="about-tab-card-sub-inline">
                        {item.sub.map((s, j) => <li key={j}>{s}</li>)}
                      </ul>
                      <span className="skill-play-icon" onClick={e => {
                        e.stopPropagation();
                        setSkillVideo(null);
                        setTimeout(() => setSkillVideo(92), 10);
                      }}>
                        &#9654;<span className="skill-audio-label">Hörprobe</span>
                      </span>
                    </div>
                  )
                })()}
              </div>
              <div className="about-tab-cards">
                {ABOUT_TABS_DATA['Skills'].slice(1).map((item, i) => {
                  const ts = SKILL_VIDEO_TIMESTAMPS[item.name]
                  return (
                    <div className={`about-tab-card${ts != null ? ' has-preview' : ''}`} key={i}>
                      <span className="about-tab-card-label">
                        {item.name}
                        {ts != null && (
                          <span className="skill-play-icon" onClick={e => { e.stopPropagation(); setSkillVideo(ts); }}>
                            &#9654;<span className="skill-audio-label">Hörprobe</span>
                          </span>
                        )}
                      </span>
                      <strong className={item.pro ? 'pro' : ''}>{item.value}</strong>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="about-tab-cards">
              {ABOUT_TABS_DATA[activeAboutTab].map((item, i) => {
                const ts = SKILL_VIDEO_TIMESTAMPS[item.name]
                return (
                  <div className={`about-tab-card${ts != null ? ' has-preview' : ''}`} key={i}>
                    <span className="about-tab-card-label">
                      {item.name}
                      {ts != null && (
                        <span className="skill-play-icon" onClick={e => {
                          e.stopPropagation();
                          setSkillVideo(null);
                          setTimeout(() => setSkillVideo(ts), 10);
                        }}>
                          &#9654;<span className="skill-audio-label">Hörprobe</span>
                        </span>
                      )}
                    </span>
                    <strong className={item.pro ? 'pro' : ''}>{item.value}</strong>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function SkillVideoModal({ startTime, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div className="skill-video-overlay" onClick={onClose}>
      <div className="skill-video-modal" onClick={e => e.stopPropagation()}>
        <button className="skill-video-close" onClick={onClose}>&times;</button>
        <iframe src={`https://drive.google.com/file/d/1HFtcqcMdDK4Lcy5YERqsTzObBx1np-Ef/preview#t=${startTime}`} allow="autoplay; encrypted-media" allowFullScreen frameBorder="0" />
      </div>
    </div>
  )
}

function GalleryToggle({ galleryTab, setGalleryTab }) {
  return (
    <div className="gallery-toggle">
      <button className={`gallery-toggle-btn ${galleryTab === 'theater' ? 'active' : ''}`} onClick={() => setGalleryTab('theater')}>Theater &amp; Bühne</button>
      <button className={`gallery-toggle-btn ${galleryTab === 'portraits' ? 'active' : ''}`} onClick={() => setGalleryTab('portraits')}>Portraits</button>
    </div>
  )
}

function VideoPlayer({ src, poster }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="video-wrapper">
      {!playing && poster ? (
        <div className="video-poster" onClick={() => setPlaying(true)}>
          <img src={poster} alt="" />
          <div className="video-play-btn">▶</div>
        </div>
      ) : (
        <iframe src={src} allow="autoplay; encrypted-media" allowFullScreen frameBorder="0" loading="lazy" referrerPolicy="no-referrer" />
      )}
    </div>
  )
}

function AudioPlayer({ src }) {
  return (
    <div className="audio-wrapper">
      <iframe src={src} allow="autoplay" frameBorder="0" />
    </div>
  )
}

function Lightbox({ lightbox, setLightbox, images }) {
  return (
    <AnimatePresence>
      {lightbox !== null && (
        <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <button className="lightbox-nav prev" onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + images.length) % images.length) }}>‹</button>
          <motion.img key={lightbox} src={thumb(images[lightbox], 1400)} alt=""
            initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.35 }} onClick={e => e.stopPropagation()} />
          <button className="lightbox-nav next" onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % images.length) }}>›</button>
          <div className="lightbox-counter">{lightbox + 1} / {images.length}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ImpressumPage({ goHome }) {
  return (
    <section className="section legal-page">
      <div className="legal-content">
        <button className="legal-back" onClick={goHome}>← Zurück</button>
        <h1 className="heading-lg">Impressum</h1>
        <h3>Angaben gemäß § 5 TMG</h3>
        <p>Verena Maria Bauer<br />Schauspielerin<br />Osnabrück, Deutschland</p>
        <h3>Kontakt</h3>
        <p>E-Mail: kontakt@verenamariabauer.de</p>
        <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
        <p>Verena Maria Bauer<br />Osnabrück, Deutschland</p>
        <h3>Haftungsausschluss</h3>
        <h4>Haftung für Inhalte</h4>
        <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
        <h4>Haftung für Links</h4>
        <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.</p>
        <h4>Urheberrecht</h4>
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.</p>
      </div>
    </section>
  )
}

function DatenschutzPage({ goHome }) {
  return (
    <section className="section legal-page">
      <div className="legal-content">
        <button className="legal-back" onClick={goHome}>← Zurück</button>
        <h1 className="heading-lg">Datenschutzerklärung</h1>
        <h3>1. Datenschutz auf einen Blick</h3>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
        <h3>2. Hosting</h3>
        <p>Diese Website wird bei Vercel Inc. gehostet. Details: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a></p>
        <h3>3. Verantwortliche Stelle</h3>
        <p>Verena Maria Bauer, Osnabrück, Deutschland<br />E-Mail: kontakt@verenamariabauer.de</p>
        <h3>4. Cookies</h3>
        <p>Diese Website verwendet ein Cookie, um Ihre Cookie-Präferenz zu speichern (Local Storage). Es werden keine personenbezogenen Daten an Dritte übermittelt.</p>
        <h3>5. Externe Dienste</h3>
        <p>ImageKit (CDN): <a href="https://imagekit.io/privacy" target="_blank" rel="noopener noreferrer">imagekit.io/privacy</a></p>
        <p>Google Fonts: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></p>
      </div>
    </section>
  )
}

/* ═══════ LAYOUT 1: DEFAULT (Dark Gold) ═══════ */

function LayoutDefault({ scrollTo, activeShowreel, setActiveShowreel, activeTab, setActiveTab, setLightbox, galleryTab, setGalleryTab, activeAboutTab, setActiveAboutTab, setSkillVideo }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const currentImages = galleryTab === 'theater' ? THEATER_IMAGES : PORTRAIT_IMAGES

  return (<>
    <section className="hero" ref={heroRef}>
      <motion.div className="hero-bg" style={{ y: heroY }}><HeroSlideshow /></motion.div>
      <div className="hero-overlay" />
      <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="hero-eyebrow">Schauspielerin · Sängerin · Performerin</div>
          <h1 className="hero-title">
            <span className="hero-title-line">Verena</span>
            <span className="hero-title-line accent">Maria Bauer</span>
          </h1>
          <p className="hero-tagline">Wandelbar. Leidenschaftlich. Auf jeder Bühne zuhause.</p>
          <div className="hero-actions">
            <a href="#reels" className="btn btn-primary" onClick={e => { e.preventDefault(); scrollTo('reels') }}>Showreels</a>
            <a href="#contact" className="btn btn-outline" onClick={e => { e.preventDefault(); scrollTo('contact') }}>Kontakt</a>
          </div>
        </motion.div>
      </motion.div>
      <motion.div className="hero-scroll" style={{ opacity: heroOpacity }}><div className="hero-scroll-line" /></motion.div>
    </section>

    <section id="about" className="section">
      <div className="about-layout">
        <FadeIn className="about-media">
          <AboutSlider />
        </FadeIn>
        <FadeIn className="about-content" delay={0.15}>
          <span className="label">About me</span>
          <h2 className="heading-lg">Zwischen den Welten<br /><em>zuhause</em></h2>
          <p className="body-text">Geboren 1991 in Ingolstadt, ausgebildet an der Musik und Kunst Privatuniversität der Stadt Wien. Über renommierte Häuser wie das Theater Regensburg und das Saarländische Staatstheater hat Verena sich als vielseitige Bühnenkünstlerin etabliert.</p>
          <p className="body-text">Von Shakespeares Ophelia über Maria Stuart bis hin zu zeitgenössischen Stoffen – ihre Mezzosopran-Stimme, professionelles Musical-Können und tänzerische Vielseitigkeit machen sie zur idealen Besetzung für spartenübergreifende Produktionen.</p>
          <AboutTabs activeAboutTab={activeAboutTab} setActiveAboutTab={setActiveAboutTab} setSkillVideo={setSkillVideo} />
        </FadeIn>
      </div>
      <FadeIn delay={0.1}>
        <div className="about-video-section">
          <h3 className="heading-sm">About me</h3>
          <VideoPlayer src={VIDEOS.about} poster={`${IK}iconframe.jpg`} />
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="stats-row">
          {[['10+', 'Jahre Bühne'], ['30+', 'Theaterrollen'], ['3', 'Awards'], ['4', 'Sprachen']].map(([num, label]) => (
            <div className="stat" key={label}><span className="stat-number">{num}</span><span className="stat-label">{label}</span></div>
          ))}
        </div>
      </FadeIn>
    </section>

    <section id="reels" className="section section-dark">
      <FadeIn><span className="label">Showreels</span><h2 className="heading-lg">Videos & Reels</h2></FadeIn>
      <FadeIn delay={0.1}>
        <div className="reels-layout">
          <div className="reels-main">
            <VideoPlayer key={activeShowreel} src={VIDEOS.showreels[activeShowreel].url} poster={SHOWREEL_POSTERS[activeShowreel]} />
            <h3 className="reel-active-title">{VIDEOS.showreels[activeShowreel].title}</h3>
          </div>
          <div className="reels-list">
            {VIDEOS.showreels.map((reel, i) => (
              <button key={i} className={`reel-item ${i === activeShowreel ? 'active' : ''}`} onClick={() => setActiveShowreel(i)}>
                <span className="reel-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="reel-title">{reel.title}</span>
                {i === activeShowreel && <span className="reel-playing">▶</span>}
              </button>
            ))}
            <div className="reel-audio"><h4>Hörprobe</h4><p className="reel-audio-title">Die Nibelungen · R: Julia Prechsl · 2021</p><AudioPlayer src={VIDEOS.audio} /></div>
          </div>
        </div>
      </FadeIn>
    </section>

    <section id="gallery" className="section">
      <FadeIn><span className="label">Portfolio</span><h2 className="heading-lg">Galerie</h2></FadeIn>
      <FadeIn delay={0.05}><GalleryToggle galleryTab={galleryTab} setGalleryTab={setGalleryTab} /></FadeIn>
      <FadeIn delay={0.1}>
        <AnimatePresence mode="wait">
          <motion.div key={galleryTab} className="gallery-masonry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {currentImages.map((img, i) => (
              <motion.div key={i} className="gallery-item" onClick={() => setLightbox(i)} whileHover={{ scale: 1.03 }} transition={{ duration: 0.35 }}>
                <img src={thumb(img)} alt={`Verena Maria Bauer – ${i + 1}`} loading="lazy" />
                <div className="gallery-overlay" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </FadeIn>
    </section>

    <section id="career" className="section section-dark">
      <FadeIn><span className="label">Karriere</span><h2 className="heading-lg">Filmografie &amp; Theater</h2></FadeIn>
      <FadeIn delay={0.1}>
        <div className="filmography-tabs">
          {Object.keys(FILMOGRAPHY).map(tab => (
            <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab}<span className="tab-count">{FILMOGRAPHY[tab].length}</span>
            </button>
          ))}
        </div>
      </FadeIn>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="filmography-list">
          {FILMOGRAPHY[activeTab].map((item, i) => (
            <motion.div className="film-item" key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
              <span className="film-year">{item.year}</span>
              <div className="film-info"><div className="film-title">{item.title}</div><div className="film-details">{item.details}</div></div>
              <span className="film-type">{item.type}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <FadeIn delay={0.1}>
        <div className="subsection">
          <span className="label">Auszeichnungen</span><h3 className="heading-sm">Preise & Awards</h3>
          {AWARDS.map((a, i) => (<div className="award-row" key={i}><span className="award-year">{a.year}</span><div><strong>{a.title}</strong>{a.details && <div className="body-text-sm">{a.details}</div>}</div></div>))}
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="subsection">
          <span className="label">Ausbildung</span>
          <div className="award-row"><span className="award-year">2012–16</span><div><strong>Musik und Kunst Privatuniversität der Stadt Wien</strong><div className="body-text-sm">Schauspielstudium</div></div></div>
        </div>
      </FadeIn>
    </section>

    <section id="contact" className="section section-dark contact-section">
      <FadeIn>
        <div className="contact-inner">
          <span className="label center">Kontakt</span>
          <h2 className="heading-lg center">Let's work<br /><em>together</em></h2>
          <p className="body-text center">Für Casting-Anfragen, Kooperationen oder weitere Informationen.</p>
          <div className="contact-buttons">
            <a href="https://www.schauspielervideos.de/fullprofile/schauspieler-verena-maria-bauer.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Profil auf Schauspielervideos.de</a>
            <a href="mailto:verena.maria.bauer@web.de" className="btn btn-outline">E-Mail schreiben</a>
          </div>
          <div className="zav-section" style={{marginTop: '2rem', textAlign: 'center'}}>
            <span style={{display: 'block', fontSize: '1rem', marginBottom: '0.5rem'}}>Vertreten durch ZAV Künstlervermittlung</span>
            <img src="/assets/ZAV-logo_web.jpg" alt="ZAV Künstlervermittlung Logo" style={{height: '40px', width: 'auto', opacity: 0.8}} />
          </div>
        </div>
      </FadeIn>
    </section>
  </>)
}

/* ═══════ MAIN APP ═══════ */

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [activeTab, setActiveTab] = useState('Theater')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeShowreel, setActiveShowreel] = useState(0)
  const [page, setPage] = useState('home')
  const [cookieAccepted, setCookieAccepted] = useState(() => localStorage.getItem('cookies_accepted') === 'true')
  const [galleryTab, setGalleryTab] = useState('theater')
  const [activeAboutTab, setActiveAboutTab] = useState('Fakten')
  const [skillVideo, setSkillVideo] = useState(null)

  const currentGalleryImages = galleryTab === 'theater' ? THEATER_IMAGES : PORTRAIT_IMAGES

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (lightbox !== null || menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [lightbox, menuOpen])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = e => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % currentGalleryImages.length)
      if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + currentGalleryImages.length) % currentGalleryImages.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, currentGalleryImages])

  useEffect(() => {
    setLightbox(null)
  }, [galleryTab])


  const scrollTo = useCallback((id) => {
    setMenuOpen(false)
    setPage('home')
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [])

  const goHome = useCallback(() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }, [])
  const acceptCookies = useCallback(() => { localStorage.setItem('cookies_accepted', 'true'); setCookieAccepted(true) }, [])

  const navItems = [['about', 'About me'], ['reels', 'Showreels'], ['gallery', 'Galerie'], ['career', 'Karriere'], ['contact', 'Kontakt']]
  const layoutProps = { scrollTo, activeShowreel, setActiveShowreel, activeTab, setActiveTab, setLightbox, galleryTab, setGalleryTab, activeAboutTab, setActiveAboutTab, setSkillVideo }

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo" onClick={goHome}>Verena Maria<span>Bauer</span></div>
        <div className="nav-center">
          <ul className="nav-links">
            {navItems.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id) }}>{label}</a></li>
            ))}
          </ul>
        </div>
        <div className={`nav-hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu open" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            {navItems.map(([id, label], i) => (
              <motion.a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id) }} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 + 0.1 }}>{label}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {page === 'home' && <LayoutDefault {...layoutProps} />}

      {page === 'impressum' && <ImpressumPage goHome={goHome} />}
      {page === 'datenschutz' && <DatenschutzPage goHome={goHome} />}

      <Lightbox lightbox={lightbox} setLightbox={setLightbox} images={currentGalleryImages} />

      {skillVideo !== null && <SkillVideoModal startTime={skillVideo} onClose={() => setSkillVideo(null)} />}

      <footer className="footer">
        <p>© {new Date().getFullYear()} Verena Maria Bauer · <a href="#" onClick={e => { e.preventDefault(); setPage('impressum'); window.scrollTo(0, 0) }}>Impressum</a> · <a href="#" onClick={e => { e.preventDefault(); setPage('datenschutz'); window.scrollTo(0, 0) }}>Datenschutz</a></p>
      </footer>

      {!cookieAccepted && (
        <div className="cookie-banner">
          <p>Diese Website verwendet Cookies. <a href="#" onClick={e => { e.preventDefault(); setPage('datenschutz'); window.scrollTo(0, 0) }}>Mehr erfahren</a></p>
          <button className="btn btn-primary btn-sm" onClick={acceptCookies}>Akzeptieren</button>
        </div>
      )}
    </>
  )
}

export default App
