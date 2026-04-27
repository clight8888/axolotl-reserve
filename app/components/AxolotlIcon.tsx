// Cute chibi-style axolotl SVG icon
interface AxolotlIconProps {
  size?: number;
  className?: string;
}

export default function AxolotlIcon({ size = 48, className = '' }: AxolotlIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Axolotl"
    >
      {/* ── Tail ── */}
      <ellipse cx="98" cy="72" rx="14" ry="9" fill="#FFB3C6" transform="rotate(-20 98 72)" />
      <ellipse cx="104" cy="64" rx="9" ry="6" fill="#FFC8D8" transform="rotate(-35 104 64)" />

      {/* ── Body ── */}
      <ellipse cx="62" cy="78" rx="32" ry="22" fill="#FFD6E7" />

      {/* ── Head (big round chibi head) ── */}
      <circle cx="52" cy="58" r="30" fill="#FFD6E7" />

      {/* ── Cheek blush ── */}
      <ellipse cx="34" cy="66" rx="8" ry="5" fill="#FFB3C6" opacity="0.5" />
      <ellipse cx="70" cy="66" rx="8" ry="5" fill="#FFB3C6" opacity="0.5" />

      {/* ── Gill stalks LEFT — feathery & prominent ── */}
      {/* Main stalk 1 */}
      <line x1="28" y1="42" x2="14" y2="16" stroke="#FF85B3" strokeWidth="3" strokeLinecap="round" />
      <line x1="14" y1="16" x2="7"  y2="8"  stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="16" x2="20" y2="7"  stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="16" x2="9"  y2="19" stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <circle cx="7"  cy="8"  r="2.5" fill="#FF85B3" />
      <circle cx="20" cy="7"  r="2.5" fill="#FF85B3" />
      <circle cx="9"  cy="19" r="2"   fill="#FF85B3" />

      {/* Main stalk 2 */}
      <line x1="24" y1="38" x2="8"  y2="26" stroke="#FF85B3" strokeWidth="3" strokeLinecap="round" />
      <line x1="8"  y1="26" x2="2"  y2="18" stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <line x1="8"  y1="26" x2="3"  y2="30" stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <circle cx="2"  cy="18" r="2.5" fill="#FF85B3" />
      <circle cx="3"  cy="30" r="2"   fill="#FF85B3" />

      {/* Main stalk 3 */}
      <line x1="30" y1="47" x2="12" y2="40" stroke="#FF85B3" strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="40" x2="5"  y2="35" stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="40" x2="7"  y2="45" stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <circle cx="5"  cy="35" r="2.5" fill="#FF85B3" />
      <circle cx="7"  cy="45" r="2"   fill="#FF85B3" />

      {/* ── Gill stalks RIGHT ── */}
      {/* Main stalk 1 */}
      <line x1="76" y1="42" x2="90" y2="16" stroke="#FF85B3" strokeWidth="3" strokeLinecap="round" />
      <line x1="90" y1="16" x2="84" y2="8"  stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <line x1="90" y1="16" x2="97" y2="8"  stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <line x1="90" y1="16" x2="95" y2="20" stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <circle cx="84" cy="8"  r="2.5" fill="#FF85B3" />
      <circle cx="97" cy="8"  r="2.5" fill="#FF85B3" />
      <circle cx="95" cy="20" r="2"   fill="#FF85B3" />

      {/* Main stalk 2 */}
      <line x1="80" y1="38" x2="96" y2="26" stroke="#FF85B3" strokeWidth="3" strokeLinecap="round" />
      <line x1="96" y1="26" x2="102" y2="18" stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <line x1="96" y1="26" x2="101" y2="30" stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <circle cx="102" cy="18" r="2.5" fill="#FF85B3" />
      <circle cx="101" cy="30" r="2"   fill="#FF85B3" />

      {/* Main stalk 3 */}
      <line x1="74" y1="47" x2="92" y2="40" stroke="#FF85B3" strokeWidth="3" strokeLinecap="round" />
      <line x1="92" y1="40" x2="99" y2="35" stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <line x1="92" y1="40" x2="97" y2="45" stroke="#FF85B3" strokeWidth="2" strokeLinecap="round" />
      <circle cx="99" cy="35" r="2.5" fill="#FF85B3" />
      <circle cx="97" cy="45" r="2"   fill="#FF85B3" />

      {/* ── Front legs ── */}
      <ellipse cx="36" cy="96" rx="10" ry="6" fill="#FFB3C6" transform="rotate(-15 36 96)" />
      <ellipse cx="72" cy="97" rx="10" ry="6" fill="#FFB3C6" transform="rotate(15 72 97)" />

      {/* ── Toes ── */}
      <circle cx="28" cy="100" r="3" fill="#FFB3C6" />
      <circle cx="33" cy="103" r="3" fill="#FFB3C6" />
      <circle cx="39" cy="103" r="3" fill="#FFB3C6" />
      <circle cx="65" cy="103" r="3" fill="#FFB3C6" />
      <circle cx="71" cy="104" r="3" fill="#FFB3C6" />
      <circle cx="77" cy="102" r="3" fill="#FFB3C6" />

      {/* ── Big cute eyes ── */}
      {/* Eye whites */}
      <circle cx="40" cy="54" r="11" fill="white" />
      <circle cx="64" cy="54" r="11" fill="white" />
      {/* Irises */}
      <circle cx="41" cy="55" r="8" fill="#2D1B69" />
      <circle cx="65" cy="55" r="8" fill="#2D1B69" />
      {/* Pupils */}
      <circle cx="41" cy="55" r="5" fill="#1a0a3c" />
      <circle cx="65" cy="55" r="5" fill="#1a0a3c" />
      {/* Sparkle highlights */}
      <circle cx="37" cy="51" r="2.5" fill="white" />
      <circle cx="61" cy="51" r="2.5" fill="white" />
      <circle cx="44" cy="57" r="1.2" fill="white" />
      <circle cx="68" cy="57" r="1.2" fill="white" />

      {/* ── Tiny nose dots ── */}
      <circle cx="49" cy="63" r="1.5" fill="#FF85B3" />
      <circle cx="55" cy="63" r="1.5" fill="#FF85B3" />

      {/* ── Big happy smile ── */}
      <path d="M38 70 Q52 82 66 70" stroke="#FF69A0" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* ── Dorsal fin ridge ── */}
      <path d="M36 32 Q52 18 68 32" stroke="#FFB3C6" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
