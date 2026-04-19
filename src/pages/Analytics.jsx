// /Users/aarondeniz/programming/fsd/habit/src/pages/Analytics.jsx
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const dayKey = (date) => date.toISOString().split("T")[0];

const Analytics = () => {
  const habits = useSelector((state) => state.habit.habits);
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    setAnimateBars(false);
    const frame = requestAnimationFrame(() => setAnimateBars(true));
    return () => cancelAnimationFrame(frame);
  }, [habits]);

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

    return {
      totalHabits,
      completedToday,
      longestStreak,
      completionRate,
      completedDisplay: `${completedToday} / ${totalHabits}`
    };
  }, [habits]);

  return (
    <section>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <article className="rounded-card border border-surface-600 bg-surface-900 p-6">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">Total habits</p>
          <p className="font-mono text-4xl font-medium text-text-primary">{metrics.totalHabits}</p>
          <p className="mt-1 text-sm text-text-secondary">Tracked right now</p>
        </article>

        <article className="rounded-card border border-surface-600 bg-surface-900 p-6">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">Completed today</p>
          <p className="font-mono text-4xl font-medium text-text-primary">{metrics.completedDisplay}</p>
          <p className="mt-1 text-sm text-text-secondary">Daily status</p>
        </article>

        <article className="rounded-card border border-surface-600 border-l-[3px] border-l-accent bg-surface-900 p-6">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">Longest streak</p>
          <p className="font-mono text-4xl font-medium text-accent">{metrics.longestStreak}</p>
          <p className="mt-1 text-sm text-text-secondary">In days</p>
        </article>

        <article className="rounded-card border border-surface-600 bg-surface-900 p-6">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">7-day rate</p>
          <p className="font-mono text-4xl font-medium text-text-primary">{metrics.completionRate}%</p>
          <p className="mt-1 text-sm text-text-secondary">Completion consistency</p>
        </article>
      </div>

      <section className="mt-10">
        <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">Habit Performance</h3>
        <div className="space-y-4 rounded-card border border-surface-600 bg-surface-900 p-6">
          {habits.length === 0 && <p className="text-sm text-text-muted">No habits yet. Add habits to see performance.</p>}
          {habits.map((habit, index) => {
            const daysSinceCreation =
              Math.max(1, Math.floor((Date.now() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24)) + 1);
            const completionPct = Math.min(100, Math.round((habit.completedDates.length / daysSinceCreation) * 100));

            return (
              <div key={habit.id}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary">{habit.title}</span>
                  <span className="font-mono text-sm text-text-secondary">{completionPct}%</span>
                </div>
                <div className="h-[3px] rounded-pill bg-surface-600">
                  <div
                    className="h-[3px] rounded-pill bg-accent"
                    style={{
                      width: animateBars ? `${completionPct}%` : "0%",
                      transition: "width 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                      transitionDelay: `${index * 80}ms`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Analytics;
