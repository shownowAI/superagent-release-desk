export function generateReleaseChecklist(tasks) {
  const pending = tasks.filter(task => task.status !== 'done');
  if (pending.length === 0) return '已经全部准备好了，可以发布';
  return [
    `Agent Notes 1.0 发布清单 · 未完成事项（${pending.length} 项）`,
    ...pending.map(task => `- ${task.title}（${task.id}）｜负责人：${task.owner}｜截止：${task.deadline}`),
  ].join('\n');
}
