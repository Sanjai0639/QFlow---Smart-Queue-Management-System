export default function SettingsPage() {

  return (
    <main className="min-h-screen bg-black px-12 py-10 ml-64 text-white">

      <h1 className="text-6xl font-bold">
        Settings
      </h1>

      <p className="mt-4 text-gray-400">
        Manage your account preferences.
      </p>

      <div className="mt-12 rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8">

        <div className="space-y-6">

          <div>

            <p className="text-gray-400">
              Email
            </p>

            <p className="mt-2 text-xl">
              sanjai@test.com
            </p>

          </div>

          <div>

            <p className="text-gray-400">
              Role
            </p>

            <p className="mt-2 text-xl">
              CUSTOMER
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}