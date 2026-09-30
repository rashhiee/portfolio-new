export default function PlaygroundPage() {
  return (
    <div className="w-full max-w-4xl px-6 py-20 flex flex-col items-center justify-center text-center space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1 text-xs font-mono text-[var(--fg-muted)] shadow-xs">
        <span>Step 1 Placeholder • Route [4]</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-[var(--fg-primary)]">
        Interactive Lab & Experiments
      </h1>

      <p className="max-w-lg text-base text-[var(--fg-muted)] leading-relaxed font-sans">
        Hands-on technical sandboxes, rate-limiters, and interactive backend architecture simulations.
      </p>

      <div className="w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-left space-y-3 shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)]">
          <span>[REDIS RATE-LIMITER LAB]</span>
          <span>In Progress</span>
        </div>
        <p className="text-sm text-[var(--fg-muted)]">
          The interactive Upstash Redis sliding-window rate-limiter demo will be mounted here in Step 6.
        </p>
      </div>
    </div>
  );
}
