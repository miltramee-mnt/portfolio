# Personal Portfolio Website — Foundation (Phase 1)

เว็บไซต์ Portfolio ส่วนตัว สำหรับสาย **Digital Marketing / Digital Strategy / AI-assisted Marketing**
สร้างด้วย **HTML + CSS + Vanilla JavaScript** ไม่มี build step ไม่มี dependency
เปิดไฟล์ `index.html` ได้ทันที และ deploy ขึ้น Vercel ได้เลย

> **สถานะตอนนี้:** โครงสร้าง + Design System + Layout + Animation เสร็จสมบูรณ์
> ข้อความทั้งหมดเป็น **Placeholder** ที่อยู่ในวงเล็บเหลี่ยม เช่น `[YOUR NAME]`
> ยังไม่มีการใส่ข้อมูลส่วนตัวหรือประสบการณ์ใด ๆ ที่ไม่ได้ให้ไว้

---

## 1. Folder Structure

```
portfolio/
├── index.html                  ← หน้าเดียวจบ (One-page portfolio)
├── README.md
├── robots.txt                  ← SEO
├── sitemap.xml                 ← SEO
├── site.webmanifest            ← PWA / icon metadata
├── vercel.json                 ← config สำหรับ deploy (cache + clean URLs)
├── .gitignore
│
├── case-study/
│   └── template.html           ← แม่แบบหน้า Case Study แยก (copy ไปใช้ได้เลย)
│
└── assets/
    ├── css/
    │   ├── tokens.css          ← Design Tokens (สี / ฟอนต์ / spacing / motion)
    │   ├── base.css            ← reset + typography + accessibility
    │   ├── layout.css          ← container / section / grid helpers
    │   ├── components.css      ← ปุ่ม / tag / nav / menu / reveal
    │   ├── sections.css        ← สไตล์ของแต่ละ section ตามลำดับหน้า
    │   ├── case-study.css      ← ใช้เฉพาะหน้า case study
    │   └── responsive.css      ← breakpoints ทั้งหมด (โหลดท้ายสุดเสมอ)
    ├── js/
    │   ├── nav.js              ← sticky nav / hamburger / active link
    │   ├── reveal.js           ← scroll reveal / text reveal / parallax
    │   ├── work.js             ← accordion ของ Selected Work
    │   └── main.js             ← ปีใน footer + smooth anchor scroll
    ├── img/
    │   ├── favicon.svg
    │   ├── apple-touch-icon.png
    │   └── og-image.png        ← ภาพตอนแชร์ลิงก์ (1200×630)
    └── docs/
        └── README.txt          ← วางไฟล์ resume.pdf ตรงนี้
```

**ลำดับการโหลด CSS สำคัญมาก:** tokens → base → layout → components → sections → responsive
ถ้าสลับลำดับ responsive จะไม่ทำงาน

---

## 2. Page Structure (index.html)

| # | Section | `id` | หมายเหตุ |
|---|---------|------|---------|
| 1 | Navigation | — | fixed + blur เมื่อ scroll, hamburger ที่ ≤768px |
| 2 | Hero | `#top` | headline ใหญ่ + abstract pastel blue orb (CSS ล้วน ไม่มีรูป) |
| 3 | About | `#about` | 2 คอลัมน์ + focus list + ตัวเลข highlight |
| 4 | Selected Work | `#work` | 6 โปรเจกต์ แบบ expandable case preview |
| 5 | Featured Project | — | screenshot เต็มความกว้าง + spec + story |
| 6 | Capabilities | `#capabilities` | 6 หมวด typography-led ไม่ใช้ card |
| 7 | AI Workflow | `#ai-workflow` | section สีเข้ม + flow 7 ขั้น + "AI-assisted, human-led." |
| 8 | Skills & Tools | `#skills` | 5 กลุ่ม ไม่มี progress bar |
| 9 | Results | `#results` | ตัวเลขใหญ่ (placeholder) |
| 10 | Career Timeline | `#experience` | แนวนอนบน desktop / แนวตั้งบน mobile |
| 11 | Resume | `#resume` | ปุ่ม Download + LinkedIn |
| 12 | Contact | `#contact` | section สีเข้ม + email / linkedin / portfolio |
| 13 | Footer | — | minimal |

---

## 3. Components

| Component | Class | ใช้ที่ไหน |
|---|---|---|
| ปุ่ม | `.btn` + `--ghost` `--accent` `--soft` `--on-dark` `--lg` `--sm` | ทั้งเว็บ |
| ลิงก์ลูกศร | `.arrow-link` | ลิงก์ไปหน้าอื่น / เว็บจริง |
| Eyebrow label | `.label` | หัวข้อเล็กเหนือ heading |
| Tag / chip | `.tag` + `--tint` `--invert` `--outline` | AI Workflow |
| Nav + Menu | `.nav` `.menu` | header |
| Work item | `.work-item` (+ `data-work-item`) | Selected Work |
| Case preview | `.case-block` | ใน panel ที่กางออก |
| Placeholder รูป | `.thumb` | ทุกที่ที่ยังไม่มีภาพจริง |
| Capability | `.cap` | What I do |
| Flow step | `.flow__step` | AI Workflow |
| Skill group | `.skill-group` | Skills |
| Stat | `.stat` / `.stat-mini` | Results / About |
| Timeline item | `.tl-item` | Experience |

---

## 4. Design Tokens (`assets/css/tokens.css`)

แก้ที่ไฟล์เดียว เปลี่ยนทั้งเว็บ

**สี**

```
--c-blue-300  #b3d2f2   Pastel Blue   (accent อ่อน)
--c-blue-400  #8bb8e8   Soft Blue
--c-blue-500  #5b93d8   Accent หลัก (ลิงก์ / label / hover)
--c-gray-50   #fafbfc   Light Gray (พื้น section สลับ)
--c-gray-200  #e4e8ee   เส้น hairline
--c-gray-600  #666e7a   Medium Gray (ข้อความรอง)
--c-ink       #0d1013   Almost Black (ข้อความหลัก)
```

Semantic roles ที่ควรใช้แทนสีดิบ: `--bg` `--bg-soft` `--bg-tint` `--bg-invert`
`--text` `--text-secondary` `--accent` `--line`

**Typography** — Inter (Google Fonts) + fallback system font
Type scale เป็น `clamp()` ทั้งหมด (fluid) → `--fs-display` `--fs-h1` … `--fs-tiny`

**Spacing** — `--sp-1` … `--sp-12` (8pt base) และ `--section-y` สำหรับระยะห่างระหว่าง section

**Motion** — `--ease-soft` `--ease-out`, `--dur-fast/base/slow/reveal`

> อยากให้เว็บ "อุ่น" ขึ้นหรือ "เย็น" ขึ้น ให้ขยับแค่ `--c-blue-*` และ `--accent`

---

## 5. วิธีแก้ข้อความ

ข้อความทุกจุดที่ต้องแก้จะอยู่ในรูป `[ALL CAPS IN BRACKETS]`
ค้นหาในไฟล์ `index.html` แล้วแทนที่ได้เลย:

| Placeholder | ใส่อะไร | อยู่ที่ |
|---|---|---|
| `[YOUR NAME]` | ชื่อของคุณ | nav, footer, meta, JSON-LD |
| `[ROLE]` | ตำแหน่ง เช่น Digital Marketer | hero, about, meta |
| `[LOCATION]` | เมือง/ประเทศ | about |
| `[EMAIL]` | อีเมล | menu, contact, JSON-LD |
| `[LINKEDIN]` | URL LinkedIn เต็ม | resume, contact, JSON-LD |
| `[LINKEDIN HANDLE]` | ชื่อที่แสดง เช่น /in/yourname | contact |
| `[YOUR-DOMAIN]` | โดเมนจริง | meta, canonical, sitemap, robots |
| `[X]+` | ตัวเลข About | about |
| `XX+` `XX%` | ตัวเลข Results | results |
| `[YEAR]` `[PREVIOUS ROLE]` | timeline / featured | experience, featured |

**ทางลัด** (macOS / Linux) — แทนที่ทั้งโปรเจกต์:

```bash
grep -rl "\[YOUR NAME\]" . | xargs sed -i '' 's/\[YOUR NAME\]/Your Real Name/g'
```

---

## 6. วิธีเพิ่ม Case Study

**6.1 เพิ่มโปรเจกต์ในหน้า Home**

เปิด `index.html` หา `<!-- ---------- PROJECT 06 ---------- -->`
คัดลอกทั้งบล็อก `<article class="work-item">…</article>` มาวางต่อ แล้วแก้ 4 จุด:

1. `data-work-toggle aria-controls="work-panel-07"` และ `id="work-panel-07"` → **ต้องเป็นเลขใหม่ที่ไม่ซ้ำ**
2. `work-item__index` → `07 / Category · Category`
3. `work-item__title` → ชื่อโปรเจกต์
4. เนื้อหาใน 3 บล็อก The Challenge / The Approach / The Outcome

**6.2 สร้างหน้า Case Study แยก**

```bash
cp case-study/template.html case-study/property-valuation.html
```

แก้ใน `<head>` (title / description / canonical / JSON-LD) แล้วเติมเนื้อหา
Problem → Approach → Execution → Result

จากนั้นชี้ปุ่มในหน้า Home มาที่ไฟล์ใหม่:

```html
<a class="btn btn--sm" href="case-study/property-valuation.html">View Case Study →</a>
```

อย่าลืมเพิ่ม URL ใหม่ลงใน `sitemap.xml`

---

## 7. วิธีเปลี่ยนรูป

ตอนนี้ทุกช่องภาพเป็น placeholder:

```html
<div class="thumb"><span class="thumb__text">Project image</span></div>
```

แทนที่ด้วย `<img>` จริง (ทุกที่มีคอมเมนต์บอกไว้แล้ว):

```html
<img src="assets/img/project-01.jpg"
     alt="หน้าเว็บ Property Valuation for Legal Cases"
     loading="lazy" width="1600" height="1000">
```

- วางไฟล์ไว้ที่ `assets/img/`
- ขนาดแนะนำ: การ์ดโปรเจกต์ **1600×1000**, Featured **1920×1080**, Case study cover **1920×1080**
- ใช้ `.webp` หรือ `.jpg` คุณภาพ 80 และควรต่ำกว่า 300 KB ต่อไฟล์
- `alt` ต้องอธิบายภาพจริง ๆ (มีผลกับ SEO และ accessibility)
- อยากให้ภาพขยับตอน scroll เบา ๆ ใส่ `data-parallax="6"` ที่ `<img>`
- เปลี่ยน OG image: แทนที่ `assets/img/og-image.png` (1200×630)
- เปลี่ยน favicon: แก้สีใน `assets/img/favicon.svg`

---

## 8. วิธีเปลี่ยน Social Links & Resume

| อยากเปลี่ยน | แก้ที่ |
|---|---|
| Resume PDF | วางไฟล์ชื่อ `resume.pdf` ใน `assets/docs/` — หรือแก้ `href="assets/docs/resume.pdf"` (มี 4 จุด) ให้ชี้ URL อื่น |
| LinkedIn | ค้นหา `[LINKEDIN]` (มีใน resume section, contact, JSON-LD) |
| Email | ค้นหา `[EMAIL]` |
| เพิ่มช่องทางใหม่ | copy บล็อก `<div class="contact__link">…</div>` ใน section Contact |

---

## 9. Animation

| ใส่ที่ element | ผล |
|---|---|
| `data-reveal` | fade + เลื่อนขึ้น |
| `data-reveal="fade"` / `"scale"` / `"left"` / `"right"` | รูปแบบอื่น |
| `data-reveal-delay="120"` | หน่วงเป็นมิลลิวินาที |
| `data-reveal-text` | headline เผยทีละบรรทัด (ตัดบรรทัดด้วย `<br>`) |
| `data-parallax="6"` | parallax เบา ๆ (ตัวเลข = ความแรง) |

ทั้งหมดใช้ `IntersectionObserver` (เบา ไม่มี library) และ **ปิดอัตโนมัติ**
เมื่อผู้ใช้เปิด `prefers-reduced-motion: reduce`

---

## 10. Responsive

| Breakpoint | สิ่งที่เปลี่ยน |
|---|---|
| 1440 / 1280 | container แคบลง ระยะห่างกระชับขึ้น |
| ≤1024 | Hero เป็นคอลัมน์เดียว · Work เอาภาพขึ้นบน · AI Flow และ Timeline เปลี่ยนเป็นแนวตั้ง · Capabilities 2 คอลัมน์ |
| ≤768 | เปลี่ยนเป็น Hamburger menu · Capabilities 1 คอลัมน์ · Skills 2 คอลัมน์ · Case preview เรียงลง |
| ≤560 | ปุ่มเต็มความกว้าง · Results 1 คอลัมน์ · ภาพเป็น 4:3 |
| ≤390 | gutter แคบลง ปุ่มเล็กลง |

มี `@media print` ให้ด้วย เผื่อพิมพ์เป็น PDF

---

## 11. SEO & Accessibility ที่ใส่มาแล้ว

- Semantic HTML (`header` `main` `section` `article` `nav` `footer`) + heading hierarchy ถูกต้อง (h1 เดียว)
- Meta title / description / canonical / robots
- Open Graph + Twitter Card + OG image 1200×630
- JSON-LD `Person` (หน้า Home) และ `CreativeWork` (หน้า case study)
- `sitemap.xml` + `robots.txt` + `site.webmanifest` + favicon
- Skip link, `:focus-visible`, `aria-expanded` / `aria-controls` / `aria-hidden` ที่ accordion และเมนู
- ไม่มี JS ที่ block การ render (ใช้ `defer` ทั้งหมด), ไม่มี framework, ไม่มีรูปใน Hero

**ก่อน deploy อย่าลืม:** แทนที่ `[YOUR-DOMAIN]` ใน `index.html`, `case-study/*.html`, `sitemap.xml`, `robots.txt`

---

## 12. วิธี Deploy ผ่าน GitHub + Vercel

**ขั้นที่ 1 — ขึ้น GitHub**

```bash
cd portfolio
git init
git add .
git commit -m "Portfolio foundation"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

**ขั้นที่ 2 — Vercel**

1. เข้า [vercel.com](https://vercel.com) → **Add New… → Project**
2. เลือก repo ที่เพิ่ง push
3. ตั้งค่า:
   - Framework Preset: **Other**
   - Build Command: **เว้นว่าง**
   - Output Directory: **เว้นว่าง** (หรือ `.`)
   - Install Command: **เว้นว่าง**
4. กด **Deploy** → ได้ URL `https://<project>.vercel.app`

**ขั้นที่ 3 — หลัง deploy**

- นำโดเมนจริงไปแทนที่ `[YOUR-DOMAIN]` แล้ว push ใหม่
- ต่อโดเมนของตัวเอง: Project → Settings → Domains
- ทุก `git push` ขึ้น `main` จะ deploy อัตโนมัติ

**ทดสอบในเครื่องก่อน**

```bash
python3 -m http.server 8000    # แล้วเปิด http://localhost:8000
```

---

## 13. Checklist ก่อนส่งสมัครงาน

- [ ] แทนที่ `[YOUR NAME]` `[ROLE]` `[EMAIL]` `[LINKEDIN]` `[YOUR-DOMAIN]` ครบทุกไฟล์
- [ ] เขียน About จริง 3 ย่อหน้า
- [ ] ใส่ Challenge / Approach / Outcome ของโปรเจกต์ 01 และ 02
- [ ] เปลี่ยนภาพ placeholder เป็น screenshot จริง
- [ ] ใส่ตัวเลขจริงใน Results (หรือลบ section ทิ้งถ้ายังไม่มี — อย่าใส่ตัวเลขที่ไม่จริง)
- [ ] วาง `resume.pdf`
- [ ] เช็คหน้าเว็บบนมือถือจริง
- [ ] รัน Lighthouse (ตั้งเป้า 95+ ทั้ง 4 ด้าน)
