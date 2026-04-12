// /Users/aarondeniz/programming/fsd/habit/src/pages/Analytics.jsx
import { useMemo } from "react";
import { useSelector } from "react-redux";

const dayKey = (date) => date.toISOString().split("T")[0];

const Analytics = () => {
  const habits = useSelector((state) => state.habit.habits);

  const metrics = useMemo(() => {
    const today = dayKey(new Date());

    const totalHabits = habits.length;
    const completedToday = habits.filter((habit) => habit.completedDates.includes(today)).length;
    const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak || 0), 0);

    const last7Days = Array.from({ length: 7 }).map((_, idx) => {
      const date = new Date();
      date.setDate(date.getDate() - idx);
      return dayKey(date);
    });

    const totalOpportunities = totalHabits * last7Days.length;
    const completedEntries = habits.reduce((sum, habit) => {
      return sum + habit.completedDates.filter((d) => last7Days.includes(d)).length;
    }, 0);

    const completionRate = totalOpportunities === 0 ? 0 : Math.round((completedEntries / totalOpportunities) * 100);

    return { totalHabits, completedToday, longestStreak, completionRate };
  }, [habits]);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Analytics</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">A snapshot of your consistency over time.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="card-surface p-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Habits</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{metrics.totalHabits}</p>
        </article>
        <article className="card-surface p-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">Completed Today</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">{metrics.completedToday}</p>
        </article>
        <article className="card-surface p-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">Longest Current Streak</p>
          <p className="mt-2 text-3xl font-bold text-amber-600 dark:text-amber-400">{metrics.longestStreak}</p>
        </article>
        <article className="card-surface p-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">7-Day Completion Rate</p>
          <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">{metrics.completionRate}%</p>
        </article>
      </div>

      <div className="card-surface p-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Progress by habit</h3>
        <div className="mt-4 space-y-4">
          {habits.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400">No habits yet. Start tracking to see analytics.</p>
          )}
          {habits.map((habit) => {
            const daysSinceCreation =
              Math.max(1, Math.floor((Date.now() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24)) + 1);
            const completionPct = Math.min(100, Math.round((habit.completedDates.length / daysSinceCreation) * 100));

            return (
              <div key={habit.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-200">{habit.title}</span>
                  <span className="text-slate-500 dark:text-slate-400">{completionPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
