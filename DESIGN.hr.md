---
version: alpha
name: Porest
description: |
  People + Forest. Dual-brand design system for Porest HR (B2B) 
  and Porest Desk (B2C). Optimized for Korean-first audiences,
  all-ages accessibility.

colors:
  # @sync:brand-start (colors-0)
  # === v108 — 브랜드 팔레트(HR 초록). 파일 안에서는 접미사 없이 brand-100 ~ 1000, 단계마다 라이트 · 다크(-dark) ===
  brand-100: "#EDF5F0"
  brand-100-dark: "#222D28"
  brand-200: "#E0EDE7"
  brand-200-dark: "#25372E"
  brand-300: "#B4CCC0"
  brand-300-dark: "#264437"
  brand-400: "#6AB192"
  brand-400-dark: "#25523F"
  brand-500: "#60927B"
  brand-500-dark: "#216048"
  brand-600: "#357B5F"
  brand-600-dark: "#256D51"
  brand-700: "#256D52"
  brand-700-dark: "#357B5F"
  brand-800: "#145A42"
  brand-800-dark: "#599279"
  brand-900: "#03452F"
  brand-900-dark: "#72B898"
  brand-1000: "#052B1E"
  brand-1000-dark: "#CED6D2"
  # @sync:brand-end (colors-0)
  
  # @sync:shared-start (colors-0)
  # === v108 — 팔레트(SEED 식 모드별). 가족마다 100 ~ 1000(회색은 00 을 더해 11단), 단계마다 라이트 · 다크(-dark) ===
  # 역할(fg · bg · stroke)은 이 팔레트를 가리킨다. 다크는 SEED 처럼 뒤집혀 100 이 가장 어둡다
  gray-00: "#FFFFFF"
  gray-00-dark: "#1A1F2E"
  gray-100: "#F7F8FD"
  gray-100-dark: "#242938"
  gray-200: "#F5F6FA"
  gray-200-dark: "#2D3346"
  gray-300: "#EDEFF3"
  gray-300-dark: "#353B4D"
  gray-400: "#E5E8EF"
  gray-400-dark: "#404757"
  gray-500: "#8A91A0"
  gray-500-dark: "#656B78"
  gray-600: "#767C8B"
  gray-600-dark: "#838997"
  gray-700: "#62697A"
  gray-700-dark: "#A2A8B7"
  gray-800: "#535866"
  gray-800-dark: "#B7BDCC"
  gray-900: "#2F3541"
  gray-900-dark: "#D6DDEC"
  gray-1000: "#1A1F2E"
  gray-1000-dark: "#F5F6FA"
  red-100: "#FFEFEC"
  red-100-dark: "#3E231F"
  red-200: "#FFDEDA"
  red-200-dark: "#532722"
  red-300: "#FEC4BC"
  red-300-dark: "#722722"
  red-400: "#FCA195"
  red-400-dark: "#93231F"
  red-500: "#F8776B"
  red-500-dark: "#B51317"
  red-600: "#E95046"
  red-600-dark: "#CC0E17"
  red-700: "#D72323"
  red-700-dark: "#D82424"
  red-800: "#C01016"
  red-800-dark: "#FF8477"
  red-900: "#96030C"
  red-900-dark: "#FFBCB3"
  red-1000: "#5C0004"
  red-1000-dark: "#FEEDEA"
  green-100: "#EAF5EC"
  green-100-dark: "#202D23"
  green-200: "#D8EADB"
  green-200-dark: "#223927"
  green-300: "#BBDAC1"
  green-300-dark: "#20482B"
  green-400: "#95C49E"
  green-400-dark: "#1A582F"
  green-500: "#6AAC7A"
  green-500-dark: "#076931"
  green-600: "#43955B"
  green-600-dark: "#117539"
  green-700: "#167F3F"
  green-700-dark: "#198140"
  green-800: "#026E33"
  green-800-dark: "#25C062"
  green-900: "#075527"
  green-900-dark: "#AED6B6"
  green-1000: "#023214"
  green-1000-dark: "#E9F4EB"
  orange-100: "#FFEFE8"
  orange-100-dark: "#39251E"
  orange-200: "#FAE0D5"
  orange-200-dark: "#4B2B1F"
  orange-300: "#F5C7B6"
  orange-300-dark: "#65321D"
  orange-400: "#EDA98E"
  orange-400-dark: "#833615"
  orange-500: "#E18663"
  orange-500-dark: "#9F3901"
  orange-600: "#D1673B"
  orange-600-dark: "#B04209"
  orange-700: "#BE490D"
  orange-700-dark: "#BF4A10"
  orange-800: "#A53E0A"
  orange-800-dark: "#FF8758"
  orange-900: "#822E02"
  orange-900-dark: "#F9BFA9"
  orange-1000: "#4E1801"
  orange-1000-dark: "#FEEEE7"
  blue-100: "#EAF3FE"
  blue-100-dark: "#1F2A39"
  blue-200: "#D7E6FB"
  blue-200-dark: "#21344D"
  blue-300: "#B9D4F6"
  blue-300-dark: "#204069"
  blue-400: "#92BCF0"
  blue-400-dark: "#1C4E8A"
  blue-500: "#69A0E7"
  blue-500-dark: "#125AAA"
  blue-600: "#4387DA"
  blue-600-dark: "#0F65BF"
  blue-700: "#1D6EC9"
  blue-700-dark: "#1F70CB"
  blue-800: "#0F5FB3"
  blue-800-dark: "#69ABFF"
  blue-900: "#06498D"
  blue-900-dark: "#ACCEFB"
  blue-1000: "#022956"
  blue-1000-dark: "#E8F2FE"
  # v110 — 차트 10색을 팔레트에서 고르려고 더한 가족(700 = v21 ~ v24 차트 색)
  yellow-100: "#F5F2E8"
  yellow-100-dark: "#2D2A1D"
  yellow-200: "#EAE6D4"
  yellow-200-dark: "#3A331D"
  yellow-300: "#DAD2B4"
  yellow-300-dark: "#4A4019"
  yellow-400: "#C5B98A"
  yellow-400-dark: "#5C4D0B"
  yellow-500: "#AF9E5D"
  yellow-500-dark: "#6C5906"
  yellow-600: "#998331"
  yellow-600-dark: "#796400"
  yellow-700: "#8C7400"
  yellow-700-dark: "#846E04"
  yellow-800: "#725E01"
  yellow-800-dark: "#C5A721"
  yellow-900: "#574805"
  yellow-900-dark: "#D7CCA6"
  yellow-1000: "#332902"
  yellow-1000-dark: "#F3F1E6"
  indigo-100: "#EFF2FF"
  indigo-100-dark: "#26293A"
  indigo-200: "#E1E4FC"
  indigo-200-dark: "#2F324E"
  indigo-300: "#CACFF7"
  indigo-300-dark: "#383C6A"
  indigo-400: "#ADB4F1"
  indigo-400-dark: "#44468B"
  indigo-500: "#9098E9"
  indigo-500-dark: "#4F51AB"
  indigo-600: "#767CDC"
  indigo-600-dark: "#585AC1"
  indigo-700: "#5E60C8"
  indigo-700-dark: "#6264CC"
  indigo-800: "#5354B6"
  indigo-800-dark: "#99A1FE"
  indigo-900: "#3F3E92"
  indigo-900-dark: "#C3C9FC"
  indigo-1000: "#242359"
  indigo-1000-dark: "#EEF0FE"
  violet-100: "#F7EFFE"
  violet-100-dark: "#302638"
  violet-200: "#ECE1F8"
  violet-200-dark: "#3D2E4B"
  violet-300: "#DEC9F2"
  violet-300-dark: "#4F3565"
  violet-400: "#CCACEA"
  violet-400-dark: "#643C83"
  violet-500: "#B88BDF"
  violet-500-dark: "#7842A1"
  violet-600: "#A46DD1"
  violet-600-dark: "#8749B5"
  violet-700: "#8B4DBA"
  violet-700-dark: "#9153C0"
  violet-800: "#7F44AA"
  violet-800-dark: "#C793F3"
  violet-900: "#633089"
  violet-900-dark: "#DCC1F6"
  violet-1000: "#3B1A53"
  violet-1000-dark: "#F5EEFC"
  pink-100: "#FFEEF4"
  pink-100-dark: "#38242C"
  pink-200: "#FBDEE9"
  pink-200-dark: "#4C2938"
  pink-300: "#F5C5D7"
  pink-300-dark: "#642D47"
  pink-400: "#EDA3C2"
  pink-400-dark: "#813058"
  pink-500: "#E07FAA"
  pink-500-dark: "#9E3067"
  pink-600: "#D05E93"
  pink-600-dark: "#B23574"
  pink-700: "#B83B7A"
  pink-700-dark: "#BD407F"
  pink-800: "#A7326D"
  pink-800-dark: "#F485B6"
  pink-900: "#851F55"
  pink-900-dark: "#F9BBD3"
  pink-1000: "#510E31"
  pink-1000-dark: "#FEECF3"
  brown-100: "#F8F0EB"
  brown-100-dark: "#322821"
  brown-200: "#EFE3DA"
  brown-200-dark: "#3F3024"
  brown-300: "#E3CEBD"
  brown-300-dark: "#533B26"
  brown-400: "#D2B399"
  brown-400-dark: "#694628"
  brown-500: "#C09573"
  brown-500-dark: "#7E5127"
  brown-600: "#AC7B51"
  brown-600-dark: "#8E5A2A"
  brown-700: "#9A6536"
  brown-700-dark: "#986334"
  brown-800: "#855428"
  brown-800-dark: "#CF9F77"
  brown-900: "#693F18"
  brown-900-dark: "#E2C7B2"
  brown-1000: "#3F240A"
  brown-1000-dark: "#F7F0EA"
  # @sync:shared-end (colors-0)
  
  # @sync:brand-start (colors-1)
  # === Brand (HR primary, single-brand 명명 — DESIGN.hr.md context) ===
  primary: "{colors.fg-brand}"
  primary-light: "{colors.fg-brand-dark}"
  # @sync:brand-end (colors-1)
  
  # @sync:shared-start (colors-1)
  # === Neutral - Page background (HR/Desk 공유) ===
  bg-page: "{colors.bg-layer-basement}"
  bg-page-dark: "{colors.bg-layer-basement-dark}"
  
  # === Neutral - Surface (카드/시트/입력 표면, 공통) ===
  surface-default: "{colors.bg-layer-default}"
  surface-default-dark: "{colors.bg-layer-default-dark}"
  surface-input: "{colors.bg-neutral-weak}"
  surface-input-dark: "{colors.bg-neutral-weak-dark}"
  
  # === Neutral - Text (본문/보조/3차/accent 위, 공통) ===
  text-primary: "{colors.fg-neutral}"
  text-primary-dark: "{colors.fg-neutral-dark}"
  text-secondary: "{colors.fg-neutral-muted}"
  text-secondary-dark: "{colors.fg-neutral-muted-dark}"
  text-tertiary: "{colors.fg-neutral-subtle}"
  text-tertiary-dark: "{colors.fg-neutral-subtle-dark}"
  text-disabled: "{colors.fg-disabled}"
  text-disabled-dark: "{colors.fg-disabled-dark}"
  text-on-accent: "{colors.static-white}"
  
  # === Neutral - Border (장식 외곽선/필수 UI 외곽선, 공통) ===
  border-default: "{colors.stroke-neutral-weak}"
  border-default-dark: "{colors.stroke-neutral-weak-dark}"
  border-strong: "{colors.stroke-neutral-solid}"
  border-strong-dark: "{colors.stroke-neutral-solid-dark}"
  # @sync:shared-end (colors-1)
  
  # @sync:brand-start (colors-2)
  # === Brand - Focus ring (HR primary 시맨틱 alias) ===
  border-focus: "{colors.stroke-focus-ring}"
  border-focus-light: "{colors.stroke-focus-ring-dark}"
  # @sync:brand-end (colors-2)
  
  # @sync:shared-start (colors-2)
  # === Semantic - Status (functional palette, base + light 페어, 듀얼 브랜드 공유) ===
  success: "{colors.fg-positive}"
  success-light: "{colors.fg-positive-dark}"
  error: "{colors.fg-critical}"
  error-light: "{colors.fg-critical-dark}"
  warning: "{colors.fg-warning}"
  warning-light: "{colors.fg-warning-dark}"
  info: "{colors.fg-informative}"
  info-light: "{colors.fg-informative-dark}"
  
  # === Chart 10색 (v110 — 팔레트 단계에서: 라이트 700 · 다크 800-dark, 듀얼 브랜드 공유) ===
  # 저장된 옛 hex(카테고리 · 태그 · 캘린더 색)는 이름표로 두고, 그리는 색만 이 토큰을 따른다
  chart-red: "{colors.red-700}"
  chart-orange: "{colors.orange-700}"
  chart-yellow: "{colors.yellow-700}"
  chart-green: "{colors.green-700}"
  chart-blue: "{colors.blue-700}"
  chart-indigo: "{colors.indigo-700}"
  chart-violet: "{colors.violet-700}"
  chart-pink: "{colors.pink-700}"
  chart-brown: "{colors.brown-700}"
  chart-gray: "{colors.gray-700}"
  chart-red-dark: "{colors.red-800-dark}"
  chart-orange-dark: "{colors.orange-800-dark}"
  chart-yellow-dark: "{colors.yellow-800-dark}"
  chart-green-dark: "{colors.green-800-dark}"
  chart-blue-dark: "{colors.blue-800-dark}"
  chart-indigo-dark: "{colors.indigo-800-dark}"
  chart-violet-dark: "{colors.violet-800-dark}"
  chart-pink-dark: "{colors.pink-800-dark}"
  chart-brown-dark: "{colors.brown-800-dark}"
  chart-gray-dark: "{colors.gray-800-dark}"
  # v111 — 카테고리 옅은 바탕(작은 면 weak · 넓은 면 subtle)과 그 위 글자(contrast). 아이콘은 chart-{hue} 그대로
  chart-red-weak: "{colors.red-200}"
  chart-red-weak-dark: "{colors.red-300-dark}"
  chart-red-subtle: "{colors.red-100}"
  chart-red-subtle-dark: "{colors.red-200-dark}"
  chart-red-contrast: "{colors.red-800}"
  chart-red-contrast-dark: "{colors.red-900-dark}"
  chart-orange-weak: "{colors.orange-200}"
  chart-orange-weak-dark: "{colors.orange-300-dark}"
  chart-orange-subtle: "{colors.orange-100}"
  chart-orange-subtle-dark: "{colors.orange-200-dark}"
  chart-orange-contrast: "{colors.orange-800}"
  chart-orange-contrast-dark: "{colors.orange-900-dark}"
  chart-yellow-weak: "{colors.yellow-200}"
  chart-yellow-weak-dark: "{colors.yellow-300-dark}"
  chart-yellow-subtle: "{colors.yellow-100}"
  chart-yellow-subtle-dark: "{colors.yellow-200-dark}"
  chart-yellow-contrast: "{colors.yellow-800}"
  chart-yellow-contrast-dark: "{colors.yellow-900-dark}"
  chart-green-weak: "{colors.green-200}"
  chart-green-weak-dark: "{colors.green-300-dark}"
  chart-green-subtle: "{colors.green-100}"
  chart-green-subtle-dark: "{colors.green-200-dark}"
  chart-green-contrast: "{colors.green-800}"
  chart-green-contrast-dark: "{colors.green-900-dark}"
  chart-blue-weak: "{colors.blue-200}"
  chart-blue-weak-dark: "{colors.blue-300-dark}"
  chart-blue-subtle: "{colors.blue-100}"
  chart-blue-subtle-dark: "{colors.blue-200-dark}"
  chart-blue-contrast: "{colors.blue-800}"
  chart-blue-contrast-dark: "{colors.blue-900-dark}"
  chart-indigo-weak: "{colors.indigo-200}"
  chart-indigo-weak-dark: "{colors.indigo-300-dark}"
  chart-indigo-subtle: "{colors.indigo-100}"
  chart-indigo-subtle-dark: "{colors.indigo-200-dark}"
  chart-indigo-contrast: "{colors.indigo-800}"
  chart-indigo-contrast-dark: "{colors.indigo-900-dark}"
  chart-violet-weak: "{colors.violet-200}"
  chart-violet-weak-dark: "{colors.violet-300-dark}"
  chart-violet-subtle: "{colors.violet-100}"
  chart-violet-subtle-dark: "{colors.violet-200-dark}"
  chart-violet-contrast: "{colors.violet-800}"
  chart-violet-contrast-dark: "{colors.violet-900-dark}"
  chart-pink-weak: "{colors.pink-200}"
  chart-pink-weak-dark: "{colors.pink-300-dark}"
  chart-pink-subtle: "{colors.pink-100}"
  chart-pink-subtle-dark: "{colors.pink-200-dark}"
  chart-pink-contrast: "{colors.pink-800}"
  chart-pink-contrast-dark: "{colors.pink-900-dark}"
  chart-brown-weak: "{colors.brown-200}"
  chart-brown-weak-dark: "{colors.brown-300-dark}"
  chart-brown-subtle: "{colors.brown-100}"
  chart-brown-subtle-dark: "{colors.brown-200-dark}"
  chart-brown-contrast: "{colors.brown-800}"
  chart-brown-contrast-dark: "{colors.brown-900-dark}"
  chart-gray-weak: "{colors.gray-400}"
  chart-gray-weak-dark: "{colors.gray-400-dark}"
  chart-gray-subtle: "{colors.gray-300}"
  chart-gray-subtle-dark: "{colors.gray-300-dark}"
  chart-gray-contrast: "{colors.gray-800}"
  chart-gray-contrast-dark: "{colors.gray-900-dark}"
  # 옛 이름 — 다크 짝(v23 ~ v24). 제품 CSS 가 옮겨 가면 지운다
  chart-red-light: "{colors.chart-red-dark}"
  chart-orange-light: "{colors.chart-orange-dark}"
  chart-yellow-light: "{colors.chart-yellow-dark}"
  chart-green-light: "{colors.chart-green-dark}"
  chart-blue-light: "{colors.chart-blue-dark}"
  chart-indigo-light: "{colors.chart-indigo-dark}"
  chart-violet-light: "{colors.chart-violet-dark}"
  chart-pink-light: "{colors.chart-pink-dark}"
  chart-brown-light: "{colors.chart-brown-dark}"
  chart-gray-light: "{colors.chart-gray-dark}"
  # @sync:shared-end (colors-2)
  
  # @sync:brand-start (colors-3)
  # === v102 — 브랜드 역할 색 (HR). 파일 안에서는 접미사 없이 같은 이름 ===
  # 글자 (fg)
  fg-brand: "{colors.brand-600}"
  fg-brand-dark: "{colors.brand-900-dark}"
  fg-brand-contrast: "{colors.brand-700}"
  fg-brand-contrast-dark: "{colors.brand-900-dark}"
  # 배경 (bg)
  bg-brand-solid: "{colors.brand-600}"
  bg-brand-solid-dark: "{colors.brand-700-dark}"
  bg-brand-solid-pressed: "{colors.brand-700}"
  bg-brand-solid-pressed-dark: "{colors.brand-600-dark}"
  bg-brand-weak: "{colors.brand-100}"
  bg-brand-weak-dark: "{colors.brand-200-dark}"
  bg-brand-weak-pressed: "{colors.brand-200}"
  bg-brand-weak-pressed-dark: "{colors.brand-300-dark}"
  # 선 (stroke)
  stroke-focus-ring: "{colors.brand-600}"
  stroke-focus-ring-dark: "{colors.brand-900-dark}"
  stroke-brand-solid: "{colors.brand-600}"
  stroke-brand-solid-dark: "{colors.brand-900-dark}"
  stroke-brand-weak: "{colors.brand-400}"
  stroke-brand-weak-dark: "{colors.brand-800-dark}"
  # @sync:brand-end (colors-3)
  
  # @sync:shared-start (colors-3)
  # === v102 — SEED 역할 색 (fg · bg · stroke). 값은 porest 색이고, 옛 이름(text-* · surface-* · border-* · success …)은 같은 값의 별칭이다 ===
  # 글자 (fg)
  fg-neutral: "{colors.gray-1000}"
  fg-neutral-dark: "{colors.gray-1000-dark}"
  fg-neutral-muted: "{colors.gray-800}"
  fg-neutral-muted-dark: "{colors.gray-800-dark}"
  fg-neutral-subtle: "{colors.gray-700}"
  fg-neutral-subtle-dark: "{colors.gray-700-dark}"
  fg-neutral-inverted: "{colors.gray-00}"
  fg-neutral-inverted-dark: "{colors.gray-100-dark}"
  fg-placeholder: "{colors.gray-700}"
  fg-placeholder-dark: "{colors.gray-700-dark}"
  fg-disabled: "{colors.gray-500}"
  fg-disabled-dark: "{colors.gray-600-dark}"
  static-white: "#FFFFFF"
  fg-critical: "{colors.red-700}"
  fg-critical-dark: "{colors.red-800-dark}"
  fg-positive: "{colors.green-700}"
  fg-positive-dark: "{colors.green-800-dark}"
  fg-warning: "{colors.orange-700}"
  fg-warning-dark: "{colors.orange-800-dark}"
  fg-informative: "{colors.blue-700}"
  fg-informative-dark: "{colors.blue-800-dark}"
  fg-critical-contrast: "{colors.red-800}"
  fg-critical-contrast-dark: "{colors.red-900-dark}"
  fg-positive-contrast: "{colors.green-800}"
  fg-positive-contrast-dark: "{colors.green-900-dark}"
  fg-warning-contrast: "{colors.orange-800}"
  fg-warning-contrast-dark: "{colors.orange-900-dark}"
  fg-informative-contrast: "{colors.blue-800}"
  fg-informative-contrast-dark: "{colors.blue-900-dark}"
  # 배경 (bg)
  bg-layer-basement: "{colors.gray-200}"
  bg-layer-basement-dark: "{colors.gray-00-dark}"
  bg-layer-default: "{colors.gray-00}"
  bg-layer-default-dark: "{colors.gray-100-dark}"
  bg-layer-default-pressed: "{colors.gray-100}"
  bg-layer-default-pressed-dark: "{colors.gray-300-dark}"
  bg-layer-floating: "{colors.gray-00}"
  bg-layer-floating-dark: "{colors.gray-200-dark}"
  bg-layer-floating-pressed: "{colors.gray-100}"
  bg-layer-floating-pressed-dark: "{colors.gray-300-dark}"
  bg-neutral-weak: "{colors.gray-200}"
  bg-neutral-weak-dark: "{colors.gray-300-dark}"
  bg-neutral-weak-pressed: "{colors.gray-300}"
  bg-neutral-weak-pressed-dark: "{colors.gray-400-dark}"
  bg-neutral-inverted: "{colors.gray-1000}"
  bg-neutral-inverted-dark: "{colors.gray-1000-dark}"
  # v112 — neutralSolid 버튼의 누름(SEED bg.neutral-inverted-pressed = gray-800)
  bg-neutral-inverted-pressed: "{colors.gray-800}"
  bg-neutral-inverted-pressed-dark: "{colors.gray-800-dark}"
  bg-disabled: "{colors.gray-200}"
  bg-disabled-dark: "{colors.gray-300-dark}"
  bg-critical-solid: "{colors.red-700}"
  bg-critical-solid-dark: "{colors.red-600-dark}"
  bg-critical-solid-pressed: "{colors.red-800}"
  bg-critical-solid-pressed-dark: "{colors.red-700-dark}"
  bg-critical-weak: "{colors.red-100}"
  bg-critical-weak-dark: "{colors.red-200-dark}"
  bg-critical-weak-pressed: "{colors.red-200}"
  bg-critical-weak-pressed-dark: "{colors.red-300-dark}"
  bg-positive-solid: "{colors.green-700}"
  bg-positive-solid-dark: "{colors.green-600-dark}"
  bg-positive-solid-pressed: "{colors.green-800}"
  bg-positive-solid-pressed-dark: "{colors.green-700-dark}"
  bg-positive-weak: "{colors.green-100}"
  bg-positive-weak-dark: "{colors.green-200-dark}"
  bg-positive-weak-pressed: "{colors.green-200}"
  bg-positive-weak-pressed-dark: "{colors.green-300-dark}"
  bg-warning-solid: "{colors.orange-700}"
  bg-warning-solid-dark: "{colors.orange-600-dark}"
  bg-warning-solid-pressed: "{colors.orange-800}"
  bg-warning-solid-pressed-dark: "{colors.orange-700-dark}"
  bg-warning-weak: "{colors.orange-100}"
  bg-warning-weak-dark: "{colors.orange-200-dark}"
  bg-warning-weak-pressed: "{colors.orange-200}"
  bg-warning-weak-pressed-dark: "{colors.orange-300-dark}"
  bg-informative-solid: "{colors.blue-700}"
  bg-informative-solid-dark: "{colors.blue-600-dark}"
  bg-informative-solid-pressed: "{colors.blue-800}"
  bg-informative-solid-pressed-dark: "{colors.blue-700-dark}"
  bg-informative-weak: "{colors.blue-100}"
  bg-informative-weak-dark: "{colors.blue-200-dark}"
  bg-informative-weak-pressed: "{colors.blue-200}"
  bg-informative-weak-pressed-dark: "{colors.blue-300-dark}"
  # 선 (stroke)
  stroke-neutral-subtle: "{colors.gray-300}"
  stroke-neutral-subtle-dark: "{colors.gray-300-dark}"
  stroke-neutral-weak: "{colors.gray-400}"
  stroke-neutral-weak-dark: "{colors.gray-400-dark}"
  stroke-neutral-solid: "{colors.gray-600}"
  stroke-neutral-solid-dark: "{colors.gray-600-dark}"
  # v113 — 고른 선택 상자(Select Box)의 짙은 테두리(SEED stroke.neutral-contrast = gray-1000)
  stroke-neutral-contrast: "{colors.gray-1000}"
  stroke-neutral-contrast-dark: "{colors.gray-1000-dark}"
  stroke-critical-solid: "{colors.red-700}"
  stroke-critical-solid-dark: "{colors.red-800-dark}"
  stroke-positive-solid: "{colors.green-700}"
  stroke-positive-solid-dark: "{colors.green-800-dark}"
  stroke-warning-solid: "{colors.orange-700}"
  stroke-warning-solid-dark: "{colors.orange-800-dark}"
  stroke-informative-solid: "{colors.blue-700}"
  stroke-informative-solid-dark: "{colors.blue-800-dark}"
  # @sync:shared-end (colors-3)
  
  # (border-focus 정의 완료 — v16)

typography:
  # v100 — SEED 타입 스케일(2026-09-29). 크기 t1~t14 와 줄 높이는 SEED 와 같은 px, 굵기는 400 —
  # 강조는 500 · 700 인라인 modifier(SEED t5Medium · t5Bold). 긴 글은 article-body · article-note.
  t1:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 15px
  t2:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
  t3:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 18px
  t4:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 19px
  t5:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 22px
  t6:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 24px
  t7:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 27px
  t8:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 30px
  t9:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 32px
  t10:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 26px
    fontWeight: 400
    lineHeight: 35px
  t11:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 38px
  t12:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 32px
    fontWeight: 400
    lineHeight: 42px
  t13:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 40px
    fontWeight: 400
    lineHeight: 52px
  t14:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 48px
    fontWeight: 400
    lineHeight: 60px
  screen-title:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 26px
    fontWeight: 700
    lineHeight: 35px
  article-body:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  article-note:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22px
  # 옛 15단계(v82) — 컴포넌트가 새 스케일로 옮기는 동안 값 그대로 둔다(본문 15px 은 자리마다 14 · 16 으로).
  # v82 — Airbnb 태그명(display/title/body/label/caption/badge/overline) 채택,
  # 사양은 한국어 본문 가독성 우선(Pretendard, lh 본문 1.5+). 21 → 15.
  display-xl:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -1.12px
  display-lg:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.4px
  display-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.32px
  display-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.3
  title-lg:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.4
  title-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
  title-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
  body-lg:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  label-sm:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  badge:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.2
  overline:
    fontFamily: "Pretendard, Inter, sans-serif"
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.8px

rounded:
  # v99 — SEED radius 스케일(2px ~ 24px 10단계 + full). 이름도 SEED 와 같다(r1 = 4px).
  r0_5: 2px
  r1: 4px
  r1_5: 6px
  r2: 8px
  r2_5: 10px
  r3: 12px
  r3_5: 14px
  r4: 16px
  r5: 20px
  r6: 24px
  full: 9999px
  # 옛 이름 — 옮기는 동안의 별칭(값은 위 SEED 이름과 같다). 스펙 · 제품이 다 옮기면 걷는다.
  xs: 2px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 20px

spacing:
  # v98 — SEED dimension 스케일(2px 단위 19단계). 이름도 SEED 와 같다(x1 = 4px).
  x0_5: "2px"
  x1: "4px"
  x1_5: "6px"
  x2: "8px"
  x2_5: "10px"
  x3: "12px"
  x3_5: "14px"
  x4: "16px"
  x4_5: "18px"
  x5: "20px"
  x6: "24px"
  x7: "28px"
  x8: "32px"
  x9: "36px"
  x10: "40px"
  x12: "48px"
  x13: "52px"
  x14: "56px"
  x16: "64px"
  # 옛 이름 — 옮기는 동안의 별칭(값은 위 SEED 이름과 같다). 스펙 · 제품이 다 옮기면 걷는다.
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  # v101 — SEED 역할 간격(SEED spacing-x · spacing-y). 값은 위 스케일을 가리킨다.
  global-gutter: "24px"  # x6 — SEED 는 x4(16px). porest 는 앱 규칙(2026-09-14, 본문 24)을 둔다
  between-chips: "8px"  # x2
  component-default: "12px"  # x3
  between-text: "6px"  # x1_5
  nav-to-title: "20px"  # x5
  screen-bottom: "56px"  # x14

components:
  # === Primary 버튼 (HR primary 채움 + 흰 텍스트) ===
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-accent}"
  
  # === Outlined 버튼 (어두운 표면 위 primary-light 텍스트) ===
  button-outline-on-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.primary-light}"
  
  # === 카드 (surface 위 primary 텍스트) ===
  card-light:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.text-primary}"
  card-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.text-primary-dark}"
  
  # === 페이지 본문 (bg-page 위 primary 텍스트) ===
  page-text-light:
    backgroundColor: "{colors.bg-page}"
    textColor: "{colors.text-primary}"
  page-text-dark:
    backgroundColor: "{colors.bg-page-dark}"
    textColor: "{colors.text-primary-dark}"
  
  # === 입력 필드 (surface-input 위 primary 텍스트) ===
  input-light:
    backgroundColor: "{colors.surface-input}"
    textColor: "{colors.text-primary}"
  input-dark:
    backgroundColor: "{colors.surface-input-dark}"
    textColor: "{colors.text-primary-dark}"
  
  # === 캡션·메타 (secondary 텍스트, surface 위) ===
  caption-on-card-light:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.text-secondary}"
  caption-on-card-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.text-secondary-dark}"
  
  # === Divider / Outline (border 토큰을 1px 시각 요소의 배경색으로 사용) ===
  # NOTE: 이 컴포넌트들은 textColor 없음 — lint contrast 룰은 미발동.
  # border vs 인접 surface 대비는 spec에 borderColor 프로퍼티가 없어 자동 검증 불가.
  divider-light:
    backgroundColor: "{colors.border-default}"
  divider-dark:
    backgroundColor: "{colors.border-default-dark}"
  outline-strong-light:
    backgroundColor: "{colors.border-strong}"
  outline-strong-dark:
    backgroundColor: "{colors.border-strong-dark}"
  
  # === Focus ring (1px outline, sparse — primary 토큰이 contrast 검증 담당) ===
  focus-ring-on-light:
    backgroundColor: "{colors.border-focus}"
  focus-ring-on-dark:
    backgroundColor: "{colors.border-focus-light}"
  
  # === Semantic 채움 badge (semantic 배경 + 흰 텍스트) ===
  badge-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.text-on-accent}"
  badge-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.text-on-accent}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.text-on-accent}"
  badge-info:
    backgroundColor: "{colors.info}"
    textColor: "{colors.text-on-accent}"
  
  # === Semantic 인라인 텍스트 (흰 카드 위 semantic 텍스트) ===
  alert-text-success:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.success}"
  alert-text-error:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.error}"
  alert-text-warning:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.warning}"
  alert-text-info:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.info}"
  
  # === Semantic 다크 표면 위 인라인 텍스트 (-light 변형) ===
  alert-text-success-on-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.success-light}"
  alert-text-error-on-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.error-light}"
  alert-text-warning-on-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.warning-light}"
  alert-text-info-on-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.info-light}"
  
  # === User identification (v58: avatar — chart palette categorical) ===
  avatar:
    backgroundColor: "{colors.chart-blue}"
    textColor: "{colors.text-on-accent}"
  
  # === Chart elements (sparse, fill/stroke 용도 — chart 요소는 textColor 페어가 아님) ===
  chart-color-red:
    backgroundColor: "{colors.chart-red}"
  chart-color-orange:
    backgroundColor: "{colors.chart-orange}"
  chart-color-yellow:
    backgroundColor: "{colors.chart-yellow}"
  chart-color-green:
    backgroundColor: "{colors.chart-green}"
  chart-color-blue:
    backgroundColor: "{colors.chart-blue}"
  chart-color-indigo:
    backgroundColor: "{colors.chart-indigo}"
  chart-color-violet:
    backgroundColor: "{colors.chart-violet}"
  chart-color-pink:
    backgroundColor: "{colors.chart-pink}"
  chart-color-brown:
    backgroundColor: "{colors.chart-brown}"
  chart-color-gray:
    backgroundColor: "{colors.chart-gray}"
  # chart dark 변형 컴포넌트 (어두운 표면 위)
  chart-color-red-on-dark:
    backgroundColor: "{colors.chart-red-dark}"
  chart-color-orange-on-dark:
    backgroundColor: "{colors.chart-orange-dark}"
  chart-color-yellow-on-dark:
    backgroundColor: "{colors.chart-yellow-dark}"
  chart-color-green-on-dark:
    backgroundColor: "{colors.chart-green-dark}"
  chart-color-blue-on-dark:
    backgroundColor: "{colors.chart-blue-dark}"
  chart-color-indigo-on-dark:
    backgroundColor: "{colors.chart-indigo-dark}"
  chart-color-violet-on-dark:
    backgroundColor: "{colors.chart-violet-dark}"
  chart-color-pink-on-dark:
    backgroundColor: "{colors.chart-pink-dark}"
  chart-color-brown-on-dark:
    backgroundColor: "{colors.chart-brown-dark}"
  chart-color-gray-on-dark:
    backgroundColor: "{colors.chart-gray-dark}"
  # v111 — 옅은 바탕 위 글자 대비(lint 가 잰다)
  chart-red-contrast-on-weak-light:
    backgroundColor: "{colors.chart-red-weak}"
    textColor: "{colors.chart-red-contrast}"
  chart-red-contrast-on-weak-dark:
    backgroundColor: "{colors.chart-red-weak-dark}"
    textColor: "{colors.chart-red-contrast-dark}"
  chart-red-contrast-on-subtle-light:
    backgroundColor: "{colors.chart-red-subtle}"
    textColor: "{colors.chart-red-contrast}"
  chart-red-contrast-on-subtle-dark:
    backgroundColor: "{colors.chart-red-subtle-dark}"
    textColor: "{colors.chart-red-contrast-dark}"
  chart-orange-contrast-on-weak-light:
    backgroundColor: "{colors.chart-orange-weak}"
    textColor: "{colors.chart-orange-contrast}"
  chart-orange-contrast-on-weak-dark:
    backgroundColor: "{colors.chart-orange-weak-dark}"
    textColor: "{colors.chart-orange-contrast-dark}"
  chart-orange-contrast-on-subtle-light:
    backgroundColor: "{colors.chart-orange-subtle}"
    textColor: "{colors.chart-orange-contrast}"
  chart-orange-contrast-on-subtle-dark:
    backgroundColor: "{colors.chart-orange-subtle-dark}"
    textColor: "{colors.chart-orange-contrast-dark}"
  chart-yellow-contrast-on-weak-light:
    backgroundColor: "{colors.chart-yellow-weak}"
    textColor: "{colors.chart-yellow-contrast}"
  chart-yellow-contrast-on-weak-dark:
    backgroundColor: "{colors.chart-yellow-weak-dark}"
    textColor: "{colors.chart-yellow-contrast-dark}"
  chart-yellow-contrast-on-subtle-light:
    backgroundColor: "{colors.chart-yellow-subtle}"
    textColor: "{colors.chart-yellow-contrast}"
  chart-yellow-contrast-on-subtle-dark:
    backgroundColor: "{colors.chart-yellow-subtle-dark}"
    textColor: "{colors.chart-yellow-contrast-dark}"
  chart-green-contrast-on-weak-light:
    backgroundColor: "{colors.chart-green-weak}"
    textColor: "{colors.chart-green-contrast}"
  chart-green-contrast-on-weak-dark:
    backgroundColor: "{colors.chart-green-weak-dark}"
    textColor: "{colors.chart-green-contrast-dark}"
  chart-green-contrast-on-subtle-light:
    backgroundColor: "{colors.chart-green-subtle}"
    textColor: "{colors.chart-green-contrast}"
  chart-green-contrast-on-subtle-dark:
    backgroundColor: "{colors.chart-green-subtle-dark}"
    textColor: "{colors.chart-green-contrast-dark}"
  chart-blue-contrast-on-weak-light:
    backgroundColor: "{colors.chart-blue-weak}"
    textColor: "{colors.chart-blue-contrast}"
  chart-blue-contrast-on-weak-dark:
    backgroundColor: "{colors.chart-blue-weak-dark}"
    textColor: "{colors.chart-blue-contrast-dark}"
  chart-blue-contrast-on-subtle-light:
    backgroundColor: "{colors.chart-blue-subtle}"
    textColor: "{colors.chart-blue-contrast}"
  chart-blue-contrast-on-subtle-dark:
    backgroundColor: "{colors.chart-blue-subtle-dark}"
    textColor: "{colors.chart-blue-contrast-dark}"
  chart-indigo-contrast-on-weak-light:
    backgroundColor: "{colors.chart-indigo-weak}"
    textColor: "{colors.chart-indigo-contrast}"
  chart-indigo-contrast-on-weak-dark:
    backgroundColor: "{colors.chart-indigo-weak-dark}"
    textColor: "{colors.chart-indigo-contrast-dark}"
  chart-indigo-contrast-on-subtle-light:
    backgroundColor: "{colors.chart-indigo-subtle}"
    textColor: "{colors.chart-indigo-contrast}"
  chart-indigo-contrast-on-subtle-dark:
    backgroundColor: "{colors.chart-indigo-subtle-dark}"
    textColor: "{colors.chart-indigo-contrast-dark}"
  chart-violet-contrast-on-weak-light:
    backgroundColor: "{colors.chart-violet-weak}"
    textColor: "{colors.chart-violet-contrast}"
  chart-violet-contrast-on-weak-dark:
    backgroundColor: "{colors.chart-violet-weak-dark}"
    textColor: "{colors.chart-violet-contrast-dark}"
  chart-violet-contrast-on-subtle-light:
    backgroundColor: "{colors.chart-violet-subtle}"
    textColor: "{colors.chart-violet-contrast}"
  chart-violet-contrast-on-subtle-dark:
    backgroundColor: "{colors.chart-violet-subtle-dark}"
    textColor: "{colors.chart-violet-contrast-dark}"
  chart-pink-contrast-on-weak-light:
    backgroundColor: "{colors.chart-pink-weak}"
    textColor: "{colors.chart-pink-contrast}"
  chart-pink-contrast-on-weak-dark:
    backgroundColor: "{colors.chart-pink-weak-dark}"
    textColor: "{colors.chart-pink-contrast-dark}"
  chart-pink-contrast-on-subtle-light:
    backgroundColor: "{colors.chart-pink-subtle}"
    textColor: "{colors.chart-pink-contrast}"
  chart-pink-contrast-on-subtle-dark:
    backgroundColor: "{colors.chart-pink-subtle-dark}"
    textColor: "{colors.chart-pink-contrast-dark}"
  chart-brown-contrast-on-weak-light:
    backgroundColor: "{colors.chart-brown-weak}"
    textColor: "{colors.chart-brown-contrast}"
  chart-brown-contrast-on-weak-dark:
    backgroundColor: "{colors.chart-brown-weak-dark}"
    textColor: "{colors.chart-brown-contrast-dark}"
  chart-brown-contrast-on-subtle-light:
    backgroundColor: "{colors.chart-brown-subtle}"
    textColor: "{colors.chart-brown-contrast}"
  chart-brown-contrast-on-subtle-dark:
    backgroundColor: "{colors.chart-brown-subtle-dark}"
    textColor: "{colors.chart-brown-contrast-dark}"
  chart-gray-contrast-on-weak-light:
    backgroundColor: "{colors.chart-gray-weak}"
    textColor: "{colors.chart-gray-contrast}"
  chart-gray-contrast-on-weak-dark:
    backgroundColor: "{colors.chart-gray-weak-dark}"
    textColor: "{colors.chart-gray-contrast-dark}"
  chart-gray-contrast-on-subtle-light:
    backgroundColor: "{colors.chart-gray-subtle}"
    textColor: "{colors.chart-gray-contrast}"
  chart-gray-contrast-on-subtle-dark:
    backgroundColor: "{colors.chart-gray-subtle-dark}"
    textColor: "{colors.chart-gray-contrast-dark}"
  
  # === Tertiary 텍스트 (placeholder, caption-tertiary, hint) ===
  caption-tertiary-on-card-light:
    backgroundColor: "{colors.surface-default}"
    textColor: "{colors.text-tertiary}"
  caption-tertiary-on-card-dark:
    backgroundColor: "{colors.surface-default-dark}"
    textColor: "{colors.text-tertiary-dark}"
  placeholder-on-input-light:
    backgroundColor: "{colors.surface-input}"
    textColor: "{colors.text-tertiary}"
  placeholder-on-input-dark:
    backgroundColor: "{colors.surface-input-dark}"
    textColor: "{colors.text-tertiary-dark}"
  
  # === Disabled 텍스트 (textColor만 — WCAG 1.4.3 incidental 예외 인정, lint contrast 룰 비대상) ===
  # textColor만 가진 sparse 컴포넌트는 contrastCheck 미발동. 부모 표면 색은 런타임 상속.
  disabled-label-light:
    textColor: "{colors.text-disabled}"
  disabled-label-dark:
    textColor: "{colors.text-disabled-dark}"
  
  # === v102 — 역할 색 짝 (SEED 역할 — 글자가 놓이는 배경과 함께). 짝마다 대비를 lint 가 잰다(라이트 · 다크) ===
  role-neutral-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-neutral}"
  role-neutral-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-neutral-dark}"
  role-neutral-muted-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-neutral-muted}"
  role-neutral-muted-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-neutral-muted-dark}"
  role-neutral-subtle-on-basement-light:
    backgroundColor: "{colors.bg-layer-basement}"
    textColor: "{colors.fg-neutral-subtle}"
  role-neutral-subtle-on-basement-dark:
    backgroundColor: "{colors.bg-layer-basement-dark}"
    textColor: "{colors.fg-neutral-subtle-dark}"
  role-placeholder-on-neutral-weak-light:
    backgroundColor: "{colors.bg-neutral-weak}"
    textColor: "{colors.fg-placeholder}"
  role-placeholder-on-neutral-weak-dark:
    backgroundColor: "{colors.bg-neutral-weak-dark}"
    textColor: "{colors.fg-placeholder-dark}"
  role-neutral-on-default-pressed-light:
    backgroundColor: "{colors.bg-layer-default-pressed}"
    textColor: "{colors.fg-neutral}"
  role-neutral-on-default-pressed-dark:
    backgroundColor: "{colors.bg-layer-default-pressed-dark}"
    textColor: "{colors.fg-neutral-dark}"
  role-neutral-on-floating-light:
    backgroundColor: "{colors.bg-layer-floating}"
    textColor: "{colors.fg-neutral}"
  role-neutral-on-floating-dark:
    backgroundColor: "{colors.bg-layer-floating-dark}"
    textColor: "{colors.fg-neutral-dark}"
  role-neutral-on-floating-pressed-light:
    backgroundColor: "{colors.bg-layer-floating-pressed}"
    textColor: "{colors.fg-neutral}"
  role-neutral-on-floating-pressed-dark:
    backgroundColor: "{colors.bg-layer-floating-pressed-dark}"
    textColor: "{colors.fg-neutral-dark}"
  role-neutral-on-weak-pressed-light:
    backgroundColor: "{colors.bg-neutral-weak-pressed}"
    textColor: "{colors.fg-neutral}"
  role-neutral-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-neutral-weak-pressed-dark}"
    textColor: "{colors.fg-neutral-dark}"
  role-inverted-light:
    backgroundColor: "{colors.bg-neutral-inverted}"
    textColor: "{colors.fg-neutral-inverted}"
  role-inverted-dark:
    backgroundColor: "{colors.bg-neutral-inverted-dark}"
    textColor: "{colors.fg-neutral-inverted-dark}"
  role-inverted-pressed-light:
    backgroundColor: "{colors.bg-neutral-inverted-pressed}"
    textColor: "{colors.fg-neutral-inverted}"
  role-inverted-pressed-dark:
    backgroundColor: "{colors.bg-neutral-inverted-pressed-dark}"
    textColor: "{colors.fg-neutral-inverted-dark}"
  role-critical-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-critical}"
  role-critical-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-critical-dark}"
  role-on-critical-solid-light:
    backgroundColor: "{colors.bg-critical-solid}"
    textColor: "{colors.static-white}"
  role-on-critical-solid-dark:
    backgroundColor: "{colors.bg-critical-solid-dark}"
    textColor: "{colors.static-white}"
  role-on-critical-solid-pressed-light:
    backgroundColor: "{colors.bg-critical-solid-pressed}"
    textColor: "{colors.static-white}"
  role-on-critical-solid-pressed-dark:
    backgroundColor: "{colors.bg-critical-solid-pressed-dark}"
    textColor: "{colors.static-white}"
  role-critical-contrast-on-weak-light:
    backgroundColor: "{colors.bg-critical-weak}"
    textColor: "{colors.fg-critical-contrast}"
  role-critical-contrast-on-weak-dark:
    backgroundColor: "{colors.bg-critical-weak-dark}"
    textColor: "{colors.fg-critical-contrast-dark}"
  role-critical-contrast-on-weak-pressed-light:
    backgroundColor: "{colors.bg-critical-weak-pressed}"
    textColor: "{colors.fg-critical-contrast}"
  role-critical-contrast-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-critical-weak-pressed-dark}"
    textColor: "{colors.fg-critical-contrast-dark}"
  role-positive-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-positive}"
  role-positive-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-positive-dark}"
  role-on-positive-solid-light:
    backgroundColor: "{colors.bg-positive-solid}"
    textColor: "{colors.static-white}"
  role-on-positive-solid-dark:
    backgroundColor: "{colors.bg-positive-solid-dark}"
    textColor: "{colors.static-white}"
  role-on-positive-solid-pressed-light:
    backgroundColor: "{colors.bg-positive-solid-pressed}"
    textColor: "{colors.static-white}"
  role-on-positive-solid-pressed-dark:
    backgroundColor: "{colors.bg-positive-solid-pressed-dark}"
    textColor: "{colors.static-white}"
  role-positive-contrast-on-weak-light:
    backgroundColor: "{colors.bg-positive-weak}"
    textColor: "{colors.fg-positive-contrast}"
  role-positive-contrast-on-weak-dark:
    backgroundColor: "{colors.bg-positive-weak-dark}"
    textColor: "{colors.fg-positive-contrast-dark}"
  role-positive-contrast-on-weak-pressed-light:
    backgroundColor: "{colors.bg-positive-weak-pressed}"
    textColor: "{colors.fg-positive-contrast}"
  role-positive-contrast-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-positive-weak-pressed-dark}"
    textColor: "{colors.fg-positive-contrast-dark}"
  role-warning-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-warning}"
  role-warning-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-warning-dark}"
  role-on-warning-solid-light:
    backgroundColor: "{colors.bg-warning-solid}"
    textColor: "{colors.static-white}"
  role-on-warning-solid-dark:
    backgroundColor: "{colors.bg-warning-solid-dark}"
    textColor: "{colors.static-white}"
  role-on-warning-solid-pressed-light:
    backgroundColor: "{colors.bg-warning-solid-pressed}"
    textColor: "{colors.static-white}"
  role-on-warning-solid-pressed-dark:
    backgroundColor: "{colors.bg-warning-solid-pressed-dark}"
    textColor: "{colors.static-white}"
  role-warning-contrast-on-weak-light:
    backgroundColor: "{colors.bg-warning-weak}"
    textColor: "{colors.fg-warning-contrast}"
  role-warning-contrast-on-weak-dark:
    backgroundColor: "{colors.bg-warning-weak-dark}"
    textColor: "{colors.fg-warning-contrast-dark}"
  role-warning-contrast-on-weak-pressed-light:
    backgroundColor: "{colors.bg-warning-weak-pressed}"
    textColor: "{colors.fg-warning-contrast}"
  role-warning-contrast-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-warning-weak-pressed-dark}"
    textColor: "{colors.fg-warning-contrast-dark}"
  role-informative-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-informative}"
  role-informative-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-informative-dark}"
  role-on-informative-solid-light:
    backgroundColor: "{colors.bg-informative-solid}"
    textColor: "{colors.static-white}"
  role-on-informative-solid-dark:
    backgroundColor: "{colors.bg-informative-solid-dark}"
    textColor: "{colors.static-white}"
  role-on-informative-solid-pressed-light:
    backgroundColor: "{colors.bg-informative-solid-pressed}"
    textColor: "{colors.static-white}"
  role-on-informative-solid-pressed-dark:
    backgroundColor: "{colors.bg-informative-solid-pressed-dark}"
    textColor: "{colors.static-white}"
  role-informative-contrast-on-weak-light:
    backgroundColor: "{colors.bg-informative-weak}"
    textColor: "{colors.fg-informative-contrast}"
  role-informative-contrast-on-weak-dark:
    backgroundColor: "{colors.bg-informative-weak-dark}"
    textColor: "{colors.fg-informative-contrast-dark}"
  role-informative-contrast-on-weak-pressed-light:
    backgroundColor: "{colors.bg-informative-weak-pressed}"
    textColor: "{colors.fg-informative-contrast}"
  role-informative-contrast-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-informative-weak-pressed-dark}"
    textColor: "{colors.fg-informative-contrast-dark}"
  role-disabled-surface-light:
    backgroundColor: "{colors.bg-disabled}"
  role-disabled-surface-dark:
    backgroundColor: "{colors.bg-disabled-dark}"
  role-disabled-label-light:
    textColor: "{colors.fg-disabled}"
  role-disabled-label-dark:
    textColor: "{colors.fg-disabled-dark}"
  role-stroke-neutral-subtle-light:
    backgroundColor: "{colors.stroke-neutral-subtle}"
  role-stroke-neutral-subtle-dark:
    backgroundColor: "{colors.stroke-neutral-subtle-dark}"
  role-stroke-neutral-weak-light:
    backgroundColor: "{colors.stroke-neutral-weak}"
  role-stroke-neutral-weak-dark:
    backgroundColor: "{colors.stroke-neutral-weak-dark}"
  role-stroke-neutral-solid-light:
    backgroundColor: "{colors.stroke-neutral-solid}"
  role-stroke-neutral-solid-dark:
    backgroundColor: "{colors.stroke-neutral-solid-dark}"
  role-stroke-neutral-contrast-light:
    backgroundColor: "{colors.stroke-neutral-contrast}"
  role-stroke-neutral-contrast-dark:
    backgroundColor: "{colors.stroke-neutral-contrast-dark}"
  role-stroke-critical-solid-light:
    backgroundColor: "{colors.stroke-critical-solid}"
  role-stroke-critical-solid-dark:
    backgroundColor: "{colors.stroke-critical-solid-dark}"
  role-stroke-positive-solid-light:
    backgroundColor: "{colors.stroke-positive-solid}"
  role-stroke-positive-solid-dark:
    backgroundColor: "{colors.stroke-positive-solid-dark}"
  role-stroke-warning-solid-light:
    backgroundColor: "{colors.stroke-warning-solid}"
  role-stroke-warning-solid-dark:
    backgroundColor: "{colors.stroke-warning-solid-dark}"
  role-stroke-informative-solid-light:
    backgroundColor: "{colors.stroke-informative-solid}"
  role-stroke-informative-solid-dark:
    backgroundColor: "{colors.stroke-informative-solid-dark}"
  
  # === v102 — 브랜드 역할 색 짝. 짝마다 대비를 lint 가 잰다(라이트 · 다크) ===
  role-brand-on-layer-light:
    backgroundColor: "{colors.bg-layer-default}"
    textColor: "{colors.fg-brand}"
  role-brand-on-layer-dark:
    backgroundColor: "{colors.bg-layer-default-dark}"
    textColor: "{colors.fg-brand-dark}"
  role-on-brand-solid-light:
    backgroundColor: "{colors.bg-brand-solid}"
    textColor: "{colors.static-white}"
  role-on-brand-solid-dark:
    backgroundColor: "{colors.bg-brand-solid-dark}"
    textColor: "{colors.static-white}"
  role-on-brand-solid-pressed-light:
    backgroundColor: "{colors.bg-brand-solid-pressed}"
    textColor: "{colors.static-white}"
  role-on-brand-solid-pressed-dark:
    backgroundColor: "{colors.bg-brand-solid-pressed-dark}"
    textColor: "{colors.static-white}"
  role-brand-contrast-on-weak-light:
    backgroundColor: "{colors.bg-brand-weak}"
    textColor: "{colors.fg-brand-contrast}"
  role-brand-contrast-on-weak-dark:
    backgroundColor: "{colors.bg-brand-weak-dark}"
    textColor: "{colors.fg-brand-contrast-dark}"
  role-brand-contrast-on-weak-pressed-light:
    backgroundColor: "{colors.bg-brand-weak-pressed}"
    textColor: "{colors.fg-brand-contrast}"
  role-brand-contrast-on-weak-pressed-dark:
    backgroundColor: "{colors.bg-brand-weak-pressed-dark}"
    textColor: "{colors.fg-brand-contrast-dark}"
  role-stroke-focus-ring-light:
    backgroundColor: "{colors.stroke-focus-ring}"
  role-stroke-focus-ring-dark:
    backgroundColor: "{colors.stroke-focus-ring-dark}"
  role-stroke-brand-solid-light:
    backgroundColor: "{colors.stroke-brand-solid}"
  role-stroke-brand-solid-dark:
    backgroundColor: "{colors.stroke-brand-solid-dark}"
  role-stroke-brand-weak-light:
    backgroundColor: "{colors.stroke-brand-weak}"
  role-stroke-brand-weak-dark:
    backgroundColor: "{colors.stroke-brand-weak-dark}"
  # === v108 — 팔레트 보기용. 역할이 쓰지 않는 단계도 검사기가 "쓰는 색" 으로 세게 한다 ===
  palette-gray-00:
    backgroundColor: "{colors.gray-00}"
  palette-gray-00-dark:
    backgroundColor: "{colors.gray-00-dark}"
  palette-gray-100:
    backgroundColor: "{colors.gray-100}"
  palette-gray-100-dark:
    backgroundColor: "{colors.gray-100-dark}"
  palette-gray-200:
    backgroundColor: "{colors.gray-200}"
  palette-gray-200-dark:
    backgroundColor: "{colors.gray-200-dark}"
  palette-gray-300:
    backgroundColor: "{colors.gray-300}"
  palette-gray-300-dark:
    backgroundColor: "{colors.gray-300-dark}"
  palette-gray-400:
    backgroundColor: "{colors.gray-400}"
  palette-gray-400-dark:
    backgroundColor: "{colors.gray-400-dark}"
  palette-gray-500:
    backgroundColor: "{colors.gray-500}"
  palette-gray-500-dark:
    backgroundColor: "{colors.gray-500-dark}"
  palette-gray-600:
    backgroundColor: "{colors.gray-600}"
  palette-gray-600-dark:
    backgroundColor: "{colors.gray-600-dark}"
  palette-gray-700:
    backgroundColor: "{colors.gray-700}"
  palette-gray-700-dark:
    backgroundColor: "{colors.gray-700-dark}"
  palette-gray-800:
    backgroundColor: "{colors.gray-800}"
  palette-gray-800-dark:
    backgroundColor: "{colors.gray-800-dark}"
  palette-gray-900:
    backgroundColor: "{colors.gray-900}"
  palette-gray-900-dark:
    backgroundColor: "{colors.gray-900-dark}"
  palette-gray-1000:
    backgroundColor: "{colors.gray-1000}"
  palette-gray-1000-dark:
    backgroundColor: "{colors.gray-1000-dark}"
  palette-red-100:
    backgroundColor: "{colors.red-100}"
  palette-red-100-dark:
    backgroundColor: "{colors.red-100-dark}"
  palette-red-200:
    backgroundColor: "{colors.red-200}"
  palette-red-200-dark:
    backgroundColor: "{colors.red-200-dark}"
  palette-red-300:
    backgroundColor: "{colors.red-300}"
  palette-red-300-dark:
    backgroundColor: "{colors.red-300-dark}"
  palette-red-400:
    backgroundColor: "{colors.red-400}"
  palette-red-400-dark:
    backgroundColor: "{colors.red-400-dark}"
  palette-red-500:
    backgroundColor: "{colors.red-500}"
  palette-red-500-dark:
    backgroundColor: "{colors.red-500-dark}"
  palette-red-600:
    backgroundColor: "{colors.red-600}"
  palette-red-600-dark:
    backgroundColor: "{colors.red-600-dark}"
  palette-red-700:
    backgroundColor: "{colors.red-700}"
  palette-red-700-dark:
    backgroundColor: "{colors.red-700-dark}"
  palette-red-800:
    backgroundColor: "{colors.red-800}"
  palette-red-800-dark:
    backgroundColor: "{colors.red-800-dark}"
  palette-red-900:
    backgroundColor: "{colors.red-900}"
  palette-red-900-dark:
    backgroundColor: "{colors.red-900-dark}"
  palette-red-1000:
    backgroundColor: "{colors.red-1000}"
  palette-red-1000-dark:
    backgroundColor: "{colors.red-1000-dark}"
  palette-green-100:
    backgroundColor: "{colors.green-100}"
  palette-green-100-dark:
    backgroundColor: "{colors.green-100-dark}"
  palette-green-200:
    backgroundColor: "{colors.green-200}"
  palette-green-200-dark:
    backgroundColor: "{colors.green-200-dark}"
  palette-green-300:
    backgroundColor: "{colors.green-300}"
  palette-green-300-dark:
    backgroundColor: "{colors.green-300-dark}"
  palette-green-400:
    backgroundColor: "{colors.green-400}"
  palette-green-400-dark:
    backgroundColor: "{colors.green-400-dark}"
  palette-green-500:
    backgroundColor: "{colors.green-500}"
  palette-green-500-dark:
    backgroundColor: "{colors.green-500-dark}"
  palette-green-600:
    backgroundColor: "{colors.green-600}"
  palette-green-600-dark:
    backgroundColor: "{colors.green-600-dark}"
  palette-green-700:
    backgroundColor: "{colors.green-700}"
  palette-green-700-dark:
    backgroundColor: "{colors.green-700-dark}"
  palette-green-800:
    backgroundColor: "{colors.green-800}"
  palette-green-800-dark:
    backgroundColor: "{colors.green-800-dark}"
  palette-green-900:
    backgroundColor: "{colors.green-900}"
  palette-green-900-dark:
    backgroundColor: "{colors.green-900-dark}"
  palette-green-1000:
    backgroundColor: "{colors.green-1000}"
  palette-green-1000-dark:
    backgroundColor: "{colors.green-1000-dark}"
  palette-orange-100:
    backgroundColor: "{colors.orange-100}"
  palette-orange-100-dark:
    backgroundColor: "{colors.orange-100-dark}"
  palette-orange-200:
    backgroundColor: "{colors.orange-200}"
  palette-orange-200-dark:
    backgroundColor: "{colors.orange-200-dark}"
  palette-orange-300:
    backgroundColor: "{colors.orange-300}"
  palette-orange-300-dark:
    backgroundColor: "{colors.orange-300-dark}"
  palette-orange-400:
    backgroundColor: "{colors.orange-400}"
  palette-orange-400-dark:
    backgroundColor: "{colors.orange-400-dark}"
  palette-orange-500:
    backgroundColor: "{colors.orange-500}"
  palette-orange-500-dark:
    backgroundColor: "{colors.orange-500-dark}"
  palette-orange-600:
    backgroundColor: "{colors.orange-600}"
  palette-orange-600-dark:
    backgroundColor: "{colors.orange-600-dark}"
  palette-orange-700:
    backgroundColor: "{colors.orange-700}"
  palette-orange-700-dark:
    backgroundColor: "{colors.orange-700-dark}"
  palette-orange-800:
    backgroundColor: "{colors.orange-800}"
  palette-orange-800-dark:
    backgroundColor: "{colors.orange-800-dark}"
  palette-orange-900:
    backgroundColor: "{colors.orange-900}"
  palette-orange-900-dark:
    backgroundColor: "{colors.orange-900-dark}"
  palette-orange-1000:
    backgroundColor: "{colors.orange-1000}"
  palette-orange-1000-dark:
    backgroundColor: "{colors.orange-1000-dark}"
  palette-blue-100:
    backgroundColor: "{colors.blue-100}"
  palette-blue-100-dark:
    backgroundColor: "{colors.blue-100-dark}"
  palette-blue-200:
    backgroundColor: "{colors.blue-200}"
  palette-blue-200-dark:
    backgroundColor: "{colors.blue-200-dark}"
  palette-blue-300:
    backgroundColor: "{colors.blue-300}"
  palette-blue-300-dark:
    backgroundColor: "{colors.blue-300-dark}"
  palette-blue-400:
    backgroundColor: "{colors.blue-400}"
  palette-blue-400-dark:
    backgroundColor: "{colors.blue-400-dark}"
  palette-blue-500:
    backgroundColor: "{colors.blue-500}"
  palette-blue-500-dark:
    backgroundColor: "{colors.blue-500-dark}"
  palette-blue-600:
    backgroundColor: "{colors.blue-600}"
  palette-blue-600-dark:
    backgroundColor: "{colors.blue-600-dark}"
  palette-blue-700:
    backgroundColor: "{colors.blue-700}"
  palette-blue-700-dark:
    backgroundColor: "{colors.blue-700-dark}"
  palette-blue-800:
    backgroundColor: "{colors.blue-800}"
  palette-blue-800-dark:
    backgroundColor: "{colors.blue-800-dark}"
  palette-blue-900:
    backgroundColor: "{colors.blue-900}"
  palette-blue-900-dark:
    backgroundColor: "{colors.blue-900-dark}"
  palette-blue-1000:
    backgroundColor: "{colors.blue-1000}"
  palette-blue-1000-dark:
    backgroundColor: "{colors.blue-1000-dark}"
  palette-yellow-100:
    backgroundColor: "{colors.yellow-100}"
  palette-yellow-100-dark:
    backgroundColor: "{colors.yellow-100-dark}"
  palette-yellow-200:
    backgroundColor: "{colors.yellow-200}"
  palette-yellow-200-dark:
    backgroundColor: "{colors.yellow-200-dark}"
  palette-yellow-300:
    backgroundColor: "{colors.yellow-300}"
  palette-yellow-300-dark:
    backgroundColor: "{colors.yellow-300-dark}"
  palette-yellow-400:
    backgroundColor: "{colors.yellow-400}"
  palette-yellow-400-dark:
    backgroundColor: "{colors.yellow-400-dark}"
  palette-yellow-500:
    backgroundColor: "{colors.yellow-500}"
  palette-yellow-500-dark:
    backgroundColor: "{colors.yellow-500-dark}"
  palette-yellow-600:
    backgroundColor: "{colors.yellow-600}"
  palette-yellow-600-dark:
    backgroundColor: "{colors.yellow-600-dark}"
  palette-yellow-700:
    backgroundColor: "{colors.yellow-700}"
  palette-yellow-700-dark:
    backgroundColor: "{colors.yellow-700-dark}"
  palette-yellow-800:
    backgroundColor: "{colors.yellow-800}"
  palette-yellow-800-dark:
    backgroundColor: "{colors.yellow-800-dark}"
  palette-yellow-900:
    backgroundColor: "{colors.yellow-900}"
  palette-yellow-900-dark:
    backgroundColor: "{colors.yellow-900-dark}"
  palette-yellow-1000:
    backgroundColor: "{colors.yellow-1000}"
  palette-yellow-1000-dark:
    backgroundColor: "{colors.yellow-1000-dark}"
  palette-indigo-100:
    backgroundColor: "{colors.indigo-100}"
  palette-indigo-100-dark:
    backgroundColor: "{colors.indigo-100-dark}"
  palette-indigo-200:
    backgroundColor: "{colors.indigo-200}"
  palette-indigo-200-dark:
    backgroundColor: "{colors.indigo-200-dark}"
  palette-indigo-300:
    backgroundColor: "{colors.indigo-300}"
  palette-indigo-300-dark:
    backgroundColor: "{colors.indigo-300-dark}"
  palette-indigo-400:
    backgroundColor: "{colors.indigo-400}"
  palette-indigo-400-dark:
    backgroundColor: "{colors.indigo-400-dark}"
  palette-indigo-500:
    backgroundColor: "{colors.indigo-500}"
  palette-indigo-500-dark:
    backgroundColor: "{colors.indigo-500-dark}"
  palette-indigo-600:
    backgroundColor: "{colors.indigo-600}"
  palette-indigo-600-dark:
    backgroundColor: "{colors.indigo-600-dark}"
  palette-indigo-700:
    backgroundColor: "{colors.indigo-700}"
  palette-indigo-700-dark:
    backgroundColor: "{colors.indigo-700-dark}"
  palette-indigo-800:
    backgroundColor: "{colors.indigo-800}"
  palette-indigo-800-dark:
    backgroundColor: "{colors.indigo-800-dark}"
  palette-indigo-900:
    backgroundColor: "{colors.indigo-900}"
  palette-indigo-900-dark:
    backgroundColor: "{colors.indigo-900-dark}"
  palette-indigo-1000:
    backgroundColor: "{colors.indigo-1000}"
  palette-indigo-1000-dark:
    backgroundColor: "{colors.indigo-1000-dark}"
  palette-violet-100:
    backgroundColor: "{colors.violet-100}"
  palette-violet-100-dark:
    backgroundColor: "{colors.violet-100-dark}"
  palette-violet-200:
    backgroundColor: "{colors.violet-200}"
  palette-violet-200-dark:
    backgroundColor: "{colors.violet-200-dark}"
  palette-violet-300:
    backgroundColor: "{colors.violet-300}"
  palette-violet-300-dark:
    backgroundColor: "{colors.violet-300-dark}"
  palette-violet-400:
    backgroundColor: "{colors.violet-400}"
  palette-violet-400-dark:
    backgroundColor: "{colors.violet-400-dark}"
  palette-violet-500:
    backgroundColor: "{colors.violet-500}"
  palette-violet-500-dark:
    backgroundColor: "{colors.violet-500-dark}"
  palette-violet-600:
    backgroundColor: "{colors.violet-600}"
  palette-violet-600-dark:
    backgroundColor: "{colors.violet-600-dark}"
  palette-violet-700:
    backgroundColor: "{colors.violet-700}"
  palette-violet-700-dark:
    backgroundColor: "{colors.violet-700-dark}"
  palette-violet-800:
    backgroundColor: "{colors.violet-800}"
  palette-violet-800-dark:
    backgroundColor: "{colors.violet-800-dark}"
  palette-violet-900:
    backgroundColor: "{colors.violet-900}"
  palette-violet-900-dark:
    backgroundColor: "{colors.violet-900-dark}"
  palette-violet-1000:
    backgroundColor: "{colors.violet-1000}"
  palette-violet-1000-dark:
    backgroundColor: "{colors.violet-1000-dark}"
  palette-pink-100:
    backgroundColor: "{colors.pink-100}"
  palette-pink-100-dark:
    backgroundColor: "{colors.pink-100-dark}"
  palette-pink-200:
    backgroundColor: "{colors.pink-200}"
  palette-pink-200-dark:
    backgroundColor: "{colors.pink-200-dark}"
  palette-pink-300:
    backgroundColor: "{colors.pink-300}"
  palette-pink-300-dark:
    backgroundColor: "{colors.pink-300-dark}"
  palette-pink-400:
    backgroundColor: "{colors.pink-400}"
  palette-pink-400-dark:
    backgroundColor: "{colors.pink-400-dark}"
  palette-pink-500:
    backgroundColor: "{colors.pink-500}"
  palette-pink-500-dark:
    backgroundColor: "{colors.pink-500-dark}"
  palette-pink-600:
    backgroundColor: "{colors.pink-600}"
  palette-pink-600-dark:
    backgroundColor: "{colors.pink-600-dark}"
  palette-pink-700:
    backgroundColor: "{colors.pink-700}"
  palette-pink-700-dark:
    backgroundColor: "{colors.pink-700-dark}"
  palette-pink-800:
    backgroundColor: "{colors.pink-800}"
  palette-pink-800-dark:
    backgroundColor: "{colors.pink-800-dark}"
  palette-pink-900:
    backgroundColor: "{colors.pink-900}"
  palette-pink-900-dark:
    backgroundColor: "{colors.pink-900-dark}"
  palette-pink-1000:
    backgroundColor: "{colors.pink-1000}"
  palette-pink-1000-dark:
    backgroundColor: "{colors.pink-1000-dark}"
  palette-brown-100:
    backgroundColor: "{colors.brown-100}"
  palette-brown-100-dark:
    backgroundColor: "{colors.brown-100-dark}"
  palette-brown-200:
    backgroundColor: "{colors.brown-200}"
  palette-brown-200-dark:
    backgroundColor: "{colors.brown-200-dark}"
  palette-brown-300:
    backgroundColor: "{colors.brown-300}"
  palette-brown-300-dark:
    backgroundColor: "{colors.brown-300-dark}"
  palette-brown-400:
    backgroundColor: "{colors.brown-400}"
  palette-brown-400-dark:
    backgroundColor: "{colors.brown-400-dark}"
  palette-brown-500:
    backgroundColor: "{colors.brown-500}"
  palette-brown-500-dark:
    backgroundColor: "{colors.brown-500-dark}"
  palette-brown-600:
    backgroundColor: "{colors.brown-600}"
  palette-brown-600-dark:
    backgroundColor: "{colors.brown-600-dark}"
  palette-brown-700:
    backgroundColor: "{colors.brown-700}"
  palette-brown-700-dark:
    backgroundColor: "{colors.brown-700-dark}"
  palette-brown-800:
    backgroundColor: "{colors.brown-800}"
  palette-brown-800-dark:
    backgroundColor: "{colors.brown-800-dark}"
  palette-brown-900:
    backgroundColor: "{colors.brown-900}"
  palette-brown-900-dark:
    backgroundColor: "{colors.brown-900-dark}"
  palette-brown-1000:
    backgroundColor: "{colors.brown-1000}"
  palette-brown-1000-dark:
    backgroundColor: "{colors.brown-1000-dark}"
  palette-brand-100:
    backgroundColor: "{colors.brand-100}"
  palette-brand-100-dark:
    backgroundColor: "{colors.brand-100-dark}"
  palette-brand-200:
    backgroundColor: "{colors.brand-200}"
  palette-brand-200-dark:
    backgroundColor: "{colors.brand-200-dark}"
  palette-brand-300:
    backgroundColor: "{colors.brand-300}"
  palette-brand-300-dark:
    backgroundColor: "{colors.brand-300-dark}"
  palette-brand-400:
    backgroundColor: "{colors.brand-400}"
  palette-brand-400-dark:
    backgroundColor: "{colors.brand-400-dark}"
  palette-brand-500:
    backgroundColor: "{colors.brand-500}"
  palette-brand-500-dark:
    backgroundColor: "{colors.brand-500-dark}"
  palette-brand-600:
    backgroundColor: "{colors.brand-600}"
  palette-brand-600-dark:
    backgroundColor: "{colors.brand-600-dark}"
  palette-brand-700:
    backgroundColor: "{colors.brand-700}"
  palette-brand-700-dark:
    backgroundColor: "{colors.brand-700-dark}"
  palette-brand-800:
    backgroundColor: "{colors.brand-800}"
  palette-brand-800-dark:
    backgroundColor: "{colors.brand-800-dark}"
  palette-brand-900:
    backgroundColor: "{colors.brand-900}"
  palette-brand-900-dark:
    backgroundColor: "{colors.brand-900-dark}"
  palette-brand-1000:
    backgroundColor: "{colors.brand-1000}"
  palette-brand-1000-dark:
    backgroundColor: "{colors.brand-1000-dark}"
---

## Overview — Porest HR (B2B)

본 파일은 **Porest HR(B2B 조직 관리)** 단독 self-contained 디자인 시스템(v17~). 공유 baseline은 `DESIGN.md` 참조. 본 파일에서 토큰명의 `-hr` 접미사는 컨텍스트가 HR로 암묵적이라 생략 — `primary` = `#357B5F` (forest green), `button-primary` 등.

Desk(B2C 개인 생산성)는 별도 `DESIGN.desk.md` 파일 — `primary` = `#0147AD` (deep navy).

레퍼런스 — 토스의 신뢰감 있는 미니멀리즘, 전 연령 가독성.

## Colors

### v111 — 카테고리 옅은 바탕 (2026-09-30)

SEED 의 배너 색(`$color.banner.*` 10색)을 porest 에 둘지 보고, 같은 자리에서 쓰는 porest 의 옅은 바탕을 팔레트 단계로 정했다. 사용자가 비교 페이지(https://claude.ai/artifact/Re8MSU1eb6VKwg3wfySbHS)에서 넷을 정했다 — 배너 10색은 두지 않음 · 작은 면 200 · 다크 300 · 넓은 면은 한 단계 옅게 따로 · 글자 · 아이콘은 v109 규칙.

**아직 두 웹 · 앱에는 들어가지 않았다.**

- SEED 의 안내 메시지(Callout · Page Banner)는 배너 색이 아니라 역할 색(약한 배경 + 대비 글자)을 쓴다 — porest 에는 v102 · v109 로 있다. `$color.banner.*` 는 SEED 컴포넌트 104개 가운데 쓰는 것이 없는 장식 색이고, porest 에는 홍보 배너 자리가 없어 두지 않는다.
- 대신 차트 10색을 화면마다 따로 섞던 옅은 바탕(웹 타일 18% · 캘린더 칩 17% · 메모 카드 12 ~ 16% · 앱 13 · 22%)을 토큰으로 둔다.

| 토큰 | 라이트 | 다크 | 쓰는 곳 |
|---|---|---|---|
| chart-{hue}-weak | 200(회색 400) | 300(회색 400) | 작은 면 — 카테고리 타일 · 캘린더 칩 · 주식 나라 표시 · 태그 배지. 지금 제품과 같은 진하기(흰 바탕과 1.25:1 이상, 다크 표면과 1.38:1 이상) |
| chart-{hue}-subtle | 100(회색 300) | 200(회색 300) | 넓은 면 — 메모 카드 · 배너. 한 단계 옅다(1.12:1 · 다크 1.15:1 이상) |
| chart-{hue}-contrast | 800 | 900 | 옅은 바탕 위 글자 — 일반 차트 색보다 한 단계 바깥(v109 규칙). 두 바탕 위 모두 5.02:1 이상 |

- 아이콘은 chart-{hue} 그대로다(라이트 700 · 다크 800) — 작은 면 위 3.63:1(라이트) · 4.35:1(다크) 이상으로 UI 3:1 을 넘는다.
- 회색은 라이트 100 · 200 이 바닥색과 같아서 한 단계씩 진하게 둔다.
- 대비는 머리말 `components` 의 chart-{hue}-contrast-on-{weak,subtle}-{light,dark} 40개로 lint 가 잰다.

### v110 — 차트 10색을 팔레트에서 (2026-09-30)

v108 에서 미뤄 둔 차트 10색을 팔레트 단계로 옮긴다. 사용자가 비교 페이지(https://claude.ai/artifact/QLVzEaAuyakobiWKAwXTUu)에서 넷을 정했다 — 팔레트 가족에서 · 다크 800-dark · 배정 순서는 제품 순서 · 10개가 넘으면 상위 9 + 기타. SEED 에는 차트 전용 색이 없다(팔레트 7가족과 배너 색 10개뿐).

**아직 두 웹 · 앱에는 들어가지 않았다.**

| 자리 | 값 |
|---|---|
| 가족 | 팔레트에 yellow · indigo · violet · pink · brown 을 더했다(100 ~ 1000, 라이트 · 다크). 700 이 v21 ~ v24 차트 색 그대로이고, 나머지 단계는 v108 규칙(목표 L* · SEED 채도 비율)으로 뽑았다 |
| 라이트 | chart-{hue} = {hue}-700(회색은 gray-700). 빨강 · 주황 · 초록 · 파랑은 의미 색 가족이라 위험 · 경고 · 긍정 · 정보 채움과 같은 색이다 |
| 다크 | chart-{hue}-dark = {hue}-800-dark — 다크 의미 색 글자와 같은 단계(L* 69, 다크 표면 위 6:1). 옛 chart-{hue}-light 는 별칭으로 남기고 제품 CSS 가 옮겨 가면 지운다 |
| 순서 | 색을 고르지 않은 항목(도넛 · 순위 막대 · 주식 비중)은 blue → green → orange → violet → pink → indigo → red → yellow → brown → gray 순으로 받는다 — 제품이 쓰는 순서 |
| 넘칠 때 | 한 차트에 10개가 넘으면 상위 9개 + 회색 "기타" 로 묶는다. 회색은 기타 전용이다 |

- 바뀌는 라이트 값은 다섯이다 — 빨강 #C73838 → #D72323(ΔE 4.8) · 주황 #B36418 → #BE490D(10.0) · 초록 #2D8060 → #167F3F(8.2) · 파랑 #2C70BF → #1D6EC9(1.2) · 회색 #6B7484 → #62697A(4.3). 노랑 · 남색 · 보라 · 분홍 · 갈색은 그대로다.
- 가장 헷갈리는 짝이 멀어졌다 — 주황–갈색 ΔE 7.0(다크 8.0) → 빨강–주황 11.3(다크 9.7). 다크의 빨강 · 주황은 둘 다 산호색이라 여전히 가장 가깝다 — 차트에는 범례 · 라벨을 늘 함께 쓴다(State · Inclusive Design 의 "색만으로 알리지 않는다").
- 노랑 800-dark 는 v109 규칙대로 채도를 지금 제품(#D4B83A)만큼 올렸다(#C5A721).
- **저장된 색은 옮기지 않는다.** Desk 는 카테고리 · 태그 · 캘린더 · 라벨 · 저축 목표 · 메모의 색을 라이트 hex 로 저장하고, 웹 · 앱이 그 값으로 다크 짝을 찾는다. 앱 적용 때 저장 값은 이름표로 두고 짝 표만 "옛 hex → 새 토큰" 으로 바꾼다 — 옛 앱은 옛 색을 그대로 그려 강제 업데이트가 필요 없다. DB 값을 새 hex 로 옮기면 옛 앱이 새 값을 몰라 편집할 때 빨강으로 되돌린다.
- 아바타 이니셜은 fg-neutral-inverted 다 — 라이트는 흰색(700 위 4.55:1 이상), 다크는 어두운 글자(800-dark 위 6.07:1 이상). 다크에서 흰 글자는 2.4:1 이다.
- HR 은 porest 차트 색을 쓰지 않는다(부서 색은 shadcn chart-1 ~ 5 이름을 저장한다). HR 앱 적용 때 그 다섯 이름을 porest 차트 색에 잇는다.

### v109 — v108 색 점검 반영 (2026-09-30)

v108 로 크게 바뀐 색을 지금 제품 값(Desk 웹 `porest-tokens.css` · 앱 `colors.dart` 가 복사해 쓰는 v108 직전 값) · v108 · 대안으로 나란히 그린 점검 페이지(https://claude.ai/artifact/RsFYD1ZoqgnBzDJ2irHm6r)에서 사용자가 정했다. 역할 → 단계와 SEED 에서 옮긴 이유는 아래 v108 절에 반영했다(`(v109)` 표시).

**아직 두 웹 · 앱에는 들어가지 않았다.** v108 과 함께 앱 적용 단계에서 옮긴다.

| 무엇 | 바꾼 것 | 왜 |
|---|---|---|
| 다크 글자 채도 | 의미 색 800-dark · 브랜드 900-dark 의 채도를 지금 제품 값만큼(밝기 · 색조는 그대로) | SEED 램프 모양대로 채도를 줄여 다크 링크 · 금액 글자가 회색 기를 띠었다(HR 브랜드는 채도가 절반 아래). 지금 제품 값과 ΔE 는 HR 9.5 → 3.0, Desk 7.6 → 5.0, 초록 10.9 → 7.8 |
| 다크 약한 배경 | 의미 색 · 브랜드의 약한 배경 · 눌림 100 · 200 → 200 · 300 | 100 이 다크 카드 표면과 같은 밝기(1.00 ~ 1.02:1)라 안내 띠 · 배지 배경이 보이지 않았다 |
| 대비 글자 | 라이트 900 → 800(다크는 900) | 라이트 900 이 거의 검정에 가깝게 짙었다 |
| 강한 선 | gray-800 → gray-600 | 체크박스 · 라디오 테두리와 꺼진 스위치가 보조 글자만큼 진했다 |
| 기본 테두리 | gray-400 라이트를 #E5E8EF 로 고정 | 스펙 40곳의 테두리가 진하고 푸르게 바뀌었다(다크는 입력칸 배경과 겹쳐 그대로) |
| 다크 비활성 글자 | gray-500 → gray-600 | 다크 비활성 글자가 라이트보다 흐렸다 |
| 브랜드 옅은 선 | Desk brand-300 채도 올림, HR 은 brand-400(채도 올림)으로 | 옅은 회청 · 회녹으로 바뀌었다 |
| 토스트 · 툴팁 배경 | gray-900 → gray-1000(#1A1F2E) | 지금 제품 값으로 — 사용자 결정 |

- 대비는 모두 다시 잰다 — `npm run lint:all` · `lint:dark` 가 통과한다. 다크 의미 색 글자는 다크 입력칸 위 4.67 ~ 4.71:1, 브랜드 글자는 4.69 · 4.79:1 이다.
- 이번에 hex 를 고친 본문 인용 줄의 대비 수치도 다시 쟀다.

### v108 — SEED 팔레트 층 (2026-09-30)

당근 SEED 처럼 색에 팔레트 층을 둔다. 팔레트는 가족마다 차례 번호를 붙인 색이고, 역할 색(v102)은 hex 대신 그 단계를 가리킨다. 사용자가 2026-09-30 SEED 와 나란히 놓은 비교 페이지에서 구조(SEED 식 모드별) · 채우기(가족마다 차례로) · 값(SEED 규칙대로 새로 뽑음)을 정하고, 값 제안표를 보고 그대로 넣기로 했다. 출처: seed-design.io Foundations › Color › Palette(Apache-2.0).

**아직 두 웹 · 앱에는 들어가지 않았다.** 역할 색과 함께 앱 적용 단계에서 옮긴다.

| 자리 | 값 |
|---|---|
| 가족 | gray(00 · 100 ~ 1000) · red · green · orange · blue(100 ~ 1000), (v110) 차트용 yellow · indigo · violet · pink · brown(100 ~ 1000). 브랜드는 brand(100 ~ 1000)로 브랜드 파일에만 있다 |
| 모드 | 단계마다 라이트 · 다크 값이 있다. 다크 값은 이름 뒤에 -dark 를 붙인다(gray-100-dark) — 역할 색과 같은 규칙 |
| 차례 | 라이트는 100 이 가장 옅고 1000 이 가장 짙다. 다크는 뒤집혀 100 이 가장 어둡다 — 같은 번호가 두 모드에서 비슷한 무게로 보인다 |
| 참조 | 역할 색은 단계를 가리키고(`bg-layer-default: "{colors.gray-00}"`), 옛 이름은 역할 색을 가리킨다(`text-primary: "{colors.fg-neutral}"`). hex 는 팔레트에만 있다 |

- 화면 · 컴포넌트는 팔레트를 직접 부르지 않고 역할 색을 부른다. 팔레트를 직접 쓰는 것은 역할로 나타내기 어려운 예외적인 자리뿐이다(SEED 와 같다).
- 팔레트 이름은 gray-500 처럼 차례 번호다 — "토큰 이름은 의미 기반" 규칙의 예외로, 팔레트 층에만 쓴다.
- 역할이 가리키지 않는 단계(gray-600 · 의미 색 300 ~ 500 등)도 둔다. design.md 검사기는 어느 컴포넌트도 쓰지 않는 색을 경고하므로, 머리말 `components` 의 palette-* 가 단계마다 한 번씩 가리킨다 — 보기용이고 화면 컴포넌트가 아니다.
- 옛 이름은 컴포넌트 스펙을 역할 이름으로 옮기고 나면 지운다.
- (v110) 차트 10색은 팔레트 단계다 — 라이트 700 · 다크 800-dark. 새 가족 다섯의 700 은 v21 ~ v24 차트 색 그대로다.
- 본문 곳곳의 대비 수치는 대개 v108 전 값으로 잰 것이다. 지금 대비는 `npm run lint:all` · `npm run lint:dark` 가 잰 값이 기준이다.

#### 값을 뽑은 규칙

- OKLCH 에서 가족마다 색상각 하나로 뽑았다. 색상각은 지금 채움색에서 온다 — 의미 색은 라이트 700 이 그 색 그대로다(red #D72323 · green #167F3F · orange #BE490D · blue #1D6EC9, 흰 글자 4.5:1 이상).
- 단계마다 목표 밝기(CIELAB L*)를 두고, 채도는 SEED 램프 모양의 비율로 준다.
- 브랜드는 라이트 600 이 브랜드 색이다(Desk #0147AD · HR #357B5F). HR 은 다크 700 도 같은 색이다.
- 회색의 양 끝은 지금 값이다 — 라이트 00 #FFFFFF · 1000 #1A1F2E, 다크 00 #1A1F2E · 1000 #F5F6FA.
- 고정한 값 다섯 — 지금 화면의 바닥 · 뜬 표면 · 입력칸 · 흐린 글자가 그대로이게 계산값 대신 지금 hex 를 넣었다(계산값과 색차 ΔE 1.4 이하): gray-200 #F5F6FA · gray-700 #62697A · gray-100-dark #242938 · gray-200-dark #2D3346 · gray-300-dark #353B4D.
- 다크의 글자 단계(의미 색 800 · 브랜드 900)는 L* 69 다. 제안표 값이 다크 입력칸(bg-neutral-weak-dark #353B4D) 위에서 4.00 ~ 4.28:1 로 `npm run lint:dark` 에 걸려, 4.5:1 을 넘게 밝혔다. 의미 색 900 도 조금 밝아졌다(ΔE 1.7 이하).
- (v109) 그 글자 단계는 밝기 · 색조를 두고 채도만 지금 제품 값만큼 올렸다 — SEED 램프 모양대로 줄이니 다크 링크 · 금액 글자가 회색 기를 띠었다. Desk brand-300 · HR brand-400(브랜드 옅은 선)도 같은 방식이다. gray-400 은 지금 제품의 테두리 값(#E5E8EF)으로 고정했다.

#### 역할 → 단계

기본은 SEED 가 그 역할에 쓰는 단계다. porest 규칙 1번(WCAG AA)이 막거나 porest 에 없는 자리만 옮겼다(아래 "SEED 에서 옮긴 자리").

| 역할 | 라이트 | 다크 | SEED 와 다르면 (라이트 / 다크) |
|---|---|---|---|
| `bg-layer-basement` | gray-200 | gray-00 | — |
| `bg-layer-default` | gray-00 | gray-100 | — |
| `bg-layer-default-pressed` | gray-100 | gray-300 | — |
| `bg-layer-floating` | gray-00 | gray-200 | — |
| `bg-layer-floating-pressed` | gray-100 | gray-300 | — |
| `bg-neutral-weak` | gray-200 | gray-300 | — |
| `bg-neutral-weak-pressed` | gray-300 | gray-400 | — |
| `bg-neutral-inverted` | gray-1000 | gray-1000 | gray-900 / gray-1000 (v109) |
| `bg-disabled` | gray-200 | gray-300 | — |
| `fg-neutral` | gray-1000 | gray-1000 | — |
| `fg-neutral-muted` | gray-800 | gray-800 | — |
| `fg-neutral-subtle` | gray-700 | gray-700 | — |
| `fg-placeholder` | gray-700 | gray-700 | gray-600 / gray-600 |
| `fg-disabled` | gray-500 | gray-600 | gray-500 / gray-500 (v109) |
| `fg-neutral-inverted` | gray-00 | gray-100 | — |
| `stroke-neutral-subtle` | gray-300 | gray-300 | 투명도 있는 검정 · 흰색 |
| `stroke-neutral-weak` | gray-400 | gray-400 | — |
| `stroke-neutral-solid` | gray-600 | gray-600 | gray-800 / gray-800 (v109) |
| `stroke-neutral-contrast` | gray-1000 | gray-1000 | — (v113) |

의미 색은 네 역할이 같은 단계를 쓴다 — critical → red · positive → green · warning → orange · informative → blue.

| 역할(* = critical · positive · warning · informative) | 라이트 | 다크 | SEED 와 다르면 (라이트 / 다크) |
|---|---|---|---|
| bg-*-weak | 100 | 200 | 100 / 100 (v109) |
| bg-*-weak-pressed | 200 | 300 | 200 / 200 (v109) |
| bg-*-solid | 700 | 600 | positive 700 / 500 |
| bg-*-solid-pressed | 800 | 700 | positive 800 / 600 |
| fg-* | 700 | 800 | 700 / 700 |
| fg-*-contrast | 800 | 900 | 900 / 900 (v109) |
| stroke-*-solid | 700 | 800 | 700 / 700 |

SEED 의 warning 은 주황이 아니라 yellow 이고 단계도 다르다(채움 300 / 800 · 눌림 400 / 900 — 옅은 노랑 위 검은 글자).

| 역할 | Desk (라이트 / 다크) | HR (라이트 / 다크) | SEED (라이트 / 다크) |
|---|---|---|---|
| bg-brand-solid | 600 / 500 | 600 / 700 | 600 / 700 |
| bg-brand-solid-pressed | 700 / 700 | 700 / 600 | 700 / 800 |
| bg-brand-weak | 100 / 200 | 100 / 200 | 100 / 100 |
| bg-brand-weak-pressed | 200 / 300 | 200 / 300 | 200 / 200 |
| fg-brand | 600 / 900 | 600 / 900 | 600 / 700 |
| fg-brand-contrast | 700 / 900 | 700 / 900 | 700 / 700 |
| stroke-brand-solid | 600 / 900 | 600 / 900 | 700 / 700 |
| stroke-brand-weak | 300 / 800 | 400 / 800 | 300 / 300 |
| stroke-focus-ring | 600 / 900 | 600 / 900 | blue-600 / blue-600 |

#### SEED 에서 옮긴 자리

- fg-placeholder — SEED 600 → 700. 600 은 입력칸(bg-neutral-weak) 위에서 3.87:1(다크 3.18:1)이다.
- 의미 색 글자 · 선(fg-* · stroke-*-solid)의 다크 — SEED 700 → 800. 다크 700 은 어두운 표면 위 2.9:1 안팎이다 — 흰 글자를 얹는 채움 눌림 자리라 어두워야 한다.
- stroke-neutral-subtle — SEED 는 투명도 있는 검정 · 흰색이다. 검사기가 8자리 hex 를 받지 않아 gray-300 에 둔다.
- warning — SEED 의 주의 색은 노랑이고 채움 위 글자가 검정이다. porest 는 주황 + 흰 글자를 그대로 두고, 단계는 다른 의미 색과 같은 규칙으로 앉혔다.
- bg-positive-solid 의 다크 — SEED 는 500(눌림 600)이다. 다른 의미 색과 맞춰 600(눌림 700)에 둔다.
- 브랜드 채움의 다크 — Desk 는 브랜드 색이 어두워(L* 33) 채움을 지금 값(#0147AD)과 같은 무게인 500 에 둔다(ΔE 1.4). 눌림은 SEED 의 800 이 흰 글자 3.76:1 이라 700 이다. HR 은 채움이 SEED 대로 700 이고, 눌림은 800 이 흰 글자 3.61:1 이라 600(더 어둡게)이다.
- 브랜드 글자 · 선 · 포커스 링의 다크 — SEED 700 → 900. 다크 700 은 어두운 표면 위 Desk 2.27:1 · HR 2.86:1 이다.
- stroke-brand-solid 의 라이트 — SEED 700 → 600. 브랜드 색 그대로다.
- stroke-brand-weak 의 다크 — SEED 300 → 800. 다크 300 은 표면과 1.3:1 안팎(Desk 1.29 · HR 1.36)이라 선이 보이지 않는다.
- stroke-focus-ring — SEED 는 파랑(blue-600)이다. porest 는 옛 border-focus 대로 브랜드 색이다.
- (v109) 다크 약한 배경 · 눌림(의미 색 · 브랜드) — SEED 100 · 200 → 200 · 300. porest 는 다크 카드 표면(#242938, L* 16.7)이 SEED(#16171B, L* 8)보다 밝아서, 100 단계가 표면과 1.00 ~ 1.02:1 로 묻혔다. 200 · 300 이 SEED 의 표면 대비 관계(약한 배경 1.2:1 · 눌림 1.4:1)와 같다 — 지금 1.15 · 1.4:1.
- (v109) 대비 글자의 라이트 — SEED 900 → 800. 900 은 거의 검정에 가까운 짙은 색(8:1)이었다. 800 은 약한 배경 · 눌림 위 5.0 ~ 5.7:1 이다. 규칙은 "대비 글자는 일반 글자보다 한 단계 바깥" — 라이트 700 → 800, 다크 800 → 900.
- (v109) stroke-neutral-solid — SEED 800 → 600. porest 는 이 선을 체크박스 · 라디오 테두리와 꺼진 스위치 트랙에 쓴다(SEED 는 그 자리에 옅은 선을 쓴다). UI 3:1 을 넘는 가장 옅은 단계이고, 지금 제품 값과 ΔE 3.5 다.
- (v109) fg-disabled 의 다크 — SEED 500 → 600. 다크 500 은 비활성 버튼 위 2.08:1 로 라이트(2.93:1)보다 흐렸다. 600 은 3.18:1 이다.
- (v109) bg-neutral-inverted 의 라이트 — SEED 900 → 1000. 지금 제품의 토스트 · 툴팁 배경(#1A1F2E)이다 — 사용자 결정.
- (v109) HR 의 stroke-brand-weak 라이트 — 300 → 400(채도 올림). 300 은 옅은 회녹이라 지금 제품 값과 ΔE 15.5 였다. 지금은 ΔE 1.5 다.

### v102 — SEED 역할 색 (2026-09-29)

당근 SEED 의 역할 기반 색 체계를 들인다. 사용자가 2026-09-29 porest 와 SEED 를 나란히 놓은 비교 페이지에서 네 가지(구조 · 값 · AA 미달 · HR 웹)를 정하고, 역할 색 제안표를 보고 그대로 넣기로 했다.

**아직 두 웹 · 앱에는 들어가지 않았다.** Desk 웹 · 앱은 같은 역할을 각자 정의해 쓰고 있고(웹 68개 · 앱 67개, 합쳐 4,700여 곳), 앱 PR 에서 그 정의를 이 표에서 만들어 쓰게 바꾼다.

이름은 SEED 처럼 속성 · 역할 · 변형 · 상태 순이다 — 예: fg-critical-contrast, bg-brand-solid-pressed.

| 자리 | 값 |
|---|---|
| 속성 | fg(글자 · 아이콘) · bg(배경) · stroke(선) |
| 역할 | neutral · layer · brand · critical · positive · warning · informative |
| 변형 | solid(채움) · weak(약한 배경) · contrast(약한 배경 위 글자) · muted · subtle · inverted |
| 상태 | pressed(눌림) |

- 값은 porest 색이다. SEED 는 대비를 APCA 로 재고 porest 는 WCAG AA 라 SEED 값은 가져오지 않았다 — SEED 의 흐린 글자는 흰 바탕에서 WCAG 3.42:1 이다. 당근 주황(carrot)은 쓰지 않는다.
- 옛 이름(text-primary · surface-default · border-default · success …)은 같은 값의 별칭으로 남긴다. 컴포넌트 스펙과 제품은 컴포넌트를 옮길 때 새 이름으로 바꾼다.
- 글자와 그 글자가 놓이는 배경의 짝은 머리말 `components` 의 `role-*` 로 적어 두어 `npm run lint` 가 라이트 · 다크 대비를 잰다(4.5:1 밑이면 경고).
- 흰 글자는 `static-white` 다(SEED palette.static-white). 채움(solid) 위 글자에 쓴다.

#### 글자 (fg)

| 역할 | 라이트 | 다크 | 옛 이름 | Desk 웹 이름 |
|---|---|---|---|---|
| `fg-neutral` | `#1A1F2E` | `#F5F6FA` | text-primary | fg-primary |
| `fg-neutral-muted` | `#535866` | `#B7BDCC` | text-secondary | fg-secondary |
| `fg-neutral-subtle` | `#62697A` | `#A2A8B7` | text-tertiary | fg-tertiary |
| `fg-neutral-inverted` | `#FFFFFF` | `#242938` | — | — |
| `fg-placeholder` | `#62697A` | `#A2A8B7` | — | fg-placeholder |
| `fg-disabled` | `#8A91A0` | `#838997` | text-disabled | fg-disabled |
| `static-white` | `#FFFFFF` | — | text-on-accent | fg-on-brand · fg-on-danger · fg-on-success |
| `fg-critical` | `#D72323` | `#FF8477` | error · error-light | status-danger-fg · fg-expense |
| `fg-positive` | `#167F3F` | `#25C062` | success · success-light | status-success-fg |
| `fg-warning` | `#BE490D` | `#FF8758` | warning · warning-light | status-warning-fg |
| `fg-informative` | `#1D6EC9` | `#69ABFF` | info · info-light | status-info-fg · fg-transfer |
| `fg-critical-contrast` | `#C01016` | `#FFBCB3` | — | — |
| `fg-positive-contrast` | `#026E33` | `#AED6B6` | — | — |
| `fg-warning-contrast` | `#A53E0A` | `#F9BFA9` | — | — |
| `fg-informative-contrast` | `#0F5FB3` | `#ACCEFB` | — | — |

#### 배경 (bg)

| 역할 | 라이트 | 다크 | 옛 이름 | Desk 웹 이름 |
|---|---|---|---|---|
| `bg-layer-basement` | `#F5F6FA` | `#1A1F2E` | bg-page | bg-canvas · bg-table-head |
| `bg-layer-default` | `#FFFFFF` | `#242938` | surface-default | bg-surface |
| `bg-layer-default-pressed` | `#F7F8FD` | `#353B4D` | — | bg-hover · bg-row-hover |
| `bg-layer-floating` | `#FFFFFF` | `#2D3346` | — | bg-surface-raised |
| `bg-layer-floating-pressed` | `#F7F8FD` | `#353B4D` | — | — |
| `bg-neutral-weak` | `#F5F6FA` | `#353B4D` | surface-input | bg-sunken · bg-muted |
| `bg-neutral-weak-pressed` | `#EDEFF3` | `#404757` | — | bg-warm-press |
| `bg-neutral-inverted` | `#1A1F2E` | `#F5F6FA` | — | bg-inverse |
| `bg-disabled` | `#F5F6FA` | `#353B4D` | — | bg-disabled |
| `bg-critical-solid` | `#D72323` | `#CC0E17` | error | status-danger |
| `bg-critical-solid-pressed` | `#C01016` | `#D82424` | — | status-danger-press |
| `bg-critical-weak` | `#FFEFEC` | `#532722` | — | status-danger-subtle |
| `bg-critical-weak-pressed` | `#FFDEDA` | `#722722` | — | — |
| `bg-positive-solid` | `#167F3F` | `#117539` | success | status-success |
| `bg-positive-solid-pressed` | `#026E33` | `#198140` | — | — |
| `bg-positive-weak` | `#EAF5EC` | `#223927` | — | status-success-subtle |
| `bg-positive-weak-pressed` | `#D8EADB` | `#20482B` | — | — |
| `bg-warning-solid` | `#BE490D` | `#B04209` | warning | status-warning |
| `bg-warning-solid-pressed` | `#A53E0A` | `#BF4A10` | — | — |
| `bg-warning-weak` | `#FFEFE8` | `#4B2B1F` | — | status-warning-subtle |
| `bg-warning-weak-pressed` | `#FAE0D5` | `#65321D` | — | — |
| `bg-informative-solid` | `#1D6EC9` | `#0F65BF` | info | status-info |
| `bg-informative-solid-pressed` | `#0F5FB3` | `#1F70CB` | — | — |
| `bg-informative-weak` | `#EAF3FE` | `#21344D` | — | status-info-subtle |
| `bg-informative-weak-pressed` | `#D7E6FB` | `#204069` | — | — |

#### 선 (stroke)

| 역할 | 라이트 | 다크 | 옛 이름 | Desk 웹 이름 |
|---|---|---|---|---|
| `stroke-neutral-subtle` | `#EDEFF3` | `#353B4D` | — | border-subtle |
| `stroke-neutral-weak` | `#E5E8EF` | `#404757` | border-default | border-default |
| `stroke-neutral-solid` | `#767C8B` | `#838997` | border-strong | border-strong |
| `stroke-neutral-contrast` | `#1A1F2E` | `#F5F6FA` | — | — |
| `stroke-critical-solid` | `#D72323` | `#FF8477` | error | status-danger-border |
| `stroke-positive-solid` | `#167F3F` | `#25C062` | success | status-success-border |
| `stroke-warning-solid` | `#BE490D` | `#FF8758` | warning | status-warning-border |
| `stroke-informative-solid` | `#1D6EC9` | `#69ABFF` | info | status-info-border |

#### 브랜드 역할

이 파일에만 있다. 다른 브랜드 파일에 같은 이름으로 다른 값이 있다.

| 역할 | 라이트 | 다크 | 옛 이름 | Desk 웹 이름 |
|---|---|---|---|---|
| `fg-brand` | `#357B5F` | `#72B898` | primary · primary-light | fg-brand · fg-link |
| `fg-brand-contrast` | `#256D52` | `#72B898` | — | fg-brand-strong |
| `bg-brand-solid` | `#357B5F` | `#357B5F` | primary | bg-brand |
| `bg-brand-solid-pressed` | `#256D52` | `#256D51` | — | bg-brand-press · bg-brand-hover |
| `bg-brand-weak` | `#EDF5F0` | `#25372E` | — | bg-brand-subtle |
| `bg-brand-weak-pressed` | `#E0EDE7` | `#264437` | — | bg-brand-muted |
| `stroke-focus-ring` | `#357B5F` | `#72B898` | border-focus · border-focus-light | border-focus |
| `stroke-brand-solid` | `#357B5F` | `#72B898` | — | border-brand |
| `stroke-brand-weak` | `#6AB192` | `#599279` | — | border-brand-soft |

#### 값을 만든 규칙

v102 때의 규칙이다. v108 부터 값은 팔레트 단계에서 온다 — 위 표의 값은 v108 값이고, 지금 규칙은 v108 절에 있다.

- **약한 배경(weak)**: 의미 색 12%(다크 18%) · 브랜드 8%(다크 12%)를 `bg-layer-default`(흰색 · 다크 #242938) 위에 섞은 불투명 값이다. Desk 가 투명하게 섞던 비율 그대로다 — design.md 검사기가 투명도 있는 색을 받지 않고, SEED 도 불투명 값이다. 페이지 배경 위에 바로 놓이면 전보다 조금 밝다.
- **약한 배경 눌림(weak-pressed)**: 의미 색 +6%(다크 +10%), 브랜드 14%(다크 22%).
- **채움 눌림(solid-pressed)**: Desk 앱 파랑 램프 500 → 600 과 같은 명도 폭만큼 어둡게. Desk 브랜드는 그 600 값(#013D97)이다.
- **contrast 글자**: 약한 배경과 그 눌림 위에서 4.5:1 이 되는 가장 밝은 값(색상 · 채도는 그대로)이다. 부드러운 배지처럼 약한 배경 위 글자에 쓴다.
- **의미 색 AA 보정**: success #16803F → #167F3F, error #DC2626 → #D72323, warning #C84D0E → #BE490D, info #1D6FCB → #1D6EC9. 명도만 낮춰 흰 바탕 · 페이지 · 입력칸 모두 4.5:1 을 넘긴다(전: 페이지 위 오류 4.47 · 경고 4.30).
- **다크 모드 의미 색 선**은 밝은 변형(-light)이다. 기본색은 어두운 표면 위 2.86:1 로 UI 3:1 에 못 미쳤다.

#### 들이지 않은 SEED 역할

porest 화면에 아직 쓰는 자리가 없다. 자리가 생기면 위 규칙으로 더한다.

- bg.neutral-solid — 짙은 회색 채움(bg.neutral-inverted-pressed 는 v112 에 Button 의 누름으로 들였다)
- bg.neutral-weak-alpha · bg.transparent-*(4) — 투명도 있는 배경. 필요하면 overlay 처럼 표 토큰으로 따로 둔다
- bg.overlay · bg.overlay-muted — Elevation 의 overlay-dim 이 같은 자리다
- stroke.neutral-muted · stroke.*-weak(4) — Desk 는 구분선을 한 값으로 쓴다(stroke.neutral-contrast 는 v113 에 Select Box 의 고른 테두리로 들였다)
- bg.magic-weak · bg.layer-fill — 당근 AI 기능 전용 · SEED 에서도 없어질 이름

#### HR 웹

HR 웹은 아직 porest 색에 이어지지 않았다 — shadcn 기본 테마 그대로라 주 색이 파랑(#2563EB)이다. 2026-09-29 사용자가 앱 적용 단계에서 이 파일의 HR 색(초록 #357B5F)으로 옮기기로 정했다.

### v104 — 그라디언트 (2026-09-29)

당근 SEED 의 Gradient 가운데 두 가지만 들인다 — 콘텐츠 끝을 부드럽게 가리는 마스크와 스켈레톤 반짝임. 당근 AI 기능 전용(magic)은 두지 않는다. 투명도가 있어 overlay 처럼 표 토큰으로 둔다(검사기가 8자리 hex 를 받지 않는다). 출처: seed-design.io Foundations › Gradient(Apache-2.0).

| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `gradient-fade-mask` | `linear-gradient(#00000000 0%, #00000003 8%, #00000005 16%, #0000000d 22%, #00000014 29%, #00000021 35%, #0000002e 41%, #00000040 47%, #00000052 53%, #00000066 59%, #0000007a 65%, #00000094 71%, #000000ab 78%, #000000c7 84%, #000000e3 92%, #000000ff 100%)` | 가림 마스크 — `mask-image` 로 써서 긴 목록 · 가로 스크롤 끝을 부드럽게. 라이트 · 다크 같음 |
| `gradient-shimmer-neutral` | `linear-gradient(90deg, #ffffff00 0%, #ffffffab 46%, #ffffffab 54%, #ffffff00 100%)` | 스켈레톤 반짝임 띠 — 라이트 |
| `gradient-shimmer-neutral-dark` | `linear-gradient(90deg, #ffffff00 0%, #ffffff1a 46%, #ffffff1a 54%, #ffffff00 100%)` | 스켈레톤 반짝임 띠 — 다크 |

- 마스크는 방향 없이 적었다(위 → 아래). 쓰는 자리에서 방향을 붙인다(`to right` 등).
- 반짝임은 `motion-duration-loop`(1500ms) · `motion-ease-linear` 로 지나가고, 모션 줄이기 모드에서는 멈춘다.

### Surface (v1 추가)

`bg-page` 위에 카드·시트·입력을 그리기 위한 최소 표면 페어. 라이트·다크 모드 모두 동일한 시맨틱(`default` = 콘텐츠 표면, `input` = 입력·recessed 표면)을 유지하며, 시각적 elevation 방향만 모드에 따라 반전됩니다.

- **라이트**: `bg-page #F5F6FA` 위에 `surface-default #FFFFFF`(elevated 카드), 그 위 또는 옆에 `surface-input #F0F2F7`(recessed 입력 필드).
- **다크**: `bg-page-dark #1A1F2E`보다 한 단 밝은 `surface-default-dark #242938`(카드), 그보다 한 단 더 밝은 `surface-input-dark #2D3346`(입력 — 다크 모드에서는 입력이 elevated되어 시인성을 확보).

#### 추가 이유
1. 현재 `bg-page` 단일 토큰만으로는 카드/모달/입력 분리가 불가능 — 컴포넌트 스펙 작성의 전제 조건.
2. 다크 모드 페어를 동시 도입해 단일 모드 편향을 방지.
3. `border`·`text` 토큰의 대비비 검증은 표면 토큰이 확정되어야 가능하므로 선행.

#### WCAG 검증 (사전 계산)
- 본문 텍스트 4.5:1 대상
  - `#000` on `surface-default` = **21.0:1** ✅ / `#FFF` on `surface-default-dark` = **14.3:1** ✅
  - `#000` on `surface-input` = **18.8:1** ✅ / `#FFF` on `surface-input-dark` = **12.3:1** ✅
- 브랜드 accent 호환 (버튼/아이콘 1차 용도 — UI 3:1 기준)
  - `primary` on `surface-default` **5.16:1** / on `surface-input` **4.61:1** — 본문도 통과
  - (당시 Desk primary 검증은 `DESIGN.desk.md` 참조 — 본 파일은 HR 단독)
- 표면 간 elevation 대비(`surface-default` vs `bg-page` ≈ 1.08:1)는 WCAG 3:1 비대상(본문/UI 컴포넌트 규정 아님). 의도된 미묘 elevation.

#### HR / Desk 듀얼 브랜드
- 두 accent 모두 라이트 모드 표면 위에서 본문 4.5:1 또는 그에 준하는 대비를 확보 — 단일 표면 페어로 양 브랜드 호환.
- 어두운 표면용 accent 변형(`accent-*-light`)은 추후 별도 토큰으로 분리 예정 — 현재 surface 토큰은 lightened accent 도입 시 재계산 없이 그대로 유효.

### Text (v2 추가)

surface 페어 위에서 본문 가독성을 확보하기 위한 최소 텍스트 역할 5종. 모드별 페어(primary/secondary)와 모드 무관(on-accent)으로 구성하며, tertiary·disabled는 사용 사례가 명확해진 후 v3에서 추가합니다.

- **primary**: 본문 헤딩·메인 텍스트. 라이트 `#1A1F2E` / 다크 `#F5F6FA` — 의도적으로 `bg-page-dark` / `bg-page`와 동일 값을 사용해 라이트·다크 시맨틱 반전 일관성을 확보(역할이 다르므로 별도 토큰 유지).
- **secondary**: 보조 설명·메타 정보. 라이트 `#4E5968` / 다크 `#B0B8C4` — Toss 톤의 중성 그레이.
- **on-accent**: HR/Desk accent 배경(버튼 fill, badge) 위 텍스트. `#FFFFFF` 단일 — 모드 무관.

#### 추가 이유
1. surface 페어가 v1에서 확정됐으므로 텍스트 대비비 검증이 비로소 가능 — 후속 컴포넌트(버튼·카드·입력) 스펙 작성의 차단 요소 해소.
2. accent 위 텍스트 색상을 `#FFFFFF`로 명시 토큰화 — 양 브랜드 버튼에서 동일 처리 보장(분기 없음).
3. tertiary·disabled는 placeholder·비활성 컴포넌트 사용 패턴이 정해진 후 추가 — 추측성 선행 토큰 회피(CLAUDE.md "사용자가 명시적으로 요청하지 않은 토큰 추가 금지").

#### WCAG 검증 (사전 계산)
모든 페어가 본문 4.5:1 통과, 대부분 AAA 7:1 이상.

| 텍스트 | 표면 | 대비 | 등급 |
|---|---|---|---|
| text-primary `#1A1F2E` | surface-default | 16.22 | AAA |
| text-primary | surface-input | 14.49 | AAA |
| text-primary | bg-page | 15.02 | AAA |
| text-primary-dark `#F5F6FA` | surface-default-dark | 13.25 | AAA |
| text-primary-dark | surface-input-dark | 11.40 | AAA |
| text-primary-dark | bg-page-dark | 15.03 | AAA |
| text-secondary `#4E5968` | surface-default | 7.08 | AAA |
| text-secondary | surface-input | 6.32 | AA |
| text-secondary-dark `#B0B8C4` | surface-default-dark | 7.41 | AAA |
| text-secondary-dark | surface-input-dark | 6.37 | AA |
| text-on-accent `#FFFFFF` | primary | 5.16 | AA |

#### HR / Desk 듀얼 브랜드
- `text-on-accent` 단일 값(`#FFFFFF`)이 양 브랜드 accent에서 본문 4.5:1 통과 — 브랜드별 분기 불필요.
- primary·secondary는 neutral 토큰으로 양 브랜드 공유. accent 색상에 의존하지 않음.

### Border (v3 추가)

border는 시맨틱 계층을 둘로 분리합니다 — 장식적 외곽선과 필수 UI 외곽선은 WCAG 1.4.11 (Non-text contrast 3:1) 적용 대상이 다르기 때문입니다.

- **default**: 카드 윤곽, 섹션 divider 등 **장식적** 분리. 표면과 1.1~1.5:1 대비로 미묘하게만 구분 — WCAG 3:1 비대상(콘텐츠 식별이 표면 색상으로 이미 가능).
- **strong**: 입력 필드 외곽선, 비채움 버튼 보더 등 **필수 UI 컴포넌트** 외곽선. 인접 모든 표면(`surface-default`, `bg-page`, `surface-input`)에 대해 3:1 이상 — UI 컴포넌트 식별이 외곽선에 의존하므로 strict.

#### 추가 이유
1. v1 surface 페어 + v2 text 페어가 확정됐으므로 표면 위 컴포넌트 외곽선 검증이 가능 — 입력·버튼 컴포넌트 스펙 작성의 차단 요소 해소.
2. 장식/필수 분리로 디자이너가 "어느 border를 써야 3:1을 충족하는가" 의사결정을 토큰 이름에서 즉시 판단 가능.
3. `border-focus`는 이번 배치에서 보류 — HR primary가 `surface-default-dark`에서 3:1 미달(2.77:1)이므로 `accent-*-light` 변형이 정의된 후 추가하는 편이 안전. 그 전까지 포커스 링은 `border-strong`을 임시 활용 가능. (v7~v16에서 단계적 해소, 본 파일에서 `border-focus` 토큰 정의 완료.)

#### WCAG 검증 (사전 계산)

`border-strong` 페어 — **3:1 strict 통과**:

| border | 표면 | 대비 | 결과 |
|---|---|---|---|
| border-strong `#7D8593` | surface-default | 3.74 | ✅ |
| border-strong | bg-page | 3.46 | ✅ |
| border-strong | surface-input | 3.34 | ✅ |
| border-strong-dark `#8B95A8` | surface-default-dark | 4.71 | ✅ |
| border-strong-dark | bg-page-dark | 5.34 | ✅ |
| border-strong-dark | surface-input-dark | 4.05 | ✅ |

`border-default` 페어 — **장식적 미묘 대비** (3:1 비대상):

| border | 표면 | 대비 | 비고 |
|---|---|---|---|
| border-default `#E5E8EF` | surface-default | 1.22 | 의도된 subtle 분리 |
| border-default | bg-page | 1.13 | 의도된 subtle 분리 |
| border-default-dark `#353B4D` | surface-default-dark | 1.32 | 의도된 subtle 분리 |
| border-default-dark | bg-page-dark | 1.50 | 의도된 subtle 분리 |

#### HR / Desk 듀얼 브랜드
- 모든 border는 neutral 토큰 — 브랜드 accent에 의존하지 않음, 양 브랜드 공유.
- 미래 `border-focus`는 accent 기반(브랜드 분기) 또는 neutral 기반 단일 토큰 중 선택 — 다크 모드 accent 변형 결정 후 일관 적용.

### Brand light variants (v7 추가, v8 명명 정정)

어두운 표면(다크 모드의 모든 표면 + 라이트 모드의 검정 배너·hero 등 포함, **모드 무관**) 위에서 브랜드 accent를 텍스트·아이콘·외곽선·focus 링 등 **비채움 사용**으로 안전하게 쓰기 위한 lightness 변형 페어. v3 `border-focus` 보류의 차단 사유였던 "accent의 어두운 표면 3:1 미달"을 해소합니다.

> **v8 명명 정정**: 초기 명칭 `accent-*-on-dark`는 mode pair 접미사(`-dark`: 다크 모드 사용)와 표면 컨텍스트 접미사를 혼동시켜 → `accent-*-light`로 변경. `-light`는 lightness variant 의미로 고정(accent에는 mode pair `-dark`가 존재하지 않으므로 충돌 없음). 라이트 모드의 어두운 영역(검정 배너, dark hero)에서도 정당한 사용이 명명에 반영됨.

| 토큰 | hex | 사용 |
|---|---|---|
| `primary-light` | `#3FBF74` | 어두운 표면(다크 모드 + 라이트 모드 검정 배너 등) 위 HR primary 텍스트·아이콘·outline 버튼·focus 링 |

#### 추가 이유
1. v3에서 `border-focus`가 보류된 직접 원인 해소 — HR primary 2.77:1로 `surface-default-dark` 대비 3:1 미달. 다크 lightness 변형으로 4.5:1 이상 확보.
2. **5개 한도 중 2개만 추가** — CLAUDE.md "사용자가 명시적으로 요청하지 않은 토큰 추가 금지" 준수. 별도 `border-focus` 토큰은 컴포넌트 레벨 표면 컨텍스트 분기(밝은 표면=`accent-{brand}`, 어두운 표면=`accent-{brand}-light`)로 해결 가능하므로 미추가.
3. 동일 brand family 내 lightness만 조정 — HR 녹색, Desk 청색의 시각 식별성 유지.

#### WCAG 검증 (사전 계산)

본문 4.5:1 — 모든 다크 표면 통과:

| 텍스트 | 다크 표면 | 대비 | 결과 |
|---|---|---|---|
| primary-light `#3FBF74` (L=0.396) | surface-default-dark | 6.07 | ✅ AAA |
| primary-light | bg-page-dark | 6.89 | ✅ AAA |
| primary-light | surface-input-dark | 5.23 | ✅ AA |

#### 채움 fill 비호환 — 사용 경계 명시

`accent-*-light` 위에 `text-on-accent` (`#FFFFFF`) 사용 시 본문 대비:
- on `primary-light`: **2.36:1** ❌

따라서 **다크 모드 채움 버튼 fill은 `primary`(원래 값)를 유지**합니다. 흰 텍스트 5.16:1로 본문 통과. 단, 이 경우 버튼 외곽 vs 다크 표면 대비는 2.77:1로 3:1 미달 — Toss·Material 패턴처럼 **inset shadow 또는 명시적 1px 외곽선**(예: `border-strong-dark`)으로 컴포넌트 식별 보강 필요(컴포넌트 스펙에서 처리).

요약하면:
- **다크 채움 버튼**: bg = `primary`, text = `text-on-accent`(`#FFFFFF`), 외곽선 = `border-strong-dark` 보강
- **어두운 표면 비채움 사용**(outline 버튼 텍스트·링크·아이콘·focus, 라이트/다크 모드 무관): `primary-light`

#### HR / Desk 듀얼 브랜드
- 각 브랜드 dedicated 변형 — neutral 토큰이 아닌 brand-specific. 표면 컨텍스트 페어: 밝은 표면용 `accent-{brand}` · 어두운 표면용 `accent-{brand}-light`.

### Text tertiary (v11 추가)

3차 텍스트 위계 — placeholder, hint, caption-tertiary 등 본문보다 낮은 강조의 read-only 정보. 라이트/다크 페어 2개.

| 토큰 | hex | 사용 |
|---|---|---|
| `text-tertiary` | `#62697A` | 라이트 표면 위 placeholder·hint·메타 (text-secondary보다 미묘) |
| `text-tertiary-dark` | `#A2A8B7` | 다크 표면 위 placeholder·hint·메타 |

#### 추가 이유
1. v2 text 토큰(primary/secondary/on-accent)으로는 input placeholder의 시각 위계가 표현 불가 — secondary를 placeholder에 쓰면 입력값과 동등한 강조로 보여 혼란.
2. `text-disabled`와 분리: tertiary는 "강조가 낮을 뿐 읽을 수 있는 텍스트"(WCAG 1.4.3 4.5:1 대상), disabled는 "비활성 — 색상 대비 적용 면제 가능"(WCAG 1.4.3 incidental 예외). 시맨틱이 다르므로 별도 토큰.
3. **휘도 윈도우가 좁음**: 라이트 모드는 `text-secondary` L=0.098과 `surface-input` 위 4.5:1 ceiling L=0.158 사이 약 0.06 luminance gap만 가용. `#62697A`(L=0.141)로 윈도우 내 위치 확보.

#### WCAG 검증 — lint 실측 결과

4개 페어를 components(`caption-tertiary-on-card-{light,dark}`, `placeholder-on-input-{light,dark}`)로 정의하여 자동 검증:

| component | bg | text | lint 판정 |
|---|---|---|---|
| `caption-tertiary-on-card-light` | surface-default | text-tertiary | ✅ ≥4.5:1 |
| `caption-tertiary-on-card-dark` | surface-default-dark | text-tertiary-dark | ✅ ≥4.5:1 |
| `placeholder-on-input-light` | surface-input | text-tertiary | ✅ ≥4.5:1 (가장 빡빡, 손계산 4.91) |
| `placeholder-on-input-dark` | surface-input-dark | text-tertiary-dark | ✅ ≥4.5:1 (손계산 4.87) |

(`npm run lint` 출력 기준: 0 errors, 0 contrast warnings.)

#### bg-page 위 검증 미적용
`text-tertiary` on `bg-page` (페이지 배경 위 직접 노출 케이스, 손계산 5.09:1)는 별도 component 정의 안 함 — 실제 사용 시 거의 항상 `surface-*` 표면 위에 있음. 필요 시 v12+에서 페어 추가 가능.

#### HR / Desk 듀얼 브랜드
- neutral 토큰, 양 브랜드 동일 사용. accent에 의존하지 않음.

### Text disabled (v13 추가)

비활성(disabled) 상태의 라벨·버튼 텍스트·입력값 등 — WCAG 1.4.3 *incidental text exception* 적용 대상으로, 색 대비 4.5:1 요건이 면제되는 시맨틱.

| 토큰 | hex | 사용 |
|---|---|---|
| `text-disabled` | `#8A91A0` | 라이트 표면 위 비활성 텍스트 |
| `text-disabled-dark` | `#838997` | 다크 표면 위 비활성 텍스트 |

#### 추가 이유
1. **시맨틱 분리 필수**: text-tertiary(placeholder)는 ≥4.5:1 본문 대비 대상, text-disabled는 incidental 면제 대상 — 두 시맨틱을 같은 토큰에 묶으면 placeholder가 부당하게 약해지거나 disabled가 부당하게 진해짐.
2. **시각 의도**: disabled는 "비활성"으로 보여야 하므로 의도적으로 ~3:1대 대비 — text-tertiary(~5:1)와 명확히 구분.

#### WCAG 검증 — incidental 예외 적용

**WCAG 1.4.3 (Contrast Minimum)**: "비활성 UI 컴포넌트의 일부인 텍스트는 대비 요건이 없다(no contrast requirement)." disabled 텍스트는 이 면제 조항에 해당.

대비비 손계산 (참고용 — incidental이라 통과 강제 아님):

| token | 표면 | 대비 (손계산) | 비고 |
|---|---|---|---|
| `text-disabled` `#828995` (L=0.248) | surface-default | 3.52 | <4.5:1 의도 — 비활성 시각 |
| `text-disabled` | surface-input | 3.15 | 동일 |
| `text-disabled` | bg-page | 3.26 | 동일 |
| `text-disabled-dark` `#7A8294` (L=0.222) | surface-default-dark | 3.71 | 동일 |
| `text-disabled-dark` | surface-input-dark | 3.20 | 동일 |
| `text-disabled-dark` | bg-page-dark | 4.21 | 동일 |

전 표면에서 ≥3:1 (UI 컴포넌트 식별 임계 통과) + <4.5:1 (incidental 의도) — 비활성으로 인지되되 식별 가능한 회색 균형.

#### Spec 충돌 회피 — sparse component 전략

design.md `contrastCheck` 룰은 incidental 인지 없이 모든 `backgroundColor`+`textColor` 페어에 4.5:1 강제. 현재 spec 한계로 disabled 시맨틱이 자동 검증과 충돌.

**해결**: 토큰을 textColor만 가진 sparse component(`disabled-label-light`/`-dark`)로 referencing. `backgroundColor` 미선언이면 contrastCheck 룰 미발동(둘 다 있어야 트리거). 동시에 토큰이 referenced되어 orphan 경고도 회피. 부모 표면 색은 런타임에 CSS·컴포넌트 레벨에서 상속/적용.

> **부수 효과 인지**: 이 sparse 패턴은 disabled 외 다른 시맨틱에 함부로 쓰면 lint의 contrast 안전망 무력화 위험 있음. disabled처럼 WCAG가 명시적 면제하는 케이스에만 적용.

#### 운영 가이드
- 컴포넌트 구현 시 `disabled-label-light/dark` 토큰을 textColor에 적용 + 추가로 `cursor: not-allowed` 와 호버 · 누름 모양 빼기를 동반. 포인터 이벤트는 끄지 않는다 — 끄면 커서가 보이지 않는다(2026-10-01, SEED 와 같다). 불투명도로 흐리게 하지 않는다(v106 — State 절).
- 단순 색만으로 비활성을 표시하지 않음 — 색·커서·인터랙션 비활성을 함께 사용해야 시각·기능적 비활성 일치.

#### HR / Desk 듀얼 브랜드
- neutral 토큰 — 양 브랜드 공유. accent에 의존 없음.

### Semantic colors (v10 추가, v51-v52에서 vivid refresh)

상태 전달을 위한 functional palette — 브랜드 정체성과 분리된 4개 status. HR/Desk 양 브랜드 공유, 라이트 표면 base만 이번 배치에서 확정. **현재 사용 hex는 v51-v52 이후 vivid 톤** (DESIGN.md `### Semantic refresh` 섹션 참조). v10 시점 hex는 변천 history.

| 토큰 | v10 hex (이전) | v51-v52 hex (**현재**) | 시맨틱 |
|---|---|---|---|
| `success` | `#117A3A` | `#16803F` | 완료·확인·긍정 결과 (Tailwind green-700 톤) |
| `error` | `#C53030` | `#DC2626` | 오류·파괴적 액션·필수 입력 누락 (Tailwind red-600) |
| `warning` | `#A85800` | `#C84D0E` | 경고·주의·임박 만료 (orange — v52 미세 brighten) |
| `info` | `#006395` | `#1D6FCB` | 안내·도움말·진행 중 (sky blue, Tailwind sky-600) |

#### 추가 이유
1. 폼 검증·토스트·alert·badge 컴포넌트는 모든 제품 공통 인터랙션 — accent로는 표현 불가능한 functional state 전달이 차단되어 있었음.
2. **functional palette ≠ brand palette**: HR/Desk 어디서도 동일한 success/error/warning/info를 사용 — 브랜드 분기 시 인지 부하 증가 회피. 이미 accent로 brand identity 차별화는 완료.
3. **라이트 표면 base만 4개** — 다크 표면용 `success-light` 등은 다크 모드 alert·toast 사용 사례 등장 시 v11+에서 추가(accent-light 패턴 답습). 5 한도 중 1개 여분.

#### 색상 대비 — lint 실측 결과 (손계산 아님)

8개 페어를 components 섹션에 정의해 lint contrast-ratio 룰로 직접 검증:

| component | bg | text | lint 판정 |
|---|---|---|---|
| `badge-success` | success | text-on-accent | ✅ ≥4.5:1 |
| `badge-error` | error | text-on-accent | ✅ ≥4.5:1 |
| `badge-warning` | warning | text-on-accent | ✅ ≥4.5:1 |
| `badge-info` | info | text-on-accent | ✅ ≥4.5:1 |
| `alert-text-success` | surface-default | success | ✅ ≥4.5:1 |
| `alert-text-error` | surface-default | error | ✅ ≥4.5:1 |
| `alert-text-warning` | surface-default | warning | ✅ ≥4.5:1 |
| `alert-text-info` | surface-default | info | ✅ ≥4.5:1 |

(`npm run lint` 출력 기준: 0 errors, 0 contrast warnings — 8 페어 전부 silent pass.)

#### 자동 검증 미적용 항목 (손계산 한계 명시)
- `surface-input` 위 semantic 텍스트 (input 검증 메시지 케이스): `surface-input` 표면이 카드 표면(`surface-default`)과 휘도 차 0.11 → 페어 정의해두면 lint 추가 검증 가능. 이번 배치 미정의.
- 다크 표면 위 semantic 표시: ~v19까지 `success`/`error` base 색은 다크 표면 위 contrast 미달 → **v20에서 `-light` 변형 도입으로 해소** (아래 v20 섹션 참조).
- `border-vs-surface` 패턴은 spec에 borderColor 없어 영구 자동 검증 불가 (v9 한계 그대로).

### Chart palette (v21 추가, 4 배치 진행 중)

데이터 시각화용 hue-균등 10색 팔레트. 양 brand 공유(unified, primary는 brand-specific 유지). L≈0.16-0.18로 통일.

**v21 (1/4)**: light 표면 5색 — red, orange, yellow, green, blue. **v22 예정**: indigo, violet, pink, brown, gray. **v23-v24 예정**: dark 변형 10색.

토큰(v21 기록 — v110 에서 팔레트 700 단계로 옮겼다, 지금 값은 Colors 의 v110 절): `chart-red` `#C73838`, `chart-orange` `#B36418`, `chart-yellow` `#8C7400`, `chart-green` `#2D8060`, `chart-blue` `#2C70BF`. sparse component(`chart-color-{name}`)로 referencing. chart는 brand 분기 비대상 — 양 brand 동일 사용. primary와 hue 비슷할 수 있으나 역할 분리(별도 토큰).

#### v20 추가, v53 vivid refresh — semantic 다크 변형 4개

다크 표면 위 alert·toast·인라인 semantic 텍스트용 lightness 변형. base는 라이트 표면 전용(흰 텍스트 fill 4.5:1↑), light는 다크 표면 위 텍스트 4.5:1↑. **현재 사용 hex는 v53 이후 Tailwind 400 톤** (DESIGN.md `### Semantic light refresh` 섹션 참조).

| 토큰 | v20 hex (이전) | v53 hex (**현재**) | 다크 표면 contrast |
|---|---|---|---|
| `success-light` | `#5DC07B` | `#4ADE80` | surface-default-dark ≥4.5:1 ✅ (Tailwind green-400) |
| `error-light` | `#F08080` | `#F87171` | surface-default-dark ≥4.5:1 ✅ (Tailwind red-400) |
| `warning-light` | `#E8A05A` | `#FB923C` | surface-default-dark ≥4.5:1 ✅ (Tailwind orange-400 — 가장 큰 hue 변화, base와 일치) |
| `info-light` | `#6FAEDF` | `#60A5FA` | surface-default-dark ≥4.5:1 ✅ (Tailwind blue-400) |

4개 컴포넌트(`alert-text-{semantic}-on-dark`)에서 lint contrast 룰로 검증 — 모두 ≥4.5:1 통과.

**채움 fill 비호환** (의도): white(`text-on-accent`)을 light 변형 위에 올리면 L 0.35~0.43이라 contrast 2.2~2.7로 미달. 다크 모드 채움 badge는 base 색 유지 + 외곽선 보강 또는 별도 패턴(향후 v21+에서 검토).

#### HR / Desk 듀얼 브랜드
- 8개 토큰 모두 양 브랜드 동일 사용 — functional state 전달은 브랜드 분기 비대상.
- 시각 차별화: `success`(forest)는 HR `primary`(emerald 계열)와 미세 hue 분리, `info`(deep navy)는 Desk primary(vibrant blue 계열)와 채도 분리. 단 단독 노출 시 식별성을 위해 컴포넌트 레벨에서 아이콘(✓/✕/!/i) 동반을 권장.
- 컴포넌트는 brand 컨텍스트(HR vs Desk) × 모드 컨텍스트(light vs dark) 매트릭스로 4값 분기 — 토큰 자체에 분기 표현됨.

### Brand refresh + Desk neutral fork (v14 추가)

브랜드 리프레시: HR/Desk **primary** 색을 더 깊고 차분한 톤으로 갱신, neutral page background를 브랜드별로 분리. 이전 `accent-*` 시리즈는 모두 `primary-*`로 rename 됨(spec 권장 명명 정합).

#### 토큰 변경 매트릭스

| 작업 | 이전 | 이후 | 비고 |
|---|---|---|---|
| rename + value | `accent-hr` `#1E7D4C` | `primary` `#357B5F` | HR 브랜드 — forest green |
| rename + value | `accent-light` `#3FBF74` | `primary-light` `#6BAE8C` | 새 base에 맞춰 lighten 도출 |
| split | `bg-page` `#F5F6FA` | `bg-page-hr` `#ECE8E5` + `bg-page-desk` `#DCDCDC` | 브랜드별 fork (HR=warm beige, Desk=light gray) |
| 유지 | `bg-page-dark` `#1A1F2E` | (변경 없음) | 다크 페어 미언급 → 공유 |

#### 변경 이유
1. **브랜드 톤 갱신**: 새 primary 색이 Porest = People + Forest 감각에 더 가깝게 정착(HR forest green, Desk deep navy).
2. **Desk neutral 분리**: B2B(HR)와 B2C(Desk)는 동일 페이지 베이스를 공유할 필요가 없음 — HR은 따뜻한 베이지, Desk는 차분한 light gray로 첫인상 차별화.
3. **명명 정합**: design.md spec은 `primary` 명명을 권장 — 기존 `accent-*` 명칭에서 `primary-*`로 정렬, 추후 spec 도구 호환성 확보.

#### lint 실측 결과 (변경 영향 6개 페어 모두 통과)

| component | bg | text | 결과 |
|---|---|---|---|
| `button-primary` | primary `#357B5F` | text-on-accent | ✅ ≥4.5:1 |
| `button-outline-on-dark` | surface-default-dark | primary-light `#6BAE8C` | ✅ ≥4.5:1 |
| `page-text-light` | bg-page-hr `#ECE8E5` | text-primary | ✅ ≥4.5:1 |
| `page-text-desk-light` | bg-page-desk `#DCDCDC` | text-primary | ✅ ≥4.5:1 |

(`npm run lint` 출력 기준: 0 errors, 0 contrast warnings.)

#### Edge case — 운영 가이드

자동 검증 미모델 페어에서 1건 contrast 미달 발견:

- **`primary` as inline 텍스트 on `bg-page-hr`**: 손계산 **4.14:1** (4.5:1 미달, 3:1 통과)
  - **운영 규칙**: HR `primary`는 **fill 전용**(button bg, badge, fill icon). 페이지 베이지 위 inline 링크·body-lg 텍스트로 사용 금지 — 본문 가독성 미달.
  - 대신 inline 링크 needs use `text-primary` (대비 13.32:1) + 밑줄/hover 시그널로 link affordance 확보.
- **`text-tertiary` on `bg-page-desk`**: 손계산 **4.01:1** ❌ — 현재 modeled 컴포넌트에 없는 페어이나, 페이지 베이스 위 직접 caption 노출 시 미달. caption은 항상 `surface-default`(흰 카드) 위에 사용 권장.

#### 다크 모드 검증 (회귀 0건)

본 변경은 라이트 모드 토큰만 수정:
- 다크 페어 토큰(`bg-page-dark`, `surface-default-dark`, `text-primary-dark` 등) 그대로 유지.
- HR 다크 채움 버튼: 새 `primary` `#357B5F` (L=0.158) on white text **5.05:1** ✅. 단 외곽 vs 다크 surface는 2.83:1로 3:1 미달 — `border-strong-dark` 보강 패턴 그대로 유효(이전 `accent-hr` 2.77과 동급).
- HR/Desk outline 다크: 새 `primary-*-light` 모든 다크 표면에서 4.62~6.23:1 통과.

#### 이전 prose 항목과의 정합

- v1 prose의 "bg-page #F5F6FA" 표기는 v14 이전 단일 token 시점 기록 — 현재는 `bg-page-hr`/`bg-page-desk`로 fork됨.
- v3 prose의 "primary 2.77" 다크 surface 대비 수치는 v7 시점 `accent-hr` `#1E7D4C` 기준 — 새 `primary` `#357B5F`는 2.83로 이동했으나 결론(3:1 미달, light 변형 필요)은 동일.
- 이전 prose는 **역사적 기록**으로 보존 — v14 시점 현행 값은 본 섹션 표 기준.

### bg-page 재통합 (v15)

v14에서 fork했던 `bg-page-hr`/`bg-page-desk`를 단일 `bg-page #F5F6FA`로 되돌립니다. HR/Desk가 동일한 페이지 베이스를 공유 — neutral 시스템 단순화.

#### 변경 매트릭스

| 작업 | 이전(v14) | 이후(v15) |
|---|---|---|
| **제거** | `bg-page-hr` `#ECE8E5` | — |
| **제거** | `bg-page-desk` `#DCDCDC` | — |
| **추가** | — | `bg-page` `#F5F6FA` (v13 이전 값으로 복귀) |
| **컴포넌트 통합** | `page-text-light` + `page-text-desk-light` | `page-text-light` (단일) |
| **유지** | `bg-page-dark` `#1A1F2E` | (그대로) |

`primary` 등 v14 브랜드 리프레시는 그대로 유지 — 본 변경은 neutral fork만 되돌림.

#### v14 edge case 해소

`bg-page #F5F6FA` (L=0.9223)는 v14 fork(L=0.812/0.716)보다 더 밝아 contrast headroom 증가:

| 페어 | v14 (fork) | v15 (unified) | 상태 |
|---|---|---|---|
| `primary` inline on bg-page | 4.14 ❌ | **4.67** ✅ | 해소 |
| `text-tertiary` on bg-page | 5.09 ✅ (HR) / 4.01 ❌ (Desk) | **5.09** ✅ | Desk 미달 해소 |

v14에서 명시했던 운영 규칙 **"primary는 fill 전용, inline link 금지"는 v15에서 무효화** — 단일 `bg-page` 위에서 `primary`를 inline link/text로 사용 가능.

#### 변경 이유
1. **운영 규칙 단순화**: v14 fork는 브랜드별 페이지 톤 차별화를 의도했으나, primary inline 4.14 미달 등 edge case가 운영 부담으로 작용. 단일 bg-page는 이 부담 제거.
2. **HR/Desk neutral 일관성**: 페이지 베이스가 동일하면 컴포넌트 동작도 동일 — 다운스트림 코드의 분기 로직 감소.
3. **브랜드 차별화는 primary로 충분**: HR `primary` `#357B5F`(forest green) vs Desk primary(deep navy 계열, `DESIGN.desk.md` 참조)의 채도·hue 차이가 이미 강력한 식별 신호 제공. 페이지 베이스까지 분기할 동기 약화.

#### lint 실측
- ✅ 0 errors / 0 contrast warnings
- 27 colors (v14 28에서 -1: bg-page-hr/desk 2개 제거, bg-page 1개 추가)
- 30 components (v14 31에서 -1: page-text-hr/desk-light 2개 통합)
- regression: false

#### v14 prose 정합 노트
- v14 prose의 "primary는 fill 전용" 운영 규칙·edge case 표는 v15 시점에서 **부분 무효화** — bg-page 통합으로 4.14 미달이 4.67로 해소됨. v14 prose는 fork 시점 기록으로 보존.
- "Desk neutral fork" 동기 부분도 보류 — 차별화는 primary 색에 위임.

### Border focus (v16 추가)

키보드 포커스 링·인터랙션 강조 외곽선용 4개 토큰. **primary-* / primary-*-light 값을 그대로 mirror하는 시맨틱 alias** — focus 역할을 명시 토큰화하여 컴포넌트 spec 작성 시 의도 명확화 + 향후 분기 여지 확보.

| 토큰 | hex (mirror) | 용도 |
|---|---|---|
| `border-focus` | `#357B5F` (= primary) | HR 라이트 표면 위 focus ring |
| `border-focus-light` | `#6BAE8C` (= primary-light) | HR 다크 표면 위 focus ring |

#### 추가 이유
1. **v3 차단 사유 해소 완료**: v3 시점 "primary가 다크 surface 3:1 미달"로 보류했던 focus 토큰 — v7에서 `primary-*-light` 도입, v14 명명 정렬, v15 운영 규칙 단순화로 차단 모두 해소.
2. **시맨틱 alias 패턴**: 값은 primary와 동일하지만 `border-focus-*` 명명으로 focus 역할 명시. 컴포넌트 spec(추후 Button·Input 등)에서 `focus-ring color = border-focus-{brand}` 형태로 의도 표현. primary가 변경되어도 focus 의미가 따라가야 한다면 mirror 유지 필요(현재는 수동 동기화).
3. **WCAG 2.4.11 (Focus Appearance, AA in WCAG 2.2)**: focus indicator가 인접 표면에 ≥3:1 contrast 요구 — 4개 토큰 모두 4.5+:1 통과 (UI 3:1 기준 대비 여유).

#### WCAG 검증 — focus ring vs 인접 surface (손계산, lint 미모델)

`backgroundColor`만 가진 sparse component(`focus-ring-*-on-*`)로 referenced — contrastCheck 미발동(textColor 부재). focus ring vs 인접 surface 대비는 spec에 borderColor 프로퍼티 없어 자동 검증 불가, 손계산 의존.

| focus ring | 인접 surface | 대비 (손계산) | 결과 |
|---|---|---|---|
| `border-focus` `#357B5F` | surface-default | 5.05 | ✅ |
| `border-focus` | surface-input | 4.51 | ✅ |
| `border-focus` | bg-page | 4.67 | ✅ |
| `border-focus-light` `#6BAE8C` | surface-default-dark | 5.49 | ✅ |
| `border-focus-light` | surface-input-dark | 4.72 | ✅ |
| `border-focus-light` | bg-page-dark | 6.23 | ✅ |

값이 primary-* mirror이므로 `button-primary-*` / `button-outline-*` 컴포넌트가 lint contrast 룰로 이미 4.5:1 검증 — focus 토큰의 contrast 안정성도 간접 보장.

#### sparse component 패턴 정당성
`focus-ring-*-on-*` 컴포넌트 4개는 textColor 없는 sparse 모델 (v13 text-disabled에서 정착). focus ring은 1px outline의 시각 요소로 textColor 페어가 자연스럽지 않음. orphan 회피 + spec 한계(no borderColor) 우회 두 목적 충족. v9 divider/outline-strong과 동일 패턴.

#### HR / Desk 듀얼 브랜드
- 각 브랜드별 dedicated focus 색 — HR forest green, Desk deep navy. 사용자 인지(어느 제품에 있는지) 즉시 전달.
- 컴포넌트 spec에서 brand context에 따라 `border-focus-{brand}`/`-light` 분기 적용. 토큰 자체에 분기 표현 완료.

## Typography

한국어 본문 가독성 우선. Pretendard를 기본 패밀리로, 영문 fallback Inter.

### v100 — SEED 타입 스케일 (2026-09-29)

당근 SEED 의 타이포그래피 토큰을 그대로 들인다. 크기는 t1(11px) ~ t14(48px) 14단계이고, 줄 높이는 크기마다 SEED 와 같은 px 로 정해져 있다. 굵기는 400 · 500 · 700 셋만 쓴다.

| 토큰 | 크기 | 줄 높이 | 배수 | 쓰는 곳(SEED 기준) |
|---|---|---|---|---|
| `text-t1` | 11px | 15px | ×1.36 | 본문 · 장식 글자 |
| `text-t2` | 12px | 16px | ×1.33 | 본문 · 장식 글자 |
| `text-t3` | 13px | 18px | ×1.38 | 본문 · 장식 글자 |
| `text-t4` | 14px | 19px | ×1.36 | 본문 · 장식 글자 |
| `text-t5` | 16px | 22px | ×1.38 | 본문 · 장식 글자 |
| `text-t6` | 18px | 24px | ×1.33 | 제목 · 주요 글자 |
| `text-t7` | 20px | 27px | ×1.35 | 제목 · 주요 글자 |
| `text-t8` | 22px | 30px | ×1.36 | 제목 · 주요 글자 |
| `text-t9` | 24px | 32px | ×1.33 | 제목 · 주요 글자 |
| `text-t10` | 26px | 35px | ×1.35 | 제목 · 주요 글자 |
| `text-t11` | 28px | 38px | ×1.36 | 큰 화면 제목 — `sm` 중단점 이상 |
| `text-t12` | 32px | 42px | ×1.31 | 큰 화면 제목 — `sm` 중단점 이상 |
| `text-t13` | 40px | 52px | ×1.30 | 큰 화면 제목 — `sm` 중단점 이상 |
| `text-t14` | 48px | 60px | ×1.25 | 큰 화면 제목 — `sm` 중단점 이상 |

역할 스타일:

| 토큰 | 크기 / 굵기 / 줄 높이 | 쓰는 곳 |
|---|---|---|
| `text-screen-title` | 26px / 700 / 35px | 화면 제목 |
| `text-article-body` | 16px / 400 / 24px | 긴 글 본문(×1.5) |
| `text-article-note` | 14px / 400 / 22px | 긴 글 보조(×1.57) |

- **굵기**: 토큰의 굵기는 400 이다. 강조는 `font-medium`(500) · `font-bold`(700) 인라인 modifier 로 준다 — SEED 의 t5Medium · t5Bold 와 같다. 600 은 쓰지 않는다. 옛 title-md · badge 가 쓰던 600 은 옮길 때 500 이나 700 으로 정한다.
- **줄 높이**: UI 글자는 SEED 값(×1.35 안팎), 긴 글은 article-body · article-note(×1.5 안팎). v82 의 "한국어 본문 줄 높이 1.5+" 는 이제 긴 글에만 적용한다.
- **옛 15단계**(아래 v82)는 값 그대로 둔다. 컴포넌트는 2단계에서 SEED 와 하나씩 비교할 때 옮긴다. 본문 body-md(15px)는 자리마다 다르게 옮긴다 — 긴 글은 16(article-body), UI 는 14(t4).
- **옛 이름 → 가까운 새 이름**(옮길 때 참고): display-lg → t13 · display-md → t12 · display-sm → t9 · title-lg → t7 + bold · title-md → t6 + 500 또는 700 · title-sm → t5 + medium · body-lg → t5 또는 article-body · body-md → 자리마다 t4 · t5 · article-body · body-sm → t4 · label-md → t4 + medium · label-sm → t3 · caption → t2 · badge → t1 + 500 또는 700. display-xl(56px) · overline(10px)은 SEED 범위 밖이고 스펙에서 쓰는 곳이 없어 걷을 후보다.
- **단위(v104)**: 값은 여기 px 로 적고, 웹에는 rem(÷16)으로 내보낸다 — 사용자의 글자 크기 설정을 따른다. 커지면 깨지는 자리(배지 · 탭 라벨 · 좁은 칸의 숫자)는 `-static`(px 그대로)을 쓴다(text-t5-static 처럼 — 내보낼 때 생긴다). 앱은 OS 글자 크기를 따르고(Flutter 기본), 같은 자리만 `TextScaler.noScaling` 으로 고정한다. SEED 의 rem · static 두 벌과 같다 — 사용자 결정(2026-09-29).
- 사용자 결정(2026-09-29 — 글자 A: SEED 스케일 그대로, 본문 15px 은 자리마다). "한 번에 토큰 5개" 규칙의 예외다.

### v114 — 줄바꿈: 단어 단위 (2026-10-01)

한국어는 띄어쓰기 단위(어절)로 줄을 바꾼다. 브라우저와 Flutter 의 기본값은 글자(음절) 사이 어디서나 끊어서, 좁은 칸에서 낱말이 두 줄로 갈린다("권한입니 / 다.", "3개 / 월"). 컴포넌트 예시 글 12개를 폰 폭에 그려 보니 7개가 낱말 중간에서 끊겼고, 단어 단위로 바꿔도 줄이 늘어난 글은 없었다.

```css
html {
  word-break: keep-all;
  overflow-wrap: break-word;
}
```

| 플랫폼 | 하는 일 | 어디에 |
|---|---|---|
| 웹 | `word-break: keep-all` + `overflow-wrap: break-word` — 낱말 사이에서만 줄을 바꾸고, 한 줄보다 긴 낱말만 칸 끝에서 끊는다 | 문서 맨 바깥(`html`) 한 번 — 모든 화면 |
| 앱(Flutter) | 낱말 안 글자 사이에 WORD JOINER(U+2060)를 넣어 보여 준다 — Flutter 에는 이 설정이 없다 | 공용 글자 위젯 한 곳 — 보여 주는 글만 |

- `keep-all` 만 쓰면 띄어쓰기 없는 긴 낱말(긴 이름 · 이메일 · 주소)이 칸 밖으로 넘친다 — `overflow-wrap: break-word` 가 그런 낱말만 칸 끝에서 끊는다. 지금 칸 밖으로 넘치던 긴 영문도 칸 안에 들어온다. `anywhere` 도 같은 결과지만 표 칸 폭까지 좁혀 코드 이름이 글자 단위로 쪼개진다 — SEED 와 같은 `break-word` 를 쓴다.
- 폭이 내용을 따르는 flex 항목은 `min-width: 0` 을 둬야 긴 낱말이 칸 안에서 끊긴다(컴포넌트 레시피는 이미 둔다).
- 영문은 원래 단어 단위라 바뀌지 않는다. 일본어는 `keep-all` 이 잘못 끊는다(SEED 레시피 주석) — porest 는 한국어 · 영문만 쓴다.
- 앱의 이음 문자는 보여 주는 글에만 넣는다 — 입력칸 · 복사할 글 · 검색어 · 서버로 보낼 값에는 넣지 않는다. Flutter 3.41 에서 시험했다: 기본값은 "휴 / 가를" · "권 / 한입니다" 처럼 끊고, 이음 문자를 넣으면 낱말 사이에서만 끊으며 한 줄보다 긴 낱말은 그래도 끊는다.
- 한 줄 말줄임 · 줄 수 제한은 그대로 쓴다 — 줄을 바꾸는 자리만 바뀐다.
- 당근(SEED)은 전역 규칙 없이 읽는 글(게시글 본문 · 시트 · 패널 제목 · 도움말 말풍선)만 단어 단위이고, 컴포넌트 라벨 · 설명은 글자 단위다(daangn.com CSS · SEED 레시피, 2026-10-01). porest 는 컴포넌트 라벨 · 설명까지 단어 단위로 한다 — 사용자 결정(2026-10-01).
- 제품은 앱 적용 단계에서 옮긴다 — Desk 웹은 4곳(카드 혜택 2 · 일정 상세 2)에만 손으로 `keep-all` 을 걸었고 HR 웹 · Desk 앱은 없다. 전역 규칙을 걸고 그 4곳은 걷는다.

### v5 추가 — 5단계 타입 스케일 (기록 — 지금 스케일은 위 v100)

| 토큰 | size | weight | line-height | 주 용도 |
|---|---|---|---|---|
| `caption` | 12px | 400 | 1.5 | 메타·헬프·타임스탬프 |
| `body` | 15px | 400 | 1.6 | default 본문 (한국어 가독성) |
| `body-strong` | 15px | 600 | 1.6 | 본문 강조·입력 라벨·버튼 텍스트 |
| `heading-md` | 18px | 600 | 1.4 | 카드·섹션 제목 |
| `heading-lg` | 24px | 700 | 1.3 | 페이지 제목 |

#### 추가 이유
1. v1~v4 색상·spacing 토큰만으로는 컴포넌트의 텍스트 치수가 결정되지 않음 — 카드 제목 vs 본문, 라벨 vs 캡션의 시각 위계 의사결정 차단 요소 해소.
2. 5단계는 80% 이상 일반 컴포넌트(버튼·카드·입력·헬프 텍스트·페이지 헤더)를 커버. `heading-sm(16px)`, `heading-xl(32px+)`는 사용 사례 등장 후 추가 — 추측성 선행 토큰 회피.
3. `body` 15px / line-height 1.6은 한국어 본문 가독성 기준(Toss·네이버 본문 톤). 14px도 흔하나 한글 hinting 안정성과 노안 대응을 고려해 15px 채택.

#### 폰트 패밀리
모든 토큰: `Pretendard, Inter, sans-serif`
- **Pretendard**: 한글 hinting과 영문 호환을 모두 지원하는 한국어 우선 가변폰트(CLAUDE.md 규칙).
- **Inter**: 영문 fallback — Pretendard 미설치 환경에서도 일관된 영문 자형.
- **sans-serif**: 시스템 fallback.

#### WCAG 검증
- **1.4.3 Contrast (4.5:1 본문)**: 본 토큰은 색상이 아닌 치수만 정의. 색상 대비는 v2 `text-*` 토큰이 담당, 모든 표면 페어에서 사전 통과 완료(`text-primary`: 11.40~16.22, `text-secondary`: 6.32~7.41, `text-on-accent`: 5.02~5.16).
- **1.4.12 Text Spacing (line-height ≥1.5 본문)**: `caption` 1.5, `body`/`body-strong` 1.6 — 모두 통과. 헤딩은 단락 본문 비대상.
- **1.4.4 Resize text (200% zoom)**: px 단위 사용하나 브라우저 zoom에 정상 대응.
- **한국어 자형 안정성**: Pretendard는 한글 폭(전각) 자모와 영문 폭(반각)을 균형 있게 처리, 본문 lh 1.6은 한글 받침 영역 가독성을 확보.

#### HR / Desk 듀얼 브랜드
- 모든 typography 토큰은 brand-neutral — 양 브랜드 동일 스케일.
- 향후 브랜드별 분위기 조정이 필요하면 컴포넌트 레벨에서 weight·tracking 조정으로 처리(예: HR 헤딩 weight 700, Desk 헤딩 weight 600). 토큰 자체 분기 불필요.

## Layout

### v101 — SEED 레이아웃 (2026-09-29)

당근 SEED 의 Layout 문서를 기준으로 중단점 · 콘텐츠 폭 · 여백 · 사이드바를 정한다. 사용자가 2026-09-29 porest 와 SEED 를 나란히 놓은 비교 페이지를 보고 네 가지 모두 SEED 쪽을 골랐다. 앱 화면 가장자리만 porest 값(24px)을 둔다 — 2026-09-14 에 정한 앱 규칙이다.

**아직 두 웹 · 앱에는 들어가지 않았다.** 앱마다 PR 을 따로 낸다. 그 전까지는 제품 코드의 값(Desk 웹 중단점 736 · 좌우 여백 28 · 사이드바 256, HR 웹 Tailwind 기본 중단점 · 사이드바 288 등)이 이 표와 다른 게 정상이다.

출처: seed-design.io Foundations › Layout, `@seed-design/qvism-preset` 의 layout · side-navigation 레시피, rootage `dimension`(역할 간격). SEED 는 Apache-2.0 이다.

#### 중단점

| 토큰 | 값 | 구간 |
|---|---|---|
| `breakpoint-sm` | `480px` | 480 – 767 · 큰 폰 · 작은 태블릿 |
| `breakpoint-md` | `768px` | 768 – 1279 · 사이드 내비게이션이 보이기 시작한다 |
| `breakpoint-lg` | `1280px` | 1280 – 1439 · 데스크톱 |
| `breakpoint-xl` | `1440px` | 1440 이상 · 넓은 데스크톱 |

| 구간 | 폭 | 칸 | 칸 사이 | 좌우 여백 |
|---|---|---|---|---|
| 기본(base) | 0 – 479 | 한 줄 | 16 · `layout-gutter-narrow` | 24 · `spacing-global-gutter` |
| sm | 480 – 767 | 한 줄 | 16 · `layout-gutter-narrow` | 24 · `spacing-global-gutter` |
| md | 768 – 1279 | 밀도대로(8 · 12) | 24 · `layout-gutter` | 32 · `layout-margin` |
| lg | 1280 – 1439 | 밀도대로(8 · 12) | 24 · `layout-gutter` | 32 · `layout-margin` |
| xl | 1440 이상 | 밀도대로(8 · 12) | 24 · `layout-gutter` | 32 · `layout-margin` |

- 모바일 우선이다. 0 – 479 는 기본(base)이라 토큰이 없다.
- 화면 틀을 JS 로 바꾸는 기준도 이 값을 쓴다 — 모바일 틀(하단 탭바) ↔ 사이드바 틀은 `breakpoint-md`. 스타일(`md:`)과 화면 틀이 다른 폭에서 바뀌면 그 사이에서 모바일 틀 안에 태블릿 스타일이 켜진다(v101 전 Desk 웹의 736 – 767).
- 옛 `2xl`(1441px)은 없앴다 — 두 웹 모두 쓰는 곳이 없었다. Tailwind 로 내보낼 때 기본 중단점을 먼저 지운다(`--breakpoint-*: initial`). 안 지우면 Tailwind 기본 2xl(1536px)이 살아남는다.
- v54 의 Apple Store 기준(640 · 736 · 834 · 1069 · 1441)은 아래 기록 절과 `DESIGN.history/v101-seed-layout.md` 에 있다.

#### 콘텐츠 폭 — 밀도

화면마다 밀도를 하나 고르고, 밀도가 콘텐츠의 최대 폭을 정한다. 폭을 제한하면 가운데 정렬한다(`margin-inline: auto`).

| 토큰 | 값 | 뜻 |
|---|---|---|
| `layout-max-low` | `720px` | low 밀도의 최대 폭 · medium 밀도의 768 – 1279 최대 폭 |
| `layout-max-medium` | `1040px` | medium 밀도의 1280 이상 최대 폭 |

| 밀도 | 정렬 | 칸 | 칸 사이 | 좌우 여백 | 768 – 1279 | 1280 이상 | 쓰는 화면 |
|---|---|---|---|---|---|---|---|
| low | 가운데(Centered) | 8 | 24 | 32 | 720 | 720 | 간단한 설정 창 · 대시보드 요약 |
| medium (기본) | 가운데(Centered) | 12 | 24 | 32 | 720 | 1040 | 일반 관리 도구 · 데이터 목록 |
| high | 가변(Fluid) | 전체 폭 | — | 32 | 제한 없음 | 제한 없음 | 대량 데이터 시각화 · 편집 도구 |

- 768 미만은 밀도와 상관없이 칸 없이 화면 폭 전체를 쓴다. 칸 수는 밀도로만 정한다 — SEED 와 같다(v103, 2026-09-29).
- high 는 최소 폭도 두지 않는다. SEED 는 최소 1040 이지만 태블릿 세로(768)에서 가로 스크롤이 생겨 두지 않았다(v103).
- 어느 화면이 어느 밀도인지는 앱에 적용할 때 화면 목록을 만들어 정한다.

#### 콘텐츠 레이아웃

서비스 소개처럼 정보를 전하는 페이지(porest-home 등)에 쓴다 — 두 웹의 관리 화면은 위 밀도를 쓴다. 12칸이고 `breakpoint-lg`(1280) 이상에서 가운데 정렬한다(v103, 2026-09-29).

| 토큰 | 값 | 뜻 |
|---|---|---|
| `layout-max-content` | `1040px` | 콘텐츠 레이아웃 기본 최대 폭 — 읽기에 몰입하게 |
| `layout-max-content-wide` | `1280px` | 넓게 훑어보는 페이지(검색 결과 · 목록)의 최대 폭 |

- `layout-max-medium` 과 값(1040)이 같지만 뜻이 달라 따로 둔다 — 한쪽만 바꿀 수 있게.
- 아직 porest-home 에 들어가지 않았다. 그 레포를 고칠 때 맞춘다.

#### 여백 · 칸 사이

| 토큰 | 값 | 뜻 |
|---|---|---|
| `layout-margin` | `32px` | 웹 페이지 좌우 여백 · 768 이상 |
| `layout-gutter` | `24px` | 웹 칸 · 카드 사이 · 768 이상 |
| `layout-gutter-narrow` | `16px` | 칸 · 카드 사이 · 768 미만(v103) |

- 768 미만의 화면 가장자리는 `spacing-global-gutter`(24px)다. 칸 사이(16)가 가장자리(24)보다 좁아 카드 묶음이 한 덩어리로 보인다.
- SEED 문서 안에서도 값이 둘이다 — Dashboard 격자 표는 여백 32 · 칸 사이 24, Breakpoint 표는 768 이상 여백 24 · 칸 사이 32(768 미만 여백 12 · 칸 사이 16). 두 웹 모두 관리 도구라 Dashboard 격자를 따른다.

#### 역할 간격

SEED 가 자리에 이름을 붙인 간격이다(SEED 이름은 `spacing-x.*` 수평 · `spacing-y.*` 수직). porest 는 머리말의 spacing 블록에 이름만 두고, 값은 v98 스케일 위에 있다.

| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `spacing-global-gutter` | 24px · `spacing-x6` | 수평 — 화면 전체의 기본 좌우 여백. SEED 는 16px — porest 는 앱 규칙(2026-09-14, 본문 24)을 둔다 |
| `spacing-between-chips` | 8px · `spacing-x2` | 수평 — 칩 사이 |
| `spacing-component-default` | 12px · `spacing-x3` | 수직 — 따로 정한 간격이 없는 컴포넌트 사이 |
| `spacing-between-text` | 6px · `spacing-x1_5` | 수직 — 글 요소 사이 |
| `spacing-nav-to-title` | 20px · `spacing-x5` | 수직 — 상단 내비게이션과 화면 제목 사이 |
| `spacing-screen-bottom` | 56px · `spacing-x14` | 수직 — 화면 맨 아래 여백 |

- Desk 앱의 화면 좌우 여백(2026-09-14 규칙): 본문은 24. 주간 띠 · 캘린더 격자 안 칸의 인셋 · 카테고리 탭 바의 전폭은 의도한 예외다.

#### 사이드바 · 영역

| 토큰 | 값 | 뜻 |
|---|---|---|
| `layout-sidebar` | `240px` | 사이드 내비게이션 폭 |
| `layout-sidebar-collapsed` | `56px` | 접은 사이드 내비게이션(아이콘만) |

- 화면은 머리(GNB) · 사이드 내비게이션 · 본문 · 오른쪽 보조 영역(Aside) 넷으로 나눈다.
- 사이드 내비게이션은 `breakpoint-md`(768px) 이상에서 보인다. 그 아래에서는 머리의 메뉴로 들어간다 — Desk 웹은 앱과 같은 하단 탭바.
- 머리(상단 바) 높이는 SEED 문서에 없어 정하지 않았다 — 지금 Desk 웹 56 · HR 웹 48.
- 사이드 내비게이션 안쪽 치수(머리 · 항목 여백 · 높이)는 컴포넌트 단계에서 SEED side navigation 과 비교해 정한다.

### v98 — SEED 간격 스케일 (2026-09-29)

당근 SEED 의 dimension 스케일을 그대로 들인다 — 2px 단위 19단계, 이름도 SEED 와 같다(`x1` = 4px). 지금까지의 7단계(`xs` … `3xl`)는 모두 이 눈금 위에 있어 값이 바뀌지 않고, 옮기는 동안 같은 값의 별칭으로 남는다.

| 토큰 | 값 | 옛 이름(별칭) |
|---|---|---|
| `spacing-x0_5` | 2px | — |
| `spacing-x1` | 4px | `spacing-xs` |
| `spacing-x1_5` | 6px | — |
| `spacing-x2` | 8px | `spacing-sm` |
| `spacing-x2_5` | 10px | — |
| `spacing-x3` | 12px | `spacing-md` |
| `spacing-x3_5` | 14px | — |
| `spacing-x4` | 16px | `spacing-lg` |
| `spacing-x4_5` | 18px | — |
| `spacing-x5` | 20px | — |
| `spacing-x6` | 24px | `spacing-xl` |
| `spacing-x7` | 28px | — |
| `spacing-x8` | 32px | `spacing-2xl` |
| `spacing-x9` | 36px | — |
| `spacing-x10` | 40px | — |
| `spacing-x12` | 48px | `spacing-3xl` |
| `spacing-x13` | 52px | — |
| `spacing-x14` | 56px | — |
| `spacing-x16` | 64px | — |

- 새로 쓰는 간격은 SEED 이름으로 적는다. 옛 이름은 컴포넌트 스펙 · 제품이 다 옮기면 걷는다 — 컴포넌트 스펙은 2단계에서 SEED 와 하나씩 비교할 때 옮긴다.
- "한 번에 토큰 5개까지" 규칙의 예외다. 사용자가 2026-09-29 SEED 스케일 전체를 고르며 그 대가를 알고 정했다.
- 역할 간격(SEED 의 global-gutter · component-default 등)은 Layout 단계에서 따로 정한다.
- 이유: 스펙 52개가 토큰 없이 px 로 적은 간격 22곳 가운데 20곳(2 · 10 · 14 · 18 · 20 · 36px)이 SEED 눈금에 있다. 7단계로는 이 값들을 토큰으로 가리킬 수 없었다.

### v4 추가 — 4px 베이스 5단계 (v98 에서 SEED 스케일로 바뀜 — 아래는 기록)

CLAUDE.md "4px 베이스 추천" 규칙을 준수하는 t-shirt 사이즈 스케일. 모든 값은 4의 배수이며, 의미 기반 명명(`xs/sm/md/lg/xl`)으로 값에 의존하지 않습니다.

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `xs` | 4px | atomic — 아이콘 inner padding, hairline gap |
| `sm` | 8px | tight — 라벨↔입력 gap, 인라인 아이콘↔텍스트 |
| `md` | 12px | comfortable — 버튼 padding-y, 카드 inner |
| `lg` | 16px | default — 스택 gap, 카드 padding (가장 자주) |
| `xl` | 24px | section — 섹션 간 분리 |

#### 추가 이유
1. v1~v3 색상 토큰만으로는 컴포넌트 치수가 결정되지 않음 — 버튼 padding, 카드 inner, 스택 gap 의사결정의 차단 요소 해소.
2. 5단계는 80% 일반 컴포넌트 사용을 커버 — 추측성 hero/major(`2xl`, `3xl`)는 사용 사례 등장 후 추가.
3. t-shirt 사이즈는 의미 기반 명명 — `space-4` 같은 값-기반 명명을 피해 향후 base 수정(예: 8px 베이스 전환) 시 명명 안정성 확보.

#### 검증
- **WCAG 1.4.3 / 1.4.11**: 비대상(spacing은 색상 아님).
- **WCAG 2.5.5 (Target Size, AAA 권장 44×44px)**: 버튼 패턴 점검 — `body-lg` line-height = 15px × 1.6 = **24px**. `md(12px)` padding-y 적용 시 12+24+12 = **48px** ✅ (44px 통과). `sm(8px)` padding-y는 8+24+8 = 40px로 44px 미달 → 보조 액션·dense table 인라인 컨트롤에만 사용. (※ v4 작성 시 lh를 20px로 잘못 표기, v9에서 수정)
- **WCAG 1.4.12 (Text Spacing)**: 사용자가 letter/word spacing을 오버라이드해도 4px 베이스는 절대값이라 영향 없음.

#### HR / Desk 듀얼 브랜드
- spacing은 neutral 시스템 — 브랜드 분기 없음. HR(B2B 데이터 밀도 위주)·Desk(B2C 여백 위주) 모두 동일 스케일 사용, 화면별 적용 강도(예: HR은 `md` 위주, Desk는 `lg` 위주)로 분기.

### Breakpoints (v54 — v101 에서 SEED 값으로 바뀜, 아래는 기록)

아래는 v54 의 기록이다. 지금 값은 위 v101 절에 있다 — 이 표는 토큰으로 읽히지 않게 이름 · 값의 백틱을 뺐다.

반응형 layout breakpoint — 5단계 (Apple Store reference). spec이 breakpoint 카테고리 미지원이라 prose-token 패턴(shadow/motion/overlay와 동일) — yaml 정의 없이 표만 운영. DESIGN.md / .hr.md / .desk.md 수동 동기.

| 토큰 | 값 | 의미 (Apple Store 가이드) |
|---|---|---|
| breakpoint-sm | 640px | Phone max — 이하 single-column |
| breakpoint-md | 736px | Tablet portrait — global nav hamburger |
| breakpoint-lg | 834px | Tablet landscape — full nav, 3-col → 2-col |
| breakpoint-xl | 1069px | Desktop — full layout, 4-5 col grids |
| breakpoint-2xl | 1441px | Wide — content lock at 1440px |

#### HR 적용 가이드 (B2B 데이터 밀도)
HR은 데이터 그리드(직원 목록, 결재 큐, 출퇴근 표) 위주라 desktop(`breakpoint-xl` 1069+) 기본 가정. tablet portrait(736~833)에서는 inline action(승인/반려)을 dropdown으로 collapse, phone(640 이하)은 carded list로 전환. 모바일 화면(approval 앱 등)은 `lg` 사이즈 컴포넌트로 44×44 hit target 충족.

#### 사용 패턴
- min-width (mobile-first): `@media (min-width: var(--breakpoint-lg))` — 834 이상 (tablet landscape +).
- `--breakpoint-*` namespace는 Tailwind v4 표준이라 별칭 없이 직접 사용. 값은 Apple Store 톤 (Tailwind default와 다름).

### Touch targets (v59 추가, prose-token)

WCAG 2.5.5 AAA + Apple Store reference 톤 5 토큰화 — DESIGN.md shared baseline과 동일. spec 외부(prose-token)라 자체 namespace.

| 토큰 | 값 | 의미 |
|---|---|---|
| `touch-min` | `44px` | WCAG minimum (default — 모든 hit target 권장) |
| `touch-pill-w` | `100px` | Pill CTA min-width |
| `touch-circular` | `44px` | Circular chip (= touch-min alias) |
| `touch-nav-h` | `32px` | Precision desktop nav height (`breakpoint-lg` 이상) |
| `touch-nav-w` | `80px` | Precision desktop nav min-width |

#### HR 적용 가이드 (B2B 데이터 밀도)
HR은 데이터 그리드 inline action(승인/반려 row 액션, 결재 메뉴, 평가 등급 선택) 위주 — desktop(`breakpoint-lg` 1280+)에서 `touch-nav-h` 32 / `touch-nav-w` 80 적극 사용 (mouse pointer 가정, 정밀도 우선). 모바일 화면(approval 앱, 모바일 dashboard)은 `touch-min` 44 / `touch-circular` 44 strict 적용 — 데이터 밀도 톤이지만 hit target은 보수.

### Z-index (v65 추가, prose-token)

레이어 stacking order 6 토큰 — DESIGN.md shared baseline과 동일.

| 토큰 | 값 | 주 사용 |
|---|---|---|
| `z-base` | `0` | default 평면 |
| `z-dropdown` | `1000` | dropdown / select / autocomplete / tooltip |
| `z-sticky` | `1100` | sticky header / 결재 큐 sticky 패널 / sticky CTA |
| `z-drawer` | `1200` | side drawer (직원 detail panel, 권한 설정 panel) |
| `z-modal` | `1300` | modal dialog (휴가 신청 확인 / 결재 의견) |
| `z-toast` | `1400` | toast (결재 승인 알림 등) |

#### HR 적용 가이드
- **결재 큐 sticky 패널**: 우측 sticky list = `z-sticky` — 페이지 스크롤과 독립.
- **직원 detail drawer**: 직원 클릭 시 우측 슬라이드 = `z-drawer` — 페이지 콘텐츠 위, 모달 아래.
- **권한 설정 modal**: 권한 변경 확인 = `z-modal` — drawer가 열린 상태에서도 modal이 위.
- **결재 승인 toast**: 어떤 layer 위에서도 최상단 = `z-toast`.
- isolation 권장: 데이터 그리드 inline dropdown은 `isolation: isolate`로 island 격리 — 외부 layer와 우선순위 무관.

### RTL support (v76 추가, prose-only)

DESIGN.md baseline 정의 참고 — CSS logical property 기반 LTR ↔ RTL 자동 분기.

#### HR 적용 컨텍스트
- **현 시점 active 사용 0** — Porest HR 1차 시장 한국어(LTR). RTL active 사용은 향후 글로벌 확장 시점에 평가.
- **신규 컴포넌트 spec 작성 시 logical 우선** — `padding-inline-start`/`end`, `margin-inline-*`, `border-start-start-radius`, `inset-inline-*`, `text-align: start/end`. 추가 비용 0.
- **결재 큐 sticky panel**: 우측 sticky → RTL 시 좌측. `inset-inline-end: 0` 선언 시 자동.
- **직원 detail drawer**: 우측 슬라이드 → RTL 시 좌측에서 등장. keyframe `slide-in-left` ↔ `slide-in-right` `:dir(rtl)` 분기 필요.
- **결재 row chevron icon**: forward `>` → RTL 시 mirror `<` (transform: scaleX(-1)).
- **사번 / 결재번호** (HR-2026-0001 같은 LTR 식별자): RTL 환경에서도 LTR 강제 (`<bdi>` 또는 `direction: ltr`).

## Elevation & Depth

### v104 — SEED 고도 (2026-09-29)

당근 SEED 의 Elevation 을 들인다. 사용자가 2026-09-29 "구조는 SEED, 값은 porest" 를 골랐다 — 고도 모델과 규칙은 SEED, 그림자 값은 porest 의 청회색 4단계(v12 · v25) 그대로 s1 ~ s4 로 부른다. 출처: seed-design.io Foundations › Elevation(Apache-2.0).

#### 쌓임 맥락 — Global · Local

- **Global** — 화면 전체의 구조적 층. 제품 화면 자체와 그 위를 덮는 컨테이너(시트 · 경고창).
- **Local** — 한 층 안에서 콘텐츠끼리의 깊이. 항상 자기가 속한 Global 층 위에 놓인다.
- 새로 덮인 층(시트)은 곧 새 기준이 된다 — 그 안의 툴팁 · 메뉴는 그 층을 바닥으로 쌓인다(페이지 위 페이지).

| Global 층 | 무엇 | porest |
|---|---|---|
| 0 | 바닥 — 스크롤되는 모든 콘텐츠 뒤 | `bg-layer-basement` |
| 1 | 기본 — 카드 · 목록 · 입력칸 · 상단 내비게이션 | `bg-layer-default` |
| 2 | 시트 · 메뉴 시트 · 서랍 — 화면을 덮는 새 쌓임 맥락 | `z-drawer` |
| 3 | 경고창 — 가장 급한 정보, 다른 모달보다도 위 | `z-modal` |

| Local 층 | 무엇 | porest |
|---|---|---|
| 1 | 기본 콘텐츠 — 목록 · 탭 · 알림 띠 · 상단 내비게이션 | 층의 표면 |
| 2 | 떠 있는 동작 — 플로팅 버튼 | `z-sticky` |
| 3 | 잠깐 뜨는 알림 — 토스트 | `z-toast` |

- 같은 층 안에서 겹칠 때(스크롤되는 목록이 상단 내비게이션 아래로)는 층을 올리지 않는다 — 그림자나 선으로 구분만 준다.

#### 고도를 드러내는 세 가지

- **표면 색** — 배경의 밝기 · 채도를 바꾼다(스낵바 · 플로팅 버튼). 다크 모드는 높을수록 밝아진다(`bg-layer-floating`).
- **그림자** — 떠 있는 높이를 그림자의 크기 · 퍼짐 · 투명도로. 다크 모드에서 잘 안 보이므로 **화면에서 주목도가 높은 몇 안 되는 요소에만** 쓴다.
- **선** — 가장자리에 테두리를 둬 영역을 나눈다(하단 탭바).

#### 그림자

| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `shadow-s1` | `0 1px 2px 0 rgba(15, 18, 28, 0.05)` | 카드 정지 상태(옛 `shadow-sm`) |
| `shadow-s2` | `0 2px 8px -1px rgba(15, 18, 28, 0.08), 0 1px 3px -1px rgba(15, 18, 28, 0.04)` | 드롭다운 · 툴팁 · 떠 있는 버튼(옛 `shadow-md`) |
| `shadow-s3` | `0 8px 24px -4px rgba(15, 18, 28, 0.10), 0 2px 6px -2px rgba(15, 18, 28, 0.05)` | 팝오버 · 작은 모달(옛 `shadow-lg`) |
| `shadow-s4` | `0 24px 48px -8px rgba(15, 18, 28, 0.16), 0 8px 16px -4px rgba(15, 18, 28, 0.08)` | 큰 모달 · 서랍(옛 `shadow-xl`) |
| `shadow-s1-dark` | `0 1px 2px 0 rgba(0, 0, 0, 0.30), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` | 다크 — s1 |
| `shadow-s2-dark` | `0 2px 8px -1px rgba(0, 0, 0, 0.40), 0 1px 3px -1px rgba(0, 0, 0, 0.20), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)` | 다크 — s2 |
| `shadow-s3-dark` | `0 8px 24px -4px rgba(0, 0, 0, 0.50), 0 2px 6px -2px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)` | 다크 — s3 |
| `shadow-s4-dark` | `0 24px 48px -8px rgba(0, 0, 0, 0.60), 0 8px 16px -4px rgba(0, 0, 0, 0.30), inset 0 1px 0 0 rgba(255, 255, 255, 0.10)` | 다크 — s4 |

- SEED 는 3단계(s1 ~ s3, 검정 한 겹)다. porest 는 큰 모달 · 서랍용 한 단계를 더 둔다.
- 옛 이름(`shadow-sm` · `md` · `lg` · `xl` 과 `-dark`)은 같은 값의 별칭이다 — 아래 v12 · v25 표.
- 모달 · 시트 뒤를 덮는 딤은 v43 의 `overlay-dim-light` · `overlay-dim-dark` 를 그대로 쓴다(SEED 의 overlay 0.45 · overlay-muted 0.17 은 들이지 않았다).

Porest는 **Tonal Layers**(표면 휘도 차)를 1차 elevation 수단으로, **Layered Shadow**를 2차 보조 수단으로 사용합니다 — Toss 톤의 절제된 깊이감.

### v12 추가 — 4단계 shadow 레시피 (prose-token)

> **spec 한계 명시**: design.md spec은 shadow를 공식 YAML 토큰 타입으로 형식화하지 않습니다(`### Design Tokens` 서브섹션 부재). 따라서 본 절의 토큰은 **prose-token** 형태로 markdown 표에 정의 — `colors:`/`typography:` 등의 정형 토큰과 달리 `npm run lint` 자동 검증 비대상. **export 통합(v30)**: `scripts/build-tailwind-v4.mjs`가 DESIGN\*.md를 직접 파싱해 **Tailwind v4 `@theme` CSS**로 빌드 — colors / typography(`--text-*` + `--line-height` / `--font-weight` modifier) / radius / spacing + prose shadow 8종을 모두 포함. 결과는 `exports/tokens.css` / `tokens.hr.css` / `tokens.desk.css`. DTCG export(`npm run export:dtcg`)는 design.md 기본 export 사용 — DTCG draft의 shadow `$type`은 단일 shadow object만 지원해 다중 layer/inset shadow는 매핑 손실 → DTCG에서는 shadow 누락, prose 정의를 직접 참조.

| 토큰 | 값 (CSS box-shadow) | 주 용도 |
|---|---|---|
| `shadow-sm` | `0 1px 2px 0 rgba(15, 18, 28, 0.05)` | 카드 정지 상태(매우 미묘) |
| `shadow-md` | `0 2px 8px -1px rgba(15, 18, 28, 0.08), 0 1px 3px -1px rgba(15, 18, 28, 0.04)` | 드롭다운·툴팁·hover 상태 카드 |
| `shadow-lg` | `0 8px 24px -4px rgba(15, 18, 28, 0.10), 0 2px 6px -2px rgba(15, 18, 28, 0.05)` | popover·작은 모달 |
| `shadow-xl` | `0 24px 48px -8px rgba(15, 18, 28, 0.16), 0 8px 16px -4px rgba(15, 18, 28, 0.08)` | 큰 모달·drawer·hero overlay |

shadow base color `rgba(15, 18, 28, ...)`는 `bg-page-dark`(`#1A1F2E`)에 가까운 cool-neutral 흑색으로, page bg(`#F5F6FA`)와 자연스럽게 어우러지도록 선택. 순수 검정(`#000`)은 명도 차가 과해 광택 인상.

#### 추가 이유
1. v1~v11에서 색상·텍스트·간격·라운드는 갖춰졌으나 popover·dropdown·modal 분리는 표면 휘도 차만으로 부족 — 동일한 `surface-default`(`#FFFFFF`) 위에 또 다른 `surface-default`를 띄울 때 식별 수단 필요.
2. **4단계로 한정**(5 한도 중 1개 여분): Toss 류 절제된 elevation. `2xl`은 hero 대형 overlay 등장 시 추가.
3. 모든 shadow는 동일 base color + opacity 누적 — 일관 톤.

#### Tonal Layers (1차 elevation)
shadow 추가 전에 surface 휘도 차로 해결 가능한지 확인 — 가능하면 그쪽 우선:
- **카드 vs 페이지**: `surface-default`(L=1.0) on `bg-page`(L=0.92) 차이로 식별 가능 → shadow 불필요 또는 `shadow-sm`만.
- **다크 카드 vs 다크 페이지**: `surface-default-dark`(L=0.023) on `bg-page-dark`(L=0.015) 차이가 미묘 → `shadow-sm` 또는 1px `border-default-dark` 보강 필요.
- **다크 모드 shadow**: rgba 흑색 shadow는 다크 표면 위에서 거의 안 보임 — light용 `rgba(15, 18, 28, 0.05~0.16)`은 cool-neutral 흑색이라 다크 표면과 명도 차가 거의 없습니다. v25에서 다크 모드 전용 `shadow-*-dark` 변형 도입(아래 섹션 참조) — black opacity 강화 + inset top highlight 패턴. light·dark 모두 `border-default(-dark)` + 표면 휘도 차와 함께 사용하는 원칙은 유지.

#### WCAG 검증
- **1.4.3 / 1.4.11**: shadow 자체는 색 대비 비대상.
- **간접 영향**: 모달이 표면 위에 떠 있을 때, `shadow-xl`이 모달 외곽 vs 페이지 사이 시각 분리에 기여. 단 분리의 **정량적 보장**은 shadow 단독으로 어렵고 — 모달은 항상 `border-default` + dim overlay와 함께 사용해 식별성 확보(컴포넌트 스펙).
- **자동 검증 불가**: lint contrast 룰은 `backgroundColor`/`textColor` 페어만 검사. shadow는 spec 토큰 타입이 아니므로 검증 룰 부재. 본 prose-token은 손계산·시각 검토에만 의존 — `border-strong` 등과 동급의 자동 검증 한계.

#### HR / Desk 듀얼 브랜드
- 모든 shadow는 brand-neutral. HR(B2B 절제)·Desk(B2C 친근감) 모두 동일 스케일 사용.
- 다만 적용 강도 분기 권장: HR은 `shadow-sm`/`shadow-md` 위주(평면적 데이터 밀도), Desk는 `shadow-md`/`shadow-lg` 위주(친근한 입체감). 토큰 자체 분기 불필요.

### v25 추가 — 다크 모드 4단계 shadow (prose-token)

v12 시점에는 다크 모드 사용 사례가 적어 `shadow-*-dark` 변형 도입을 보류했으나, v23~v24에서 다크 차트 표면(`chart-color-*-on-dark` 10색)·다크 모달 케이스가 본격화되며 다크 elevation 솔루션이 필요해졌습니다. Material Design 3 dark elevation 가이드(2021~)·Apple Big Sur 패턴을 참고한 절충안을 채택합니다.

| 토큰 | 값 (CSS box-shadow) | 주 용도 |
|---|---|---|
| `shadow-sm-dark` | `0 1px 2px 0 rgba(0, 0, 0, 0.30), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` | 다크 카드 정지 상태 |
| `shadow-md-dark` | `0 2px 8px -1px rgba(0, 0, 0, 0.40), 0 1px 3px -1px rgba(0, 0, 0, 0.20), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)` | 다크 드롭다운·툴팁·hover 카드 |
| `shadow-lg-dark` | `0 8px 24px -4px rgba(0, 0, 0, 0.50), 0 2px 6px -2px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)` | 다크 popover·작은 모달 |
| `shadow-xl-dark` | `0 24px 48px -8px rgba(0, 0, 0, 0.60), 0 8px 16px -4px rgba(0, 0, 0, 0.30), inset 0 1px 0 0 rgba(255, 255, 255, 0.10)` | 다크 큰 모달·drawer·hero overlay |

#### 패턴 결정
- **drop shadow base를 `rgba(0, 0, 0, ...)`로 변경**: 다크 표면(`bg-page-dark` `#1A1F2E`, L=0.015) 위에서는 light용 cool-neutral 흑색(`rgba(15, 18, 28, ...)`)이 표면과 합쳐져 식별 거의 불가. 순수 검정으로 회귀해 명도 차 확보.
- **opacity 2~4배 강화** (light 0.05 → dark 0.30, light 0.16 → dark 0.60): 다크 표면이 이미 어두우므로 약한 그림자는 무효 — 명확한 cast shadow 형성에 필요한 강도.
- **`inset 0 1px 0 rgba(255, 255, 255, N%)` top highlight 추가**: drop shadow 단독으로는 다크 표면 위에서 "위로 올라온 느낌"보다 "아래로 들어간 느낌"이 강해짐. 1px 흰색 inset highlight로 광원 위치를 시뮬레이션해 elevation 인지를 보강(Big Sur·Material 3 공통 패턴). highlight opacity는 단계별 5% → 10%로 누적.

#### 추가 이유
1. v23~v24의 chart dark 변형 10색·다크 모달 케이스 본격화 — 보류 사유였던 "직관적 디자인 솔루션 미정착"이 Material 3 dark elevation·Big Sur 패턴 정착으로 해소.
2. **light scale과 1:1 대응** (`sm/md/lg/xl`): 컴포넌트 스펙 작성 시 mode pair 매핑이 자명 — `shadow-md` ↔ `shadow-md-dark`.
3. 4종 추가(5 한도 이내), 색상 토큰 미증가 — lint contrast 검증 비대상(prose-token).

#### WCAG / 자동 검증
- shadow 자체 비대상은 light와 동일(1.4.3 / 1.4.11 비대상).
- lint 자동 검증 불가도 동일 — `colors:` YAML 외부 prose 토큰. 본 토큰은 손계산·시각 검토에만 의존.
- 다크 모달 분리감은 `border-default-dark` + `shadow-xl-dark` + dim overlay 3중 보강(컴포넌트 스펙에서 명시).

#### HR / Desk 듀얼 브랜드
- light scale과 동일하게 brand-neutral. 토큰 자체 분기 불필요.
- 적용 강도 분기 권장: HR은 `sm-dark`/`md-dark` 위주, Desk는 `md-dark`/`lg-dark` 위주.

### v43 추가 — overlay dim (prose-token)

modal/sheet/drawer dim overlay (alpha 채널 prose-token).

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `overlay-dim-light` | `rgba(0, 0, 0, 0.50)` | 라이트 modal/sheet 배경 dim |
| `overlay-dim-dark` | `rgba(0, 0, 0, 0.65)` | 다크 modal/sheet 배경 dim |

`scripts/build-tailwind-v4.mjs` 자동 추출 → `--overlay-dim-*`.

## Motion

### v104 — SEED 모션 (2026-09-29)

당근 SEED 의 Motion · Feedback 을 들인다. 사용자가 2026-09-29 비교 페이지를 보고 지속 시간 · 이징 · 눌림 · 모션 줄이기 넷 다 SEED 쪽을 골랐다. 출처: seed-design.io Foundations › Motion · Feedback, rootage duration · timing-function · scale · collections(Apache-2.0).

**아직 두 웹 · 앱에는 들어가지 않았다.** Desk 앱은 이 밖의 값(`instant` 80ms · 곡선 `spring` · `decel`)을 따로 쓰고, Desk 웹은 500 · 600ms 를 직접 적은 곳이 있다 — 앱 PR 에서 아래 이름으로 옮긴다.

#### 매크로 · 마이크로 모션

- **마이크로 모션** — 버튼 누름 · 입력칸 포커스 · 스크롤처럼 작은 움직임. 200ms 이하.
- **매크로 모션** — 페이지 전환 · 모달 · 시트 · 메뉴처럼 큰 움직임. 200ms 초과.
- 사용자 입력에 대한 반응 가운데 누름은 아래 "눌림 피드백" 에서 따로 정한다.

#### 지속 시간

| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `motion-duration-d1` | `50ms` | 아주 작은 상태 변화 |
| `motion-duration-d2` | `100ms` | 작은 상태 변화(옛 앱 `instant` 80ms 는 여기로) |
| `motion-duration-d3` | `150ms` | 마이크로 모션 기본 — 색 전환 · 눌림 |
| `motion-duration-d4` | `200ms` | 마이크로 모션 상한 — 메뉴 · 툴팁 |
| `motion-duration-d5` | `250ms` | 매크로 모션 — 시트 · 서랍 |
| `motion-duration-d6` | `300ms` | 매크로 모션 상한 — 모달 · 페이지 전환 |
| `motion-duration-color-transition` | `150ms` | 역할 — 색 전환(= d3) |
| `motion-duration-pressed-scale` | `150ms` | 역할 — 눌림 축소(= d3) |

- 색 전환과 눌림 축소는 같은 150ms 다 — 시작과 속도가 같아야 하나의 반응으로 읽힌다.
- 반복은 v63 의 `motion-duration-loop`(1500ms)를 그대로 쓴다(porest 역할).
- 옛 이름은 같은 값의 별칭이다 — `motion-duration-fast` → d3, `motion-duration-base` → d4, `motion-duration-slow` → d6. `motion-duration-slower`(500ms)는 걷는 중이다 — 큰 전환도 d6(300) 안에서 끝낸다.

#### 이징

| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `motion-ease-easing` | `cubic-bezier(0.35, 0, 0.35, 1)` | 버튼 · 포커스 같은 기능적 마이크로 모션 |
| `motion-ease-enter` | `cubic-bezier(0, 0, 0.15, 1)` | 다이얼로그 · 시트가 나타날 때 |
| `motion-ease-exit` | `cubic-bezier(0.35, 0, 1, 1)` | 다이얼로그 · 시트가 사라질 때 |
| `motion-ease-enter-expressive` | `cubic-bezier(0.03, 0.4, 0.1, 1)` | 특히 강조해야 하는 등장 |
| `motion-ease-exit-expressive` | `cubic-bezier(0.35, 0, 0.95, 0.55)` | 특히 강조해야 하는 퇴장 |
| `motion-ease-pressed-scale` | `cubic-bezier(0, 0, 0.15, 1)` | 눌림 축소 |

- 반복은 v63 의 `motion-ease-linear` 를 그대로 쓴다.
- 옛 `motion-ease-out`(0.16, 1, 0.3, 1)은 걷는 중이다 — 나타나는 모션은 `motion-ease-enter` 로 옮긴다. 앱의 `spring` 은 `motion-ease-enter-expressive`, `decel` 은 `motion-ease-enter` 로.

#### 눌림 피드백

누르면 인터페이스가 입력이 닿았음을 바로 알린다. 색 · 크기 · 햅틱 셋으로 알리고, 셋은 하나의 반응으로 읽히게 같은 시간(150ms)을 쓴다. 햅틱은 기준이 생기면 더한다.

**색 — 기본.** 누를 수 있는 모든 요소는 누르는 동안 표면 색이 `-pressed` 역할로 바뀐다(v102). 동작 줄이기 설정에도 영향받지 않아 기본 요소다.

- 표면만 바뀐다 — 그 위 글자 · 아이콘 색은 그대로다. 글자용 pressed 역할은 두지 않는다.
- 평소 배경이 없는 요소(ghost 버튼)는 누르는 동안 `bg-layer-default-pressed` 표면이 생긴다. 떠 있는 표면(FAB · 메뉴) 위라면 `bg-layer-floating-pressed`. SEED 의 투명도 있는 transparent-pressed 는 검사기가 받지 않아 두지 않았다.
- 색이 이미 상태를 뜻하는 요소(Switch 의 켜짐 · 탭의 선택)는 색을 바꾸지 않고 축소만 한다 — 손을 떼기 전에 상태가 바뀐 것처럼 보이지 않게.

**크기 — 거리로 줄인다.** 누르는 동안 요소가 세로 2px 만큼 줄어든다. 배율을 고정하면 요소가 클수록 가로로 많이 움직이므로, 거리를 고정하고 배율은 요소 크기에서 계산한다.

| 값 | 크기 | 뜻 |
|---|---|---|
| 축소량 | 2px | 세로로 줄어드는 거리 |
| 폭 보정 | 폭 ÷ 4 | 가로로 긴 요소(목록 줄)가 지나치게 움직이지 않게 |
| 최소 기준 길이 | 24px | 아주 작은 요소의 축소 비율 상한(8.3%) |

```
기준 길이 = max(요소 높이, 요소 폭 ÷ 4, 24)
배율     = (기준 길이 − 2) ÷ 기준 길이
```

- 가운데를 기준으로 줄고, 차지하는 자리는 그대로다 — 옆 요소가 움직이지 않는다.
- 영역이 하나의 면으로 잡히는 요소에만 쓴다. 글 속 링크처럼 줄바꿈되는 요소에는 쓰지 않는다.
- 안의 동작이 요소 전체에 딸린 것(행 안의 Switch)이면 행 전체가 준다. 대등한 동작이 나란하면(카드 안의 닫기 · 좋아요) 누른 버튼만 준다.
- 요소 전체를 줄여 정렬 · 여백 · 모서리가 어긋나면(목록 줄 · 아코디언) 콘텐츠만 준다.
- 이미 줄어드는 요소 안의 요소는 따로 줄지 않는다.
- 선택된 요소도 준다. 불러오는 중 · 비활성은 줄지 않는다.
- 150ms · `motion-ease-pressed-scale`.

#### 모션 줄이기 모드

색의 라이트 · 다크처럼 "보통 · 줄이기" 두 모드를 둔다. 사용자가 기기에서 동작 줄이기를 켜면 줄이기 모드다 — 웹은 `prefers-reduced-motion: reduce`, 앱은 `MediaQuery.disableAnimations`.

| 무엇 | 보통 | 줄이기 |
|---|---|---|
| 눌림 축소 | 세로 2px | 없음(배율 1) — 색 전환만 남는다 |
| 색 전환 | 150ms | 그대로 |
| 매크로 모션(200ms 초과) | 이동 · 확대 · 미끄러짐 | 150ms 서서히 나타남 · 사라짐 |
| 반복(스켈레톤 · 펄스) | 계속 | 멈춘다 — 진행을 알려야 하는 것(스피너)은 컴포넌트 스펙이 대신할 표현을 정한다 |

지금 이 모드를 따르는 곳은 웹 2곳 · 앱 스켈레톤 1곳이다(2026-09-29) — 앱 PR 에서 모든 모션이 따르게 한다.

### v32 추가 — 4단계 duration + ease-out (prose-token · v104 에서 SEED 모션으로 바뀜 — 옛 이름은 별칭)

> **spec 한계**: design.md spec은 motion(transition) 토큰 타입을 정형화하지 않습니다. shadow와 동일한 **prose-token** — `npm run lint` 자동 검증 비대상이며, `scripts/build-tailwind-v4.mjs`가 prose 표에서 추출해 v4 `@theme` CSS의 `--motion-duration-*` / `--motion-ease-*`로 출력.

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `motion-duration-fast` | `150ms` | 작은 hover/focus 전환, ripple |
| `motion-duration-base` | `200ms` | default — drawer/dropdown 일반 UI 전환 |
| `motion-duration-slow` | `300ms` | modal/page-level 전환 |
| `motion-duration-slower` | `500ms` | hero/large layout shift |
| `motion-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | default — 자연스러운 감속(Toss·Material 공통) |

#### 추가 이유
1. v25(shadow-*-dark) → v30(v4 build)으로 elevation·typography 인프라 도입 후, v32에서 motion으로 시간 차원 추가 — 컴포넌트 인터랙션(hover, modal entrance, drawer slide) 작성 단계 진입.
2. **4 duration + 1 easing**: Toss·Material 동일 절제 — 모든 전환을 같은 ease-out으로 통일해 일관 톤. 토큰 5종(5 한도 정확).
3. easing은 **`ease-out` 단독**으로 시작 — `ease-in` / `ease-in-out` / `spring`은 사용 사례 등장 시 추가.

#### WCAG / 자동 검증
- **2.3.3 Animation from Interactions**: 200ms 초과 large 전환(`slow`/`slower`)은 `prefers-reduced-motion: reduce` 미디어 쿼리로 비활성 권장. 컴포넌트 스펙에서 명시.
- 자동 검증 불가는 shadow와 동일 — prose-token이라 lint 비대상. 손계산·시각 검토 의존.

#### HR / Desk 듀얼 브랜드
- motion은 brand-neutral. HR/Desk 동일 스케일.
- 적용 강도 분기 권장: HR(B2B)은 `fast`/`base` 위주(절제), Desk(B2C)는 `base`/`slow` 위주(친근감).

### Loop motion (v63 추가, prose-token)

skeleton shimmer · spinner · pulse 등 **반복 애니메이션** 용 토큰 2종.

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `motion-duration-loop` | `1500ms` | skeleton shimmer 1주기, pulse 1주기 |
| `motion-ease-linear` | `linear` | 반복 일정 속도 |

DESIGN.md의 Loop motion 정의와 동일 (brand-neutral). HR `fast`/`base`/`loop` 조합이 일반적 — 결재 큐 row hover(`fast`) + dropdown(`base`) + skeleton(`loop`).

### Animation library (v74 추가, prose-token)

DESIGN.md baseline 정의 참고 — 14 keyframes (단발 10 + loop 4): fade-in/out, slide-in-{up,down,left,right}, scale-in/out, bounce-in, shake, spin, pulse, shimmer, ping. CSS keyframe 정의 + 권장 duration/ease 매핑.

#### HR 우선 패턴
- **결재 row 등장** — `fade-in` + `motion-duration-base` (200ms): 새 결재 도착 시 row 위에서 스무스 등장. dramatic motion 회피, 절제 톤.
- **Toast 알림** — `slide-in-down` + `motion-duration-base` (200ms): top-right 위치라 위에서 내려옴.
- **Modal/Dialog** — `scale-in` + `motion-duration-base` (200ms): 결재 confirm dialog, 직원 detail.
- **Drawer (직원 detail)** — `slide-in-left` + `motion-duration-slow` (300ms): 우측에서 등장.
- **Skeleton (결재 큐 로딩)** — `shimmer` + `motion-duration-loop` (1500ms) linear: 결재 row placeholder.
- **Spinner (저장 중)** — `spin` + `motion-duration-loop` (1500ms) linear.
- **Form validation error** — `shake` + `motion-duration-slow` (300ms): 결재 의견 미입력 등 금지 시.
- **bounce-in 제한 사용** — 결재 완료 후 success indicator 정도. 일상 UI엔 과도.

#### HR 회피 패턴
- `slide-in-right` (drawer 좌측 등장) — sidebar 좌측 고정 layout이므로 우측에서 등장이 자연.
- `ping` — alert·notification 위치만, 일반 row엔 distraction.

## State

### v106 — SEED 상태 (2026-09-30)

당근 SEED 의 State 를 들인다. 사용자가 2026-09-30 비교 페이지(https://claude.ai/artifact/11DmriLqavjqcSs1zFrjeZ)에서 다섯 가지를 골랐다 — 이름은 SEED + 웹 둘, 비활성은 전용 색, 호버는 누름 색, 포커스는 링 2px · 띄움 2px + 입력칸 테두리 2px, 선택은 반전. 출처: seed-design.io Foundations › State, rootage 컴포넌트 64개(Apache-2.0).

**아직 스펙 YAML 과 제품에는 들어가지 않았다.** 스펙은 컴포넌트 단계에서 SEED 와 비교할 때 이 이름 · 표현으로 옮기고(값은 그대로), 제품은 앱 적용 단계에서 옮긴다. 2026-09-30 제품은 비활성을 불투명도 0.5 로, 선택을 브랜드 색(Desk) · 회색(HR · SSO)으로 보인다.

#### 상태의 두 유형

- **상호작용 상태** — 사용자의 동작에 따라 바뀐다. `enabled` · `hovered` · `focused` · `pressed`.
- **옵션 상태** — 컴포넌트에 걸린 옵션이다. `selected` · `disabled`, 그리고 컴포넌트 상태 `invalid` · `loading` · `readonly`.
- 둘은 겹칠 수 있다 — 선택된 요소도 누를 수 있다. 겹치면 `selected + pressed` 처럼 함께 적는다.

#### 상태 이름

| 이름 | 뜻 | 어디서 |
|---|---|---|
| `enabled` | 기본 — 아무 상호작용이 없을 때 | 모두 |
| `hovered` | 포인터가 위에 있음 | 웹 — 마우스가 있는 기기에서만(`@media (hover: hover)`) |
| `focused` | 키보드 포커스(`:focus-visible`), 입력칸은 입력 중 | 모두 |
| `pressed` | 누르고 있는 동안 | 모두 |
| `selected` | 선택됨 · 켜짐 · 지금 항목 | 모두 |
| `disabled` | 비활성 — 상호작용을 받지 않는다 | 모두 |
| `invalid` | 값이 규칙에 맞지 않음 | 입력 요소 |
| `loading` | 진행 중 — 입력을 받지 않는다 | 누를 수 있는 요소 |
| `readonly` | 값은 보이지만 바꿀 수 없음 | 입력 요소 |

- 옛 이름(스펙 YAML 52개에 섞여 있다): `default` → `enabled`, `hover` → `hovered`, `focus-visible` · `focus` → `focused`, `active` → `pressed`, `checked` → `selected`, `error` → `invalid`. 컴포넌트에만 있는 상태(`open` · `dragging` 들)는 그대로 둔다.

#### 상태별 표현

| 상태 | 표면 | 글자 · 아이콘 | 테두리 · 링 | 더하는 것 |
|---|---|---|---|---|
| `hovered` | `-pressed` 역할 색(누름과 같다) | 그대로 | 그대로 | — |
| `focused` — 키보드 | 그대로 | 그대로 | 링 2px · 띄움 2px · `stroke-focus-ring` | `outline` 으로 그려 자리가 밀리지 않는다 |
| `focused` — 입력 중 | 그대로 | 그대로 | 안쪽 2px `stroke-neutral-contrast` | 반투명 링은 쓰지 않는다. 안쪽에 덧그려 내용이 밀리지 않는다(Text Field 2026-10-01 — 처음엔 `stroke-focus-ring` 이었다) |
| `pressed` | `-pressed` 역할 색 | 그대로 | 그대로 | 축소(Feedback) |
| `selected` | `bg-neutral-inverted` | `fg-neutral-inverted` | — | 칩 · 세그먼트 · 날짜처럼 고르는 요소 |
| `disabled` | `bg-disabled`(배경이 있는 요소만) | `fg-disabled` | `stroke-neutral-weak` | 불투명도를 쓰지 않는다. 커서 not-allowed |
| `invalid` | 그대로 | 오류 문구 `fg-critical` | 테두리 2px `stroke-critical-solid` | 문구는 입력칸 가까이(Writing › 오류) |
| `loading` | `-pressed` 역할 색 | 글자 대신 진행 표시 | 그대로 | 누름 · 축소 없음 |
| `readonly` | `bg-disabled` | 값은 `fg-neutral` 로 읽히게 | 그대로 | — |

- 호버와 누름이 같은 색이라, 마우스로 누를 때는 색이 더 바뀌지 않고 축소만 더해진다. 호버는 마우스가 있는 기기에서만 켠다 — 터치 화면에 호버가 붙어 남지 않게.
- 불러오는 중 · 읽기 전용의 표면은 SEED 컴포넌트 값을 따랐다(불러오는 중 = 누름 색, 읽기 전용 = 비활성 배경).
- 선택을 테두리로 보이는 요소: Select Box 는 고른 상자만 2px `stroke-neutral-contrast`(v113 — SEED 와 같다, 바탕은 바꾸지 않는다). 목록 · 메뉴의 지금 항목은 그 컴포넌트 차례에 SEED 와 비교해 정한다.
- 스위치처럼 색으로 켜짐을 뜻하는 요소의 비활성도 컴포넌트 단계에서 정한다(SEED 스위치는 불투명도 0.58).

#### 겹칠 때

- 옵션 상태는 상호작용 상태와 겹친다 — `selected` 에 호버 · 누름 · 포커스가 더해진다. 선택된 요소를 누르면 선택 색은 그대로 두고 줄이기만 한다(Feedback › Color).
- `disabled` 는 다른 상호작용 상태와 함께 나타나지 않는다 — 호버 · 누름 색 · 축소가 없다. 키보드로 머무를 수 있는 비활성(`aria-disabled`)만 포커스 링을 받는다.
- `loading` 은 입력을 받지 않는다 — 누름 · 축소가 없다.
- `invalid` 와 입력 중(`focused`)이 겹치면 테두리는 오류 색이 이긴다.

## Iconography

### v106 — 아이콘 (2026-09-30)

당근 SEED 의 Iconography 를 들인다. 사용자가 2026-09-30 비교 페이지에서 골랐다 — 세트는 lucide 유지, 크기는 SEED 예시 3단계(16 · 20 · 24, 12 는 바닥, 큰 그림은 비율대로), 채움 대신 굵기와 색, 아이콘 버튼은 보이는 크기 40. 출처: seed-design.io Foundations › Iconography(Apache-2.0).

**아직 제품에는 들어가지 않았다.** 2026-09-30 제품에는 크기 18가지(8 ~ 48px)와 선 굵기 11가지가 섞여 있다 — 앱 적용 단계에서 옮긴다.

#### 세트

- lucide 하나를 쓴다 — 웹은 `lucide-react`, 앱은 `lucide_icons_flutter`. 네 제품이 이미 이 세트다.
- SEED 의 아이콘은 당근 로고의 모양을 딴 브랜드 자산이라 쓰지 않는다.
- 없는 아이콘은 lucide 의 모양 규칙대로 그려 더한다 — 24px 격자, 선 2, 둥근 끝 · 둥근 이음.

#### 크기

| 크기 | 뜻 |
|---|---|
| `16px` | 작은 UI 아이콘 — 가장 작은 단계 |
| `20px` | 가운데 단계 |
| `24px` | 기본 격자 — lucide · SEED 가 그리는 크기 |

- UI 아이콘은 16 · 20 · 24 셋만 쓴다. 옮길 때는 한 단계 위로 — 15px 이하는 16, 17 ~ 19px 는 20, 21 ~ 23px 는 24.
- 12px 은 넘지 말아야 할 바닥이다 — UI 아이콘으로는 쓰지 않는다.
- 빈 화면 · 큰 그림처럼 24px 보다 큰 아이콘은 24px 격자를 비율대로 키워 자리마다 정한다.
- 자리마다 어느 단계를 쓸지는 컴포넌트 단계에서 SEED 의 해당 컴포넌트와 비교해 정한다.

#### 선 굵기와 상태

- 선은 lucide 기본 2(24px 격자 기준 — 16px 에서는 그만큼 가늘게 그려진다).
- 켜짐 · 선택은 진한 색(또는 브랜드 색) + 선 2.5, 꺼짐은 lucide 의 `-off` 아이콘(사선)을 쓴다. SEED 의 "켜짐 = 채움" 을 이렇게 대신한다 — lucide 에는 채움 모양이 없고, 앱의 lucide 글꼴은 채울 수도 없다.
- 앱은 lucide 글꼴의 굵기 변형으로 같은 굵기를 맞춘다(앱 적용 때 고른다).

#### 아이콘만 있는 버튼

- 보이는 크기는 40px — 24px 아이콘이면 44px.
- 누르는 영역은 늘 44px 이상이다(Layout › Touch targets) — 40px 버튼은 보이지 않는 여백을 2px 씩 더한다.
- 이름을 반드시 단다 — 웹 `aria-label`, 앱 `tooltip` 또는 `Semantics` label. 이름도 번역 문구에 둔다.

#### 글자와 함께

- 한 줄에 둘 때는 높이 가운데로 맞추고, 사이는 간격 토큰으로 둔다(2026-09-30 제품은 대부분 8px).
- 아이콘만으로 뜻이 모호하면 글자를 함께 쓴다.
- 상단 내비게이션은 선 아이콘으로 두고, 하단 탭은 선택된 탭을 굵기 · 색으로 강조한다.

## Inclusive Design

### v106 — SEED 포용적 디자인 (2026-09-30)

당근 SEED 의 Inclusive Design 을 들인다 — 시각 · 청각 · 운동 · 인지 능력과 상황이 다른 모든 사용자가 쓸 수 있게. 규칙은 SEED 그대로이고, 대비는 porest 가 정한 WCAG 2 로 잰다(v102). 사용자가 2026-09-30 터치 영역은 "44 를 반드시"(Touch targets 의 지금 문구)로 골랐다. 출처: seed-design.io Foundations › Inclusive Design(Apache-2.0).

**아직 제품에는 들어가지 않았다.** 2026-09-30 조사에서 어긋난 자리 — Desk 웹이 화면 확대를 막음(`user-scalable=no`), Desk 웹 입력칸 오류를 보조 기술에 알리지 않음, 이름 없는 아이콘 버튼 90여 곳, HR 웹 `<html lang="en">`, 모션 줄이기를 따르지 않는 반복 모션 — 은 앱 적용 단계에서 고친다.

#### 보기

- **대비** — 글자와 배경은 WCAG 2 AA(본문 4.5:1 · UI 3:1)를 검사기로 잰다. SEED 는 APCA(Lc)로 재서 수치를 옮기지 않는다. 비활성 · 플레이스홀더는 WCAG 가 따지지 않지만 전용 색(`fg-disabled` · `fg-placeholder`)으로 읽히게 둔다.
- **색만으로 알리지 않는다** — 상태 · 오류 · 차트는 글자 · 아이콘 · 모양을 함께 쓴다.
- **위계와 순서** — 중요한 정보가 먼저 보이게 짜고, 화면 순서를 논리적으로 둔다. 스크린 리더가 그 순서로 읽는다.

#### 조작

- **터치 영역** — 누르는 영역은 모두 44 × 44 이상(`touch-min`). 보이는 크기가 작으면 보이지 않는 여백으로 넓힌다.
- **제스처 대신 누르기** — 밀기 · 끌기 · 핀치 같은 제스처로 하는 일은 누르기로도 할 수 있게 한다.
- **보조 기술** — 모든 동작에 VoiceOver · TalkBack · 키보드로 닿는다. 키보드 포커스는 State › `focused`.
- **길 찾기** — 지금 어디 있는지를 이름과 선택 표시로 알 수 있게 하고, 주요 기능은 찾기 쉬운 자리에 둔다.

#### 콘텐츠

- **이름** — 아이콘만 있는 버튼 · 이미지에는 기능과 맥락을 짧게 적은 이름을 단다(웹 `aria-label` · `alt`, 앱 `Semantics` label · `tooltip`). 장식은 보조 기술에서 숨긴다(`alt=""` · `aria-hidden` · `ExcludeSemantics`). 이름도 번역 문구에 둔다.
- **오류** — 바로 알린다. 테두리 색(State › `invalid`)과 함께, 웹은 `aria-invalid` + `aria-describedby` 로 입력칸과 문구를 잇고 `role="alert"`(또는 `aria-live`)로 알린다. 앱은 `Semantics` liveRegion. 문구는 입력칸 가까이, 고칠 방법까지(Writing › 오류).

#### 개인 설정

- **글자 크기** — 웹 글자는 rem(v104)이라 브라우저 글자 크기를 따르고, 앱은 OS 글자 크기를 따른다. 커져도 레이아웃이 깨지지 않게 한다. 화면 확대를 막지 않는다 — `user-scalable=no` · `maximum-scale` 을 쓰지 않는다(WCAG 1.4.4).
- **애니메이션** — 모든 모션이 모션 줄이기 모드(Motion)를 따른다. 2초 넘는 애니메이션은 피하고, 쓰면 멈추거나 건너뛸 수 있게 한다. 초당 3번 넘게 번쩍이지 않는다.
- **자동 재생** — 소리 · 영상은 멈춰 둔 채로 시작한다. 필요하면 소리 없이 시작하고, 3초 넘는 소리는 멈춤 · 음량 조절을 준다.
- **언어** — 화면 언어를 고를 수 있고, 바꾸면 `<html lang>` 도 바뀐다(International Design).

## International Design

### v106 — SEED 국제화 디자인 (2026-09-30)

당근 SEED 의 International Design 을 들인다 — 언어 · 지역마다 날짜 · 시각 · 숫자 · 기호를 그 관습대로 쓴다. 사용자가 2026-09-30 날짜는 SEED 셋, 시각은 오전 · 오후 12시간, 지난 시간은 지금 porest 방식, 구간은 한국어 물결표 · 영어 en dash 로 골랐다. 출처: seed-design.io Foundations › International Design(Apache-2.0).

- 언어: 한국어(기본) · 영어 — Desk 웹 · Desk 앱 · HR 웹. SSO 는 한국어만.
- 표기는 코드에 직접 적지 않고 로케일 문구 · 로케일 포맷터로 낸다. 날짜 · 시각은 한국어 로케일을 넘겨야 "오후" 가 나온다.

**아직 제품에는 들어가지 않았다.** 2026-09-30 제품 — HR 웹 한국어 화면의 영어 시각(`3:30 PM`) 6곳, `2026-09-30` 을 그대로 보이는 곳 51곳(HR), Desk 달력 머리 `2026.09.28`, Desk 앱의 24시간 시각, 구간 기호 세 가지 — 는 앱 적용 단계에서 옮긴다.

#### 날짜

| 형식 | 한국어 | 패턴 | 영어 | 패턴 |
|---|---|---|---|---|
| 표준 | 2026년 9월 30일 | `yyyy년 M월 d일` | Sep 30, 2026 | `MMM d, yyyy` |
| 줄임 | 9월 30일 | `M월 d일` | Sep 30 | `MMM d` |
| 점 | 2026. 9. 30. | `yyyy. M. d.` | — | — |
| 요일 | 9월 30일 (수) | `M월 d일 (E)` | Wed, Sep 30 | `E, MMM d` |
| 요일 풀어 씀 | 9월 30일 수요일 | `M월 d일 EEEE` | Wednesday, Sep 30 | `EEEE, MMM d` |
| 요일 · 시각 | 9월 30일 (수) 오후 9:41 | `M월 d일 (E) a h:mm` | Wed, Sep 30 at 9:41 PM | `E, MMM d 'at' h:mm a` |

- 올해 날짜는 줄임, 다른 해면 표준, 표 · 목록 끝처럼 좁은 칸은 점으로 쓴다.
- 점 표기는 [연] · [월] · [일] 을 줄인 것이라 마지막 [일] 뒤에도 점을 찍고, 0 을 채우지 않는다(`2026. 9. 30.`).
- 입력칸 값 · 내보내기 파일 · API 의 `yyyy-MM-dd` 는 화면 표시가 아니므로 그대로 둔다.

#### 시각

| 형식 | 한국어 | 패턴 | 영어 | 패턴 |
|---|---|---|---|---|
| 시각 | 오후 9:41 | `a h:mm` | 9:41 PM | `h:mm a` |

- 모든 화면에 오전 · 오후 12시간을 쓴다. 초는 쓰지 않는다.

#### 지난 시간

| 지난 시간 | 한국어 | 영어 |
|---|---|---|
| 1분 미만 | 방금 전 | Just now |
| 1 ~ 59분 | n분 전 | n min ago |
| 1 ~ 23시간 | n시간 전 | n hr ago |
| 24 ~ 47시간 | 어제 | Yesterday |
| 2 ~ 6일 | n일 전 | n days ago |
| 7일 이상 | 날짜(위 규칙) | 날짜 |

- 2026-09-30 Desk 웹 · 앱의 방식이다. "방금" 만 SEED 처럼 "방금 전" 으로 바꾼다. SEED 의 주 · 달 · 년 표기는 쓰지 않는다.
- 흐른 시간으로 센다 — 달력 날짜가 아니다. 밤 11시에 온 알림은 다음 날 새벽 1시에도 "2시간 전" 이다(v107 — v106 표의 "어제 날짜" 를 제품 계산대로 바로잡음).

#### 숫자 · 돈

| 형식 | 한국어 | 영어 |
|---|---|---|
| 돈 | 1,234,567원 | ₩1,234,567 |
| 빼기 | −1,234원 | — |
| 차트 축 · 개수 줄임 | 1.2만 · 12.3만 · 123만 · 1.2억 | 12K · 123K · 1.2M |
| 전화번호 | 010-1234-5678 | — |

- 돈은 줄이지 않고 원 단위까지 쓴다. 줄임은 차트 축과 개수에만.
- 한국어 줄임은 만 · 억 · 조에 소수 한 자리까지, `.0` 은 버린다(`1억`). 영어는 compact 표기(`Intl.NumberFormat` · `NumberFormat.compact`).
- 빼기는 붙임표(-) 대신 빼기 기호 `−`(U+2212)를 쓴다 — 2026-09-30 Desk 웹 · 앱과 같다.

#### 구간 · 괄호

- 구간은 한국어 물결표 `~`, 영어 en dash `–` 로 잇고 앞뒤를 붙여 쓴다 — `9월 1일~9월 30일` · `06~10시` · `Sep 1–30`.
- 구간 기호는 로케일 문구에 둬서 언어마다 바뀌게 한다 — 코드에 직접 쓰지 않는다.
- 괄호는 한국어는 앞 글자에 붙이고(`매일 운동(30분)`), 영어는 한 칸 띄운다(`Exercise (30 min)`).

#### 번역 여유

- 버튼 · 라벨처럼 폭이 정해진 자리는 번역하면 길어질 자리를 둔다 — 줄바꿈하거나 늘어나게.
- porest 실측(2026-09-30, 한국어 · 영어 문구 6,100여 쌍): 영어가 한국어의 2배(가운데값), 6자 이하 짧은 말은 2.5배, 58 ~ 60% 가 2배 이상.
- SEED 의 확장 비율(한국어 글자 수 기준): 10자 이하 150 ~ 250% · 11 ~ 20자 130 ~ 150% · 21 ~ 30자 110 ~ 130% · 31 ~ 50자 90 ~ 110% · 51 ~ 70자 80 ~ 90% · 71자 이상 80%.
- 화면은 영어로도 한 번씩 확인한다.

## Voice and Tone

### v106 — porest 목소리 (2026-09-30)

당근 SEED 의 Voice and Tone 을 바탕으로 porest 의 목소리를 정한다. 사용자가 2026-09-30 원칙은 SEED, 톤은 "차분하고 친절한" 으로 골랐다 — porest 의 기준 톤은 토스(심플, 신뢰감, 전 연령 범용)이고, 돈과 회사 일을 다룬다. 출처: seed-design.io Foundations › Voice and Tone(Apache-2.0).

#### 원칙 — 명확한 · 이해하기 쉬운 · 사려깊은

1. **명확하고 간결하게** — 꼭 필요한 정보를 짧게 전해 사용자가 결정하도록 돕는다. 그래서 믿을 수 있는 서비스가 된다.
2. **이해하기 쉽게** — 누구나 쉽게 쓸 수 있게 말한다.
3. **사려깊게** — 사용자의 입장에서 생각한다. 성별 · 나이 · 종교 · 혼인 여부 · 인종 · 장애 같은 다양성을 존중하고 배려한다. 말에는 정보뿐 아니라 감정도 담긴다.

#### 톤 — 차분하고 친절한

- 이야기하듯 친절하게, 들뜨지 않게 말한다. 돈과 회사 일을 다루므로 믿음이 먼저다.
- 느낌표와 감탄은 아낀다 — 목표를 이룬 순간처럼 축하할 자리에서만.
- 말투는 해요체다(Writing).

#### 역할

- 사용자의 행동을 이끌어 목적을 이루게 돕는다.
- 언어 · 문화와 상관없이 누구나 쉽게 쓸 수 있게 한다.
- 어느 화면 · 어느 서비스에서나 같은 경험을 준다 — Desk 와 HR 이 같은 목소리로 말한다.

## Writing

### v106 — porest 글쓰기 (2026-09-30)

당근 SEED 의 Writing 을 들인다. 사용자가 2026-09-30 골랐다 — 말투는 모두 해요체, 존칭은 줄임, 마침표는 SEED(문장이면 늘), 띄어쓰기는 SEED(이름은 붙이고 문장은 띄움) + 보조 용언은 붙임, 줄임표는 `…`, 오류는 무엇이 · 왜 · 어떻게. 출처: seed-design.io Foundations › Writing(Apache-2.0).

**아직 제품 문구에는 들어가지 않았다.** 2026-09-30 네 제품에는 한 문구 안에서 해요 · 합니다가 섞인 곳 100곳, "-시겠" 36곳, 고칠 방법이 없는 오류 문구 400여 개가 있다 — 앱 적용 단계에서 제품마다 문구를 다시 쓴다.

#### 말투

- 해요체로 쓴다 — `저장했어요.` · `삭제할까요?`
- "~니다" 는 두 자리에서만 쓴다 — ① 자동으로 나가고 사용자가 조심해야 하는 알림(보안 알림 · 계정 잠금 같은) ② 개인정보 처리방침 · 약관 같은 법적 문서.
- 사용자가 스스로 연 확인창은 해요체다 — `삭제할까요? 삭제하면 되돌릴 수 없어요.`
- 한 문구 안에서 해요체와 합니다체를 섞지 않는다.

#### 존칭

- "-시-" 를 쓰지 않는다 — `삭제하시겠습니까?` → `삭제할까요?`, `해지하시면` → `해지하면`, `비밀번호를 잊으셨나요?` → `비밀번호를 잊었나요?`
- 부탁 · 권유는 `~해주세요` · `~해보세요` 로 공손하게 한다.
- 사용자의 이름을 부를 때는 소리 내어 읽어 보고 정한다.

#### 쉬운 말

- 익숙한 단어를 쓴다 — 한자어 · 기술 용어는 풀어 쓴다(`삭제 불가` → `삭제할 수 없어요`, `처리` 대신 구체적인 동작).
- 숫자는 아라비아 숫자로 쓴다(`1개`). `한 번 더` 같은 관용 표현은 그대로 둔다.
- 줄임말 · 은어 · 유행어를 쓰지 않는다.
- 기능의 이름보다 목적을, 데이터의 변화보다 사용자의 행동을 쓴다 — `작성을 완료했어요` 대신 `메모를 저장했어요.`
- 같은 내용이면 긍정문 · 능동문으로 쓴다. 피동이 뜻을 더 잘 전하면 피동도 괜찮다.
- 한 문장에는 한 목적만 — 길어지면 나눈다.
- 영어 · 숫자 뒤 조사는 붙인다 — `CSV로` · `AltStore를`.

#### 오류

- 무엇이 안 됐는지, 알면 왜, 그리고 어떻게 고치는지를 쓴다 — `삭제하지 못했어요. 잠시 후 다시 시도해주세요.`
- "~하지 못했어요" 로 쓰고, `실패` 명사로 끝내지 않는다(`삭제 실패` 로 쓰지 않는다).
- 서버 코드 · enum(`MONTHLY`) · 영어 용어(`redirect_uri`)를 화면에 내지 않는다 — 서버가 준 문구를 그대로 보이지 말고 화면 문구로 바꾼다.

#### 문장 부호

- 문장(평서문 · 명령문)은 하나여도 마침표로 끝낸다 — `저장했어요.` · `제목을 입력해주세요.`
- 마침표를 쓰지 않는 자리 — 제목, 20px(`text-t7`) 이상 큰 글자, 버튼 · 메뉴 · 라벨.
- 버튼 문장에 `네` · `아니요` 가 있으면 쉼표를 넣는다 — `네, 삭제할게요`
- 느낌표는 꼭 필요한 순간에만 쓴다(Voice and Tone).
- 줄임표는 `…` 한 글자로 쓴다 — `불러오는 중…`

#### 띄어쓰기

- 기능 · 서비스 · 상태 이름 자체는 붙여 쓴다 — 배지 · 칸반 열 · 탭 · 메뉴의 `진행중` · `예약중` · `할일`.
- 문장 속의 뜻은 띄운다 — `진행 중인 일` · `할 일을 적어주세요.` · `불러오는 중…`
- 보조 용언은 붙인다 — `해주세요` · `해보세요` · `지워주세요`.

## Shapes

### v99 — SEED 모서리 스케일 (2026-09-29)

당근 SEED 의 radius 스케일을 그대로 들인다 — 2px ~ 24px 10단계와 `full`, 이름도 SEED 와 같다(`r1` = 4px). 지금까지의 7단계(`xs` 2 · `sm` 4 · `md` 8 · `lg` 12 · `xl` 16 · `2xl` 20 · `full`)는 모두 이 눈금 위라 값이 바뀌지 않고, 옮기는 동안 같은 값의 별칭으로 남는다. 새로 생긴 값은 6 · 10 · 14 · 24px 이다.

| 토큰 | 값 | 옛 이름(별칭) |
|---|---|---|
| `radius-r0_5` | 2px | `radius-xs` |
| `radius-r1` | 4px | `radius-sm` |
| `radius-r1_5` | 6px | — |
| `radius-r2` | 8px | `radius-md` |
| `radius-r2_5` | 10px | — |
| `radius-r3` | 12px | `radius-lg` |
| `radius-r3_5` | 14px | — |
| `radius-r4` | 16px | `radius-xl` |
| `radius-r5` | 20px | `radius-2xl` |
| `radius-r6` | 24px | — |
| `radius-full` | 9999px | `radius-full`(같은 이름) |

- 이번에는 **토큰만** 넓힌다. 컴포넌트마다 어느 모서리를 쓸지는 2단계에서 SEED 의 해당 컴포넌트와 하나씩 비교해 정한다 — SEED 는 porest 보다 둥글다(버튼 · 입력칸 8 ↔ porest 4, 대화상자 20 ↔ 12, 말풍선 12 ↔ 2). 그때까지 아래 v83 매핑(토스 톤)이 지금 값이다.
- 새로 쓰는 모서리는 SEED 이름으로 적는다. 옛 이름은 컴포넌트 스펙 · 제품이 다 옮기면 걷는다.
- 사용자 결정(2026-09-29 — 모서리 A: 토큰만 넓히고 컴포넌트는 하나씩). 이름 방식은 v98 간격과 같은 원칙이다 — 6 · 10 · 14 · 24 를 크기 이름(xs · sm …) 사이에 끼울 이름이 없다.

### v6 추가 — 5단계 라운드 스케일 (v99 에서 SEED 스케일로 바뀜 — 아래는 기록)

`sm/md/lg/xl`는 spacing 베이스(4px)와 정렬된 4px 배수, `full`은 완전 라운드(알약·원형) 관용값입니다.

| 토큰 | 값 | 주 용도 |
|---|---|---|
| `sm` | 4px | 칩·태그·작은 뱃지 |
| `md` | 8px | 버튼·입력 필드 default |
| `lg` | 12px | 카드 default |
| `xl` | 16px | 모달·큰 카드·시트 |
| `full` | 9999px | 알약 버튼·아바타·원형 아이콘 버튼 |

#### 추가 이유
1. v1~v5에서 색상·표면·텍스트·외곽선·간격·타이포가 모두 정의됐으나 컴포넌트 모서리 처리 의사결정이 미완 — 버튼·카드·모달 스펙 작성의 마지막 차단 요소.
2. `full` 포함 5단계는 80% 컴포넌트 사용 사례 커버. `2xl(24px+)`는 hero/major 사용 사례 등장 시 추가.
3. spacing과 동일한 4px 배수 베이스 — radius와 padding이 동일 리듬을 유지해 시각 정합성 확보.

#### WCAG 검증
- **1.4.3 / 1.4.11 색상 대비**: 비대상 (치수 토큰).
- **1.4.12 Text Spacing**: 비대상.
- **2.5.5 Target Size (44×44 AAA / 24×24 AA)**: rounded는 hit-area에 직접 영향 없음. 단, `full`을 작은 아이콘 버튼에 적용 시 padding(`md(12px)`+) 또는 `min-width: 44px`로 별도 확보 필요 — 토큰 자체가 target size를 보장하지 않음을 컴포넌트 스펙에 명시.

#### HR / Desk 듀얼 브랜드
- 모든 rounded 토큰은 brand-neutral — 양 브랜드 동일.
- 브랜드 톤 분기는 적용 강도로 처리: HR(B2B 절제) `md`/`lg` 위주, Desk(B2C 친근) `lg`/`xl` 위주. 토큰 분기 불필요.

## Components

### Button

규칙 · 수치는 공유 `DESIGN.md` 의 Button 절과 `specs/components/button.md` 다(2026-09-30 SEED Action Button 구조, v112). 브랜드마다 달라지는 건 brandSolid 의 채움 · 누름과 brandOutline · ghost(brand) 의 글자뿐이다 — hover · 누름의 세기나 전환 시간을 브랜드마다 달리하지 않는다(옛 HR · Desk 차등은 2026-09-30 에 걷었다).

| 자리 | 토큰 | 라이트 | 다크 | 대비 |
|---|---|---|---|---|
| brandSolid 채움 | `bg-brand-solid` | `#357B5F` | `#357B5F` | 흰 글자 5.06:1 · 다크 5.06:1 |
| brandSolid 누름 · 호버 · 로딩 | `bg-brand-solid-pressed` | `#256D52` | `#256D51` | 흰 글자 6.20:1 · 다크 6.20:1 |
| 브랜드 글자(brandOutline · ghost brand) | `fg-brand` | `#357B5F` | `#72B898` | `bg-layer-default` 위 5.06:1 · 다크 6.23:1 |
| 포커스 링 | `stroke-focus-ring` | 브랜드 역할 | 브랜드 역할 | 2px · 띄움 2px |

HR 은 데이터 밀도가 높은 화면이 많다 — 표 · 툴바의 인라인 액션(승인 · 반려)은 `small` · `xsmall`, 모바일 결재 화면의 하단 CTA 는 `large` 를 쓴다. brandSolid 는 휴가 신청처럼 서비스의 핵심 액션 하나에만 쓰고, 저장 · 확인 같은 일반 CTA 는 neutralSolid 다.

### Input · Textarea

공통 정의는 `DESIGN.md` 의 Input · Textarea 절, 원본은 `specs/components/input.md` · `textarea.md`(2026-10-01 SEED Text Input · Textarea). 포커스 · 오류 · 비활성 색은 브랜드와 관계없이 같다 — 포커스는 `stroke-neutral-contrast` 2px(브랜드 색 아님).

#### HR 쓰임

- HR 웹은 데스크톱이 대부분 — 반응형 기본(1280 이상 medium 40 · 글자 14). 폰 폭에서는 large 52 로 커진다.
- 결재 · 평가처럼 칸이 많은 폼도 크기를 섞지 않는다. 표(엑셀 셀) 안의 칸은 표 컴포넌트 차례에 정한다.
- 읽기 전용 값은 입력처럼 생긴 상자를 흉내 내지 않고 읽기 전용 칸(`bg-disabled` 바탕 · 진한 값)으로 둔다.

### Select · Input Button

공통 정의는 `DESIGN.md` 의 Select · Input Button 절, 원본은 `specs/components/select.md` · `input-button.md`(2026-10-01 SEED Select · Input Button). 고른 표시 · 누름 · 포커스 색은 브랜드와 관계없이 같다.

#### HR 쓰임

- HR 웹은 데스크톱이 대부분 — 반응형 기본(1280 이상 트리거 40 · 선택지 39), Input Button 은 칸 아래 팝오버로 연다(1280 미만은 시트).
- 휴가 신청 — 휴가 정책은 Select(설명 한 줄에 남은 일수), 날짜 · 기간은 Input Button(달력 팝오버 — "완료").
- 결재자 · 사람 고르기는 Input Button + 검색 팝오버(위 검색칸 · 아래 목록). 예 / 아니오를 받는 Select 는 Checkbox 로, 2 ~ 4개 폼 값은 Chip(그 차례에).

### Card

HR(B2B 데이터 밀도) — `default`/`outline` variant 위주, dashboard widget·data list 적극. `interactive`는 row click 행 단위.

#### Mode pair
- `card-light` (`#FFFFFF`) / `card-dark` (`#242938`)

#### Variant
| Variant | shadow | border | 사용 |
|---|---|---|---|
| **default** | `shadow-sm` | none | 일반 widget |
| **interactive** | `shadow-sm` → hover `shadow-md` | none | row click, list item |
| **outline** | none | `border-default` 1px | flat 데이터 그리드 (밀도 우선) |
| **flat** | none | none | inline 그룹 (dashboard 안 위젯) |

다크 카드는 `interactive`에 `border-default-dark` 1px 보강.

#### Padding
| Level | 값 | 사용 |
|---|---|---|
| sm | `md` (12px) | 작은 KPI 카드, inline list item |
| **md** (default) | `lg` (16px) | 대시보드 위젯, 데이터 카드 |
| lg | `xl` (24px) | detail panel (직원 상세, 평가 상세) |

HR은 `xl` padding은 hero 사용 사례 등장 시. 일반적으로 `sm`/`md` 위주.

#### Radius
- default `radius-md` (8px), 데이터 그리드 inline은 `radius-sm` (4px)

#### Layout
- 카드 그리드 gap: `md` (12px) — HR은 데이터 밀도 톤
- 카드 내부 콘텐츠 간격: `sm` (8px)

#### Motion
- interactive hover: `motion-duration-fast` × `motion-ease-out`
- accordion expand: `motion-duration-base`

#### A11y
- interactive: `<button>` 또는 `role="button"` + `tabindex="0"` + Enter/Space
- focus: 카드 외곽 `border-focus` 2px outline + 1px offset

### Page text

HR(B2B) — `bg-page` 위 본문은 dashboard layout, sidebar nav 텍스트 등. data-dense 화면에서 본문 가독성 우선.

#### Mode pair / contrast
- `page-text-light`: `bg-page #F5F6FA` × `text-primary #1A1F2E` = **15.04:1** ✅ AAA
- `page-text-dark`: `bg-page-dark #1A1F2E` × `text-primary-dark #F5F6FA` = **15.04:1** ✅ AAA

#### Typography
- 본문 `body-md` (15/400/1.6), 강조 `body-md` (15/600), 데이터 라벨 `caption` (12/400) + `text-secondary`
- 헤딩 위계: dashboard title `display-sm` (24/700), section `title-md` (18/600), widget title `title-sm` (16/600)

#### Layout
- 본문 max-width: 640px (한국어 1줄 35~40자, 데이터 화면 본문은 짧게)
- 단락 간 `md` (12px), 섹션 간 `lg`/`xl` (16~24px)

#### A11y
- 1.4.3 / 1.4.12 / 1.4.4 — 위 contrast + lineHeight 1.6 + 200% reflow 충족

### Caption

HR — meta 정보(직원명, 부서, 타임스탬프)·테이블 cell label에 적극.

#### 위계 / Mode pair / contrast
| Token | text | contrast (HR) |
|---|---|---|
| `caption-on-card-light` | `text-secondary` (`#535866`) | 6.78:1 ✅ |
| `caption-on-card-dark` | `text-secondary-dark` (`#B7BDCC`) | 6.85:1 ✅ |
| `caption-tertiary-on-card-light` | `text-tertiary` (`#62697A`) | 5.36:1 ✅ |
| `caption-tertiary-on-card-dark` | `text-tertiary-dark` (`#A2A8B7`) | 5.13:1 ✅ |

#### Layout
- 본문과 `xs` (4px) 간격
- 메타 그룹 구분자 `·`, 그룹 간 `xs` 간격

### Badge

HR — 직원 상태(재직/휴직/퇴사), 결재 상태(승인/반려/대기), 평가 등급 등 status indicator로 광범위 사용. semantic 4종 + count badge.

#### Variant
공유 토큰 그대로 — `badge-success` / `badge-error` / `badge-warning` / `badge-info`. contrast 5.27~6.31:1 모두 본문 AA.

#### Size
- 데이터 그리드 inline은 `sm` (18px), 일반 status는 `md` (22px), 강조 alert badge는 `lg` (28px)
- shape: pill(`radius-full`) 위주 — status pill 톤

#### Layout
- 직원명 옆 status: `xs` 간격
- 그룹(예: 평가 등급 + 부서) 시 `sm` 간격

#### A11y
- 1.4.1: status를 색상만으로 표현 금지 — 텍스트/아이콘 보강 ("재직 ✓", "휴직 ⏸")
- count badge: `aria-live="polite"` + `aria-label`

### Alert text

HR — form validation(직원 정보 입력 에러), 결재 상태 변경 안내, 시스템 공지 등.

#### Variant
공유 토큰 8종 그대로 — semantic 4 × {light/on-dark}. contrast 5.27~6.31:1 (light), 5.42~5.85:1 (on-dark) 모두 본문 AA.

#### Typography
- form helper(필드 아래): `caption` (12/400) + `xs` (4px) 간격
- 일반 alert 본문: `body-md` (15/400)
- alert 제목: `body-md` (15/600)

#### Layout
- icon + text 페어: icon `xs` 간격, size 16px (caption 높이에 맞춤)
- alert 영역 padding `sm` ~ `md`

#### Motion
- 등장: `motion-duration-base` × `motion-ease-out` (HR 절제 — 빠른 fade-in 권장)
- dismiss: `motion-duration-fast`

#### A11y
- error는 `role="alert"` (assertive), info/success는 `aria-live="polite"`
- form `<input aria-describedby="err-1">` + `<span id="err-1" class="alert-text-error">...`

### Focus ring

HR 브랜드 — `border-focus` (`#357B5F`) / `border-focus-light` (`#6BAE8C`) 사용. 모든 인터랙티브 컴포넌트(button / input / card-interactive / tab / link)의 focus 표현 통일.

#### Mode pair (sparse — primary 토큰이 contrast 검증 담당)
| Token | 색상 | 사용 |
|---|---|---|
| `focus-ring-on-light` | `border-focus` (`#357B5F`) | 라이트 표면 위 모든 컴포넌트 |
| `focus-ring-on-dark` | `border-focus-light` (`#6BAE8C`) | 다크 표면 위 모든 컴포넌트 |

#### Contrast (실측)
| 페어 | 대비 |
|---|---|
| `border-focus` (`#357B5F`) vs `bg-page` (`#F5F6FA`) | **3.31:1** ✅ UI |
| `border-focus` (`#357B5F`) vs `surface-default` (`#FFFFFF`) | **3.49:1** ✅ UI |
| `border-focus` (`#357B5F`) vs `surface-input` (`#F5F6FA`) | **3.96:1** ✅ UI |
| `border-focus-light` (`#6BAE8C`) vs `bg-page-dark` (`#1A1F2E`) | **5.16:1** ✅ UI/AA |
| `border-focus-light` (`#6BAE8C`) vs `surface-default-dark` (`#242938`) | **4.72:1** ✅ UI |

모든 라이트/다크 표면에서 2.4.11 (3:1 UI) 통과.

#### Spec
- 두께 2px, offset 2px(v106), shape 컴포넌트와 동일 `border-radius`. 입력칸 · 선택 상자는 입력 중 테두리 2px(State 절)
- `focus-visible` pseudo만 사용 (마우스 클릭 시 미표시)

#### Motion
- focus ring 등장: `motion-duration-color-transition` × `motion-ease-easing`(v106)
- `prefers-reduced-motion: reduce` 시 즉시 표시

#### A11y
- 2.4.11 / 2.4.12 / 2.4.13 — 위 contrast 충족, sticky header 아래 자동 스크롤 권장 (`scroll-margin-top`)
- 다크 모드는 `[data-theme="dark"]` 토글로 `--color-border-focus-light` 자동 적용

### Divider

HR — list separator, section break, sidebar/main 분할에 광범위 사용 (데이터 그리드 row separator 등).

#### Mode pair
- `divider-light` → `border-default` (`#E5E8EF`)
- `divider-dark` → `border-default-dark` (`#353B4D`)

#### Layout
- list item 사이 inline divider, padding 안쪽 inset (`md` 12px)
- section break 위/아래 `lg` (16px) 간격
- sidebar 수직 divider full height

#### A11y
- 시각 grouping 보조, semantic HTML 우선 (`<hr>` / `<section>` / `<aside>`)
- inline divider는 `aria-hidden="true"`

### Outline (border 시각 요소)

HR — modal 외곽선, 선택된 row highlight, inline editor in-progress.

#### Mode pair / contrast
- `outline-strong-light` → `border-strong` (`#7D8593`): surface-default 3.34:1 / bg-page 3.13:1 / surface-input 3.34:1 (모두 UI AA)
- `outline-strong-dark` → `border-strong-dark` (`#8B95A8`): bg-page-dark 3.97:1 / surface-default-dark 3.39:1 / surface-input-dark 4.05:1 (모두 UI AA)

#### 사용
- modal: `shadow-xl` + `outline-strong-light` 동시 (focus 분리감)
- 다크 modal: `shadow-xl-dark` + `outline-strong-dark`
- 선택 row: `outline-strong-light` 1px + `surface-input` 6% tint (선택, 강조 시)

### Disabled label

HR — 권한 부재(비-승인자가 결재 버튼 보지만 누르지 못함), 기간 만료(평가 종료 후 입력 disabled) 등 사용 불가 상태 표현.

#### Mode pair (sparse — textColor only)
- `disabled-label-light` → `text-disabled` (`#828995`, surface 위 약 3.69:1, 1.4.3 incidental 예외)
- `disabled-label-dark` → `text-disabled-dark` (`#7A8294`, dark surface 위 약 3.74:1)

#### Spec
- text color disabled, 배경 `bg-disabled` · 테두리 `stroke-neutral-weak` + cursor:not-allowed (v106 — 불투명도 0.5 는 걷음)
- **권장 동반 표현**: 컴포넌트 옆 `caption` (12/400) + `text-tertiary` "권한 없음" / "마감 종료" 등 reason text — 정상 contrast

#### A11y
- 1.4.3 incidental 예외 명시
- aria: form은 `disabled`, focus 필요 메뉴는 `aria-disabled="true"`
- screen reader가 "비활성화됨" 읽음

### Switch / Checkbox / Radio (control 묶음)

HR — 직원 정보 form(필수/선택 옵션), 권한 토글 switch, 평가 항목 다중 선택 checkbox 등 form 화면 광범위 사용. 오늘 HR 화면에 Radio · Switch 는 없다 — 켜고 끄기를 "예 · 아니오" 선택 목록으로 한다(공지 상단 고정 · 공휴일 매년 반복 · 휴가 정책 · 음력 여부). 앱 적용 단계에서 Switch · Checkbox 로 옮긴다(2026-09-30 조사).

#### 공통 spec (신규 토큰 없음)
- 세 컨트롤 모두 2026-09-30 SEED 구조로 바뀌었다(`specs/components/switch.md` · `checkbox.md` · `radio-group.md`) — 색 규칙은 셋이 같다(사용자 결정)
- 선택 · 켜짐: `bg-neutral-inverted`(짙은 회색) 채움 + `fg-neutral-inverted` 표시(체크 · 점 · 엄지)가 기본. `tone="brand"` 면 HR 초록(`bg-brand-solid`) + `static-white` — 서비스 핵심 흐름에서만
- 선택 안 됨 · 꺼짐: `stroke-neutral-solid` — Checkbox · Radio 는 1px 테두리, Switch 는 트랙 채움
- disabled: 전용 색(v106 — State 절) + cursor:not-allowed. 선택 · 켜진 채 막히면 모양 그대로 회색
- focus: 키보드 포커스에만 `stroke-focus-ring` 2px · 띄움 2px

#### Variant
- Switch: 트랙 38 × 24(`24`, 기본) · 26 × 16(`16`) · 52 × 32(`32`), 끄면 엄지가 0.8 로 작아진다 — 누르는 순간 적용되는 설정에만(권한 on/off 등), 저장해야 적용되는 값은 Checkbox
- Checkbox: 칸 20(`medium`, 기본) · 24(`large`), 일부 선택(indeterminate) 지원 — 직원 다중 선택 표 머리
- Radio: 동그라미 20(`medium`, 기본) · 24(`large`), 선택은 채운 원 + 가운데 점, 묶음은 세로 — 오늘 HR 화면에는 쓰는 곳이 없다

#### Layout
- form 행: label + control + helper, 행 간 `lg` (16px)
- group: vertical 시 항목 간 `md` (12px), horizontal `lg` (16px) — Checkbox · Radio 묶음은 스펙의 줄 사이 12 를 따르고, Radio 는 가로로 놓지 않는다(2026-09-30)
- touch hit area 44×44 (label 포함)

#### A11y
- HTML native `<input>` + `<label for>` 우선
- focus ring `border-focus` 2px, 키보드 Space (toggle/check), Radio arrow keys
- error 상태: Checkbox · Radio 는 칸 · 동그라미를 바꾸지 않고 묶음 아래 글로 알린다(2026-09-30). Switch 에는 오류 상태가 없다 — 저장에 실패하면 스위치를 되돌리고 무엇이 안 됐는지 알린다
- Switch 만 쓰는 설정 줄은 줄 전체가 누르는 영역이고, 줄의 제목이 스위치의 이름이 된다(`<label>` 또는 `aria-labelledby`) — 줄의 모양은 List 의 스위치 줄(`ListSwitchItem`)

### List

> 상세 spec(Anatomy / 줄의 종류 / 상태 / 모션 / Accessibility / Do-Don't)은 [`specs/components/list.md`](specs/components/list.md)가 단일 SoT, 수치는 `list.yaml` · `list-header.yaml`. 코드(`recipes/shadcn/components/ui/list.tsx`) · 예제(`recipes/shadcn/examples/list-examples.mjs`) · preview 4 source 동기.

- 구조: 목록(List) · 한 줄(List Item) · 목록 제목(List Header) · 줄 사이 선(ListDivider) — SEED List(2026-10-01). 설정 · 메뉴 · 선택 · 키-값 줄과 거래 · 할 일 · 알림 같은 내용 줄을 모두 List 로 그린다. RadioList 는 걷었다 — 하나 고르기는 오른쪽 라디오 줄(`ListRadioItem`).
- 한 줄: 위아래 `spacing-x3` (12) · 좌우 `spacing-global-gutter` (24) · 제목 `t5` 16 · 400 `fg-neutral` · 설명 `t3` 13 `fg-neutral-subtle`(제목 아래 2) — 한 줄 46 · 두 줄 66.
- 앞: 설정 · 메뉴 줄은 아이콘 22(`fg-neutral`), 색이 뜻을 가진 내용 줄은 타일 40(모서리 `radius-r3` 12 · `chart-{색}-weak` 바탕 · 아이콘 20). 체크 · 라디오는 24, 스위치는 32.
- 뒤: 값 글자(`t5` · `fg-neutral-subtle`) · 오른쪽 화살표 18(화면을 옮기는 줄에만) · 컨트롤 · 작은 버튼.
- 누름 · 호버(웹): 바탕 층이 좌우 6 들어와 모서리 10 의 `bg-layer-default-pressed` 가 되고, 콘텐츠 층만 2px 거리로 준다(v104). 끼운 컨트롤은 따로 줄지 않는다. 포커스 링은 줄 안쪽 2px.
- 강조: 바탕만 `bg-brand-weak`(누름 · 호버 `bg-brand-weak-pressed` — 그동안 설명 · 값 글자는 `fg-neutral-muted`, 4.5:1 을 지키려고).
- 줄 사이 선은 기본 없음 — 필요할 때만 `ListDivider`(1px `stroke-neutral-subtle`, 줄 폭 또는 좌우 24 들임).
- 목록 제목: `t4` 14 · 위아래 8 · 좌우 24 — `mediumWeak`(500 · `fg-neutral-subtle`, 기본) · `boldSolid`(700 · `fg-neutral`).
- HR — 오늘 줄 모양 24가지 · 목록 33곳, 오른쪽 화살표 0, 줄 전체를 누르는 10 중 키보드로 닿는 것 3(2026-10-01 조사). 앱 적용 단계에서 List 로 옮긴다.
- 목록은 흰 바탕(`bg-layer-default`) · 시트(`bg-layer-floating`) 위에 둔다 — 회색 바탕(`bg-layer-basement`) 위에서는 누름 바탕이 보이지 않는다(카드에 담는다).

### Select Box

> 상세 spec(Anatomy / 컨트롤 / 배치 / 상태 / 펼침 / 모션 / Accessibility / Do-Don't)은 [`specs/components/select-box.md`](specs/components/select-box.md)가 단일 SoT, 수치는 `select-box.yaml`. 코드(`recipes/shadcn/components/ui/select-box.tsx`) · 예제(`recipes/shadcn/examples/select-box-examples.mjs`) · preview 4 source 동기.

- 구조: 하나 고르기(Radio Select Box) · 여럿 고르기(Check Select Box) · 묶음(Select Box Group) — SEED Select Box(2026-10-01). 설명 · 아이콘 · 딸린 입력이 붙는 선택지 2 ~ 6개를 견줘 고르고, 저장 · 다음 같은 버튼으로 반영한다. Tile 은 걷었다.
- 상자: 모서리 `radius-r3` (12) · 안쪽 1px `stroke-neutral-weak`. 고르면 안쪽에 2px `stroke-neutral-contrast`(v113)를 덧그린다 — 내용이 밀리지 않고, 바탕은 그대로다(브랜드 색 없음).
- 글자: 제목 `t5` 16 · 500 `fg-neutral` · 설명 `t3` 13 `fg-neutral-muted`(두 줄까지). 앞 아이콘 22(`fg-neutral`).
- 컨트롤은 오른쪽 — 라디오 20(neutral) · 칸 없는 체크(Checkbox Ghost) · 없음(테두리만, 좁은 3열 같은 자리). 컨트롤은 따로 줄지 않고 자기 포커스 링도 그리지 않는다.
- 배치: 1열은 가로형(위아래 16 · 왼쪽 20 · 오른쪽 16, 세로 가운데), 2 ~ 3열은 세로형(위아래 20 · 좌우 16, 앞이 위 · 컨트롤은 위 오른쪽). 묶음 줄 사이 `spacing-component-default` · 열 사이 12, 2열 이상이면 모든 상자가 가장 긴 상자의 높이다. 가장 작은 상자 54.
- 누름 · 호버(웹): 상자 바탕이 `bg-layer-default-pressed` 가 되고 누르는 자리(콘텐츠 + 컨트롤)만 2px 거리로 준다(v104). 키보드 포커스 링은 상자 바깥 2px · 띄움 2px.
- 펼침: 고른 상자 아래로 딸린 입력 · 안내가 열린다(안쪽 좌우 20 · 아래 16, 높이 400ms · 투명도 300ms). 닫히면 보이지 않고 Tab 도 닿지 않는다.
- 누르는 순간 바뀌는 고르기(테마 같은)는 List 의 라디오 줄, 누르면 바로 무언가를 하는 자리는 버튼이다.
- HR — 상자 4 패턴 · 5곳이 모두 손으로 짠 여럿 고르기(권한 · 역할 할당 · 플랜 정책 · 시스템 데일리 체크)다(2026-10-01 조사). 하나 고르기는 지금 모두 드롭다운이다 — 휴가 정책의 부여 방법 · 가변 부여 여부처럼 설명이 붙는 고르기는 앱 적용 단계에서 Select Box 로 옮긴다.

### Tabs

HR — 직원 detail page(기본정보/근태/평가/급여 등 섹션 전환), dashboard 카테고리(전체/내 부서/필터된 view), 설정 페이지 grouping.

#### Variant
- **underline** (default): bottom border 2px `border-focus` (`#357B5F`, primary alias) + `text-primary` active
- **vertical** (sidebar): 좌측 border 2px + `surface-input` 배경 — HR sidebar nav 친화

#### Size
- 데이터 화면 default: `md` (44px) — `body-lg` 15/600
- 빈도 높은 sub-tab: `sm` (36px) — `caption` 12/400

#### Layout
- tab list 하단 `divider-light` 1px line, active tab 2px border가 line 덮음
- tab panel padding `lg` (16px)

#### Motion
- underline indicator slide: `motion-duration-fast`
- panel 전환: instant (HR은 데이터 표시 우선이라 fade animation 없이 즉시)

#### A11y
- role tablist/tab/tabpanel + aria-selected/aria-controls/aria-labelledby
- 키보드: ←→/Home/End/Enter/Space, vertical은 ↑↓
- manual activation default (focus ≠ activation) — HR은 form 화면 많아 자동 전환 시 입력 손실 가능

### Dropdown (Menu / Select 공통 패턴)

> Select(폼 값 고르기)는 2026-10-01 Select · Input Button 절로 옮겼다(SEED Select · Input Button) — 이 절의 select · multi-select · combobox 줄은 옛 기준이고 쓰지 않는다. Menu 는 그 차례에 다시 정한다.

HR — 직원 선택, 부서 선택, 결재 액션 메뉴(승인/반려/위임), 평가 등급 선택, 필터 옵션 등에서 광범위 사용.

#### Structure (신규 토큰 없음)
- panel: `surface-default` + `outline-strong-light` 1px + `shadow-md` + `radius-md`
- item: height 36px, padding `sm`/`md`, text `body-md` (15/400)
- hover `surface-input`, selected primary 좌측 stroke 또는 ✓ (`#357B5F`)

#### Variant
- menu(action), select(form), multi-select(checkbox item), combobox(search input + filter)

#### Layout
- panel max-height 400px (초과 시 scroll), min-width trigger width 또는 `lg` (16rem)
- offset `xs` (4px), 자동 flip

#### Motion
- 등장 scale+fade `motion-duration-fast`, 사라짐 동일

#### A11y
- role: menu/menuitem 또는 combobox/listbox/option, trigger `aria-expanded`+`aria-haspopup`
- 키보드: ↑↓/Home/End/Enter/Esc/typeahead
- focus: 열릴 때 첫 item, 닫힐 때 trigger return
- dismiss: 외부 click/Esc/trigger 재click

### Tooltip

HR — icon-only action button(승인/반려/편집/삭제 icon) 의미 설명, 데이터 테이블 cell truncated 텍스트, 키보드 단축키 안내. desktop 우선이라 hover-driven tooltip이 광범위 사용.

#### Structure (신규 토큰 없음)
- 표면: `surface-default-dark` + `text-primary-dark` (11.40:1 AAA)
- shadow `shadow-sm`, radius `radius-sm`, padding xs/sm

#### Layout
- text: `caption` (12/400), max-width 240px, max 2줄
- arrow optional, offset `xs` (4px) gap

#### Motion
- hover delay 500ms, focus 0ms 즉시
- 등장: fade-in `motion-duration-fast`, 사라짐 동일

#### A11y
- WCAG 1.4.13: dismissible(Esc), hoverable, persistent
- icon-only button: tooltip + `aria-label` 동시 (screen reader 보강)
- 데이터 그리드 truncated cell: hover 시 tooltip + 키보드 focus도 동등

### Toast

HR — 결재 처리 완료, 직원 정보 저장, 시스템 알림 등 짧은 작업 결과 표시.

#### Structure (신규 토큰 없음)
- 표면: `surface-default` + `shadow-md` + `radius-md`
- semantic 4종 좌측 4px stroke + icon (`success`/`error`/`warning`/`info`)
- text: `body-md` (15/400) + (선택) `body-lg` 제목

#### Position
- desktop default: top-right (24px 여백)
- 모바일 앱(승인 등): top-center

#### Layout
- max-width 360px, padding `md` (12px), icon+text 간격 `sm` (8px)
- 중첩 시 stack 위→아래, `xs` 간격

#### Motion
- 등장: slide-in + fade (`motion-duration-base`)
- 자동 닫힘: success/info 4s, warning 6s, error 8s, hover pause
- 사라짐: slide-out + fade (`motion-duration-fast`)

#### A11y
- error는 `role="alert"` + `aria-live="assertive"`, 그 외 `role="status"` + polite
- 자동 닫힘 시간 prefers-reduced-motion +50% 또는 시스템 설정으로 조정 가능
- focus 빼앗지 않음, dismissible `aria-label="알림 닫기"`

### Modal

HR — 결재 처리(승인/반려 confirm), 직원 정보 편집, 평가 입력, 권한 변경 등 form/decision flow에서 광범위 사용. desktop 우선이라 centered modal 위주.

#### Structure
- overlay: `overlay-dim-light` / `overlay-dim-dark` (page click 시 닫기 — destructive action 없는 modal만)
- container: `surface-default` + `outline-strong-light` 1px + `shadow-xl` (dark는 `shadow-xl-dark`)
- 3 영역: header(title + close) / body-lg / footer (action buttons)

#### Variant
- sm 384px: 확인 다이얼로그 ("승인하시겠습니까?")
- **md 480px** (default): 직원 단일 정보 편집
- lg 640px: 다단계 평가 입력, 복잡한 form
- mobile (모바일 앱 한정): full sheet bottom-up

#### Layout
- container padding: `xl` (24px)
- header/body-lg 간격: `lg`, body-lg/footer 간격: `xl`
- footer button 정렬: 우측, primary action 우측 끝, secondary action 그 좌측

#### Motion
- 등장: overlay `motion-duration-base` fade + container `motion-duration-slow` scale+fade
- 사라짐: 역순, `motion-duration-base`

#### A11y
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` + focus trap + ESC close + return focus + scroll lock
- destructive action(삭제, 영구 변경)은 `role="alertdialog"` + 명시 confirm

### Chart color (palette)

HR — dashboard chart (직원 분포, 평가 결과, 부서별 비교, 휴가 사용률 등)에 광범위 사용. 10색 palette × 2 mode.

#### 사용 시나리오
- **bar/column chart**: 부서별/직급별 비교 — `chart-color-blue`/`indigo`/`green` 등 brand-친화 3색 우선
- **pie/donut**: 평가 등급 분포(S/A/B/C/D) — 5색 사용, S는 `chart-color-green`, D는 `chart-color-red` (의미 매핑 가능 시)
- **heatmap**: 부서별 출석률 — 단일 hue (예: `chart-color-blue`) + opacity 그라데이션
- **stacked bar**: 휴가 종류별 — 10색 palette 순서대로

#### Hue 의미 매핑 권장 (HR context)
| Hue | 권장 의미 |
|---|---|
| green | 긍정 (출석, 정상, 우수) |
| blue | 중립 default (정보) |
| yellow | 주의 (지각, 임박 만료) |
| red | 부정 (결근, 미달) |
| gray | 비활성/종료 |

semantic 토큰(success/error/warning/info)과 hue 일관성 유지 — `chart-color-green`은 `success`와 친화 hue.

#### Layout
- chart 영역 padding `lg` (16px), legend `xs` 간격 + `caption` 12/400
- 카드 안 chart: card padding `md` (12px)

#### Motion / A11y
- 진입 `motion-duration-slow`, hover `motion-duration-fast`
- 1.4.1 색상 단독 금지 — legend 라벨 + 패턴 (해당 시) 보강
- screen reader: `<table>` fallback 또는 svg `role="img"` + 데이터 요약

### Avatar (v58 추가)

HR(B2B) — 직원 카드, 조직도, 결재 큐 author, 평가 reviewer 등 모든 사용자 식별. 데이터 밀도 톤이라 sm/md 사이즈 위주.

#### HR 사용 패턴
- **데이터 그리드 inline**: `sm` 24px 사각형 (`radius-md`) — 정보 밀도 우선.
- **직원 list**: `md` 32px 원형 default.
- **직원 detail panel**: `lg` 40px or `xl` 56px 원형.
- **조직도 트리**: `sm` 24px 원형 + 이름 우측 `body-md` (15/400).

#### Color
- chart palette 10색 hash(이름) 분배 또는 부서별 매핑(예: 디자인본부 `chart-violet`, 운영본부 `chart-blue`) 컴포넌트 레벨 결정.
- HR primary `#357B5F`(forest green)와 chart-green `#167F3F`(v110) hue 비슷 — 부서/직원 색 분배 시 `chart-green` 회피 권장.

#### Status (선택, HR-specific)
재직(`success`) / 휴직(`warning`) / 퇴직(`error`) inline indicator. avatar 우하단 8×8 dot.

#### Sparse 매핑
DESIGN.md와 동일 (`avatar` chart-blue × text-on-accent, lint contrast 활성).

### Calendar (v61 추가)

HR(B2B) — 휴가 신청·결재 일정·근태 캘린더·평가 일정 등 핵심 일정 컴포넌트. 데이터 밀도 우선이라 lg 사이즈(40px) 기본, 정보 표기 풍부.

#### HR 사용 패턴
- **휴가 신청 range**: 시작일·종료일 2-step 선택 → range-start/mid/end 표시. 주말·공휴일 자동 disabled (휴가 일수 계산 제외).
- **결재 일정 marker**: 셀 우하단 4×4 dot (`primary` `#357B5F` 채움) — 해당일 결재 항목 존재 표시. 셀 클릭 시 결재 list dropdown.
- **근태 캘린더**: 출근(`success` 4×4 dot 좌하단), 지각(`warning`), 결근(`error`) — 일별 상태 표기.
- **평가 일정**: 평가 기간 range를 `primary-light` 배경으로 강조 (피선택 결과 아닌 정보 표시 — selected variant와 톤 분리 위해 stroke 1px outline 추가).

#### Layout 차이
- 데스크탑 우선: lg 사이즈 (40×40) default. 모바일은 md (36×36).
- 휴가/근태 화면은 풀 페이지 캘린더 — month/year navigation 헤더 좌우에 `오늘로 이동` 버튼 (`button-primary` sm).
- 결재 큐와 통합된 mini calendar: sm (32×32) inline + 우측 결재 list 패널 (sticky).

#### Color
- selected (single/range-start/range-end): `primary` `#357B5F` 채움 + `text-on-accent`.
- range-mid: `primary-light` `#6BAE8C` 배경 + `text-primary`.
- today indicator (선택 안 됐을 때): `border-focus` `#357B5F` 1px outline + `primary` 텍스트.

#### Touch target
데스크탑 우선이라 `touch-min` (44×44) 충족 위해 lg 사이즈(40×40)에 외곽 padding `xs` (4px) 보강. 모바일 화면 전환 시 md(36×36)에서 padding `sm` (8px) 적용.

#### Sparse 매핑
신규 yaml 컴포넌트 0. 기존 `button-primary`(selected cell), `alert-text-success/error/warning`(근태 dot color), `card-light`(셀 default ground)이 contrast 페어 활성.

### Field — HR

공통 정의는 `DESIGN.md` 의 Field 절, 원본은 `specs/components/field.md`(2026-10-01 SEED Field). 옛 v62 Form layout · v75 Form validation 의 HR 절은 여기로 합쳤다.

#### HR 쓰임

- 결재 · 직원 등록 · 평가 입력처럼 칸이 많은 폼 — 필수가 2/3 이상이면 선택 칸에만 "선택". 라벨은 칸 위(왼쪽 라벨 배치는 두지 않는다).
- 저장 · 신청 버튼은 켜 두고, 누르면 칸마다 오류 + 첫 오류 칸으로 포커스. 결재 라인 누락처럼 서버가 가르는 오류도 그 칸의 오류 글로 돌려준다.
- 사번 · 이메일 중복 확인은 칸을 떠난 뒤 서버에 묻는다 — 확인하는 동안 설명 자리에 "확인하는 중…". 중복이면 제출을 막는다.
- 휴가 일수처럼 두 칸을 함께 보는 규칙은 뒤 칸(종료일)의 오류 글로 알린다 — "남은 연차(3일)보다 길게 신청할 수 없어요.".
- 글자 수 — 서버 제한(20 · 50 · 100 · 1000자)이 있는 칸은 Field 의 글자 수로 알린다.
- 문구는 Writing(v106) — HR 도 해요체다("사번을 입력해주세요." · "이미 등록된 사번이에요.").
- 결재 의견 · 권한 설정 같은 시트 · 대화상자도 값이 바뀐 채 닫으려 하면 "작성한 내용이 사라져요" 를 묻는다.

### Skeleton / Loading (v63 추가)

HR(B2B) — 데이터 그리드·결재 큐·직원 list 로딩 상태. 데이터 밀도 우선이라 list-row variant 위주, dense layout 유지.

#### HR 사용 패턴
- **결재 큐 로딩**: list-row 5-7개 (avatar 32 + 이름 lg + 상태 badge 위치 + 시간 caption). 실제 row와 정확히 동일 height(60px).
- **직원 검색 결과**: list-row 10개 (그리드 형태) — sm avatar 24 + 이름 + 부서 + 직급. shimmer는 한 그룹씩 동시 (페이지 단위).
- **결재 detail 로딩**: rect (heading 30px) + text 4-line + rect (button area 40px). detail panel 전체 placeholder.
- **dashboard 위젯 로딩**: rect (각 위젯) — KPI 카드 4개, 표 1개. 위젯 단위로 loading (전체 페이지 spinner 비권장).

#### 정보 밀도
- list-row 사이 gap: `xs` (4px) — 일반 list보다 dense.
- shimmer 1주기는 `motion-duration-loop` (1500ms) 표준 — 너무 빠르면 산만, 너무 느리면 응답 없음 인상.
- 5초 이상 로딩 시 위젯 우상단에 `text-tertiary` "오래 걸리는군요... 새로고침" link 표시.

#### Reduced motion
사용자 시스템 설정 존중 — `prefers-reduced-motion: reduce` 시 shimmer 정지, `surface-input` 단색 + 작은 spinner 1개로 fallback.

### Pagination / Drawer / Spinner / Stepper (v67 추가 batch)

HR(B2B) 4 컴포넌트 사용 패턴 — DESIGN.md 공통 spec 외 brand-specific 안내.

#### Pagination — HR
- **데이터 그리드 footer**: numbered variant (1 2 3 ... 10) — 결재 list, 직원 검색, 평가 history 등 양 예측 가능 도메인.
- **load-more 회피**: 결재·근태 데이터는 "전체 개수" 인지가 중요 (decision-making) → numbered 우선.
- size: lg 48 데스크탑 (mouse hit 정밀), sm 32 inline (테이블 row 안 mini paging은 비권장 — 페이지 단위로).

#### Drawer — HR
- **side drawer** (right): 직원 클릭 시 우측 슬라이드 detail panel. 너비 480px (`min(80vw, 480px)`).
- **결재 의견 drawer**: footer에 primary("승인") + secondary("반려") + tertiary("보류") 3 액션.
- **권한 설정 drawer**: form layout horizontal, 좌측 라벨 + 우측 control. 닫기 시 unsaved changes 확인.
- focus trap + Esc dismiss + return focus 모두 필수.

#### Spinner / Progress — HR
- **결재 처리 중 inline spinner**: 승인 클릭 시 button 안 sm 16 spinner + "처리 중..." 라벨 (text-on-accent 위 white spinner).
- **데이터 동기 progress**: dashboard 상단 indeterminate progress bar (linear, 4px, primary). 동기 완료 시 success 색 1초 → fade out.
- **bulk operation determinate progress**: 100건 일괄 승인 등 — percentage 표시 ("47 / 100").

#### Stepper — HR
- **결재 단계 horizontal**: 신청 → 1차 결재 → 2차 결재 → 완료. sequential, 이전 단계 비완료 시 진입 차단.
- **휴가 신청 form 3 step**: 1) 사유·기간 → 2) 결재라인 → 3) 첨부 검토. desktop horizontal, 모바일 자동 vertical 전환.
- **평가 작성 stepper**: 5단계 — 자기평가 → 동료평가(3) → 관리자평가. step 사이 connector progress 채우기 visual.

### Navigation batch (v68 추가)

HR(B2B) 5 navigation 컴포넌트 — DESIGN.md 공통 spec 외 brand-specific 안내. 데이터 그리드 + 다단계 페이지 위계 깊은 application 톤.

#### Breadcrumb — HR
- 결재 큐 → 결재 항목 detail → 첨부 view 같은 4-5 depth 일반. truncation 빈번 — `Home / ... / 결재 큐 / 김지원 휴가 신청`.
- font-size lg `body-sm` (14/400) — 데이터 밀도 톤이지만 경로 인지는 우선.

#### Sidebar — HR
- **fixed** 좌측 280px 데스크탑 default. collapsible 옵션(접힘 64px icon만).
- nav 그룹: 결재 / 평가 / 직원 / 권한 / 설정 (5 그룹) — group title `caption` 12/600 uppercase.
- footer: 사용자 profile + 로그아웃.
- HR primary `#357B5F` 4px 좌측 stroke + `surface-input` 배경 active state.

#### Navigation Menu — HR
- mega menu 비활성 — application 톤이라 단순 single-level. 결재 / 평가 / 직원 / 분석 / 설정 5 link.
- 데이터 그리드 페이지 위주라 hover preview 같은 광고성 mega 패턴 부적절.

#### Menubar — HR
- 데스크탑 application 메타포 강조 — File / Edit / View / Tools / Help.
- HR-specific: **결재 메뉴** (Alt+A — Approve), **평가 메뉴** (Alt+E — Evaluate), **내보내기** (Cmd+E — Export to PDF/Excel).
- keyboard shortcut 적극 — power user (관리자, 본부장 등) 빠른 처리.

#### Command (Cmd+K) — HR
- 결재 빠른 처리: "김지원 휴가 승인" / "5월 평가 시작" 자연어 명령.
- Sections: Recent approvals / Employees (search) / Reports (분석 페이지) / Help.
- 직원 검색이 핵심 — typing으로 사번/이름 instant filter.

### Input batch (v69 추가)

HR(B2B) 5 input 컴포넌트 — 데이터 그리드 + form 입력 위주.

#### Combobox — HR
- **직원 검색**: 사번 또는 이름 typing → autocomplete dropdown. 결재라인 지정, 평가 대상 선택 등.
- **부서 선택**: tree 구조 부서 list — combobox + indent. typing으로 fuzzy match.
- multi-select: 결재 참조자 다중 추가 (chip list).

#### Slider — HR
- **평가 점수**: 1-5 또는 1-10 single slider. tick 표시 + 정수 step.
- **연차 사용 시뮬레이터**: range slider — 시작일/종료일 day 단위.
- 데스크탑 위주, 정밀 hit (`touch-nav-h` 32 thumb).

#### Toggle — HR
- **데이터 그리드 view 토글**: 카드 view ↔ 테이블 view 1 toggle.
- **결재 상태 필터**: 대기/처리중/완료 toggle group (multiple).

#### Toggle Group — HR
- **결재 상태 필터** (multiple): "대기" + "처리중" 동시 표시 가능.
- **정렬 옵션** (single): 이름순/날짜순/우선순위순 — radiogroup.

#### Input OTP — HR
- **2차 인증** (관리자 권한 변경 시): 6자리, SMS 자동 채우기.
- **결재 승인 확인** (고액 결재): 4자리 PIN 입력으로 추가 보안.

### Disclosure batch (v70 추가)

HR(B2B) 5 disclosure/overlay 컴포넌트.

#### Accordion — HR
- **결재 detail 그룹**: 신청 정보 / 첨부 / 결재 history 3 섹션 — single mode (한 번에 하나만 펼침).
- **권한 설정 그룹**: 일반 / 결재 / 평가 / 보고서 권한 — multiple mode (여러 영역 동시 검토).
- **평가 항목 list**: 자기평가 5 카테고리 — 항목별 펼침으로 입력.

#### Collapsible — HR
- **결재 첨부 expansion**: "첨부 파일 3개" 트리거 → expand로 file list.
- **권한 detail "더 보기"**: 기본 정보 + collapse된 추가 권한.

#### Hover Card — HR
- **직원 mini profile**: 직원 이름 hover → avatar + 부서 + 직급 + 이메일 + 결재라인 가능 여부 + "쪽지" 버튼.
- **결재 라인 hover**: 결재자 이름 hover → 본인 외 결재 가능자 list.

#### Context Menu — HR
- **결재 row right-click**: 승인 / 반려 / 보류 / 위임 / 삭제 (destructive 우측 분리).
- **직원 grid right-click**: 메시지 / 결재 위임 / 권한 변경 / 정보 export.
- 데이터 그리드 power user (관리자) 빠른 action.

#### Alert Dialog — HR
- **결재 반려**: "정말 반려하시겠어요? 신청자에게 알림이 가요." + 사유 입력 textarea.
- **권한 회수**: "이 직원의 모든 권한을 회수합니다. 복구는 관리자 승인 필요." (destructive 강조).
- **평가 삭제**: 작성 중 평가 삭제 confirm — 영구 삭제 명시.

### Data batch (v71 추가)

HR(B2B) 5 data display 컴포넌트 — 데이터 그리드 핵심 application 톤.

#### Table — HR
- **결재 list compact variant**: 행 padding `xs` (4px) — 한 화면에 더 많은 결재.
- **직원 list striped variant**: 짝수 row tinted — 긴 list 가독성.
- **평가 history default**: 일반 가독성, 표 안 status badge.

#### Data Table — HR
- **결재 큐**: sortable(date/요청자/금액) + filterable(상태/부서) + selectable(일괄 처리) + bulk actions(승인/반려/내보내기) + 50 per page numbered pagination.
- **직원 검색**: 13 column 표시 (사번/이름/부서/직급/이메일/입사/근속/...). column visibility toggle, column resize, export Excel.
- **평가 history**: 분기별 column, 검색·정렬·내보내기 모두 지원.
- toolbar 좌측 search, 가운데 active filter chips, 우측 column toggle + Export.

#### Carousel — HR
- 거의 사용 안 함 — application 톤이라 광고 carousel 부적합.
- 예외: dashboard 위젯 carousel (mobile에서 4 위젯 swipe).

#### Scroll Area — HR
- **데이터 그리드 sticky thead** + 본문 scroll: 표 머리 고정 + body-lg 영역 scrollable.
- **결재 detail 긴 panel**: 첨부 history 100+ — scroll area 안에서 native scroll 보존.
- always-visible scrollbar — 데스크탑 application 톤.

#### Resizable — HR
- **3-pane layout**: 좌측 sidebar(고정) + 가운데 결재 list + 우측 detail panel — 가운데↔우측 resizable.
- **dashboard split**: 위 KPI / 아래 차트 panel — vertical resize.
- localStorage persistence — power user 자기 layout 기억.

### Extras batch (v72 추가)

HR(B2B) 5 추가 컴포넌트.

#### Sonner — HR
- **top-right position** 데스크탑 default — 결재 알림 빈도 높음, 시야 상단 명확.
- 결재 승인/반려 결과 stack — 일괄 처리 시 동시 5+ toast 가능.
- "실행 취소" action: 잘못 승인한 결재 5초 안에 revert 가능.
- 5초(success) / 10초(error) auto-dismiss — error는 사용자 인지 시간 ↑.

#### Aspect Ratio — HR
- **16:9** 직원 프로필 cover image
- **3:1** 부서 banner
- **4:3** 결재 첨부 이미지 preview (legacy 비율)
- 사용 빈도 낮음 — application 톤이라 image-heavy 부적합.

#### Chart — HR
- **bar / stacked bar**: 부서별 직원 수, 월별 결재 수, 평가 점수 분포
- **line**: KPI 추이 (월별 출근율, 분기별 응답시간)
- **pie / donut**: 결재 처리 시간 분포 (1시간 이내 / 하루 / 일주일 등)
- chart palette HR primary와 충돌 회피 — chart-green 비활성, chart-blue 우선
- legend interactive 적극 — 시리즈 토글로 데이터 비교

#### Date Range Picker — HR
- **dual picker** 데스크탑 default — 다른 달 동시 보기.
- 휴가 기간 선택 (5/12 ~ 5/14) — preset "이번 주" / "다음 주" / "이번 달" 빈번.
- 결재 history 검색 — preset "지난 30일" / "이번 분기" / "이번 년도".
- 평가 기간: "Q1" (1/1-3/31) / "Q2" / "Q3" / "Q4" preset.

#### Time Picker — HR
- **dropdown picker** 데스크탑 — 결재 일정, 회의 예약 등.
- step **5분** default — 결재 일정 5분 단위 권장.
- 24h format default — 비즈니스 톤.
- 마감 시각 입력: "오늘 18:00" / "내일 09:00" preset 단축키.

### Extras-2 batch (v73 추가)

HR(B2B) 5 추가 shadcn 누락 컴포넌트.

#### Banner — HR
- **약관 변경 예정** warning variant — "2026-06-01부터 개인정보 처리방침이 변경됩니다" stripe 영구 노출.
- **시스템 점검 공지** info variant — 결재 시스템 새벽 점검 사전 안내, dismiss 가능.
- 페이지 최상단 (header 아래) 고정 위치 — 스크롤 시 따라가지 않음.
- error variant — 결재 시스템 일시 장애, 휴가 신청 불가 등 critical 알림.
- 본인이 직접 dismiss 전엔 유지 — 새로고침 후에도 표시 (localStorage `dismissed-banner-{id}`).

#### Tag / Chip — HR
- **결재라인 chip** — 결재자 추가 시 "[홍길동 ×]" multi-chip 표시, X 클릭으로 제거.
- **권한 그룹 chip** — 직원 권한 편집 시 "관리자 / HR-only / 일반" multi-select chip.
- **부서 / 직급 multi-filter** — 직원 검색 결과 좁히는 chip group.
- closeable variant 우선 — 결재라인 / 권한 변경 가능성 높음.
- input variant 함께 쓸 때 enter로 chip 추가 — 이메일 초대 multi-input과 같은 패턴.

#### Popover — HR
- **결재 의견 입력** — 승인/반려 옆 작은 댓글 아이콘 클릭으로 popover 열림. textarea + 첨부 + 확인 button.
- **직원 빠른 정보** — 직원명 옆 (i) 아이콘 클릭으로 부서/직급/연락처 mini card.
- **휴가 잔여 정보** — 휴가 신청 form에서 "남은 연차?" 클릭, 잔여일수 + 사용 history 4-5건.
- **bottom-start placement** default — form context에서 아래로 펼치는 게 자연스러움.
- click trigger default — hover는 결재 같은 critical action에 부적합.

#### File Upload — HR
- **평가 첨부** — 인사평가 단일 PDF 업로드 (max 10MB), 1년 유지.
- **결재 첨부 이미지/문서** — multi 가능 (max 5개 / total 50MB), 영수증·계약서 등.
- **드래그-드롭** + click-to-browse 동시 지원, 파일 list with 진행률 bar.
- 허용 type: PDF / DOC(X) / 이미지(JPG/PNG) — exe/script 차단.
- 업로드 실패 시 error variant + 재시도 button — 결재 큐에서 빠지지 않도록.

#### Treeview — HR
- **조직도 탐색** — 회사 → 본부 → 팀 → 직원 4단계 nested tree.
- 직원명 노드 selected 시 우측 panel에 상세 표시 (master-detail).
- expand/collapse: 본부/팀 레벨 자식 ≥ 1 — 직원은 leaf node.
- 검색 input 동기화 — 필터링 시 매칭 노드까지 자동 expand + highlight.
- **권한 트리 편집** — admin이 부서별 권한 그룹 토글, checkbox 통합 variant.
