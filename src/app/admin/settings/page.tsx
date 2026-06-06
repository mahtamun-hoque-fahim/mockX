export const dynamic = "force-dynamic";
export default function AdminSettingsPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-syne font-bold text-2xl text-text-primary mb-1">Settings</h1>
        <p className="text-text-secondary text-sm">Global platform configuration</p>
      </div>

      <div className="space-y-4">
        {[
          { label: "Guest export watermark",     description: "Add mockX watermark to exports by non-signed-in users", enabled: true },
          { label: "Public share links",          description: "Allow users to share mockups via public URL",           enabled: true },
          { label: "Pro tier enabled",            description: "Show Pro upgrade option in the app",                    enabled: false },
          { label: "Maintenance mode",            description: "Show maintenance banner to all users",                  enabled: false },
          { label: "New signups allowed",         description: "Allow new users to create accounts",                    enabled: true },
        ].map(setting => (
          <div key={setting.label} className="bg-surface border border-white/7 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-text-primary mb-0.5">{setting.label}</div>
              <div className="text-xs text-text-secondary">{setting.description}</div>
            </div>
            <div
              className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${setting.enabled ? "bg-accent" : "bg-surface-elevated border border-white/10"}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${setting.enabled ? "left-[22px]" : "left-0.5"}`}/>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-surface border border-white/7 rounded-2xl p-5">
        <h3 className="font-syne font-semibold text-sm text-text-primary mb-4">Free tier limits</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Max saved mockups", value: "20" },
            { label: "Max export scale",  value: "2×"  },
          ].map(item => (
            <div key={item.label}>
              <div className="text-xs text-text-secondary mb-1.5">{item.label}</div>
              <input
                defaultValue={item.value}
                className="w-full bg-bg border border-white/10 rounded-xl px-3 py-2 text-sm text-text-primary outline-none focus:border-accent/40 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
