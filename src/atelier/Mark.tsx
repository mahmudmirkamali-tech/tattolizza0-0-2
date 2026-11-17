export function Mark({ settled = false }: { settled?: boolean }) {
  return (
    <div className={settled ? "lockup is-settled" : "lockup is-on"}>
      <svg className="wing" viewBox="0 0 160 48" aria-hidden="true">
        <path
          className="wing-stroke"
          d="M6 34 C 34 34 42 8 80 14 C 112 19 128 36 154 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>
      <p className="lockup-artist">PARVAZ</p>
      <h1 className="lockup-word">TATTOLIZZA</h1>
      <span className="lockup-rule" />
    </div>
  );
}
