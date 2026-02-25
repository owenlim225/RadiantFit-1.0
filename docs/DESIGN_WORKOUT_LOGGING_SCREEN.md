# FITNESS APP – DAY 1 WORKOUT LOGGING SCREEN

**Design specification for replication (Figma / Xcode / React Native)**  
**Context:** Philippine user (Antipolo, Calabarzon), February 2026.  
**Reference:** iPhone 14 Pro Max (430pt × 932pt logical).

---

## 1. SCREEN DIMENSIONS & LAYOUT

- **Device:** iPhone 14 Pro Max  
  **Logical resolution:** 430pt × 932pt  
- **Safe area:**  
  - **Top:** ~47pt (status bar)  
  - **Bottom:** ~83pt (home indicator)  
- **Content width:** ~398pt (430pt minus 16pt horizontal padding each side).  
- **Primary layout:** Vertical stack (flex column). Main content on white `#FFFFFF`; exercise blocks in cards.  
- **Spacing system:** 4pt grid; 16pt card padding, 12pt gutters, 8pt between elements where not specified.

---

## 2. STATUS BAR (0–47pt)

- **Height:** ~47pt.  
- **Style:** Transparent/light; dark elements on light background.  
- **Left:** Time, e.g. `11:39 PM` — 14pt Regular, `#1C1C1E`.  
- **Center:** Network/symbols (moon, M, star, clock) — Dark Grey `#1C1C1E`.  
- **Right:** “106 K/S”, “Vo WiFi LTE”, “Vo 4G LTE”, “4G LTE”, battery 49% — Dark Grey; battery fill distinct.  
- **Handoff:** Use native status bar; no custom drawing in this zone.

---

## 3. NAVIGATION HEADER (47–108pt)

- **Height:** ~61pt from bottom of status bar.  
- **Background:** White `#FFFFFF`.  
- **Layout:** Horizontal: [Back] [Title + Timer] [Edit].  

| Element        | Specs                                                                 |
|----------------|-----------------------------------------------------------------------|
| Back           | Chevron left, 24pt, `#1C1C1E`, ~16pt from left edge                  |
| Title          | “Day 1 – Muscle building”, 16pt Medium, `#1C1C1E`, center, ~16pt below status bar |
| Timer          | “00:01”, 28pt Bold, `#1C1C1E`, ~4pt below title                     |
| Edit (pencil)  | 16pt, `#1C1C1E`, right-aligned to timer                              |

- **Touch targets:** Minimum 44pt for back and edit.  
- **States:** Default only; document hover/press in component library (e.g. opacity 0.7 on press).

---

## 4. MAIN CONTENT – EXERCISE LIST

Scrollable vertical list. Each item is a card; one expanded (with set rows), rest collapsed.

### 4.1 CARD CONTAINER (ALL CARDS)

- **Background:** Light Grey `#F2F2F7`.  
- **Corner radius:** 16pt.  
- **Shadow:** ~4dp elevation, subtle bottom shadow for card lift.  
- **Padding:** 16pt horizontal and vertical.  
- **Gap between cards:** 12pt.  
- **Width:** Full content width (~398pt).

### 4.2 EXPANDED EXERCISE CARD (e.g. INCLINE BENCH PRESS)

**Header row (single row):**

| Element           | Specs                                                                 |
|-------------------|-----------------------------------------------------------------------|
| Collapse icon     | Chevron up, 20pt, `#1C1C1E`, left                                     |
| Exercise image    | Circle, ~56×56pt, light grey bg; ExerciseDB `gifUrl` or placeholder   |
| Title             | “Incline Bench Press • Dumbbell”, 20pt Semibold, `#1C1C1E`            |
| Completion        | “0/2 Done”, 14pt Regular, `#3C3C43`, ~4pt below title                 |
| Info icon         | Circled “?”, 16pt, below image                                        |
| Options           | Vertical ellipsis “...”, 24pt, `#1C1C1E`, right                       |

**Set tracking (only in expanded card):**

- **Active set:** 8pt vertical bar, left edge of set row, Green `#34C759`.  
- **Set row:**  
  - Background White `#FFFFFF`, 12pt radius, ~12pt vertical gap between rows.  
  - Padding ~12pt horizontal and vertical.  
- **Per set:**  
  - Unfilled circle checkbox, 20pt.  
  - Set number: “1” / “2”, 16pt Regular, `#1C1C1E`.  
  - Weight: rounded field ~72×40pt, bg `#E5E5EA`, value “44”, 16pt Semibold, `#1C1C1E`.  
  - Label “KG”, 14pt Regular, `#3C3C43`.  
  - Reps: same field style, value “15”, label “Reps”.  

**“Add a set” button:**

- Full width, ~20pt below last set.  
- Background `#E5E5EA`, 12pt radius.  
- “+ Add a set”, 16pt Medium, `#1C1C1E`; “+” icon 20pt.  
- Press state: e.g. opacity 0.8 or slight scale.

### 4.3 COLLAPSED EXERCISE CARDS

- Same card style (`#F2F2F7`, 16pt radius, 4dp shadow).  
- **Collapse icon:** Chevron down, 20pt.  
- **Image:** Same 56×56pt circle.  
- **Title:** 16pt Semibold, `#1C1C1E` (e.g. “Bench Fly • Dumbbell”, “Pullover • Dumbbell”).  
- **Completion:** “0/2 Done”, 14pt Regular, `#3C3C43`.  
- **Info + options:** Same as expanded.  
- No set rows; tap to expand.

---

## 5. BOTTOM ACTION BAR (~870–932pt)

- **Height:** ~62pt.  
- **Background:** White `#FFFFFF`.  
- **Layout:** Horizontal: [ALL checkbox] [LOG NEXT SET].  

**“ALL” checkbox:**

- Left, ~16pt from edge.  
- Square checkmark icon (rounded), filled when “select all” active.  
- “ALL” label below, `#1C1C1E`.  
- Min touch target 44pt.

**“LOG NEXT SET” (primary CTA):**

- Rest of width (or full width with padding).  
- Background Primary Blue `#007AFF`.  
- “LOG NEXT SET”, 16pt Medium, White `#FFFFFF`.  
- Corner radius 12pt.  
- Press: e.g. opacity 0.9 or 1dp darker.  
- Contrast: ensure WCAG AA on white text on #007AFF.

---

## 6. COLOR PALETTE

| Role           | Hex       | Usage                          |
|----------------|-----------|---------------------------------|
| Primary CTA    | `#007AFF` | “LOG NEXT SET”, key actions    |
| Success/Active | `#34C759` | Active set bar, completed sets  |
| Text primary   | `#1C1C1E` | Titles, main copy, icons        |
| Text secondary | `#3C3C43` | Labels, “0/2 Done”, units       |
| Card bg        | `#F2F2F7` | Exercise cards                  |
| Surface        | `#FFFFFF` | Screen, set rows, bottom bar    |
| Input bg       | `#E5E5EA` | Weight/reps fields, “Add a set” |

---

## 7. TYPOGRAPHY

- **Headers (exercise in expanded card):** 20pt Semibold, `#1C1C1E`.  
- **Screen title:** 16pt Medium.  
- **Timer:** 28pt Bold.  
- **Body / set values:** 16pt Regular/Semibold.  
- **Labels / completion / units:** 14pt Regular, `#3C3C43`.  
- **Buttons:** 16pt Medium.  
- **System font:** SF Pro (iOS); document equivalent for Android/Web.

---

## 8. INTERACTIVE STATES & ACCESSIBILITY

- **Buttons:** Minimum 44pt tap height; press feedback (opacity or scale).  
- **Cards:** Tap to expand/collapse; consider focus ring for keyboard/accessibility.  
- **Inputs:** Clear focus state; ensure 3:1 contrast for placeholder and values.  
- **Icons:** Same semantic use across screen (chevron = collapse, “?” = info, “...” = options).

---

## 9. REPLICATION CHECKLIST

- [ ] Safe areas: 47pt top, 83pt bottom; 16pt horizontal padding.  
- [ ] Status bar: system, no custom UI in 0–47pt.  
- [ ] Header: back, “Day 1 – Muscle building”, “00:01”, edit icon.  
- [ ] Cards: #F2F2F7, 16pt radius, 4dp shadow, 16pt padding.  
- [ ] Exercise image: 56×56pt circle, API `gifUrl` or placeholder.  
- [ ] Set rows: white, 12pt radius, green `#34C759` bar for active set.  
- [ ] “Add a set”: #E5E5EA, 12pt radius, + and “Add a set” 16pt Medium.  
- [ ] Bottom bar: “ALL” + “LOG NEXT SET” #007AFF, 16pt Medium white.  
- [ ] All measures in pt; spacing in 4pt steps.

---

*Document version: 1.0. For RadiantFit workout logging UI handoff.*
