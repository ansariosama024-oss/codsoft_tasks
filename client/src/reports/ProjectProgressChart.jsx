import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";

const ProjectProgressChart = ({ projects = [], tasks = [] }) => {
  const data = projects.map((project) => {
    const projectTasks = tasks.filter((task) => {
      const taskProjectId =
        typeof task.project === "object"
          ? task.project?._id
          : task.project;

      return String(taskProjectId) === String(project._id);
    });

    const completedTasks = projectTasks.filter(
      (task) => task.status?.trim().toLowerCase() === "done"
    );

    const progress =
      projectTasks.length > 0
        ? Math.round(
            (completedTasks.length / projectTasks.length) * 100
          )
        : 0;

    return {
      name: project.name,
      progress,
      totalTasks: projectTasks.length,
      completedTasks: completedTasks.length,
    };
  });

  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
      <h2 className="mb-4 text-lg font-semibold">
        Project Progress
      </h2>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 25,
              right: 20,
              left: 20,
              bottom: 90,
            }}
          >
            <XAxis
  dataKey="name"
  interval={0}
  angle={-20}
  textAnchor="end"
  height={110}
  tick={{ fontSize: 12 }}
/>

            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              formatter={(value) => [`${value}%`, "Progress"]}
              labelFormatter={(label) => `Project: ${label}`}
            />

            <Bar
              dataKey="progress"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              minPointSize={3}
            >
              <LabelList
                dataKey="progress"
                position="top"
                formatter={(value) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectProgressChart;